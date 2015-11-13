# A D3 unconf badge creator 

Create a background visualization for our conference badges! How's this made possible by the awesome magic of lenticular lenses and the fine folks at [gifpop](http://gifpop.io/)


# To create your own

Make it 1050px high, by 1500px tall


You'll Need the following tools

PhantomJS

````
brew install phantomjs
````

Install MacPorts so that you can install ImageMagick     https://www.macports.org/
ImageMagick    http://www.imagemagick.org/script/convert.php
````
brew install ImageMagick
````

Uber Logo
grab the images from the Uber Press Kit
first convert an image to gif
````
convert uber_logo.gif -transparent white -fuzz 25% uber_logo3.gif
````

# Generation

First, be sure to run an http server from the root of the project, listening
on port 8888.

    http-server -p 8888

In order to generate a GIF, call the phantom.js from the console. This script captures 10 images (pngs) from a certain webpage as defined in index.html:

    cd generator
    phantomjs lib/index.js

### After generating the images we can generate the GIFs from the JPG frames.

We'll use the **convert** command which comes with Imagemagick
````
convert -loop 0 output/test-*.jpeg test.gif
````

Other stuff

# Data / Desin / Code   Icons 

Data
scribble by Michael Chanover from the Noun Project
https://thenounproject.com/search/?similar=173309&i=6590

Design
sketch
https://thenounproject.com/term/ink-mark/197297/

Painting
https://thenounproject.com/search/?q=painting&i=21583

Code
https://thenounproject.com/search/?q=coding&i=1171

### Recording a website with phantomJS and ffmpeg

http://mindthecode.com/recording-a-website-with-phantomjs-and-ffmpeg/
