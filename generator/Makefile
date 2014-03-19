

build: giffify

frames: clean
	node lib/parse-attendees.js > data/bin/attendees.json
	phantomjs lib/index.js

giffify: frames
	node lib/giffify.js

clean:
	rm -r data/bin/*
	rm -r output/*

.PHONY: build giffify frames clean