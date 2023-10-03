migrate((db) => {
  const collection = new Collection({
    "id": "4b4v4jk21tbny27",
    "created": "2023-08-23 17:10:06.711Z",
    "updated": "2023-08-23 17:10:06.711Z",
    "name": "feedbackAlerts",
    "type": "view",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "yem7nhgz",
        "name": "employerFirstName",
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
        "id": "triwbihf",
        "name": "employerLastName",
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
        "id": "mhod3yji",
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
        "id": "pgzfcf39",
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
        "id": "uzxjrlza",
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
        "id": "vshzc9xq",
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
        "id": "k5uivfwb",
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
      "query": "SELECT \n  (ROW_NUMBER() OVER()) as id,\n  U.firstName as employerFirstName,\n  U.lastName as employerLastName,\n  UA.firstName as applicantFirstName,\n  UA.lastName as applicantLastName,\n  F.created AS date,\n  F.application AS applicationId,\n  F.seenBy\nFROM \n  feedback F\nINNER JOIN user U ON F.employer = U.id \nINNER JOIN application A ON F.application = A.id\nINNER JOIN user UA ON A.user = UA.id;"
    }
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("4b4v4jk21tbny27");

  return dao.deleteCollection(collection);
})
