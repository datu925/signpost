function isElementInViewport (el) {

    //special bonus for those using jQuery
    // if (typeof jQuery === "function" && el instanceof jQuery) {
    //     el = el[0];
    // }

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



function assignLinks(shortcutList, links) {
    var i = 0;
    var j = 0;
    var shortcutHash = {};
    while (i < links.length) {
        var shortcut = shortcutList[j]
        links[i].shortcut = shortcut;
        shortcutHash[shortcut] = links[i];
        i += 1;
        if (j < 25) {
            j += 1;
        }
    }
    return shortcutHash;
}

function generatePopup(link) {
    var div = $("<div class=popup>");
    var txt = $("<span class=popup_text>");
    return div.append(txt.text(link.shortcut))
}


$(function() {
  var anchors = $('a').filter(isElementInViewport);
  // debugger;
  var links = anchors.map(function() {
    // debugger;
    return new Link({"anchor": $(this), "text":$(this).innerText, "x": $(this).offset().left, "y": $(this).offset().top});
    });

  var shortcutList = genCharArray("a", "z");
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
  $("body").on("keyup", function(event) {
    var keyCode = event.which;
    var letter = String.fromCharCode(keyCode).toLowerCase();
    var link = shortcutMap[letter];
    // debugger;
    link.anchor[0].click()
    $(".popup").remove();
    $("body").off("keyup");
  })
    // debugger;

  /*

  Procedure:

    1. Find all links in current viewport. Done.
    2. Freeze other possible user action. For instance, you can't click or fill out a form (or rather, doing so cancels script execution).
    2. Take those links and assign letters than represent shortcuts to them. Done.
    3. Overlay a small popup just over the original link containing their new shortcut. Done.
    3. Upon key press, have jquery click the link and then finish script execution
    4. Upon esc, exit the script.


  */
});

