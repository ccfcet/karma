# KARMA

## Installation

- Install Docker
- Clone and checkout the Project

  ```bash
  git clone https://github.com/ccfcet/karma
  cd karma
  git checkout v2
  ```

- Rename .env.sample to .env
- Configure .env file, Change the HOST_PORT if you already have PSQL installed.
- Spin up the Docker containers

  ```bash
  docker-compose up
  ```

- Migrate and seed the database

  ```bash
  yarn install
  yarn migrate || npm run migrate
  npx knex seed:run
  yarn dev
  ```
