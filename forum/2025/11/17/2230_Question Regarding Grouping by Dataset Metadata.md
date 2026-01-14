# Question Regarding Grouping by Dataset Metadata

**Topic ID:** 2230
**Created:** 2025-11-17 04:43:42
**URL:** https://forum.langchain.com/t/2230

---

## Post #1 by @yu-2-saito
*Posted on 2025-11-17 04:43:42*

Hello,

I’m currently experimenting with the evaluation features in LangSmith and have encountered an issue regarding how metadata is used for grouping results.I am running experiments using the evaluate function. Although I successfully attach metadata to the dataset itself, this dataset-level metadata is not always reflected when attempting to group by results in the LangSmith UI .Could you please clarify what triggers the ability to group by dataset metadata in the UI? Specifically, what is the necessary condition or mechanism that allows a dataset’s metadata fields to become available options for grouping experiment results?

▼Script(Fail)


```
`examples = 
[
    {'inputs': {'prompt': 'what is this image?', 'image_filename': 'filename_image1.jpg'},
'outputs': {'expected_output': 'answer1'},
'metadata': {'genre': 'answer1'}},
    {'inputs': {'prompt': 'what is this image?', 'image_filename': 'filename_image2.jpg'},
'outputs': {'expected_output': 'answer2'},
'metadata': {'genre': 'answer2'}},
    {'inputs': {'prompt': 'what is this image?', 'image_filename': 'filename_image3.jpg'},
'outputs': {'expected_output': 'answer3'},
'metadata': {'genre': 'answer3'}}
]
`
```

▼Script(Fail)


```
`# Define an example with attachments
examples = [
    {
        "inputs": {"question": "what is this image?"},
        "outputs": {"answer": "answer"},
        "attachments": {
            "my_img": {"mime_type": "image/png", "data": img_bytes}
        },
        "metadata": {"genre": "image1"} 

    },
    {
        "inputs": {"question": "what is this image?"},
        "outputs": {"answer": "answer"},
        "attachments": {
            "my_local_img": {"mime_type": "image/jpg", "data": Path(__file__).parent / "image.jpg"}
        },
        "metadata": {"genre": "image2"} 
    }
]

`
```




Environment



MacBook Pro(macOS Sequoia 15.5)



Python: 3.11





library version


langsmith: 0.4.42




Thank you for your time and assistance!

---
