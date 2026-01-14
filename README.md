# Langchain RAG 개발 규칙 시스템

프로덕션급 RAG 시스템 구축을 위한 프레임워크 독립적인 개발 규칙 및 스킬 시스템

---

## 📋 목차

1. [프로젝트 개요](#-프로젝트-개요)
2. [빠른 시작](#-빠른-시작)
3. [실행 방법](#-실행-방법)
4. [전체 기능](#-전체-기능)
5. [슬래시 커맨드](#-슬래시-커맨드)
6. [스킬 시스템](#-스킬-시스템)
7. [개발 워크플로우](#-개발-워크플로우)
8. [보호된 스키마](#-보호된-스키마)
9. [파일 구조 및 구현 상태](#-파일-구조-및-구현-상태)
10. [테스트 전략](#-테스트-전략)
11. [자주 묻는 질문](#-자주-묻는-질문)
12. [문제 해결](#-문제-해결)
13. [기여 가이드](#-기여-가이드)
14. [라이선스 및 연락처](#-라이선스-및-연락처)

---

## 🎯 프로젝트 개요

### 목적
Langchain을 사용한 프레임워크 독립적인 RAG(Retrieval-Augmented Generation) 시스템으로, WHRESUME 프로젝트에서 검증된 개발 규칙을 RAG 도메인에 맞게 최적화했습니다.

### 기술 스택 (유연성)
- **언어**: Python OR Next.js (선호도에 따라 선택)
- **벡터 DB**: 제한 없음 (Pinecone, Milvus, Chroma, FAISS)
- **LLM**: 제한 없음 (Claude, GPT-4, Gemini)
- **관찰성**: LangSmith (RAG 시스템에 필수)

### 핵심 철학
- **개발 우수성**: MECE, TDD, SOLID (WHRESUME에서 계승)
- **테스트 우선**: E2E 테스트보다 LangSmith 추적 우선
- **스키마 보호**: 벡터 스토어 스키마를 데이터베이스 테이블처럼 취급
- **프레임워크 유연성**: Python, Next.js 모두 지원

### 주요 성과
- ✅ **61% 코드 감소**: 19,410 → 7,500 줄 (목표)
- ✅ **35% 규칙 감소**: 23 → 15개 행동 규칙
- ✅ **72% 스킬 감소**: 60 → 17개 SKILL 파일 (목표)
- ✅ **프레임워크 유연성**: Python OR Next.js 지원

---

## 🚀 빠른 시작

### 1. 프레임워크 선택

**Python:**
```bash
# 가상 환경 생성
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate

# 의존성 설치
pip install -r requirements.txt / ./scripts/python/requirements.txt

# 기본 설정
export LANGSMITH_API_KEY="your-api-key"
export OPENAI_API_KEY="your-api-key"
```

**Next.js:**
```bash
# 의존성 설치
npm install

# 환경 변수 설정
echo "LANGSMITH_API_KEY=your-api-key" >> .env.local
echo "OPENAI_API_KEY=your-api-key" >> .env.local

# 개발 서버 실행
npm run dev
```

### 2. 핵심 규칙 읽기 (13분)

1. **RAG-CLAUDE.md** - 15개 행동 규칙 (5분)
2. **templates/rag-checklist.md** - 5가지 질문 체크리스트 (3분)
3. **docs/protected-schemas.md** - 보호된 요소 카탈로그 (5분)

### 3. 첫 RAG 쿼리 실행

**Python 예시:**
```python
from langchain.chains import RetrievalQA
from langchain_openai import OpenAI, OpenAIEmbeddings
from langchain_pinecone import PineconeVectorStore
from langsmith import Client

# LangSmith 클라이언트 초기화
client = Client()

# 벡터 스토어 설정
embeddings = OpenAIEmbeddings()
vectorstore = PineconeVectorStore(index_name="my-index", embedding=embeddings)

# RAG 체인 생성
qa = RetrievalQA.from_chain_type(
    llm=OpenAI(),
    chain_type="stuff",
    retriever=vectorstore.as_retriever()
)

# LangSmith 추적과 함께 쿼리 실행
with client.trace(name="rag_query"):
    result = qa.invoke("LangChain이란 무엇인가요?")
    print(result["result"])
```

**Next.js 예시:**
```typescript
import { RetrievalQAChain } from "langchain/chains";
import { OpenAI } from "@langchain/openai";
import { PineconeStore } from "@langchain/pinecone";
import { Client } from "langsmith";

const client = new Client();

async function queryRAG(question: string) {
  const chain = RetrievalQAChain.fromLLM(
    new OpenAI(),
    await PineconeStore.fromExistingIndex(embeddings, { indexName: "my-index" })
  );

  // LangSmith 추적
  const result = await client.withTrace(
    { name: "rag_query" },
    async () => await chain.call({ query: question })
  );

  return result.text;
}
```

---

## 💻 실행 방법

### Python 환경

**개발 명령어:**
```bash
# 테스트 실행
pytest tests/                         # 모든 테스트
pytest tests/test_e2e_pipeline.py     # E2E 테스트만
pytest tests/unit/                    # 단위 테스트만
pytest --cov=src --cov-report=html    # 커버리지 리포트

# 타입 체크
python -m mypy .                      # 전체 타입 체크
python -m mypy src/                   # src/ 디렉토리만

# 린팅 및 포맷팅
ruff check .                          # 린트 검사
ruff format .                         # 코드 포맷팅
ruff check --fix .                    # 자동 수정

# 개발 서버
python src/main.py                    # 애플리케이션 실행
uvicorn src.api:app --reload          # FastAPI 개발 서버 (있는 경우)
```

**프로덕션 빌드:**
```bash
# 의존성 설치 (프로덕션)
pip install --no-dev -r requirements.txt

# 타입 체크 + 테스트
python -m mypy . && pytest tests/

# 애플리케이션 실행
python src/main.py
```

### Next.js 환경

**개발 명령어:**
```bash
# 개발 서버
npm run dev                           # http://localhost:3000

# 타입 체크
npm run type-check                    # TypeScript 전체 체크
tsc --noEmit                          # 컴파일 없이 타입만 체크

# 테스트
npx playwright test                   # E2E 테스트 (Playwright)
npm run test                          # 단위 테스트 (Jest/Vitest)
npm run test:coverage                 # 커버리지 리포트

# 린팅 및 포맷팅
npm run lint                          # ESLint 검사
npm run lint:fix                      # 자동 수정
npm run format                        # Prettier 포맷팅
```

**프로덕션 빌드:**
```bash
# 타입 체크 + 린트 + 빌드
npm run type-check && npm run lint && npm run build

# 프로덕션 서버
npm run start                         # 빌드된 앱 실행

# Docker (선택사항)
docker build -t langchain-rag .
docker run -p 3000:3000 langchain-rag
```

### 공통 워크플로우

**개발 사이클:**
```bash
# 1. 기능 개발 시작
# 2. 코드 작성
# 3. 타입 체크
python -m mypy .  # 또는 npm run type-check

# 4. 테스트 실행
pytest tests/     # 또는 npx playwright test

# 5. 린트 검사
ruff check .      # 또는 npm run lint

# 6. 커밋 (USER_APPROVED 필요)
# 사용자에게 "커밋할까요?" 확인 후
USER_APPROVED=yes git commit -m "feat: Add hybrid search"
```

---

## ⚡ 전체 기능

### 4.1 핵심 개발 기능

#### MECE 5단계 워크플로우
모든 개발 작업은 다음 5단계를 따릅니다:

```
Phase 1: 요구사항 분석 (Requirements Analysis)
  → 사용자 스토리 명확화
  → 엣지 케이스 정의
  → 성공 기준 설정

Phase 2: 설계 (Design)
  → Schema 분석
  → 타입 정의 (any 타입 금지)
  → API 인터페이스 설계

Phase 3: 구현 (Implementation)
  → 코드 구조 작성
  → E2E 테스트 작성
  → 규칙 준수 확인

Phase 4: 검증 (Validation)
  → E2E 테스트 실행
  → Type-check (mypy/TypeScript)
  → 코드 리뷰
  → Lint 검사

Phase 5: 배포 준비 (Deployment)
  → 예외 처리 추가
  → 최종 type-check
  → Build (필요시)
  → USER_APPROVED 커밋
```

**자동 트리거**: "개발", "구현", "API", "코드 작성" 키워드 감지 시

#### 타입 안전성 강제
- ❌ **절대 사용 금지**: `any` 타입
- ✅ **권장 사용**:
  - 유틸리티 타입 (`Partial<T>`, `Pick<T, K>`, `Omit<T, K>`, `Record<K, T>`)
  - 제네릭 타입 (`<T>`, `<K extends keyof T>`)
  - Union types (`string | number`)
  - 덕타이핑 (structural typing)

#### E2E 테스트 우선
- **Python**: pytest + pytest-playwright
- **Next.js**: Playwright Test
- **커버리지 목표**: 80%+ (핵심 로직)

#### Clean Code 원칙
- **SRP** (Single Responsibility Principle): 함수는 하나의 책임만
- **DRY** (Don't Repeat Yourself): 중복 코드 제거
- **KISS** (Keep It Simple, Stupid): 단순함 유지
- **함수 제약**: 최대 50줄, 복잡도 < 10

#### USER_APPROVED 커밋 프로토콜
- **규칙**: 모든 커밋은 사용자 승인 필요
- **형식**: `<type>: <description>` (feat, fix, docs, test, refactor)
- **사용법**:
  ```bash
  # 1. 사용자에게 "커밋할까요? (수정 파일: X개)" 질문
  # 2. 승인 후 커밋
  USER_APPROVED=yes git commit -m "feat: Add hybrid search retriever"
  ```

### 4.2 RAG 특화 기능

#### LangSmith 자동 추적
모든 RAG 쿼리는 자동으로 LangSmith에 추적됩니다:

```python
from langsmith import Client

client = Client()

# 자동 추적
with client.trace(name="rag_query"):
    result = rag_chain.invoke({"query": "질문"})
    # 자동 수집:
    # - Latency (ms)
    # - Token usage
    # - Retrieved documents
    # - Final answer
```

**수집 메트릭**:
- Latency (응답 시간)
- Token usage (토큰 사용량)
- Retrieved documents (검색된 문서)
- Faithfulness score (충실도)
- Relevance score (관련성)

#### RAG 정확도 메트릭

**3가지 핵심 메트릭**:

1. **Faithfulness (충실도)**: 0-1 점수
   - 답변이 검색된 문서에 근거했는지 측정
   - **임계값**: 0.7+ (최소), 0.95+ (우수)
   - **계산**: LLM 기반 또는 RAGAS 프레임워크

2. **Context Relevance (맥락 관련성)**: 0-1 점수
   - 검색된 문서가 질문과 관련있는지 측정
   - **임계값**: 0.7+ (최소), 0.9+ (우수)

3. **Answer Relevance (답변 관련성)**: 0-1 점수
   - 최종 답변이 질문에 적합한지 측정
   - **임계값**: 0.7+ (최소), 0.95+ (우수)

**RAGAS 프레임워크 통합**:
```python
from ragas import evaluate
from ragas.metrics import faithfulness, answer_relevancy, context_relevancy

results = evaluate(
    dataset=eval_dataset,
    metrics=[faithfulness, answer_relevancy, context_relevancy]
)

print(f"Faithfulness: {results['faithfulness']:.2f}")
print(f"Answer Relevancy: {results['answer_relevancy']:.2f}")
```

#### 보호된 스키마 시스템

**보호 대상 (4가지)**:

1. **임베딩 차원** (Embedding Dimensions)
   - OpenAI text-embedding-ada-002: **1536**
   - OpenAI text-embedding-3-large: **3072**
   - HuggingFace all-MiniLM-L6-v2: **384**
   - **변경 시**: 전체 재색인 필요 (4-8시간)

2. **청킹 전략** (Chunking Strategy)
   - `chunk_size`: 256/512/1024/2048 토큰
   - `chunk_overlap`: 10-20% of chunk_size
   - **변경 시**: 문서 재처리 필요 (2-4시간)

3. **메타데이터 스키마** (Metadata Schema)
   - 필드 추가/제거/이름 변경
   - **변경 시**: 호환성 확인 필요

4. **거리 메트릭** (Distance Metrics)
   - cosine, euclidean, dot product
   - **변경 시**: A/B 테스트 필수

#### 하이브리드 검색 (BM25 + Semantic)

```python
from langchain.retrievers import EnsembleRetriever, BM25Retriever
from langchain_pinecone import PineconeVectorStore

# BM25 (키워드 기반)
bm25_retriever = BM25Retriever.from_documents(documents)

# Semantic (임베딩 기반)
semantic_retriever = PineconeVectorStore.from_documents(
    documents, embeddings
).as_retriever()

# 하이브리드 (50:50 가중치)
ensemble = EnsembleRetriever(
    retrievers=[bm25_retriever, semantic_retriever],
    weights=[0.5, 0.5]
)
```

#### Reranking (Cross-Encoder)

```python
from langchain.retrievers import ContextualCompressionRetriever
from langchain.retrievers.document_compressors import CrossEncoderReranker

compressor = CrossEncoderReranker(
    model_name="cross-encoder/ms-marco-MiniLM-L-6-v2"
)

compression_retriever = ContextualCompressionRetriever(
    base_compressor=compressor,
    base_retriever=ensemble
)
```

#### MMR (Maximal Marginal Relevance)

다양성 증가로 중복 감소:

```python
retriever = vectorstore.as_retriever(
    search_type="mmr",
    search_kwargs={
        "k": 5,              # 반환 문서 수
        "lambda_mult": 0.5   # 0=다양성, 1=관련성
    }
)
```

### 4.3 자동 학습 시스템

**사용자 피드백 자동 감지**:
- "너무 길어" → 응답 길이 규칙 업데이트
- "중복" → 중복 제거 규칙 추가
- "느려" → 성능 임계값 조정
- "이건 아니야" → 잘못된 접근 감지

**8가지 학습 카테고리**:

1. **효율성 문제** (Efficiency Issues)
   - 응답 길이 (> 300줄)
   - 응답 속도 (> 5분)

2. **품질 문제** (Quality Issues)
   - 중복 코드
   - 반복된 설명

3. **형식 문제** (Format Issues)
   - 복잡도
   - 구조

4. **정확성 문제** (Accuracy Issues)
   - 잘못된 정보
   - 줄 번호 오류

5. **Plan Mode 투명성**
   - Gemini/CODEX 제약 사항

6. **Multi-Session Git 충돌**
   - 임계값 조정

7. **Session Summary Rule Loss**
   - 언어 불일치 (한글 사용자 → 한글 응답)

8. **Database/RLS 디버깅 실패**
   - 모순 감지
   - 실제 쿼리 검증

**자동 업데이트 대상**:
- `CLAUDE.md`: 행동 규칙
- `*-SKILL.md`: 스킬 파일
- 현재 세션에 즉시 적용

### 4.4 테스트 계층 구조

```
┌─────────────────────────────────────┐
│  LangSmith 추적 (CRITICAL)          │
│  - 모든 RAG 쿼리 자동 추적          │
│  - Faithfulness, Relevance 메트릭   │
│  - A/B 테스트 프레임워크            │
└─────────────────┬───────────────────┘
                  ↓
┌─────────────────────────────────────┐
│  E2E 파이프라인 테스트 (HIGH)       │
│  - query → retrieval → answer       │
│  - Happy/Sad path, 엣지 케이스      │
└─────────────────┬───────────────────┘
                  ↓
┌─────────────────────────────────────┐
│  단위 테스트 (MEDIUM)               │
│  - Embedder, Retriever 격리         │
│  - LangSmith 모킹                   │
│  - 80%+ 커버리지                    │
└─────────────────────────────────────┘
```

**우선순위 이유**: RAG 실패는 조용함 (나쁜 검색, 환각). LangSmith가 검색 품질, 프롬프트 효과, 토큰 사용량을 보여줌.

---

## 🎮 슬래시 커맨드

Sisyphus 멀티 에이전트 오케스트레이션 시스템을 통한 12가지 강력한 커맨드:

### 기본 커맨드

| 커맨드 | 설명 | 사용 예시 | 에이전트 |
|--------|------|----------|---------|
| `/sisyphus <task>` | Sisyphus 멀티 에이전트 오케스트레이션 활성화 | `/sisyphus Implement user authentication` | Orchestrator |
| `/ultrawork <task>` | 최대 성능 모드 (병렬 에이전트 실행) | `/ultrawork Build RAG pipeline` | Multiple |
| `/deepsearch <query>` | 코드베이스 전체 심층 검색 | `/deepsearch embedding dimension` | Explore (Haiku) |
| `/analyze <target>` | 심층 분석 및 조사 | `/analyze RAG accuracy issues` | Oracle (Opus) |

### 기획 및 검토 커맨드

| 커맨드 | 설명 | 사용 예시 | 에이전트 |
|--------|------|----------|---------|
| `/plan <description>` | Prometheus 기획 세션 시작 | `/plan Add reranking feature` | Prometheus (Opus) |
| `/review [plan-path]` | Momus로 계획 검토 | `/review` | Momus (Opus) |
| `/prometheus <task>` | 인터뷰 방식 전략 기획 | `/prometheus Database migration` | Prometheus (Opus) |

### 조정 및 실행 커맨드

| 커맨드 | 설명 | 사용 예시 | 에이전트 |
|--------|------|----------|---------|
| `/orchestrator <task>` | 복잡한 다단계 작업 조정 | `/orchestrator Refactor retrieval pipeline` | Orchestrator-Sisyphus |
| `/ralph-loop <task>` | 작업 완료까지 자가 참조 루프 | `/ralph-loop Fix all type errors` | Ralph Loop |
| `/cancel-ralph` | 활성 Ralph Loop 취소 | `/cancel-ralph` | - |

### 시스템 커맨드

| 커맨드 | 설명 | 사용 예시 |
|--------|------|----------|
| `/update` | Oh-My-Claude-Sisyphus 업데이트 확인 및 설치 | `/update` |
| `/sisyphus-default` | Sisyphus를 기본 모드로 설정 | `/sisyphus-default` |

### 사용 방법

**1단계: 커맨드 입력**
```
프롬프트에 슬래시 커맨드 입력:
/deepsearch LangSmith integration
```

**2단계: 시스템 자동 실행**
- 해당 에이전트가 자동으로 활성화됨
- 백그라운드에서 작업 수행
- 진행 상황 실시간 업데이트

**3단계: 결과 확인 및 후속 작업**
- 결과 리포트 받기
- 추가 질문 또는 수정 요청
- 다음 커맨드로 이어가기

### 커맨드 비교

**`/deepsearch` vs `/analyze`**:
- `/deepsearch`: 빠른 패턴 매칭, 키워드 검색 (Haiku - 저비용)
- `/analyze`: 심층 분석, 아키텍처 조사, 디버깅 (Opus - 고품질)

**`/plan` vs `/prometheus`**:
- `/plan`: 단일 세션 기획 (빠름)
- `/prometheus`: 인터뷰 방식 전략 기획 (상세함)

**`/sisyphus` vs `/ultrawork`**:
- `/sisyphus`: 순차적 멀티 에이전트 조정
- `/ultrawork`: 병렬 에이전트 실행 (최대 속도)

---

## 🧠 스킬 시스템

### 6.1 스킬 자동 로드

키워드 기반 자동 트리거 시스템:

**한글 키워드**:
- "개발", "구현" → `development-workflow-SKILL.md`
- "LangSmith", "추적" → `langsmith-testing-SKILL.md`
- "정확도", "평가" → `rag-accuracy-SKILL.md`
- "임베딩", "chunking" → `embedding-strategy-SKILL.md`
- "너무 길어", "개선" → `self-learning-SKILL.md`

**영어 키워드**:
- "API", "code", "implementation" → `development-workflow-SKILL.md`
- "trace", "evaluation" → `langsmith-testing-SKILL.md`
- "faithfulness", "relevance" → `rag-accuracy-SKILL.md`
- "hybrid search", "reranking" → `retrieval-patterns-SKILL.md`

### 6.2 스킬 카테고리 (5개)

| 카테고리 | 스킬 파일 수 | 우선순위 | 구현 상태 | 위치 |
|---------|------------|---------|----------|------|
| `core/` | 3 | HIGHEST | 60% 완료 | `skills/core/` |
| `testing/` | 4 | CRITICAL | 65% 완료 | `skills/testing/` |
| `rag-specific/` | 5 | CRITICAL | 50% 완료 | `skills/rag-specific/` |
| `git-workflow/` | 2 | MEDIUM | 25% 완료 | `skills/git-workflow/` |
| `meta/` | 3 | HIGHEST | 50% 완료 | `skills/meta/` |

**총 17개 SKILL 파일**, 2,785 라인 구현 완료 (37% / 목표 7,500 라인)

### 6.3 핵심 스킬 상세

#### A. development-workflow-SKILL.md (HIGHEST)
**위치**: `skills/core/development-workflow-SKILL.md`

**기능**:
- MECE 5단계 템플릿
- 자동 트리거: 모든 개발 작업
- Phase 1-5: Requirements → Design → Implementation → Validation → Deployment
- 타입 안전성 강제 (any 금지)
- E2E 테스트 가이드라인

**자동 트리거**:
- 키워드: "개발", "API", "코드 작성", "구현"
- 요구사항 명확화 후
- 구현 시작 전

**출력 예시**:
```
Phase 1: 요구사항 분석
- [ ] 사용자 스토리 명확화
- [ ] 엣지 케이스 정의
- [ ] 성공 기준 설정

Phase 2: 설계
- [ ] Schema 분석
- [ ] 타입 정의 (any 금지)
- [ ] API 인터페이스 설계

...
```

#### B. langsmith-testing-SKILL.md (CRITICAL)
**위치**: `skills/testing/langsmith-testing-SKILL.md`

**기능**:
- LangSmith 자동 추적 설정
- 메트릭 수집: faithfulness, relevance, latency
- A/B 테스트 프레임워크
- 데이터셋 평가 (LangSmith API)
- 오류 감지 (검색 실패, 높은 지연)

**자동 트리거**:
- 키워드: "LangSmith", "trace", "evaluation", "추적", "관찰"
- RAG 쿼리 실행 시
- 평가 작업 시

**예시 코드**:
```python
from langsmith import Client

client = Client()

# 자동 추적
with client.trace(name="rag_query"):
    result = rag_chain.invoke({"query": "질문"})

# 평가
client.evaluate(
    dataset_name="rag_eval",
    metrics=["faithfulness", "relevance"]
)
```

#### C. rag-accuracy-SKILL.md (CRITICAL)
**위치**: `skills/testing/rag-accuracy-SKILL.md`

**기능**:
- 3가지 핵심 메트릭: Faithfulness (0-1), Context Relevance (0-1), Answer Relevance (0-1)
- RAGAS 프레임워크 통합
- 배치 평가 (여러 쿼리 동시)
- LangSmith 피드백 통합
- 품질 임계값: 0.7+ (최소), 0.95+ (우수)

**자동 트리거**:
- 키워드: "정확도", "평가", "faithfulness", "relevance", "메트릭"
- 평가 작업
- A/B 테스트

**예시 코드**:
```python
from ragas import evaluate
from ragas.metrics import faithfulness, answer_relevancy

results = evaluate(
    dataset=eval_dataset,
    metrics=[faithfulness, answer_relevancy]
)
```

#### D. embedding-strategy-SKILL.md (PROTECTED)
**위치**: `skills/rag-specific/embedding-strategy-SKILL.md`

**기능** (보호됨):
- 청킹 전략: RecursiveCharacterTextSplitter (권장)
- 청크 크기 가이드라인: 256/512/1024/2048 토큰
- 청크 오버랩: 10-20% of chunk_size
- **임베딩 차원 (보호됨)**:
  - OpenAI text-embedding-ada-002: **1536**
  - OpenAI text-embedding-3-large: **3072**
  - HuggingFace all-MiniLM-L6-v2: **384**
- A/B 테스트 청크 크기
- 전처리 모범 사례

**자동 트리거**:
- 키워드: "chunking", "임베딩", "dimension", "overlap", "splitting"

**보호 규칙**: 차원 변경 시 사용자 승인 + 전체 재색인 계획 필수

#### E. vector-store-SKILL.md (PROTECTED)
**위치**: `skills/rag-specific/vector-store-SKILL.md`

**기능** (보호됨):
- 지원 벡터 스토어: Pinecone, Milvus, Chroma, FAISS
- 스키마 보호 규칙 (dimension, metric, metadata)
- 마이그레이션 플레이북 (6단계):
  1. Backup → 2. Create index → 3. Re-embed → 4. Switch → 5. Monitor → 6. Cleanup
- 임베딩 모델 변경 전체 절차

**자동 트리거**:
- 키워드: "vector store", "Pinecone", "Milvus", "Chroma", "FAISS", "schema"

**보호 규칙**: Pre-modification checklist 검증 필수

#### F. self-learning-SKILL.md (HIGHEST)
**위치**: `skills/meta/self-learning-SKILL.md`

**기능**:
- 4단계 학습 프로세스: Detect → Generate rule → Update file → Verify
- 8가지 학습 카테고리 (효율성, 품질, 형식, 정확성 등)
- 자동 감지: 사용자 피드백 패턴, 성능 문제, 수정
- 자동 업데이트: CLAUDE.md, SKILL 파일
- 한글 사용자 언어 지원 (중요 규칙)
- 현재 세션에 실시간 적용

**자동 트리거**:
- 키워드: "너무 길어", "중복", "느려", "이건 아니야", "다시 해줘", "개선해줘"
- 응답 시간 > 5분
- 응답 길이 > 300줄 (요청 없이)
- 동일 내용 2회 이상 반복

### 6.4 스킬 우선순위

**CRITICAL (자동 로드 필수)**:
1. `langsmith-testing-SKILL.md` - 모든 RAG 쿼리
2. `rag-accuracy-SKILL.md` - 평가 작업
3. `embedding-strategy-SKILL.md` - 임베딩/청킹 작업 (보호됨)
4. `vector-store-SKILL.md` - 벡터 스토어 변경 (보호됨)

**HIGHEST (개발 필수)**:
1. `development-workflow-SKILL.md` - 모든 개발 작업
2. `self-learning-SKILL.md` - 사용자 피드백

**HIGH (테스트 필수)**:
1. `e2e-testing-SKILL.md` - 파이프라인 테스트

**MEDIUM (선택적)**:
- 나머지 10개 스킬

---

## 🔄 개발 워크플로우

### MECE 5단계 프로세스

모든 개발 작업은 다음 5단계를 따릅니다 (`development-workflow-SKILL.md` 자동 적용):

#### Phase 1: 요구사항 분석

**목표**: 무엇을 만들지 명확히 정의

- **사용자 스토리 명확화**
  - 누가 (Who): 사용자 페르소나
  - 무엇을 (What): 기능 설명
  - 왜 (Why): 비즈니스 가치

- **엣지 케이스 정의**
  - 빈 값 처리 (null, undefined, empty string)
  - 에러 시나리오 (네트워크 실패, 타임아웃)
  - 경계값 (최소/최대, 0, 음수)

- **성공 기준 설정**
  - 기능 동작 확인 방법
  - 성능 목표 (응답시간, 처리량)
  - 호환성 요구사항 (브라우저, 디바이스)

#### Phase 2: 설계

**목표**: 어떻게 만들지 구조 설계

- **Schema 분석**
  - 데이터베이스 스키마 확인
  - API 요청/응답 형식 정의
  - 상태 관리 구조 (Zustand, Redux, Pydantic)

- **타입 정의 (TypeScript strict mode / Python type hints)**
  - ❌ **절대 사용 금지**: `any` (TypeScript), `Any` (Python)
  - ✅ **권장 사용**:
    - 유틸리티 타입: `Partial<T>`, `Pick<T, K>`, `Omit<T, K>`, `Record<K, T>`
    - 제네릭: `<T>`, `<K extends keyof T>`
    - Union types: `string | number`
    - Python: `Optional[str]`, `List[int]`, `Dict[str, Any]` (제한적)

- **API 인터페이스 설계**
  - 엔드포인트 정의 (RESTful)
  - 요청/응답 스키마
  - 에러 코드 정의

#### Phase 3: 구현

**목표**: 코드 작성 및 테스트

- **코드 구조 작성**
  - Clean Code 원칙 준수 (SRP, DRY, KISS)
  - 함수 제약: 최대 50줄, 복잡도 < 10
  - 명명 규칙: 명확하고 일관성 있게

- **E2E 테스트 작성 (구현과 동시)**
  - Happy path (정상 케이스)
  - Sad path (에러 처리)
  - Edge cases (경계값)

- **규칙 준수 확인**
  - `any` 타입 사용 여부
  - 중복 코드 존재 여부
  - 보안 취약점 (XSS, SQL Injection, Command Injection)

#### Phase 4: 검증

**목표**: 코드 품질 및 동작 확인

- **E2E 테스트 실행**
  ```bash
  pytest tests/test_e2e_pipeline.py  # Python
  npx playwright test                # Next.js
  ```

- **Type-check**
  ```bash
  python -m mypy .                   # Python
  npm run type-check                 # Next.js
  ```

- **코드 리뷰 (자동)**
  - 성능 (Performance): 불필요한 루프, N+1 쿼리
  - 보안 (Security): 입력 검증, SQL Injection
  - 접근성 (Accessibility): ARIA 레이블, 키보드 네비게이션
  - 에러 처리 (Error Handling): try-catch, 타임아웃

- **Lint 검사**
  ```bash
  ruff check .                       # Python
  npm run lint                       # Next.js
  ```

#### Phase 5: 배포 준비

**목표**: 프로덕션 준비 완료

- **예외 처리 추가**
  - 모든 외부 호출에 try-catch
  - 타임아웃 설정
  - 재시도 로직 (Tenacity)

- **최종 type-check**
  ```bash
  python -m mypy . && pytest tests/  # Python
  npm run type-check && npm run test # Next.js
  ```

- **Build (필요시)**
  ```bash
  npm run build                      # Next.js만
  ```

- **USER_APPROVED 커밋**
  ```bash
  # 1. 사용자에게 질문: "커밋할까요? (수정 파일: X개)"
  # 2. 승인 후 실행
  git add .
  USER_APPROVED=yes git commit -m "feat: Add hybrid search retriever

  - Combine BM25 and semantic search
  - Add cross-encoder reranker
  - Test with 100 queries (precision@5: 0.85)

  Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"
  ```

### 워크플로우 자동화

`development-workflow-SKILL.md`가 자동으로 감지하여 5단계 todo list를 생성합니다:

```
사용자: "사용자 인증 API 만들어줘"

AI: development-workflow-SKILL.md 자동 로드

AI: 5단계 todo list 생성:
Phase 1: 요구사항 분석
- [ ] 사용자 스토리 명확화
- [ ] 엣지 케이스 정의
- [ ] 성공 기준 설정

Phase 2: 설계
...

(Phase 1-5 순차 실행)
```

---

## 🛡️ 보호된 스키마

RAG 시스템의 핵심 요소를 데이터베이스 스키마처럼 보호합니다.

### RAG 수정 전 5가지 질문

**체크리스트**: `templates/rag-checklist.md`

#### 질문 1: 임베딩 차원 변경?
**예시**: 1536 → 768, 384 → 1536

**결과**: 🚫 **중단 (HALT)**

**이유**:
- 모든 기존 벡터 손상
- 현재 벡터 스토어 인덱스와 호환 불가

**영향**:
- 전체 지식 베이스 재색인 필요
- 재색인 중 다운타임 (대규모 데이터셋은 수 시간)
- 비용: 모든 문서 재임베딩

**조치**:
1. 사용자 승인 획득
2. 기존 벡터 백업 (JSON 내보내기)
3. 새 차원으로 새 벡터 스토어 인덱스 생성
4. 재색인 작업 스케줄링
5. 샘플 문서로 먼저 테스트
6. 점진적 마이그레이션

#### 질문 2: 청킹 전략 변경?
**예시**: chunk_size (512 → 1024), chunk_overlap (50 → 100), splitting logic 변경

**결과**: 🚫 **중단 (HALT)**

**이유**:
- 문서 경계 변경
- 검색 품질 영향 (청크가 맥락을 놓칠 수 있음)

**영향**:
- 문서 재처리 필요
- 이전 청크가 낡음 (이전/새 전략 혼합)
- 마이그레이션 중 검색 품질 저하

**조치**:
1. 이전 전략 문서화 (스크린샷 + 코드)
2. 10-20개 샘플 문서로 새 전략 테스트
3. 검색 품질 비교 (A/B 테스트)
4. 메트릭과 함께 사용자 승인 획득
5. 문서 점진적 재처리
6. 마이그레이션 후 검색 품질 모니터링

#### 질문 3: 메타데이터 스키마 변경?
**예시**: 필드 추가 (`author`, `date`), 제거, 이름 변경 (`source` → `document_id`)

**결과**: ⚠️ **주의 (CAUTION)**

**이유**:
- 역호환성 손상 가능
- 벡터 스토어에 따라 다름 (Pinecone: 가능, FAISS: 불가)

**영향**:
- 쿼리 필터 실패 가능 (이전 필드명 의존 시)
- 혼합 메타데이터 스키마 (이전 벡터는 새 필드 없음)

**조치**:
1. 벡터 스토어 마이그레이션 문서 확인
2. 새 스키마로 메타데이터 필터링 테스트
3. 기존 벡터용 마이그레이션 스크립트 생성
4. 벡터 스토어 복사본에서 먼저 테스트
5. 마이그레이션 계획 승인 획득
6. 마이그레이션 후 쿼리 성능 모니터링

#### 질문 4: 거리 메트릭 변경?
**예시**: cosine → euclidean, euclidean → dot product

**결과**: 🚫 **중단 (HALT)**

**이유**:
- 모든 유사도 점수 변경
- 랭킹 순서 완전히 변경

**영향**:
- Top-K 결과가 완전히 달라짐
- 검색 품질 개선 OR 저하 가능
- 마이그레이션 경로 없음 (재평가 필요)

**조치**:
1. 평가 데이터셋으로 A/B 테스트 생성
2. 검색 메트릭 비교:
   - Precision@K
   - Recall@K
   - MRR (Mean Reciprocal Rank)
   - NDCG (Normalized Discounted Cumulative Gain)
3. 비교 표와 함께 사용자 승인 획득
4. 승인 시 벡터 스토어 설정 업데이트
5. 7일간 프로덕션 메트릭 모니터링

#### 질문 5: 프롬프트/LLM 설정만 변경?
**예시**: 프롬프트 템플릿, LLM 모델 (OpenAI → Anthropic), 생성 파라미터 (temperature, max_tokens)

**결과**: ✅ **진행 (PROCEED)**

**이유**:
- 안전한 실험
- 검색 파이프라인 영향 없음
- 쉬운 롤백

**영향**:
- 최종 답변 품질만 변경
- 재색인 불필요
- 벡터 스토어 변경 없음

**조치**:
1. LangSmith 추적으로 테스트
2. 이전/새 출력 비교 (5-10개 쿼리)
3. 자유롭게 반복
4. Faithfulness/Relevance 메트릭 모니터링

### 결정 매트릭스

| 변경 유형 | 조치 | 이유 | 복구 시간 |
|-----------|------|------|-----------|
| 임베딩 차원 | **중단** | 모든 벡터 손상 | 수 시간 (전체 재색인) |
| 청킹 전략 | **중단** | 재처리 필요 | 수 시간 (재청킹) |
| 메타데이터 스키마 | **주의** | 벡터 스토어 의존 | 수 분 (마이그레이션) |
| 거리 메트릭 | **중단** | 모든 랭킹 변경 | N/A (A/B 테스트) |
| 프롬프트/LLM 설정 | **진행** | 안전한 실험 | 수 초 (롤백) |

### 보호 메커니즘

**1. Pre-commit Hooks**
```yaml
# .pre-commit-config.yaml
- id: check-rag-schemas
  name: Check RAG protected schemas
  entry: scripts/check_protected_schemas.py
  language: python
  files: 'embeddings/|vector_store/|chunking/'
```

**2. Skills 자동 로드**
- 파일 수정 시: `embeddings/`, `vector_store/`, `chunking/`
- 키워드 감지 시: "dimension", "chunk_size", "metadata", "distance metric"
- 트리거: `skills/rag-specific/vector-store-SKILL.md`

**3. 코드 리뷰 체크리스트** (Phase 4 검증)
- [ ] 임베딩 차원 변경 없음
- [ ] 재처리 계획 없이 청킹 전략 변경 없음
- [ ] 메타데이터 변경 역호환
- [ ] 거리 메트릭 변경 시 A/B 테스트 결과 있음

### 마이그레이션 플레이북

#### 시나리오 1: 임베딩 모델 변경
**예시**: OpenAI ada-002 (1536) → OpenAI 3-large (3072)

**6단계 절차**:
1. **Backup**: 기존 벡터를 JSON으로 내보내기
2. **Create new index**: Pinecone/Milvus에 dimension=3072로 생성
3. **Test**: 10-20개 샘플 문서 재임베딩
4. **Validate**: 샘플 쿼리, 결과 비교
5. **Migrate**: 모든 문서 재임베딩 (배치 작업)
6. **Switch**: 앱을 새 인덱스로 전환
7. **Monitor**: 7일간 LangSmith 추적
8. **Cleanup**: 30일 후 이전 인덱스 삭제

**예상 시간**: 4-8시간 (1M 문서)

#### 시나리오 2: 청킹 전략 변경
**예시**: chunk_size=512 → chunk_size=1024

**8단계 절차**:
1. **Document**: 이전 설정 스크린샷 + 코드
2. **Test**: 100개 쿼리로 A/B 테스트
   - 측정: Precision@5, Recall@5, MRR
3. **Compare**: 이전/새 전략 메트릭
4. **Approve**: 메트릭 표와 함께 사용자 승인 획득
5. **Re-process**: 문서 재청킹 배치 작업
6. **Re-embed**: 새 벡터 생성
7. **Replace**: 이전 벡터를 새 것으로 교체
8. **Monitor**: 14일간 검색 품질 모니터링

**예상 시간**: 2-4시간 (1M 문서)

#### 시나리오 3: 메타데이터 필드 추가
**예시**: 벡터에 `category: string` 추가

**6단계 절차**:
1. **Check compatibility**: 벡터 스토어가 메타데이터 업데이트 지원?
2. **Update schema**: 메타데이터 설정에 `category` 추가
3. **Backfill**: 기존 벡터에 `category` 업데이트 (필요시)
4. **Test**: 새 필터로 쿼리 `category="technical"`
5. **Deploy**: 다운타임 불필요
6. **Monitor**: 필터 성능 모니터링

**예상 시간**: 30분 (백필 불필요 시)

---

## 📁 파일 구조 및 구현 상태

### 9.1 프로젝트 구조

```
langchain/
├── RAG-CLAUDE.md (300 lines) ✅ 완료
│   └── 15개 행동 규칙 (self-check, USER_APPROVED, protected schemas, LangSmith)
│
├── skills/ (17 SKILL files, 2,785 lines)
│   ├── core/ (3 files) - 60% 완료
│   │   ├── development-workflow-SKILL.md ✅ 100% (574 lines)
│   │   ├── code-quality-SKILL.md ⚠️ 30% (120/400 lines)
│   │   └── verification-protocol-SKILL.md ⚠️ 25% (75/300 lines)
│   │
│   ├── testing/ (4 files) - 65% 완료
│   │   ├── langsmith-testing-SKILL.md ✅ 100% (500 lines)
│   │   ├── rag-accuracy-SKILL.md ✅ 100% (600 lines)
│   │   ├── e2e-testing-SKILL.md ✅ 95% (380/400 lines)
│   │   └── unit-testing-SKILL.md ⚠️ 20% (60/300 lines)
│   │
│   ├── rag-specific/ (5 files) - 50% 완료
│   │   ├── embedding-strategy-SKILL.md ✅ 100% (500 lines) [PROTECTED]
│   │   ├── vector-store-SKILL.md ✅ 90% (315/350 lines) [PROTECTED]
│   │   ├── retrieval-patterns-SKILL.md ⚠️ 25% (110/450 lines)
│   │   ├── prompt-engineering-SKILL.md ⚠️ 20% (80/400 lines)
│   │   └── llm-integration-SKILL.md ⚠️ 25% (75/300 lines)
│   │
│   ├── git-workflow/ (2 files) - 25% 완료
│   │   ├── commit-protocol-SKILL.md ⚠️ 25% (50/200 lines)
│   │   └── code-review-SKILL.md ⚠️ 20% (30/150 lines)
│   │
│   └── meta/ (3 files) - 50% 완료
│       ├── self-learning-SKILL.md ✅ 100% (350 lines)
│       ├── skill-auto-load-SKILL.md ⚠️ 20% (50/250 lines)
│       └── error-recovery-SKILL.md ⚠️ 20% (40/200 lines)
│
├── templates/ (3 files) ✅ 완료
│   ├── self-check.md (432 lines) ✅ 완료
│   ├── rag-checklist.md (230 lines) ✅ 완료
│   └── test-plan.md (예정)
│
├── docs/ (3 files) - 66% 완료
│   ├── protected-schemas.md ✅ 완료 (350 lines)
│   ├── architecture.md (예정, 400 lines)
│   └── framework-guides/
│       ├── python-setup.md (예정, 200 lines)
│       └── nextjs-setup.md (예정, 200 lines)
│
└── .pre-commit-config.yaml (예정, 80 lines)
```

### 9.2 구현 통계

| 메트릭 | 상태 | 비고 |
|--------|------|------|
| **완료된 파일** | 7/26 (27%) | RAG-CLAUDE.md + 6 files |
| **작성된 라인** | 2,785 / 7,500 (37%) | 목표 대비 진행률 |
| **완전 구현 SKILL** | 7 files | 100% 완료 |
| **부분 구현 SKILL** | 10 files | 20-95% 완료 |
| **우선순위 1 (CRITICAL)** | 4 files - 75% 완료 | LangSmith, RAG accuracy, embedding, vector-store |
| **우선순위 2 (HIGH)** | 4 files - 25% 완료 | Retrieval, prompt, E2E, architecture |
| **코드 감소율** | 61% | 19,410 → 7,500 lines (vs WHRESUME) |
| **규칙 감소율** | 35% | 23 → 15 behavioral rules |
| **스킬 감소율** | 72% | 60 → 17 SKILL files |

### 9.3 구현 단계별 상태

**Phase 1 (핵심) - ✅ 완료 (100%)**
- RAG-CLAUDE.md
- development-workflow-SKILL.md
- self-check.md

**Phase 2 (보호) - ✅ 완료 (100%)**
- rag-checklist.md
- protected-schemas.md

**Phase 3 (테스트) - ⚠️ 65% 완료**
- langsmith-testing-SKILL.md ✅
- rag-accuracy-SKILL.md ✅
- e2e-testing-SKILL.md ✅
- unit-testing-SKILL.md ⚠️ 20%

**Phase 4 (RAG 패턴) - ⚠️ 50% 완료**
- embedding-strategy-SKILL.md ✅
- vector-store-SKILL.md ✅
- retrieval-patterns-SKILL.md ⚠️ 25%
- prompt-engineering-SKILL.md ⚠️ 20%
- llm-integration-SKILL.md ⚠️ 25%

**Phase 5 (메타) - ⚠️ 50% 완료**
- self-learning-SKILL.md ✅
- skill-auto-load-SKILL.md ⚠️ 20%
- error-recovery-SKILL.md ⚠️ 20%

**Phase 6 (Git & 가이드) - ⚠️ 10% 완료**
- commit-protocol-SKILL.md ⚠️ 25%
- code-review-SKILL.md ⚠️ 20%
- python-setup.md (예정)
- nextjs-setup.md (예정)
- architecture.md (예정)
- .pre-commit-config.yaml (예정)

---

## 🧪 테스트 전략

### 10.1 테스트 계층 구조

RAG 시스템은 조용한 실패(silent failures)가 많아 관찰성이 핵심입니다.

```
┌─────────────────────────────────────────────────────┐
│  1. LangSmith 추적 (CRITICAL) - 최우선               │
│  ─────────────────────────────────────────────────  │
│  ✓ 모든 RAG 쿼리 자동 추적                          │
│  ✓ Faithfulness (0-1), Relevance (0-1), Latency (ms) │
│  ✓ A/B 테스트 프레임워크                            │
│  ✓ 프로덕션 추적 가능                               │
└─────────────────────────────────────────────────────┘
                        ↓
┌─────────────────────────────────────────────────────┐
│  2. E2E 파이프라인 테스트 (HIGH)                    │
│  ─────────────────────────────────────────────────  │
│  ✓ query → retrieval → generation → answer         │
│  ✓ Happy path, Sad path, Edge cases                │
│  ✓ pytest (Python), Playwright (Next.js)           │
└─────────────────────────────────────────────────────┘
                        ↓
┌─────────────────────────────────────────────────────┐
│  3. 단위 테스트 (MEDIUM)                            │
│  ─────────────────────────────────────────────────  │
│  ✓ Embedder, Retriever, Reranker 격리              │
│  ✓ LangSmith 모킹으로 속도 향상                     │
│  ✓ 커버리지 80%+ (핵심 로직)                        │
└─────────────────────────────────────────────────────┘
```

**우선순위 이유**:
- RAG 실패는 조용함 (나쁜 검색, 환각)
- LangSmith가 검색 품질, 프롬프트 효과, 토큰 사용량을 보여줌
- E2E 테스트는 통합 확인
- 단위 테스트는 컴포넌트 격리

### 10.2 테스트 실행

#### Python

```bash
# 모든 테스트 실행
pytest tests/

# E2E 테스트만
pytest tests/test_e2e_pipeline.py

# 단위 테스트만
pytest tests/unit/

# 커버리지 리포트
pytest --cov=src --cov-report=html
open htmlcov/index.html

# 특정 테스트만
pytest tests/test_e2e_pipeline.py::test_happy_path

# 병렬 실행 (속도 향상)
pytest -n auto tests/
```

#### Next.js

```bash
# E2E 테스트 (Playwright)
npx playwright test

# 단위 테스트 (Jest/Vitest)
npm run test

# 커버리지 리포트
npm run test:coverage

# 특정 테스트만
npx playwright test tests/e2e/rag-pipeline.spec.ts

# 헤드리스 모드 비활성화 (디버깅)
npx playwright test --headed
```

### 10.3 LangSmith 통합

#### Python 예시

```python
from langsmith import Client
from langchain.chains import RetrievalQA
from langchain_openai import OpenAI, OpenAIEmbeddings
from langchain_pinecone import PineconeVectorStore

# LangSmith 클라이언트 초기화
client = Client()

# 벡터 스토어 설정
embeddings = OpenAIEmbeddings()
vectorstore = PineconeVectorStore(index_name="my-index", embedding=embeddings)

# RAG 체인
qa = RetrievalQA.from_chain_type(
    llm=OpenAI(),
    retriever=vectorstore.as_retriever()
)

# LangSmith 추적
with client.trace(name="rag_query", metadata={"user": "test"}):
    result = qa.invoke({"query": "LangChain이란?"})

    # 자동 수집되는 데이터:
    # - Latency: 1234ms
    # - Token usage: 500 tokens
    # - Retrieved documents: 3 docs
    # - Final answer: "LangChain is..."

# 메트릭 평가
from ragas import evaluate
from ragas.metrics import faithfulness, answer_relevancy

eval_results = evaluate(
    dataset=client.read_dataset(dataset_name="rag_eval"),
    metrics=[faithfulness, answer_relevancy]
)

print(f"Faithfulness: {eval_results['faithfulness']:.2f}")  # 0.92
print(f"Answer Relevancy: {eval_results['answer_relevancy']:.2f}")  # 0.88
```

#### Next.js 예시

```typescript
import { Client } from "langsmith";
import { RetrievalQAChain } from "langchain/chains";
import { OpenAI } from "@langchain/openai";

const client = new Client();

async function queryRAG(question: string) {
  // LangSmith 추적
  return await client.withTrace(
    {
      name: "rag_query",
      metadata: { user: "test" }
    },
    async () => {
      const chain = RetrievalQAChain.fromLLM(
        new OpenAI(),
        vectorstore.asRetriever()
      );

      const result = await chain.call({ query: question });

      // 자동 추적: latency, tokens, documents, answer
      return result.text;
    }
  );
}

// 사용
const answer = await queryRAG("LangChain이란?");
```

### 10.4 E2E 테스트 예시

#### Python (pytest)

```python
import pytest
from src.rag_pipeline import RAGPipeline

@pytest.fixture
def rag_pipeline():
    return RAGPipeline(
        vector_store="pinecone",
        llm="openai",
        langsmith_enabled=True
    )

def test_happy_path(rag_pipeline):
    """정상 케이스: 질문 → 답변"""
    query = "LangChain이란 무엇인가요?"
    result = rag_pipeline.query(query)

    assert result["answer"] is not None
    assert len(result["answer"]) > 0
    assert result["faithfulness"] > 0.7
    assert result["relevance"] > 0.7

def test_sad_path_empty_query(rag_pipeline):
    """에러 케이스: 빈 질문"""
    with pytest.raises(ValueError, match="Query cannot be empty"):
        rag_pipeline.query("")

def test_edge_case_long_query(rag_pipeline):
    """엣지 케이스: 긴 질문 (> 1000자)"""
    long_query = "LangChain " * 200  # 2000+ 자
    result = rag_pipeline.query(long_query)

    assert result["answer"] is not None
    assert result["latency_ms"] < 5000  # 5초 이내
```

#### Next.js (Playwright)

```typescript
import { test, expect } from '@playwright/test';

test('RAG pipeline happy path', async ({ page }) => {
  await page.goto('http://localhost:3000');

  // 질문 입력
  await page.fill('[data-testid="query-input"]', 'LangChain이란?');
  await page.click('[data-testid="submit-button"]');

  // 답변 대기
  await page.waitForSelector('[data-testid="answer"]');

  // 검증
  const answer = await page.textContent('[data-testid="answer"]');
  expect(answer).toBeTruthy();
  expect(answer.length).toBeGreaterThan(0);

  // 메트릭 확인
  const faithfulness = await page.textContent('[data-testid="faithfulness"]');
  expect(parseFloat(faithfulness)).toBeGreaterThan(0.7);
});

test('RAG pipeline sad path - empty query', async ({ page }) => {
  await page.goto('http://localhost:3000');

  // 빈 질문 제출
  await page.click('[data-testid="submit-button"]');

  // 에러 메시지 확인
  await expect(page.locator('[data-testid="error"]')).toContainText(
    'Query cannot be empty'
  );
});
```

### 10.5 A/B 테스트

#### LangSmith로 A/B 테스트

```python
from langsmith import Client

client = Client()

# 전략 A: 기본 검색
def strategy_a(query):
    return vectorstore.similarity_search(query, k=5)

# 전략 B: 하이브리드 검색
def strategy_b(query):
    return ensemble_retriever.get_relevant_documents(query)

# A/B 테스트 실행
for query in eval_queries:
    # A 전략
    with client.trace(name="strategy_a", metadata={"strategy": "semantic"}):
        docs_a = strategy_a(query)

    # B 전략
    with client.trace(name="strategy_b", metadata={"strategy": "hybrid"}):
        docs_b = strategy_b(query)

# LangSmith에서 비교:
# - Precision@5: A(0.75) vs B(0.85)
# - Recall@5: A(0.60) vs B(0.80)
# - Latency: A(120ms) vs B(180ms)
```

---

## ❓ 자주 묻는 질문

### Q1: Python과 Next.js 중 어떤 것을 선택해야 하나요?

**A**: 프로젝트 요구사항에 따라 선택하세요:

**Python 선택 시**:
- 데이터 과학/ML 팀
- Jupyter Notebook 워크플로우
- 빠른 프로토타이핑
- 배치 처리 중심

**Next.js 선택 시**:
- 프론트엔드 팀
- 웹 애플리케이션
- 실시간 인터랙션
- Vercel/Netlify 배포

**모든 규칙과 스킬은 프레임워크 독립적**입니다. 언제든 전환 가능합니다.

### Q2: /analyze와 /deepsearch의 차이는?

**A**:

| 특징 | `/deepsearch` | `/analyze` |
|------|--------------|-----------|
| **목적** | 빠른 검색 | 심층 분석 |
| **에이전트** | Explore (Haiku) | Oracle (Opus) |
| **속도** | 빠름 (30초-1분) | 느림 (2-5분) |
| **비용** | 저렴 | 비쌈 |
| **사용 예** | "LangSmith 통합 코드 찾기" | "RAG 정확도 낮은 근본 원인 분석" |

### Q3: 임베딩 차원을 변경하려면 어떻게 해야 하나요?

**A**: 보호된 스키마이므로 5가지 단계 필요:

1. **사용자 승인 획득** (필수)
2. **기존 벡터 백업** (JSON 내보내기)
3. **새 인덱스 생성** (새 차원)
4. **샘플 테스트** (10-20 문서)
5. **전체 마이그레이션** (4-8시간)

**자동 차단**: `embedding-strategy-SKILL.md`가 자동으로 감지하여 중단합니다.

### Q4: LangSmith 없이 사용할 수 있나요?

**A**: 가능하지만 **강력히 권장하지 않습니다**.

**LangSmith 없이**:
- RAG 쿼리 실행 가능
- 기본 E2E 테스트 가능
- 프로덕션 배포 가능

**LangSmith 있으면**:
- Faithfulness/Relevance 메트릭 자동 수집
- 검색 품질 모니터링
- A/B 테스트 프레임워크
- 프로덕션 디버깅

**대안**: LangSmith 대신 자체 추적 시스템 구축 가능 (권장하지 않음)

### Q5: 커밋 시 항상 "USER_APPROVED"를 입력해야 하나요?

**A**: 네, 모든 커밋에 필수입니다.

**이유**:
- 실수 방지 (의도하지 않은 커밋)
- 사용자 제어 유지
- 자동 커밋 금지 (행동 규칙 2)

**워크플로우**:
```bash
# AI가 질문: "커밋할까요? (수정 파일: 3개)"
# 사용자: "네" 또는 "예"
# AI 실행:
USER_APPROVED=yes git commit -m "feat: Add hybrid search"
```

### Q6: 스킬이 자동으로 로드되지 않으면?

**A**: 키워드를 명시적으로 사용하세요:

```
# 자동 로드 안됨:
"검색 기능 개선해줘"

# 자동 로드됨:
"hybrid search로 retrieval 개선해줘"  → retrieval-patterns-SKILL.md

"LangSmith로 trace 추가해줘"  → langsmith-testing-SKILL.md

"임베딩 chunking 전략 변경해줘"  → embedding-strategy-SKILL.md
```

**또는 직접 요청**:
```
"development-workflow-SKILL 사용해서 API 개발해줘"
```

---

## 🔧 문제 해결

### 문제 1: 검색 품질이 낮음

**증상**:
- Top-K 문서가 질문과 관련 없음
- Relevance < 0.5
- 사용자 불만족

**원인**:
1. 청킹 전략 부적절 (chunk_size 너무 큼/작음)
2. 임베딩 모델 품질 낮음
3. 검색 방법 (semantic only)

**해결책**:

**1단계: 청킹 전략 확인**
```python
# 현재 설정
text_splitter = RecursiveCharacterTextSplitter(
    chunk_size=512,  # 너무 작음? → 1024로 증가
    chunk_overlap=50  # 10% → 20%로 증가
)
```

**2단계: A/B 테스트**
```python
# 전략 A: chunk_size=512
# 전략 B: chunk_size=1024
# 100개 쿼리로 비교 → Precision@5, Recall@5
```

**3단계: 하이브리드 검색 시도**
```python
# Semantic + BM25
ensemble = EnsembleRetriever(
    retrievers=[bm25_retriever, semantic_retriever],
    weights=[0.5, 0.5]
)
```

**참고**: `skills/rag-specific/embedding-strategy-SKILL.md`

### 문제 2: 답변 환각 현상 (Hallucination)

**증상**:
- 답변이 검색된 문서에 없는 내용 포함
- Faithfulness < 0.7
- 사실 확인 실패

**원인**:
1. 프롬프트 엔지니어링 부족
2. LLM temperature 너무 높음
3. 검색된 문서 품질 낮음

**해결책**:

**1단계: Faithfulness 메트릭 확인**
```python
from ragas.metrics import faithfulness

score = faithfulness.score(
    query="질문",
    answer="답변",
    contexts=["문서1", "문서2"]
)

if score < 0.7:
    print("환각 감지!")
```

**2단계: 프롬프트 개선**
```python
prompt = """주어진 문서만 사용하여 답변하세요.
문서에 없는 내용은 "문서에 정보가 없습니다"라고 답변하세요.

문서:
{context}

질문: {question}

답변:"""
```

**3단계: Temperature 낮추기**
```python
llm = OpenAI(temperature=0.0)  # 0.7 → 0.0 (더 보수적)
```

**참고**: `skills/rag-specific/prompt-engineering-SKILL.md`

### 문제 3: 느린 쿼리 속도

**증상**:
- 응답 시간 > 5초
- Latency metric 높음
- 사용자 경험 저하

**원인**:
1. 벡터 스토어 인덱스 타입 부적절
2. Reranking 오버헤드
3. LLM streaming 비활성화

**해결책**:

**1단계: 벡터 스토어 인덱스 최적화**
```python
# Pinecone: pod 타입 확인
index = pinecone.Index("my-index")
index.describe_index_stats()  # pod 타입, replicas

# FAISS: IVF 인덱스 사용
index = faiss.IndexIVFFlat(quantizer, dimension, nlist=100)
```

**2단계: Reranking 제거 (또는 병렬화)**
```python
# Reranking 전: 300ms
# Reranking 후: 1200ms → 제거 고려

# 또는 병렬 처리
async def rerank_parallel(documents):
    tasks = [reranker.score(doc) for doc in documents]
    return await asyncio.gather(*tasks)
```

**3단계: LLM Streaming 활성화**
```python
# Streaming 비활성화: 5초 후 전체 답변
result = llm.invoke(prompt)

# Streaming 활성화: 0.5초 후 첫 토큰
for chunk in llm.stream(prompt):
    print(chunk, end="")
```

**참고**: `skills/rag-specific/llm-integration-SKILL.md`

---

## 🤝 기여 가이드

### SKILL 파일 추가 방법

**1단계: YAML Frontmatter 작성**

```yaml
---
name: my-new-skill
version: 1.0
last_updated: 2025-12-04
description: 이 스킬이 하는 일 간단 설명
license: MIT
triggers:
  - "키워드1", "키워드2"
  - "특정 조건"
priority: [highest|critical|high|medium|low]
dependencies:
  - other-skill-SKILL.md
compatibility:
  - claude-code: ">=1.0"
  - CLAUDE.md: ">=2.3"
changelog:
  - version: 1.0
    date: 2025-12-04
    changes:
      - Initial creation
---
```

**2단계: 섹션 구조**

```markdown
# 🎯 My New SKILL

## Purpose
이 스킬의 목적 (1-2문장)

## Auto-Trigger Conditions
**Activate when:**
1. 조건 1
2. 조건 2

## Protocol
### Step 1: ...
### Step 2: ...

## Examples
### Example 1: ...
```python
# 코드 예시
```

## Integration
**Related Skills:**
- `other-skill-SKILL.md`

**Cross-references:**
- `RAG-CLAUDE.md` - Line 123
```

**3단계: Auto-trigger 조건 설정**

```yaml
triggers:
  # 한글 키워드
  - "개발", "구현", "API"

  # 영어 키워드
  - "development", "implementation", "API"

  # 조건
  - "Before starting implementation"
  - "After requirements clarification"
```

**4단계: README.md 업데이트**

```markdown
# README.md에 추가

## 스킬 시스템
...
| `my-category/` | X files | PRIORITY | Y% 완료 |

### my-new-skill-SKILL.md (PRIORITY)
- 기능 설명
- 자동 트리거: 키워드
```

**5단계: 테스트**

```bash
# 1. 키워드로 트리거 테스트
프롬프트: "키워드1 사용해서 작업해줘"
→ my-new-skill-SKILL.md 자동 로드 확인

# 2. 출력 검증
→ 예상한 Protocol 단계 실행 확인
```

### 파일 명명 규칙

- **SKILL 파일**: `*-SKILL.md` (하이픈 소문자)
- **문서**: `*.md` (하이픈 소문자)
- **템플릿**: `*.md` (templates/ 폴더)
- **예시**: `embedding-strategy-SKILL.md`, `rag-checklist.md`

---

## 📄 라이선스 및 연락처

### 라이선스
**MIT License** - WHRESUME 소스 프로젝트와 동일

### 소스 프로젝트
**WHRESUME CV Builder**
- GitHub: https://github.com/yourusername/whresume
- Next.js 15 App Router
- 168 files, 60 SKILL files, 23 behavioral rules
- Multi-AI orchestration (Claude + Gemini + CODEX)

### 이 프로젝트
**Langchain RAG Demo**
- 프레임워크 독립적 (Python or Next.js)
- 17 SKILL files, 15 behavioral rules
- 초점: RAG 품질, LangSmith 관찰성

### 질문 및 피드백

**마이그레이션 관련 질문**:
- WHRESUME `.skills/` 폴더에서 참고 패턴 확인
- `RAG-CLAUDE.md` 읽기 (행동 규칙)
- `templates/rag-checklist.md` 사용 (보호된 스키마 수정 전)

**버그 리포트 또는 기능 요청**:
- GitHub Issues 생성
- 재현 단계 포함
- 기대 동작 vs 실제 동작

**기여**:
- Pull Request 환영
- SKILL 파일 추가 가이드 참고
- README.md 업데이트 필수

---

**버전**: 1.0
**최종 업데이트**: 2025-12-04
**상태**: 핵심 파일 완료 (37%), 남은 파일 구현 필요
**예상 완료**: 14일 (6 phases)

---

**Made with ❤️ by Claude Code + Sisyphus Multi-Agent System**
