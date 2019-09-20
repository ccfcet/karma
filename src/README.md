# Karma
Back-end API framework for colleges.

### Setup
1. Clone the repository
```bash
git clone https://github.com/ccfcet/karma
```
2. Install node, npm and nodemon globally.
3. Run
```bash
npm install
```
4. Rename ```config.example.json``` file inside ```./lib/data/config/``` to ```config.json``` and fill the database information whilst creating the necessary databases on your MySQL server.

5. In case you get an error like ```npm ERR! Failed at the argon2@0.19.3 install script```, install ```build-tools``` for your system.
### Usage
```bash
# install dependencies (development)
npm install

# install dependencies (production)
npm install --production

# serve with live reload at localhost:3000 (development)
# includes nodemon and eslint
npm run dev

# serve in a production environment
npm start

# run eslint
npm run lint

# run eslint with --fix flag
npm run lint--fix
```

#### Generating docs using the apidoc
1. Run ```grunt apidoc``` and an ```apidoc/``` folder will be created inside ```docs``` folder in the project's root.
2. Go to that folder and open ```index.html``` and access the API documentation.

## Contributions
Contributions are always welcome. Please take notice of the LICENSE and NOTICE files. Any commit to the repository implies you agree with the conditions specified in the files.

### Pending Works

#### Security
Enabling CORS securely.
