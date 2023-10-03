migrate((db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("bdeh5n5ivdhwmz1");

  return dao.deleteCollection(collection);
}, (db) => {
  const collection = new Collection({
    "id": "bdeh5n5ivdhwmz1",
    "created": "2023-06-23 06:18:01.065Z",
    "updated": "2023-06-23 06:18:01.065Z",
    "name": "messages",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "mvgezz9p",
        "name": "employerSender",
        "type": "relation",
        "required": false,
        "unique": false,
        "options": {
          "collectionId": "mva6qdjkaedd2kz",
          "cascadeDelete": false,
          "minSelect": null,
          "maxSelect": 1,
          "displayFields": []
        }
      },
      {
        "system": false,
        "id": "n5ohvaoi",
        "name": "employerReceiver",
        "type": "relation",
        "required": false,
        "unique": false,
        "options": {
          "collectionId": "mva6qdjkaedd2kz",
          "cascadeDelete": false,
          "minSelect": null,
          "maxSelect": 1,
          "displayFields": []
        }
      },
      {
        "system": false,
        "id": "jht36pcl",
        "name": "userSender",
        "type": "relation",
        "required": false,
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
        "id": "ctlhag2y",
        "name": "userReceiver",
        "type": "relation",
        "required": false,
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
        "id": "fc63f1sf",
        "name": "message",
        "type": "text",
        "required": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      }
    ],
    "indexes": [],
    "listRule": null,
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
})
