migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("zzc9cx8a0e37p0q")

  collection.updateRule = ""

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("zzc9cx8a0e37p0q")

  collection.updateRule = null

  return dao.saveCollection(collection)
})
