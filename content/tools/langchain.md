---
title: LangChain
category: tools
description: LLM 기반 애플리케이션 개발을 위한 오픈소스 프레임워크
tags: [프레임워크, Python, LLM통합]
---

# LangChain

**LangChain**은 LLM을 활용한 애플리케이션 개발을 쉽게 만들어주는 오픈소스 프레임워크입니다. 다양한 LLM, 도구, 데이터 소스를 연결하고 조합할 수 있습니다.

## 핵심 구성 요소

### 1. LLMs / Chat Models
다양한 LLM 제공자를 통일된 인터페이스로 사용합니다.

```python
from langchain_anthropic import ChatAnthropic
from langchain_openai import ChatOpenAI

# Claude 사용
claude = ChatAnthropic(model="claude-sonnet-4-6")

# OpenAI 사용
gpt = ChatOpenAI(model="gpt-4o")

# 동일한 방식으로 호출
response = claude.invoke("안녕하세요!")
```

### 2. Chains
여러 컴포넌트를 순서대로 연결합니다.

```python
from langchain_core.prompts import ChatPromptTemplate
from langchain_anthropic import ChatAnthropic

prompt = ChatPromptTemplate.from_messages([
    ("system", "당신은 AI 전문가입니다."),
    ("user", "{question}")
])

chain = prompt | ChatAnthropic(model="claude-sonnet-4-6")
result = chain.invoke({"question": "RAG란 무엇인가요?"})
```

### 3. Retrieval (RAG)

```python
from langchain_community.vectorstores import Chroma
from langchain_openai import OpenAIEmbeddings

# 벡터 저장소 생성
vectorstore = Chroma.from_documents(
    documents=docs,
    embedding=OpenAIEmbeddings()
)

# 검색기 생성
retriever = vectorstore.as_retriever()
```

### 4. Agents
LLM이 자율적으로 도구를 선택하고 사용합니다.

```python
from langchain.agents import create_tool_calling_agent, AgentExecutor
from langchain_community.tools import DuckDuckGoSearchRun

tools = [DuckDuckGoSearchRun()]
agent = create_tool_calling_agent(llm, tools, prompt)
executor = AgentExecutor(agent=agent, tools=tools)
result = executor.invoke({"input": "오늘 AI 뉴스 검색해줘"})
```

## 장단점

**장점**
- 다양한 LLM 및 도구 통합 용이
- 풍부한 생태계와 예제
- 활발한 커뮤니티

**단점**
- 버전 변경이 잦아 코드 호환성 문제
- 추상화로 인한 디버깅 어려움
- 불필요한 복잡성 추가될 수 있음

## 관련 항목

- [RAG (검색 증강 생성)](/wiki/concepts/rag)
- [LLM (대규모 언어 모델)](/wiki/concepts/llm)
- [프롬프트 엔지니어링](/wiki/concepts/prompt-engineering)
