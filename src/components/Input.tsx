import { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    width: string;
    margin: string;
}

export function Input({ width, margin, ...rest }: InputProps){
    return(
        <input
            style={{
                fontSize: "clamp(1px, 1.5rem, 2vw)",
                height: "5vh",
                width: width,
                padding: "2%",
                borderRadius: "6px",
                border: "2px solid #122F51",
                alignSelf: "center",
                margin: margin,
            }} 
            {...rest}
        />
    )
}