# AgriSahayak RAG Pipeline (Phase 6 Architecture)

The Retrieval-Augmented Generation (RAG) module provides grounded agricultural intelligence to AI agents.

## Architecture

```
Agricultural Documents (ICAR, KVK, APMC, Schemes)
       │
       ▼
[app/rag/ingestion/] Document Ingestion & Chunking
       │
       ▼
[app/rag/embeddings/] Embedding Models (BGE-M3 / IndicBERT / OpenAI)
       │
       ▼
Vector Database (pgvector / Qdrant)
       │
       ▼
[app/rag/retrieval/] Hybrid Retrieval (Dense Vector + BM25 Lexical + Reranker)
       │
       ▼
AgriSahayak AI Agent / Multilingual Voice Advisor
```

## Subdirectories

- `ingestion/`: Scrapers, PDF parsers, text splitters for agricultural advisories.
- `embeddings/`: Embedder clients with support for Indian languages (Kannada, Hindi, etc.).
- `retrieval/`: Multi-query, hybrid search, and cross-encoder reranking.
