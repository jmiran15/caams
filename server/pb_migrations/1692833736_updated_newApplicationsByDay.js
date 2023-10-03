migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("l1ptsgrpdqgwqn7")

  collection.options = {
    "query": "SELECT\n  (ROW_NUMBER() OVER()) as id,\n  AV.job,\n  DATE(AV.created) AS date,\n  COUNT(*) AS totalNewApplications\nFROM\n  applicationsView AV\nGROUP BY\n  AV.job,\n  date;"
  }

  // remove
  collection.schema.removeField("h0phtg9r")

  // remove
  collection.schema.removeField("z6v2e4kn")

  // remove
  collection.schema.removeField("kjcf4zkq")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "0xdtvrgn",
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
    "id": "mw7u11la",
    "name": "date",
    "type": "json",
    "required": false,
    "unique": false,
    "options": {}
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "jb6tyd9s",
    "name": "totalNewApplications",
    "type": "number",
    "required": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("l1ptsgrpdqgwqn7")

  collection.options = {
    "query": "SELECT\n  (ROW_NUMBER() OVER()) as id,\n  AV.job,\n  AV.created AS date,\n  COUNT(*) AS totalNewApplications\nFROM\n  applicationsView AV\nGROUP BY\n  AV.job,\n  date;"
  }

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "h0phtg9r",
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
    "id": "z6v2e4kn",
    "name": "date",
    "type": "date",
    "required": false,
    "unique": false,
    "options": {
      "min": "",
      "max": ""
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "kjcf4zkq",
    "name": "totalNewApplications",
    "type": "number",
    "required": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null
    }
  }))

  // remove
  collection.schema.removeField("0xdtvrgn")

  // remove
  collection.schema.removeField("mw7u11la")

  // remove
  collection.schema.removeField("jb6tyd9s")

  return dao.saveCollection(collection)
})
