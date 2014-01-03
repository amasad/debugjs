browserify:
	@echo browserifying
	@browserify -t brfs index.js > dist/bundle.js

runtime:
	@echo building runtime
	@bin/transform ./runtime/source/array.js -x ./runtime/compiled/array.js

.PHONY: runtime
