document.addEventListener('DOMContentLoaded', () => {
    const sendBtn = document.getElementById('sendBtn');
    const resetBtn = document.getElementById('resetBtn');
    const userInput = document.getElementById('userInput');
    const loading = document.getElementById('loading');
    const resultContainer = document.getElementById('resultContainer');
    const levelInputs = document.querySelectorAll('input[name="level"]');

    // Content Display Elements
    const calcResult = document.getElementById('calcResult');
    const coreConcept = document.getElementById('coreConcept');
    const detailExplanation = document.getElementById('detailExplanation');
    const practiceProblem = document.getElementById('practiceProblem');

    // Auto-resize textarea
    function adjustHeight() {
        userInput.style.height = 'auto';
        userInput.style.height = userInput.scrollHeight + 'px';
    }

    userInput.addEventListener('input', adjustHeight);

    // Reset Functionality
    resetBtn.addEventListener('click', () => {
        userInput.value = '';
        adjustHeight();
        resultContainer.classList.add('hidden');
        userInput.focus();
    });

    // Enter to send
    userInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendRequest();
        }
    });

    sendBtn.addEventListener('click', sendRequest);

    async function sendRequest() {
        const message = userInput.value.trim();
        if (!message) return;

        const level = document.querySelector('input[name="level"]:checked').value;

        // Determine API URL (Local vs Production)
        const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
        const apiUrl = isLocal ? 'http://127.0.0.1:5001/api/chat' : '/api/chat';

        // Reset UI (but don't clear question)
        resultContainer.classList.add('hidden');
        loading.classList.remove('hidden');
        // userInput.value = ''; // 이 부분을 주석 처리하거나 제거하여 질문 유지

        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ message, level }),
            });

            const data = await response.json();

            if (data.status === 'success') {
                parseAndDisplayResponse(data.data);
            } else {
                alert('에러가 발생했습니다: ' + (data.error || '알 수 없는 오류'));
            }
        } catch (error) {
            console.error('Fetch error:', error);
            alert('서버와 연결할 수 없습니다. 백엔드 서버가 실행 중인지 확인해 주세요.');
        } finally {
            loading.classList.add('hidden');
        }
    }

    function parseAndDisplayResponse(text) {
        // Simple parser based on the predefined structure
        // (1) Result, (2) Core Concept, (3) Detailed Explanation, (4) Practice Problem

        const sections = {
            result: '',
            concept: '',
            explanation: '',
            practice: ''
        };

        // Regex to split by the markers
        const markers = [
            /\(1\)\s*결과\s*(?:\(Result\))?:?/i,
            /\(2\)\s*핵심\s*개념\s*(?:\(Core Concept\))?:?/i,
            /\(3\)\s*상세\s*풀이\s*(?:\(Detailed Explanation\))?:?/i,
            /\(4\)\s*유사\s*문제\s*(?:\(Practice Problem\))?:?/i
        ];

        let content = text;

        // Extracting sections
        const parts = [];
        let lastIndex = 0;

        // Identify where each section starts
        const foundMarkers = [];
        markers.forEach((marker, i) => {
            const match = text.match(marker);
            if (match) {
                foundMarkers.push({ index: match.index, id: i, length: match[0].length });
            }
        });

        foundMarkers.sort((a, b) => a.index - b.index);

        for (let i = 0; i < foundMarkers.length; i++) {
            const current = foundMarkers[i];
            const next = foundMarkers[i + 1];
            const start = current.index + current.length;
            const end = next ? next.index : text.length;

            const partContent = text.substring(start, end).trim();

            if (current.id === 0) sections.result = partContent;
            else if (current.id === 1) sections.concept = partContent;
            else if (current.id === 2) sections.explanation = partContent;
            else if (current.id === 3) sections.practice = partContent;
        }

        // Apply to DOM
        calcResult.innerHTML = formatMarkdown(sections.result || '결과를 불러올 수 없습니다.');
        coreConcept.innerHTML = formatMarkdown(sections.concept || '개념 설명을 불러올 수 없습니다.');
        detailExplanation.innerHTML = formatMarkdown(sections.explanation || '상세 풀이를 불러올 수 없습니다.');
        practiceProblem.innerHTML = formatMarkdown(sections.practice || '문제를 생성할 수 없습니다.');

        // Show Container
        resultContainer.classList.remove('hidden');

        // Render Math (KaTeX)
        renderMathInElement(resultContainer, {
            delimiters: [
                { left: '$$', right: '$$', display: true },
                { left: '$', right: '$', display: false },
                { left: '\\(', right: '\\)', display: false },
                { left: '\\[', right: '\\]', display: true }
            ],
            throwOnError: false
        });
    }

    function formatMarkdown(text) {
        // Basic markdown-to-html (bold, list, newline)
        return text
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\n/g, '<br>')
            .replace(/^- (.*)/gm, '• $1');
    }
});
