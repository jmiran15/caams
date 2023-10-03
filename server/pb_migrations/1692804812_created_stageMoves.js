migrate((db) => {
  const collection = new Collection({
    "id": "qjulxahedf6ilrg",
    "created": "2023-08-23 15:33:32.412Z",
    "updated": "2023-08-23 15:33:32.412Z",
    "name": "stageMoves",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "mp2rf8qj",
        "name": "field",
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
        "id": "mvpeighl",
        "name": "movedBy",
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
        "id": "tfzgio5m",
        "name": "fromStage",
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
        "id": "qbkgffwx",
        "name": "toStage",
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
        "id": "p1pfbsa8",
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
        "id": "xsvfsu3n",
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
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("qjulxahedf6ilrg");

  return dao.deleteCollection(collection);
})
