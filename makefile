run:
	docker compose build web api
	docker compose up web api db --abort-on-container-exit

test-api:
	docker compose -f api/docker-compose.tests.yml build api-tests
	docker compose -f api/docker-compose.tests.yml up api-tests db-tests --abort-on-container-exit

test-web:
	docker compose -f web/docker-compose.tests.yml build web-tests
	docker compose -f web/docker-compose.tests.yml up db-tests api-tests web-tests --abort-on-container-exit
