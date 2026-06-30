---
title: GPT-4
category: models
description: OpenAI의 대규모 멀티모달 언어 모델
tags: [OpenAI, LLM, 멀티모달]
---

# GPT-4

GPT-4는 OpenAI가 2023년 3월에 출시한 대규모 멀티모달 언어 모델입니다. 텍스트와 이미지를 입력으로 받아 텍스트를 출력할 수 있습니다.

## 주요 특징

- **멀티모달**: 텍스트와 이미지 모두 처리 가능
- **향상된 추론 능력**: GPT-3.5 대비 복잡한 추론 문제에서 높은 성능
- **긴 컨텍스트 윈도우**: 최대 128,000 토큰 처리 (GPT-4 Turbo)
- **함수 호출(Function Calling)**: 외부 도구 및 API와 연동 가능

## 모델 변형

| 모델 | 컨텍스트 | 특징 |
|------|---------|------|
| GPT-4 | 8K/32K | 기본 모델 |
| GPT-4 Turbo | 128K | 빠르고 저렴한 버전 |
| GPT-4o | 128K | 멀티모달 최적화 |
| GPT-4o mini | 128K | 경량화 버전 |

## 활용 사례

1. 코드 생성 및 디버깅
2. 문서 요약 및 분석
3. 이미지 설명 및 분석
4. 복잡한 수학/논리 문제 풀이
5. 다국어 번역 및 처리

## API 사용 예시

```python
from openai import OpenAI

client = OpenAI()
response = client.chat.completions.create(
    model="gpt-4o",
    messages=[
        {"role": "user", "content": "GPT-4의 특징을 설명해줘"}
    ]
)
print(response.choices[0].message.content)
```

## 관련 항목

- [LLM (대규모 언어 모델)](/wiki/concepts/llm)
- [Claude](/wiki/models/claude)
- [프롬프트 엔지니어링](/wiki/concepts/prompt-engineering)
