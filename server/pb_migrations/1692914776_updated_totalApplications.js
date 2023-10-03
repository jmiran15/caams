migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("hijcv14e7w2bvuu")

  collection.options = {
    "query": "SELECT \n  J.id AS id,\n  J.id AS job,\n  IFNULL(COUNT(AV.job), 0) AS totalApplications\nFROM\n  jobs J\nLEFT JOIN \n  applicationsView AV ON J.id = AV.job\nGROUP BY \n  J.id;"
  }

  // remove
  collection.schema.removeField("fazipqn3")

  // remove
  collection.schema.removeField("pn2r1c5b")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "u31clxi1",
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
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "oeldsixq",
    "name": "totalApplications",
    "type": "json",
    "required": false,
    "unique": false,
    "options": {}
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("hijcv14e7w2bvuu")

  collection.options = {
    "query": "SELECT \n  job AS id, \n  job,\n  COUNT(*) AS totalApplications\nFROM \n   applicationsView\nGROUP BY \n   job;"
  }

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "fazipqn3",
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
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "pn2r1c5b",
    "name": "totalApplications",
    "type": "number",
    "required": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null
    }
  }))

  // remove
  collection.schema.removeField("u31clxi1")

  // remove
  collection.schema.removeField("oeldsixq")

  return dao.saveCollection(collection)
})
