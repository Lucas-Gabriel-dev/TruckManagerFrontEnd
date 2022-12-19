import { useEffect, useState } from "react";

import { TruckDelete } from "./TruckDelete";
import { TruckEdit } from "./TruckEdit";
import { TruckInsert } from "./TruckInsert";
import { TrucksAvaliable } from "./TrucksAvaliable";
import { Button } from "./Button"

type DisplayDiv = {
    display: string;
    trucksAvailaible?: boolean;
    truckInsert?: boolean;
    truckEdit?: boolean;
    truckDelete?: boolean;
}

export function TruckActions(props: DisplayDiv){
    const [divLocalState, setDivLocalState] = useState("none");

    useEffect(
        () => {
          setDivLocalState(props.display);
        },
        [props.display],
    );

    return(
        <div
            id="TruckActions"
            style={{
                fontSize: "clamp(1px, 1.5rem, 10vw)",
                fontFamily: 'Roboto, sans-serif',
                fontWeight: "bold",
                color: "white",
                position: "absolute",
                top: "0",
                width: "100vw",
                height: "100vh",
                display: divLocalState,
                justifyContent: "center",
                alignItems: "center",
                alignSelf: "center",
                backgroundColor: "#6d6d6d6c",
            }}
        >
            <div 
                style={{
                    backgroundColor: "#F1F5F9",
                    width: "80vw",
                    height: "70vh",
                    minHeight: "500px",
                    padding: "3%",
                    borderRadius: "6px",
                    overflow: "auto"
                }}
            >
                <div id="MessageError"
                style={{
                    display: "none",
                    marginBottom: "5%"
                }}
                >
                    <p id="titleError">
                        
                    </p>
                </div>

                <TrucksAvaliable display={props.trucksAvailaible ? "block" : "none"}/>
                <TruckInsert display={props.truckInsert ? "block" : "none"} />
                <TruckEdit display={props.truckEdit ? "grid" : "none"}/>
                <TruckDelete display={props.truckDelete ? "grid" : "none"} />
            </div>
        </div>
    )
}