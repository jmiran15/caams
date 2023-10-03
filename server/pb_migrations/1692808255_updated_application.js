migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("zzc9cx8a0e37p0q")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "9fqg0noo",
    "name": "stage",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "collectionId": "q27vrctjqsr4qal",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": []
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("zzc9cx8a0e37p0q")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "9fqg0noo",
    "name": "stage",
    "type": "relation",
    "required": true,
    "unique": false,
    "options": {
      "collectionId": "q27vrctjqsr4qal",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": []
    }
  }))

  return dao.saveCollection(collection)
})
