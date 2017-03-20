/// <reference path="../ref/node.d.ts" />

namespace HelloWorld {
    var chatter = [
        "Hello World!",
        "Hello, Bill.",
        "You know, that lawn of yours is looking a little tall.",
        "I'm gonna check that, actually.",
        "Well well, look at that... 3 inches over the limit. That's bad, Bill.",
        "You're going to have to mow that.",
        "I don't care if you're busy this weekend, it has to get done.",
        "We'll fine you, Bill. It's going to be a hefty fine.",
        "I don't understand why you can't just hire someone, Bill. I do.",
        "The HOA pays for it since I'm the president.",
        "Well no, we don't cover yard maintenance for our homeowners, just our officers.",
        "Look, I have to be out here all day, I don't have time to mow my own lawn.",
        "Listen, I don't have to explain myself to you. Fact of the matter is, your lawn is over-height. Fix it or else.",
        "We'll kick you out of the neighborhood, Bill. Don't test me.",
        "This is not a fight you want to have, Bill. Just mow the darn lawn.",
        "Thank you."
    ]
    var chatMsg = "", chatPtr = 0;

    export function Chatter() {
        var nextLine = chatter[chatPtr++];
        if (nextLine.indexOf("Hello") == 0)
            chatMsg = nextLine;
        else
            chatMsg += " " + nextLine;
        chatPtr %= chatter.length;
        return chatMsg;
    }
}

//expose namespace to game code
exports.HelloWorld = HelloWorld;