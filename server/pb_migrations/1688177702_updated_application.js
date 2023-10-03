migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("zzc9cx8a0e37p0q")

  collection.viewRule = ""

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("zzc9cx8a0e37p0q")

  collection.viewRule = null

  return dao.saveCollection(collection)
})
