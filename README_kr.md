# LangChain RAG 개발 시스템

LangSmith 관찰성을 갖춘 프레임워크 독립적 RAG (Retrieval-Augmented Generation) 시스템.

## 개요

- **언어**: Python (LangServe 백엔드) + Next.js (프론트엔드)
- **벡터 스토어**: FAISS (2,493개 사전 임베딩된 문서)
- **LLM**: OpenAI GPT-4 + Cross-encoder 리랭킹
- **관찰성**: 모든 RAG 쿼리에 LangSmith 추적

## 빠른 시작

### 1. 백엔드 설정 (Python)

```bash
cd backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -e .

# 환경 변수
cp .env.example .env
# .env 파일에 API 키 입력:
# OPENAI_API_KEY=sk-...
# LANGSMITH_API_KEY=lsv2_...

# 서버 시작
uvicorn app.main:app --reload --port 8000
```

### 2. 프론트엔드 설정 (Next.js)

```bash
cd app
npm install
npm run dev  # http://localhost:3000
```

### 3. 설치 확인

- 백엔드 상태: http://localhost:8000/docs
- LangServe 플레이그라운드: http://localhost:8000/langserve/chat/playground
- 프론트엔드: http://localhost:3000

## 아키텍처

```
Next.js 프론트엔드 (포트 3000)
        |
        v HTTP/SSE
Python LangServe 백엔드 (포트 8000)
        |
        v
    LCEL RAG 체인
    - 쿼리 임베딩 (OpenAI)
    - FAISS 검색 (top-10)
    - Cross-encoder 리랭킹 (top-5)
    - 답변 생성 (GPT-4)
        |
        v
  LangSmith 추적 (자동)
```

## 프로젝트 구조

```
langchain/
├── app/                    # Next.js 프론트엔드
│   ├── app/               # App Router 페이지
│   ├── components/        # React 컴포넌트
│   └── lib/               # API 클라이언트, 유틸리티
│
├── backend/               # Python LangServe 백엔드
│   ├── app/
│   │   ├── chains/        # LCEL RAG 체인
│   │   ├── components/    # 리랭커, 평가기
│   │   ├── loaders/       # 임베딩 로더
│   │   ├── models/        # Pydantic 스키마
│   │   └── routes/        # API 엔드포인트
│   └── data/              # 임베딩 (심볼릭 링크)
│
├── skills/                # AI 어시스턴트 스킬
├── templates/             # 체크리스트, 템플릿
└── docs/                  # 문서
```

## API 엔드포인트

### Chat API

```bash
# POST /api/chat - RAG 쿼리
curl -X POST http://localhost:8000/api/chat \
  -H "Content-Type: application/json" \
  -d '{"query": "LangSmith란 무엇인가요?"}'

# 응답
{
  "answer": "LangSmith는...",
  "sources": [...],
  "trace": {
    "embeddingDuration": 0.5,
    "retrievalDuration": 0.6,
    "rerankingDuration": 0.1,
    "generationDuration": 4.5,
    "totalDuration": 5.7
  }
}
```

### Evaluation API

```bash
# GET /api/evaluation - LangSmith 메트릭
curl "http://localhost:8000/api/evaluation?type=all&limit=20"

# 응답 포함 내용:
# - summary: avgFaithfulness, avgRelevance, avgLatency
# - runs: 메트릭이 포함된 최근 RAG 쿼리 실행
# - traces: 점수가 포함된 개별 쿼리 추적
```

## 주요 기능

### 1. LCEL RAG 체인

```python
# backend/app/chains/rag_chain.py
chain = (
    RunnablePassthrough.assign(documents=retrieve)
    | RunnablePassthrough.assign(reranked_docs=rerank)
    | RunnablePassthrough.assign(
        context=format_context,
        sources=format_sources,
    )
    | RunnablePassthrough.assign(answer=prompt | llm | parser)
    | RunnableParallel(answer=..., sources=..., trace=...)
)
```

### 2. Cross-Encoder 리랭킹

- 모델: `cross-encoder/ms-marco-MiniLM-L-6-v2`
- top-10 검색 후 top-5로 리랭킹
- 답변 관련성 크게 향상

### 3. LangSmith 통합

- 모든 RAG 쿼리가 "RAG Query"로 자동 추적
- 평가 메트릭: Faithfulness, Relevance, Coherence
- 피드백 비동기 제출

