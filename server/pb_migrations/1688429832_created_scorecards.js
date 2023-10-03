migrate((db) => {
  const collection = new Collection({
    "id": "vlp8gi5a97p27o4",
    "created": "2023-07-04 00:17:12.685Z",
    "updated": "2023-07-04 00:17:12.685Z",
    "name": "scorecards",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "h2pvfyqi",
        "name": "application",
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
        "id": "0yaplslt",
        "name": "createdBy",
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
        "id": "0yu9honk",
        "name": "scorecard",
        "type": "json",
        "required": true,
        "unique": false,
        "options": {}
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
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("vlp8gi5a97p27o4");

  return dao.deleteCollection(collection);
})
