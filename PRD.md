# [PRD] Edu-Calc AI: 단계별 학습형 공학계산기

## 1. Product Vision & Goals

### 1.1 Vision
복잡한 수식을 해결하는 도구를 넘어, 학습자의 수준에 맞춰 지식을 전달하고 문제 해결의 원리를 내재화시키는 **'개인 맞춤형 AI 수학 튜터'**를 지향한다.

### 1.2 Goals
- 누구나 자연어로 수식을 입력하고 정확한 계산 결과를 얻을 수 있도록 함.
- 초/중/고/대학생 각각의 인지 수준에 최적화된 설명 방식을 제공하여 학습 효과 극대화.
- 유사 문제 제공을 통해 학습자가 배운 개념을 즉시 복습하고 응용할 수 있는 환경 구축.

---

## 2. Target Audience
| 타겟 그룹 | 주요 사용 목적 | 니즈 (Needs) |
| :--- | :--- | :--- |
| **초등학생** | 산수 원리 파악 및 숙제 보조 | 쉬운 비유와 그림 같은 설명, 정답 확인. |
| **중/고등학생** | 시험 대비 개념 정리 및 오답 분석 | 공식의 유도 과정, 변형 문제 풀이. |
| **대학생** | 전공 서적 수식 풀이 및 개념 증명 | 엄밀한 수학적 정의, 복잡한 미적분/선형대수 풀이. |
| **일반인/부모** | 자녀 교육 지도 및 빠른 수식 계산 | 자녀에게 설명해줄 수 있는 핵심 키워드 파악. |

---

## 3. User Stories

| ID | 사용자 역할 | 사용자 요구사항 (User Story) | 우선순위 |
| :--- | :--- | :--- | :--- |
| **US-01** | 사용자 | 일상적인 말(자연어)로 수식을 입력하면 AI가 이를 인식하고 풀이해주기를 원함. | P0 |
| **US-02** | 학습자 | 내 학년(수준)에 맞는 단어와 난이도로 설명을 들어서 내용을 쉽게 이해하고 싶음. | P0 |
| **US-03** | 학습자 | 결과만 보는 게 아니라, 이 풀이에 사용된 원리가 무엇인지 핵심 개념만 알고 싶음. | P1 |
| **US-04** | 학습자 | 방금 푼 문제와 비슷한 문제를 풀어보며 내 실력을 확인하고 싶음. | P1 |
| **US-05** | 학생 | 복잡한 수식이 깨지지 않고 예쁘게(수식 폰트) 보이기를 원함. | P2 |

---

## 4. Functional Requirements

### 4.1 핵심 엔진 (AI Engine)
- **자연어 처리**: 사용자의 불완전한 문장을 수학적 기호로 변환. (ex. "루트 2" -> $\sqrt{2}$)
- **Groq API 연동**: Llama 3 혹은 Mixtral 모델을 사용하여 초고속 응답 성능 확보.
- **난이도 필터링**: 시스템 프롬프트를 통해 4가지 레벨(초/중/고/대)별 맞춤형 페르소나 적용.

### 4.2 사용자 인터페이스 (Web UI)
- **입력창**: 직관적인 단일 입력창 구조.
- **수준 선택**: Toggle 혹은 Radio 버튼을 통한 학습 레벨 선택 기능.
- **결과 섹션**: 
  - Result: 최종 계산 결과.
  - Core Concept: 핵심 원리 1~2문장 요약.
  - Explanation: 아코디언 형태의 단계별 상세 풀이.
  - Practice: 유사 문제 제시.

### 4.3 수식 렌더링
- KaTeX 라이브러리를 사용하여 브라우저에서 LaTex 형식의 수식을 고해상도로 렌더링.

---

## 5. Non-Functional Requirements

- **성능 (Performance)**: Groq AI를 활용하여 AI 응답 대기 시간을 2초 이내로 유지.
- **접근성 (Accessibility)**: 모바일/태블릿에서도 편리하게 이용 가능한 반응형 디자인.
- **안정성 (Reliability)**: Vercel 배포를 통한 99.9% 이상의 가용성 확보.
- **보안 (Security)**: OpenAI/Groq API Key 노출 방지 (Backend 서버 처리 필수).

---

## 6. User Flow

1. **접속**: 사용자가 Edu-Calc AI 웹사이트에 접속.
2. **수준 선택**: 메인 화면에서 본인의 학습 수준(초/중/고/대)을 선택.
3. **수식 입력**: 채팅창 형태의 입력박스에 자연어나 수식을 입력.
4. **결과 확인**: 
   - 즉시 결과값이 노출됨.
   - 하단에 '핵심 개념' 카드가 나타남.
   - '상세 풀이' 클릭 시 단계별 과정 확인.
5. **학습 확장**: 하단에 제시된 '유사 문제'를 보며 추가 학습 진행.

---

## 7. Success Metrics (KPI)

