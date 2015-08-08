TESTS = $(shell find test -type f -name "*test.js")

test:
	PROD=0 ./node_modules/.bin/mocha 	$(TESTS)

.PHONY:  test 
