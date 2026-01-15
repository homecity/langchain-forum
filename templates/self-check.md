# Self-Check Template (SSOT)

**Purpose:** Single Source of Truth for Self-Check protocol across all documentation

**Version:** 1.0 (2025-10-24)

---

## 🤖 Self-Check Format

```
🤖 AI Self-Check:
- Request Type: [Explain / Review / New Feature / Bug Fix / Refactor / Evaluate / Validate / Plan]
- 📍 Related Section: [CLAUDE.md section name]
- 🎯 Workflow: [Claude Solo / gemini-collaboration / multi-ai-workflow]
- 🤖 Agent Collaboration: [1 (Claude) / 2 (Claude+Gemini) / 3 (Claude+Gemini+CODEX)]
- 📊 Complexity Score: [X.X] (<7.0=Solo / 7.0-8.9=Gemini / ≥9.0=CODEX)
- 📊 Policy Score: [X.X or N/A] (≥8.0=CODEX recommended for policy changes)
- 🔓 Plan Mode: [Active / Disabled / User Approval]
- 🔔 Multi-AI Pre-Approval: [Pending / Approved / Declined / N/A] ← NEW (rule_14 - Layer 7)
```

---

## 📋 8 Request Types (MECE)

| Type | Description | Example Keywords |
|------|-------------|-----------------|
| **1. Explain** | Understand current state | "What is this?", "How does it work?" |
| **2. Review** | Code review, status report | "Current status?", "Any issues?" |
| **3. New Feature** | Add new functionality | "Create component", "Add feature" |
| **4. Bug Fix** | Resolve errors | "Fix this", "Error occurred", "Doesn't work" |
| **5. Refactor** | Improve, optimize | "Make better", "Clean up", "Improve" |
| **6. Evaluate** | Score, grade | "How many points?", "Quality?" ← **Only when user explicitly requests** |
| **7. Validate** | Verify correctness | "Is this right?", "Test this", "Confirm" |
| **8. Plan** | Planning, design | "How should I do this?", "Suggest approach" |

**MECE Classification Criteria:**
- **Dimension 1 - Work Nature:** Query (Explain/Review) / Modify (New/Bug/Refactor) / Verify (Evaluate/Validate/Plan)
- **Dimension 2 - Scope:** Single file / Multiple files / Entire project
- **Dimension 3 - Purpose:** Understand / Improve / Create / Modify / Verify

---

## 📊 Scoring System

### Complexity Score (Task Difficulty)

**Calculation Formula:**
```python
complexity_score = (
    files_count * 0.5 +           # Number of files
    protected_files * 2.0 +       # Number of protected files
    code_lines / 500 +            # Lines of code
    ux_project_flag * 3.0 +       # UX project flag
    policy_design_flag * 5.0      # Policy design flag
)
```

**Thresholds:**
- **< 7.0:** Claude Solo (1-2 minutes)
- **7.0-8.9:** gemini-collaboration (5 minutes)
- **≥ 9.0:** Consider multi-ai-workflow (18 minutes)

**Examples:**
- Simple question (1 file): 3.0-5.0
- Medium task (5-10 files): 7.0-8.5
- Large refactoring (15+ files): 9.0+

---

### Policy Score (Policy Change Impact)

**Calculation Formula:**
```python
policy_score = (
    policy_files_changed * 3.0 +  # CLAUDE.md, .skills/*.md
    new_rules_added * 2.0 +        # rule_13, rule_14, etc.
    policy_keywords * 1.0          # "CODEX", "policy design", "protocol"
)
```

**Thresholds:**
- **< 8.0:** CODEX not needed
- **≥ 8.0:** CODEX recommended (if all 4 conditions met)

**CODEX Recommendation Criteria (Policy Score ≥ 8.0 + ALL met):**
1. ⏱️ **Low urgency** (1-2 day buffer)
2. 🎯 **Perfect analysis needed** (100% quality requirement)
3. 💬 **User explicitly requests** ("Use CODEX")
4. 🔓 **Plan Mode disabled** (API calls allowed)

**Emergency Override (Immediate Claude Solo):**
- Emergency keywords: "immediately", "urgent", "quickly", "now", "right away"
- Ignore Policy Score
- Speed priority (5 min vs CODEX 18 min)

