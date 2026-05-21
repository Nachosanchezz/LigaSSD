import { equipos } from "../../data/equipos";
import { nombreCompletoJugador } from "@/lib/helpers";
import PageHeader from "@/components/PageHeader";
import { getJornadasConResultados, getPlayoffConResultados } from "@/lib/queries";
import type { Jornada } from "@/data/partidos";
import type { PartidoPlayoff, EstadoPlayoff } from "@/data/playoffs";
import type { ResumenPartido } from "@/data/partidos";
import EstadisticasTabs, { type FilaEstadistica } from "./EstadisticasTabs";

export const dynamic = "force-dynamic";
export const revalidate = 0;

function normalizarTexto(texto: string) {
  return texto
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .trim()
    .toLowerCase();
}

function esValorIgnorable(texto?: string) {
  if (!texto) return true;
  const valor = normalizarTexto(texto);
  return valor === "sin asistencia" || valor === "gol cedido" || valor === "cedido";
}

function crearMapaJugadores() {
  const mapa: Record<string, { id: string; jugadorMostrado: string; equipo: string; logo: string }> = {};

  for (const equipo of equipos) {
    for (const jugador of equipo.integrantes) {
      const info = {
        id: jugador.id,
        jugadorMostrado: nombreCompletoJugador(jugador),
        equipo: equipo.nombre,
        logo: equipo.logo,
      };

      mapa[normalizarTexto(nombreCompletoJugador(jugador))] = info;
      mapa[normalizarTexto(jugador.nombre)] = info;

      if (jugador.apodo && jugador.apodo.trim() !== "") {
        mapa[normalizarTexto(jugador.apodo)] = info;
      }
    }
  }

  return mapa;
}

function calcularStat(campo: "jugador" | "asistente", jornadas: Jornada[]): FilaEstadistica[] {
  const tabla: Record<string, FilaEstadistica> = {};
  const mapaJugadores = crearMapaJugadores();

  for (const jornada of jornadas) {
    for (const partido of jornada.partidos) {
      if (partido.estado !== "Finalizado" || !partido.resumen) continue;

      for (const gol of [...partido.resumen.local, ...partido.resumen.visitante]) {
        const valor = gol[campo];
        if (esValorIgnorable(valor)) continue;

        const info = mapaJugadores[normalizarTexto(valor!)];
        if (!info) continue;

        if (!tabla[info.id]) {
          tabla[info.id] = { id: info.id, jugador: info.jugadorMostrado, equipo: info.equipo, logo: info.logo, valor: 0 };
        }
        tabla[info.id].valor += 1;
      }
    }
  }

  return Object.values(tabla).sort((a, b) => {
    if (b.valor !== a.valor) return b.valor - a.valor;
    return a.jugador.localeCompare(b.jugador);
  });
}

function calcularMvps(jornadas: Jornada[]): FilaEstadistica[] {
  const tabla: Record<string, FilaEstadistica> = {};
  const mapaJugadores = crearMapaJugadores();

  for (const jornada of jornadas) {
    for (const partido of jornada.partidos) {
      if (partido.estado !== "Finalizado" || !partido.mvp) continue;
      const info = mapaJugadores[normalizarTexto(partido.mvp)];
      if (!info) continue;
      if (!tabla[info.id]) {
        tabla[info.id] = { id: info.id, jugador: info.jugadorMostrado, equipo: info.equipo, logo: info.logo, valor: 0 };
      }
      tabla[info.id].valor += 1;
    }
  }

  return Object.values(tabla).sort((a, b) => {
    if (b.valor !== a.valor) return b.valor - a.valor;
    return a.jugador.localeCompare(b.jugador);
  });
}

function calcularStatPlayoff(campo: "jugador" | "asistente", partidos: PartidoPlayoff[]): FilaEstadistica[] {
  const tabla: Record<string, FilaEstadistica> = {};
  const mapaJugadores = crearMapaJugadores();

  for (const partido of partidos) {
    if ((partido.estado as EstadoPlayoff) !== "Finalizado" || !partido.resumen) continue;

    const resumen = partido.resumen as ResumenPartido;
    for (const gol of [...resumen.local, ...resumen.visitante]) {
      const valor = gol[campo];
      if (esValorIgnorable(valor)) continue;

      const info = mapaJugadores[normalizarTexto(valor!)];
      if (!info) continue;

      if (!tabla[info.id]) {
        tabla[info.id] = { id: info.id, jugador: info.jugadorMostrado, equipo: info.equipo, logo: info.logo, valor: 0 };
      }
      tabla[info.id].valor += 1;
    }
  }

  return Object.values(tabla).sort((a, b) => {
    if (b.valor !== a.valor) return b.valor - a.valor;
    return a.jugador.localeCompare(b.jugador);
  });
}

function calcularMvpsPlayoff(partidos: PartidoPlayoff[]): FilaEstadistica[] {
  const tabla: Record<string, FilaEstadistica> = {};
  const mapaJugadores = crearMapaJugadores();

  for (const partido of partidos) {
    if ((partido.estado as EstadoPlayoff) !== "Finalizado" || !partido.mvp) continue;
    const info = mapaJugadores[normalizarTexto(partido.mvp)];
    if (!info) continue;
    if (!tabla[info.id]) {
      tabla[info.id] = { id: info.id, jugador: info.jugadorMostrado, equipo: info.equipo, logo: info.logo, valor: 0 };
    }
    tabla[info.id].valor += 1;
  }

  return Object.values(tabla).sort((a, b) => {
    if (b.valor !== a.valor) return b.valor - a.valor;
    return a.jugador.localeCompare(b.jugador);
  });
}

export default async function EstadisticasPage() {
  const jornadas = await getJornadasConResultados();
  const goleadores = calcularStat("jugador", jornadas);
  const asistentes = calcularStat("asistente", jornadas);
  const mvps = calcularMvps(jornadas);

  const { cuartos, semifinales, final } = await getPlayoffConResultados();
  const partidosPlayoff = [...cuartos, ...semifinales, final];
  const goleadoresPlayoff = calcularStatPlayoff("jugador", partidosPlayoff);
  const asistentesPlayoff = calcularStatPlayoff("asistente", partidosPlayoff);
  const mvpsPlayoff = calcularMvpsPlayoff(partidosPlayoff);

  const hayDatosPlayoff = goleadoresPlayoff.length > 0 || asistentesPlayoff.length > 0 || mvpsPlayoff.length > 0;

  return (
    <div className="min-h-screen bg-slate-50/50 pb-10 sm:pb-20">
      <PageHeader title="Estadísticas" subtitle="Goleadores, Asistencias y MVPs de la Temporada" />

      <section className="mx-auto max-w-6xl px-3 sm:px-6 -mt-10 sm:-mt-12">
        <EstadisticasTabs
          goleadores={goleadores}
          asistentes={asistentes}
          mvps={mvps}
          goleadoresPlayoff={goleadoresPlayoff}
          asistentesPlayoff={asistentesPlayoff}
          mvpsPlayoff={mvpsPlayoff}
          hayDatosPlayoff={hayDatosPlayoff}
        />
      </section>
    </div>
  );
}
