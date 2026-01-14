# LangChain Forum RAG Dashboard

Support Engineer용 LangChain 포럼 분석 대시보드 및 RAG 챗봇 시스템

## 🎯 프로젝트 개요

- **Framework**: Next.js 15 + App Router
- **UI**: shadcn UI + Tailwind CSS
- **Charts**: Recharts
- **AI**: Gemini 3.0 Flash (답변) + Gemini Embedding gemini-embedding-001 (768-dim)
- **RAG**: Hybrid Retrieval (BM25 + Semantic)
- **Testing**: Vitest (UI) + Jest (RAG) + Playwright (E2E)
- **Methodology**: SOLID, TDD, MECE 5-phase

## 📊 주요 기능

### 1. 대시보드
- 이슈 카테고리 분포 (파이 차트)
- 시계열 분석 (라인 차트)
- 해결률 및 응답 시간 메트릭
- 키워드 클라우드

### 2. RAG 챗봇
- Gemini 3.0 Flash 기반 자연어 질의응답
- 공식 문서 기준 답변
- 소스 인용 (Citation)
- LangSmith 트레이싱

### 3. 포럼 탐색기
- 391개 마크다운 파일 검색
- 태그 필터링
- 해결 상태별 필터

## 🚀 빠른 시작

### 1. 의존성 설치

\`\`\`bash
npm install
\`\`\`

### 2. 환경 변수 설정

\`\`\`bash
cp .env.example .env.local
# .env.local에 API 키 입력
\`\`\`

필수 환경 변수:
- \`GEMINI_API_KEY\`: Gemini API 키
- \`LANGSMITH_API_KEY\`: LangSmith 트레이싱 (Phase 3+)

### 3. 개발 서버 실행

\`\`\`bash
npm run dev
\`\`\`

브라우저에서 [http://localhost:3000](http://localhost:3000) 접속

## 🧪 테스팅

### UI 컴포넌트 테스트 (Vitest)

\`\`\`bash
npm run test:ui
\`\`\`

- **목표 커버리지**: 80%+
- **테스트 대상**: components/, app/ 컴포넌트

### RAG 파이프라인 테스트 (Jest)

\`\`\`bash
npm run test:rag
\`\`\`

- **목표 커버리지**: 90%+
- **테스트 대상**: lib/rag/ 모듈

### E2E 테스트 (Playwright)

\`\`\`bash
# API 엔드포인트 테스트
npm run test:e2e:api

# 전체 앱 테스트
npm run test:e2e:app

# 모든 E2E 테스트
npm run test:e2e
\`\`\`

## 📁 프로젝트 구조

\`\`\`
app/
├── app/                          # Next.js App Router
│   ├── (dashboard)/page.tsx     # 대시보드
│   ├── chat/page.tsx            # RAG 챗봇
│   ├── forum/page.tsx           # 포럼 탐색기
│   ├── api/                     # API 라우트
│   ├── layout.tsx
│   └── globals.css
│
├── components/
│   ├── ui/                      # shadcn UI
│   ├── chat/                    # 챗봇 UI
│   ├── analytics/               # 차트 컴포넌트
│   └── forum/                   # 포럼 UI
│
├── lib/
│   ├── rag/                     # RAG 파이프라인 (Phase 3)
│   │   ├── embedder/
│   │   ├── retriever/
│   │   ├── reranker/
│   │   ├── generator/
│   │   └── pipeline/
│   └── utils.ts
│
├── tests/
│   ├── unit/ui/                 # UI 테스트
│   ├── unit/rag/                # RAG 테스트
│   └── e2e/                     # E2E 테스트
│
└── .github/workflows/ci.yml     # CI/CD 파이프라인
\`\`\`

## 🔧 개발 명령어

\`\`\`bash
npm run dev          # 개발 서버
npm run build        # 프로덕션 빌드
npm run start        # 프로덕션 서버
npm run lint         # ESLint
npm run type-check   # TypeScript 타입 체크
\`\`\`

## 📋 개발 로드맵

### Phase 1: 요구사항 & 설계 ✅
- [x] SDD 문서 작성 (UI, RAG, Dev)

### Phase 2: 인프라 설정 🔄
- [x] Next.js 15 프로젝트 초기화
- [x] TypeScript strict mode 설정
- [x] 테스팅 프레임워크 설정 (Vitest, Jest, Playwright)
- [x] CI/CD 파이프라인 (GitHub Actions)
- [ ] shadcn UI 컴포넌트 추가
- [ ] Recharts, Gemini SDK 설치

### Phase 3: RAG 파이프라인 (TDD) ⏳
- [ ] Embedder (Gemini 768-dim)
- [ ] Retriever (Hybrid Search)
- [ ] Reranker (Cross-Encoder)
- [ ] Generator (Gemini 3.0 Flash)
- [ ] LangSmith 트레이싱

### Phase 4: 프론트엔드 (TDD) ⏳
- [ ] 대시보드 컴포넌트
- [ ] 차트 컴포넌트 (Recharts)
- [ ] 챗봇 인터페이스
- [ ] 포럼 탐색기

### Phase 5: 통합 & E2E ⏳
- [ ] API 엔드포인트
- [ ] E2E 테스트
- [ ] 성능 최적화

### Phase 6: 배포 ⏳
- [ ] Vercel 배포
- [ ] 모니터링 설정
- [ ] 문서화

## 📚 참고 문서

- [Next.js 15 Documentation](https://nextjs.org/docs)
- [shadcn UI](https://ui.shadcn.com)
- [Recharts](https://recharts.org)
- [Gemini API](https://ai.google.dev/docs)
- [LangSmith](https://docs.smith.langchain.com)
- [Implementation Plan](/Users/jihyunjeong/.claude/plans/idempotent-puzzling-milner.md)

## 📄 라이선스

MIT

---

**Last Updated**: 2026-01-14
**Version**: 0.1.0 (Phase 2 진행 중)
