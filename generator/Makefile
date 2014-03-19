

build: giffify

frames: clean
	node lib/parse-attendees.js > data/bin/attendees.json
	phantomjs lib/index.js

giffify: frames
	node lib/giffify.js

clean:
	rm -rf data/bin/*
	rm -rf output/*

.PHONY: build giffify frames clean