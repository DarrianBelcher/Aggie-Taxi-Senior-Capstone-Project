import axios from 'axios';


class ActionProvider {
    constructor(createChatBotMessage, setStateFunc) {
        this.createChatBotMessage = createChatBotMessage;
        this.setState = setStateFunc;
    }


    async handleOpenAIResponse(userMessage) {
        try {
            // Axios POST request with headers to match CORS requirements
            const response = await axios.post('http://localhost:5000/api/chat', {
                prompt: userMessage,  // Changed 'message' to 'prompt' to match the backend
            }, {
                headers: {
                    'Content-Type': 'application/json',  // Ensure correct content type
                }
            });


            const botMessage = this.createChatBotMessage(response.data.response);
            this.setState((prev) => ({
                ...prev,
                messages: [...prev.messages, botMessage],
            }));
        } catch (error) {
            console.error('Error fetching response:', error);
            const errorMessage = this.createChatBotMessage("Oops! Something went wrong. Please try again.");
            this.setState((prev) => ({
                ...prev,
                messages: [...prev.messages, errorMessage],
            }));
        }
    }


    handleMessage(userMessage) {
        this.handleOpenAIResponse(userMessage);
    }
}


export default ActionProvider;