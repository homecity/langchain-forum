# Does langGraph-studio not support user custom type?

**Topic ID:** 1530
**Created:** 2025-09-15 04:00:46
**URL:** https://forum.langchain.com/t/1530

**Tags:** langsmith-studio

---

## Post #1 by @otteru
*Posted on 2025-09-15 04:00:46*

[#p-2599-topic-1]()Topic
I recently started using Langgraph-Studio.

In my project, I don’t serve input data to workflow directly. instead in `main.py` where my workflow is defined and structured, the input data go through preprocessing process.

like this code


```
`
    s3_bucket = os.getenv('S3_BUCKET')
    folder_key = os.getenv('FOLDER_KEY')
    output_s3_bucket = os.getenv('OUTPUT_S3_BUCKET')

    if not s3_bucket or not folder_key or not output_s3_bucket:
        raise ValueError("S3_BUCKET, folder_key, OUTPUT_S3_BUCKET 환경변수가 모두 필요합니다.")
    
    logger.info(f"Input S3 Bucket: {s3_bucket}")
    logger.info(f"Input Folder Key: {folder_key}")
    logger.info(f"Output S3 Bucket: {output_s3_bucket}")

    # 1. JSON 입력 처리 (워크플로우 외부)
    initial_state = None
    try:
        handler = get_content_handler(folder_key, s3_bucket)
        folder_data = handler.parse_and_validate(folder_key)
    except Exception as e:
        error_msg = f"폴더 파싱 및 검증 중 오류 발생: {str(e)}"
        logger.error(error_msg)
        # 초기 상태가 있고 custom 콘텐츠일 때만 실패 알림 전송
        if initial_state and is_custom_content(initial_state):
            send_failure_notification(initial_state, error_msg)
        raise e
    
    logger.info(f"콘텐츠 파싱 완료 - 유형: {folder_data.content_type}, ID: {folder_data.id}")

    # 2. 워크플로우 실행
    # 초기 BookState를 생성하고, folder_data를 전달합니다.
    initial_state: BookState = {
        "folder_data": folder_data,
        "id": "",
        "content_type": "",
        "title": None,
        "author": None,
        "tags": None,
        "original_text_level": "",
        "chapters": [],
        "chapter_chunks": [],
        "current_chapter_index": 0,
        "current_chunk_index": 0,
        "chapter_metadata": [],
        "leveled_results": [],
        "usage_metrics": {},
        "cover_image_url": None
    }

    try:
        workflow = create_book_transformer_workflow()
        logger.info("=== 텍스트 레벨링 워크플로우 시작 ===")
        # 이제 초기 상태 객체를 직접 전달합니다.
        final_state = workflow.invoke(initial_state, config={"recursion_limit": 10000})
        logger.info("=== 텍스트 레벨링 워크플로우 완료 ===")
```
`
```

in this **FolderData** in state is my custom content type

and as you can see in below, there are another custom content type **ChapterData** in FolderData


```
`@dataclass
class ChapterData:
    """챕터 하나에 대한 데이터 구조"""
    content: str
    title: Optional[str] = None

@dataclass
class FolderData:
    """
    모든 콘텐츠 유형(literature, article 등)이 파싱된 후
    공통적으로 사용하게 될 표준 데이터 구조.
    워크플로우의 각 노드에 전달되는 데이터의 형태.
    """
    content_type: str
    chapters: List[ChapterData]
    title: Optional[str] = None
    author: Optional[str] = None
    tags: Optional[List[str]] = None
    id: str = field(default_factory=lambda: str(uuid.uuid4()))
```
`
```

In this situation, I can’t submit my input in `json` or `yaml`.

And even in `rendered input`, I can see FolderData but i can’t see ChapterData in FolderData.

So i can’t test my langGraph in langgraph-studio.

[#p-2599-question-2]()Question
so my question is:

I’m wondering if this is a current limitation of LangGraph Studio, or if the intended design philosophy for LangGraph is to include all data preprocessing steps as nodes within the graph itself.

---
