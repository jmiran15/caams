migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("ykt39mx6h7tmf7w")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "72tt4d1y",
    "name": "read",
    "type": "bool",
    "required": false,
    "unique": false,
    "options": {}
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("ykt39mx6h7tmf7w")

  // remove
  collection.schema.removeField("72tt4d1y")

  return dao.saveCollection(collection)
})
