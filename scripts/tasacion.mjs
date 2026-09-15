// Tasación de jugadores para la subasta del Split 3
//
// Calcula un valor por jugador combinando Split 1 (histórico) y Split 2 (reciente),
// y los reparte en tramos de precio de salida.
//
// Ejecutar:  node scripts/tasacion.mjs
//
// Si existe .env.local con SUPABASE_URL + SUPABASE_ANON_KEY, lee los resultados
// reales del Split 2 desde Supabase. Si no, usa solo los datos estáticos del repo
// (jornadas 1-3) y avisa de que la tasación es parcial.

import { readFileSync, existsSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, "..");

// ---------------------------------------------------------------- parámetros

// Pesos de la fórmula de valor. Ajustables por el comité de presidentes.
const PESOS = {
  gol: 1.0,
  asistencia: 0.7,
  mvp: 3.0,
  partidoJugado: 0.8, // premia la fiabilidad: aparecer vale puntos
  roja: -3.0,
  amarilla: -0.5,
};

// Cuánto pesa cada split. El reciente manda.
const PESO_SPLIT2 = 1.0;
const PESO_SPLIT1 = 0.4;

const PRESUPUESTO = 200; // créditos por franquicia
const FICHAS_A_COMPRAR = 7; // 8 plazas menos el presidente, que es gratis

// Número de franquicias. Por defecto 8; se puede pasar por argumento:
//   node scripts/tasacion.mjs 7
const FRANQUICIAS = Number(process.argv[2]) || 8;

// Tramos de precio de salida, como proporción de los jugadores a subastar.
// [nombre, % del total, precio de salida]
const REPARTO_TRAMOS = [
  ["S", 0.14, 25],
  ["A", 0.21, 15],
  ["B", 0.29, 8],
  ["C", 0.36, 3],
];

// Se reparten los cupos exactos según cuántos haya que subastar.
const A_SUBASTAR = FICHAS_A_COMPRAR * FRANQUICIAS;
const TRAMOS = (() => {
  const t = REPARTO_TRAMOS.map(([n, pct, precio]) => [n, Math.round(A_SUBASTAR * pct), precio]);
  // El último tramo absorbe el redondeo para que los cupos sumen exacto.
  const suma = t.reduce((s, [, c]) => s + c, 0);
  t[t.length - 1][1] += A_SUBASTAR - suma;
  return t;
})();

// ---------------------------------------------------------------- utilidades

const norm = (t) =>
  (t ?? "")
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .trim()
    .toUpperCase();

function leerEnvLocal() {
  const p = resolve(root, ".env.local");
  if (!existsSync(p)) return null;
  const env = {};
  for (const linea of readFileSync(p, "utf-8").split("\n")) {
    const i = linea.indexOf("=");
    if (i > 0 && !linea.trim().startsWith("#")) {
      env[linea.slice(0, i).trim()] = linea.slice(i + 1).trim();
    }
  }
  return env;
}

// ------------------------------------------------------- cargar la plantilla

function cargarJugadores() {
  const src = readFileSync(resolve(root, "data/split2/equipos.ts"), "utf-8");
  const jugadores = [];
  let equipoActual = null;

  for (const linea of src.split("\n")) {
    const eq = linea.match(/^\s{4}nombre: "([^"]+)"/);
    if (eq) {
      equipoActual = eq[1];
      continue;
    }
    const id = linea.match(/^\s{8}id: "([^"]+)"/);
    if (id) {
      jugadores.push({ id: id[1], equipoSplit2: equipoActual });
      continue;
    }
    if (!jugadores.length) continue;
    const actual = jugadores[jugadores.length - 1];
    const nom = linea.match(/^\s{8}nombre: "([^"]+)"/);
    if (nom) actual.nombre = nom[1];
    const ape = linea.match(/^\s{8}primerApellido: "([^"]+)"/);
    if (ape) actual.primerApellido = ape[1];
    const apo = linea.match(/^\s{8}apodo: "([^"]+)"/);
    if (apo) actual.apodo = apo[1];
    const ali = linea.match(/^\s{8}alias: \[([^\]]+)\]/);
    if (ali) actual.alias = [...ali[1].matchAll(/"([^"]+)"/g)].map((m) => m[1]);
    const pos = linea.match(/^\s{8}posicion: "([^"]+)"/);
    if (pos) actual.posicion = pos[1];
  }

  for (const j of jugadores) {
    j.nombreCompleto = [j.nombre, j.primerApellido].filter(Boolean).join(" ");
    j.claves = new Set(
      [j.nombreCompleto, j.apodo, ...(j.alias ?? [])].filter(Boolean).map(norm)
    );
    j.s1 = { goles: 0, asistencias: 0, rojas: 0, amarillas: 0 };
    j.s2 = { goles: 0, asistencias: 0, mvps: 0, partidos: new Set() };
  }
  return jugadores;
}

