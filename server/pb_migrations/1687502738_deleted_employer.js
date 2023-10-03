migrate((db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("mva6qdjkaedd2kz");

  return dao.deleteCollection(collection);
}, (db) => {
  const collection = new Collection({
    "id": "mva6qdjkaedd2kz",
    "created": "2023-04-06 22:28:53.468Z",
    "updated": "2023-06-23 06:42:55.064Z",
    "name": "employer",
    "type": "auth",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "y2to95w0",
        "name": "avatar",
        "type": "file",
        "required": false,
        "unique": false,
        "options": {
          "maxSelect": 1,
          "maxSize": 5242880,
          "mimeTypes": [
            "image/vnd.mozilla.apng",
            "image/jpeg",
            "image/png"
          ],
          "thumbs": [],
          "protected": false
        }
      },
      {
        "system": false,
        "id": "gzgsbpwo",
        "name": "firstName",
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
        "id": "brwkubqx",
        "name": "lastName",
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
        "id": "onk2eabi",
        "name": "company",
        "type": "relation",
        "required": false,
        "unique": false,
        "options": {
          "collectionId": "eb76ewdr48tr59w",
          "cascadeDelete": false,
          "minSelect": null,
          "maxSelect": 1,
          "displayFields": []
        }
      },
      {
        "system": false,
        "id": "fs2navsf",
        "name": "deleted",
        "type": "bool",
        "required": false,
        "unique": false,
        "options": {}
      },
      {
        "system": false,
        "id": "kctnatl3",
        "name": "isAdmin",
        "type": "bool",
        "required": false,
        "unique": false,
        "options": {}
      }
    ],
    "indexes": [],
    "listRule": "",
    "viewRule": "",
    "createRule": "",
    "updateRule": "",
    "deleteRule": "",
    "options": {
      "allowEmailAuth": true,
      "allowOAuth2Auth": true,
      "allowUsernameAuth": true,
      "exceptEmailDomains": null,
      "manageRule": null,
      "minPasswordLength": 8,
      "onlyEmailDomains": null,
      "requireEmail": false
    }
  });

  return Dao(db).saveCollection(collection);
})
