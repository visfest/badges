# Instructions

In order to generate a GIF first call the phantom.js from the console. This scripts
captures 10 images (JPGs) from a certain webpage. You can change the URL in the script!

```
phantomjs generate-gif.js
```

After generating the JPGs we generate the actual GIF from the JPG frames.

```
convert -loop 0 gif/test-*.jpg test.gif
```