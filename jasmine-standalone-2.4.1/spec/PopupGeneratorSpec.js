describe("PopupGenerator", function() {
  var gen = new PopupGenerator();
  describe("createHTML", function() {
    it("generates expected popup", function() {
      var target = new Target({"anchor": "test", "text":"text", "x": 100, "y": 200});
      target.shortcut = "b";
      expect(gen.createHTML(target).text()).toEqual("b");
    });
  });

  describe("generateAndAdd", function() {
    it("generates and adds to DOM", function() {
      // loadFixtures('berkshire-test.html')
      var target = new Target({"anchor": "test", "text":"text", "x": 100, "y": 200});
      target.shortcut = "b";
      var popup = gen.generateAndAdd(target)
      expect(popup.css("z-index")).toEqual("100000");
      popup.remove();
    });
  });

});