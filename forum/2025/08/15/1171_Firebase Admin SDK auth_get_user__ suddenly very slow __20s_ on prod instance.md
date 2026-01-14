# Firebase Admin SDK auth.get_user() suddenly very slow (~20s) on prod instance

**Topic ID:** 1171
**Created:** 2025-08-15 10:44:25
**URL:** https://forum.langchain.com/t/1171

**Tags:** cloud

---

## Post #1 by @marcinplata
*Posted on 2025-08-15 10:44:25*

We have a node that retrieves user information from Firebase Authentication using the Firebase Admin SDK. We simply use:


```
`from firebase_admin import auth
user = auth.get_user(user_id)
`
```

Until recently, this call consistently took less than 1 second to complete.

However, starting August 14, on our LangGraph Platform’s production instance, it now often takes up to ~20 seconds to get a response.

Has anyone else experienced this slowdown?

[/uploads/short-url/o5lxNNAm0FSuwKtiAdLXUFgikdi.png?dl=1](Screenshot 2025-08-15 at 12.43.49414×103 7.13 KB)

---
