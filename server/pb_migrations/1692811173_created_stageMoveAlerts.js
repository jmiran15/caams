migrate((db) => {
  const collection = new Collection({
    "id": "zvvzw1bq5h7iztb",
    "created": "2023-08-23 17:19:33.034Z",
    "updated": "2023-08-23 17:19:33.034Z",
    "name": "stageMoveAlerts",
    "type": "view",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "toqvibgw",
        "name": "movedByFirstName",
        "type": "text",
        "required": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "kxesqptm",
        "name": "movedByLastName",
        "type": "text",
        "required": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "f1l7p98q",
        "name": "applicantFirstName",
        "type": "text",
        "required": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "12cojfbw",
        "name": "applicantLastName",
        "type": "text",
        "required": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "fqjdgohu",
        "name": "fromStageLabel",
        "type": "text",
        "required": true,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "fangljgz",
        "name": "toStageLabel",
        "type": "text",
        "required": true,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "0soaqdug",
        "name": "date",
        "type": "date",
        "required": false,
        "unique": false,
        "options": {
          "min": "",
          "max": ""
        }
      },
      {
        "system": false,
        "id": "i4kvwix2",
        "name": "applicationId",
        "type": "relation",
        "required": true,
        "unique": false,
        "options": {
          "collectionId": "zzc9cx8a0e37p0q",
          "cascadeDelete": false,
          "minSelect": null,
          "maxSelect": 1,
          "displayFields": []
        }
      },
      {
        "system": false,
        "id": "zggtunhf",
        "name": "seenBy",
        "type": "relation",
        "required": true,
        "unique": false,
        "options": {
          "collectionId": "_pb_users_auth_",
          "cascadeDelete": false,
          "minSelect": null,
          "maxSelect": 1,
          "displayFields": []
        }
      }
    ],
    "indexes": [],
    "listRule": null,
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {
      "query": "SELECT \n  (ROW_NUMBER() OVER()) as id,\n  U.firstName as movedByFirstName,\n  U.lastName as movedByLastName,\n  UA.firstName as applicantFirstName,\n  UA.lastName as applicantLastName,\n  FS.label as fromStageLabel,\n  TS.label as toStageLabel,\n  SM.created AS date,\n  SM.application AS applicationId,\n  SM.seenBy\nFROM \n  stageMoves SM\nINNER JOIN user U ON SM.movedBy = U.id \nINNER JOIN application A ON SM.application = A.id\nINNER JOIN user UA ON A.user = UA.id\nINNER JOIN stage FS ON SM.fromStage = FS.id\nINNER JOIN stage TS ON SM.toStage = TS.id;"
    }
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("zvvzw1bq5h7iztb");

  return dao.deleteCollection(collection);
})
