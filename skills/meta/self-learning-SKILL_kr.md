---
name: self-learning
version: 1.0
last_updated: 2025-10-23
description: Automatic self-learning system that captures user feedback and updates project rules in real-time
license: MIT
priority: highest
triggers:
  - User feedback patterns ("너무 길어", "중복이 많아", "느려")
  - Performance issues (5+ min response time)
  - User corrections ("이건 아니야", "다시 해줘")
dependencies:
  - none (standalone)
compatibility:
  - claude-code: ">=1.0"
  - CLAUDE.md: ">=2.0"
changelog:
  - 1.0 (2025-10-23): Initial release with real-time CLAUDE.md updates
---

# 🧠 Self-Learning SKILL

## Purpose

Automatically detect user feedback patterns and update CLAUDE.md / SKILL files in real-time to prevent recurring issues.

---

## Auto-Trigger Conditions

**Activate when user says:**
- "너무 길어" / "too long"
- "중복이 많아" / "duplicates"
- "느려" / "too slow"
- "이건 아니야" / "not what I asked"
- "다시 해줘" / "do it again"
- "개선해줘" / "improve this"

**Activate when detecting:**
- Response time > 5 minutes
- Response length > 300 lines (without user request for detail)
- Same content repeated 2+ times in single response
- User explicitly asks for rule updates

---

## Learning Process (4 Steps)

### Step 1: Detect Feedback Pattern

🚨 **SPECIAL CASE: Multi-AI Workflow Language Violation (CRITICAL)**

**Auto-detect when user says:**
- "왜 영어로 답변해?" / "Why English response?"
- "한글로 해줘" / "Answer in Korean"
- "이거 영어잖아" / "This is in English"
- "리뷰가 영어네" / "Review is in English"
- "왜 제미나이가 최종 답변한 걸 그대로 주나요?" / "Why send Gemini's raw output?"

**Auto-classification:**
```typescript
{
  issue_type: "language_violation",
  severity: "critical",
  specific_complaint: "Multi-AI Workflow Step 4 bypassed Korean translation",
  affected_area: "multi-ai-workflow",
  target_file: ".skills/multi-ai-workflow-SKILL.md",
  target_section: "Step 4: Claude - 최종 종합 리포트"
}
```

**Immediate Action (Auto-triggered):**
1. ✅ Detect: Multi-AI Step 4 sent English to Korean user
2. ✅ Generate rule: Add "Korean Output Enforcement Checklist" to Step 4
3. ✅ Update: `.skills/multi-ai-workflow-SKILL.md` (Step 4 앞부분)
4. ✅ Update: `CLAUDE.md` behavioral_rules (add rule_12)
5. ✅ Notify user: "✅ 한글 출력 100% 강제 규칙 추가됨 - 재발 방지 완료"

---

**General Pattern Analysis:**

**Analyze user message for:**
```typescript
{
  issue_type: "efficiency" | "quality" | "accuracy" | "format" | "language_violation",
  severity: "low" | "medium" | "high" | "critical",
  specific_complaint: string,
  affected_area: "response_length" | "duplicates" | "speed" | "format" | "accuracy" | "multi-ai-workflow"
}
```

**Examples:**
```
User: "너무 길어, 5분이나 걸렸어"
→ Issue: efficiency
→ Severity: high
→ Complaint: "response took 5+ minutes"
→ Area: response_length + speed

User: "같은 내용 3번 반복됐어"
→ Issue: quality
→ Severity: critical
→ Complaint: "duplicate content"
→ Area: duplicates

User: "왜 리뷰가 영어인가요?"
→ Issue: language_violation
→ Severity: critical
→ Complaint: "Multi-AI Step 4 English output to Korean user"
→ Area: multi-ai-workflow
→ Auto-fix: Add Korean Output Enforcement Checklist

User: "이건 내가 안 했어" / "다른 세션 작업이야"
→ Issue: multi_session_conflict
→ Severity: medium
→ Complaint: "Git commit included other session's work"
→ Area: git-workflow
→ Auto-fix: Adjust multi-session threshold (30min → Xmin)
```

---

### Step 2: Generate Improvement Rule

⚠️ **LANGUAGE RULE: Korean User → Korean Output**
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

**If user communicates in Korean, ALL outputs MUST be in Korean:**
- ✅ Self-learning rule summaries → 한글
- ✅ Problem descriptions → 한글
- ✅ Recommendations → 한글
- ✅ File update notifications → 한글

