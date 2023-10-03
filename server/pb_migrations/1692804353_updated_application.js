migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("zzc9cx8a0e37p0q")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "sivrmdi3",
    "name": "seenBy",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "collectionId": "_pb_users_auth_",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": null,
      "displayFields": []
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("zzc9cx8a0e37p0q")

  // remove
  collection.schema.removeField("sivrmdi3")

  return dao.saveCollection(collection)
})
