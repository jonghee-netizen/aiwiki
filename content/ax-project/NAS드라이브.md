---
category: ax-project
title: NAS 드라이브 구성
description: NAS Video Quick Searcher - NAS 드라이브 구성
tags: [NAS, AX-project]
---

# NAS 드라이브 구성

| 드라이브 | 서버 | 사용 브랜드 |
|---------|------|------------|
| Z:\ | 기본 NAS | 샤르드, 트리코닉스, 닥터빼, 이옴, 링탭 |
| Y:\ | 광고팀 NAS (\\192.168.200.70) | 솔티스 |
| X:\ | 광고팀 NAS | 화이니카 |

## 참고

- 브랜드마다 드라이브가 다를 경우 `selectBrand()` 함수가 자동으로 해당 드라이브를 감지해 스캔
- 감지 방식: `activeBrand.path.slice(0, 3)` (예: `Y:\`)
- 기본 NAS 경로(nas_path)는 `config.json`에서 설정
