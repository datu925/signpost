describe("genCharArray", function() {
  it("generates appropriate sequence", function() {
    expect(genCharArray("a","e")).toEqual(["a","b","c","d","e"]);
  });
});



describe("generateShortcutList", function() {
  it("generates appropriate sequence with short list", function() {
    expect(generateShortcutList(7)).toEqual(["a","b","c","d","e","f","g"]);
  });

  it("generates appropriate sequence with med list", function() {
    var outcome = ["a","b","c","d","e","f","g","h","i","j","k","l","m","na","nb","nc","nd","ne","nf","ng","nh","ni","nj","nk","nl","nm","oa"];
    expect(generateShortcutList(27)).toEqual(outcome);
  });

  it("generates appropriate sequence with long list", function() {
    var outcome = generateShortcutList(185);
    expect(outcome[181]).toEqual("zm");
    expect(outcome[184]).toEqual("nnc");
  });
});

