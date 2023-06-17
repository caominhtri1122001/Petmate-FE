import React from "react";
import "./AssistanceSitter.css";

const AssistanceStaff = () => {
    return (
        <div className="home">
            <div className="container">
                <div className="chat-box">
                    <div className="chat-header">
                        <h1>Chat</h1>
                    </div>
                    <div className="messages">
                        <div className="message bot-message">
                            <p>Hello!</p>
                        </div>
                        <div className="message user-message">
                            <p>Hi!</p>
                        </div>
                    </div>
                    <form className="message-form">
                        <input
                            type="text"
                            placeholder="Type your message here..."
                        />
                        <button type="submit">Send</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AssistanceStaff;