**Examples:**
- CLAUDE.md typo fix: 3.0 (CODEX not needed)
- Add 1 rule: 5.0-7.0 (Claude Solo)
- Redesign behavioral_rules: 9.0+ (CODEX strongly recommended)

---

## 🔓 Plan Mode

**Definition:**
- Analysis-only mode (external API blocked)
- Gemini/CODEX API calls disabled
- Write/Edit limited

**Auto-Disable Triggers (Plan Mode Override):**
```python
# 1. Deep research keyword detection
DEEP_RESEARCH_KEYWORDS = [
    "deep research", "thorough analysis", "complete analysis",
    "comprehensive analysis", "in-depth analysis", "full analysis"
]

if any(keyword in user_message.lower() for keyword in DEEP_RESEARCH_KEYWORDS):
    # Auto-disable Plan Mode
    plan_mode = False
    complexity_score = max(complexity_score, 8.0)  # Force Gemini activation
    workflow = "gemini-collaboration"

    # Self-Check display
    print("🔓 Plan Mode: Disabled (🔍 Deep research request → Gemini needed)")

# 2. Emergency keyword detection
EMERGENCY_KEYWORDS = ["immediately", "urgent", "quickly", "now", "right away", "asap"]

if any(keyword in user_message for keyword in EMERGENCY_KEYWORDS):
    # Partially ignore Plan Mode constraints
    allow_limited_edit = True

    # Self-Check display
    print("🔓 Plan Mode: Active (⚡ Emergency Override → Limited edits allowed)")
```

**Standard Plan Mode Detection:**
```python
if plan_mode_active:
    external_api_blocked = True
    gemini_blocked = True
    codex_blocked = True
```

**Response:**
1. **When Gemini needed:**
   - Ask user: "A) Sub Agent? B) Disable Plan Mode?"

2. **When CODEX needed (Policy Score ≥ 8.0):**
   - STRONG recommend: "Disable Plan Mode → CODEX (100% quality)"
   - Fallback: Sub Agent (85-90% quality)

3. **When deep research requested:**
   - Auto-disable (no user confirmation needed)
   - Auto-activate Gemini
   - Force Complexity Score ≥ 8.0

---

## 🚨 Emergency Override

**Auto-Detection Keywords:**
- "immediately", "urgent", "quickly", "now", "right away", "asap"

**Override Logic:**
```python
if emergency_detected:
    ignore(complexity_score)
    ignore(policy_score)
    ignore(codex_recommendation)

    workflow = "Claude Solo (Emergency)"
    estimated_time = "2-5 minutes"

    log("Emergency Override: Speed > Quality")
```

**Self-Check Display:**
```
📊 Policy Score: 12.0 (≥8.0=CODEX recommended)
  - ⚠️ Emergency Override: User requests immediate fix → Claude Solo chosen
  - 🚫 CODEX not used: Urgency (immediate fix) + Plan Mode active
```

---

## 🎯 Workflow Decision Tree

```
User Request
    │
    ├─ Deep research? ("deep research"/"thorough analysis"/"complete analysis") ← NEW
    │   └─ YES → Auto-disable Plan Mode
    │           → Force Complexity Score ≥ 8.0
    │           → Auto-activate Gemini
    │           → Self-Check: 🔓 Plan Mode: Disabled (🔍 Deep research → Gemini)
    │
    ├─ Emergency? ("immediately"/"urgent"/"quickly")
    │   └─ YES → Claude Solo (Emergency Override)
    │           → Display Emergency Override in Self-Check
    │
    ├─ Calculate Complexity Score
    │   │
    │   ├─ < 7.0 → Claude Solo
    │   │
    │   ├─ 7.0-8.9 → gemini-collaboration
    │   │   │
    │   │   └─ Plan Mode?
    │   │       ├─ Yes → Ask user (Sub Agent or Exit Plan)
    │   │       └─ No → Gemini
    │   │
    │   └─ ≥ 9.0 → Check Policy Score
    │       │
    │       ├─ Policy < 8.0 → gemini-collaboration
    │       │
    │       └─ Policy ≥ 8.0 → Check 4 conditions
    │           │
    │           ├─ All conditions met → multi-ai-workflow (CODEX)
    │           │
    │           └─ Conditions not met → Claude Solo
    │               └─ Display reason in Self-Check
    │
    └─ User explicitly specifies ("Claude only"/"Gemini"/"CODEX"/"deep research")
        └─ Override all scores → User choice
```

