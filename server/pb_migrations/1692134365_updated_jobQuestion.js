migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("jb4tavax2by59d9")

  collection.updateRule = ""
  collection.deleteRule = ""

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("jb4tavax2by59d9")

  collection.updateRule = null
  collection.deleteRule = null

  return dao.saveCollection(collection)
})