// ------------------------------------------------------------ stats Split 1

function aplicarSplit1(jugadores) {
  const src = readFileSync(resolve(root, "data/split1.ts"), "utf-8");
  const bloque = src.slice(
    src.indexOf("goleadoresSplit1"),
    src.indexOf("export const statsSplit1")
  );
  const filas = [
    ...bloque.matchAll(
      /nombre: "([^"]+)",\s*equipo: "([^"]+)",\s*goles: (\d+),\s*asistencias: (\d+),\s*rojas: (\d+),\s*amarillas: (\d+)/g
    ),
  ];

  let emparejados = 0;
  for (const f of filas) {
    const clave = norm(f[1]);
    const j = jugadores.find((x) => x.claves.has(clave));
    if (!j) continue;
    emparejados++;
    j.s1 = {
      goles: +f[3],
      asistencias: +f[4],
      rojas: +f[5],
      amarillas: +f[6],
    };
  }
  return { totalSplit1: filas.length, emparejados };
}

// ------------------------------------------------------------ stats Split 2

function aplicarSplit2Estatico(jugadores) {
  const src = readFileSync(resolve(root, "data/split2/partidos.ts"), "utf-8");
  const partidos = src.split(/^\s{6}\{$/m);
  let contados = 0;

  for (const p of partidos) {
    if (!p.includes('estado: "Finalizado"')) continue;
    const id = p.match(/id: "([^"]+)"/)?.[1];
    if (!id) continue;
    contados++;

    for (const g of p.matchAll(/\{ jugador: "([^"]+)"(?:, asistente: "([^"]+)")?/g)) {
      anotar(jugadores, id, g[1], "goles");
      if (g[2]) anotar(jugadores, id, g[2], "asistencias");
    }
    const mvp = p.match(/mvp: "([^"]+)"/)?.[1];
    if (mvp) anotar(jugadores, id, mvp, "mvps");
  }
  return contados;
}

async function aplicarSplit2Supabase(jugadores, env) {
  const { createClient } = await import("@supabase/supabase-js");
  const sb = createClient(env.SUPABASE_URL, env.SUPABASE_ANON_KEY);

  const [
    { data: goles, error: errGoles },
    { data: resultados, error: errResultados },
  ] = await Promise.all([
    sb.from("goles").select("partido_id, jugador, asistente"),
    sb.from("resultados").select("partido_id, mvp"),
  ]);

  // Supabase devuelve los fallos en `error`, no lanza. Si no se comprueba,
  // una clave caducada produce una tasación con 0 partidos que parece válida.
  const fallo = errGoles ?? errResultados;
  if (fallo) {
    throw new Error(
      `Supabase respondió con error: ${fallo.message}\n` +
      `       Revisa SUPABASE_URL y SUPABASE_ANON_KEY en .env.local.`
    );
  }

  if (!resultados?.length) {
    throw new Error(
      "Supabase conectó pero devolvió 0 partidos con resultado.\n" +
      "       O la base está vacía o las políticas RLS bloquean la lectura anónima.\n" +
      "       Tasar con esto daría precios basados solo en el Split 1."
    );
  }

  for (const g of goles ?? []) {
    anotar(jugadores, g.partido_id, g.jugador, "goles");
    if (g.asistente) anotar(jugadores, g.partido_id, g.asistente, "asistencias");
  }
  for (const r of resultados) {
    if (r.mvp) anotar(jugadores, r.partido_id, r.mvp, "mvps");
  }
  return resultados.length;
}

