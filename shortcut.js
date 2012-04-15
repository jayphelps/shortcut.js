/**
 * Shortcut.js
 * (c) 2012 Jay Phelps
 * MIT licensed
 * https://github.com/jayphelps/shortcut.js
 */
(function (window, document) {

    function addEventListener(el, event, callback, useCapture) {
        if (el.addEventListener) {
            el.addEventListener(event, callback, useCapture || false); 
        } else if (el.attachEvent)  {
            el.attachEvent('on'+event, callback);
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
            if (e.ctrlKey !== shortcut.ctrlKey) {
                return;
            }

            if (e.altKey !== shortcut.altKey) {
                return;
            }

            if (e.shiftKey !== shortcut.shiftKey) {
                return;
            }

            if (e.metaKey !== shortcut.metaKey) {
                return;
            }

            if (e.keyCode !== shortcut.keyCode) {
                return;
            }

            triggerEvent(el, 'click');
        };
    }

    function Shortcut(el, shortcut) {
        addEventListener(document, 'keyup', new ShortcutHandler(el, shortcut));
    }

    function init() {
        var elements = document.getElementsByTagName('*');

        for (var i = 0, l = elements.length; i < l; i++) {
            var el = elements[i];
            var shortcut = el.getAttribute('data-shortcut');

            if (shortcut) {
                new Shortcut(el, shortcut)
            }
        }
    }

    document.addEventListener('DOMContentLoaded', init, false);

    window.Shortcut = Shortcut;

})(window, document);