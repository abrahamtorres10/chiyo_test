# CHIYO TEST - SESSION MANAGEMENT API

## SUPER QUICK START WITH IMAGE IN ECR

```bash
docker run -p 3000:3000 public.ecr.aws/hpxpert/chiyo:latest
```

in new terminal to test the app (will open a browser with the HTML page with script added)

```
npm install
npm run client:run
```

in another new terminal to verify the session was stored (will pull from AirTable)

```
curl http://localhost:3000/v1/session
```

# LOCAL DEVELOPMENT & DEPLOY

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

# Verify the final product

## Make sure your API is up and running, then run the following command

```
npm run client:run
```

It will open a browser with the Test Client HTML page that will trigger a call to "/ping" service in the API that will store the session info. The javascript file client/clientSessionReader.js contains the code to perform such task. If you changed the port from the previous steps, you ought to also change the port in the javascript code, if not (runnin in port 3000) should work just fine.
