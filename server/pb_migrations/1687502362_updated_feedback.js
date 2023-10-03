migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("5nrkqy0ydtgyskp")

  // remove
  collection.schema.removeField("uli0xjaf")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "lul21ruj",
    "name": "employer",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "collectionId": "_pb_users_auth_",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": []
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("5nrkqy0ydtgyskp")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "uli0xjaf",
    "name": "employer",
    "type": "relation",
    "required": true,
    "unique": false,
    "options": {
      "collectionId": "mva6qdjkaedd2kz",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": []
    }
  }))

  // remove
  collection.schema.removeField("lul21ruj")

  return dao.saveCollection(collection)
})
