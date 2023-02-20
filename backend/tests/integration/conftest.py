import pytest
from fastapi.testclient import TestClient
from backend.app import get_application
from backend.config import settings


@pytest.fixture
def app_runner():
    # Overriding to true in order to initialize redis client on FastAPI event
    # startup handler. It'll be needed for unit tests.
    settings.USE_REDIS = True
    app = get_application(is_test_mode=True)

    with TestClient(app) as client:
        yield client
