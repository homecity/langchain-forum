# Dev/Prod Deployment Options

**Topic ID:** 1334
**Created:** 2025-08-26 12:33:01
**URL:** https://forum.langchain.com/t/1334

---

## Post #1 by @ericness
*Posted on 2025-08-26 12:33:01*

I’m working on a graph deployment onto LangGraph Platform. We have a dev version running and now want to set up a separate prod deployment. It seems like the default way to have multiple deployments is to set up two branches in the Github repo. I don’t like the pattern of having a dev branch because it blocks hot fixes and generally can accumulate changes that aren’t in prod unless the engineering team is disciplined about moving changes through the dev branch quickly.

Has anyone tried other methods to have a dev and prod deployment on LGP? Another option I can think of is to use Github actions against the LGP API to create temporary deployments for each feature branch and then clean up the deployment, tracing project, etc when the feature branch is merged to main.

---

## Post #2 by @wfh
*Posted on 2025-08-26 12:40:13*

I think the default recommendation today would be to have your dev deployment redeploy on every push to `main`, and then to update your prod depoyment either manually or using a GHA if you want to tie it to some other lifecycle event.

It’s currently on the roadmap to let you point a deployment to any github reference (like a tag, etc.). Is that what you’d prefer?

---

## Post #3 by @ericness
*Posted on 2025-08-26 12:56:44*

Yes, having deployments tied to GH references like tags would be great. Glad to hear it’s on the roadmap.

---
