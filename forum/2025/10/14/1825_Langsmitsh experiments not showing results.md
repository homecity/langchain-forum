# Langsmitsh experiments not showing results

**Topic ID:** 1825
**Created:** 2025-10-14 18:02:24
**URL:** https://forum.langchain.com/t/1825

---

## Post #1 by @nicolas.schwab
*Posted on 2025-10-14 18:02:25*

Hi team.

I am using the python SDK to run 3 evaluators on my agent. I have a Dataset defined in Langsmith of 32 elements and I have been unable to run all of them in one run. When I attempt to process the 32 elements in the same run the process gets stuck waiting for langsmith to publish the results, sometimes it publishes a few, sometimes none and some times it publishes some data entry but without any evaluator results, it’s really nondeterministic.

The workaround I found is splitting the data set into buckets of 5 and process them as separate experiments. But of course this is not optimal since it becomes really difficult to compare experiments.

Here is the workspace id if it helps: d6cff8ef-7fcf-4825-9247-700bb08b03e6

Here is the data set id if it helps: 61c56c22-802a-4979-b292-02a6550c4188

Here is a code snippet of how I call the client.evaluate


```
`    datasets = [dataset_id.strip() for dataset_id in EVALUATION_CONFIG["dataset_ids"].split(",")]
    experiments = []
    errors = []
    total_batches = 0
    succeeded_batches = 0
    failed_batches = 0

    for dataset_id in datasets:

        print(f"Starting evaluation with dataset id: {dataset_id}")

        dataset_examples = list(client.list_examples(dataset_id=dataset_id, metadata={"version": "1"}))
        grouped_examples = group_examples_by_user_type(dataset_examples)

        for user_type, examples in grouped_examples.items():
            batch_size = 5
            total_batches_for_user = (len(examples) + batch_size - 1) // batch_size

            for i in range(0, len(examples), batch_size):
                batch = examples[i:i + batch_size]
                batch_num = i // batch_size + 1
                total_batches += 1

                print(f"Processing batch {batch_num}/{total_batches_for_user} for {user_type}")

                try:
                    results = client.evaluate(
                        target,
                        data=list(batch),
                        evaluators=[
                            correctness_evaluator,
                            helpfulness_evaluator,
                            tool_usage_evaluator
                        ],
                        experiment_prefix=f"{EVALUATION_CONFIG['experiment_prefix']}-{user_type}-part-{batch_num}",
                        max_concurrency=EVALUATION_CONFIG["max_concurrency"]
                    )

                    print(f"Waiting for batch {batch_num} to complete...")
                    results.wait()
                    print(f"Flushing results for batch {batch_num}...")
                    client.flush()
                    print(
                        f"Completed batch {batch_num}/{total_batches_for_user} - Experiment: {results.experiment_name}"
                    )
                    experiments.append(results.experiment_name)
                    succeeded_batches += 1
                except Exception as e:
                    failed_batches += 1
                    err = f"Batch {batch_num} failed: {e}"
                    print(err)
                    errors.append(err)
                    continue

        print(f"Evaluation completed for {user_type} - {total_batches_for_user} experiments created")

    client.cleanup()
`
```

---

## Post #2 by @nicolas.schwab
*Posted on 2025-10-16 13:42:51*

Could I get some help with this?

Thanks a lot

---
