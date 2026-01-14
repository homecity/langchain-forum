# Time Checkpoint memory backend for LangGraph: restart continuity + SHA receipts (private eval)

**Topic ID:** 2662
**Created:** 2026-01-05 01:48:19
**URL:** https://forum.langchain.com/t/2662

---

## Post #1 by @Empire.Tech
*Posted on 2026-01-05 01:48:19*

Hi LangChain community,

LangChain Support suggested I share this here to route it to the right place.

I’ve built a standalone Time Checkpoint / Memory Folding Engine demo that behaves like an agent-memory backend with:



Deterministic time checkpoints (folded state snapshots over time)



Restart continuity (stop the process, restart, continue from the same truth state)



SHA-256 receipts + audit trail (verifiable artifacts written to disk)



Two integration shapes: library mode (direct calls) or local HTTP service (simple endpoints like state/checkpoint/restore)



This is packaged as a turnkey Windows/Python demo intended for private technical evaluation (not a public code drop). I’m happy to share an evaluator checklist and provide the demo pack privately to the appropriate LangGraph/LangChain contact.

Question: Who is the best person/team to evaluate this as a LangGraph memory provider / checkpoint backend (checkpoint/restore/audit) for a confidential review?

Preferred contact: DM me here, or email [mailto:ristuben.tech@gmail.com](ristuben.tech@gmail.com).

Thanks,

John

---
