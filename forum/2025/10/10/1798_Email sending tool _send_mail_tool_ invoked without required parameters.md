# Email sending tool (send_mail_tool) invoked without required parameters

**Topic ID:** 1798
**Created:** 2025-10-10 08:46:15
**URL:** https://forum.langchain.com/t/1798

**Tags:** python-help

---

## Post #1 by @teodoroleckie
*Posted on 2025-10-10 08:46:15*

Hello,

I’m having an issue where the **`send_mail_tool`** is being invoked **without any parameters**, even though the `message` field is required.

In some cases, the tool is invoked correctly with all parameters, but most of the time it’s triggered with an empty input `{}`. This causes a validation error from Pydantic since the `message` field is missing.

Here’s an example from the logs (translated for clarity):

`2025-10-10 10:22:12 Invoking: send_mail_tool with {}`

`2025-10-10 10:22:12 responded: [`

`{‘type’: ‘text’, ‘text’: ‘Now I’m going to generate the content of the report to send it by email and WhatsApp.’, ‘index’: 0},`

`{‘type’: ‘tool_use’, ‘id’: ‘toolu_bdrk_01SLGsLZ683zKedDqWea5GSV’, ‘name’: ‘send_mail_tool’, ‘input’: {}, ‘index’: 1, ‘partial_json’: ‘’}`

`]`

`2025-10-10 10:22:12`

`2025-10-10 10:22:12 [local][langchain][2025-10-10 08:22:12] ERROR: Validation error: 1 validation error for SendMailArgs`

`2025-10-10 10:22:12 message`

`2025-10-10 10:22:12   Field required [type=missing, input_value={}, input_type=dict]`

`2025-10-10 10:22:12     For further information visit ``https://errors.pydantic.dev/2.11/v/missing`

As shown above, the tool is invoked without the required `message` parameter.

Could you please help me identify what might be causing this inconsistent behaviour and how to ensure the tool is always invoked with the proper parameters?

Thank you for your assistance!

Best regards,


```
`import time
from datetime import datetime, timezone
from typing import Any, List, Tuple

from langchain.agents import create_tool_calling_agent, AgentExecutor
from langchain_core.prompts import ChatPromptTemplate, MessagesPlaceholder
from langchain_core.runnables import RunnableWithMessageHistory

from Domain.Exceptions.ToolNotInvokedException import ToolNotInvokedException
from Infrastructure.Adapters.Mappers.ResponseService import ResponseService
from Infrastructure.Adapters.Repositories.Redis.history_message import get_history_message
from Infrastructure.Adapters.Repositories.Sources.DataSourceFactory import DataSourceFactory
from app.SessionConfig import SessionConfig
from app.logger_config import logger
from llm.factory import LlmFactory
# Tools
from llm.tools.HelloTool import hello_tool
from llm.tools.Issue.IssueTool import issue_tool
from llm.tools.Issue.IssuesByUuidTool import issues_by_uuid_tool
from llm.tools.OrderDelivery.OrderDeliveriesByUuidTool import order_delivery_by_uuid_tool
from llm.tools.OrderDelivery.OrderDeliveryTool import order_delivery_tool
from llm.tools.Product.ProductByUuidTool import product_by_uuid_tool
from llm.tools.Product.ProductTool import product_tool
from llm.tools.SendExcelTool import send_excel_tool
from llm.tools.SendMailTool import send_mail_tool
from llm.tools.SendWhatsappTool import send_whatsapp_tool
from llm.tools.Shipment.ShipmentTool import shipment_tool
from llm.tools.Shipment.ShipmentsByUuidTool import shipments_by_uuid_tool


def _needs_retry_for_missing_args(steps: List[Tuple[Any, Any]], tool_name: str) -> bool:
    if not steps:
        return False
    last = steps[-1]
    try:
        action, observation = last
    except Exception:
        try:
            action = last[0]
            observation = last[1]
        except Exception:
            return False
    tool_called = getattr(action, "tool", "") if action is not None else ""
    if tool_called != tool_name:
        return False
    if isinstance(observation, str):
        err = observation.lower()
        return any(k in err for k in [
            "missing required arguments",
            "field required",
            "missing",
            "must provide at least one email",
            "message cannot be empty",
        ])
    return False


