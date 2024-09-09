install:
	npm ci

gendiff:
	node bin/gendiff.js

gendiff-start-json:
	node bin/gendiff.js __fixtures__/file3.json __fixtures__/file4.json

gendiff-start-yml:
	node bin/gendiff.js __fixtures__/file3.yml __fixtures__/file4.yml

gendiff-start-format-plain:
	node bin/gendiff.js --format plain __fixtures__/file3.json __fixtures__/file4.json

gendiff-start-format-json:
	node bin/gendiff.js --format json __fixtures__/file3.json __fixtures__/file4.json


test:
	NODE_OPTIONS=--experimental-vm-modules npx jest

test-coverage:
	npm test -- --coverage --coverageProvider=v8

lint:
	npx eslint .

publish:
	npm publish --dry-run
