// Encapsulate a command request as an object
// The Command design pattern is a behavioral design pattern used to encapsulate a request as an object, 
// thereby letting users parameterize clients with queues, requests, and operations.
//  It separates the object that invokes the operation from the one that knows how to perform it, 
// providing a higher level of flexibility in swapping out command objects and managing them.
var SimpleCommand = /** @class */ (function () {
    function SimpleCommand(payload) {
        this.payload = payload;
    }
    SimpleCommand.prototype.execute = function () {
        console.log("SimpleCommand: See, I can do simple things like printing (".concat(this.payload, ")"));
    };
    return SimpleCommand;
}());
var ComplexCommand = /** @class */ (function () {
    function ComplexCommand(receiver, a, b) {
        this.receiver = receiver;
        this.a = a;
        this.b = b;
    }
    ComplexCommand.prototype.execute = function () {
        console.log('ComplexCommand: Complex stuff should be done by a receiver object.');
        this.receiver.doSomething(this.a);
        this.receiver.doSomethingElse(this.b);
    };
    return ComplexCommand;
}());
var Receiver = /** @class */ (function () {
    function Receiver() {
    }
    Receiver.prototype.doSomething = function (a) {
        console.log("Receiver: Working on (".concat(a, ".)"));
    };
    Receiver.prototype.doSomethingElse = function (b) {
        console.log("Receiver: Also working on (".concat(b, ".)"));
    };
    return Receiver;
}());
var Invoker = /** @class */ (function () {
    function Invoker() {
    }
    Invoker.prototype.setOnStart = function (command) {
        this.onStart = command;
    };
    Invoker.prototype.setOnFinish = function (command) {
        this.onFinish = command;
    };
    Invoker.prototype.doSomethingImportant = function () {
        console.log('Invoker: Does anybody want something done before I begin?');
        if (this.onStart) {
            this.onStart.execute();
        }
        console.log('Invoker: ...doing something really important...');
        console.log('Invoker: Does anybody want something done after I finish?');
        if (this.onFinish) {
            this.onFinish.execute();
        }
    };
    return Invoker;
}());
// Client code
var invoker = new Invoker();
var receiver = new Receiver();
invoker.setOnStart(new SimpleCommand('Say Hi!'));
var command = new ComplexCommand(receiver, 'Send email', 'Save report');
invoker.setOnFinish(command);
invoker.doSomethingImportant();
//# sourceMappingURL=command.js.map