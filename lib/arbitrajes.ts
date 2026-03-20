import { jornadas } from "@/data/partidos";

export function getArbitrajesDeEquipo(nombreEquipo: string) {
    const arbitrajes = jornadas.flatMap((jornada) =>
        jornada.partidos
            .filter(
                (partido) =>
                    partido.estado === "Finalizado" &&
                    partido.arbitra === nombreEquipo
            )
            .map((partido) => ({
                jornada: jornada.numero,
                id: partido.id,
                local: partido.local,
                visitante: partido.visitante,
                resultado: partido.resultado,
                dia: partido.dia,
                hora: partido.hora,
                campo: partido.campo,
            }))
    );

    return {
        total: arbitrajes.length,
        arbitrajes,
    };
}