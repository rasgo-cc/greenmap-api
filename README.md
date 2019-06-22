# GreenMap API

## Environment Variables

```
POSTGRES_DB=greenmap
POSTGRES_USER=postgres
POSTGRES_PASSWORD=<pass>
DB_CONNSTR=<connstr>
```

See `config.js` for other environment variables that might be used.

## Migrations & Seeding

```
npm i -g knex
npm i -g jake

knex migrate:latest
jake -f tasks/places.js seed
```

## Development

```
docker-compose up postgis

yarn dev
```

Open [localhost:8080]()

## Production

```
docker-compose up
```

## Documentation

Available at `/swagger`
