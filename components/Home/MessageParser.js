class MessageParser {
    constructor(actionProvider, state) {
        this.actionProvider = actionProvider;
        this.state = state;
    }

    parse(message) {
        this.actionProvider.handleMessage(message);
    }
}

export default MessageParser;