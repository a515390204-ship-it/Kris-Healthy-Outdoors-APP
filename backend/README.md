# backend

Backend services live here.

Responsibilities:

- expose knowledge retrieval APIs
- receive user feedback
- coordinate crawler/worker jobs
- maintain runtime indexes and caches
- read from and write to `travel-knowledge-base/` through controlled pipelines

The knowledge base remains the canonical auditable source. Backend runtime stores are operational derivatives.