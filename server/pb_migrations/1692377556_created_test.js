migrate((db) => {
  const collection = new Collection({
    "id": "voih3e2ovcvymv6",
    "created": "2023-08-18 16:52:36.722Z",
    "updated": "2023-08-18 16:52:36.722Z",
    "name": "test",
    "type": "view",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "axccdrcd",
        "name": "educationId",
        "type": "relation",
        "required": false,
        "unique": false,
        "options": {
          "collectionId": "mg212p451ccqpkc",
          "cascadeDelete": false,
          "minSelect": null,
          "maxSelect": 1,
          "displayFields": null
        }
      },
      {
        "system": false,
        "id": "xldohxxs",
        "name": "firstName",
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
        "id": "olufjvgd",
        "name": "lastName",
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
        "id": "aef0ogap",
        "name": "school",
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
    "options": {
      "query": "SELECT U.id AS id, \n       E.id AS educationId, \n       U.firstName, \n       U.lastName, \n       E.school\nFROM user U\nINNER JOIN education E ON U.id = E.user;"
    }
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("voih3e2ovcvymv6");

  return dao.deleteCollection(collection);
})
