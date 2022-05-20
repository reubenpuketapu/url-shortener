run:
	docker compose build web 
	docker compose up web 

test-api:
	docker compose -f api/docker-compose.tests.yml build api-tests
	docker compose -f api/docker-compose.tests.yml up api-tests