const IGNORAR = new Set(["SIN ASISTENCIA", "GOL CEDIDO", "CEDIDO"]);

// "PP" y "Sotto (PP)" son goles en propia puerta, no jugadores.
const esPropiaPuerta = (clave) => clave === "PP" || clave.endsWith("(PP)");

function anotar(jugadores, partidoId, texto, campo) {
  const clave = norm(texto);
  if (!clave || IGNORAR.has(clave) || esPropiaPuerta(clave)) return;
  const j = jugadores.find((x) => x.claves.has(clave));
  if (!j) {
    sinEmparejar.add(texto);
    return;
  }
  if (campo === "mvps") j.s2.mvps++;
  else j.s2[campo]++;
  j.s2.partidos.add(partidoId);
}

const sinEmparejar = new Set();

// ------------------------------------------------------------------- cálculo

function valorar(j) {
  const s2 =
    j.s2.goles * PESOS.gol +
    j.s2.asistencias * PESOS.asistencia +
    j.s2.mvps * PESOS.mvp +
    j.s2.partidos.size * PESOS.partidoJugado;

  const s1 =
    j.s1.goles * PESOS.gol +
    j.s1.asistencias * PESOS.asistencia +
    j.s1.rojas * PESOS.roja +
    j.s1.amarillas * PESOS.amarilla;

  return s2 * PESO_SPLIT2 + s1 * PESO_SPLIT1;
}

// --------------------------------------------------------------------- salida

