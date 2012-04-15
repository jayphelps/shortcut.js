/**
 * Shortcut.js
 * (c) 2012 Jay Phelps
 * MIT licensed
 * https://github.com/jayphelps/shortcut.js
 */
(function (window, document) {
    "use strict";

    function addEventListener(el, eventType, callback, useCapture) {
        if (el.addEventListener) {
            el.addEventListener(eventType, callback, useCapture || false); 
        } else if (el.attachEvent)  {
            el.attachEvent('on'+eventType, callback);
        }
    }

    function removeEventListener(el, eventType, callback, useCapture) {
        if (el.removeEventListener) {
            el.removeEventListener(eventType, callback, useCapture || false); 
        } else if (el.detachEvent)  {
            el.detachEvent('on' + eventType, callback);
        }
    }

    function triggerEvent(el, event){
        if (el.fireEvent) {
            (el.fireEvent('on' + event));
        } else {
            var evObj = document.createEvent('Events');
            evObj.initEvent(event, true, false);
            el.dispatchEvent(evObj);
        }
    }

    var keyCodeTable = {
        'a': 65,
        'b': 66
    };

    function matchModifier(str) {
        switch (str.toLowerCase()) {
            case 'ctrl':
                return 'ctrlKey';
                break;
            case 'alt':
                return 'altKey';
                break;
            case 'shift':
                return 'shiftKey';
                break;
            case 'meta':
                return 'metaKey';
                break;
            default:
                return false;
                break;
        }
    }

    function parseShortcut(shortcut) {
        if (!shortcut) throw Error('Empty shortcut provided. ' + shortcut);

        // Default options
        var options = {
            ctrlKey: false,
            altKey: false,
            shiftKey: false,
            metaKey: false,
            keyCode: null
        };

        // Strips whitespace first, then explodes by plus symbols
        var keys = shortcut
            .replace(/\s*/g, '')
            .split('+');

        if (!keys.length) throw Error('Invalid shortcut provided: ' + shortcut);

        var modifier = matchModifier(keys[0]);

        if (!modifier) throw Error('Unrecognized modifier "' + keys[0] + '" in shortcut "' + shortcut + '"');

        options[modifier] = true;

        for (var i = 1, l = keys.length; i < l; i++) {
            var currKey = keys[i];
            modifier = matchModifier(currKey);

            if (modifier) {
                options[modifier] = true;
                continue;
            }

            if (options.keyCode) throw Error('Only one shortcut key can be used. "' + shortcut + '"');

            var keyCode = keyCodeTable[currKey];

            if (!keyCode) throw Error('Unrecognized key "' + keys[0] + '" in shortcut "' + shortcut + '"');

            options.keyCode = keyCode;
        }

        return options;
    }

    function ShortcutHandler(el, shortcut) {
        shortcut = parseShortcut(shortcut);

        return function (e) {
            if (e.ctrlKey  !== shortcut.ctrlKey)  return;
            if (e.altKey   !== shortcut.altKey)   return;
            if (e.shiftKey !== shortcut.shiftKey) return;
            if (e.metaKey  !== shortcut.metaKey)  return;
            if (e.keyCode  !== shortcut.keyCode)  return;

            triggerEvent(el, 'click');
        };
    }

    var shortcutStorage = [];

    function Shortcut(el, shortcut) {
        var isConstructor = (this instanceof Shortcut);

        if (!isConstructor) throw Error('Shortcut must be called with "new" or you can use Shortcut.add(element, shortcut);');

        this.delegate = Shortcut.delegate;
        this.el = el;
        this.shortcut = shortcut;
        this.keyEvent = Shortcut.keyEvent;
        this.shortcutHandler = new ShortcutHandler(el, shortcut);

        addEventListener(this.delegate, this.keyEvent, this.shortcutHandler);

        shortcutStorage.push(this);
    }

    Shortcut.attributeName = 'data-shortcut';
    Shortcut.keyEvent = 'keydown';
    Shortcut.delegate = document;

    /**
     * Static helper method
     */
    Shortcut.add = function (el, shortcut) {
        return new Shortcut(el, shortcut);
    };

    Shortcut.remove = function (el, shortcut) {
        for (var i = 0, l = shortcutStorage.length; i < l; i++) {
            // shortcutStorage contains all previously bound shortcut objects
            var shortcutInstance = shortcutStorage[i];

            // Checking against the actual Element nodes
            if (shortcutInstance.el !== el) {
                continue;
            }
            
            // If they provided a shortcut but it doesn't match the current
            // one we'll move on.
            if (shortcut && shortcutInstance.shortcut !== shortcut) {
                continue;
            }

            // Unbind the event listener to the element itself
            removeEventListener(
                shortcutInstance.delegate,
                shortcutInstance.keyEvent,
                shortcutInstance.shortcutHandler
            );
            
            // Remove our reference to the shortcut instance
            shortcutStorage.splice(i, 1);
            
            return true;
        }

        // If reached, that means we didn't find a bound shortcut for the given
        // element + shortcut combo
        return false;
    };

    Shortcut.prototype.remove = function () {
        return Shortcut.remove(this.el, this.shortcut);
    };

    Shortcut.init = function () {
        if (Shortcut.isInitialized) return false;
        Shortcut.isInitialized = true;

        var elements = document.getElementsByTagName('*');
        var attributeName = Shortcut.attributeName;

        for (var i = 0, l = elements.length; i < l; i++) {
            var el = elements[i];
            var shortcut = el.getAttribute(attributeName);

            if (shortcut) {
                new Shortcut(el, shortcut);
            }
        }

        return true;
    }

    // Try to auto-initialize starting with jQuery's DOM Ready helper
    if (window.jQuery) {
        jQuery(Shortcut.init);
    } else if (document.addEventListener) {
        document.addEventListener('DOMContentLoaded', Shortcut.init, false);
    } else if (window.attachEvent) {
        window.attachEvent('onload', Shortcut.init);
    }

    window.Shortcut = Shortcut;

})(window, document);