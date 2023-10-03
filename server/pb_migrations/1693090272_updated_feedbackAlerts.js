migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("4b4v4jk21tbny27")

  collection.options = {
    "query": "SELECT \n  (ROW_NUMBER() OVER()) as id,\n  U.firstName as employerFirstName,\n  U.lastName as employerLastName,\n  U.id as createdBy,\n  UA.firstName as applicantFirstName,\n  UA.lastName as applicantLastName,\n  S.job as job,\n  F.created AS date,\n  F.application AS applicationId,\n  F.seenBy\nFROM \n  feedback F\nINNER JOIN user U ON F.employer = U.id \nINNER JOIN application A ON F.application = A.id\nINNER JOIN stage S ON A.stage = S.id\nINNER JOIN user UA ON A.user = UA.id;"
  }

  // remove
  collection.schema.removeField("bcgwmhxu")

  // remove
  collection.schema.removeField("2yzvyqnu")

  // remove
  collection.schema.removeField("ll70y2yq")

  // remove
  collection.schema.removeField("lac2ywu2")

  // remove
  collection.schema.removeField("jttbjo0k")

  // remove
  collection.schema.removeField("o4bqo4hj")

  // remove
  collection.schema.removeField("33u70nkl")

  // remove
  collection.schema.removeField("xz82upgd")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "7jadqnw9",
    "name": "employerFirstName",
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
    "id": "n9kdqysf",
    "name": "employerLastName",
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
    "id": "hwxa8r84",
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
    "id": "lvtnzkex",
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
    "id": "m7db3ing",
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
    "id": "8ydtqt8p",
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
    "id": "qlgfqqbi",
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
    "id": "01z4zvzx",
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
    "id": "cloyhn7v",
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
  const collection = dao.findCollectionByNameOrId("4b4v4jk21tbny27")

  collection.options = {
    "query": "SELECT \n  (ROW_NUMBER() OVER()) as id,\n  U.firstName as employerFirstName,\n  U.lastName as employerLastName,\n  UA.firstName as applicantFirstName,\n  UA.lastName as applicantLastName,\n  S.job as job,\n  F.created AS date,\n  F.application AS applicationId,\n  F.seenBy\nFROM \n  feedback F\nINNER JOIN user U ON F.employer = U.id \nINNER JOIN application A ON F.application = A.id\nINNER JOIN stage S ON A.stage = S.id\nINNER JOIN user UA ON A.user = UA.id;"
  }

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "bcgwmhxu",
    "name": "employerFirstName",
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
    "id": "2yzvyqnu",
    "name": "employerLastName",
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
    "id": "ll70y2yq",
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
    "id": "lac2ywu2",
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
    "id": "jttbjo0k",
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
    "id": "o4bqo4hj",
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
    "id": "33u70nkl",
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
    "id": "xz82upgd",
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
  collection.schema.removeField("7jadqnw9")

  // remove
  collection.schema.removeField("n9kdqysf")

  // remove
  collection.schema.removeField("hwxa8r84")

  // remove
  collection.schema.removeField("lvtnzkex")

  // remove
  collection.schema.removeField("m7db3ing")

  // remove
  collection.schema.removeField("8ydtqt8p")

  // remove
  collection.schema.removeField("qlgfqqbi")

  // remove
  collection.schema.removeField("01z4zvzx")

  // remove
  collection.schema.removeField("cloyhn7v")

  return dao.saveCollection(collection)
})
