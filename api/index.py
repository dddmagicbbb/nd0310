import os
from flask import Flask, request, jsonify
from flask_cors import CORS
from groq import Groq
from dotenv import load_dotenv

# .env 파일 로드
load_dotenv()

# static_folder를 루트와 public으로 설정하여 파일 서비스
app = Flask(__name__, static_folder='../', static_url_path='/')
CORS(app)

# Groq 클라이언트 초기화
client = Groq(api_key=os.environ.get("GROQ_API_KEY"))

@app.route('/', methods=['GET'])
def home():
    # 루트 접속 시 index.html 파일을 반환합니다.
    return app.send_static_file('index.html')

@app.route('/api/test', methods=['GET'])
def test_connection():
    return jsonify({
        "status": "success",
        "message": "Edu-Calc AI API Server is running!"
    })

# 수준별 시스템 프롬프트 정의
SYSTEM_PROMPTS = {
    "elementary": (
        "당신은 초등학생을 위한 친절한 수학 선생님입니다. "
        "초등학생이 이해하기 쉬운 단어와 비유(사과, 초콜릿 등)를 사용하여 설명하세요. "
        "어려운 용어는 피하고, 친근한 말투(~해요, ~인가요?)를 사용하세요. "
        "모든 수식은 $ 기호로 감싸서 작성하세요. (예: $1 + 1 = 2$)"
    ),
    "middle-school": (
        "당신은 중학생을 대상으로 하는 수학 강사입니다. "
        "기초적인 수학적 용어를 사용하기 시작하고, 논리적인 단계별 풀이 과정을 강조하세요. "
        "중학교 과정의 개념(음수, 미지수 x 등)을 명확히 정의해 주세요. "
        "모든 수식은 $ 기호로 감싸서 작성하세요."
    ),
    "high-school": (
        "당신은 고등학교 수학과 공학을 가르치는 전문 튜터입니다. "
        "수식의 유도 과정과 핵심 원리를 논리적으로 설명하세요. "
        "입시나 심화 학습에 도움이 되도록 개념의 연결성을 강조하세요. "
        "모든 수식은 $ 기호로 감싸서 작성하세요."
    ),
    "university": (
        "당신은 대학 수준의 수학 및 전공 공학을 강의하는 교수입니다. "
        "정의(Definition), 정리(Theorem), 증명(Proof)을 포함하여 학술적이고 엄밀하게 설명하세요. "
        "필요한 경우 미적분, 선형대수학 등 고급 수학적 기법을 사용하세요. "
        "모든 수식은 $ 기호나 $$ 기호로 감싸서 작성하세요."
    )
}

@app.route('/api/chat', methods=['POST'])
def chat():
    data = request.json
    user_input = data.get('message')
    level = data.get('level', 'high-school')

    if not user_input:
        return jsonify({"error": "메시지를 입력해 주세요."}), 400

    level_prompt = SYSTEM_PROMPTS.get(level, SYSTEM_PROMPTS["high-school"])

    try:
        chat_completion = client.chat.completions.create(
            messages=[
                {
                    "role": "system",
                    "content": (
                        f"{level_prompt}\n\n"
                        "반드시 다음 형식을 엄격히 지켜서 답변하세요:\n"
                        "(1) 결과 (Result): 최종 계산 결과값\n"
                        "(2) 핵심 개념 (Core Concept): 핵심 원리 1~2문장 요약\n"
                        "(3) 상세 풀이 (Detailed Explanation): 단계별 풀이 과정\n"
                        "(4) 유사 문제 (Practice Problem): 학습한 개념을 복습할 수 있는 유사 문제 1개"
                    )
                },
                {
                    "role": "user",
                    "content": user_input,
                }
            ],
            model="llama-3.3-70b-versatile",
            temperature=0.7, # 창의적인 문제 생성을 위해 약간의 온도 설정
        )
        
        response_text = chat_completion.choices[0].message.content
        return jsonify({
            "status": "success",
            "data": response_text
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    # host='0.0.0.0' 설정을 통해 외부(동일 네트워크)에서 접속이 가능하도록 합니다.
    app.run(debug=True, host='0.0.0.0', port=5001)
