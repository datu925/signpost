function ShortcutMapper(targets) {
  this.targets = targets;
}


function genCharArray(charA, charZ) {
    var a = [], i = charA.charCodeAt(0), j = charZ.charCodeAt(0);
    for (; i <= j; ++i) {
        a.push(String.fromCharCode(i));
    }
    return a;
}

ShortcutMapper.prototype.generateShortcutList = function(size) {
  // map shortcut keys to keyboard strokes
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


ShortcutMapper.prototype.assign = function() {
  var len = this.targets.length;
  var shortcutList = this.generateShortcutList(len);
  var shortcutHash = {};
  var i = 0;
  while (i < len) {
        var shortcut = shortcutList[i]
        this.targets[i].shortcut = shortcut;
        shortcutHash[shortcut] = this.targets[i];
        i += 1;
    }
  return shortcutHash;
};