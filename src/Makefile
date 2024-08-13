include .env
export $(shell sed 's/=.*//' .env)

DOCKER_IMAGE = $(APP_NAME):$(VERSION)
DOCKER_CONTAINER = $(APP_NAME)_container

VERSION = 0.2.8

build:
	docker build -t $(DOCKER_IMAGE) .

run: build
	docker run -d --env-file .env -p $(PORT):$(PORT) --name $(DOCKER_CONTAINER) $(DOCKER_IMAGE)

stop:
	docker stop $(DOCKER_CONTAINER) || true
	docker rm $(DOCKER_CONTAINER) || true

restart: clean run

clean: stop
	docker rmi $(DOCKER_IMAGE)

logs:
	docker logs -f $(DOCKER_CONTAINER)

help:
	@echo "Usage:"
	@echo " make build - Build the Docker image"
	@echo " make run - Start the Docker container"
	@echo " make stop - Stopping the Docker container."
	@echo " make restart - Restart the Docker container" @echo " make restart - Restart the Docker container"
	@echo " make logs - View the Docker container logs"
	@echo " make clean - Deleting the Docker image"