**ONLY keep English for:**
- File names (`CLAUDE.md`, `.skills/gemini-collaboration-SKILL.md`)
- Code snippets (`interface BuilderState`)
- Technical terms with no Korean equivalent

**Template:**
```markdown
## [Issue Type] - [Date]

**Problem:**
[User's complaint in 1-2 sentences - IN USER'S LANGUAGE]

**Root Cause:**
[Why it happened - specific behavior/pattern - IN USER'S LANGUAGE]

**New Rule:**
[Actionable rule to prevent recurrence - IN USER'S LANGUAGE]

**Example:**
Before: [Bad example - IN USER'S LANGUAGE]
After: [Good example - IN USER'S LANGUAGE]

**Priority:** [low/medium/high/critical]
```

**Real Example (2025-10-23):**
```markdown
## Efficiency - 2025-10-23

**Problem:**
User requested simple summary, received 600+ line response in 5+ minutes

**Root Cause:**
- No duplicate detection
- No length limit enforcement
- Auto-generated detailed docs without request

**New Rule:**
- HIGHEST PRIORITY: No duplicate explanations (same content only once)
- Response length: 20-300 lines based on request type
- Detailed docs only when user explicitly asks

**Example:**
Before:
- 600+ lines
- Same "Gemini token" explanation 5 times
- Auto-generated comprehensive summary

After:
- 50 lines
- Each topic mentioned once
- Summary only, detailed docs on request

**Priority:** critical
```

---

### Step 3: Update CLAUDE.md or Create SKILL

**Decision Matrix:**

| Issue Type | Applies to All Tasks? | Action |
|-----------|----------------------|---------|
| Efficiency (response length, duplicates) | ✅ Yes | Update CLAUDE.md `<behavioral_rules>` |
| Specific workflow (Gemini errors, CODEX) | ❌ No | Update relevant SKILL file |
| New capability needed | ❌ No | Create new SKILL file |
| Format/structure | ✅ Yes | Update CLAUDE.md Response Protocol |

**Where to Update:**

1. **Universal Rules → CLAUDE.md**
   - Location: `<behavioral_rules>` section (Lines 7-17)
   - Add new `<rule_X>` with clear description
   - Update Response Protocol section

