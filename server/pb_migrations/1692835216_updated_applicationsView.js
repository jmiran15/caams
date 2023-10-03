migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("sh4mzsn7l4932uz")

  collection.listRule = ""
  collection.viewRule = ""

  // remove
  collection.schema.removeField("khdmoepw")

  // remove
  collection.schema.removeField("v6jpdsag")

  // remove
  collection.schema.removeField("2shltnop")

  // remove
  collection.schema.removeField("thwtjhx9")

  // remove
  collection.schema.removeField("drvub9gj")

  // remove
  collection.schema.removeField("ydypmmrf")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "cuezwibl",
    "name": "user",
    "type": "relation",
    "required": true,
    "unique": false,
    "options": {
      "collectionId": "_pb_users_auth_",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": []
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "px0r5tym",
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

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "uqly0bio",
    "name": "job",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "collectionId": "a6hnfmrf186rpjz",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": null
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "2eyne58l",
    "name": "status",
    "type": "select",
    "required": true,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "values": [
        "submitted"
      ]
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "d42mxxao",
    "name": "isRejected",
    "type": "bool",
    "required": false,
    "unique": false,
    "options": {}
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "mdxlnieh",
    "name": "seenBy",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "collectionId": "_pb_users_auth_",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": null,
      "displayFields": []
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("sh4mzsn7l4932uz")

  collection.listRule = null
  collection.viewRule = null

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "khdmoepw",
    "name": "user",
    "type": "relation",
    "required": true,
    "unique": false,
    "options": {
      "collectionId": "_pb_users_auth_",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": []
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "v6jpdsag",
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

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "2shltnop",
    "name": "job",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "collectionId": "a6hnfmrf186rpjz",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": null
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "thwtjhx9",
    "name": "status",
    "type": "select",
    "required": true,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "values": [
        "submitted"
      ]
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "drvub9gj",
    "name": "isRejected",
    "type": "bool",
    "required": false,
    "unique": false,
    "options": {}
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ydypmmrf",
    "name": "seenBy",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "collectionId": "_pb_users_auth_",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": null,
      "displayFields": []
    }
  }))

  // remove
  collection.schema.removeField("cuezwibl")

  // remove
  collection.schema.removeField("px0r5tym")

  // remove
  collection.schema.removeField("uqly0bio")

  // remove
  collection.schema.removeField("2eyne58l")

  // remove
  collection.schema.removeField("d42mxxao")

  // remove
  collection.schema.removeField("mdxlnieh")

  return dao.saveCollection(collection)
})
