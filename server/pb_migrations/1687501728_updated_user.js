migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("_pb_users_auth_")

  collection.createRule = "( @request.data.role = \"user\" && @request.data.isAdmin = false) ||\n(@request.data.role = \"employer\" && @request.data.isAdmin = false) ||\n(@request.data.role = \"employer\" && @request.data.isAdmin = true)"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("_pb_users_auth_")

  collection.createRule = null

  return dao.saveCollection(collection)
})
