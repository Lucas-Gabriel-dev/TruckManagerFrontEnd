import { useForm } from "react-hook-form";
import { api } from "../lib/axios";
import { Button } from "./Button";

type DisplayDiv = {
    display: string;
}

type InfoTruck = {
    model: string;
    yearManufacture: string;
    modelYear: Number;
}

export function TruckInsert({display} : DisplayDiv){
    const { register, handleSubmit } = useForm<InfoTruck>();

    const onSubmit = async (data: InfoTruck) =>{
        try {
            const response = await api.post("/AddTruck", 
                data
            )
            if(response.status == 200){
                alert("Caminhão adicionado!")
                window.location.reload();
            }
        } catch (error: ErrorEvent | any) {
            console.log(error)
        }
    }

    return(
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
                    textDecoration: "underline"
                }}
            >
                INSERIR CAMINHÃO
            </p>

            <form onSubmit={handleSubmit(onSubmit)}>
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
                    <input className="InputWidthFull" type="text" {...register("yearManufacture", {required: false})} required/>
                
                    <label className="normalLabel right">
                        Ano modelo:
                    </label>
                    <input className="InputWidthFull" type="number" {...register("modelYear")} required/>
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
                        id="ButtonBack" 
                        width="30%" 
                        padding="1%"
                        type="button"
                        onClick={() => window.location.reload()}
                    />

                    <Button 
                        title="ADICIONAR" 
                        id="ButtonBack" 
                        width="30%" 
                        padding="1%" 
                        type="submit"
                    />
                </div>
            </form> 
        </div>
    )
}
