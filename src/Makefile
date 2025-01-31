include .env
export $(shell sed 's/=.*//' .env)

HELP_FORMAT = "\033[36m%-20s\033[0m %s\n"

APP_NAME = uniton-connect_api-server

DOCKER_IMAGE = $(APP_NAME):$(VERSION)
DOCKER_CONTAINER = $(APP_NAME)_container

VERSION = 0.3.0

.PHONY: help build run run-detached stop restart clear logs logs-realtime

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
	@echo "Available commands:"
	@printf $(HELP_FORMAT) "build" "Build the Docker image"
	@printf $(HELP_FORMAT) "run" "Start the Docker container"
	@printf $(HELP_FORMAT) "stop" "Stopping the Docker container"
	@printf $(HELP_FORMAT) "restart" "Restart the Docker container"
	@printf $(HELP_FORMAT) "clean" "Deleting the Docker image"
	@printf $(HELP_FORMAT) "logs" "View the Docker container logs"