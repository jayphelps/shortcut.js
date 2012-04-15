Shortcut.js
======

Simple shortcuts for your HTML elements. Triggers a click event on the targeted element; usually on anchor (i.e. "a") tags but works on any.

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

If you have a reference to the added Shortcut object can simply call .remove();

``` javascript
shortcut.remove();
```
Alternatively, you can pass in the Element and shortcut string.

``` javascript
Shortcut.remove(element, 'ctrl+a');
```

License
------------

MIT Licensed
http://www.opensource.org/licenses/mit-license.php