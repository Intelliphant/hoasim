/// <reference path="../test-init.ts" />
/// <reference path="../../src-backend/helloworld.ts" />
namespace HelloWorld {
    describe("Chatter", () => {
        it("Should return a value.", () => assert.ok(!!HelloWorld.Chatter()));
        it("Should return a string.", () => assert.equal(typeof HelloWorld.Chatter(), "string"));
    });
}