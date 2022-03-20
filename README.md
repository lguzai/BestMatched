# Getting Started with BestMatched [BestMatched](https://github.com/lguzai/BestMatched)
This project will filter and provide restaurants near the office for employees to use

## Requirements

- Docker `v20.10.11`
- NVM or NodeJS `v16.14.0`
- Yarn `v1.22.17`
- Knex `v1.0.4`

## Pre Configuration

### Create Environment File

```bash
cp .env.example .env
```

## Local Setup

### 1 - Install Dependencies

```bash
npm install knex -g;

npm install;
```

For some cases it will be necessary:

```bash
npm install knex -g;
```

### 2 - Start Database

```bash
docker compose up -d;
```

**Additional - Tear Down Database**

```bash
docker compose down --remove-orphans -v;
```

### 3 - Run Migrations

```bash
knex migrate:latest;
```

### 4 - Run Seed (Based on CSV)

```bash
knex seed:run;
```

## Postman

Note: There is a postman collection available in the folder postman in the root of the project with some example calls

## Available Scripts

In the project directory, you can run:

### `npm run dev`

To start the app in dev mode.\
Open [http://localhost:5001](http://localhost:5001) to view it in the browser.

The current main feature of the project is accessible through : [http://localhost:5001/restaurants/getBestMatch](http://localhost:5001/restaurants/getBestMatch)

### `npm start`

For production mode

### `npm run test`

Run the unit test cases.
