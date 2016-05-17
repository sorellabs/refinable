help:
	@echo ""
	@echo "AVAILABLE TASKS"
	@echo ""
	@echo "  compile ................ Compiles the project."
	@echo "  clean .................. Removes build artifacts."
	@echo "  test ................... Runs the tests for the project."
	@echo "  test-watch ............. Runs the tests on every change."
	@echo "  lint ................... Lints all source files."
	@echo "  documentation .......... Generates static API documentation."
	@echo ""


# ----------------------------------------------------------------------
bin    := $(shell npm bin)
babel  := $(bin)/babel
eslint := $(bin)/eslint
mocha  := $(bin)/mocha


# -- [ TASKS ] ---------------------------------------------------------
.PHONY: help compile compile-test clean test lint test-watch

node_modules: package.json
	npm install

compile:
	$(babel) src --source-map inline \
	             --out-dir    lib \
	             $(BABEL_OPTIONS)

compile-test:
	$(babel) test/src --source-map inline \
	                  --out-dir    test/spec \
	                  $(BABEL_OPTIONS)

clean:
	rm -rf lib test/spec

test: compile compile-test
	$(mocha) test/spec --reporter spec \
	                   --ui       bdd

test-watch: compile compile-test
	BABEL_OPTIONS=--watch $(MAKE) compile &
	BABEL_OPTIONS=--watch $(MAKE) compile-test &
	$(mocha) test/spec --reporter min \
	                   --ui       bdd \
	                   --watch

lint:
	$(eslint) src

documentation: compile
	node tools/generate-docs.js
