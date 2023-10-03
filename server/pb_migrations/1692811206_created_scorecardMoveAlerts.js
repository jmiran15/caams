migrate((db) => {
  const collection = new Collection({
    "id": "iku34wzwinlqste",
    "created": "2023-08-23 17:20:06.387Z",
    "updated": "2023-08-23 17:20:06.387Z",
    "name": "scorecardMoveAlerts",
    "type": "view",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "bmhgomyx",
        "name": "createdByFirstName",
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
        "id": "d2mm2tqa",
        "name": "createdByLastName",
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
        "id": "clupivq3",
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
        "id": "kutzamix",
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
        "id": "6ozsijqw",
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
        "id": "nkn3fexs",
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
        "id": "vgjotehf",
        "name": "seenBy",
        "type": "relation",
        "required": false,
        "unique": false,
        "options": {
          "collectionId": "_pb_users_auth_",
          "cascadeDelete": false,
          "minSelect": null,
          "maxSelect": null,
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
      "query": "SELECT \n  (ROW_NUMBER() OVER()) as id,\n  U.firstName as createdByFirstName,\n  U.lastName as createdByLastName,\n  UA.firstName as applicantFirstName,\n  UA.lastName as applicantLastName,\n  S.created AS date,\n  S.application AS applicationId,\n  S.seenBy\nFROM \n  scorecards S\nINNER JOIN user U ON S.createdBy = U.id \nINNER JOIN application A ON S.application = A.id\nINNER JOIN user UA ON A.user = UA.id;"
    }
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("iku34wzwinlqste");

  return dao.deleteCollection(collection);
})
