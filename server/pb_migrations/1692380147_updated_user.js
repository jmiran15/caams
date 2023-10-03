migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("_pb_users_auth_")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "lktud0fx",
    "name": "experiences",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "collectionId": "pz0kipozr3m1erp",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": null,
      "displayFields": []
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ggdf37s9",
    "name": "educations",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "collectionId": "mg212p451ccqpkc",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": null,
      "displayFields": []
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("_pb_users_auth_")

  // remove
  collection.schema.removeField("lktud0fx")

  // remove
  collection.schema.removeField("ggdf37s9")

  return dao.saveCollection(collection)
})
