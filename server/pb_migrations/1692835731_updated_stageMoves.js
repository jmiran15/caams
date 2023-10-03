migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("qjulxahedf6ilrg")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "mp2rf8qj",
    "name": "job",
    "type": "relation",
    "required": true,
    "unique": false,
    "options": {
      "collectionId": "a6hnfmrf186rpjz",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": []
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("qjulxahedf6ilrg")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "mp2rf8qj",
    "name": "field",
    "type": "relation",
    "required": true,
    "unique": false,
    "options": {
      "collectionId": "a6hnfmrf186rpjz",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": []
    }
  }))

  return dao.saveCollection(collection)
})
