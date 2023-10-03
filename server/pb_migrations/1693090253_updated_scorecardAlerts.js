migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("iku34wzwinlqste")

  collection.options = {
    "query": "SELECT \n  (ROW_NUMBER() OVER()) as id,\n  U.firstName as createdByFirstName,\n  U.lastName as createdByLastName,\n  U.id as createdBy,\n  UA.firstName as applicantFirstName,\n  UA.lastName as applicantLastName,\n  STG.job as job,\n  S.created AS date,\n  S.application AS applicationId,\n  S.seenBy\nFROM \n  scorecards S\nINNER JOIN user U ON S.createdBy = U.id \nINNER JOIN application A ON S.application = A.id\nINNER JOIN stage STG ON A.stage = STG.id\nINNER JOIN user UA ON A.user = UA.id;"
  }

  // remove
  collection.schema.removeField("nmppqi7f")

  // remove
  collection.schema.removeField("98yqkmk9")

  // remove
  collection.schema.removeField("slzhsz0p")

  // remove
  collection.schema.removeField("nyy6jxj4")

  // remove
  collection.schema.removeField("pr5owkga")

  // remove
  collection.schema.removeField("mstcdrr1")

  // remove
  collection.schema.removeField("o9exmnjt")

  // remove
  collection.schema.removeField("xettcbca")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "npkdz5gn",
    "name": "createdByFirstName",
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
    "id": "oopuchwg",
    "name": "createdByLastName",
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
    "id": "y5tavinx",
    "name": "createdBy",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "collectionId": "_pb_users_auth_",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": null
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "zrslvndk",
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
    "id": "pbbgmm7u",
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
    "id": "jx7bkwly",
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
    "id": "xkca4cgz",
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
    "id": "drhpimg0",
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
    "id": "ddgnrsay",
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
  const collection = dao.findCollectionByNameOrId("iku34wzwinlqste")

  collection.options = {
    "query": "SELECT \n  (ROW_NUMBER() OVER()) as id,\n  U.firstName as createdByFirstName,\n  U.lastName as createdByLastName,\n  UA.firstName as applicantFirstName,\n  UA.lastName as applicantLastName,\n  STG.job as job,\n  S.created AS date,\n  S.application AS applicationId,\n  S.seenBy\nFROM \n  scorecards S\nINNER JOIN user U ON S.createdBy = U.id \nINNER JOIN application A ON S.application = A.id\nINNER JOIN stage STG ON A.stage = STG.id\nINNER JOIN user UA ON A.user = UA.id;"
  }

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "nmppqi7f",
    "name": "createdByFirstName",
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
    "id": "98yqkmk9",
    "name": "createdByLastName",
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
    "id": "slzhsz0p",
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
    "id": "nyy6jxj4",
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
    "id": "pr5owkga",
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
    "id": "mstcdrr1",
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
    "id": "o9exmnjt",
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
    "id": "xettcbca",
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
  collection.schema.removeField("npkdz5gn")

  // remove
  collection.schema.removeField("oopuchwg")

  // remove
  collection.schema.removeField("y5tavinx")

  // remove
  collection.schema.removeField("zrslvndk")

  // remove
  collection.schema.removeField("pbbgmm7u")

  // remove
  collection.schema.removeField("jx7bkwly")

  // remove
  collection.schema.removeField("xkca4cgz")

  // remove
  collection.schema.removeField("drhpimg0")

  // remove
  collection.schema.removeField("ddgnrsay")

  return dao.saveCollection(collection)
})
