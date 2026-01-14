# Why am I getting this error again and again?

**Topic ID:** 1336
**Created:** 2025-08-26 13:56:10
**URL:** https://forum.langchain.com/t/1336

---

## Post #1 by @Zakiy
*Posted on 2025-08-26 13:56:10*

I have my langgraph.json configured correctly but still the error pops up when I run langgraph dev

[/uploads/short-url/qnzDpAQZX63dTKjGwDHCojICf3P.png?dl=1](image718×352 14.1 KB)

My json file

{

“graphs”: {


```
`"main": "./main.py:graph"
`
```

},

“env”: “./.env”,

“python_version”: “3.11”,

“dependencies”: [


```
`"."
`
```

]

}

---

## Post #2 by @arjun
*Posted on 2025-08-26 14:02:47*

[/u/zakiy](@Zakiy) this likely means that there is an issue with your server. Do you see any errors in your command line logs when you run `langgraph dev`?

---
