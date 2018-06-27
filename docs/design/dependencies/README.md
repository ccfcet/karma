# Dependencies

Aimed at explaining dependencies mentioned in /src/package.json(root module)

## dependencies

1. authentication : Module handling code related to authentication of users.
2. cookie-parser : Recommended usage(express-generator 4.16.0).
3. cors : Node.js CORS middleware. [See on GitHub](
  https://github.com/expressjs/cors).
4. data : Module handling code related to data including models and its suitable
methods.
5. debug : Recommended usage(express-generator 4.16.0).
6. express : express
7. http-errors: Recommended usage(express-generator 4.16.0).
8. helmet : Helmet helps you secure your Express apps by setting various HTTP
headers. Refer https://expressjs.com/en/advanced/best-practice-security.html
9. lodash : A modern JavaScript utility library delivering modularity,
performance & extras. Used in routes. Test for performance. Switch to native if
suitable.
10. morgan : Recommended usage(express-generator 4.16.0).

## devDependencies

1. chai : Assertion library for tests.
2. chai-http : HTTP integration testing with Chai assertions.
3. eslint : Javascript linter run during development. Initialized during ``npm
run dev``. Starts based on nodemon events. See /src/nodemon.json.
4. eslint-config-airbnb-base : Package providing Airbnb's base JS .eslintrc
(without React plugins) as an extensible shared config. Used for complying with
Airbnb Javascript Style.
5. eslint-friendly-formatter : To format output of eslint to a more friendly
manner. See https://github.com/royriojas/eslint-friendly-formatter.
6. eslint-plugin-import : Peer dependency of eslint.
7. mocha : JavaScript test framework. See https://mochajs.org/.
