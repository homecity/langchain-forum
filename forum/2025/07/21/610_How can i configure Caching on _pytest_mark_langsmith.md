# How can i configure Caching on @pytest.mark.langsmith

**Topic ID:** 610
**Created:** 2025-07-21 22:01:55
**URL:** https://forum.langchain.com/t/610

**Tags:** python-help

---

## Post #1 by @darthShana
*Posted on 2025-07-21 22:01:55*

HI Team

I recently switch to using the


```
`@pytest.mark.langsmith
`
```

annotation in my pytest

Which is now caching llm calls, which is great as the llm costs on unit tests was becoming quite painful

However it also seems to cache other api calls (non llm)

like


aws api gateway rest api calls
posts to cognito idp for token exchange

is there a way i can disable the caching on these?

thanks

Dharshans

---

## Post #2 by @jacoblee93
*Posted on 2025-07-30 02:16:06*

Hey [/u/darthshana](@darthShana),

I’m working on a way to allow configuration here. Will update when ready!

Best,

Jacob

---

## Post #3 by @darthShana
*Posted on 2025-07-30 18:43:45*

thanks [/u/jacoblee93](@jacoblee93)

If i can also add that im getting a lot of casset errors to do with

‘set being modified after creation‘

this maybe related..

thanks

Dharshana

---

## Post #4 by @jacoblee9315
*Posted on 2025-08-02 00:08:18*

This is now live in 0.4.10:


  
      

      [https://docs.smith.langchain.com/evaluation/how_to_guides/pytest#caching](docs.smith.langchain.com)
  

  
    

[https://docs.smith.langchain.com/evaluation/how_to_guides/pytest#caching](How to run evals with pytest (beta) | 🦜️🛠️ LangSmith)

  The LangSmith pytest plugin lets Python developers define their datasets and evaluations as pytest test cases.



  

  
    
    
  

  


Let me know how it goes for you!

---

## Post #5 by @darthShana
*Posted on 2025-08-02 21:19:19*

hi [/u/jacoblee9315](@jacoblee9315)

im still getting these


```
`request = >
test_args = ()
test_kwargs = {'mock_user': UserInfo(user_id='test', email='test', first_name='Dharshana', last_name='Ratnayake', company_name=None,...'F_Rental_Statement.pdf'}, 'transaction_type': 'property management'}, reference_docs=[], linked_transaction={}), ...]}
i = 0
repetition_extra = {'cache': '/tmp/test-cache/cassettes', 'cached_hosts': ['api.openai.com', 'https://api.anthropic.com'], 'client': None, 'id': None, ...}

    @functools.wraps(func)
    def wrapper(*test_args: Any, request: Any = None, **test_kwargs: Any):
        if disable_tracking:
            return func(*test_args, **test_kwargs)
    
        # Run test multiple times for repetitions
        for i in range(repetitions):
            repetition_extra = langtest_extra.copy()
>           _run_test(
                func,
                *test_args,
                pytest_request=request,
                **test_kwargs,
                langtest_extra=repetition_extra,
            )

/root/.cache/pypoetry/virtualenvs/my-agent-HzH--rk3-py3.12/lib/python3.12/site-packages/langsmith/testing/_internal.py:388: 
_ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ 
/root/.cache/pypoetry/virtualenvs/my-agent-HzH--rk3-py3.12/lib/python3.12/site-packages/langsmith/testing/_internal.py:995: in _run_test
    ls_utils.with_optional_cache(
/root/.pyenv/versions/3.12.11/lib/python3.12/contextlib.py:144: in __exit__
    next(self.gen)
/root/.cache/pypoetry/virtualenvs/my-agent-HzH--rk3-py3.12/lib/python3.12/site-packages/langsmith/utils.py:579: in with_optional_cache
    with with_cache(path, ignore_hosts, allow_hosts):
         ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
/root/.pyenv/versions/3.12.11/lib/python3.12/contextlib.py:144: in __exit__
    next(self.gen)
/root/.cache/pypoetry/virtualenvs/my-agent-HzH--rk3-py3.12/lib/python3.12/site-packages/langsmith/utils.py:567: in with_cache
    with ls_vcr.use_cassette(cache_file):
         ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
/root/.cache/pypoetry/virtualenvs/my-agent-HzH--rk3-py3.12/lib/python3.12/site-packages/vcr/cassette.py:98: in __exit__
    next(self.__finish, None)
/root/.cache/pypoetry/virtualenvs/my-agent-HzH--rk3-py3.12/lib/python3.12/site-packages/vcr/cassette.py:57: in _patch_generator
    with contextlib.ExitStack() as exit_stack:
         ^^^^^^^^^^^^^^^^^^^^^^
/root/.pyenv/versions/3.12.11/lib/python3.12/contextlib.py:610: in __exit__
    raise exc_details[1]
/root/.pyenv/versions/3.12.11/lib/python3.12/contextlib.py:595: in __exit__
    if cb(*exc_details):
       ^^^^^^^^^^^^^^^^
_ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ 

self = 
args = (None, None, None)
pool = 
connections = {}
readd_connections = []

    def __exit__(self, *args):
        for pool, connections in self._connection_pool_to_connections.items():
            readd_connections = []
            while pool.pool and not pool.pool.empty() and connections:
                connection = pool.pool.get()
                if isinstance(connection, self._connection_class):
                    connections.remove(connection)
                    connection.close()
                else:
                    readd_connections.append(connection)
            for connection in readd_connections:
                pool._put_conn(connection)
>           for connection in connections:
                              ^^^^^^^^^^^
E           RuntimeError: Set changed size during iteration

/root/.cache/pypoetry/virtualenvs/my-agent-HzH--rk3-py3.12/lib/python3.12/site-packages/vcr/patch.py:391: RuntimeError

`
```

---

## Post #6 by @darthShana
*Posted on 2025-08-02 21:20:42*

i think its to do with running multiple tests..

---

## Post #7 by @jacoblee9315
*Posted on 2025-08-02 22:03:53*

Hmm. If you have a way I can try to repro can you share it? Sounds like running things in parallel?

---

## Post #8 by @darthShana
*Posted on 2025-08-02 22:18:27*

i can add you as a collaborator on GitHub, if you have a username..

im running


```
`      - poetry run pytest --junitxml=test-reports/pytest-report.xml

`
```

i can try running one at a time

---

## Post #9 by @darthShana
*Posted on 2025-08-04 02:26:23*

okey actually think it may be resolved. It looks like this happens when test fail for other reasons..

I will keep monitoring, and raise a different issue if if it comes up again.

thanks [/u/jacoblee9315](@jacoblee9315) for your amazing work

---
