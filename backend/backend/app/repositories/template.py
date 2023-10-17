from http import HTTPStatus

from beanie import PydanticObjectId
from common.models.user import User

from backend.app.exceptions import HTTPException
from backend.app.models.template import StandardFormTemplate
from backend.app.schemas.template import FormTemplateDocument


class FormTemplateRepository:

    async def get_templates(self, workspace_id: PydanticObjectId):
        return await FormTemplateDocument.find({"workspace_id": workspace_id}).aggregate([{
            "$set": {"id": "$_id"}
        }]).to_list()

    async def get_template_by_id(self, template_id: PydanticObjectId):
        return await FormTemplateDocument.find_one({"_id": template_id})

    async def import_template_to_workspace(self, workspace_id: PydanticObjectId, template_id: PydanticObjectId):
        template = await self.get_template_by_id(template_id)
        imported_template = FormTemplateDocument(**template.dict())
        imported_template.id = None
        imported_template.imported_from = template.workspace_id
        imported_template.workspace_id = workspace_id
        imported_template = await imported_template.save()
        return imported_template

    async def create_new_template(self, workspace_id: PydanticObjectId, template_body: StandardFormTemplate,
                                  user: User):
        template = FormTemplateDocument(**template_body.dict())
        template.workspace_id = workspace_id
        template.created_by = user.id
        return await template.save()

    async def update_template(self, template_id: PydanticObjectId, template_body: StandardFormTemplate):
        template = await FormTemplateDocument.find_one({"_id": template_id})
        template.fields = template_body.fields
        template.settings = template_body.settings
        template.title = template_body.title
        template.description = template_body.description
        template.button_text = template_body.button_text
        template.logo = template_body.logo
        template.cover_image = template_body.cover_image
        return await template.save()

    async def delete_template(self, template_id: PydanticObjectId):
        template = await FormTemplateDocument.find_one({"_id": template_id})
        if not template:
            raise HTTPException(HTTPStatus.NOT_FOUND, "Template not found")
        await template.delete()
        return template_id
