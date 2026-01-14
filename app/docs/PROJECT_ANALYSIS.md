# LangChain Forum RAG System - 프로젝트 분석서

> **작성일**: 2025-01-14
> **상태**: 개발 진행 중
> **실행 주소**: http://localhost:3000/

---

## 1. 프로젝트 개요

**목적**: LangChain 포럼 지원 어시스턴트를 위한 RAG(Retrieval-Augmented Generation) 시스템

**기술 스택**:
- **프레임워크**: Next.js 15 + TypeScript 5.7
- **프론트엔드**: React 19 + TailwindCSS
- **AI/LLM**: OpenAI GPT-4o-mini, Gemini 3.0 Flash
- **임베딩**: OpenAI text-embedding-3-small (1536-dim)
- **관측성**: LangSmith 트레이싱

---

## 2. 디렉토리 구조

```
app/
├── app/                           # Next.js App Router
│   ├── api/chat/route.ts          # RAG API 엔드포인트
│   ├── chat/page.tsx              # 채팅 UI (스트리밍 지원)
│   └── dashboard/page.tsx         # 분석 대시보드
│
├── lib/rag/                       # 핵심 RAG 파이프라인
│   ├── interfaces.ts              # SOLID 인터페이스 정의
│   ├── embedder/                  # 텍스트 → 벡터 변환
│   │   ├── gemini-embedder.ts     # 768-dim Gemini
│   │   └── openai-embedder.ts     # 1536-dim OpenAI (기본값)
│   ├── vectorstore/               # 벡터 저장 및 검색
│   │   └── in-memory-store.ts     # 인메모리 벡터 스토어
│   ├── retriever/                 # 문서 검색
│   │   └── vector-retriever.ts    # Top-K 시맨틱 검색
│   ├── reranker/                  # 문서 재순위화
│   │   └── cross-encoder-reranker.ts
│   ├── generator/                 # 답변 생성
│   │   ├── gemini-generator.ts    # Gemini 3.0 Flash
│   │   └── openai-generator.ts    # GPT-4o-mini (스트리밍)
│   ├── evaluator/                 # 품질 평가
│   │   └── rag-evaluator.ts       # 충실도, 관련성, 일관성
│   ├── pipeline/                  # 오케스트레이션
│   │   └── rag-pipeline.ts        # E2E RAG 파이프라인
│   └── tracing/                   # 관측성
│       └── langsmith-tracer.ts    # LangSmith 통합
│
├── components/                    # React UI 컴포넌트
│   ├── chat/                      # 채팅 인터페이스
│   ├── analytics/                 # 대시보드 차트
│   └── ui/                        # shadcn UI 컴포넌트
│
├── tests/                         # 테스트 스위트
│   ├── unit/rag/                  # RAG 유닛 테스트 (Jest)
│   ├── e2e/                       # E2E 테스트 (Playwright)
│   └── setup.ts                   # 테스트 환경 설정
│
├── data/                          # 임베딩 및 통계 데이터
│   ├── embeddings.json            # 사전 계산된 임베딩
│   └── forum-stats.json           # 포럼 통계
│
└── scripts/                       # 유틸리티 스크립트
    ├── generate-embeddings.ts     # 임베딩 생성
    ├── crawl-langchain-docs.ts    # 문서 크롤링
    └── generate-stats.ts          # 통계 생성
```

---

## 3. RAG 파이프라인 아키텍처

### 처리 흐름

```
Query (사용자 질의)
    ↓ [임베딩]
Vector (1536-dim)
    ↓ [검색]
Top-K Documents
    ↓ [재순위화] (선택적)
Reranked Documents
    ↓ [컨텍스트 구성]
Context
    ↓ [답변 생성]
Answer
    ↓ [평가] (선택적)
Answer + Metrics
```

### 컴포넌트 상세

| 컴포넌트 | 파일 | 설명 |
|---------|------|------|
| **Embedder** | `lib/rag/embedder/` | 텍스트를 벡터로 변환 (OpenAI 1536-dim 기본) |
| **VectorStore** | `lib/rag/vectorstore/` | 인메모리 벡터 저장소, 코사인 유사도 |
| **Retriever** | `lib/rag/retriever/` | Top-K 시맨틱 검색, 메타데이터 필터링 |
| **Reranker** | `lib/rag/reranker/` | Cross-encoder 기반 재순위화 |
| **Generator** | `lib/rag/generator/` | LLM 답변 생성 (스트리밍 지원) |
| **Evaluator** | `lib/rag/evaluator/` | 충실도/관련성/일관성 평가 |
| **Pipeline** | `lib/rag/pipeline/` | 전체 파이프라인 오케스트레이션 |

---

## 4. API 엔드포인트

### POST /api/chat

**요청**:
```json
{
  "query": "LangSmith 인증 방법은?",
  "filter": { "tags": ["langsmith"] },
  "stream": true
}
```

**응답 (Non-Streaming)**:
```json
{
  "answer": "LangSmith 인증을 위해서는...",
  "sources": [
    {
      "id": "2719",
      "title": "Cannot log in to Langsmith",
      "url": "https://forum.langchain.com/t/2719",
      "relevanceScore": 0.94,
      "snippet": "Getting 429 Too Many Requests..."
    }
  ],
  "trace": {
    "embeddingDuration": 0.15,
    "retrievalDuration": 0.32,
    "generationDuration": 1.42,
    "totalDuration": 2.07
  }
}
```

