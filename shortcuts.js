function isValidLetter(letter) {
    return "a" <= letter && "z" >= letter;
}

function exitExtension(currentFocus) {
    if (currentFocus != undefined) {
        currentFocus.focus();
    }
    $(".popup").remove();
    $("body").off("keyup");
    $("body").off("click");
}

function triggerTarget(target) {
    if ($(target.anchor[0]).is("a,button,input[type='submit']")) {
        target.anchor[0].click();
        exitExtension();
    } else {
        target.anchor[0].focus();
        exitExtension();
    }
}



function main() {
    // exit any input forms, etc. we're filling out so that the keyboard shortcuts work. We will come back to them once the extension exits.
    var currentFocus = $(document.activeElement);
    if (currentFocus != undefined) {
        currentFocus.blur();
    }

    var collector = new TargetCollector;
    var targets = collector.collect('a,input,button,select');

    var targets = targets.map(function() {
        return new Target({"anchor": $(this), "text":$(this).innerText, "x": $(this).offset().left, "y": $(this).offset().top});
    });

    var mapper = new ShortcutMapper(targets);
    var shortcutMap = mapper.assign();

    var generator = new PopupGenerator;
    var els = [];
    targets.each(function() {
        els.push(generator.createHTML(this));
        // generator.generateAndAdd(this);
    });
    $("body").append(els);

    var sequence = ""
    $("body").on("click", function(event) {
        exitExtension();
    })

    $("body").on("keyup", function(event) {
        var keyCode = event.which;
        if (keyCode == 27) { // escape key
            exitExtension(currentFocus);
        } else {
            var letter = String.fromCharCode(keyCode).toLowerCase();
            if (isValidLetter(letter)) {
                sequence += letter;
                if (shortcutMap.hasOwnProperty(sequence)) {
                    var target = shortcutMap[sequence];
                    triggerTarget(target);
                }
            }
        }

    })
}

main();