async function main() {
  const jugadores = cargarJugadores();
  const info1 = aplicarSplit1(jugadores);

  const env = leerEnvLocal();
  let fuente, partidos;
  if (env?.SUPABASE_URL && env?.SUPABASE_ANON_KEY) {
    partidos = await aplicarSplit2Supabase(jugadores, env);
    fuente = "Supabase (Split 2 completo)";
  } else {
    partidos = aplicarSplit2Estatico(jugadores);
    fuente = "datos estáticos del repo (Split 2 PARCIAL)";
  }

  for (const j of jugadores) j.valor = valorar(j);
  jugadores.sort((a, b) => b.valor - a.valor || a.nombreCompleto.localeCompare(b.nombreCompleto));

  // El Split 2 tuvo 21 partidos de liga + 6 de playoff. Con menos que eso,
  // los precios salen sesgados hacia quien jugó las primeras jornadas.
  const PARTIDOS_SPLIT2_COMPLETO = 27;
  const parcial = partidos < PARTIDOS_SPLIT2_COMPLETO;

  console.log("═".repeat(78));
  console.log("  TASACIÓN SPLIT 3 — precios de salida para la subasta");
  console.log("═".repeat(78));
  if (parcial) {
    console.log("");
    console.log("  ██ TASACIÓN PROVISIONAL — NO USAR EN LA SUBASTA ██");
    console.log("");
    console.log(`  Solo se han leído ${partidos} de los ~${PARTIDOS_SPLIT2_COMPLETO} partidos del Split 2.`);
    console.log("  Los jugadores que no aparecen en esos partidos salen infravalorados,");
    console.log("  y los del Split 1 salen sobrevalorados por comparación.");
    console.log("");
    console.log("  Para una tasación real hace falta .env.local con SUPABASE_URL");
    console.log("  y SUPABASE_ANON_KEY apuntando a la base de la liga.");
    console.log("");
    console.log("═".repeat(78));
  }
  console.log(`  Fuente Split 2 : ${fuente}`);
  console.log(`  Partidos leídos: ${partidos}`);
  console.log(`  Split 1        : ${info1.emparejados}/${info1.totalSplit1} jugadores emparejados`);
  console.log(`  Plantilla      : ${jugadores.length} jugadores`);
  console.log("");
  const aSubastar = FICHAS_A_COMPRAR * FRANQUICIAS;
  const plazasTotales = (FICHAS_A_COMPRAR + 1) * FRANQUICIAS; // +1 = el presidente
  const faltan = plazasTotales - jugadores.length;

  console.log(`  Presupuesto    : ${PRESUPUESTO} créditos × ${FRANQUICIAS} franquicias = ${PRESUPUESTO * FRANQUICIAS} en circulación`);
  console.log(`  A subastar     : ${FICHAS_A_COMPRAR} fichas × ${FRANQUICIAS} = ${aSubastar} jugadores`);
  console.log(`  Precio medio   : ${((PRESUPUESTO * FRANQUICIAS) / aSubastar).toFixed(1)} créditos por jugador`);
  console.log("");
  console.log(`  Plazas totales : ${plazasTotales} (${FRANQUICIAS} presidentes + ${aSubastar} subastados)`);
  if (faltan > 0) {
    console.log(`  ⚠ FALTA GENTE  : hay ${jugadores.length} jugadores. Necesitáis ${faltan} más para llenar ${FRANQUICIAS} franquicias.`);
  } else if (faltan < 0) {
    console.log(`  ⚠ SOBRA GENTE  : hay ${jugadores.length} jugadores para ${plazasTotales} plazas. ${-faltan} se quedan fuera.`);
  } else {
    console.log(`  ✓ Cuadra exacto: ${jugadores.length} jugadores para ${plazasTotales} plazas.`);
  }

  const cupoTramos = TRAMOS.reduce((s, [, c]) => s + c, 0);
  if (cupoTramos !== aSubastar) {
    console.log(`  ⚠ TRAMOS       : cubren ${cupoTramos} jugadores pero hay que subastar ${aSubastar}. Ajusta TRAMOS.`);
  }
  console.log("═".repeat(78));
  console.log("");

  let i = 0;
  let sumaBases = 0;
  for (const [nombre, cupo, precio] of TRAMOS) {
    const lote = jugadores.slice(i, i + cupo);
    if (!lote.length) break;
    i += cupo;
    sumaBases += lote.length * precio;

    console.log(`── TRAMO ${nombre} ${"─".repeat(52)} salida ${precio} cr.`);
    for (const j of lote) {
      const etiqueta = j.apodo || j.nombreCompleto;
      const pos = (j.posicion ?? "—").slice(0, 7);
      const nuevo = j.valor === 0 ? "  ← sin historial, tasar a mano" : "";
      console.log(
        `   ${j.valor.toFixed(1).padStart(6)}  ${etiqueta.padEnd(18)} ${pos.padEnd(8)} ` +
        `${String(j.s2.goles + "g/" + j.s2.asistencias + "a/" + j.s2.mvps + "mvp").padEnd(14)}${nuevo}`
      );
    }
    console.log("");
  }

  const sobran = jugadores.slice(i);
  if (sobran.length) {
    console.log(`── SIN TRAMO (${sobran.length}) ${"─".repeat(46)} salida 1 cr.`);
    console.log("   " + sobran.map((j) => j.apodo || j.nombreCompleto).join(", "));
    console.log("");
  }

  console.log("─".repeat(78));
  console.log(`  Suma de precios de salida : ${sumaBases} cr. ` +
    `(${((sumaBases / (PRESUPUESTO * FRANQUICIAS)) * 100).toFixed(0)}% del dinero en circulación)`);
  console.log(`  Margen para pujar         : ${PRESUPUESTO * FRANQUICIAS - sumaBases} cr.`);

  const porteros = jugadores.filter((j) => j.posicion === "Portero");
  console.log(`  Porteros en plantilla     : ${porteros.length} para ${FRANQUICIAS} franquicias` +
    (porteros.length < FRANQUICIAS ? `  ⚠ faltan ${FRANQUICIAS - porteros.length}` : "  ✓"));

  if (sinEmparejar.size) {
    console.log("");
    console.log(`  ⚠ Nombres en actas que no casan con ningún jugador (${sinEmparejar.size}):`);
    console.log("    " + [...sinEmparejar].join(", "));
  }
  console.log("─".repeat(78));
}

main().catch((e) => {
  console.error("Error:", e.message);
  process.exit(1);
});
