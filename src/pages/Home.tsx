import { useEffect, useState } from "react";
import { Button } from "../components/Button";
import { TruckActions } from "../components/TruckActions";

export function Home(){
    const [divLocalState, setDivLocalState] = useState("none");
    const [trucksAvaliableSelected, setTrucksAvaliableSelected] = useState(false);
    const [truckInsertSelected, setTruckInsertSelected] = useState(false);
    const [truckEditSelected, setTruckEditSelected] = useState(false);
    const [truckDeleteSelected, setTruckDeleteSelected] = useState(false);

    // document.getElementById('ButtonBack')?.addEventListener('click', () => {
    //     if(divLocalState == "flex"){
    //         setDivLocalState('none')
    //     }
    //     console.log("Lucas")

    //     // document.getElementById('MessageError')!.style.display = "none"
    //     // document.getElementById('InformacoesLogradouro')!.style.display = "none"
    // })

    return(
        <div>
            <header
                style={{
                    backgroundColor: "#122F51",
                    height: "16vh",
                    display: "flex",
                    alignItems: "center"
                }}
            >
                <p
                    style={{
                        color: "white",
                        marginLeft: "5%",
                        fontSize: "clamp(1px, 4rem, 3vw)",
                        fontFamily: "Oswald, sans-serif"
                    }}
                >
                    Truck Manager  
                </p>
            </header>

            <p id="Title"
                style={{
                    fontSize: "clamp(1px, 2rem, 3vw)",
                    margin: "2% 0% 0% 5%",
                    color: "black"
                }}
            >
                Selecione uma das opções abaixo:
            </p>

            <div
                style={{
                    height: "30vh",
                    width: "70vw",
                    margin: "auto",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    alignItems: "center"
                }}
            >
                <Button 
                    title="Caminhões disponíveis"
                    width="50%"
                    padding="2%"
                    onClick={
                        () => {
                            setDivLocalState("flex")
                            setTruckInsertSelected(false)
                            setTruckEditSelected(false)
                            setTruckDeleteSelected(false)
                            setTrucksAvaliableSelected(true)
                        }
                    }
                />

                <Button 
                    title="Inserir Caminhão"
                    width="50%"
                    padding="2%"
                    onClick={
                        () => {
                            setDivLocalState("flex")
                            setTrucksAvaliableSelected(false)
                            setTruckEditSelected(false)
                            setTruckDeleteSelected(false)
                            setTruckInsertSelected(true)
                        }
                    }
                />

                <Button 
                    title="Editar Caminhão"
                    width="50%"
                    padding="2%"
                    onClick={
                        () => {
                            setDivLocalState("flex")
                            setTrucksAvaliableSelected(false)
                            setTruckInsertSelected(false)
                            setTruckDeleteSelected(false)
                            setTruckEditSelected(true)
                        }
                    }
                />

                <Button 
                    title="Excluir Caminhão"
                    width="50%"
                    padding="2%"
                    margin="2% 0% 90% 0%"
                    onClick={ 
                        () => {
                            setDivLocalState("flex")
                            setTrucksAvaliableSelected(false)
                            setTruckInsertSelected(false)
                            setTruckEditSelected(false)
                            setTruckDeleteSelected(true)
                        }
                    }
                   
                />
            </div>

            <TruckActions 
                display={divLocalState} 
                trucksAvailaible={trucksAvaliableSelected}
                truckInsert={truckInsertSelected}
                truckEdit={truckEditSelected}
                truckDelete={truckDeleteSelected} 
            />
        </div>
    )
}