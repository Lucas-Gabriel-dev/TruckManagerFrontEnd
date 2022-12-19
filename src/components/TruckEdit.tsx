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

function TruckFound(props : InfoTruck){
    const [divLocalState, setDivLocalState] = useState("");
    const { register, handleSubmit } = useForm<InfoTruck>();

    let divFormTruckEditState = document.getElementById('FormTruckEdit')
    let divTruckFoundEdit = document.getElementById("TruckFoundEdit")

    useEffect(
        () => {
          setDivLocalState(props.display);
        },
        [props.display],
    );

    const onSubmit = async (data: InfoTruck) =>{
        try {
            data.id = props.id

            const response = await api.patch("/UpdateTruck", 
                data
            )

            if(response.status == 200){
                alert("Informações do caminhão alterada!")
                window.location.reload();
            }
        } catch (error: ErrorEvent | any) {
            console.log(error)
        }
    }

    const teste = props.modelYear
    console.log(teste)

    return(
        <form 
            onSubmit={handleSubmit(onSubmit)} 
            id="TruckFoundEdit"
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
                    gridTemplateColumns: "30% 37%",
                    gridTemplateRows: "33% 33% 33%",
                }}
            >
                <label className="normalLabel right">
                    Modelo:
                </label>
                <select 
                    {...register("model")}
                    id="model"
                    defaultValue={props.model}
                    
                    required
                    style={{
                        fontSize: "clamp(1px, 1.5rem, 2vw)",
                        height: "5vh",
                        width: "100%",
                        borderRadius: "6px",
                        border: "2px solid #122F51",
                        alignSelf: "center",

                        marginLeft: "4%"
                    }}
                >
                    <option value="">Selecione</option>
                    <option value="FH">FH</option>
                    <option value="FM">FM</option>
                </select>

                <label className="normalLabel right">
                    Ano de fabricação:
                </label>
                <input 
                    className="InputWidthFull" 
                    {...register("yearManufacture")} 
                    type="text" 
                    defaultValue={props.yearManufacture}
                    required
                />

                <label className="normalLabel right">
                    Ano modelo:
                </label>
                <input 
                    defaultValue={teste}
                    className="InputWidthFull" 
                    {...register("modelYear")} 
                    type="text" 
                    required
                />
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
                    type="button"
                    onClick={() => {
                        setDivLocalState("none"); 
                        divFormTruckEditState!.style.display = "flex";
                        divTruckFoundEdit!.style.display = "none"
                    }}
                />

                <Button 
                    type="submit"
                    title="EDITAR" 
                    width="50%" 
                    padding="1%" 
                />
            </div>
        </form>
    )
}

export function TruckEdit({display} : DisplayDiv){
    const { register, handleSubmit } = useForm<SearchTruck>();
    const [dataTruck, setDataTruck ] = useState<InfoTruck>({
        display: "none",
        id: "0",
        model: "0",
        modelYear: "0",
        yearManufacture: "0"
    });
    const [divLocalState, setDivLocalState] = useState("block");

    useEffect(
        () => {
          setDivLocalState(display);
        },
        [display],
    );
    
    const onSubmit = async (data: SearchTruck) =>{
        let divFormTruckEditState = document.getElementById('FormTruckEdit')
        let divTruckFoundEdit = document.getElementById("TruckFoundEdit")
        
        try {
            const response = await api.get(`/${data.id}`)

            if(response != null){
                await setDataTruck(response.data)
                divFormTruckEditState!.style.display = "none"
                divTruckFoundEdit!.style.display = "block"
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div
            id="PrincipalDiv"
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
                EDITAR CAMINHÃO
            </p>
            
            <div 
                id="FormTruckEdit"
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
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-around"
                    }}
                >
                    <label className="normalLabel left">
                        Digite o ID do caminhão que deseja editar:
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
                            id="ButtonBackEdit" 
                            width="15%" 
                            padding="1%"
                            type="button"
                            onClick={() => window.location.reload()}
                        />

                        <Button 
                            id="ButtonSearch"
                            title="PESQUISAR"
                            width="15%" 
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