migrate((db) => {
  const collection = new Collection({
    "id": "2ybnf5emha3akz5",
    "created": "2023-08-18 17:33:25.002Z",
    "updated": "2023-08-18 17:33:25.002Z",
    "name": "test2",
    "type": "view",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "lnr6vvop",
        "name": "username",
        "type": "text",
        "required": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "ls6963mt",
        "name": "verified",
        "type": "bool",
        "required": false,
        "unique": false,
        "options": {}
      },
      {
        "system": false,
        "id": "tw4v2bzi",
        "name": "emailVisibility",
        "type": "bool",
        "required": false,
        "unique": false,
        "options": {}
      },
      {
        "system": false,
        "id": "azyhp2nj",
        "name": "email",
        "type": "email",
        "required": false,
        "unique": false,
        "options": {
          "exceptDomains": null,
          "onlyDomains": null
        }
      },
      {
        "system": false,
        "id": "klfrrde3",
        "name": "avatar",
        "type": "file",
        "required": false,
        "unique": false,
        "options": {
          "maxSelect": 1,
          "maxSize": 5242880,
          "mimeTypes": [
            "image/jpeg",
            "image/png",
            "image/svg+xml",
            "image/gif",
            "image/webp"
          ],
          "thumbs": null,
          "protected": false
        }
      },
      {
        "system": false,
        "id": "qiwzcomh",
        "name": "firstName",
        "type": "text",
        "required": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "qxuittnp",
        "name": "lastName",
        "type": "text",
        "required": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "ebpptu1c",
        "name": "visible",
        "type": "bool",
        "required": false,
        "unique": false,
        "options": {}
      },
      {
        "system": false,
        "id": "deersjjk",
        "name": "linkedin",
        "type": "url",
        "required": false,
        "unique": false,
        "options": {
          "exceptDomains": null,
          "onlyDomains": null
        }
      },
      {
        "system": false,
        "id": "5bjx11oj",
        "name": "github",
        "type": "url",
        "required": false,
        "unique": false,
        "options": {
          "exceptDomains": null,
          "onlyDomains": null
        }
      },
      {
        "system": false,
        "id": "ohepnglf",
        "name": "location",
        "type": "text",
        "required": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "h20dk0gh",
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
      },
      {
        "system": false,
        "id": "brwmaamo",
        "name": "deleted",
        "type": "bool",
        "required": false,
        "unique": false,
        "options": {}
      },
      {
        "system": false,
        "id": "rxm1vlur",
        "name": "educations",
        "type": "json",
        "required": false,
        "unique": false,
        "options": {}
      },
      {
        "system": false,
        "id": "2yo4ee72",
        "name": "experiences",
        "type": "json",
        "required": false,
        "unique": false,
        "options": {}
      }
    ],
    "indexes": [],
    "listRule": null,
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {
      "query": "SELECT \n    U.id, \n    U.username,\n    U.verified,\n    U.emailVisibility,\n    U.email,\n    U.avatar,\n    U.firstName,\n    U.lastName,\n    U.visible,\n    U.linkedin,\n    U.github,\n    U.location,\n    U.skills,\n    U.deleted,\n    GROUP_CONCAT(DISTINCT E.id || '|' || E.school || '|' || E.field || '|' || E.degree || '|' || E.`from` || '|' || E.`to`) AS educations,\n    GROUP_CONCAT(DISTINCT X.id || '|' || X.title || '|' || X.employer || '|' || X.location || '|' || X.current || '|' || X.`from` || '|' || X.`to` || '|' || X.summary) AS experiences\nFROM user U\nLEFT JOIN education E ON U.id = E.user\nLEFT JOIN experience X ON U.id = X.user\nGROUP BY U.id;"
    }
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("2ybnf5emha3akz5");

  return dao.deleteCollection(collection);
})
