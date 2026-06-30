---
title: Claude
category: models
description: Anthropic이 개발한 AI 어시스턴트 모델 시리즈
tags: [Anthropic, LLM, 안전한AI]
---

# Claude

Claude는 Anthropic이 개발한 AI 어시스턴트 모델 시리즈입니다. 안전하고 유익하며 정직한 AI를 목표로 Constitutional AI 방법론을 적용해 훈련되었습니다.

## 주요 특징

- **긴 컨텍스트 윈도우**: 최대 200,000 토큰 처리
- **Constitutional AI**: 안전성과 정렬을 중시하는 훈련 방식
- **코딩 능력**: 복잡한 코드 작성 및 분석에 강함
- **멀티모달**: 텍스트, 이미지, 문서 처리 가능

## 모델 라인업 (2025 기준)

| 모델 | 특징 | 용도 |
|------|------|------|
| Claude Opus 4.8 | 가장 강력한 성능 | 복잡한 추론, 연구 |
| Claude Sonnet 4.6 | 성능/속도 균형 | 일반적인 작업 |
| Claude Haiku 4.5 | 빠르고 경제적 | 대량 처리, 실시간 응답 |
| Claude Fable 5 | 최신 모델 | 최고 성능 |

## Constitutional AI

Constitutional AI는 Anthropic이 개발한 훈련 방법론으로, AI가 스스로의 출력을 평가하고 개선하는 방식입니다.

```
1. AI가 초기 응답 생성
2. 헌법(원칙 목록)에 따라 자체 평가
3. 피드백을 반영해 응답 수정
4. 인간 피드백(RLHF)으로 추가 개선
```

## API 사용 예시

```python
import anthropic

client = anthropic.Anthropic()
message = client.messages.create(
    model="claude-sonnet-4-6",
    max_tokens=1024,
    messages=[
        {"role": "user", "content": "Claude의 특징을 설명해줘"}
    ]
)
print(message.content[0].text)
```

## 관련 항목

- [LLM (대규모 언어 모델)](/wiki/concepts/llm)
- [GPT-4](/wiki/models/gpt-4)
- [RAG](/wiki/concepts/rag)
