browserify:
	@echo browserifying
	@browserify -t brfs index.js > dist/bundle.js
