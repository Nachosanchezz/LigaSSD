// Script para cargar los resultados de las jornadas 1-3 en Supabase
// Ejecutar: node scripts/seed-jornadas-1-3.mjs

import { createClient } from "@supabase/supabase-js";
import { readFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

// Leer .env.local manualmente
const envPath = resolve(__dirname, "../.env.local");
const envContent = readFileSync(envPath, "utf-8");
const env = Object.fromEntries(
  envContent
    .split("\n")
    .filter((l) => l.includes("="))
    .map((l) => {
      const idx = l.indexOf("=");
      return [l.slice(0, idx).trim(), l.slice(idx + 1).trim()];
    })
);

const supabase = createClient(env.SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY, {
  auth: { autoRefreshToken: false, persistSession: false },
});

const resultados = [
  // JORNADA 1
  {
    partido_id: "j1-atalaya-bodo-dream",
    resultado: "4-4",
    mvp: "JIMMY",
    goles: [
      { equipo_tipo: "local", jugador: "Nico Marín", asistente: "Borja Urrutia", orden: 0 },
      { equipo_tipo: "local", jugador: "Fernando Diez", asistente: "Borja Urrutia", orden: 1 },
      { equipo_tipo: "local", jugador: "Borja Urrutia", asistente: "Nico Marín", orden: 2 },
      { equipo_tipo: "local", jugador: "Nachito", asistente: null, orden: 3 },
      { equipo_tipo: "visitante", jugador: "Enrique Vivar", asistente: "Juan Sánchez", orden: 0 },
      { equipo_tipo: "visitante", jugador: "Nacho Ramírez", asistente: "Nicolás Sánchez", orden: 1 },
      { equipo_tipo: "visitante", jugador: "Nicolás Sánchez", asistente: "Pablo Hurtado", orden: 2 },
      { equipo_tipo: "visitante", jugador: "Nicolás Sánchez", asistente: "Nacho Ramírez", orden: 3 },
    ],
  },
  {
    partido_id: "j1-old-school-acai-boys",
    resultado: "5-3",
    mvp: "RAFA",
    goles: [
      { equipo_tipo: "local", jugador: "Unai", asistente: "Rafael Llopis", orden: 0 },
      { equipo_tipo: "local", jugador: "Gon Ayllón", asistente: "Rafael Llopis", orden: 1 },
      { equipo_tipo: "local", jugador: "Jaime de Sala", asistente: "Cifu", orden: 2 },
      { equipo_tipo: "local", jugador: "Rafael Llopis", asistente: null, orden: 3 },
      { equipo_tipo: "local", jugador: "Jaime de Sala", asistente: "Rafael Llopis", orden: 4 },
      { equipo_tipo: "visitante", jugador: "Arturo", asistente: null, orden: 0 },
      { equipo_tipo: "visitante", jugador: "Gol cedido", asistente: null, orden: 1 },
      { equipo_tipo: "visitante", jugador: "Gol cedido", asistente: null, orden: 2 },
    ],
  },
  // JORNADA 2
  {
    partido_id: "j2-torre-beldes-old-school",
    resultado: "9-5",
    mvp: "COCO",
    goles: [
      { equipo_tipo: "local", jugador: "Coco", asistente: "Miguel Morán", orden: 0 },
      { equipo_tipo: "local", jugador: "Coco", asistente: "Miguel Morán", orden: 1 },
      { equipo_tipo: "local", jugador: "Lucho", asistente: null, orden: 2 },
      { equipo_tipo: "local", jugador: "Coco", asistente: null, orden: 3 },
      { equipo_tipo: "local", jugador: "Coco", asistente: "Louis", orden: 4 },
      { equipo_tipo: "local", jugador: "Miguel Morán", asistente: "Lucho", orden: 5 },
      { equipo_tipo: "local", jugador: "Gabi", asistente: "Lucho", orden: 6 },
      { equipo_tipo: "local", jugador: "Coco", asistente: "Miguel Morán", orden: 7 },
      { equipo_tipo: "local", jugador: "Miguel Morán", asistente: "Gabi", orden: 8 },
      { equipo_tipo: "visitante", jugador: "Unai", asistente: "Rafael Llopis", orden: 0 },
      { equipo_tipo: "visitante", jugador: "Rafael Llopis", asistente: null, orden: 1 },
      { equipo_tipo: "visitante", jugador: "Cifu", asistente: "Rafael Llopis", orden: 2 },
      { equipo_tipo: "visitante", jugador: "Unai", asistente: "Cifu", orden: 3 },
      { equipo_tipo: "visitante", jugador: "Cedido", asistente: null, orden: 4 },
    ],
  },
  {
    partido_id: "j2-acai-boys-atalaya",
    resultado: "4-4",
    mvp: "JIMMY",
    goles: [
      { equipo_tipo: "local", jugador: "Pato", asistente: "Charly", minuto: 13, orden: 0 },
      { equipo_tipo: "local", jugador: "Pueyo", asistente: "Pato", minuto: 29, orden: 1 },
      { equipo_tipo: "local", jugador: "Cedido", asistente: "Mario", minuto: 30, orden: 2 },
      { equipo_tipo: "local", jugador: "Cedido", asistente: null, minuto: 40, orden: 3 },
      { equipo_tipo: "visitante", jugador: "Fer", asistente: "Urru", minuto: 10, orden: 0 },
      { equipo_tipo: "visitante", jugador: "Nico Marín", asistente: "Fer", minuto: 17, orden: 1 },
      { equipo_tipo: "visitante", jugador: "Nico Marín", asistente: "Fer", minuto: 25, orden: 2 },
      { equipo_tipo: "visitante", jugador: "Jimmy", asistente: null, minuto: 37, orden: 3 },
    ],
  },
  // JORNADA 3
  {
    partido_id: "j3-torre-beldes-bodo-dream",
    resultado: "4-6",
    mvp: "PEDRO",
    goles: [
      { equipo_tipo: "local", jugador: "Lucho", asistente: null, minuto: 1, orden: 0 },
      { equipo_tipo: "local", jugador: "Gabi", asistente: "Miguel Morán", minuto: 4, orden: 1 },
      { equipo_tipo: "local", jugador: "Gabi", asistente: "Miguel Morán", minuto: 23, orden: 2 },
      { equipo_tipo: "local", jugador: "Miguel Morán", asistente: null, minuto: 31, orden: 3 },
      { equipo_tipo: "visitante", jugador: "Nico Sánchez", asistente: "Nacho Ram", minuto: 10, orden: 0 },
      { equipo_tipo: "visitante", jugador: "Nacho Ram", asistente: "Nico Sánchez", minuto: 19, orden: 1 },
      { equipo_tipo: "visitante", jugador: "Sotto (PP)", asistente: null, minuto: 24, orden: 2 },
      { equipo_tipo: "visitante", jugador: "Juninho", asistente: null, minuto: 26, orden: 3 },
      { equipo_tipo: "visitante", jugador: "Nico Sánchez", asistente: "Nacho Ram", minuto: 27, orden: 4 },
      { equipo_tipo: "visitante", jugador: "Nacho Ram", asistente: null, minuto: 34, orden: 5 },
    ],
  },
  {
    partido_id: "j3-filosofos-acai-boys",
    resultado: "5-4",
    mvp: "CHARLY",
    goles: [
      { equipo_tipo: "local", jugador: "Cedido", asistente: "Chete", minuto: 6, orden: 0 },
      { equipo_tipo: "local", jugador: "Vasal JR", asistente: null, minuto: 8, orden: 1 },
      { equipo_tipo: "local", jugador: "Vasal JR", asistente: null, minuto: 30, orden: 2 },
      { equipo_tipo: "local", jugador: "Cedido", asistente: null, minuto: 37, orden: 3 },
      { equipo_tipo: "local", jugador: "Cedido", asistente: null, minuto: 40, orden: 4 },
      { equipo_tipo: "visitante", jugador: "Cedido", asistente: "Mario", minuto: 12, orden: 0 },
      { equipo_tipo: "visitante", jugador: "Pato", asistente: "Charly", minuto: 23, orden: 1 },
      { equipo_tipo: "visitante", jugador: "Pueyo", asistente: "Charly", minuto: 31, orden: 2 },
      { equipo_tipo: "visitante", jugador: "Charly", asistente: "Pueyo", minuto: 38, orden: 3 },
    ],
  },
  {
    partido_id: "j3-spiti2-atalaya",
    resultado: "5-3",
    mvp: "BORJITA",
    goles: [
      { equipo_tipo: "local", jugador: "Borjita", asistente: null, minuto: 11, orden: 0 },
      { equipo_tipo: "local", jugador: "Cedido", asistente: null, minuto: 26, orden: 1 },
      { equipo_tipo: "local", jugador: "Caco", asistente: null, minuto: 32, orden: 2 },
      { equipo_tipo: "local", jugador: "Borjita", asistente: null, minuto: 34, orden: 3 },
      { equipo_tipo: "local", jugador: "Cedido", asistente: null, minuto: 36, orden: 4 },
      { equipo_tipo: "visitante", jugador: "Nico Marín", asistente: "Barca", minuto: 11, orden: 0 },
      { equipo_tipo: "visitante", jugador: "Urru", asistente: "Fer", minuto: 31, orden: 1 },
      { equipo_tipo: "visitante", jugador: "Cedido", asistente: "Rome", minuto: 35, orden: 2 },
    ],
  },
];

async function seed() {
  console.log("Insertando resultados de jornadas 1-3 en Supabase...\n");

  for (const { partido_id, resultado, mvp, goles } of resultados) {
    // Upsert resultado
    const { error: e1 } = await supabase
      .from("resultados")
      .upsert({ partido_id, resultado, mvp }, { onConflict: "partido_id" });

    if (e1) {
      console.error(`❌ Error en resultados para ${partido_id}:`, e1.message);
      continue;
    }

    // Borrar goles existentes
    await supabase.from("goles").delete().eq("partido_id", partido_id);

    // Insertar goles
    if (goles.length > 0) {
      const golesRows = goles.map((g) => ({ ...g, partido_id }));
      const { error: e2 } = await supabase.from("goles").insert(golesRows);
      if (e2) {
        console.error(`❌ Error en goles para ${partido_id}:`, e2.message);
        continue;
      }
    }

    console.log(`✅ ${partido_id}: ${resultado} (MVP: ${mvp})`);
  }

  console.log("\nListo.");
}

seed().catch(console.error);
