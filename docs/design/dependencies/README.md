# Dependencies

Aimed at explaining dependencies mentioned in /src/package.json(root module)

## dependencies
1. authentication : Module handling code related to authentication of users.
2. celebrate : celebrate is an express middleware function that wraps the joi validation library. (***Should we just use joi?***)
3. cookie-parser : Recommended usage(express-generator 4.16.0).
4. cors : Node.js CORS middleware. See https://github.com/expressjs/cors .
5. data : Module handling code related to data including models and its suitable
methods.
6. debug : Recommended usage(express-generator 4.16.0).
7. express : express
8. helmet : Helmet helps you secure your Express apps by setting various HTTP
headers. Refer https://expressjs.com/en/advanced/best-practice-security.html .
9. http-errors: Recommended usage(express-generator 4.16.0).
10. lodash : A modern JavaScript utility library delivering modularity,
performance & extras. Used in routes. Test for performance. Switch to native if
suitable.
11. morgan : Recommended usage(express-generator 4.16.0).

## devDependencies

1. apidoc : apiDoc creates documentation from API descriptions included in the source code(/src/routes).
2. chai : Assertion library for tests.
3. chai-exclude : Exclude keys to compare from a deep equal operation with chai expect or assert.
4. chai-http : HTTP integration testing with Chai assertions.
5. coveralls : Package enabling test coverage reporting to https://coveralls.io/ . See https://www.npmjs.com/package/coveralls .
6. eslint : Javascript linter run during development. Initialized during ``npm
run dev``. Starts based on nodemon events. See /src/nodemon.json.
7. eslint-config-airbnb-base : Package providing Airbnb's base JS .eslintrc
(without React plugins) as an extensible shared config. Used for complying with
Airbnb Javascript Style.
8. eslint-friendly-formatter : To format output of eslint to a more friendly
manner. See https://github.com/royriojas/eslint-friendly-formatter.
9. eslint-plugin-import : Peer dependency of eslint.
10. mocha : JavaScript test framework. See https://mochajs.org/.
11. nyc : Istanbul's state of the art command line interface. Refer https://istanbul.js.org/ .
