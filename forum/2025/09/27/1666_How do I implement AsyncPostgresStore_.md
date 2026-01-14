# How do I implement AsyncPostgresStore?

**Topic ID:** 1666
**Created:** 2025-09-27 16:27:46
**URL:** https://forum.langchain.com/t/1666

**Tags:** intro-to-langgraph, ambient-agents-with-

---

## Post #1 by @ltcompounder
*Posted on 2025-09-27 16:27:46*

Hi LangChain community, I’m a self-professed noob and I just got started with LangMem and have been reading the docs.

However I don’t know how `AsyncPostgresStore` actually works. I understand that I need to create an `index_config` and specify an embedding model, in this case`openai:text-embedding-3-small`. I’m assuming by specifying an embedding model that there is some sort of vector table in my postgres db.

I have 3 sets of questions regarding implementation of long-term memory:


Is specifying an embedding model necessary for long-term memory to work? Is it recommended? What happens if I don’t use an embedding model?
I see 2 tables in my DB `store` and `store_vectors`. If I don’t specify an embedding model, then only `store` will be used? How do both tables get used by AsyncPostgresStore?
When `.aput` or `.asearch` is called, how does `memory_searcher` or `memory_manager` figure out whether to save to `store` or `store_vector`? Throughout my setup I didn’t explicit do `CREATE TABLE store or store_vector` and I didn’t see any documentation on setting this up so far, so I feel very uneasy with this “magic”

Any guidance would be really appreciated!

---

## Post #2 by @Maxxoto
*Posted on 2025-11-15 16:39:23*

Embedding is optional , but it will improve the search. If you dont add embedding model into “store” object then it will only search using keyword , example : (SELECT * from store WHERE value like %query% ) . See the docs : [https://reference.langchain.com/python/langgraph/store/#langgraph.store.postgres.AsyncPostgresStore](Storage (LangGraph) | LangChain Reference)



If you dont specific embedding it will only use “store” table . You can check the implementation by looking on the libs itself.



Unfortunately i cant answer this clearly , but all of them is well documented only inside the libs on “site-packages” of your projects.

Here’s my implementation:


```
`embeddings = init_embeddings(“ollama:nomic-embed-text”)
logger.debug(f"Embeddings initialized: {embeddings is not None}")

        # Create async connection pool for better performance
        self._conn_pool = AsyncConnectionPool(
            conninfo=os.getenv("POSTGRES_URL"),
            min_size=1,
            max_size=10,
            open=False,
        )
        # Open the pool explicitly (required for newer versions)
        await self._conn_pool.open()

        # Create PostgresStore instance with vector indexing for semantic search
        self._long_term_memory_store = AsyncPostgresStore(
            conn=self._conn_pool,
            index={
                "dims": 768,
                "embed": embeddings,
                "fields": ["content"] # always put this as content or $ coz langmem store as content object , if you wrong to set this up it wont saved to store_vectors,
                "distance_type": "cosine",
            },
        )

        await self._long_term_memory_store.setup()

`
```


```
`

`
```

CMIIW guys

---

## Post #3 by @archupsg03
*Posted on 2025-12-10 13:28:12*

```
`from langgraph.store.postgres.aio import AsyncPostgresStore - I could not find this module
`
```

langgraph version is 1.04. Help is appreciated

---

## Post #4 by @pawel-twardziak
*Posted on 2025-12-10 13:31:59*

[/u/archupsg03](@archupsg03)  try this `from langgraph.store.postgres import AsyncPostgresStore`

---

## Post #5 by @archupsg03
*Posted on 2025-12-10 13:46:14*

pawel-twardziak:

from langgraph.store.postgres import AsyncPostgresStore



from langgraph.store.postgres import AsyncPostgresStore

Traceback (most recent call last):

File “”, line 1, in

ModuleNotFoundError: No module named ‘langgraph.store.postgres’






[/u/pawel-twardziak](@pawel-twardziak)

---

## Post #6 by @archupsg03
*Posted on 2025-12-10 13:51:23*

archupsg03:

langgraph.store.postgres import AsyncPostgresStore



langgraph-checkpoint-postgres - installing this helped

---