### 4. 자동 평가

```python
# 각 쿼리 후 계산
scores = {
    "faithfulness": 0.95,  # 답변이 출처에 근거하는가?
    "relevance": 0.92,     # 컨텍스트가 쿼리와 관련있는가?
    "coherence": 0.88,     # 답변이 잘 구조화되었는가?
    "overall": 0.92
}
```

## 보호된 스키마

**승인 + 영향 분석 없이 절대 수정 금지:**

| 요소 | 영향 | 복구 시간 |
|------|------|-----------|
| 임베딩 차원 | 모든 벡터 무효화 | 수 시간 (재인덱싱) |
| 청킹 전략 | 문서 재처리 필요 | 수 시간 |
| 거리 메트릭 | 모든 랭킹 변경 | N/A (A/B 테스트) |
| 메타데이터 스키마 | 쿼리 필터 실패 가능 | 수 분 |

### 수정 전 체크리스트

1. **임베딩 차원 변경?** - 중단 (전체 재인덱싱 필요)
2. **청킹 전략 변경?** - 중단 (문서 재처리 필요)
3. **메타데이터 스키마 변경?** - 주의 (하위 호환성 확인)
4. **거리 메트릭 변경?** - 중단 (모든 랭킹에 영향)
5. **프롬프트/LLM 설정만?** - 진행 (안전한 실험)

## 테스트

### 백엔드 테스트

```bash
cd backend
pytest tests/                    # 모든 테스트
pytest tests/test_chain.py       # 체인 테스트
pytest --cov=app                 # 커버리지 리포트
```

### 프론트엔드 테스트

```bash
cd app
npm run type-check               # TypeScript 검사
npm run lint                     # ESLint
npm run build                    # 프로덕션 빌드
```

### LangSmith 검증

1. https://smith.langchain.com 열기
2. 프로젝트로 이동: `langchain-forum-rag`
3. "RAG Query" 추적 표시 확인
4. 각 실행의 피드백 점수 확인

## 환경 변수

### 백엔드 (.env)

```bash
# 필수
OPENAI_API_KEY=sk-...

# LangSmith (자동 추적)
LANGSMITH_API_KEY=lsv2_...
LANGCHAIN_TRACING_V2=true
LANGCHAIN_PROJECT=langchain-forum-rag

# 선택
USE_MOCK_CHAT=false
RETRIEVAL_TOP_K=10
RERANK_TOP_K=5
```

### 프론트엔드 (.env.local)

```bash
NEXT_PUBLIC_API_URL=http://localhost:8000
```

## 개발 명령어

### 백엔드

```bash
# 개발 서버 시작
uvicorn app.main:app --reload --port 8000

# 타입 검사
python -m mypy app/

# 린팅
ruff check app/
ruff format app/
```

### 프론트엔드

```bash
# 개발
npm run dev

# 타입 검사
npm run type-check

# 빌드
npm run build
```

## 문제 해결

### 낮은 검색 품질

1. `embedding_loader.py`에서 청크 전략 확인
2. 임베딩 차원 확인 (1536이어야 함)
3. `RETRIEVAL_TOP_K`와 `RERANK_TOP_K` 조정 시도

### 답변의 환각 현상

1. LangSmith에서 Faithfulness 점수 확인
2. `rag_chain.py`의 시스템 프롬프트 검토
3. 필요시 LLM temperature 낮추기

### 느린 쿼리 지연

1. 추적 분석 확인 (임베딩, 검색, 생성)
2. 비동기 작업 고려
3. FAISS 인덱스 로드 확인 (시작 로그 확인)

### 평가가 0% 표시

1. RAG 체인에 `@traceable(name="RAG Query")` 데코레이터 확인
2. `evaluation.py`가 "RAG Query" 실행을 필터링하는지 확인
3. LangSmith API 키 유효성 확인

## 기여

1. AI 어시스턴트 규칙은 `CLAUDE.md` 참조
2. 스키마 변경 전 `templates/rag-checklist.md` 확인
3. 커밋 전 타입 검사 및 테스트 실행
4. 커밋 형식 사용: `feat:`, `fix:`, `docs:`

## 라이선스

MIT License

---

**버전**: 2.0 (Python LangServe 백엔드)
**최종 업데이트**: 2025-01-15
**상태**: 프로덕션 준비 완료
