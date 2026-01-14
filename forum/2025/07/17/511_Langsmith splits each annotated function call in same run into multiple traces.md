# Langsmith splits each annotated function call in same run into multiple traces

**Topic ID:** 511
**Created:** 2025-07-17 04:41:41
**URL:** https://forum.langchain.com/t/511

**Tags:** python-help

---

## Post #1 by @vavinash992
*Posted on 2025-07-17 04:41:41*

I was trying to make two function calls and log the traces of both the function calls in langsmith. But when i open the platform i can see that both the function calls are logged as different traces.


```
`from dotenv import load_dotenv
from langsmith import traceable
load_dotenv()

@traceable
def test_langsmith_connection():
    """Test function to verify LangSmith tracing is working"""
    print("Testing LangSmith connection...")
    return "LangSmith connection test successful"

@traceable
def test_langsmith_connection_with_run_id():
    """Test function to verify LangSmith tracing with run_id"""
    return "LangSmith connection test successful"

test_langsmith_connection()
test_langsmith_connection_with_run_id()

`
```

[/uploads/short-url/q8JcuBjj6pt1J6w9BNkydClgsF8.png?dl=1](Screenshot 2025-07-17 at 10.11.27 AM2362×274 88 KB)

python version: 3.12.10

---

## Post #2 by @lukanarrative
*Posted on 2025-07-17 10:57:07*

I think what you want to do is this:


```
`from dotenv import load_dotenv
from langsmith import traceable
load_dotenv()

@traceable
def test_langsmith_connection():
    """Test function to verify LangSmith tracing is working"""
    print("Testing LangSmith connection...")
    return "LangSmith connection test successful"

@traceable
def test_langsmith_connection_with_run_id():
    """Test function to verify LangSmith tracing with run_id"""
    return "LangSmith connection test successful"


# Add this:
@traceable
def test():
    test_langsmith_connection()
    test_langsmith_connection_with_run_id()   
    

# test_langsmith_connection()
# test_langsmith_connection_with_run_id()
`
```

I think now you should see one trace, that will contain 2 sub-methods

---