class AgentExecutorUseCase:
    def __init__(self, session_config: SessionConfig, max_iterations: int = 9, max_execution_time: int = 900):
        self.session_config = session_config
        self.max_iterations = max_iterations
        self.max_execution_time = max_execution_time
        self.last_generated_message = "CONTENT_GENERATED_BY_THE_LLM"

        self.toolkit = [
            hello_tool,
            order_delivery_tool,
            order_delivery_by_uuid_tool,
            shipment_tool,
            shipments_by_uuid_tool,
            issue_tool,
            issues_by_uuid_tool,
            product_tool,
            product_by_uuid_tool,
            send_excel_tool,
            send_mail_tool,
            send_whatsapp_tool,
        ]
        self.llm = LlmFactory.agent()

    def execute(self, user_input: str):
        start_time = time.time()

        agent = create_tool_calling_agent(
            llm=self.llm,
            tools=self.toolkit,
            prompt=self._create_prompt(),
        )

        executor = AgentExecutor(
            agent=agent,
            tools=self.toolkit,
            verbose=True,
            max_iterations=self.max_iterations,
            max_execution_time=self.max_execution_time,
            return_intermediate_steps=True,
            handle_parsing_errors=True,
        )

        logger.info("Chat with clientId: %s, sessionId: %s",
                    self.session_config.get_client_id(),
                    self.session_config.get_session_id())

        runnable = RunnableWithMessageHistory(
            executor,
            get_history_message,
            input_messages_key="input",
            history_messages_key="history",
        )

        utc_now = datetime.now(timezone.utc)
        utc = utc_now.strftime("%Y-%m-%d %H:%M:%S")
        ds = DataSourceFactory.factory()

        payload = {
            "input": user_input,
            "date": utc,
            "email": self.session_config.get_user_email(),
            "phone": self.session_config.get_user_phone(),
            "from_source": ds.load_source(self.session_config.get_source()),
            "source": self.session_config.get_source(),
        }

        config = {
            "configurable": {
                "session_id": f"{self.session_config.get_client_id()}:chat:{self.session_config.get_session_id()}"
            }
        }

        output = runnable.invoke(payload, config=config)
        steps = output.get("intermediate_steps") or []

        if not steps:
            forced_payload = {**payload, "input": (
                "STRICT POLICY: You must invoke AT LEAST ONE tool before responding "
                "(check the arguments each tool requires before invoking it). "
                "Responding without tools is not allowed. "
                f"User query: {user_input}"
            )}
            output = runnable.invoke(forced_payload, config=config)
            steps = output.get("intermediate_steps") or []

        # Guardrail for send_mail_tool
        if _needs_retry_for_missing_args(steps, "send_mail_tool"):
            last_message = self.last_generated_message or "CONTENT_GENERATED_BY_THE_LLM"
            guidance = (
                "The call to send_mail_tool failed due to MISSING ARGUMENTS.\n"
                f"Use this content as the 'message': {last_message}\n"
                "Invoke send_mail_tool with that argument."
            )
            forced_payload = {**payload, "input": guidance}
            output = runnable.invoke(forced_payload, config=config)
            steps = output.get("intermediate_steps") or []

        # Guardrail for send_whatsapp_tool
        if _needs_retry_for_missing_args(steps, "send_whatsapp_tool"):
            last_message = self.last_generated_message or "CONTENT_GENERATED_BY_THE_LLM"
            guidance = (
                "The call to send_whatsapp_tool failed due to MISSING ARGUMENTS.\n"
                f"Use this content as the 'message': {last_message}\n"
                "Invoke send_whatsapp_tool with that argument."
            )
            forced_payload = {**payload, "input": guidance}
            output = runnable.invoke(forced_payload, config=config)
            steps = output.get("intermediate_steps") or []

        if not steps:
            raise ToolNotInvokedException(
                f"No tool was invoked for the session: {self.session_config.get_session_id()}"
            )

        response = ResponseService.format_response(output)
        elapsed_time = time.time() - start_time
        logger.info("Response generated in %.2f seconds", elapsed_time)

        # Persistence of the last generated message
        if isinstance(response, str) and len(response.strip()) > 0:
            self.last_generated_message = response.strip()

        return response

    def _create_prompt(self) -> ChatPromptTemplate:
        ds = DataSourceFactory.factory()
        chat_prompt = ds.load_chat_prompt(
            self.session_config.get_client_name(),
            self.session_config.get_client_id()
        )

        policy = (
            "STRICT POLICIES:\n"
            "- Reason step by step and decide WHICH tool to use and WHEN.\n"
            "- You must invoke AT LEAST ONE tool before responding "
            "(check the arguments each tool requires before invoking it).\n"
            "Responding without tools is not allowed.\n"
            "- Do not highlight text with '##' or with '**'.\n"
            "- Do not include  tags in your responses."
        )

        return ChatPromptTemplate.from_messages([
            ("system", policy + "\n\n" + chat_prompt),
            MessagesPlaceholder(variable_name="history"),
            ("human", "{input}"),
            MessagesPlaceholder(variable_name="agent_scratchpad"),
        ])






