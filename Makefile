install:
	npm ci

gendiff:
	node bin/gendiff.js

gendiff-start:
	node bin/gendiff.js __fixtures__/file1.json __fixtures__/file2.json

test:
	NODE_OPTIONS=--experimental-vm-modules npx jest

test-coverage:
	npm test -- --coverage --coverageProvider=v8

lint:
	npx eslint .

publish:
	npm publish --dry-run
