---
name: development-workflow
version: 1.0
last_updated: 2025-11-16
description: MECE development workflow with 5-phase todo template for API development, type safety, and code quality enforcement. Auto-loads for all development tasks.
license: MIT
triggers:
  - ALL development tasks (API, features, refactoring)
  - User mentions "개발", "API", "코드 작성", "구현"
  - Before starting implementation work
  - After requirements clarification
priority: highest
dependencies:
  - testing-checklist-SKILL.md: Phase 4 validation
  - git-workflow: Phase 5 commit
  - secure-coding-SKILL.md: Phase 4 security review
  - CLAUDE.md: Lines 429-455 (Code conventions)
compatibility:
  - claude-code: ">=1.0"
  - CLAUDE.md: ">=2.3"
changelog:
  - version: 1.0
    date: 2025-11-16
    changes:
      - Initial creation of development-workflow SKILL
      - MECE Phase 1-5 template for API development
      - Type safety enforcement (any 금지)
      - Integration with testing-checklist and git-workflow
---

# 🔄 Development Workflow SKILL

## Purpose

Provide MECE (Mutually Exclusive, Collectively Exhaustive) todo template for all development tasks. Ensures code quality, type safety, and comprehensive validation before commit.

---

## Auto-Trigger Conditions

**Activate when:**

1. **Development tasks:**
   - API development
   - New features
   - Refactoring
   - Bug fixes

2. **User mentions keywords:**
   - "개발", "API", "코드 작성"
   - "구현", "만들어줘"
   - "요구사항", "schema"

3. **Before implementation:**
   - After user clarifies requirements
   - Before writing first line of code
   - When starting new branch

---

## 📋 MECE Todo Template (5 Phases)

### Phase 1: 요구사항 분석 (Requirements Analysis)

**목표:** 무엇을 만들지 명확히 정의

- [ ] **사용자 스토리 명확화**
  - 누가 (Who): 사용자 페르소나
  - 무엇을 (What): 기능 설명
  - 왜 (Why): 비즈니스 가치

- [ ] **엣지 케이스 정의**
  - 빈 값 처리 (null, undefined, empty string)
  - 에러 시나리오 (네트워크 실패, 타임아웃)
  - 경계값 (최소/최대, 0, 음수)

- [ ] **성공 기준 설정**
  - 기능 동작 확인 방법
  - 성능 목표 (응답시간, 처리량)
  - 호환성 요구사항 (브라우저, 디바이스)

---

### Phase 2: 설계 (Design)

**목표:** 어떻게 만들지 구조 설계

- [ ] **Schema 분석**
  - 참조: `@docs/claude/test.guide.md` (테스트 가이드)
  - 데이터베이스 스키마 확인
  - API 요청/응답 형식 정의
  - 상태 관리 구조 (Zustand, Redux)

- [ ] **타입 정의 (TypeScript strict mode)**
  - ❌ **NEVER use `any`** (Rule: 타입 안전성 최우선)
  - ✅ **ALWAYS use:**
    - 유틸리티 타입 (Partial, Pick, Omit, Record)
    - 제네릭 타입 (`<T>`, `<K extends keyof T>`)
    - 덕타이핑 (structural typing)
    - Union types (`string | number`)
    - Discriminated unions (type guards)

  **예시:**
  ```typescript
  // ❌ BAD
  function process(data: any) { ... }

  // ✅ GOOD
  function process<T extends { id: string }>(data: T): Result<T> { ... }
  ```

- [ ] **API 인터페이스 설계**
  - REST endpoint 정의 (GET, POST, PUT, DELETE)
  - Request/Response 타입
  - Error handling 구조
  - Validation 규칙

---

### Phase 3: 구현 (Implementation)

**목표:** 설계를 코드로 변환

- [ ] **코드 구조화 (논리 정연하게)**
  - 단일 책임 원칙 (SRP): 함수 하나당 역할 하나
  - DRY: 중복 코드 제거
  - 함수 길이: 최대 50줄 (복잡도 낮추기)
  - 가독성: 변수명 명확, 주석 최소화 (코드로 설명)

  **폴더 구조:**
  ```
  app/api/[endpoint]/
    route.ts           # API handler
    schema.ts          # Zod validation
    service.ts         # Business logic
    types.ts           # TypeScript types
  ```