**응답 (Streaming - SSE)**:
```
data: {"type":"sources","sources":[...]}
data: {"type":"chunk","content":"LangSmith"}
data: {"type":"chunk","content":" 인증을..."}
data: [DONE]
```

---

## 5. 임베딩 전략

### 현재 설정

| 항목 | 값 | 비고 |
|-----|---|-----|
| 기본 모델 | OpenAI text-embedding-3-small | 1536 차원 |
| 대안 모델 | Gemini gemini-embedding-001 | 768 차원 |
| 유사도 메트릭 | Cosine Similarity | 기본값 |
| 벡터 스토어 | InMemory | 개발용 |

### 보호 규칙 (CRITICAL)

> **임베딩 차원은 불변입니다**
> - 차원 변경 시 모든 문서 재임베딩 필요
> - 기존 `data/embeddings.json`은 1536-dim으로 고정
> - 차원 불일치 시 벡터 스토어가 거부

---

## 6. 테스트 전략

### 테스트 계층

| 레벨 | 도구 | 대상 | 커맨드 |
|-----|------|------|--------|
| Unit | Jest | RAG 컴포넌트 | `npm run test:rag` |
| UI | Vitest | React 컴포넌트 | `npm run test:ui` |
| E2E | Playwright | 전체 워크플로우 | `npm run test:e2e` |

### 테스트 우선순위

1. **LangSmith 트레이스** (CRITICAL) - 모든 RAG 쿼리 추적
2. **E2E 테스트** (HIGH) - 전체 파이프라인 검증
3. **유닛 테스트** (MEDIUM) - 개별 컴포넌트 검증

---

## 7. LangSmith 통합

### 환경 변수

```bash
LANGSMITH_API_KEY=<your-api-key>
LANGCHAIN_TRACING_V2=true
LANGCHAIN_PROJECT=langchain-forum-rag
```

### 추적 함수

- `createTracedRAGPipeline()` - 전체 파이프라인 래핑
- `traceEmbed()` - 임베딩 단계 추적
- `traceRetrieve()` - 검색 단계 추적
- `traceGenerate()` - 생성 단계 추적
- `traceRerank()` - 재순위화 단계 추적
- `traceEvaluate()` - 평가 단계 추적

---

## 8. 개발 현황

| 단계 | 상태 | 내용 |
|-----|------|------|
| 1: 요구사항 및 설계 | ✅ 완료 | SDD 문서 작성 |
| 2: 인프라 설정 | ✅ 완료 | Next.js, TypeScript, 테스트 프레임워크 |
| 3: RAG 파이프라인 (TDD) | ✅ 완료 | 7개 컴포넌트 구현 및 테스트 |
| 4: 프론트엔드 (TDD) | ✅ 완료 | 채팅 UI, 대시보드, 컴포넌트 |
| 5: 통합 및 E2E | ✅ 완료 | API 통합, E2E 테스트 |
| 6: 배포 | 🔄 진행 중 | 최적화 및 모니터링 설정 |

---

## 9. 주요 커맨드

```bash
# 개발 서버 (이미 실행 중: http://localhost:3000/)
npm run dev

# 타입 체크
npm run type-check

# 테스트
npm run test:rag          # RAG 파이프라인 테스트
npm run test:ui           # UI 컴포넌트 테스트
npm run test:e2e          # E2E 테스트

# 데이터 관리
npm run embed:generate    # 임베딩 생성
npm run crawl:docs        # 문서 크롤링
npm run stats:generate    # 통계 생성

# 빌드
npm run build             # 프로덕션 빌드
npm run lint              # ESLint 검사
```

---

## 10. 프로덕션 고려사항

1. **벡터 스토어**: InMemory → Pinecone/Milvus/FAISS로 전환
2. **캐싱**: Redis로 임베딩/검색 캐싱 추가
3. **Rate Limiting**: `/api/chat`에 사용자/IP별 제한 구현
4. **모니터링**: 프로덕션에서 LangSmith 트레이싱 활성화
5. **평가**: 충실도/관련성 메트릭 지속 모니터링
6. **배포**: Vercel (Next.js 네이티브) 또는 Docker

---

## 11. 핵심 파일 가이드

| 파일 | 용도 | 우선순위 |
|-----|------|---------|
| `lib/rag/interfaces.ts` | 모든 RAG 인터페이스 정의 | 먼저 읽기 |
| `lib/rag/pipeline/rag-pipeline.ts` | 파이프라인 오케스트레이션 | 핵심 이해 |
| `app/api/chat/route.ts` | API 엔드포인트 | API 이해 |
| `app/chat/page.tsx` | 스트리밍 UI | 프론트엔드 이해 |

---

## 12. 다음 단계 (개발 계속)

- [ ] 프로덕션 벡터 스토어 연동 (Pinecone/Milvus)
- [ ] 캐싱 레이어 추가 (Redis)
- [ ] Rate limiting 구현
- [ ] 모니터링 대시보드 강화
- [ ] 성능 최적화 (임베딩 배치 처리)

---

*이 문서는 자동 생성되었으며, 개발 진행에 따라 업데이트됩니다.*
