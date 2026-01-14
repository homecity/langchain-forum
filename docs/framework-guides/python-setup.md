# Python Setup Guide

## Environment

```bash
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

## Type Checking

```bash
mypy .
```

## Linting

```bash
ruff check .
ruff format .
```

## Testing

```bash
pytest tests/
```
