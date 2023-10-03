migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("a6hnfmrf186rpjz")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "p05nogif",
    "name": "status",
    "type": "select",
    "required": false,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "values": [
        "draft",
        "active",
        "closed",
        "pending"
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
    "id": "p05nogif",
    "name": "status",
    "type": "select",
    "required": true,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "values": [
        "draft",
        "active",
        "closed",
        "pending"
      ]
    }
  }))

  return dao.saveCollection(collection)
})
