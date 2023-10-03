migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("lr7g44a3g1mbgif")

  // remove
  collection.schema.removeField("tmttqbmt")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "jo2yigv5",
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
  const collection = dao.findCollectionByNameOrId("lr7g44a3g1mbgif")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "tmttqbmt",
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
  collection.schema.removeField("jo2yigv5")

  return dao.saveCollection(collection)
})
