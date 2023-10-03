migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("hijcv14e7w2bvuu")

  collection.listRule = ""
  collection.viewRule = ""

  // remove
  collection.schema.removeField("05c3sxfs")

  // remove
  collection.schema.removeField("bl5ryqsb")

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

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("hijcv14e7w2bvuu")

  collection.listRule = null
  collection.viewRule = null

  // add
  collection.schema.addField(new SchemaField({
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
  }))

  // add
  collection.schema.addField(new SchemaField({
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
  }))

  // remove
  collection.schema.removeField("fazipqn3")

  // remove
  collection.schema.removeField("pn2r1c5b")

  return dao.saveCollection(collection)
})
