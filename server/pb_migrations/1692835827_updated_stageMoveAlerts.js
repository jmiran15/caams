migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("zvvzw1bq5h7iztb")

  collection.options = {
    "query": "SELECT \n  (ROW_NUMBER() OVER()) as id,\n  SM.job as job,\n  U.firstName as movedByFirstName,\n  U.lastName as movedByLastName,\n  UA.firstName as applicantFirstName,\n  UA.lastName as applicantLastName,\n  FS.label as fromStageLabel,\n  TS.label as toStageLabel,\n  SM.created AS date,\n  SM.application AS applicationId,\n  SM.seenBy\nFROM \n  stageMoves SM\nINNER JOIN user U ON SM.movedBy = U.id \nINNER JOIN application A ON SM.application = A.id\nINNER JOIN user UA ON A.user = UA.id\nINNER JOIN stage FS ON SM.fromStage = FS.id\nINNER JOIN stage TS ON SM.toStage = TS.id;"
  }

  // remove
  collection.schema.removeField("toqvibgw")

  // remove
  collection.schema.removeField("kxesqptm")

  // remove
  collection.schema.removeField("f1l7p98q")

  // remove
  collection.schema.removeField("12cojfbw")

  // remove
  collection.schema.removeField("fqjdgohu")

  // remove
  collection.schema.removeField("fangljgz")

  // remove
  collection.schema.removeField("0soaqdug")

  // remove
  collection.schema.removeField("i4kvwix2")

  // remove
  collection.schema.removeField("zggtunhf")

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

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("zvvzw1bq5h7iztb")

  collection.options = {
    "query": "SELECT \n  (ROW_NUMBER() OVER()) as id,\n  U.firstName as movedByFirstName,\n  U.lastName as movedByLastName,\n  UA.firstName as applicantFirstName,\n  UA.lastName as applicantLastName,\n  FS.label as fromStageLabel,\n  TS.label as toStageLabel,\n  SM.created AS date,\n  SM.application AS applicationId,\n  SM.seenBy\nFROM \n  stageMoves SM\nINNER JOIN user U ON SM.movedBy = U.id \nINNER JOIN application A ON SM.application = A.id\nINNER JOIN user UA ON A.user = UA.id\nINNER JOIN stage FS ON SM.fromStage = FS.id\nINNER JOIN stage TS ON SM.toStage = TS.id;"
  }

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "toqvibgw",
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
    "id": "kxesqptm",
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
    "id": "f1l7p98q",
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
    "id": "12cojfbw",
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
    "id": "fqjdgohu",
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
    "id": "fangljgz",
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
    "id": "0soaqdug",
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
    "id": "i4kvwix2",
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
    "id": "zggtunhf",
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

  return dao.saveCollection(collection)
})