`
```


```
`# tools/send_mail_tool.py
from __future__ import annotations

from typing import List, Optional

from langchain_core.tools import StructuredTool, ToolException
from pydantic import BaseModel, Field, ValidationError, field_validator, constr
from tenacity import (
    retry, stop_after_attempt, wait_fixed, retry_if_exception_type, RetryCallState
)

from Application.UseCases.SendMailUseCase import SendMailUseCase
from Domain.Exceptions.WithFeedbackException import WithFeedbackException
from Infrastructure.Adapters.Repositories.Rabbitmq.RabbitConnection import RabbitConnection
from Infrastructure.Adapters.Repositories.Rabbitmq.RabbitPublisher import RabbitPublisher
from app.SessionConfig import SessionConfig
from app.logger_config import logger


# =========================
# Exceptions and utilities
# =========================

class RetryableSendError(WithFeedbackException):
    """Transient errors (will be retried)."""
    pass


def _missing_args_msg() -> str:
    """User-friendly error message when required arguments are missing or empty."""
    cfg = SessionConfig.instance()
    user_email = (cfg.get_user_email() or "").strip() if cfg else ""
    user_email = user_email or "not available"

    return (
        "ERROR: Missing valid arguments to send email.\n\n"
        "REQUIREMENTS:\n"
        "• 'message': Full email content (REQUIRED)\n"
        f"• 'user_emails': List of recipients (OPTIONAL). If omitted, the session email will be used: ({user_email}).\n\n"
        "EXAMPLE:\n"
        "send_mail_tool.invoke({\n"
        "  'message': 'Here is the requested report...',\n"
        "  'user_emails': ['user@company.com']\n"
        "})"
    )


def _mask_emails(recipients: List[str]) -> List[str]:
    """Masks emails for logs (avoids exposing PII)."""
    masked: List[str] = []
    for r in recipients:
        try:
            user, domain = r.split("@", 1)
            masked.append((user[:2] + "***@" + domain))
        except Exception:
            masked.append("***")
    return masked


# =========================
# Arguments schema
# =========================

class SendMailArgs(BaseModel):
    message: constr(strip_whitespace=True, min_length=1) = Field(
        ...,
        description="REQUIRED: The message body to be sent by email (text/HTML). Must be fully generated before using this tool.",
        examples=["Here is your KPI summary: ..."]
    )
    user_emails: Optional[List[str]] = Field(
        default=None,
        description="OPTIONAL: List of recipient emails. If omitted or empty, the session email (if any) will be used.",
        examples=[["user@company.com"]]
    )
    subject: Optional[constr(strip_whitespace=True, min_length=1)] = Field(
        default="Hi - Response to your inquiry",
        description="OPTIONAL: Email subject. Defaults to 'Hi - Response to your inquiry'."
    )
    context_extra: Optional[str] = Field(
        default="",
        description="Context/corrections for automatic retries."
    )

    @field_validator("user_emails", mode="before")
    @classmethod
    def _normalize_emails(cls, v):
        """
        Accepts:
          - None / ""  -> None (will be resolved with session email)
          - "mail@x.com" -> ["mail@x.com"]
          - ["a@x.com", "", "  ", "b@x.com"] -> ["a@x.com", "b@x.com"]
        Normalizes to lowercase and removes empty values.
        """
        if v is None:
            return None
        if isinstance(v, str):
            s = v.strip().lower()
            return [s] if s else None
        if isinstance(v, list):
            cleaned = []
            for item in v:
                if isinstance(item, str):
                    s = item.strip().lower()
                    if s:
                        cleaned.append(s)
            return cleaned or None
        return None

    @field_validator("context_extra")
    @classmethod
    def _trim_context(cls, v: Optional[str]) -> str:
        return (v or "").strip()


def inject_feedback_before_sleep(retry_state: RetryCallState):
    """Injects feedback into context_extra before each retry (if applicable)."""
    exc = retry_state.outcome.exception() if retry_state.outcome else None
    if not exc:
        return
    feedback = getattr(exc, "feedback", None) or str(exc)
    if retry_state.args and isinstance(retry_state.args[0], SendMailArgs):
        args_model: SendMailArgs = retry_state.args[0]
        combined = ((args_model.context_extra or "") + "\n[FEEDBACK] " + feedback).strip()
        if len(combined) > 2000:
            combined = combined[-2000:]
        args_model.context_extra = combined
        logger.warning("Retry %s → feedback injected into context_extra: %s", retry_state.attempt_number, feedback)


