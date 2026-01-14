---
title: "Analyze an experiment"
url: "https://docs.langchain.com/langsmith/analyze-an-experiment"
section: "langsmith"
last_modified: "2025-12-16T22:07:23.903Z"
---
This page describes some of the essential tasks for working with [_experiments_](/langsmith/evaluation-concepts#experiment) in LangSmith:

-   **[Analyze a single experiment](#analyze-a-single-experiment)**: View and interpret experiment results, customize columns, filter data, and compare runs.
-   **[Download experiment results as a CSV](#how-to-download-experiment-results-as-a-csv)**: Export your experiment data for external analysis and sharing.
-   **[Rename an experiment](#how-to-rename-an-experiment)**: Update experiment names in both the Playground and Experiments view.

## 

[​

](#analyze-a-single-experiment)

Analyze a single experiment

After running an experiment, you can use LangSmith’s experiment view to analyze the results and draw insights about your experiment’s performance.

### 

[​

](#open-the-experiment-view)

Open the experiment view

To open the experiment view, select the relevant [_dataset_](/langsmith/evaluation-concepts#datasets) from the **Dataset & Experiments** page and then select the experiment you want to view. ![Open experiment view](https://mintcdn.com/langchain-5e9cc07a/Fr2lazPB4XVeEA7l/langsmith/images/select-experiment.png?fit=max&auto=format&n=Fr2lazPB4XVeEA7l&q=85&s=74207f0a2422f89fdc75b23f0a88c58f)

### 

[​

](#view-experiment-results)

View experiment results

#### 

[​

](#customize-columns)

Customize columns

By default, the experiment view shows the input, output, and reference output for each [example](/langsmith/evaluation-concepts#examples) in the dataset, feedback scores from evaluations and experiment metrics like cost, token counts, latency and status. You can customize the columns using the **Display** button to make it easier to interpret experiment results:

-   **Break out fields from inputs, outputs, and reference outputs** into their own columns. This is especially helpful if you have long inputs/outputs/reference outputs and want to surface important fields.
-   **Hide and reorder columns** to create focused views for analysis.
-   **Control decimal precision on feedback scores**. By default, LangSmith surfaces numerical feedback scores with a decimal precision of 2, but you can customize this setting to be up to 6 decimals.
-   **Set the Heat Map threshold** to high, middle, and low for numeric feedback scores in your experiment, which affects the threshold at which score chips render as red or green:

![Column heatmap configuration](https://mintcdn.com/langchain-5e9cc07a/aKRoUGXX6ygp4DlC/langsmith/images/column-heat-map.png?fit=max&auto=format&n=aKRoUGXX6ygp4DlC&q=85&s=b0203a449f0f7df70900735ba540d712)

You can set default configurations for an entire dataset or temporarily save settings just for yourself.

#### 

[​

](#sort-and-filter)

Sort and filter

To sort or filter feedback scores, you can use the actions in the column headers. ![Sort and filter](https://mintcdn.com/langchain-5e9cc07a/ImHGLQW1HnQYwnJV/langsmith/images/sort-filter.png?fit=max&auto=format&n=ImHGLQW1HnQYwnJV&q=85&s=067490743d1229ae233f15e46236ed67)

#### 

[​

](#table-views)

Table views

Depending on the view most useful for your analysis, you can change the formatting of the table by toggling between a compact view, a full, view, and a diff view.

-   The **Compact** view shows each run as a one-line row, for ease of comparing scores at a glance.
-   The **Full** view shows the full output for each run for digging into the details of individual runs.
-   The **Diff** view shows the text difference between the reference output and the output for each run.

![Diff view](https://mintcdn.com/langchain-5e9cc07a/aKRoUGXX6ygp4DlC/langsmith/images/diff-mode.png?fit=max&auto=format&n=aKRoUGXX6ygp4DlC&q=85&s=fb916d33cea2f344f3483b42d3670696)

#### 

[​

](#view-the-traces)

View the traces

Hover over any of the output cells, and click on the trace icon to view the trace for that run. This will open up a trace in the side panel. To view the entire tracing project, click on the **View Project** button in the top right of the header. ![View trace](https://mintcdn.com/langchain-5e9cc07a/1RIJxfRpkszanJLL/langsmith/images/view-trace.png?fit=max&auto=format&n=1RIJxfRpkszanJLL&q=85&s=c94c0d2ecedf248c639c971bf29196e6)

#### 

[​

](#view-evaluator-runs)

View evaluator runs

For evaluator scores, you can view the source run by hovering over the evaluator score cell and clicking on the arrow icon. This will open up a trace in the side panel. If you’re running a [LLM-as-a-judge evaluator](/langsmith/llm-as-judge), you can view the prompt used for the evaluator in this run. If your experiment has [repetitions](/langsmith/evaluation-concepts#repetitions), you can click on the aggregate average score to find links to all of the individual runs. ![View evaluator runs](https://mintcdn.com/langchain-5e9cc07a/0B2PFrFBMRWNccee/langsmith/images/evaluator-run.png?fit=max&auto=format&n=0B2PFrFBMRWNccee&q=85&s=fc8df7233285b0f5a4ca9b44c06fcb47)

### 

[​

](#group-results-by-metadata)

Group results by metadata

You can add metadata to examples to categorize and organize them. For example, if you’re evaluating factual accuracy on a question answering dataset, the metadata might include which subject area each question belongs to. Metadata can be added either [via the UI](/langsmith/manage-datasets-in-application#edit-example-metadata) or [via the SDK](/langsmith/manage-datasets-programmatically#update-single-example). To analyze results by metadata, use the **Group by** dropdown in the top right corner of the experiment view and select your desired metadata key. This displays average feedback scores, latency, total tokens, and cost for each metadata group.

You will only be able to group by example metadata on experiments created after February 20th, 2025. Any experiments before that date can still be grouped by metadata, but only if the metadata is on the experiment traces themselves.

### 

[​

](#repetitions)

Repetitions

If you’ve run your experiment with [_repetitions_](/langsmith/evaluation-concepts#repetitions), there will be arrows in the output results column so you can view outputs in the table. To view each run from the repetition, hover over the output cell and click the expanded view. When you run an experiment with repetitions, LangSmith displays the average for each feedback score in the table. Click on the feedback score to view the feedback scores from individual runs, or to view the standard deviation across repetitions. ![Repetitions](https://mintcdn.com/langchain-5e9cc07a/Fr2lazPB4XVeEA7l/langsmith/images/repetitions.png?fit=max&auto=format&n=Fr2lazPB4XVeEA7l&q=85&s=60962de04e5533d7718ca60fa9c7dcce)

### 

[​

](#compare-to-another-experiment)

Compare to another experiment

In the top right of the experiment view, you can select another experiment to compare to. This will open up a comparison view, where you can see how the two experiments compare. To learn more about the comparison view, see [how to compare experiment results](/langsmith/compare-experiment-results).

## 

[​

](#download-experiment-results-as-a-csv)

Download experiment results as a CSV

LangSmith lets you download experiment results as a CSV file, which allows you to analyze and share your results. To download as a CSV, click the download icon at the top of the experiment view. The icon is directly to the left of the [Compact toggle](/langsmith/compare-experiment-results#adjust-the-table-display). ![Download CSV](https://mintcdn.com/langchain-5e9cc07a/aKRoUGXX6ygp4DlC/langsmith/images/download-experiment-results-as-csv.png?fit=max&auto=format&n=aKRoUGXX6ygp4DlC&q=85&s=f237eb4b252a1018097be113434c22fa)

## 

[​

](#rename-an-experiment)

Rename an experiment

Experiment names must be unique per workspace.

You can rename an experiment in the LangSmith UI in:

-   The [Playground](#renaming-an-experiment-in-the-playground). When running experiments in the Playground, a default name with the format `pg::prompt-name::model::uuid` (eg. `pg::gpt-4o-mini::897ee630`) is automatically assigned. You can rename an experiment immediately after running it by editing its name in the Playground table header. ![Edit name in playground](https://mintcdn.com/langchain-5e9cc07a/Fr2lazPB4XVeEA7l/langsmith/images/rename-in-playground.png?fit=max&auto=format&n=Fr2lazPB4XVeEA7l&q=85&s=5b647ff1894376bbb727dabc4d73f039)
-   The [Experiments view](#renaming-an-experiment-in-the-experiments-view). When viewing results in the experiments view, you can rename an experiment by using the pencil icon beside the experiment name. ![Edit name in experiments view](https://mintcdn.com/langchain-5e9cc07a/Fr2lazPB4XVeEA7l/langsmith/images/rename-in-experiments-view.png?fit=max&auto=format&n=Fr2lazPB4XVeEA7l&q=85&s=16afa853361ec265a0c7917d815f3132)

* * *

[Edit this page on GitHub](https://github.com/langchain-ai/docs/edit/main/src/langsmith/analyze-an-experiment.mdx) or [file an issue](https://github.com/langchain-ai/docs/issues/new/choose).

[Connect these docs](/use-these-docs) to Claude, VSCode, and more via MCP for real-time answers.