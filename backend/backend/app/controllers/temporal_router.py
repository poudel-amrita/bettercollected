from beanie import PydanticObjectId
from classy_fastapi import Routable, post
from fastapi import Depends

from backend.app.container import container
from backend.app.router import router
from backend.app.services.user_service import get_api_key


@router(prefix="/temporal", tags=["Temporal Router"])
class TemporalRouter(Routable):
    def __init__(self, form_schedular=container.form_schedular(), *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.form_schedular = form_schedular

    @post("/import/{workspace_id}/form/{form_id}")
    async def import_form_to_workspace(
        self, workspace_id: PydanticObjectId, form_id: str, api_key=Depends(get_api_key)
    ):
        await self.form_schedular.update_form(
            workspace_id=workspace_id, form_id=form_id
        )