# =========================
# Tool implementation
# =========================

@retry(
    reraise=True,
    stop=stop_after_attempt(3),
    wait=wait_fixed(1),
    retry=retry_if_exception_type(RetryableSendError),
    before_sleep=inject_feedback_before_sleep,
)
def _send_mail_impl(args: SendMailArgs) -> str:
    config = SessionConfig.instance()
    if config is None:
        raise WithFeedbackException("Invalid config object.", feedback="Invalid session config.")

    session_id = config.get_session_id()
    client_name = config.get_client_name()
    client_id = config.get_client_id()
    user_locale = config.get_user_locale()

    if not all([session_id, client_name, client_id]):
        raise WithFeedbackException(
            "Missing session data (session_id, client_name, or client_id).",
            feedback="Missing session/client identifiers."
        )

    # --- Resolve recipients ---
    recipients = args.user_emails or []
    if not recipients:
        sess_email = (config.get_user_email() or "").strip().lower()
        if sess_email:
            recipients = [sess_email]

    if not recipients:
        raise WithFeedbackException(
            "No recipients found for the email.",
            feedback="Provide 'user_emails' or ensure the session has a valid email."
        )

    subject = (args.subject or "").strip() or "Hi - Response to your inquiry"

    # Logs without PII
    logger.info("Tools: send_mail_tool, session_id=%s, recipients_count=%s", session_id, len(recipients))
    logger.debug("Tools: send_mail_tool, recipients_masked=%s", _mask_emails(recipients))

    sender = SendMailUseCase(RabbitPublisher(RabbitConnection()), "no-reply@email.net")
    try:
        response = sender.execute(
            recipient=recipients,
            client_id=client_id,
            locale=user_locale,
            subject=subject,
            body=args.message,
        )
        return "Unexpected error while sending email." if not response else "Ok, email sent successfully."
    except Exception as e:
        lower = str(e).lower()
        if any(k in lower for k in
               ["timeout", "timed out", "connection", "refused", "unreachable", "channel", "closed"]):
            raise RetryableSendError(
                "Transient failure when sending email.",
                feedback=f"Possible temporary broker/channel error. Details: {str(e)[:300]}"
            )
        raise WithFeedbackException(
            "Permanent failure when sending email.",
            feedback=f"Non-recoverable error while sending email. Details: {str(e)[:300]}"
        )


def _handle_tool_error(e: Exception) -> str:
    """Handles errors and returns useful messages for the agent."""
    return str(e) if str(e) else "I couldn’t process your request right now."


def _send_mail_sync(**kwargs) -> str:
    logger.info("Tools: send_mail_tool invoked [sync]; kwargs_keys=%s", list(kwargs.keys()))

    # Guard-rail: invocation without arguments → clear instruction for the agent
    if not kwargs:
        raise ToolException(_missing_args_msg())

    try:
        args = SendMailArgs(**kwargs)
    except ValidationError as e:
        logger.warning("Validation error in send_mail_tool: %s", str(e))
        # Message that the agent will see and can use to retry properly
        raise ToolException(_missing_args_msg())

    try:
        return _send_mail_impl(args)
    except WithFeedbackException as e:
        raise ToolException(e.feedback)
    except Exception as e:
        logger.error("Unexpected error in send_mail_tool: %s", str(e))
        raise ToolException("I couldn’t process your request right now.")


send_mail_tool = StructuredTool(
    name="send_mail_tool",
    description=(
        "Sends **email** with already generated content. WARNING!: You must first generate the message you want to send by email — this parameter is mandatory.\n\n"
        "**ARGUMENTS:**\n"
        "• `message` (REQUIRED): Full email content to send (text/HTML).\n"
        "• `user_emails` (OPTIONAL): List of recipients; if omitted, the session email will be used (if available).\n"
        "• `subject` (OPTIONAL): Email subject; defaults to 'Hi - Response to your inquiry'.\n\n"
        "**INSTRUCTIONS:**\n"
        "1) First, generate the message content.\n"
        "2) If you know the recipients, provide them in `user_emails`; otherwise, rely on the session email.\n"
        "3) If you need a custom subject, specify it in `subject`.\n\n"
        "**EXAMPLE:**\n"
        "send_mail_tool.invoke({\n"
        "  'message': 'Here is the requested report...',\n"
        "  'user_emails': ['client@company.com']\n"
        "})"
    ),
    args_schema=SendMailArgs,
    func=_send_mail_sync,
    handle_tool_error=_handle_tool_error,  # type: ignore[call-arg]
)

`
```

---
