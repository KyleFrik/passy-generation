import React, { useRef, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

//Utility Functions
import { generatePassword } from "../utils/form.util";

export default function Form() {

    // useRef to not trigger re-render while keeping access to value
    const numberRef = useRef();
    const symbolRef = useRef();
    const lengthRef = useRef();

    // value to update password text field and length (set defaults for the states)
    const temp = generatePassword(true, true, 16);
    const [password, setPassword] = useState(temp);
    const [passwordlength, setLength] = useState("16");

    // checks checkboxes are ticked and min length is 6 or greater triggering re-render
    const handleSubmit = () => {

        let newPassword = generatePassword(
            numberRef.current.checked,
            symbolRef.current.checked,
            lengthRef.current.value || 6
        );
        setPassword(newPassword);
        setLength(lengthRef.current.value);
    };

    // Copy to clipboard functionality
    const copyToClipboard = () => {
        navigator.clipboard.writeText(password)
    }

    //Toast Notification for text copy 
    function notify() {
        toast.success("Copied!", {
            position: "bottom-center",
            autoClose: 1500,
            hideProgressBar: true,
            closeOnClick: true,
            draggable: true,
            progress: undefined,
        });
    }

    // Main form funcionality 
    return (
        <form className="password__form" onChange={handleSubmit}>
            <h2>Generate a Random Secure Password</h2>
            <div id="input-flex" className="password__inputs">
                <div className="password__text left">{password}</div>
                <i className="fa fa-refresh fa-spin fa-2x my-icon right" aria-hidden="true" onClick={handleSubmit}></i>
            </div>

            <div className="settings">
                <div className="length__input">
                    <label htmlFor="password-length"></label>
                    <input
                        type="range"
                        max={64}
                        min={6}
                        name="password-length"
                        ref={lengthRef}
                        defaultValue="16"
                        className="slider"
                        id="myRange"
                    />
                </div>

                <div className="checkbox__inputs">
                    <label htmlFor="password-length">Include Numbers</label>
                    <input
                        type="checkbox"
                        className="gap"
                        name="numbers"
                        defaultChecked={true}
                        ref={numberRef}
                    />

                    <label htmlFor="password-length">Include Symbols</label>
                    <input
                        type="checkbox"
                        name="numbers"
                        defaultChecked={true}
                        ref={symbolRef}
                    />
                </div>
            </div>

            <div className="count">Length: {passwordlength}</div>

            <btn className="copy__btn" onClick={() => { notify(); copyToClipboard(); }} id="animate.css">
                Copy Password
            </btn>
            <ToastContainer />

        </form>
    );
};