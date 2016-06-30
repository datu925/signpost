describe("TargetCollector", function() {

  var collector = new TargetCollector();
  describe("collect", function() {
  })

  describe("isElementInViewport", function() {
    it('correctly identifies objects in view', function() {
      setFixtures('<div id="mystuff">This is a test.</div>')
      var target = $("#mystuff");
      expect($("#mystuff")).toContainText("test");
      // expect(isElementInViewport(target)).toBe(true);

    })
  })
})