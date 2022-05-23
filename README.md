# Url Shortener by Reuben Puketapu - submission for PrimaryBid Tech Test

## Scope

- A user needs to be able to enter a URL and they will get an 8 character (lowercase-alphanumeric) shortened version of the URL. URLs are shortened and persisted into MongoDB via a REST or GraphQL API.
- The frontend app will display a list of previously shortened URLs.
- New URLs will be generated and added to the frontend list.
- The same 8-characters cannot be used twice i.e. each shortened URL needs to be unique. The URLs need to be shortened with the following domain 'pbid.io' e.g. https://pbid.io/f3x2ab1c The shortened URL do not need to actually redirect/work as the domain doesn’t exist.
- The entire system needs to be runnable using Docker, a simple compose file will do. Appropriate tests should be added to the code, using the jest framework.
- The app layout should be responsive.
- Add a root README.md describing what the application is, and how to run it.


## Scope complete
- All apart from `The app layout should be responsive. This wasn't fully complete`
- You can add a new url using the input field and then it will be displayed above the input field and persisted to MongoDb

## How to run

- `make run` to start the full application running in docker containers. Access http://localhost:3000 for the UI.
- `make test-api` to run the test suite against the api
- `make test-web` to run the test suite against the web app + api

n.b. feature tests for both api + web will only pass when run using docker-compose. `yarn test` in each project will throw exceptions for feature tests because the integrations aren't mocked.

## Discussion

Assumptions:
- assume that there can be multiple entries for the same url being shortened e.g. https://google.com can have multiple shortened sites
- assume that there should be an error when trying to add an invalid url

Shortcuts:
- not much in terms of frontend design, I struggle to design things without any inspiration / design proposals
- no retries in failures / error handling if non-success codes for requests to the backend
- should use env variable for api url, just passed as prop for now
- frontend code is pretty small and quickly put together as there is such low functionality
- CORS setup to allow any origin at the moment (that should be removed)
- no error handling in the backend for failures to the db
- if the app loses connection to the db, there's no retries to reconnect
- uniqueness of shorted url is only enforced by the db and the backend could have a collision (no retries)