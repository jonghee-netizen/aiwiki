---
title: Gemini
category: models
description: Google DeepMind가 개발한 멀티모달 AI 모델 시리즈
tags: [Google, LLM, 멀티모달]
---

# Gemini

**Gemini**는 Google DeepMind가 2023년 12월에 발표한 멀티모달 AI 모델 시리즈입니다. 텍스트, 이미지, 오디오, 영상, 코드 등 다양한 형태의 입력을 처리할 수 있습니다.

## 주요 특징

- **네이티브 멀티모달**: 텍스트·이미지·오디오·영상을 처음부터 함께 학습
- **긴 컨텍스트 윈도우**: Gemini 1.5 Pro 기준 최대 1,000,000 토큰
- **코드 특화**: AlphaCode 기술이 통합되어 코딩 능력 우수
- **Google 생태계 통합**: Google 검색, Gmail, Docs 등과 연동

## 모델 라인업

| 모델 | 컨텍스트 | 특징 |
|------|---------|------|
| Gemini 1.5 Pro | 1,000,000 토큰 | 긴 문서 처리, 영상 분석 |
| Gemini 1.5 Flash | 1,000,000 토큰 | 빠르고 경제적 |
| Gemini 2.0 Flash | 1,000,000 토큰 | 최신, 실시간 처리 강화 |
| Gemini Ultra | 128,000 토큰 | 최고 성능 |

## 활용 사례

1. 긴 PDF·영상 문서 분석 (1시간 영상도 통째로 분석 가능)
2. 코드 생성 및 리뷰
3. 이미지·영상 설명 및 질의응답
4. Google Workspace 자동화
5. 실시간 음성 대화

## API 사용 예시

```python
import google.generativeai as genai

genai.configure(api_key="YOUR_API_KEY")

model = genai.GenerativeModel("gemini-1.5-pro")
response = model.generate_content("Gemini의 특징을 설명해줘")
print(response.text)
```

### 이미지와 함께 사용

```python
import google.generativeai as genai
from PIL import Image

model = genai.GenerativeModel("gemini-1.5-pro")
image = Image.open("screenshot.png")

response = model.generate_content(["이 이미지를 설명해줘", image])
print(response.text)
```

## GPT-4 / Claude와 비교

| 항목 | Gemini 1.5 Pro | GPT-4o | Claude 3.5 |
|------|----------------|--------|------------|
| 컨텍스트 | 1,000,000 토큰 | 128,000 토큰 | 200,000 토큰 |
| 영상 입력 | 지원 | 미지원 | 미지원 |
| 가격 | 중간 | 높음 | 중간 |
| 코딩 능력 | 우수 | 우수 | 우수 |

## 관련 항목

- [LLM (대규모 언어 모델)](/wiki/concepts/llm)
- [GPT-4](/wiki/models/gpt-4)
- [Claude](/wiki/models/claude)
- [멀티모달 AI](/wiki/concepts/multimodal)
