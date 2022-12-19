import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { api } from "../lib/axios";
import { Button } from "./Button";

type DisplayDiv = {
    display: string;
}

type SearchTruck = {
    id: string;
}

type InfoTruck = {
    id: string;
    model: string;
    yearManufacture: string;
    modelYear: string;
    display: string;
}

async function DeleteActionTruck(id: string)
{
    try {
        const response = await api.delete(`/DeleteTruck/${id}`)

        if(response.status === 200)
        {
            alert("Caminhão deletado da base de dados!")
            location.replace("/");
        }
    } catch (error) {
        console.log(error)
    }
}

export function WarningDeleteMessage(id: SearchTruck){
    const containerNewTask = document.getElementById("ContainerDeleteTask")

    document.getElementById('ButtonDeleteTruck')?.addEventListener('click', () => {
        containerNewTask!.style.display = 'flex'
    })

    document.getElementById('ButtonCancelDelete')?.addEventListener('click', () => {
        console.log("teste")
        containerNewTask!.style.display = 'none'
    })

    return(
        <div id="ContainerDeleteTask"
            style={{
                position: "absolute",
                width: "100vw",
                height: "100vh",
                display: 'none',
                justifyContent: "center",
                alignItems: "center",
                alignSelf: "center",
                top: "0",
                left: "0",
                backgroundColor: "#000000f0"
            }}
        >
            <div id="CreateNewTask"
                style={{
                    width: "60vw",
                    height: "60vh"
                }}
            >
                <p
                    style={{
                        color: "white",
                        textAlign: "center"
                    }}
                > 
                    Você tem certeza que deseja deletar esse caminhão? Essa ação
                    é irreversível! 
                </p>

                <section id="Buttons"
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        marginTop: "10%"
                    }}
                >
                    <Button 
                        id="ButtonCancelDelete" 
                        title="Cancelar" 
                        width="25%" 
                        padding="2%"
                    />

                    <Button 
                        // id="ButtonDeleteTruck" 
                        onClick={() => DeleteActionTruck(id.id)}
                        type="button" 
                        title="Apagar" 
                        width="25%" 
                        padding="2%"
                        warning={true}
                    />
                </section>
            </div>
        </div>
    )
}

function TruckFound(props : InfoTruck){
    const [divLocalState, setDivLocalState] = useState("");
    
    let divFormTruckDeleteState = document.getElementById('FormTruckDelete')
    let divTruckFoundDelete = document.getElementById("TruckFoundDelete")

    useEffect(
        () => {
          setDivLocalState(props.display);
        },
        [props.display],
    );

    return(
        <div
            id="TruckFoundDelete"
            style={{
                display: divLocalState,
            }}
        >
            <section 
                className="content"
                style={{
                    fontWeight: "400",
                    width: "80%",
                    height: "35vh",
                    margin: "auto",
                    display: "grid",
                    gridTemplateColumns: "30% 37%"
                }}
            >
                <label className="normalLabel right">
                    Id:
                </label>
                <span className="spanInfo">{props.id}</span>

                <label className="normalLabel right">
                    Modelo:
                </label>
                <span className="spanInfo">{props.model}</span>

                <label className="normalLabel right">
                    Ano de fabricação:
                </label>
                <span className="spanInfo">{props.yearManufacture}</span>

                <label className="normalLabel right">
                    Ano modelo:
                </label>
                <span className="spanInfo">{props.modelYear}</span>
            </section>
            
            <div
                style={{
                    width: "60%",
                    display: "flex",
                    justifyContent: "center",
                    margin: "auto"
                }}
            >
                <Button 
                    title="VOLTAR"
                    width="50%" 
                    padding="1%"
                    onClick={() => {
                        setDivLocalState("none"); 
                        divFormTruckDeleteState!.style.display = "flex";
                        divTruckFoundDelete!.style.display = "none"
                    }}
                />

                <Button
                    title="DELETAR"
                    id="ButtonDeleteTruck" 
                    warning={true}
                    width="50%" 
                    padding="1%" 
                />
            </div>

            <WarningDeleteMessage id={props.id}/>
        </div>
    )
}

export function TruckDelete({display}: DisplayDiv){
    const [divLocalState, setDivLocalState] = useState("block");
    
    const { register, handleSubmit } = useForm<SearchTruck>();
    const [dataTruck, setDataTruck ] = useState<InfoTruck>({
        display: "none",
        id: "0",
        model: "0",
        modelYear: "0",
        yearManufacture: "0"
    });

    useEffect(
        () => {
          setDivLocalState(display);
        },
        [display],
    );

    const onSubmit = async (data: SearchTruck) =>{
        let divFormTruckDeleteState = document.getElementById('FormTruckDelete')
        let divTruckFoundDelete = document.getElementById("TruckFoundDelete")
        
        try {
            const response = await api.get(`/${data.id}`)

            if(response != null){
                await setDataTruck(response.data)
                divFormTruckDeleteState!.style.display = "none"
                divTruckFoundDelete!.style.display = "block"
            }
        } catch (error) {
            if(error){
                document.querySelector("#TitleErrorDelete")!.innerHTML = "Este id não existe!"
            }
        }
    }

    return (
        <div
            style={{
                fontFamily: "Roboto, sans-serif",
                color: "black",
                display: display
            }}
        >
            <p
                style={{
                    textAlign: "center",
                    fontSize: "clamp(1px, 2.2rem, 2vw)",
                    fontWeight: "700",
                    textDecoration: "underline",
                    marginBottom: "2%"
                }}
            >
                EXCLUIR CAMINHÃO
            </p>
            
            <p
                id="TitleErrorDelete"
                style={{
                    textAlign: "center",
                    color: "red"
                }}
            >
            </p>
            
            <div 
                id="FormTruckDelete"
                style={{
                    display: divLocalState,
                }}
            >
                <form onSubmit={handleSubmit(onSubmit)}
                    style={{
                        fontWeight: "400",
                        width: "70%",
                        height: "20vh",
                        margin: "4% auto",
                        display: "grid",
                        flexDirection: "column",
                        justifyContent: "space-around"
                    }}
                >
                    <label className="normalLabel left">
                        Digite o ID do caminhão que deseja excluir:
                    </label>

                    <input className="InputSmall" type="number" {...register("id")} required/> 

                    <div
                        style={{
                            width: "100%",
                            display: "flex",
                            justifyContent: "CENTER"
                        }}
                    >
                        <Button 
                            title="VOLTAR" 
                            id="ButtonBack" 
                            width="30%" 
                            padding="1%"
                            type="button"
                            onClick={() => window.location.reload()}
                        />

                        <Button 
                            id="ButtonSearch"
                            title="PESQUISAR" 
                            width="30%" 
                            padding="1%" 
                            type="submit"
                        />
                    </div> 
                </form>
            </div>

            {
                dataTruck.model != "0" 
                ? 
                    <TruckFound 
                        display={"block"}
                        id={dataTruck!.id} 
                        model={dataTruck!.model}
                        modelYear={dataTruck!.modelYear}
                        yearManufacture={dataTruck!.yearManufacture}
                    />
                : ""
            }
        </div>
    )
}
