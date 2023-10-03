migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("zvvzw1bq5h7iztb")

  collection.listRule = ""
  collection.viewRule = ""

  // remove
  collection.schema.removeField("nrlzfazu")

  // remove
  collection.schema.removeField("krhww7x3")

  // remove
  collection.schema.removeField("sjxi1ot1")

  // remove
  collection.schema.removeField("kugsnbyd")

  // remove
  collection.schema.removeField("npolparu")

  // remove
  collection.schema.removeField("rocbrvgx")

  // remove
  collection.schema.removeField("sbcnvhmb")

  // remove
  collection.schema.removeField("wzl9g2nc")

  // remove
  collection.schema.removeField("htn9fmyd")

  // remove
  collection.schema.removeField("subfyuna")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "i4y6azgr",
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

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "xdeubcsl",
    "name": "movedByFirstName",
    "type": "text",
    "required": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "h93qpkmh",
    "name": "movedByLastName",
    "type": "text",
    "required": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ghwahklf",
    "name": "applicantFirstName",
    "type": "text",
    "required": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "pjnknqyk",
    "name": "applicantLastName",
    "type": "text",
    "required": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "cukr7bgy",
    "name": "fromStageLabel",
    "type": "text",
    "required": true,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "whbaz0i8",
    "name": "toStageLabel",
    "type": "text",
    "required": true,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "tlwn4fbj",
    "name": "date",
    "type": "date",
    "required": false,
    "unique": false,
    "options": {
      "min": "",
      "max": ""
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "p4crl8ps",
    "name": "applicationId",
    "type": "relation",
    "required": true,
    "unique": false,
    "options": {
      "collectionId": "zzc9cx8a0e37p0q",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": []
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "pg6ejo25",
    "name": "seenBy",
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

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("zvvzw1bq5h7iztb")

  collection.listRule = null
  collection.viewRule = null

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "nrlzfazu",
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

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "krhww7x3",
    "name": "movedByFirstName",
    "type": "text",
    "required": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "sjxi1ot1",
    "name": "movedByLastName",
    "type": "text",
    "required": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "kugsnbyd",
    "name": "applicantFirstName",
    "type": "text",
    "required": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "npolparu",
    "name": "applicantLastName",
    "type": "text",
    "required": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "rocbrvgx",
    "name": "fromStageLabel",
    "type": "text",
    "required": true,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "sbcnvhmb",
    "name": "toStageLabel",
    "type": "text",
    "required": true,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "wzl9g2nc",
    "name": "date",
    "type": "date",
    "required": false,
    "unique": false,
    "options": {
      "min": "",
      "max": ""
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "htn9fmyd",
    "name": "applicationId",
    "type": "relation",
    "required": true,
    "unique": false,
    "options": {
      "collectionId": "zzc9cx8a0e37p0q",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": []
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "subfyuna",
    "name": "seenBy",
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

  // remove
  collection.schema.removeField("i4y6azgr")

  // remove
  collection.schema.removeField("xdeubcsl")

  // remove
  collection.schema.removeField("h93qpkmh")

  // remove
  collection.schema.removeField("ghwahklf")

  // remove
  collection.schema.removeField("pjnknqyk")

  // remove
  collection.schema.removeField("cukr7bgy")

  // remove
  collection.schema.removeField("whbaz0i8")

  // remove
  collection.schema.removeField("tlwn4fbj")

  // remove
  collection.schema.removeField("p4crl8ps")

  // remove
  collection.schema.removeField("pg6ejo25")

  return dao.saveCollection(collection)
})
