migrate((db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("lr7g44a3g1mbgif");

  return dao.deleteCollection(collection);
}, (db) => {
  const collection = new Collection({
    "id": "lr7g44a3g1mbgif",
    "created": "2023-04-13 23:37:13.981Z",
    "updated": "2023-06-23 06:34:39.617Z",
    "name": "teamMember",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "ukt0vu5t",
        "name": "job",
        "type": "relation",
        "required": true,
        "unique": false,
        "options": {
          "collectionId": "a6hnfmrf186rpjz",
          "cascadeDelete": false,
          "minSelect": null,
          "maxSelect": 1,
          "displayFields": []
        }
      },
      {
        "system": false,
        "id": "aj7igfg2",
        "name": "permissions",
        "type": "select",
        "required": true,
        "unique": false,
        "options": {
          "maxSelect": 1,
          "values": [
            "view",
            "edit"
          ]
        }
      },
      {
        "system": false,
        "id": "jo2yigv5",
        "name": "employer",
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
