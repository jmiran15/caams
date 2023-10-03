migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("a6hnfmrf186rpjz")

  collection.indexes = [
    "CREATE INDEX `idx_HX79hC5` ON `jobs` (`category`)"
  ]

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("a6hnfmrf186rpjz")

  collection.indexes = []

  return dao.saveCollection(collection)
})
