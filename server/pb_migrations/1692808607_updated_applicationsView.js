migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("sh4mzsn7l4932uz")

  collection.options = {
    "query": "SELECT \n  A.id AS id, \n  A.created as created, \n  A.updated as updated, \n  A.user as user, \n  A.stage as stage,\n  J.id as job,\n  A.status as status,\n  A.isRejected as isRejected,\n  A.seenBy as seenBy\nFROM \n  application A\nINNER JOIN \n  stage S ON A.stage = S.id\nINNER JOIN\n  jobs J ON S.job = J.id;"
  }

  // remove
  collection.schema.removeField("nj2jccah")

  // remove
  collection.schema.removeField("9q5majac")

  // remove
  collection.schema.removeField("fqa0xovj")

  // remove
  collection.schema.removeField("dr2bpto9")

  // remove
  collection.schema.removeField("aowin0d8")

  // remove
  collection.schema.removeField("lpkxnwx7")

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

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("sh4mzsn7l4932uz")

  collection.options = {
    "query": "SELECT \n  A.id AS id, \n  A.created as created, \n  A.updated as updated, \n  A.user as user, \n  A.stage as stage,\n  J.id as job,\n  A.status as status,\n  A.isRejected as isRejected,\n  A.seenBy as seenBy\nFROM \n  application A\nLEFT JOIN \n  stage S ON A.stage = S.id\nINNER JOIN\n  jobs J ON S.job = J.id;"
  }

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "nj2jccah",
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
    "id": "9q5majac",
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
    "id": "fqa0xovj",
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
    "id": "dr2bpto9",
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
    "id": "aowin0d8",
    "name": "isRejected",
    "type": "bool",
    "required": false,
    "unique": false,
    "options": {}
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "lpkxnwx7",
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

  return dao.saveCollection(collection)
})
