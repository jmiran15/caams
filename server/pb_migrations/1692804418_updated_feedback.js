migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("5nrkqy0ydtgyskp")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "wltbsfe8",
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
  const collection = dao.findCollectionByNameOrId("5nrkqy0ydtgyskp")

  // remove
  collection.schema.removeField("wltbsfe8")

  return dao.saveCollection(collection)
})
