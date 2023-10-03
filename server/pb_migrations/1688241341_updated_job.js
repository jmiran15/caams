migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("a6hnfmrf186rpjz")

  collection.name = "jobs"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("a6hnfmrf186rpjz")

  collection.name = "job"

  return dao.saveCollection(collection)
})
