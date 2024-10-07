import { createChatBotMessage } from 'react-chatbot-kit';
import ActionProvider from './ActionProvider';  // Path to your ActionProvider
import MessageParser from './MessageParser';    // Path to your MessageParser

const botConfig = {
    botName: "AI Chatbot",
    initialMessages: [createChatBotMessage(`Hello! Ask me anything.`)],
    customStyles: {
        botMessageBox: {
            backgroundColor: "#376B7E",
        },
        chatButton: {
            backgroundColor: "#376B7E",
        },
    },
    actionProvider: ActionProvider,
    messageParser: MessageParser,
};

export default botConfig;