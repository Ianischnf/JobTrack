import { useState } from "react";

const [message, setMessage] = useState("");
const [showPopup, setShowPopup] = useState(false);
const [type, setType] = useState<"success" | "error">("success");

export function useAlert() {

    function showAlert(message: string, type: "success" | "error") {
        setMessage(message);
        setType(type);

        setShowPopup(true);

        setTimeout(() => {
            setShowPopup(false)
        }, 3000);
    }

    return {
        message,
        showPopup,
        type,
        showAlert
    }
}