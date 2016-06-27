function isElementInViewport (el) {

    var rect = this.getBoundingClientRect();

    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && /*or $(window).height() */
        rect.right <= (window.innerWidth || document.documentElement.clientWidth) /*or $(window).width() */
    );
}


function genCharArray(charA, charZ) {
    var a = [], i = charA.charCodeAt(0), j = charZ.charCodeAt(0);
    for (; i <= j; ++i) {
        a.push(String.fromCharCode(i));
    }
    return a;
}

function generateShortcutList(size) {
  // map shortcut keys to keyboard strokes
  // 0 => aa, 1 => ab, etc.
  // if size <= 26, 0 => a, 1 => b, etc.
  // if size >= 27 and <= 26^2, 0=> aa, 1=>ab, etc.
  // so just take base 26 rep and convert to letters
  // first need to know how size compares to powers of 26
    if (size == 0) {
        return [];
    }
    var keys = genCharArray("a","m");
    var prefixes = genCharArray("n","z");

    var iterations = Math.floor((size - keys.length) / (prefixes.length * keys.length));
    var remainder = (size - keys.length) % (prefixes.length * keys.length);
    var list = [];
    if (size <= 13) {
        for (var i = 0; i < size; i++) {
            list.push(keys[i]);
        }
        return list;
    } else {
        for (var i = 0; i < 13; i++) {
            list.push(keys[i]);
        }
    }

    // debugger;
    var i = 0
    while (i < iterations) {
        for (var j = 0; j < prefixes.length; j++) {
            list = list.concat(keys.map(function(letter) {
                return Array(i + 2).join(prefixes[j]) + letter;
            }));
        }
        i += 1;
    }

    for (var j = 0; j < remainder; j++) {
        list.push(Array(i + 2).join(prefixes[Math.floor(j / keys.length)]) + keys[j % keys.length])
    }
    return list;
}

// function generateShortcutList(size) {
//     var iterations = size / 25;
//     var remainder = size % 25;
//     var alphabet = genCharArray("a","y");
//     var list = []
//     var i = 0;
//     while (i < iterations) {
//         list = list.concat(alphabet.map(function(letter) {
//             return Array(i + 1).join("z") + letter;
//         }));
//         i += 1;
//     }

//     for (var j = 0; j < remainder; j++) {
//         list.push(Array(i + 1).join("z") + alphabet[j])
//     }
//     return list;
// }


function assignLinks(shortcutList, links) {
    var i = 0;
    var shortcutHash = {};
    while (i < links.length) {
        var shortcut = shortcutList[i]
        links[i].shortcut = shortcut;
        shortcutHash[shortcut] = links[i];
        i += 1;
    }
    return shortcutHash;
}

function generatePopup(link) {
    var div = $("<div class=popup>");
    var txt = $("<span class=popup_text>");
    return div.append(txt.text(link.shortcut))
}

function isValidLetter(letter) {
    return "a" <= letter && "z" >= letter;
}

function exitExtension(currentFocus) {
    if (currentFocus != undefined) {
        currentFocus.focus();
    }
    $(".popup").remove();
    $("body").off("keyup");
}

function yOffset(y) {
    if (y < 20) {
        return 0
    } else {
        return y - 20
    }
}

function main() {

    // exit any input forms, etc. we're filling out so that the keyboard shortcuts work. We will come back to them later.
    var currentFocus = $(document.activeElement);
    if (currentFocus != undefined) {
        currentFocus.blur();
    }

    var anchors = $('a,input').filter(isElementInViewport);
    var links = anchors.map(function() {
        return new Link({"anchor": $(this), "text":$(this).innerText, "x": $(this).offset().left, "y": $(this).offset().top});
    });

    var shortcutList = generateShortcutList(links.length);
    var shortcutMap = assignLinks(shortcutList, links);

    links.each(function() {
        var popup = generatePopup(this);
        $("body").append(popup);
        popup.css({
            "position":"absolute",
            "top": yOffset(this.y), "left": this.x,
            "background-color": "white",
            "display": "block",
            "opacity": 0.75,
            "border": "1px solid black",
            "padding": "1px",
            "z-index": 100000
        });
    });

    var buffer = ""
    $("body").on("keyup", function(event) {
        var keyCode = event.which;
        if (keyCode == 27) {
            exitExtension(currentFocus);
        } else {
            var letter = String.fromCharCode(keyCode).toLowerCase();
            if (isValidLetter(letter)) {
                buffer += letter;
                if (shortcutMap.hasOwnProperty(buffer)) {
                    var link = shortcutMap[buffer];
                    // debugger;
                    if ($(link.anchor[0]).is("input")) {
                        link.anchor[0].focus();
                        exitExtension();
                    } else {
                        link.anchor[0].click();
                        exitExtension();
                    }

                }
            }
        }

    })
}

main();

