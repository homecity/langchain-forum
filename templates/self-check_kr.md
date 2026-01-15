# Self-Check Template (SSOT)

**Purpose:** Single Source of Truth for Self-Check protocol across all documentation

**Version:** 1.0 (2025-10-24)

---

## 🤖 Self-Check Format

```
🤖 AI Self-Check:
- 요청: [설명 / 리뷰 / 신규개발 / 버그수정 / 리팩토링 / 평가 / 검증 / 기획]
- 📍 관련 섹션: [CLAUDE.md 섹션명]
- 🎯 Workflow: [Claude 단독 / gemini-collaboration / multi-ai-workflow]
- 🤖 Agent 협력: [1개 (Claude) / 2개 (Claude+Gemini) / 3개 (Claude+Gemini+CODEX)]
- 📊 Complexity Score: [X.X점] (<7.0=단독 / 7.0-8.9=Gemini / ≥9.0=CODEX)
- 📊 Policy Score: [X.X점 또는 N/A] (≥8.0=CODEX 권장, policy 파일 수정 시)
- 🔓 Plan Mode: [활성 / 해제 / 사용자 승인]
- 🔔 Multi-AI Pre-Approval: [Pending / Approved / Declined / N/A] ← NEW (rule_14 - Layer 7)
```

---

## 📋 요청 유형 8가지 (MECE)

| 유형 | 설명 | 예시 키워드 |
|------|------|------------|
| **1. 설명** | 현황 파악, 이해 | "이게 뭐야?", "어떻게 작동해?" |
| **2. 리뷰** | 코드 검토, 현재 상태 보고 | "현재 상태는?", "문제점은?" |
| **3. 신규개발** | 새 기능 추가 | "컴포넌트 만들어줘", "기능 추가" |
| **4. 버그수정** | 오류 해결 | "고쳐줘", "에러 나", "안 돼" |
| **5. 리팩토링** | 개선, 최적화 | "더 좋게", "정리해줘", "개선" |
| **6. 평가** | 점수, 등급 제시 | "몇 점?", "품질은?" ← **사용자 명시 요청 시만** |
| **7. 검증** | 정확성 확인 | "맞아?", "테스트해줘", "확인" |
| **8. 기획** | 계획, 설계 | "어떻게 하지?", "방법 제시" |

**MECE 분류 기준:**
- **Dimension 1 - 작업 성격:** 조회 (설명/리뷰) / 수정 (신규/버그/리팩토링) / 검증 (평가/검증/기획)
- **Dimension 2 - 범위:** 단일 파일 / 다중 파일 / 프로젝트 전체
- **Dimension 3 - 목적:** 이해 / 개선 / 생성 / 수정 / 검증

---

## 📊 Score 시스템

### Complexity Score (작업 난이도)

**계산 공식:**
```python
complexity_score = (
    files_count * 0.5 +           # 파일 수
    protected_files * 2.0 +       # Protected Files 수
    code_lines / 500 +            # 코드 라인 수
    ux_project_flag * 3.0 +       # UX 프로젝트 여부
    policy_design_flag * 5.0      # 정책 설계 여부
)
```

**임계값:**
- **< 7.0:** Claude 단독 (1-2분)
- **7.0-8.9:** gemini-collaboration (5분)
- **≥ 9.0:** multi-ai-workflow 고려 (18분)

**예시:**
- 단순 질문 (1개 파일): 3.0-5.0
- 중간 작업 (5-10개 파일): 7.0-8.5
- 대규모 리팩토링 (15+ 파일): 9.0+

---

### Policy Score (정책 변경 영향도)

**계산 공식:**
```python
policy_score = (
    policy_files_changed * 3.0 +  # CLAUDE.md, .skills/*.md
    new_rules_added * 2.0 +        # rule_13, rule_14 등
    policy_keywords * 1.0          # "CODEX", "정책 설계", "프로토콜"
)
```

**임계값:**
- **< 8.0:** CODEX 불필요
- **≥ 8.0:** CODEX 권장 (4가지 조건 충족 시)

**CODEX 권장 조건 (Policy Score ≥ 8.0 + 모두 충족):**
1. ⏱️ **긴급성 낮음** (1-2일 여유)
2. 🎯 **완벽한 분석 필요** (100% 품질 요구)
3. 💬 **사용자 명시 요청** ("CODEX 써줘")
4. 🔓 **Plan Mode 해제** (API 호출 가능)

