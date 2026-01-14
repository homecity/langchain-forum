"""RAG evaluation module for assessing answer quality."""

import asyncio
import re
from typing import Dict

from langchain_core.prompts import ChatPromptTemplate
from langchain_openai import ChatOpenAI


class RAGEvaluator:
    """Evaluates RAG system outputs using LLM-based metrics.

    Computes three key metrics:
    - Faithfulness: Answer grounded in retrieved context (0-1)
    - Relevance: Context relevance to query (0-1)
    - Coherence: Answer structure and completeness (0-1)

    All evaluations run in parallel for efficiency.
    """

    def __init__(self, model_name: str = "gpt-4o-mini", temperature: float = 0.0):
        """Initialize evaluator with LLM.

        Args:
            model_name: OpenAI model for evaluation
            temperature: LLM temperature (0 for deterministic scoring)
        """
        self.llm = ChatOpenAI(model=model_name, temperature=temperature)

        # Faithfulness: Answer must be grounded in context
        self.faithfulness_prompt = ChatPromptTemplate.from_messages([
            ("system", """You are an expert evaluator assessing answer faithfulness.

Task: Determine if the answer is grounded in the provided context.

Scoring criteria:
- 1.0: All claims in the answer are supported by the context
- 0.7-0.9: Most claims supported, minor unsupported details
- 0.4-0.6: Some claims supported, some speculation/hallucination
- 0.0-0.3: Answer largely contradicts or ignores context

Output ONLY a single number between 0 and 1."""),
            ("user", """Query: {query}

Context:
{context}

Answer:
{answer}

Faithfulness score (0-1):""")
        ])

        # Relevance: Context must be relevant to query
        self.relevance_prompt = ChatPromptTemplate.from_messages([
            ("system", """You are an expert evaluator assessing context relevance.

Task: Determine if the retrieved context is relevant to the query.

Scoring criteria:
- 1.0: Context directly addresses the query topic
- 0.7-0.9: Context mostly relevant, some tangential info
- 0.4-0.6: Context partially relevant, mixed topics
- 0.0-0.3: Context largely irrelevant to query

Output ONLY a single number between 0 and 1."""),
            ("user", """Query: {query}

Context:
{context}

Relevance score (0-1):""")
        ])

        # Coherence: Answer must be well-structured and complete
        self.coherence_prompt = ChatPromptTemplate.from_messages([
            ("system", """You are an expert evaluator assessing answer coherence.

Task: Determine if the answer is well-structured, clear, and complete.

Scoring criteria:
- 1.0: Clear structure, complete response, easy to understand
- 0.7-0.9: Good structure, minor clarity issues
- 0.4-0.6: Somewhat structured, missing details or unclear
- 0.0-0.3: Poor structure, incomplete, or confusing

Output ONLY a single number between 0 and 1."""),
            ("user", """Query: {query}

Answer:
{answer}

Coherence score (0-1):""")
        ])

    async def _evaluate_metric(
        self,
        prompt_template: ChatPromptTemplate,
        metric_name: str,
        **kwargs
    ) -> float:
        """Evaluate a single metric with error handling.

        Args:
            prompt_template: Prompt for this metric
            metric_name: Name for logging
            **kwargs: Variables for prompt (query, context, answer)

        Returns:
            Score between 0-1, or 0.5 on failure
        """
        try:
            # Generate prompt and invoke LLM
            prompt = prompt_template.format_messages(**kwargs)
            response = await self.llm.ainvoke(prompt)

            # Parse score from response
            score_text = response.content.strip()
            score = self._parse_score(score_text)

            # Validate range
            if not 0.0 <= score <= 1.0:
                print(f"Warning: {metric_name} score {score} out of range, clamping")
                score = max(0.0, min(1.0, score))

            return score

        except Exception as e:
            print(f"Error evaluating {metric_name}: {e}")
            return 0.5  # Neutral fallback

    def _parse_score(self, text: str) -> float:
        """Parse score from LLM response.

        Handles various formats:
        - Plain number: "0.85"
        - With explanation: "Score: 0.85 because..."
        - Fraction: "0.85/1.0"

        Args:
            text: LLM response text

        Returns:
            Parsed score as float

        Raises:
            ValueError: If no valid score found
        """
        # Try to find first decimal number (0.XX or 1.0 or 0)
        match = re.search(r'\b([01](?:\.\d+)?)\b', text)
        if match:
            return float(match.group(1))

        # Fallback: try to parse entire text as number
        try:
            return float(text)
        except ValueError:
            raise ValueError(f"Could not parse score from: {text}")

    async def evaluate_async(
        self,
        query: str,
        context: str,
        answer: str
    ) -> Dict[str, float]:
        """Evaluate answer quality with all metrics in parallel.

        Args:
            query: User query
            context: Retrieved context documents
            answer: Generated answer

        Returns:
            Dictionary with scores:
            {
                'faithfulness': 0.0-1.0,
                'relevance': 0.0-1.0,
                'coherence': 0.0-1.0,
                'overall': 0.0-1.0  # Average of three metrics
            }
        """
        # Run all evaluations in parallel
        faithfulness_task = self._evaluate_metric(
            self.faithfulness_prompt,
            "faithfulness",
            query=query,
            context=context,
            answer=answer
        )

        relevance_task = self._evaluate_metric(
            self.relevance_prompt,
            "relevance",
            query=query,
            context=context
        )

        coherence_task = self._evaluate_metric(
            self.coherence_prompt,
            "coherence",
            query=query,
            answer=answer
        )

        # Await all results
        faithfulness, relevance, coherence = await asyncio.gather(
            faithfulness_task,
            relevance_task,
            coherence_task
        )

        # Compute overall score (simple average)
        overall = (faithfulness + relevance + coherence) / 3.0

        return {
            'faithfulness': faithfulness,
            'relevance': relevance,
            'coherence': coherence,
            'overall': overall
        }

    def evaluate(
        self,
        query: str,
        context: str,
        answer: str
    ) -> Dict[str, float]:
        """Synchronous wrapper for evaluate_async.

        Args:
            query: User query
            context: Retrieved context documents
            answer: Generated answer

        Returns:
            Dictionary with scores (faithfulness, relevance, coherence, overall)
        """
        return asyncio.run(self.evaluate_async(query, context, answer))


# Convenience function for quick evaluation
def evaluate_rag_output(
    query: str,
    context: str,
    answer: str,
    model_name: str = "gpt-4o-mini"
) -> Dict[str, float]:
    """Quick evaluation of RAG output.

    Args:
        query: User query
        context: Retrieved context
        answer: Generated answer
        model_name: OpenAI model for evaluation

    Returns:
        Evaluation scores dictionary
    """
    evaluator = RAGEvaluator(model_name=model_name)
    return evaluator.evaluate(query, context, answer)
