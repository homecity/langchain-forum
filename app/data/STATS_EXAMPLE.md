# Forum Statistics Example Output

This document shows sample output from the statistics generation script.

## Generated: 2026-01-14

### Metrics Overview

```
Total Issues: 363
Resolved: 156
Active: 207
Resolution Rate: 43%
Average Response Time: 1.2 days
```

**Trends (vs. previous month):**
- Total: +39 (12% growth)
- Resolved: +12 (8% growth)
- Active: +27 (15% growth)
- Resolution Rate: -1.4% (slight decrease)

### Category Distribution

Top 10 categories by post count:

| Rank | Category | Posts | Percentage |
|------|----------|-------|------------|
| 1 | General | 226 | 62.3% |
| 2 | Python Help | 50 | 13.8% |
| 3 | Cloud | 38 | 10.5% |
| 4 | JS Help | 25 | 6.9% |
| 5 | Self Hosted | 10 | 2.8% |
| 6 | LangSmith Studio | 6 | 1.7% |
| 7 | Intro To LangGraph | 5 | 1.4% |
| 8 | Product Feedback | 1 | 0.3% |
| 9 | Ambient Agents | 1 | 0.3% |
| 10 | Intro To LangSmith | 1 | 0.3% |

**Insights:**
- General category dominates (62.3%)
- Programming help (Python + JS) accounts for 20.7%
- Cloud-related issues are significant (10.5%)

### Monthly Volume Trends

Post counts over the last 9 months:

| Month | Posts | Change |
|-------|-------|--------|
| 2025-04 | 2 | - |
| 2025-06 | 2 | 0% |
| 2025-07 | 106 | +5200% |
| 2025-08 | 69 | -35% |
| 2025-09 | 72 | +4% |
| 2025-10 | 43 | -40% |
| 2025-11 | 29 | -33% |
| 2025-12 | 32 | +10% |
| 2026-01 | 8 | -75% (partial month) |

**Insights:**
- Peak activity in July 2025 (106 posts)
- Steady decline after peak
- January 2026 data is incomplete

### Tag Resolution Rates

Top 10 tags by frequency with resolution rates:

| Rank | Tag | Total | Resolved | Rate |
|------|-----|-------|----------|------|
| 1 | General | 226 | 96 | 42.5% |
| 2 | Cloud | 53 | 24 | 45.3% |
| 3 | Python Help | 50 | 17 | 34.0% |
| 4 | JS Help | 25 | 15 | 60.0% |
| 5 | Self Hosted | 22 | 10 | 45.5% |
| 6 | LangSmith Studio | 16 | 6 | 37.5% |
| 7 | Intro To LangGraph | 8 | 5 | 62.5% |
| 8 | Product Feedback | 7 | 2 | 28.6% |
| 9 | Intro To LangSmith | 4 | 0 | 0.0% |
| 10 | Ambient Agents | 2 | 2 | 100.0% |

**Insights:**
- Best resolution: Ambient Agents (100%), Intro To LangGraph (62.5%), JS Help (60%)
- Worst resolution: Intro To LangSmith (0%), Product Feedback (28.6%)
- Overall average: 43% resolution rate

### Recent Activity (Last 10 Posts)

| Title | Status | Date | Topic ID |
|-------|--------|------|----------|
| Cannot log in to Langsmith | OPEN | 2026-01-13 | 2719 |
| EU LangSmith tracing: runs dropped over 20MB + missing image previews | SOLVED | 2026-01-13 | 2717 |
| DeepAgent: What's the difference between a middleware and a tool? | SOLVED | 2026-01-13 | 2677 |
| Runtime Context Not Working in Deployed LangSmith Agent | OPEN | 2026-01-11 | 2705 |
| Alert notifications not triggering for tag-based | OPEN | 2026-01-08 | 2689 |
| Prod Langsmith deployment raising internal redis errors | SOLVED | 2026-01-05 | 2649 |
| Time Checkpoint memory backend for LangGraph | OPEN | 2026-01-05 | 2662 |
| Create_agent + ToolStrategy: Tools + Structured Output Not Working | SOLVED | 2026-01-05 | 2293 |
| Full experiment runs only 20 examples | SOLVED | 2026-01-04 | 399 |
| Langsmith missing individual toolcall traces | OPEN | 2026-01-03 | 2647 |

**Insights:**
- 4 SOLVED, 6 OPEN in last 10 posts
- Most recent activity: login issues (2026-01-13)
- Mix of deployment, tracing, and agent-related topics

## Key Findings

### Strengths
1. **High volume**: 363 total posts indicate active community
2. **Good JS support**: 60% resolution rate for JavaScript help
3. **Tutorial effectiveness**: High resolution for intro topics (62.5%)

### Areas for Improvement
1. **General category resolution**: 42.5% is below average
2. **Product feedback loop**: Only 28.6% resolution indicates gap
3. **LangSmith intro content**: 0% resolution suggests documentation issues
4. **Overall resolution rate**: 43% could be improved

### Recommendations
1. **Triage general posts**: Better categorization could improve resolution
2. **Enhance product feedback workflow**: Close the loop on feature requests
3. **Improve LangSmith intro docs**: Address common getting-started issues
4. **Focus on cloud deployment**: 45.3% resolution is moderate, needs attention

## Usage in Dashboard

This data powers the forum analytics dashboard:

- **Overview Cards**: Total, Resolved, Active metrics
- **Trend Charts**: Monthly volume line chart
- **Category Pie Chart**: Category distribution visualization
- **Tag Resolution Table**: Sortable table with resolution rates
- **Recent Activity Feed**: Live feed of latest posts

## Update Frequency

Statistics are regenerated:
- **On-demand**: `npm run stats:generate`
- **Automatic**: After each forum data sync (future)
- **Scheduled**: Daily cron job (future)

## Data Quality Notes

- **Status inference**: Based on heuristics (presence of "solved", response count)
- **Trends**: Calculated against mocked previous month (10% growth assumption)
- **Response time**: Currently mocked at 1.2 days (needs real calculation)

For raw data, see `data/forum-stats.json`.
