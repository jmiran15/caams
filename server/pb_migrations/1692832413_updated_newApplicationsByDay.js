migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("l1ptsgrpdqgwqn7")

  collection.options = {
    "query": "SELECT\n  (ROW_NUMBER() OVER()) as id,\n  AV.job,\n  AV.created AS date,\n  COUNT(*) AS totalNewApplications\nFROM\n  applicationsView AV\nGROUP BY\n  AV.job,\n  date;"
  }

  // remove
  collection.schema.removeField("tuwgh0zl")

  // remove
  collection.schema.removeField("9qogtohi")

  // remove
  collection.schema.removeField("kmtjjxpc")

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

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("l1ptsgrpdqgwqn7")

  collection.options = {
    "query": "SELECT\n  (ROW_NUMBER() OVER()) as id,\n  AV.job,\n  strftime('%Y-%m-%d', AV.created) AS date,\n  COUNT(*) AS totalNewApplications\nFROM\n  applicationsView AV\nGROUP BY\n  AV.job,\n  date;"
  }

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "tuwgh0zl",
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
    "id": "9qogtohi",
    "name": "date",
    "type": "json",
    "required": false,
    "unique": false,
    "options": {}
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "kmtjjxpc",
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
  collection.schema.removeField("h0phtg9r")

  // remove
  collection.schema.removeField("z6v2e4kn")

  // remove
  collection.schema.removeField("kjcf4zkq")

  return dao.saveCollection(collection)
})
