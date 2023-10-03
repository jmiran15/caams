migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("mva6qdjkaedd2kz")

  collection.createRule = ""
  collection.updateRule = ""
  collection.deleteRule = ""

  // remove
  collection.schema.removeField("czxvv4kd")

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("mva6qdjkaedd2kz")

  collection.createRule = null
  collection.updateRule = null
  collection.deleteRule = null

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "czxvv4kd",
    "name": "admin",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "collectionId": "mva6qdjkaedd2kz",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": []
    }
  }))

  return dao.saveCollection(collection)
})
