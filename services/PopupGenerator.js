function PopupGenerator() {
}


function yOffset(y) {
    if (y < 20) {
        return 0
    } else {
        return y - 20
    }
}

PopupGenerator.prototype.createHTML = function(target) {
    var div = $("<div class=popup>");
    var txt = $("<span class=popup_text>");
    return div.append(txt.text(target.shortcut));
}


PopupGenerator.prototype.generateAndAdd = function(target) {
  var html = this.createHTML(target);
  $("body").append(html);
  // have to call CSS separately because jquery CSS method throws error when not already connected to DOM
  html.css({
            "position":"absolute",
            "top": yOffset(target.y), "left": target.x,
            "background-color": "white",
            "display": "block",
            "opacity": 0.75,
            "border": "1px solid black",
            "padding": "1px",
            "z-index": 100000
        });
  return html;
}
