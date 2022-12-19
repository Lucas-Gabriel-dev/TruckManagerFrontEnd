import { AllTrucks } from "../api/AllTrucks";
import { Button } from "./Button";

type DisplayDiv = {
    display: string;
}

export function TrucksAvaliable({display}: DisplayDiv){
    const trucks = AllTrucks();

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
                    fontSize: "clamp(1px, 2.2rem, 2vw)",
                    fontWeight: "700",
                    textDecoration: "underline",
                    marginBottom: "2%"
                }}
            >
                Caminhões disponíveis
            </p>
            
            {trucks.map(repo => {
                return(
                    <section
                        style={{
                            fontWeight: "400",
                            borderBottom: "1px solid black",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "space-between",
                            height: "20vh",
                            paddingBottom: "2%",
                            margin: "2% 0px"
                        }}
                    >
                        <p>ID: {repo.id}</p>
                        <p>Modelo: {repo.model}</p>
                        <p>Ano de fabricação: {repo.yearManufacture} </p>
                        <p>Ano modelo: {repo.modelYear}</p>
                    </section>
                )
            })}
            

            <div
                style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "flex-end"
                }}
            >
                <Button 
                    title="VOLTAR" 
                    id="ButtonBack" 
                    width="15%" 
                    padding="1%" 
                    onClick={() => window.location.reload()}
                />
            </div>
        </div>
    )
}