migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("a6hnfmrf186rpjz")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "o0mxua57",
    "name": "category",
    "type": "select",
    "required": false,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "values": [
        "engineering",
        "research",
        "other"
      ]
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("a6hnfmrf186rpjz")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "o0mxua57",
    "name": "category",
    "type": "select",
    "required": true,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "values": [
        "engineering",
        "research",
        "other"
      ]
    }
  }))

  return dao.saveCollection(collection)
})
