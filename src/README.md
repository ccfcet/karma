# Karma
Back-end APIs software framework for colleges.

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run start-dev
```

# Setting up the server
1. Clone the repository ```git clone https://github.com/amrithm98/cet-backend/```
2. Install npm
3. Run ```npm install```
5. After install, Create a config.js file with the following content
   ```
   var config = {
      'development': {
          mysql: {
              database: 'cet',
              username: 'your SQL username',
              password: 'your SQL Password'
          },
          firebase: {
              databaseURL: "Firebase URL"
          }
      },
      'production': {
        mysql: {
              database: 'cet',
              username: 'your SQL username',
              password: 'your SQL Password'
          },
          firebase: {
              databaseURL: "Firebase URL"
          }
      }
    }
    var env = process.env.NODE_ENV || "development";
    module.exports = function(mode) {
      return config[mode || env]
    }
    ```

5. After the installation is complete, Run ```npm start```
6. In case you encounter an error, run the npm commands as ```su```
7. Create a SQL database with name 'cet'

# Using the apidoc
1. Run ```gulp doc``` and an ```apidoc/``` folder will be created
2. Go to that folder and open ```index.html``` and access the apidoc

# Immediate Action Required
1. Check if all the code is correct and fit for execution in the nodejs environment.(asynchronous nature)
