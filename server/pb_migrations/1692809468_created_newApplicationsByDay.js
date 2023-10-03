migrate((db) => {
  const collection = new Collection({
    "id": "l1ptsgrpdqgwqn7",
    "created": "2023-08-23 16:51:08.782Z",
    "updated": "2023-08-23 16:51:08.782Z",
    "name": "newApplicationsByDay",
    "type": "view",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "yxscmy3e",
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
        "id": "mppmwse4",
        "name": "date",
        "type": "json",
        "required": false,
        "unique": false,
        "options": {}
      },
      {
        "system": false,
        "id": "dmhfrhjk",
        "name": "totalNewApplications",
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
      "query": "SELECT\n  (ROW_NUMBER() OVER()) as id,\n  AV.job,\n  DATE(AV.created) AS date,\n  COUNT(*) AS totalNewApplications\nFROM\n  applicationsView AV\nGROUP BY\n  AV.job,\n  date;"
    }
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("l1ptsgrpdqgwqn7");

  return dao.deleteCollection(collection);
})
