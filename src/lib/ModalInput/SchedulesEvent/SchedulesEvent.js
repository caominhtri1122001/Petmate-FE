import React from "react";
import "./SchedulesEvent.css";

const SchedulesEvent = (props) => {
    const FormInfo = (
        <div className="form-admin-content">
            <h4>Information</h4>
            <div className="form-teacher-content">
                <div className="teacher-content-left">
                    <div className="type-input" style={{ marginTop: 20 }}>
                        <h4>Title</h4>
                        <input
                            className="input-content"
                            type="text"
                            value={props.info.title}
                            readOnly
                        />
                    </div>
                    <div className="type-input" style={{ marginTop: 20 }}>
                        <h4>Message</h4>
                        <input
                            className="input-content-msg"
                            type="text"
                            readOnly
                            value={props.info.extendedProps.message}
                        />
                    </div>
                </div>
            </div>
        </div>
    );

    const FormDetail = (
        <div className="form-add-account">
            {FormInfo}

            <div className="test">
                <button
                    onClick={props.handleInputCustom}
                    className="btn-cancel"
                    style={{ marginLeft: 20 }}
                >
                    Close
                </button>
            </div>
        </div>
    );

    return <div className="schedules-form">{FormDetail}</div>;
};

export default SchedulesEvent;