**Emergency Override (즉시 Claude 단독):**
- 긴급 키워드: "바로", "즉시", "긴급", "빨리"
- Policy Score 무시
- 속도 우선 (5분 vs CODEX 18분)

**예시:**
- CLAUDE.md 오타 수정: 3.0 (CODEX 불필요)
- Rule 1개 추가: 5.0-7.0 (Claude 단독)
- behavioral_rules 재설계: 9.0+ (CODEX 강력 권장)

---

## 🔓 Plan Mode

**정의:**
- Analysis-only mode (외부 API 차단)
- Gemini/CODEX API 호출 불가
- Write/Edit 제한적 허용

**자동 해제 트리거 (Plan Mode Override):**
```python
# 1. 딥리서치 키워드 감지
DEEP_RESEARCH_KEYWORDS = [
    "딥리서치", "deep research", "깊은 분석", "전체 분석",
    "comprehensive analysis", "thorough analysis", "완전한 분석"
]

if any(keyword in user_message.lower() for keyword in DEEP_RESEARCH_KEYWORDS):
    # Plan Mode 자동 해제
    plan_mode = False
    complexity_score = max(complexity_score, 8.0)  # Gemini 강제 활성화
    workflow = "gemini-collaboration"

    # Self-Check 표시
    print("🔓 Plan Mode: 해제 (🔍 딥리서치 요청 → Gemini 필요)")

# 2. Emergency 키워드 감지
EMERGENCY_KEYWORDS = ["바로", "즉시", "긴급", "빨리", "지금", "당장"]

if any(keyword in user_message for keyword in EMERGENCY_KEYWORDS):
    # Plan Mode 제약 일부 무시
    allow_limited_edit = True

    # Self-Check 표시
    print("🔓 Plan Mode: 활성 (⚡ Emergency Override → 제한적 수정 허용)")
```

**일반적인 Plan Mode 감지:**
```python
if plan_mode_active:
    external_api_blocked = True
    gemini_blocked = True
    codex_blocked = True
```

**대응:**
1. **Gemini 필요 시:**
   - Ask user: "A) Sub Agent? B) Plan Mode 해제?"

2. **CODEX 필요 시 (Policy Score ≥ 8.0):**
   - STRONG recommend: "Plan Mode 해제 → CODEX (100% 품질)"
   - Fallback: Sub Agent (85-90% 품질)

3. **딥리서치 요청 시:**
   - 자동 해제 (사용자 확인 불필요)
   - Gemini 자동 활성화
   - Complexity Score ≥ 8.0 강제 설정

---

## 🚨 Emergency Override

**자동 감지 키워드:**
- "바로", "즉시", "긴급", "빨리", "지금", "당장"

**Override 로직:**
```python
if emergency_detected:
    ignore(complexity_score)
    ignore(policy_score)
    ignore(codex_recommendation)

    workflow = "Claude 단독 (Emergency)"
    estimated_time = "2-5분"

    log("Emergency Override: Speed > Quality")
```

**Self-Check 표시:**
```
📊 Policy Score: 12.0점 (≥8.0=CODEX 권장)
  - ⚠️ Emergency Override: 사용자 즉시 개선 요청 → Claude 단독 선택
  - 🚫 CODEX 미사용 이유: 긴급성 (즉시 개선) + Plan Mode 활성
```

---

## 🎯 Workflow Decision Tree

