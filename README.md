# Edu-Calc AI (단계별 학습형 공학계산기)

AI(Groq Llama 3)를 활용하여 단순한 결과 도출을 넘어, 사용자 수준별 핵심 개념 정리 및 유사 문제를 제공하는 학습용 공학계산기입니다.

## ✨ 주요 기능
- **자연어 기반 수식 입력**: 일상적인 언어로 수식을 입력하고 풀이 가능.
- **4단계 맞춤형 설명**: 초등, 중등, 고등, 대학생 수준에 맞는 용어와 비유 사용.
- **지능형 학습 패키지**: 계산 결과 + 핵심 개념 요약 + 단계별 상세 풀이 + 유사 문제 생성.
- **모던 디자인**: Glassmorphism 기반의 프리미엄 UI 및 KaTeX 수식 렌더링.

## 🛠 기술 스택
- **Frontend**: HTML5, CSS3, Vanilla JavaScript, KaTeX
- **Backend**: Python, Flask, Groq AI API
- **Deployment**: Vercel

## 🚀 시작하기

### 로컬 환경 실행
1.  **의존성 설치**:
    ```bash
    pip install -r api/requirements.txt
    ```
2.  **환경 변수 설정**: `.env` 파일을 생성하고 `GROQ_API_KEY`를 입력합니다.
3.  **서버 실행**:
    ```bash
    python api/index.py
    ```
4.  **클라이언트 접속**: 브라우저에서 `index.html` 파일을 엽니다.

## 📦 프로젝트 구조
```text
Edu-Calc-AI/
├── api/                # Flask Backend (Vercel Serverless)
├── public/             # Static Assets (CSS, JS, Images)
├── index.html          # Frontend Entry Point
├── vercel.json         # Vercel Config
└── ...
```

## 📄 라이선스
MIT License
