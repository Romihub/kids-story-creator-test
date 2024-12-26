# backend/tests/conftest.py
import pytest
import os

@pytest.fixture(autouse=True)
def env_setup():
    """Setup test environment variables"""
    os.environ['TESTING'] = 'true'
    os.environ['MODEL_PATH'] = 'test_models'
    yield
    os.environ.pop('TESTING')
    os.environ.pop('MODEL_PATH')