```
사용자 요청
    │
    ├─ 딥리서치? ("딥리서치"/"deep research"/"깊은 분석") ← NEW
    │   └─ YES → Plan Mode 자동 해제
    │           → Complexity Score ≥ 8.0 강제 설정
    │           → Gemini 자동 활성화
    │           → Self-Check: 🔓 Plan Mode: 해제 (🔍 딥리서치 → Gemini)
    │
    ├─ 긴급? ("바로"/"즉시"/"빨리")
    │   └─ YES → Claude 단독 (Emergency Override)
    │           → Self-Check에 Emergency Override 표시
    │
    ├─ Complexity Score 계산
    │   │
    │   ├─ < 7.0 → Claude 단독
    │   │
    │   ├─ 7.0-8.9 → gemini-collaboration
    │   │   │
    │   │   └─ Plan Mode?
    │   │       ├─ Yes → Ask user (Sub Agent or Exit Plan)
    │   │       └─ No → Gemini
    │   │
    │   └─ ≥ 9.0 → Policy Score 확인
    │       │
    │       ├─ Policy < 8.0 → gemini-collaboration
    │       │
    │       └─ Policy ≥ 8.0 → 4가지 조건 확인
    │           │
    │           ├─ 조건 모두 충족 → multi-ai-workflow (CODEX)
    │           │
    │           └─ 조건 불충족 → Claude 단독
    │               └─ Self-Check에 미사용 이유 표시
    │
    └─ 사용자 명시 ("Claude만"/"Gemini"/"CODEX"/"딥리서치")
        └─ Override all scores → User choice
```

---

## 📝 Usage Notes

**MANDATORY:**
- 모든 응답은 Self-Check으로 시작
- 이어가기 세션: behavioral_rules (Lines 7-34) 재확인
- 응답 길이 300+ 예상: 사용자에게 먼저 물어보기

**Self-Check Before Response:**
1. 세션 타입 확인 (새 세션 / 이어가기)
2. 사용자 언어 확인 (한글 / English)
3. **딥리서치 키워드 감지** ← NEW
   - "딥리서치", "deep research", "깊은 분석", "전체 분석" 등
   - 감지 시: Plan Mode 자동 해제 + Gemini 활성화
4. 중복 설명 제거
5. 응답 예상 길이 체크
6. Emergency Override 감지

**Policy Score ≥ 8.0 but CODEX 미사용 시:**
- Self-Check에 반드시 이유 명시
- 예: "⚠️ Emergency Override: 긴급성 우선"
- 예: "🚫 CODEX 미사용 이유: Plan Mode 활성 + 사용자 '바로 시작' 요청"

---

## 🔓 Plan Mode 상태 표시 규칙

### 활성 (Plan Mode: 활성)

**표시 형식:** `🔓 Plan Mode: 활성 (이모지 + 이유)`

| 이유 | 이모지 | 표시 예시 |
|------|--------|-----------|
| 읽기 전용 요청 | 📖 | `🔓 Plan Mode: 활성 (📖 설명/리뷰 요청 = 읽기 전용)` |
| 분석 전용 요청 | 🔍 | `🔓 Plan Mode: 활성 (🔍 분석만 요청, 수정 없음)` |
| 계획 단계 | 📋 | `🔓 Plan Mode: 활성 (📋 계획 수립 중, 실행 전)` |
| 외부 API 차단 | 🚫 | `🔓 Plan Mode: 활성 (🚫 시스템 제약, 외부 API 차단)` |
| 검토 단계 | 👀 | `🔓 Plan Mode: 활성 (👀 코드 검토만, 변경 없음)` |
| Emergency 수정 허용 | ⚡ | `🔓 Plan Mode: 활성 (⚡ Emergency Override → 제한적 수정 허용)` |

---

### 해제 (Plan Mode: 해제)

**표시 형식:** `🔓 Plan Mode: 해제 (이모지 + 이유)`

| 이유 | 이모지 | 표시 예시 |
|------|--------|-----------|
| 파일 수정 작업 | ✏️ | `🔓 Plan Mode: 해제 (✏️ 파일 수정 필요)` |
| 코드 구현 | 💻 | `🔓 Plan Mode: 해제 (💻 코드 작성 중)` |
| Git 커밋 | 📦 | `🔓 Plan Mode: 해제 (📦 커밋 작업)` |
| 외부 API 사용 | 🌐 | `🔓 Plan Mode: 해제 (🌐 Gemini/CODEX 필요)` |
| 사용자 선택 | 👤 | `🔓 Plan Mode: 해제 (👤 사용자가 Exit 선택)` |
| **딥리서치 요청** | 🔍 | `🔓 Plan Mode: 해제 (🔍 딥리서치 → Gemini 필요)` |

---

### 사용자 승인 대기 (Plan Mode: 사용자 승인)

**표시 형식:** `🔓 Plan Mode: 사용자 승인 (이모지 + 상황)`

