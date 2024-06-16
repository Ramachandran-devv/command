// Encapsulate a command request as an object
// The Command design pattern is a behavioral design pattern used to encapsulate a request as an object, 
// thereby letting users parameterize clients with queues, requests, and operations.
//  It separates the object that invokes the operation from the one that knows how to perform it, 
// providing a higher level of flexibility in swapping out command objects and managing them.

interface Command {
    execute(): void;
}

class SimpleCommand implements Command {
    private payload: string;

    constructor(payload: string) {
        this.payload = payload;
    }

    public execute(): void {
        console.log(`SimpleCommand: See, I can do simple things like printing (${this.payload})`);
    }
}

class ComplexCommand implements Command {
    private receiver: Receiver;
    private a: string;
    private b: string;

    constructor(receiver: Receiver, a: string, b: string) {
        this.receiver = receiver;
        this.a = a;
        this.b = b;
    }

    public execute(): void {
        console.log('ComplexCommand: Complex stuff should be done by a receiver object.');
        this.receiver.doSomething(this.a);
        this.receiver.doSomethingElse(this.b);
    }
}

class Receiver {
    public doSomething(a: string): void {
        console.log(`Receiver: Working on (${a}.)`);
    }

    public doSomethingElse(b: string): void {
        console.log(`Receiver: Also working on (${b}.)`);
    }
}

class Invoker {
    private onStart: Command;
    private onFinish: Command;

    public setOnStart(command: Command): void {
        this.onStart = command;
    }

    public setOnFinish(command: Command): void {
        this.onFinish = command;
    }

    public doSomethingImportant(): void {
        console.log('Invoker: Does anybody want something done before I begin?');
        if (this.onStart) {
            this.onStart.execute();
        }

        console.log('Invoker: ...doing something really important...');
        console.log('Invoker: Does anybody want something done after I finish?');
        if (this.onFinish) {
            this.onFinish.execute();
        }
    }
}

// Client code
const invoker = new Invoker();
const receiver = new Receiver();
invoker.setOnStart(new SimpleCommand('Say Hi!'));
const command = new ComplexCommand(receiver, 'Send email', 'Save report');
invoker.setOnFinish(command);

invoker.doSomethingImportant();
