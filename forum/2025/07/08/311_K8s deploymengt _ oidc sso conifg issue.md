# K8s deploymengt + oidc sso conifg issue

**Topic ID:** 311
**Created:** 2025-07-08 11:30:03
**URL:** https://forum.langchain.com/t/311

---

## Post #1 by @cyberdak
*Posted on 2025-07-08 11:30:03*

I use client serect config sso .

my config is

‘’’

config:

langsmithLicenseKey: “${mr_license}” // replace

apiKeySalt: “x”

authType: mixed

hostname: ${my_ip}

oauth:

enabled: true

oauthClientId:${my_client_id}

oauthClientSecret: ${my_client_secret}

oauthIssuerUrl: [https://sso.bytedance.com/](https://sso.bytedance.com/)

oauthScopes: “email,profile,openid”

‘’’

Our sso / oidc return code and state , but still fail.

[/uploads/short-url/aFlmbXVTjfxJITkr67XstHODzhG.jpeg?dl=1](image1920×1108 153 KB)

my log show this error .

‘’’

{“timestamp”:“2025-07-08T09:50:16.599739479Z”,“level”:“ERROR”,“source”:{“function”:“[http://langchain.com/smith/auth.(*HandlerOAuthSessioned).Callback](langchain.com/smith/auth.(*HandlerOAuthSessioned).Callback)”,“file”:“/app/auth/oauth_sessioned.go”,“line”:635},“message”:“Error completing user authentication”,“service”:“platform-backend”,“trace_id”:“5551a8803ef35750d232c2fc1c48f2a9”,“span_id”:“c0c9bbf83065f544adf25b7bfe5cc479”,“httpRequest”:{“url”:“[http://langsmith-backend.default.svc.cluster.local:1984/oauth/custom-oidc/callback?code=4b443f83c91c47b9b9ebfedeca3a51c9&state=d9fCfiLUDtQbe7KABsWt2y0VeJveRjIXQGbN9bVsxev1U6XsfXKWaDbRH14MZdDj7MKmSokQdhggI598bSwJSw%3D%3D&provider=custom-oidc%22,%22method%22:%22GET%22,%22path%22:%22/oauth/custom-oidc/callback%22,%22remoteIP%22:%22%5B192.168.11.80:43278%5D(http://192.168.11.80:43278/)%22,%22proto%22:%22HTTP/1.1%22,%22requestID%22:%22langsmith-platform-backend-b5cd68d54-f9gbj/tnI3xygp5a-000003%22,%22scheme%22:%22http%22,%22header%22:%7B%22pragma%22:%22no-cache%22,%22cache-control%22:%22no-cache%22,%22user-agent%22:%22Mozilla/5.0](http://langsmith-backend.default.svc.cluster.local:1984/oauth/custom-oidc/callback?code=4b443f83c91c47b9b9ebfedeca3a51c9&state=d9fCfiLUDtQbe7KABsWt2y0VeJveRjIXQGbN9bVsxev1U6XsfXKWaDbRH14MZdDj7MKmSokQdhggI598bSwJSw%3D%3D&provider=custom-oidc",“method”:“GET”,“path”:“/oauth/custom-oidc/callback”,“remoteIP”:“[192.168.11.80:43278](http://192.168.11.80:43278/)”,“proto”:“HTTP/1.1”,“requestID”:“langsmith-platform-backend-b5cd68d54-f9gbj/tnI3xygp5a-000003”,“scheme”:“http”,“header”:{“pragma”:“no-cache”,“cache-control”:“no-cache”,“user-agent”:"Mozilla/5.0) (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/[http://138.0.0.0/](138.0.0.0) Safari/537.36”,“accept”:“text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7”,“referer”:“[http://180.184.37.234/%22,%22accept-encoding%22:%22gzip](http://180.184.37.234/",“accept-encoding”:"gzip), deflate”,“accept-language”:“zh,zh-CN;q=0.9”,“dnt”:“1”,“upgrade-insecure-requests”:“1”}},“err”:“could not find a matching session for this request”}

‘’’

The error is “could not find a matching session for this request”

But  I use the code directly to call sso’s token endpoint . It is success. Because this code is single-one , so the langsmith maybe not visit the token endpoint?

any config i lose?

---
