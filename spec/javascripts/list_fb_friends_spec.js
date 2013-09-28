describe("Facebook friend list", function() {
  var fb_api_response;

  beforeEach(function() {
    loadFixtures("fb_friends.html");
    fb_api_response = {data: [{id: "555", name: "someName1"}, {id: "777", name: "someName2"}, {id: "999", name: "someName3"}]};
  });

  describe("display_friend", function() {

    it("adds correct attributes and classes to created elements", function() {
      $(fb_api_response.data.slice(0,1)).each(FBF.display_friend);

      expect($("#fb_friends .friend-div")).toBe("div");
      expect($("#fb_friends .friend-image")).toBe("img");
      expect($("#fb_friends .friend-image")).toHaveAttr("src", "https://graph.facebook.com/555/picture?width=150&height=150");
      expect($("#fb_friends .friend-name")).toContainText("someName1");
    });

    it("adds the friend details div to the correct div on the page", function() {
      $(fb_api_response.data).each(FBF.display_friend);

      expect($("#fb_friends > .friend-div").size()).toEqual(3);
    });
  });

  describe("list_friends", function() {
    beforeEach(function() {
      token = "token";
      FB = {};
      FB.api = jasmine.createSpy("fb_api").andCallFake(function() {
        FB.api.mostRecentCall.args[2](fb_api_response);
      });

      spyOn(FBF, "display_friend").andCallFake(function() {
        $("<div>").addClass("friend-div").text(this.name).appendTo("#fb_friends");
      });
    });

    it("creates all friend detail divs using display_friend", function() {
      FBF.list_friends();

      expect($("#fb_friends > .friend-div").size()).toEqual(3);
      expect($("#fb_friends > .friend-div:first")).toContainText("someName1");
    });

    it("adds zebra stripes to the list", function() {
      FBF.list_friends();

      expect($(".friend-div:even:first").css("background-color")).toEqual("rgb(220, 220, 220)");
      expect($(".friend-div:odd:first").css("background-color")).not.toEqual("rgb(220, 220, 220)");
    });
  });
});