---

## 📝 Usage Notes

**MANDATORY:**
- All responses start with Self-Check
- Continuation session: Recheck behavioral_rules (Lines 7-34)
- Expected response length 300+: Ask user first

**Self-Check Before Response:**
1. Check session type (new session / continuation)
2. Check user language (Korean / English)
3. **Detect deep research keywords** ← NEW
   - "deep research", "thorough analysis", "complete analysis", etc.
   - If detected: Auto-disable Plan Mode + Activate Gemini
4. Remove duplicate explanations
5. Check expected response length
6. Detect Emergency Override

**When Policy Score ≥ 8.0 but CODEX not used:**
- Must specify reason in Self-Check
- Example: "⚠️ Emergency Override: Urgency prioritized"
- Example: "🚫 CODEX not used: Plan Mode active + User requested 'start immediately'"

---

## 🔓 Plan Mode Status Display Rules

### Active (Plan Mode: Active)

**Display Format:** `🔓 Plan Mode: Active (emoji + reason)`

| Reason | Emoji | Display Example |
|--------|-------|-----------------|
| Read-only request | 📖 | `🔓 Plan Mode: Active (📖 Explain/Review request = read-only)` |
| Analysis-only request | 🔍 | `🔓 Plan Mode: Active (🔍 Analysis only, no modifications)` |
| Planning phase | 📋 | `🔓 Plan Mode: Active (📋 Planning stage, before execution)` |
| External API blocked | 🚫 | `🔓 Plan Mode: Active (🚫 System constraint, external API blocked)` |
| Review phase | 👀 | `🔓 Plan Mode: Active (👀 Code review only, no changes)` |
| Emergency edit allowed | ⚡ | `🔓 Plan Mode: Active (⚡ Emergency Override → Limited edits allowed)` |

---

### Disabled (Plan Mode: Disabled)

**Display Format:** `🔓 Plan Mode: Disabled (emoji + reason)`

| Reason | Emoji | Display Example |
|--------|-------|-----------------|
| File modification needed | ✏️ | `🔓 Plan Mode: Disabled (✏️ File modification required)` |
| Code implementation | 💻 | `🔓 Plan Mode: Disabled (💻 Writing code)` |
| Git commit | 📦 | `🔓 Plan Mode: Disabled (📦 Commit operation)` |
| External API use | 🌐 | `🔓 Plan Mode: Disabled (🌐 Gemini/CODEX needed)` |
| User choice | 👤 | `🔓 Plan Mode: Disabled (👤 User chose Exit)` |
| **Deep research request** | 🔍 | `🔓 Plan Mode: Disabled (🔍 Deep research → Gemini needed)` |

---

### User Approval Pending (Plan Mode: User Approval)

**Display Format:** `🔓 Plan Mode: User Approval (emoji + situation)`

| Situation | Emoji | Display Example |
|-----------|-------|-----------------|
| Gemini needed but blocked | ⚠️ | `🔓 Plan Mode: User Approval (⚠️ Gemini blocked → A) Sub Agent? B) Exit Plan?)` |
| CODEX recommended but blocked | 🔴 | `🔓 Plan Mode: User Approval (🔴 CODEX recommended but blocked → Choice needed)` |
| Quality trade-off | ⚖️ | `🔓 Plan Mode: User Approval (⚖️ 85% quality vs 100% quality choice)` |

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
    "Gemini", "CODEX", "ensemble", "collaboration", "Sub Agent",
    "gemini-collaboration", "multi-ai-workflow"
]

if any(keyword in user_message for keyword in MULTI_AI_KEYWORDS):
    status = "Pending"
    prompt_user()
```

---

### User Approval Request Template

```
🔔 Multi-AI Pre-Approval Request

Model: [Gemini / CODEX / Sub Agent]
Task: [Brief description]
Reason: [Why Multi-AI is needed]
Estimated Time: [Expected duration]
Cost: [Free / $0.25 / $0.50-0.70]

Proceed with Multi-AI? (yes/no/why)
- yes: Execute workflow
- no: Continue with Claude solo (no Multi-AI)
- why: Explain reason + ask again
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
