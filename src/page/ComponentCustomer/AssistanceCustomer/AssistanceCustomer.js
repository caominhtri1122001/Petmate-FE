import React, { useState, useEffect } from "react";
import "./AssistanceCustomer.css";
import CustomerService from "../../../config/service/CustomerService";

const AssistanceCustomer = () => {
    const [messages, setMessages] = useState([
        { text: "Hello!", sender: "bot" },
    ]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        const messageInput = event.target.elements.message;
        const messageText = messageInput.value;

        if (!messageText) {
            return;
        }

        const newMessage = { text: messageText, sender: "user" };
        setMessages((prevMessages) => [...prevMessages, newMessage]);

        const botMessage = await sendMessage(messageText);
        setMessages((prevMessages) => [
            ...prevMessages,
            { text: botMessage, sender: "bot" },
        ]);

        messageInput.value = "";
    };

    const sendMessage = async (messageText) => {
        const response = await CustomerService.chatBot(messageText);
        return response.choices[0].message.content;
    };

    return (
        <div className="home">
            <div className="container">
                <div className="chat-box">
                    <div className="chat-header">
                        <h1>Chat</h1>
                    </div>
                    <div className="messages">
                        {messages.map((message, index) => (
                            <div
                                key={index}
                                className={`message ${
                                    message.sender === "bot"
                                        ? "bot-message"
                                        : "user-message"
                                }`}
                            >
                                <p>{message.text}</p>
                            </div>
                        ))}
                    </div>
                    <form className="message-form" onSubmit={handleSubmit}>
                        <input
                            type="text"
                            placeholder="Type your message here..."
                            name="message"
                        />
                        <button type="submit">Send</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AssistanceCustomer;
