from beanie import PydanticObjectId

from common.models.user import User

formData = {
    # "formId": "string",
    "type": "string",
    "title": "string",
    "description": "string",
    "fields": [
        {
            "id": "string",
            "ref": "string",
            "title": "string",
            "description": "string",
            "type": "date",
            "properties": {},
            "validations": {},
            "attachment": {
                "type": "image",
                "href": "string",
                "scale": 0,
                "properties": {},
                "embed_provider": "youtube",
            },
        }
    ],
    "settings": {
        "pinned": False,
        "embedUrl": "string",
        "customUrl": "string",
        "private": False,
        "responseDataOwnerField": "string",
        "provider": "string",
    },
    "publishedAt": "2023-07-12T15:01:24.352Z",
    "responses": 0,
}

formData_2 = {"title": "search_form"}

formResponse = {
    "provider": "string",
    "respondentEmail": "string",
    "answers": {},
    "createdAt": "2023-07-20T06:30:47.497Z",
    "updatedAt": "2023-07-20T06:30:47.497Z",
    "publishedAt": "2023-07-20T06:30:47.497Z",
    "dataOwnerIdentifierType": "string",
    "dataOwnerIdentifier": "string",
    "formTitle": "string",
    "status": "string",
    "formImportedBy": "string",
    "deletionStatus": "pending",
}

workspace_settings = {
    "pinned": True,
    "customUrl": "custom_url",
    "private": True,
    "responseDataOwnerField": "customUser",
}

user_info = {
    "users_info": [
        {
            "_id": "64b0e6c7ae404afd00202f5d",
            "created_at": "2023-07-14T06:10:15.698298",
            "updated_at": "2023-07-14T06:10:15.707762",
            "first_name": "Test_First_Name",
            "last_name": "Test_Second_Name",
            "profile_image": "https://lh3.googleusercontent.com/a/AAcHTtd4wpSc6ZsDSTvrvoOBEMFFAn1005UjtsX6Z3X9guB_xLM=s96-c",
            "email": "testing123@gmail.com",
            "roles": ["FORM_RESPONDER", "FORM_CREATOR"],
            "otp_code": "null",
            "otp_expiry": "null",
            "plan": "FREE",
            "stripe_customer_id": "null",
            "stripe_payment_id": "null",
        }
    ]
}

test_form_import_data = {"form": {}, "response_data_owner": "string"}


testUser = User(id=str(PydanticObjectId()), sub="test@email.com")
testUser1 = User(id=str(PydanticObjectId()), sub="bettercollected@email.com")
testUser2 = User(id=str(PydanticObjectId()), sub="random@email.com")
