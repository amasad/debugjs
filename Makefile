browserify:
	@echo browserifying
	@browserify -s debugjs -t brfs index.js > dist/bundle.js

runtime:
	@echo building runtime
	@bin/transform -x ./runtime/source/array.js > ./runtime/compiled/array.js

.PHONY: runtime
