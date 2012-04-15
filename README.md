Shortcut.js
======

Simple shortcuts for your HTML elements. Works by triggering a click event on the targeted node; usually on anchor (i.e. "a") tags but works on any.

Getting Started
---------------

NOTE: Pretty much unusable right now as I need to add the rest of the key codes and normalize the events.

### Via Markup

``` html
<a href="/some-url" data-shortcut="ctrl+a">Some Url></a>
```

### Via JavaScript

``` javascript
var element = document.getElementById('foo');
var shortcut = new Shortcut(element, 'ctrl+a');
```

License
------------

MIT Licensed
http://www.opensource.org/licenses/mit-license.php