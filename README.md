Shortcut.js
======

Simple shortcuts for your HTML elements. Works by triggering a click event on the targeted node; usually on anchor (i.e. "a") tags but works on any.

Getting Started
---------------

NOTE: Pretty much unusable right now as I need to add the rest of the key codes and normalize the events.

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

``` javascript
// If you have a reference to the added Shortcut object can simply call .remove();
shortcut.remove();
```
OR
``` javascript
// You can alternatively pass in the Element and equal shortcut string.
Shortcut.remove(element, 'ctrl+a');
```

License
------------

MIT Licensed
http://www.opensource.org/licenses/mit-license.php