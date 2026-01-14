# Streaming with custom auth and UseStream not working

**Topic ID:** 134
**Created:** 2025-07-01 09:46:41
**URL:** https://forum.langchain.com/t/134

---

## Post #1 by @samgoos
*Posted on 2025-07-01 09:46:41*

when adding custom auth and then starting langgraph development server (with “disable_studio_auth”: false ) auth gets ignored when running the graph directly, but when switching to “chat” we still get a 403.

This issue is not apparent when using studio in a deployed environment, where we can use the chat screen, but then another issue comes up: it seems there are issues with UseStream and custom auth (also from my own TS client) where streaming gets disabled (responses are only returned after run is completed).

I spent hours on trying to find a solution for this but there seems none. Perhaps I am overlooking something, but it would be great to get some help on this as I cannot use custom auth for my application right now.

My auth code below for reference


```
`from langgraph_sdk import Auth
import os
from pathlib import Path
import anyio
import firebase_admin
from firebase_admin import auth as firebase_auth, credentials, firestore
import json
import time
from typing import Dict, Tuple
from fastapi import Request

# Initialize Firebase Admin SDK (do this only once)
SA_PATH = os.getenv("FIREBASE_CREDENTIALS_PATH")
SA_JSON = os.getenv("FIREBASE_CREDENTIALS_JSON")

# Decide which credential source to use
if not firebase_admin._apps:
    if SA_JSON:
        # Credentials supplied directly as JSON string (ideal for cloud platforms)
        try:
            cred_dict = json.loads(SA_JSON)
        except json.JSONDecodeError as exc:
            raise RuntimeError("FIREBASE_CREDENTIALS_JSON env var contains invalid JSON") from exc
        cred = credentials.Certificate(cred_dict)
    elif SA_PATH:
        sa_file = Path(SA_PATH)
        if not sa_file.exists():
            raise RuntimeError(f"Service account file not found at {sa_file}")
        cred = credentials.Certificate(str(sa_file))
    else:
        # Fall back to Application Default Credentials (if running on GCP or with GOOGLE_APPLICATION_CREDENTIALS set)
        cred = credentials.ApplicationDefault()

    firebase_admin.initialize_app(cred)

auth = Auth()

ORG_ID = os.getenv("ORG_ID")
if not ORG_ID:
    raise RuntimeError("ORG_ID environment variable not set")

_db = firestore.client()

# Simple in-memory cache: {uid: (is_member, expiry_timestamp)}
_ORG_CACHE: Dict[str, Tuple[bool, float]] = {}
_CACHE_TTL = 300  # seconds

async def _user_in_org(uid: str) -> bool:
    """Return True if user UID has ORG_ID in their organizations list.
    Result cached for _CACHE_TTL seconds to avoid hitting Firestore on every request.
    """
    now = time.time()
    cached = _ORG_CACHE.get(uid)
    if cached and cached[1] > now:
        return cached[0]

    def _sync_fetch() -> bool:
        doc = _db.collection("users").document(uid).get()
        if not doc.exists:
            return False
        data = doc.to_dict() or {}
        orgs = data.get("organizations", [])
        for ref in orgs:
            # Firestore stores DocumentReference objects; compare their IDs
            try:
                ref_id = ref.id if hasattr(ref, "id") else str(ref).split("/")[-1]
            except Exception:
                ref_id = str(ref)
            if ref_id == ORG_ID:
                return True
        return False

    is_member = await anyio.to_thread.run_sync(_sync_fetch)
    # cache result
    _ORG_CACHE[uid] = (is_member, now + _CACHE_TTL)
    return is_member

@auth.authenticate
async def get_current_user(
    request: Request,
    authorization: str | None = None,
) -> Auth.types.MinimalUserDict:
    """Verify Firebase ID token or LangSmith API key and return user info."""
    # Check for authorization in query params if not in headers (for EventSource/SSE)
    if authorization is None:
        # Try to get from query params - LangGraph SDK sends it as 'authorization' param
        authorization = request.query_params.get("authorization")
    
    # First try Firebase Authorization header
    if authorization:
        parts = authorization.split(" ", 1)
        if len(parts) == 2 and parts[0].lower() == "bearer":
            token = parts[1]
            # Attempt to verify as Firebase ID token (may raise)
            try:
                decoded_token = await anyio.to_thread.run_sync(firebase_auth.verify_id_token, token)
                uid = decoded_token["uid"]
                # Organisation membership check
                if not await _user_in_org(uid):
                    raise Auth.exceptions.HTTPException(status_code=403, detail="User not in organisation")
                return {"identity": uid}
            except Exception:
                # Not a valid Firebase token – fall through to LangSmith key check below
                pass

    # Search for API key in headers first
    api_key = None
    for header_name in ("x-api-key", "x-langsmith-api-key"):
        if header_name in request.headers:
            api_key = request.headers[header_name]
            break

    # Remove the legacy free-pass for requests with "x-auth-scheme: langsmith".
    # All callers now must present either a Firebase Bearer token or an API key.

    if not api_key:
        # Accept api key via query param for EventSource (cannot send custom headers)
        api_key = (
            request.query_params.get("x-api-key")
            or request.query_params.get("api_key")
            or request.query_params.get("apikey")
        )

    if api_key:
        # Platform already validated the key, so we just trust it
        return {"identity": "langsmith_user"}

    # Otherwise, unauthorized
    raise Auth.exceptions.HTTPException(status_code=401, detail="Unauthorized")
`
```

UseStream integration


```
`// Configure and initialize useStream hook
  const thread = useStream({
    apiUrl: clientUrl,
    assistantId,
    threadId,
    messagesKey: 'messages',
    apiKey: resolvedApiKey,
    onThreadId: async (newThreadId) => {
      if (!threadId && newThreadId) {
        // Attach user_id metadata to the thread so we can server-side filter later
        try {
          if (user && clientUrl) {
            const client = await createLangGraphClient(clientUrl, undefined, organizationId, user, false);
            await client.threads.update(newThreadId, { metadata: { user_id: user.uid } });
          }
        } catch (err) {
          console.warn('Failed to set thread metadata:', err);
        }
        if (organizationId && assistantId) {
          navigate(`/${organizationId}/agents/${assistantId}/thread/${newThreadId}`, { 
            replace: true, 
            state: {} 
          });
        }
      }
    },
    onError: (err) => setThreadError(String(err)),
    // Capture UI messages emitted by the graph
    onCustomEvent: (event: any) => {
      if (event.type === 'ui') {
        setUiMessages(prev => [...prev, event]);
      }
    }
  });
`
```

Also when adding the basic auth from the LangGraph example, streaming stops working.

---
