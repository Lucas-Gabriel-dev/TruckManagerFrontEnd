import { useEffect, useState } from "react";
import { api } from "../lib/axios";

type TruckProps = {
    id: string;
    model: string;
    yearManufacture: string;
    modelYear: string;
}

export function AllTrucks(): TruckProps[]{
    const [allTrucks, setAllTrucks] = useState<TruckProps[]>([]);

    useEffect(() => {
        api.get("/AllTrucks")
        .then(response => response.data)
        .then(data => {
            if(!data.error){
                setAllTrucks(data);
            }
        }).catch(function (error) {
            if(error.response.status === 401){
                window.location.replace("/login")
            }
        });    
    }, [])

    return allTrucks
}