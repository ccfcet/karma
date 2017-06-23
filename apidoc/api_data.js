define({ "api": [
  {
    "type": "get",
    "url": "/",
    "title": "Test",
    "name": "Index",
    "group": "Public",
    "success": {
      "examples": [
        {
          "title": "Test Success",
          "content": "{\n  \"success\":true\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "error",
          "content": "{\n   \n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/index.js",
    "groupTitle": "Public"
  }
] });
