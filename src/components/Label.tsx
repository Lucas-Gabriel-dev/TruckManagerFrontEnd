import { LabelHTMLAttributes } from "react";


interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
    text: string;
}

export function Label({ text, ...rest }: LabelProps){
    return(
        <label
            style={{
                fontSize: "clamp(1px, 2rem, 2vw)",
                alignSelf: "center",
                textAlign: "right"
            }}
            {...rest}
        >
            {text}
        </label>
    )
}