migrate((db) => {
  const collection = new Collection({
    "id": "sh4mzsn7l4932uz",
    "created": "2023-08-23 16:02:09.832Z",
    "updated": "2023-08-23 16:02:09.832Z",
    "name": "applicationsView",
    "type": "view",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "ydpl4ywl",
        "name": "user",
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
      },
      {
        "system": false,
        "id": "gpeqnf5u",
        "name": "stage",
        "type": "relation",
        "required": true,
        "unique": false,
        "options": {
          "collectionId": "q27vrctjqsr4qal",
          "cascadeDelete": false,
          "minSelect": null,
          "maxSelect": 1,
          "displayFields": []
        }
      },
      {
        "system": false,
        "id": "9dsvyg5m",
        "name": "job",
        "type": "relation",
        "required": false,
        "unique": false,
        "options": {
          "collectionId": "a6hnfmrf186rpjz",
          "cascadeDelete": false,
          "minSelect": null,
          "maxSelect": 1,
          "displayFields": null
        }
      },
      {
        "system": false,
        "id": "cf7lltcj",
        "name": "status",
        "type": "select",
        "required": true,
        "unique": false,
        "options": {
          "maxSelect": 1,
          "values": [
            "submitted"
          ]
        }
      },
      {
        "system": false,
        "id": "38afmjnw",
        "name": "isRejected",
        "type": "bool",
        "required": false,
        "unique": false,
        "options": {}
      },
      {
        "system": false,
        "id": "j7enychw",
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
      "query": "SELECT \n  A.id AS id, \n  A.created as created, \n  A.updated as updated, \n  A.user as user, \n  A.stage as stage,\n  J.id as job,\n  A.status as status,\n  A.isRejected as isRejected,\n  A.seenBy as seenBy\nFROM \n  application A\nINNER JOIN \n  stage S ON A.stage = S.id\nINNER JOIN\n  jobs J ON S.job = J.id;"
    }
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("sh4mzsn7l4932uz");

  return dao.deleteCollection(collection);
})
