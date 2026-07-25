import { useState } from "react";


export function useAlert() {

    const [message, setMessage] = useState("");
    const [showPopup, setShowPopup] = useState(false);
    const [type, setType] = useState<"success" | "error">("success");

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