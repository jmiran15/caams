migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("vlp8gi5a97p27o4")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "y14chvos",
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
  const collection = dao.findCollectionByNameOrId("vlp8gi5a97p27o4")

  // remove
  collection.schema.removeField("y14chvos")

  return dao.saveCollection(collection)
})
