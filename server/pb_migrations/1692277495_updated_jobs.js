migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("a6hnfmrf186rpjz")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "js5ki9zl",
    "name": "templateName",
    "type": "text",
    "required": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("a6hnfmrf186rpjz")

  // remove
  collection.schema.removeField("js5ki9zl")

  return dao.saveCollection(collection)
})
