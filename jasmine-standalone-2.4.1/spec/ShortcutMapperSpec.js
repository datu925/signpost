describe("ShortcutMapper", function() {
  describe("genCharArray", function() {
    it("generates appropriate sequence", function() {
      expect(genCharArray("a","e")).toEqual(["a","b","c","d","e"]);
    });
  });

  describe("generateShortcutList", function() {
    var mapper = new ShortcutMapper();

    it("generates appropriate sequence with short list", function() {
      expect(mapper.generateShortcutList(7)).toEqual(["a","b","c","d","e","f","g"]);
    });

    it("generates appropriate sequence with med list", function() {
      var outcome = ["a","b","c","d","e","f","g","h","i","j","k","l","m","na","nb","nc","nd","ne","nf","ng","nh","ni","nj","nk","nl","nm","oa"];
      expect(mapper.generateShortcutList(27)).toEqual(outcome);
    });

    it("generates appropriate sequence with long list", function() {
      var outcome = mapper.generateShortcutList(185);
      expect(outcome[181]).toEqual("zm");
      expect(outcome[184]).toEqual("nnc");
    });
  });

  describe("assign", function() {
    it("adds shortcut to passed links", function() {
      var target = new Target({"anchor": "test", "text": "test2","x":100,"y":100});
      var mapper = new ShortcutMapper([target]);
      expect(target.shortcut).toBe(null);
      mapper.assign();
      expect(target.shortcut).toBe("a");
    });
  });
});