- [ ] **컨벤션 준수 (CLAUDE.md Lines 429-455)**
  - PascalCase: Components, Types
  - camelCase: Functions, variables
  - UPPER_SNAKE_CASE: Constants
  - kebab-case: File names (URL slugs)
  - Tailwind: Utility-first CSS
  - Server-first: Next.js RSC pattern

- [ ] **E2E 테스트 작성 (testing-checklist-SKILL.md)**
  - 참조: `@docs/claude/test.guide.md`
  - Happy path: 정상 동작 시나리오
  - Sad path: 에러 처리 시나리오
  - Edge cases: 경계값, 빈 값

  **E2E 테스트 템플릿:**
  ```typescript
  // tests/e2e/api-endpoint.spec.ts
  test('should create item successfully', async ({ request }) => {
    const response = await request.post('/api/items', {
      data: { name: 'Test Item' }
    });
    expect(response.status()).toBe(201);
    const data = await response.json();
    expect(data).toHaveProperty('id');
  });

  test('should handle validation errors', async ({ request }) => {
    const response = await request.post('/api/items', {
      data: { name: '' } // Invalid: empty name
    });
    expect(response.status()).toBe(400);
  });
  ```

---

### Phase 4: 검증 (Validation)

**목표:** 코드 품질 + 성능 확보

- [ ] **E2E 로직 실행 및 오류 수정**
  ```bash
  npx playwright test                    # Run all E2E tests
  npx playwright test --headed           # Visual debugging
  npx playwright test -g "API endpoint"  # Specific test
  ```

  **통과 기준:**
  - 모든 테스트 green ✅
  - Coverage: 핵심 로직 80% 이상
  - No flaky tests (불안정한 테스트 제거)

- [ ] **`any` 타입 체크 및 수정**
  ```bash
  # Search for 'any' type usage
  grep -r "any" app/ components/ lib/ --include="*.ts" --include="*.tsx"

  # Or use ESLint rule
  # "@typescript-eslint/no-explicit-any": "error"
  ```

  **수정 방법:**
  ```typescript
  // Before: any 사용
  function handleData(data: any) { ... }

  // After 1: Generic 타입
  function handleData<T extends Record<string, unknown>>(data: T) { ... }

  // After 2: Union 타입
  function handleData(data: string | number | boolean) { ... }

  // After 3: Interface 정의
  interface DataStructure { id: string; value: number; }
  function handleData(data: DataStructure) { ... }
  ```

- [ ] **코드 비관적 리뷰 (성능 + 퀄리티)**

  **체크리스트:**

  1. **성능 최적화**
     - [ ] N+1 쿼리 없음 (데이터베이스)
     - [ ] 불필요한 리렌더링 없음 (React)
     - [ ] 메모이제이션 적용 (useMemo, useCallback)
     - [ ] 이미지 최적화 (Next.js Image)
     - [ ] 번들 크기 확인 (`npm run build` → .next/analyze)

  2. **보안 (secure-coding-SKILL.md)**
     - [ ] XSS 방지 (입력값 sanitize)
     - [ ] SQL Injection 방지 (Prepared statements)
     - [ ] CSRF 토큰 검증
     - [ ] 민감정보 로깅 금지 (비밀번호, API 키)

  3. **에러 처리**
     - [ ] Try-catch 구현
     - [ ] 에러 메시지 사용자 친화적
     - [ ] 로깅 구조화 (Sentry, Winston)
     - [ ] Fallback UI (에러 바운더리)

  4. **접근성 (a11y)**
     - [ ] Semantic HTML (header, nav, main)
     - [ ] ARIA labels (button, input)
     - [ ] 키보드 네비게이션 (Tab, Enter)
     - [ ] 색상 대비 (WCAG AA 기준)

- [ ] **npm run lint 실행**
  ```bash
  npm run lint        # ESLint + Prettier
  npm run type-check  # TypeScript errors
  ```

  **통과 기준:**
  - 0 errors, 0 warnings
  - Auto-fix: `npm run lint -- --fix`

