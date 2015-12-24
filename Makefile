BIN=./node_modules/.bin

all: dist dist/app.js dist/index.html

dist:
	mkdir dist

dist/app.js: $(shell find frontend/js/ -type f)
	$(BIN)/webpack --config webpack-config.js

dist/index.html: frontend/index.jade
	$(BIN)/jade --out dist frontend/index.jade 