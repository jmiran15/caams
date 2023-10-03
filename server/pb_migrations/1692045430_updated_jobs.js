migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("a6hnfmrf186rpjz")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "o0mxua57",
    "name": "category",
    "type": "select",
    "required": true,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "values": [
        "engineering",
        "research",
        "other"
      ]
    }
  }))

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "cqzm2ecy",
    "name": "skills",
    "type": "select",
    "required": false,
    "unique": false,
    "options": {
      "maxSelect": 10,
      "values": [
        "java",
        "cpp",
        "c",
        "docker",
        "python",
        "javascript",
        "html",
        "css",
        "node.js",
        "react",
        "swift",
        "kotlin",
        "golang",
        "sql",
        "aws",
        "azure",
        "git",
        "machine learning",
        "tensorflow",
        "data analysis"
      ]
    }
  }))

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "rb4g8umh",
    "name": "experience",
    "type": "select",
    "required": false,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "values": [
        "no experience",
        "intermediate",
        "senior level"
      ]
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("a6hnfmrf186rpjz")

  // remove
  collection.schema.removeField("o0mxua57")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "cqzm2ecy",
    "name": "desiredSkills",
    "type": "select",
    "required": false,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "values": [
        "java",
        "cpp",
        "c",
        "docker",
        "python",
        "javascript",
        "html",
        "css",
        "node.js",
        "react",
        "swift",
        "kotlin",
        "golang",
        "sql",
        "aws",
        "azure",
        "git",
        "machine learning",
        "tensorflow",
        "data analysis"
      ]
    }
  }))

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "rb4g8umh",
    "name": "experienceLevel",
    "type": "select",
    "required": false,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "values": [
        "no experience",
        "intermediate",
        "senior level"
      ]
    }
  }))

  return dao.saveCollection(collection)
})
