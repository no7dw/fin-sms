TESTS = $(shell find test -type f -name "*test.js")

test:
	RUN_TEST=1 ./node_modules/.bin/mocha 	$(TESTS)

.PHONY:  test 
