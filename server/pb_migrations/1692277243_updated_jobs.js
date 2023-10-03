migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("a6hnfmrf186rpjz")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "vhbv8sfi",
    "name": "payType",
    "type": "select",
    "required": false,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "values": [
        "hourly",
        "budget",
        "custom"
      ]
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("a6hnfmrf186rpjz")

  // remove
  collection.schema.removeField("vhbv8sfi")

  return dao.saveCollection(collection)
})