---

### Phase 5: 배포 준비 (Deployment Preparation)

**목표:** 프로덕션 환경 대비

- [ ] **Controller exception header 추가**
  ```typescript
  // app/api/[endpoint]/route.ts
  export async function POST(request: Request) {
    try {
      // ... business logic
    } catch (error) {
      console.error('[API Error]', error);
      return NextResponse.json(
        { error: 'Internal Server Error' },
        {
          status: 500,
          headers: {
            'X-Error-Type': error instanceof Error ? error.name : 'Unknown',
            'X-Request-ID': crypto.randomUUID(), // For debugging
          }
        }
      );
    }
  }
  ```

- [ ] **Type-check 통과**
  ```bash
  npm run type-check  # Must pass before commit
  ```

- [ ] **빌드 검증 (Protected Files 수정 시)**
  ```bash
  npm run build       # Production build
  # Check: No errors, bundle size acceptable
  ```

  **조건부 빌드 (Rule 21):**
  - Simple (1-2 files): `type-check`만
  - Important (Protected/3+files/core): `type-check` + `build`

- [ ] **커밋 (git-workflow)**
  - 참조: `.skills/git-workflow/commit-reminder-SKILL.md`
  - Format: `<Type>_<AI>_<용도및목적>_<파일수>-Files`
  - Pre-commit hook: 자동 type-check
  - **NEVER auto-commit** (Rule 2)

---

## 🔗 Integration with Other SKILLs

### Workflow Integration

```
development-workflow (Phase 1-2)
   ↓
[User approves design]
   ↓
development-workflow (Phase 3: Implementation)
   ↓
testing-checklist-SKILL.md (E2E tests)
   ↓
development-workflow (Phase 4: Validation)
   ↓
secure-coding-SKILL.md (Security review)
   ↓
development-workflow (Phase 5: Deployment prep)
   ↓
git-workflow (Commit + Push)
```

### File Relationships

| Phase | Related SKILL | Purpose |
|-------|---------------|---------|
| Phase 1-2 | CLAUDE.md Project Overview | Context understanding |
| Phase 3 | testing-checklist-SKILL.md | E2E test writing |
| Phase 4 | secure-coding-SKILL.md | Security validation |
| Phase 4 | testing-checklist-SKILL.md | Test execution |
| Phase 5 | git-workflow | Commit protocol |

---

## 📊 Quality Metrics

### Phase Completion Criteria

| Phase | Metric | Target |
|-------|--------|--------|
| **Phase 1** | Requirements clarity | 100% (no ambiguity) |
| **Phase 2** | Type coverage | 100% (0 `any` types) |
| **Phase 3** | Convention compliance | 100% (ESLint pass) |
| **Phase 4** | Test coverage | 80%+ (core logic) |
| **Phase 5** | Build success | 100% (0 errors) |

### Code Quality Checklist

- [ ] Cyclomatic Complexity < 10 (per function)
- [ ] Function length < 50 lines
- [ ] File length < 300 lines (split if larger)
- [ ] No commented-out code
- [ ] No console.log in production code
- [ ] No hardcoded values (use constants/env vars)

---

## 💡 Best Practices

### Type Safety Patterns

**1. Utility Types**
```typescript
// Pick specific properties
type UserProfile = Pick<User, 'name' | 'email'>;

// Make all properties optional
type PartialUser = Partial<User>;

// Omit sensitive fields
type PublicUser = Omit<User, 'password' | 'apiKey'>;

// Create key-value map
type StatusMap = Record<string, boolean>;
```

**2. Generics**
```typescript
// Generic function
function findById<T extends { id: string }>(items: T[], id: string): T | undefined {
  return items.find(item => item.id === id);
}

// Generic component
interface TableProps<T> {
  data: T[];
  columns: Array<keyof T>;
}
function Table<T>({ data, columns }: TableProps<T>) { ... }
```

