# CHIYO TEST - SESSION MANAGEMENT API

## Steps to run the API service

### With Docker (recommended)

1 - Build the image

```bash
docker build . -t chiyo
```

2 - Create and run the container for the image (use other local port if required). See docker documentation in port forwarding if needed.

```bash
docker run -p 3000:3000 chiyo
```

3 - Open Swagger to visualize the endpoint collection running in docker 🚀

http://localhost:3000/api-docs/

That's it!

---

### NodeJs Local development

1 - Make sure you have at least NodeJs 18 version (uses native fetch) and NPM package manager

2 - Install packages

```bash
npm install
```

3 - Start the app

```bash
npm start
```

4 - Open Swagger to visualize the endpoint collection running in docker 🚀

http://localhost:3000/api-docs/

### You will need 3 environment variables that you'd need to place in a .env file (for simplicity, I've commited such .env file, in a real scenario .env is not versioned)

- SERVER_PORT (port to run the application)
- AIRTABLE_BASE_URL (full base url to connect to AirTable)
- AIRTABLE_ACCESS_TOKEN (AirTable access token (with write permissions))

---

## Extras

Run test suite with code coverage check

```bash
npm run test
```

Prettify code

```bash
npm run prettier:fix
```

---

## Application structure

This service contains two endpoints:

"/ping"

Internally is hooked to a session storage middleware. This service creates a session record into AirTable. If successful, returns the insertion id with HTTP code 201. Otherwise, will throw either 400 or 500 HTTP codes (see swagger documentation for schemas and api responses.)

"/session"

Pulls all records from the session table in AirTable.

Third Party services errors (AirTable API) are not sent back to the requesting user for safety reasons. The error stack is stored in the logs only.

Code follows a functional programming pattern with DI for the AirTable dependency. Easy to change storage technology in the future if required.
