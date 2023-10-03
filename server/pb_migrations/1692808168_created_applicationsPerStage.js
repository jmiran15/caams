migrate((db) => {
  const collection = new Collection({
    "id": "tj7bv4j0d8e6lf4",
    "created": "2023-08-23 16:29:28.549Z",
    "updated": "2023-08-23 16:29:28.549Z",
    "name": "applicationsPerStage",
    "type": "view",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "u0cn62ny",
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
        "id": "4bmxjiz3",
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
        "id": "cylqpo1f",
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
      "query": "SELECT\n  AV.job AS id,\n  AV.job,\n  AV.stage,\n  COUNT(*) AS totalApplications\nFROM\n  applicationsView AV\nGROUP BY\n  AV.job,\n  AV.stage;"
    }
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("tj7bv4j0d8e6lf4");

  return dao.deleteCollection(collection);
})