**3. Type Guards**
```typescript
function isString(value: unknown): value is string {
  return typeof value === 'string';
}

function processValue(value: string | number) {
  if (isString(value)) {
    return value.toUpperCase(); // TypeScript knows value is string
  }
  return value.toFixed(2); // TypeScript knows value is number
}
```

### E2E Test Patterns

**1. API Testing**
```typescript
test.describe('POST /api/users', () => {
  test('should create user with valid data', async ({ request }) => {
    const response = await request.post('/api/users', {
      data: { name: 'John', email: 'john@example.com' }
    });
    expect(response.ok()).toBeTruthy();
    const user = await response.json();
    expect(user).toMatchObject({ name: 'John', email: 'john@example.com' });
  });

  test('should reject invalid email', async ({ request }) => {
    const response = await request.post('/api/users', {
      data: { name: 'John', email: 'invalid-email' }
    });
    expect(response.status()).toBe(400);
  });
});
```

**2. UI Interaction Testing**
```typescript
test('should complete form submission', async ({ page }) => {
  await page.goto('/register');

  // Fill form
  await page.fill('input[name="name"]', 'John Doe');
  await page.fill('input[name="email"]', 'john@example.com');

  // Submit
  await page.click('button[type="submit"]');

  // Verify success
  await expect(page.locator('.success-message')).toBeVisible();
  await expect(page).toHaveURL('/dashboard');
});
```

---

## ⚠️ Common Pitfalls

### 1. Skipping Phase 1 (Requirements)
**Problem:** Unclear requirements → Rework later
**Solution:** Always clarify edge cases upfront

### 2. Using `any` for convenience
**Problem:** Type safety lost → Runtime errors
**Solution:** Invest time in proper types (saves debugging time)

### 3. No E2E tests
**Problem:** Manual testing unreliable → Bugs in production
**Solution:** Write tests DURING implementation (not after)

### 4. Skipping code review
**Problem:** Performance/security issues missed
**Solution:** ALWAYS run Phase 4 checklist

### 5. Direct commit to main
**Problem:** No review, risky deployment
**Solution:** Use feature branches (Rule 20)

---

## 🎯 Example: Complete API Development Flow

### Scenario: Create "Add to Favorites" API

**Phase 1: Requirements**
```
User Story: As a user, I want to save jobs to favorites so I can review them later

Edge Cases:
- What if job already favorited? → Return 200 (idempotent)
- What if job doesn't exist? → Return 404
- What if user not authenticated? → Return 401

Success Criteria:
- API responds < 200ms
- Works on mobile + desktop
- Persists across sessions
```

**Phase 2: Design**
```typescript
// Schema (Zod)
const addFavoriteSchema = z.object({
  jobId: z.string().uuid(),
  userId: z.string().uuid(),
});

// Types
interface Favorite {
  id: string;
  userId: string;
  jobId: string;
  createdAt: Date;
}

// API Interface
POST /api/favorites
Request: { jobId: string }
Response: { favorite: Favorite }
Errors: 401, 404, 500
```

**Phase 3: Implementation**
```typescript
// app/api/favorites/route.ts
export async function POST(request: Request) {
  const session = await getServerSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const body = await request.json();
  const { jobId } = addFavoriteSchema.parse(body);

  const favorite = await prisma.favorite.upsert({
    where: { userId_jobId: { userId: session.user.id, jobId } },
    create: { userId: session.user.id, jobId },
    update: {},
  });

  return NextResponse.json({ favorite }, { status: 200 });
}
```

**Phase 4: Validation**
```bash
# E2E tests
npx playwright test -g "Favorites API"
✓ should add favorite (201)
✓ should return existing favorite (200 idempotent)
✓ should reject unauthenticated (401)
✓ should reject invalid jobId (400)

# Type check
npm run type-check
✓ 0 errors

# Lint
npm run lint
✓ 0 errors, 0 warnings
```

**Phase 5: Deployment**
```bash
# Build
npm run build
✓ Build succeeded

# Commit
git add app/api/favorites/
git commit -m "feat: Add favorites API with idempotent upsert"
```

---

**Last Updated:** 2025-11-16
**Version:** 1.0
**Maintainer:** WHRESUME Team
