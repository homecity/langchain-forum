---
name: unit-testing
version: 1.0
---

# Unit Testing SKILL

## Component Isolation

```python
def test_embedder(mocker):
    mock_llm = mocker.Mock()
    embedder = Embedder(mock_llm)
    result = embedder.embed("test")
    assert len(result) == 1536
```

## Mocking

```python
@pytest.fixture
def mock_langsmith():
    with patch('langsmith.Client') as mock:
        yield mock
```

## Coverage

- Target: 80%+ for core logic
- Run: `pytest --cov=src tests/`
