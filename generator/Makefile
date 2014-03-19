

build: giffify

frames: clean
	node lib/parse-attendees.js > data/bin/attendees.json
	phantomjs lib/index.js

giffify: frames samples
	node lib/giffify.js

clean:
	rm -rf data/bin/*
	rm -rf output/*
	rm -rf samples/*

samples:
	mkdir -p samples
	find output -name *-small.gif -exec cp {} ./samples/ \;

.PHONY: build giffify frames clean samples