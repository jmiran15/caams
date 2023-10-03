migrate((db) => {
  const collection = new Collection({
    "id": "hijcv14e7w2bvuu",
    "created": "2023-08-23 16:07:09.417Z",
    "updated": "2023-08-23 16:07:09.417Z",
    "name": "totalApplications",
    "type": "view",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "05c3sxfs",
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
        "id": "bl5ryqsb",
        "name": "totalApplications",
        "type": "number",
        "required": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null
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
      "query": "SELECT \n  job AS id, \n  job,\n  COUNT(*) AS totalApplications\nFROM \n   applicationsView\nGROUP BY \n   job;"
    }
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("hijcv14e7w2bvuu");

  return dao.deleteCollection(collection);
})
