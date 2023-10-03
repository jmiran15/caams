migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("tj7bv4j0d8e6lf4")

  // remove
  collection.schema.removeField("u0cn62ny")

  // remove
  collection.schema.removeField("4bmxjiz3")

  // remove
  collection.schema.removeField("cylqpo1f")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "gi60g0ha",
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
    "id": "yupj39yc",
    "name": "stage",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "collectionId": "q27vrctjqsr4qal",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": []
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "nobz3md9",
    "name": "totalApplications",
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
  const collection = dao.findCollectionByNameOrId("tj7bv4j0d8e6lf4")

  // add
  collection.schema.addField(new SchemaField({
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
  }))

  // add
  collection.schema.addField(new SchemaField({
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
  }))

  // add
  collection.schema.addField(new SchemaField({
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
  }))

  // remove
  collection.schema.removeField("gi60g0ha")

  // remove
  collection.schema.removeField("yupj39yc")

  // remove
  collection.schema.removeField("nobz3md9")

  return dao.saveCollection(collection)
})
