migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("sh4mzsn7l4932uz")

  collection.options = {
    "query": "SELECT \n  A.id AS id, \n  A.created as created, \n  A.updated as updated, \n  A.user as user, \n  A.stage as stage,\n  J.id as job,\n  A.status as status,\n  A.isRejected as isRejected,\n  A.seenBy as seenBy\nFROM \n  application A\nLEFT JOIN \n  stage S ON A.stage = S.id\nINNER JOIN\n  jobs J ON S.job = J.id;"
  }

  // remove
  collection.schema.removeField("fqjwvq5q")

  // remove
  collection.schema.removeField("tegqp26q")

  // remove
  collection.schema.removeField("2lu9b5jg")

  // remove
  collection.schema.removeField("3jj561ol")

  // remove
  collection.schema.removeField("4e7pul8i")

  // remove
  collection.schema.removeField("8difmdvh")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "rs0khhmi",
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
    "id": "ez8ktwjd",
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
    "id": "5delcssg",
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
    "id": "psrbrjqa",
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
    "id": "e8s2f6e3",
    "name": "isRejected",
    "type": "bool",
    "required": false,
    "unique": false,
    "options": {}
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "h9qfqemq",
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
    "query": "SELECT \n  A.id AS id, \n  A.created as created, \n  A.updated as updated, \n  A.user as user, \n  A.stage as stage,\n  J.id as job,\n  A.status as status,\n  A.isRejected as isRejected,\n  A.seenBy as seenBy\nFROM \n  application A\nINNER JOIN \n  stage S ON A.stage = S.id\nINNER JOIN\n  jobs J ON S.job = J.id;"
  }

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "fqjwvq5q",
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
    "id": "tegqp26q",
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
    "id": "2lu9b5jg",
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
    "id": "3jj561ol",
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
    "id": "4e7pul8i",
    "name": "isRejected",
    "type": "bool",
    "required": false,
    "unique": false,
    "options": {}
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "8difmdvh",
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
  collection.schema.removeField("rs0khhmi")

  // remove
  collection.schema.removeField("ez8ktwjd")

  // remove
  collection.schema.removeField("5delcssg")

  // remove
  collection.schema.removeField("psrbrjqa")

  // remove
  collection.schema.removeField("e8s2f6e3")

  // remove
  collection.schema.removeField("h9qfqemq")

  return dao.saveCollection(collection)
})
