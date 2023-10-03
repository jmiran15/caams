migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("eb76ewdr48tr59w")

  // remove
  collection.schema.removeField("duxkh7ij")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "fn3cfldl",
    "name": "createdBy",
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
  const collection = dao.findCollectionByNameOrId("eb76ewdr48tr59w")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "duxkh7ij",
    "name": "createdBy",
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
  collection.schema.removeField("fn3cfldl")

  return dao.saveCollection(collection)
})
