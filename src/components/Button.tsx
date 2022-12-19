import { ButtonHTMLAttributes, useState } from "react";
import "../App.css"

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    title: string;
    width: string;
    padding: string;
    margin?: string;
    warning?: boolean;
}

export function Button
({
    title, width, padding, warning = false, margin, ...rest 
}: ButtonProps){
    const [buttonColor, setButtonColor] = useState(warning ? "#FF4242" : "#17A7A8")

    return(
        <button  className="Button"
            onMouseEnter={() => setButtonColor(warning ? "#fc2f2f" : "#18b8b8")}
            onMouseLeave={() => setButtonColor(warning ? "#FF4242" : "#17A7A8")}
            style={{
                width: width,
                padding: padding,
                backgroundColor: buttonColor,
                borderRadius: "8px",
                margin: margin ? margin : "2%",
                fontFamily: "Poppins, sans-serif",
                fontSize: "clamp(1px, 1.8rem, 1vw)",
                fontWeight: 700,
                color: "#F1F5F9",
                transition: ".2s",
                cursor: "pointer"
            }}
            {...rest}
        >
            {title}
        </button>
    )
}