| 상황 | 이모지 | 표시 예시 |
|------|--------|-----------|
| Gemini 필요하나 차단 | ⚠️ | `🔓 Plan Mode: 사용자 승인 (⚠️ Gemini 차단 → A) Sub Agent? B) Exit Plan?)` |
| CODEX 권장되나 차단 | 🔴 | `🔓 Plan Mode: 사용자 승인 (🔴 CODEX 권장 but 차단 → 선택 필요)` |
| 품질 트레이드오프 | ⚖️ | `🔓 Plan Mode: 사용자 승인 (⚖️ 85% 품질 vs 100% 품질 선택)` |

---

## 🔔 Multi-AI Pre-Approval (rule_14 - Layer 7)

**Purpose:** Mandatory user approval BEFORE calling any Multi-AI agents

**Status Values:**

| Status | When | Action |
|--------|------|--------|
| **N/A** | No Multi-AI needed (Claude solo) | Skip approval |
| **Pending** | Multi-AI call about to happen | HALT → Ask user |
| **Approved** | User said "yes" / "proceed" | Execute Multi-AI workflow |
| **Declined** | User said "no" | Claude solo mode + log to violations_log.json |

---

### Trigger Detection

**HALT and ask BEFORE executing if:**

```python
# 1. Task tool about to be called
if about_to_call(Task, subagent_type="*"):
    status = "Pending"
    prompt_user()

# 2. User mentions Multi-AI keywords
MULTI_AI_KEYWORDS = [
    "Gemini", "CODEX", "앙상블", "협력", "Sub Agent",
    "gemini-collaboration", "multi-ai-workflow"
]

if any(keyword in user_message for keyword in MULTI_AI_KEYWORDS):
    status = "Pending"
    prompt_user()
```

---

### 사용자 승인 요청 템플릿

```
🔔 Multi-AI 사전 승인 요청

모델: [Gemini / CODEX / Sub Agent]
작업: [간단한 설명]
이유: [왜 Multi-AI가 필요한가]
소요 시간: [예상 시간]
비용: [무료 / $0.25 / $0.50-0.70]

Multi-AI 진행할까요? (yes/no/why)
- yes: 워크플로우 실행
- no: Claude 단독 진행 (Multi-AI 사용 안 함)
- why: 이유 설명 + 다시 물어보기
```

---

### Logging (violations_log.json)

**ALL requests logged** (approved + declined):

```json
{
  "timestamp": "2025-10-24T12:00:00Z",
  "model": "CODEX",
  "task": "Download redirect bug fix validation",
  "user_decision": "approved",
  "complexity_score": 7.5,
  "policy_score": 0.0,
  "session_id": "abc123"
}
```

---

### Self-Check Display Examples

**Example 1: Pending (HALT triggered)**
```
🔔 Multi-AI Pre-Approval: Pending
  - Detected: Task(subagent_type="Explore") about to be called
  - Action: HALTING execution, asking user first
```

**Example 2: Approved**
```
🔔 Multi-AI Pre-Approval: Approved
  - User confirmed: "yes" (2025-10-24 12:00)
  - Proceeding with Gemini Pre-Analysis
```

**Example 3: Declined**
```
🔔 Multi-AI Pre-Approval: Declined
  - User choice: Claude solo (no Multi-AI)
  - Logged to: violations_log.json (entry #42)
```

**Example 4: N/A**
```
🔔 Multi-AI Pre-Approval: N/A
  - Reason: Claude solo task (Complexity 4.5 < 7.0)
```

---

### Bypass Prevention

**⚠️ CRITICAL: NO bypass allowed**

- NEVER skip approval (even if urgent)
- NEVER auto-approve (even if same task repeated)
- NEVER rationalize ("simple task, approval unnecessary")
- ALWAYS log (approved + declined)

**Why:** Layer 7 = final enforcement (Layer 1-6 failed)

---

## 🔗 Related Files

- CLAUDE.md Lines 652-678 (Self-Check Protocol)
- docs/context/05-ai-best-practices.md Lines 13-40
- CLAUDE.md.minimal Lines 63-71
- .skills/gemini-collaboration-SKILL.md (Workflow details)
- .skills/multi-ai-workflow-SKILL.md (CODEX workflow)

---

**Last Updated:** 2025-10-24
**Maintained By:** Auto-sync from CLAUDE.md
**Single Source of Truth:** YES
