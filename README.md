

# A D3 unconf badge creator based on work by @vicapow : https://github.com/visfest/badges

Create a background visualization for our conference badges! How's this made possible by the awesome magic of lenticular lenses and the fine folks at [gifpop](http://gifpop.io/)


# To create your own

Make it 1050px high, by 1500px tall


You'll Need the following tools
PhantomJS

Install MacPorts so that you can install ImageMagick     https://www.macports.org/
ImageMagick    http://www.imagemagick.org/script/convert.php
````
sudo port install ImageMagick
````

Uber Logo
grab the images from the Uber Press Kit
first convert an image to gif
````
convert uber_logo.gif -transparent white -fuzz 25% uber_logo3.gif
````

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


# Generation
### In order to generate a GIF first call the phantom.js from the console. This scripts
captures 10 images (JPGs) from a certain webpage as defined in index.html:
````
phantomjs lib/index.js
````
### After generating the JPGs we generate the actual GIF from the JPG frames.
We use the **convert** command which comes with Imagemagick
````
convert -loop 0 output/test-*.jpeg test.gif
````


Other stuff

### RECORDING A WEBSITE WITH PHANTOMJS AND FFMPEG
http://mindthecode.com/recording-a-website-with-phantomjs-and-ffmpeg/
