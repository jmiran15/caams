migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("l1ptsgrpdqgwqn7")

  collection.listRule = ""
  collection.viewRule = ""

  // remove
  collection.schema.removeField("yxscmy3e")

  // remove
  collection.schema.removeField("mppmwse4")

  // remove
  collection.schema.removeField("dmhfrhjk")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "0vjjtwpt",
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
    "id": "5wihjkfx",
    "name": "date",
    "type": "json",
    "required": false,
    "unique": false,
    "options": {}
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "4j17ukah",
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

  collection.listRule = null
  collection.viewRule = null

  // add
  collection.schema.addField(new SchemaField({
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
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "mppmwse4",
    "name": "date",
    "type": "json",
    "required": false,
    "unique": false,
    "options": {}
  }))

  // add
  collection.schema.addField(new SchemaField({
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
  }))

  // remove
  collection.schema.removeField("0vjjtwpt")

  // remove
  collection.schema.removeField("5wihjkfx")

  // remove
  collection.schema.removeField("4j17ukah")

  return dao.saveCollection(collection)
})
