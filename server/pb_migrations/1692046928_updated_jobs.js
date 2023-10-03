migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("a6hnfmrf186rpjz")

  // remove
  collection.schema.removeField("pc48jtmn")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "udrec8s8",
    "name": "payTo",
    "type": "number",
    "required": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "x6qhpbsy",
    "name": "otherPay",
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
    "id": "gj5b2zex",
    "name": "budget",
    "type": "number",
    "required": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "t7rvqx8v",
    "name": "locationState",
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
    "id": "nln4r5yc",
    "name": "locationCity",
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
    "id": "rojdtsec",
    "name": "isRemote",
    "type": "bool",
    "required": false,
    "unique": false,
    "options": {}
  }))

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "v0xb4n9s",
    "name": "payFrom",
    "type": "number",
    "required": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null
    }
  }))

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "fb808i0a",
    "name": "isTemplate",
    "type": "bool",
    "required": false,
    "unique": false,
    "options": {}
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("a6hnfmrf186rpjz")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "pc48jtmn",
    "name": "duration",
    "type": "text",
    "required": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  // remove
  collection.schema.removeField("udrec8s8")

  // remove
  collection.schema.removeField("x6qhpbsy")

  // remove
  collection.schema.removeField("gj5b2zex")

  // remove
  collection.schema.removeField("t7rvqx8v")

  // remove
  collection.schema.removeField("nln4r5yc")

  // remove
  collection.schema.removeField("rojdtsec")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "v0xb4n9s",
    "name": "pay",
    "type": "number",
    "required": false,
    "unique": false,
    "options": {
      "min": 0,
      "max": 100
    }
  }))

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "fb808i0a",
    "name": "template",
    "type": "bool",
    "required": false,
    "unique": false,
    "options": {}
  }))

  return dao.saveCollection(collection)
})
