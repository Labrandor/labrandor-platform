# Config
ALPINE_TAG    ?= 3.19
ALPINE_BRANCH ?= v3.19

# Pick ID that encodes Alpine branch + arch
CACHE_ID      ?= apk-cache-alpine319

# Default package set to warm (space-separated)
PACKAGES ?= apache2 php82 php82-apache2 php82-session php82-mysqli php82-pdo_mysql php82-fileinfo

# pip wheel cache + package list
PIP_CACHE_ID ?= pip-cache-alpine319
PIP_PKGS     ?= fastapi uvicorn[standard] jinja2

# Targets
.PHONY: warm-cache warm-cache-pip warm-cache-all ensure-builder

warm-cache: ensure-builder
	@echo ">> Warming APK cache '$(CACHE_ID)' for $(ALPINE_BRANCH) ($(ALPINE_TAG))"
	DOCKER_BUILDKIT=1 docker buildx build \
		--build-arg ALPINE_TAG=$(ALPINE_TAG) \
		--build-arg ALPINE_BRANCH=$(ALPINE_BRANCH) \
		--build-arg CACHE_ID=$(CACHE_ID) \
		--build-arg PACKAGES="$(PACKAGES)" \
		-f Dockerfile.cache-warmer \
		--progress=plain \
		--load \
		.

warm-cache-pip: ensure-builder
	@echo ">> Warming pip cache '$(PIP_CACHE_ID)' for $(ALPINE_BRANCH) ($(ALPINE_TAG)) [$(PIP_PKGS)]"
	DOCKER_BUILDKIT=1 docker buildx build \
		--build-arg ALPINE_TAG=$(ALPINE_TAG) \
		--build-arg ALPINE_BRANCH=$(ALPINE_BRANCH) \
		--build-arg CACHE_ID=$(CACHE_ID) \
		--build-arg PIP_CACHE_ID=$(PIP_CACHE_ID) \
		--build-arg PIP_PKGS="$(PIP_PKGS)" \
		-f Dockerfile.pip-warmer \
		--progress=plain \
		--load \
		.

warm-cache-all: warm-cache warm-cache-pip
	@echo ">> APK + pip caches warmed."

# Buildx bootstrap
ensure-builder:
	@docker buildx ls >/dev/null 2>&1 || (echo "Creating default buildx builder..." && docker buildx create --name default --driver docker-container --use)
	@docker buildx inspect --bootstrap >/dev/null 2>&1 || (echo "Creating default buildx builder..." && docker buildx create --name default --driver docker-container --use && docker buildx inspect --bootstrap >/dev/null)
	@echo ">> Using buildx builder:"
	@docker buildx ls | sed -n '1,20p'