2. **Workflow-Specific → .skills/*.md**
   - gemini-collaboration: Gemini-specific improvements
   - multi-ai-workflow: 3-model collaboration improvements
   - gemini-error-recovery: Error handling improvements

3. **New Capability → New SKILL**
   - Create `.skills/[name]-SKILL.md`
   - Follow SKILL template format
   - Add to auto-trigger conditions

---

### Step 4: Verify & Inform User

**Output Format:**
```markdown
✅ Self-Learning Applied

**Issue Detected:**
[User's complaint]

**Rule Added:**
[New rule in 1-2 sentences]

**Updated Files:**
- CLAUDE.md: Line X (behavioral_rules)
- CLAUDE.md: Lines Y-Z (Response Protocol)

**Effective Immediately:**
All future responses will follow this rule.

**Test:**
[Show how next response will be different]
```

**Example:**
```markdown
✅ Self-Learning Applied

**Issue Detected:**
Response too long (600+ lines) with duplicates, took 5+ minutes

**Rules Added:**
1. No duplicate explanations (HIGHEST PRIORITY)
2. Response length: 20-300 lines based on request type
3. Detailed docs only when explicitly requested

**Updated Files:**
- CLAUDE.md: Lines 7-17 (added rules 7-9)
- CLAUDE.md: Lines 30-72 (Response Efficiency Rules)

**Effective Immediately:**
Next responses will be 50-150 lines, no duplicates.

**Test:**
If you ask "요약해줘" now → 30-50 lines, each topic once, no auto-docs.
```

---

## Learning Categories & Examples

### Category 1: Efficiency Issues

**Triggers:**
- "너무 길어", "시간 오래 걸려", "느려"

**Common Problems:**
- Response > 300 lines

---

### Category 5: Plan Mode Transparency

**Triggers:**
- "CODEX 참여했나요?"
- "Gemini 호출했어?"
- "왜 Sub Agent로 했어?"
- "Plan Mode 확인 안 했네"
- "사전에 알려줘야지"

**Common Problems:**
- Multi-AI (Gemini/CODEX) requested in Plan Mode → Silent fallback to Sub Agent
- No notification BEFORE API call blocked
- User discovers fallback AFTER completion
- Quality downgrade (100% → 85-90%) without user approval
- Policy changes (policy_score ≥ 5.0) processed without CODEX validation

**Solution Protocol:**

1. **Detect BEFORE execution:**
   ```python
   if plan_mode_active and (gemini_requested or codex_requested):
       STOP_IMMEDIATELY()
       CALCULATE_POLICY_SCORE()  # if policy files involved
       NOTIFY_USER()
       WAIT_FOR_CHOICE()
   ```

2. **Show full notification:**
   ```
   ⚠️ PLAN MODE CONSTRAINT DETECTED

   Your request: [Gemini/CODEX] collaboration
   Current context: Plan Mode (analysis-only)

   CONSTRAINT:
   - Gemini/CODEX API: ❌ BLOCKED

   FALLBACK:
   - Claude Sub Agent: ✅ ALLOWED
   - Quality: 85-90% (vs 100%)

   ${policy_score ≥ 5.0 ? 'POLICY DESIGN: CODEX preferred' : ''}

   OPTIONS:
   A. Sub Agent (proceed now, 85-90%)
   B. Exit Plan Mode → Use requested model (100%)
   ```

3. **Wait for user choice:**
   - Option A: Proceed with Sub Agent (user accepted quality trade-off)
   - Option B: HALT execution, instruct user to exit Plan Mode

**Auto-Update Rules:**

| Trigger Pattern | Update Location | New Rule |
|----------------|-----------------|----------|
| "CODEX 참여했나요?" | CLAUDE.md Self-Check (Lines 265-277) | Add Plan Mode detection step |
| "Gemini 호출했어?" | gemini-collaboration (Lines 325-467) | Add notification BEFORE API call |
| "왜 Sub Agent로 했어?" | multi-ai-workflow (Lines 857-918) | Add quality comparison table |
| "Plan Mode 확인 안 했네" | ALL SKILL files | Add Plan Mode constraint sections |

**Example Auto-Update:**

```markdown
User feedback: "CODEX 참여했나요? Plan Mode라 차단됐다고 미리 말해줘야지"

Auto-generated CLAUDE.md update (.claude/templates/self-check.md):

4. **NEW: Check Plan Mode constraint**
   - IF Plan Mode + (Gemini OR CODEX) requested:
     → STOP execution immediately
     → Calculate policy_score (if policy files involved)
     → NOTIFY user BEFORE any execution
     → ASK user choice (A: Sub Agent / B: Exit Plan Mode)
```

**Related Files:**
- CLAUDE.md Lines 271-290 (Plan Mode - brief mention, detailed protocol removed)
- multi-ai-workflow Lines 857-918 (Full protocol)
- gemini-collaboration Lines 325-467 (Gemini-specific)
- testing-checklist Lines 184-393 (6 test scenarios)

---

### Category 7: Session Summary Rule Loss (NEW - 2025-10-24)

**Triggers:**
- "왜 영어로 답변해?" (after continuation session)
- "룰을 안 지켰네" / "왜 또 룰 위반?"
- "이전 세션에선 한글이었는데"
- "요약하면서 룰을 잃어버린 것 같다"
- "context가 길어져서 요약하면서 우리 룰을 안 보는 것 같다"

**Common Problems:**
- Context length exceeds 50K+ tokens → Auto-summary triggered
- Session summary omits behavioral_rules (Lines 7-34)
- Next session violates Rule 12 (language), Rule N (Self-Check), Rule 8 (brevity)
- Summary language ≠ user language → Claude follows summary language (wrong)

**Root Cause Analysis (RCA 2025-10-24):**
```
Primary: 세션 요약 생성 시 CLAUDE.md behavioral_rules 미참조
Secondary: Self-Check 프로토콜 미실행 (Rule N 위반)
Tertiary: "전부"의 과잉 해석 (Rule 8 위반 10배)
```

**Solution Protocol:**

1. **BEFORE responding to continuation session:**
   ```python
   if session_is_continuation:
       MANDATORY_READ("CLAUDE.md", lines=7-34)  # behavioral_rules
       VERIFY_USER_LANGUAGE()  # 한글? English?
       DETECT_LANGUAGE_MISMATCH(summary_lang, user_lang)
       RUN_SELF_CHECK()
       THEN_RESPOND()
   ```

2. **If summary language ≠ user language:**
   ```
   ⚠️ Language mismatch detected
   Summary: English
   User message: 한글

   → OVERRIDE: Switch to 한글 mode (Rule 12)
   → IGNORE summary language
   → USE user message language
   ```

3. **Response length pre-check:**
   ```python
   if estimated_response_length > 300 lines:
       ASK_USER("상세 문서를 별도 파일로 만들까요?")
       WAIT_FOR_CONFIRMATION()

   # 과잉 해석 방지
   if user_says("전부", "모든", "모두"):
       interpret_as = "완전한 목록 (200-300 라인 요약)"
       NOT_interpret_as = "모든 항목 상세 확장 (2,000+ 라인)"
   ```

**Auto-Update Rules:**

| Trigger Pattern | Update Location | New Rule |
|----------------|-----------------|----------|
| "왜 영어로?" (continuation) | CLAUDE.md Lines 29-35 | Add Rule 13 (session summary requirements) |
| "룰을 안 지켰네" | CLAUDE.md Lines 265-277 | Add session type check in Self-Check Before Response |
| "요약하면서 룰 손실" | CLAUDE.md Lines 265-277 | Add continuation session detection protocol |
| "너무 길어" (300+ lines) | CLAUDE.md Lines 94-98 | Add response length pre-check |

**Example Auto-Update:**

```markdown
User feedback: "context가 길어져서 요약하면서 룰을 안 보는 것 같다"

Auto-detection:
→ Issue: session_summary_rule_loss
→ Severity: critical
→ Root cause: Summary generator doesn't read CLAUDE.md
→ Affected: behavioral_rules preservation across sessions

Auto-fix (Applied 2025-10-24):
1. ✅ Added Rule 13 to behavioral_rules (CLAUDE.md Lines 29-35)
2. ✅ Enhanced Self-Check protocol (Lines 265-277)
3. ✅ Added response length check (Lines 94-98)
4. ✅ Added 과잉 해석 방지 (Lines 103-105)
5. ✅ Added this Category 7 to self-learning-SKILL.md

Expected impact:
- Same violation prevention: 95%+
- Token waste reduction: 90%+ (from 16,000+ saved)
- Cross-session consistency: 100%
```

**Prevention Checklist:**

```markdown
✅ Continuation Session Detection
- [ ] Detected session type (New / Continuation)
- [ ] If Continuation: Re-read behavioral_rules (Lines 7-34)
- [ ] Verified user language (한글/English)
- [ ] Checked summary language vs user language
- [ ] Override if mismatch detected

✅ Response Length Pre-Check
- [ ] Estimated response length: [X] lines
- [ ] If 300+: Asked user for confirmation first
- [ ] Interpreted "전부/모든" correctly (complete list, NOT detailed expansion)

✅ Self-Check Execution
- [ ] Session Type: [New/Continuation] declared
- [ ] User Language: [한글/English] declared
- [ ] Rule 12, Rule N, Rule 8 compliance confirmed
```

**Related Files:**
- CLAUDE.md Lines 7-80 (behavioral_rules + Rule 13)
- CLAUDE.md Lines 265-277 (Enhanced Self-Check Protocol)
- .claude/templates/self-check.md (Self-Check Before Response)
- RCA analysis session: 2025-10-24

---

### Category 6: Multi-Session Git Conflicts

**Triggers:**
- "이건 내가 안 했어"
- "다른 세션 작업이야"
- "왜 이 파일도 커밋돼?"
- "30분 기준이 너무 짧아"
- "2시간 전 파일도 내가 했어"

**Common Problems:**
- Multi-Session Detection threshold too strict (30min)
- User takes long break → files marked as "other session"
- User works continuously → 30min threshold correct

**Learning Actions:**

1. **Detect Pattern:**
   ```typescript
   {
     issue_type: "multi_session_conflict",
     severity: "medium",
     complaint: "30분 기준이 너무 짧아 / 2시간 전 파일도 내가 했어",
     affected_area: "git-workflow"
   }
   ```

2. **Analyze User Workflow:**
   ```
   Scenario A: User takes 1-2 hour breaks
   → 30min threshold too strict
   → Suggest: Increase to 2 hours

   Scenario B: User switches sessions rapidly
   → 30min threshold too loose
   → Suggest: Decrease to 15 minutes
   ```

3. **Generate Adjustment Rule:**
   ```markdown
   ✅ Self-Learning: Git Workflow Threshold 조정

   **사용자 패턴 감지:**
   - 평균 휴식 시간: 1-2시간
   - 작업 세션 길이: 30분-2시간
   - 세션 전환 빈도: 낮음

   **현재 Threshold:** 30분 (너무 짧음)
   **제안 Threshold:** 2시간 (1800초 → 7200초)

   **업데이트 파일:**
   .skills/git-workflow/SKILL.md
   - Line 143: THRESHOLD=1800 → THRESHOLD=7200

   **효과:**
   - False positive 감소 (2시간 내 작업은 "현재 세션"으로 분류)
   - 사용자 불편 해소

   **적용하시겠습니까?** (yes/no)
   ```

4. **Update SKILL File:**
   ```markdown
   # .skills/git-workflow/SKILL.md 업데이트

   Before:
   THRESHOLD=1800  # 30 minutes

   After:
   THRESHOLD=7200  # 2 hours (user feedback: 2025-10-23)
   # Adjusted based on user workflow pattern (long breaks common)
   ```

**Decision Matrix for Threshold Adjustment:**

| User Feedback | Current Threshold | Suggested Threshold | Reasoning |
|---------------|------------------|-------------------|-----------|
| "30분 기준 너무 짧아" | 30min | 2 hours | User takes long breaks |
| "2시간 전 파일도 내가 했어" | 30min | 4 hours | Very long work sessions |
| "10분 전 파일이 왜 other야?" | 30min | 15 minutes | Rapid session switching |
| "방금 한 거 왜 old로 나와?" | 30min | 10 minutes | Very active sessions |

**Learning Rate:**
- 1st complaint → Suggest adjustment
- 2nd complaint (same pattern) → Auto-adjust with user confirmation
- 3rd complaint → Consider smart threshold (session gap detection)

**Self-Validation:**
```bash
# Before applying threshold change
echo "현재 Threshold: 30분"
echo "제안 Threshold: 2시간"
echo "변경 이유: 사용자 휴식 시간 1-2시간 (평균)"
echo "False positive 감소 예상: 70%"
echo "적용 시 영향: 이전 작업 파일 범위 확대 (30분 → 2시간)"
```

---
- Time > 5 minutes
- Duplicate explanations

**Auto-Fix:**
```markdown
Rule: Response length limits
- Simple: 20-50 lines
- Medium: 50-150 lines
- Complex: 100-200 lines
- Large refactor: 200-300 lines

Rule: No duplicates
- Each concept mentioned exactly once
- No repeated code examples
- No redundant explanations
```

---

### Category 2: Quality Issues

**Triggers:**
- "중복이 많아", "같은 내용", "반복됐어"

**Common Problems:**
- Same explanation in multiple sections
- Repeated code examples
- Redundant summaries

**Auto-Fix:**
```markdown
Rule: Duplicate Detection
Before sending response:
1. List all topics covered
2. Check if any topic appears 2+ times
3. If yes, consolidate to single mention
4. Remove redundant sections
```

---

### Category 3: Format Issues

**Triggers:**
- "박스 말고", "간단하게", "포맷 복잡해"

**Common Problems:**
- Over-complicated diagrams
- Excessive markdown formatting
- Nested tables/boxes

**Auto-Fix:**
```markdown
Rule: Simple Format
✅ Use:
- Simple bullet points
- Plain lists
- File:line format

❌ Avoid:
- Box-drawing characters (┌┐└┘├┤)
- Nested tables
- Complex diagrams (unless requested)
```

---

### Category 4: Accuracy Issues

**Triggers:**
- "이건 아니야", "잘못됐어", "다시 확인"

**Common Problems:**
- Wrong file paths
- Incorrect line numbers
- Misunderstood requirements

**Auto-Fix:**
```markdown
Rule: Verification Before Response
1. Read actual files (don't assume)
2. Verify line numbers with Read tool
3. Confirm understanding with user if unclear
4. Show evidence (file paths, line numbers)
```

---

### Category 8: Database/RLS Debugging Failures (NEW - 2025-10-25)

**Triggers:**
- "왜 Claude랑 Gemini는 이것 못찾았을까요?"
- "딥 리서치로 처음부터 step by step"
- "CODEX(H) 불러서 분석"
- 데이터베이스 쿼리 성공했다고 했는데 브라우저에 안 나옴
- INSERT duplicate key 에러인데 SELECT는 0개 반환

**Common Problems (Claude/Gemini 실패 패턴):**
1. **가정의 함정 (Assumption Trap)**
   - 스크린샷에 "RLS policy exists" 보임 → 정책 작동한다고 가정
   - 사용자 "쿼리 실행했어" → 실행됐다고 신뢰
   - 증상만 보고 원인 추측 (환경변수, 캐시, PostHog 에러 등)

2. **증상 vs 원인 혼동**
   - 블로그 안 나옴 → 환경변수? → PostHog? → 캐시?
   - Root cause 대신 증상들만 순회

3. **모순 탐지 실패**
   - Signal A: `SELECT blog_authors` → 0 rows
   - Signal B: `INSERT blog_authors` → "duplicate key exists"
   - **모순 (A+B = Row exists BUT cannot be read)**
   - Claude/Gemini: 각 신호 개별 분석 (모순 미탐지)

4. **UI vs 실제 동작 검증 부족**
   - Supabase Dashboard: "Enable read access for all users" 정책 보임
   - 실제 쿼리: `SELECT COUNT(*) FROM v_published_posts` → 0
   - UI ≠ 실제 동작 (검증 필요)

**CODEX(H) 성공 패턴:**

1. **Step-by-Step 데이터 흐름 추적**
   ```
   Step 1: .env.local 로드됨? ✅ 확인
   Step 2: Supabase 연결 성공? ✅ 확인
   Step 3: blog_posts 36개? ✅ 확인
   Step 4: blog_authors 1개? ❌ 0개 발견
   Step 5: INSERT vs SELECT 모순? ✅ 모순 발견
   Step 6: RLS SELECT 정책 실패? ✅ ROOT CAUSE
   ```

2. **모순 탐지 (Contradiction Detection)**
   ```typescript
   // Test: blog_authors SELECT
   Result: 0 rows  // ← Signal A

   // User: Executed INSERT
   Error: "duplicate key (id)=(...) already exists"  // ← Signal B

   // Analysis
   if (Signal A == 0 && Signal B == "duplicate") {
     CONTRADICTION_DETECTED = true
     ROOT_CAUSE = "RLS SELECT policy blocks reads BUT row exists"
   }
   ```

3. **실제 쿼리로 UI 검증**
   ```sql
   -- UI says: "Enable read access policy exists"
   -- Verify with actual query:
   SET ROLE anon;
   SELECT COUNT(*) FROM blog_authors;
   -- Result: 0 (POLICY NOT WORKING)
   ```

**Solution Protocol:**

**Phase 1: 체계적 데이터 흐름 추적 (7 Steps)**
```markdown
Step 1: 환경변수 로드 확인
  → .env.local 파일 존재?
  → Next.js 로그에 "Reload env" 보임?

Step 2: Supabase 연결 테스트
  → createClient() 성공?
  → Simple query (SELECT 1) 작동?

Step 3: Base 테이블 데이터 확인
  → blog_posts 36개 published?
  → author_id 매칭되는 blog_authors 존재?

Step 4: JOIN 테이블 개별 테스트
  → blog_authors: X개
  → blog_categories: Y개
  → blog_seo_metadata: Z개
  → 어느 테이블이 0개? (JOIN 실패 원인)

Step 5: INSERT vs SELECT 모순 테스트
  → INSERT 시도 → duplicate key?
  → SELECT 실행 → 0 rows?
  → 모순 발견? → RLS SELECT 정책 문제

Step 6: RLS 정책 실제 동작 검증
  → SET ROLE anon;
  → SELECT COUNT(*) FROM [table];
  → 0이면 정책 실패 확정

Step 7: 정책 재생성 + 검증
  → DROP POLICY + CREATE POLICY
  → SET ROLE anon; SELECT COUNT(*);
  → 데이터 반환 확인
```

**Phase 2: 모순 탐지 자동화**
```typescript
interface QueryResult {
  select_count: number
  insert_error: string | null
}

function detectContradiction(result: QueryResult): boolean {
  // Pattern 1: SELECT 0 BUT INSERT duplicate
  if (result.select_count === 0 && result.insert_error?.includes("duplicate key")) {
    return true  // RLS SELECT policy blocks reads
  }

  // Pattern 2: View 0 BUT base table has data
  const viewCount = await query("SELECT COUNT(*) FROM v_published_posts")
  const tableCount = await query("SELECT COUNT(*) FROM blog_posts WHERE status='published'")
  if (viewCount === 0 && tableCount > 0) {
    return true  // View JOIN fails or RLS blocks view
  }

  return false
}
```

**Phase 3: UI vs 실제 동작 검증**
```markdown
For Database Issues (Supabase, PostgreSQL, RLS):

❌ NEVER trust:
- Dashboard screenshots ("policy exists")
- User claims ("쿼리 실행했어")
- UI indicators (green checkmarks)

✅ ALWAYS verify:
- Run actual SQL query (SELECT COUNT(*))
- Test with role switching (SET ROLE anon)
- Check query results, not UI
- Validate INSERT vs SELECT consistency
```

**Auto-Update Rules:**

| Trigger Pattern | Update Location | New Rule |
|----------------|-----------------|----------|
| "왜 못찾았을까요?" (DB issue) | self-learning-SKILL.md | Add Category 8 (DB/RLS debugging) |
| "딥 리서치 step by step" | CLAUDE.md Self-Check | Add contradiction detection step |
| INSERT duplicate + SELECT 0 | All debugging workflows | Add RLS SELECT policy verification |
| UI shows policy but query fails | All DB debugging | Add "실제 쿼리로 UI 검증" protocol |

**Example Auto-Update:**

```markdown
User feedback: "드디어 나옵니다. 왜 Claude랑 Gemini는 이것 못찾았을까요?"

Auto-detection:
→ Issue: database_rls_debugging_failure
→ Severity: critical
→ Root cause: Trusted UI/screenshots instead of actual queries
→ Pattern: INSERT duplicate key BUT SELECT returns 0 (contradiction)
→ Affected: All database/RLS debugging workflows

Auto-fix (Applied 2025-10-25):
1. ✅ Added Category 8 to self-learning-SKILL.md
2. ✅ Added Step-by-Step 데이터 흐름 추적 protocol (7 steps)
3. ✅ Added 모순 탐지 (Contradiction Detection) logic
4. ✅ Added "실제 쿼리로 UI 검증" mandatory check
5. ✅ Added INSERT vs SELECT inconsistency pattern

Expected impact:
- Database issue detection: 85% → 99%
- False assumption prevention: 90%+
- RLS policy debugging success: 70% → 95%
```

**Why Claude/Gemini Failed:**

| Aspect | Claude/Gemini | CODEX(H) | Difference |
|--------|---------------|----------|------------|
| **Approach** | 증상 기반 추측 | 데이터 흐름 추적 | 체계성 |
| **Verification** | UI 신뢰 | 실제 쿼리 검증 | 검증 수준 |
| **Contradiction** | 각 신호 개별 분석 | 신호 간 모순 탐지 | 분석 깊이 |
| **Root Cause** | 증상들 순회 | 7-step 추적 → 원인 확정 | 방법론 |

**Prevention Checklist:**

```markdown
✅ Database/RLS Debugging Protocol
- [ ] Step 1-7 순차 실행 (누락 없음)
- [ ] 각 Step 실제 쿼리로 검증 (UI 신뢰 금지)
- [ ] INSERT vs SELECT 결과 비교 (모순 탐지)
- [ ] SET ROLE anon 테스트 (RLS 정책 실제 동작 확인)
- [ ] UI 표시 ≠ 실제 동작 가정 (Always verify)

✅ Contradiction Detection
- [ ] Signal A (SELECT result) 기록
- [ ] Signal B (INSERT/UPDATE error) 기록
- [ ] A + B 모순 여부 확인
- [ ] 모순 발견 시 → RLS/권한 문제 의심

✅ Never Trust, Always Verify
- [ ] Supabase Dashboard 스크린샷 → 실제 쿼리 재실행
- [ ] 사용자 "쿼리 실행했어" → SQL 로그 요청 or 재실행
- [ ] "Enable read access policy" 보임 → SET ROLE anon; SELECT 테스트
```

**Related Files:**
- Category 8 추가: self-learning-SKILL.md (이 파일)
- Future enhancement: Add to CLAUDE.md Self-Check Protocol (Lines 100-113)
- Future enhancement: Add to multi-ai-workflow Step 2 (Deep Metrics)

**Real Case Study (2025-10-25):**
```
Problem: 블로그 글 36개 DB에 있는데 브라우저에 "아직 게시된 블로그 글이 없습니다"
Claude Attempts: 환경변수, PostHog 에러, 캐시, 여러 시도 (90분 소요)
CODEX(H): Step-by-Step 추적 → Step 4에서 blog_authors 0개 발견 → Step 5에서 모순 탐지 → RLS SELECT 정책 실패 확정 (15분 소요)
Result: DROP POLICY + CREATE POLICY → 즉시 해결
Lesson: 체계적 추적 + 모순 탐지 + 실제 검증 = 6배 빠른 해결
```

---

## Integration with Existing SKILLs

### With gemini-collaboration-SKILL

```markdown
If Gemini response is too long:
  → Apply self-learning rules
  → Update gemini-collaboration with length limits
  → Add "concise prompt" templates
```

### With multi-ai-workflow-SKILL

```markdown
If workflow explanations have duplicates:
  → Consolidate workflow steps
  → Remove redundant model comparisons
  → Single workflow diagram only
```

### With gemini-error-recovery-SKILL

```markdown
If error recovery docs are verbose:
  → Compress to decision table only
  → Examples only when user asks
  → Reference full docs, don't repeat
```

---

## Success Metrics

**Track improvements:**
```typescript
{
  before: {
    avg_response_time: "5+ min",
    avg_response_length: "600+ lines",
    duplicate_rate: "30-40%",
    user_satisfaction: "6/10"
  },
  after: {
    avg_response_time: "1-3 min",
    avg_response_length: "100-150 lines",
    duplicate_rate: "0%",
    user_satisfaction: "9/10"
  }
}
```

**Goal:**
- 80% reduction in response time
- 70% reduction in length (maintain quality)
- 0% duplicates
- 90%+ user satisfaction

---

## Learning Log

**❌ NO separate log file needed.**

**Why:**
- Learning applied directly to CLAUDE.md
- Git history already tracks all rule changes
- Separate log = unnecessary maintenance burden
- User can see changes via: `git log CLAUDE.md`

**If user needs history:**
```bash
# Show recent CLAUDE.md changes
git log --oneline CLAUDE.md | head -10

# Show specific rule changes
git diff HEAD~1 CLAUDE.md | grep "behavioral_rules" -A 10
```

---

## Emergency Override

**If self-learning rule causes issues:**

```
User: "이전 방식이 나았어, 되돌려줘"

Claude Action:
1. Read LEARNING_LOG.md
2. Identify last rule change
3. Revert CLAUDE.md / SKILL file
4. Mark in log: Status: ❌ Reverted
5. Ask user: "어떤 부분이 문제였나요?" (learn why)
```

---

## Implementation Checklist

When self-learning activates:

- [ ] Detect feedback pattern (Step 1)
- [ ] Generate improvement rule (Step 2)
- [ ] Update CLAUDE.md or SKILL (Step 3)
- [ ] Verify changes work (Step 4)
- [ ] Inform user of update
- [ ] Log in LEARNING_LOG.md
- [ ] Apply immediately to current session

**Time Limit:** Self-learning update should take < 1 minute

---

## Examples of Good Self-Learning

### Example 1: Duplicate Detection

**User:** "같은 내용 3번 나왔어"

**Claude Self-Learning:**
```
✅ Detected: duplicate_content

Updating CLAUDE.md:
+ Rule 7: 중복 설명 절대 금지 (Line 14)
+ Response Protocol: Duplicate check before sending (Line 68)

Applied immediately.
Next response will mention each topic exactly once.
```

---

### Example 2: Response Too Long

**User:** "요약이 600줄이나 돼, 너무 길어"

**Claude Self-Learning:**
```
✅ Detected: response_length_exceeded

Updating CLAUDE.md:
+ Rule 8: 응답 간결성 20-300 라인 (Line 15)
+ Response Protocol: Length guidelines (Lines 39-46)

Applied immediately.
Next summary will be 30-50 lines maximum.
```

---

### Example 3: Format Too Complex

**User:** "박스 다이어그램 말고 간단하게"

**Claude Self-Learning:**
```
✅ Detected: format_complexity

Updating CLAUDE.md:
+ Response Protocol: Simple format rule (Lines 53-65)

Applied immediately.
Next response will use:
- Simple bullet points
- No box-drawing chars
- File:line format only
```

---

## Anti-Patterns (What NOT to Learn)

**❌ Don't create rules for:**

1. **One-time specific requests**
   - "이번만 PDF로 만들어줘" → Don't make "always PDF" rule

2. **Context-specific preferences**
   - "이 파일만 자세히 설명" → Don't make "always detailed" rule

3. **Contradictory feedback**
   - User A: "길게 써줘" vs User B: "짧게 써줘" → Keep balanced approach

4. **Temporary workarounds**
   - "Gemini 안 되니까 Claude만 써" → Don't disable Gemini permanently

**✅ Only create rules for:**
- Recurring patterns (2+ occurrences)
- Universal improvements (helps all tasks)
- Clear efficiency gains (measurable)
- User explicitly says "항상", "앞으로", "always", "from now on"

---

## Final Notes

**Self-Learning Philosophy:**
> "Learn from every feedback, but don't over-correct.
> Balance automation with user control.
> Efficiency without sacrificing quality."

**Key Principles:**
1. **Listen First:** Understand user's real complaint
2. **Act Fast:** Update rules within 1 minute
3. **Apply Immediately:** Current session onwards
4. **Measure Impact:** Track improvements
5. **Allow Revert:** User can undo if needed

**Success = Fewer repeated complaints + Faster responses + Higher satisfaction**
