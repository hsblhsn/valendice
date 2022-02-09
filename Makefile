all: build lint test

dependencies:
	@npm ci

build:
	@npm run build

preview:
	@npm run preview

run:
	@npm run dev

lint:
	@npm run lint

test:
	@echo "placeholder testing..."

docker-build:
	@docker build --tag $(TAG) .

docker-dryrun:
	@docker run $(TAG) dryrun