- **응답 정확도**: 사용자 입력 수식에 대한 올바른 해석 및 계산 성공률 95% 이상.
- **사용자 유지율**: 유사 문제를 클릭하거나 상세 풀이를 열람하는 사용자 비율.
- **성능 지표**: API 호출부터 결과 출력까지의 평균 소요 시간 (LMM Latency).

---

## 8. Development Stack
- **Frontend**: HTML5, CSS3, Vanilla JS, KaTeX
- **Backend**: Python 3.10+, Flask
- **AI**: Groq (Llama 3 70B recommended for accuracy)
- **Deployment**: Vercel (Frontend & Serverless Functions)
- **VCS**: Git (GitHub)

---

## 9. Project Structure

본 프로젝트는 Frontend(Vanilla JS)와 Backend(Flask)가 공존하는 구조로, Vercel의 Python Runtime 규격에 맞춰 다음과 같이 구성합니다.

```text
Edu-Calc-AI/
├── api/                # Vercel Serverless Functions (Flask)
│   ├── index.py        # Flask App Entry Point
│   └── requirements.txt # Backend Dependencies
├── public/             # Static Assets
│   ├── css/
│   │   └── style.css   # Custom UI Styles
│   ├── js/
│   │   └── script.js   # Frontend Logic & AI API Calls
│   └── images/         # UI Elements & Logos
├── index.html          # Main Application Entry Page
├── .env.example        # Environment Variables Template
├── .gitignore          # Git Exclusion List
├── PRD.md              # Product Requirements Document
├── 프로그램 개요서.md   # Program Specification
└── README.md           # Project Documentation
```

### 9.1 Key Directories
- **api/**: 백엔드 로직이 위치하며, Vercel 배포 시 서버리스로 동작합니다.
- **public/**: CSS, Client-side JS, 이미지 등 정적 리소스를 관리합니다.
- **index.html**: 루트 경로에서 호출되는 메인 페이지입니다.

---

## 10. Design System & Style Guide

### 10.1 테마 및 무드 (Theme & Mood)
- **Concept**: "Sleek Intelligence" - 깔끔하면서도 첨단 기술이 느껴지는 연구소/학습실 분위기.
- **Style**: 글래스모피즘(Glassmorphism)과 네온 포인트를 활용한 모던 프리미엄 디자인.

### 10.2 컬러 팔레트 (Color Palette)
- **Primary**: `#0F172A` (Deep Indigo / Space Blue) - 배경 및 베이스 컬러.
- **Secondary**: `#38BDF8` (Sky Blue) - 텍스트 포인트 및 인터랙션 강조.
- **Accent**: `#818CF8` (Soft Violet) - '대학' 레벨 혹은 특별 개념 강조 시 사용.
- **Success/Result**: `#10B981` (Emerald) - 정답 및 계산 완료 표시.

### 10.3 타이포그래피 (Typography)
- **Primary Font**: `'Inter', 'Outfit', sans-serif` (Google Fonts) - 가독성이 높고 현대적인 느낌의 산세리프체.
- **Math Font**: `KaTeX` 기본 폰트 - 수식의 명확한 전달을 위해 사용.

### 10.4 주요 UI 요소 디자인
- **입력창 (Glass Input)**: 반투명한 배경에 은은한 외곽선 글로우(Glow) 효과를 적용하여 집중도 향상.
- **레벨 셀렉터 (Floating Pills)**: 사용자의 현재 레벨이 부드러운 슬라이딩 애니메이션과 함께 강조되는 플로팅 버튼 형태.
- **결과 카드 (Motion Cards)**:
  - AI 응답 시 카드가 아래에서 위로 부드럽게 솟아오르는(Fade-in up) 애니메이션 적용.
  - 마우스 오버 시 미세하게 확대되는 호버 효과.
- **수식 렌더링**: 다크 모드에서도 가독성이 뛰어난 밝은 화이트/스카이블루 톤의 수식 표기.

### 10.5 마이크로 인터랙션 (Micro-animations)
- **Loading State**: Groq AI 연산 중 "AI가 원리를 분석 중입니다..."라는 문구와 함께 부드러운 펄스(Pulse) 애니메이션 노출.
- **Copy Function**: 결과값 클릭 시 "복사됨!" 툴팁이 작게 나타났다 사라지는 직관적인 피드백.

---

## 11. Release Plan

| 단계 | 주요 작업 내용 | 목표 기한 |
| :--- | :--- | :--- |
| **1단계** | **환경 설정 및 API 연동** (기본 인프라 구축, Groq API 연결 테스트) | Sprint 1 |
| **2단계** | **프론트엔드 UI 개발** (랜딩 페이지, 입력창, 결과 카드 디자인 시스템 적용) | Sprint 2 |
| **3단계** | **백엔드 로직 구현** (Flask 서버 구축, 레벨별 시스템 프롬프트 로직 완성) | Sprint 3 |
| **4단계** | **통합 및 배포** (프론트-백엔드 연동, Vercel 배포 및 최종 QA) | Sprint 4 |
