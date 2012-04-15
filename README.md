Shortcut.js
======

Add keyboard shortcuts for your HTML elements. Triggers a click event on the targeted element; usually on anchor (i.e. "a") tags but works on any.

Getting Started
---------------

### Add through markup

``` html
<a href="/some-url" data-shortcut="ctrl+a">Some Url></a>
```

### Add through JavaScript

``` javascript
var element = document.getElementById('foo');
var shortcut = Shortcut.add(element, 'ctrl+a');
```

### Remove through JavaScript

If you have a reference to the added Shortcut object can simply call .remove();

``` javascript
shortcut.remove();
```
Alternatively, you can call .remove() on the global Shortcut object, passing in the element node and shortcut string.

``` javascript
Shortcut.remove(element, 'ctrl+a');
```

### Compatibility

* Not all keys are implemented yet and certain browser quirks aren't normalized. This is on my todo.

* Although it doesn't require jQuery, Shortcut.js currently attempts to auto-initialize itself using jQuery's DOM Ready helper. If not available, it falls back to DOMContentLoaded or window onload for older IE.

License
------------

MIT Licensed
http://www.opensource.org/licenses/mit-license.php