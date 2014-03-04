

# A D3 unconf badge creator

Create a background visualization for our conference badges! How's this made possible by the awesome magic of lenticular lenses and the fine folks at [gifpop](http://gifpop.io/)


# To create your own

Make it 1050px high, by 1500px tall

````javascript
  var width = 1050, height = 1500
````

Give it a "step" function that the gif creator can call before each frame

````javascript
  window.step = function(){
    // the gif creator will call this function for each new frame.
    // right after calling "step()" it will then take a screenshot of your
    // visualization. it will do this 10 times, once for each frame.
    // note: the gif creator is in charge of calling this function so you should
    // not call it `step()` in your code! :)
    context.drawImage(shibe, ...)
  }
````

Lastly, set `is_ready` property on the window to `true` whenever your visualization is initialized and has all its data.

````javascript
  // do some stuff, load some files...
  window.is_ready = true // indicates your animation is loaded and ready
````

here's a simple example of of this:

````javascript
  d3.csv('stuff.csv', function(err, data){
    window.is_ready = true
  })
````

To test what your visualization looks like under the badge text, use the following url:

[http://visfest.github.io/badges/index.html#b4/index.html](http://visfest.github.io/badges/index.html#b4/index.html)

where `b4/index.html` would instead be your new visualization.

then, at that page, pull up the console and call "step()" to advance the animation.