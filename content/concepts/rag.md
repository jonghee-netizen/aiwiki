---
title: RAG (검색 증강 생성)
category: concepts
description: Retrieval-Augmented Generation - 외부 데이터를 검색해 LLM 응답을 향상시키는 기법
tags: [RAG, 검색, 벡터DB, 응용]
---

# RAG (검색 증강 생성)

**Retrieval-Augmented Generation(RAG)**은 LLM의 응답 생성 시 외부 지식 베이스에서 관련 정보를 검색해 함께 제공하는 기법입니다. LLM의 지식 컷오프와 환각 문제를 줄이는 데 효과적입니다.

## 작동 방식

```
사용자 질문
    ↓
질문을 벡터로 변환 (임베딩)
    ↓
벡터 DB에서 유사한 문서 검색
    ↓
검색된 문서 + 원래 질문을 LLM에 전달
    ↓
LLM이 문서를 참고해 답변 생성
```

## 핵심 구성 요소

### 1. 임베딩 모델
텍스트를 고차원 벡터로 변환합니다.

```python
from openai import OpenAI

client = OpenAI()
response = client.embeddings.create(
    input="검색할 텍스트",
    model="text-embedding-3-small"
)
embedding = response.data[0].embedding
```

### 2. 벡터 데이터베이스
벡터를 저장하고 유사도 검색을 수행합니다.

| 벡터DB | 특징 |
|--------|------|
| Pinecone | 클라우드 기반, 관리 용이 |
| Chroma | 로컬/임베디드, 오픈소스 |
| Weaviate | 멀티모달 지원 |
| Milvus | 대규모 처리에 강함 |
| pgvector | PostgreSQL 확장 |

### 3. 검색 전략

- **밀집 검색(Dense Retrieval)**: 벡터 유사도로 의미 기반 검색
- **희소 검색(Sparse Retrieval)**: BM25 등 키워드 기반 검색
- **하이브리드 검색**: 두 방식을 결합해 정확도 향상

## 간단한 RAG 예시

```python
from anthropic import Anthropic
import chromadb

# 벡터DB 설정
chroma_client = chromadb.Client()
collection = chroma_client.get_collection("wiki")

# 관련 문서 검색
results = collection.query(
    query_texts=["RAG란 무엇인가?"],
    n_results=3
)

# LLM에 컨텍스트와 함께 질문
client = Anthropic()
context = "\n".join(results["documents"][0])
response = client.messages.create(
    model="claude-sonnet-4-6",
    messages=[{
        "role": "user",
        "content": f"다음 문서를 참고해서 답변해줘:\n{context}\n\n질문: RAG란 무엇인가?"
    }]
)
```

## 장단점

**장점**
- LLM 지식 컷오프 극복
- 환각 현상 감소
- 최신 정보 반영 가능
- 도메인 특화 지식 추가 용이

**단점**
- 검색 품질에 결과가 크게 의존
- 시스템 복잡도 증가
- 추가 인프라 비용 발생

## 관련 항목

- [LLM (대규모 언어 모델)](/wiki/concepts/llm)
- [LangChain](/wiki/tools/langchain)
- [프롬프트 엔지니어링](/wiki/concepts/prompt-engineering)
