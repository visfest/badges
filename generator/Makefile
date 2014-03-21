

build: samples

frames: clean
	node lib/parse-attendees.js > data/bin/attendees.json
	phantomjs lib/index.js

giffify: frames
	node lib/giffify.js

clean:
	rm -rf data/bin/*
	rm -rf output/*
	rm -rf samples/*

samples: giffify
	mkdir -p samples
	find output -name *-small.gif -exec cp {} ./samples/ \;


blanks:
	for file in `ls ../badges`; do phantomjs lib/index.js $$file; done


.PHONY: build giffify frames clean samples blanks