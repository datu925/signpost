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
    var iterations = size / 25;
    var remainder = size % 25;
    var alphabet = genCharArray("a","y");
    var list = []
    var i = 0;
    while (i < iterations) {
        list = list.concat(alphabet.map(function(letter) {
            return Array(i + 1).join("z") + letter;
        }));
        i += 1;
    }

    for (var j = 0; j < remainder; j++) {
        list.push(Array(i + 1).join("z") + alphabet[j])
    }
    return list;
}


function assignLinks(shortcutList, links) {
    var i = 0;
    var j = 0;
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


$(function() {
  var anchors = $('a').filter(isElementInViewport);
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
                "top": this.y - 20, "left": this.x,
                "background-color": "white",
                "border": "1px solid black",
                "padding": "10px",
                "z-index": 10000
                });
  });

  var buffer = ""
  $("body").on("keyup", function(event) {
    var keyCode = event.which;
    if (keyCode == 27) {
        $(".popup").remove();
        $("body").off("keyup");
    } else {
        var letter = String.fromCharCode(keyCode).toLowerCase();
        if (isValidLetter(letter)) {
            buffer += letter;
            if (shortcutMap.hasOwnProperty(buffer)) {
                var link = shortcutMap[buffer];
                link.anchor[0].click()
                $(".popup").remove();
                $("body").off("keyup");
            }
        }
      }

    })

  /*

  Procedure:

    1. Find all links in current viewport. Done.
    2. Freeze other possible user action. For instance, you can't click or fill out a form (or rather, doing so cancels script execution).
    2. Take those links and assign letters than represent shortcuts to them. Done.
    3. Overlay a small popup just over the original link containing their new shortcut. Done.
    3. Upon key press, there are a number of options:
        a. It's escape, and we should remove everything.
        b. It's a "z" (or some other key that is the start, but not the entirety, of a sequence), and we need to record that we've gotten that far.
        c. It's another key that completes a sequence. Have jquery click the link and then finish script execution.
        d. It's another key that doesn't belong at all and should be ignored.
    4. Upon esc, exit the script.


  */
});

