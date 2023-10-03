migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("zzc9cx8a0e37p0q")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "h7dwdngf",
    "name": "isRejected",
    "type": "bool",
    "required": false,
    "unique": false,
    "options": {}
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("zzc9cx8a0e37p0q")

  // remove
  collection.schema.removeField("h7dwdngf")

  return dao.saveCollection(collection)
})
