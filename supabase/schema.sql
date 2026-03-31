-- Liga SSD — Schema Supabase
-- Ejecutar en: Supabase > SQL Editor > New query

create table if not exists resultados (
  partido_id  text primary key,
  resultado   text not null,
  mvp         text,
  created_at  timestamptz default now(),
  updated_at  timestamptz default now()
);

create table if not exists goles (
  id          serial primary key,
  partido_id  text not null references resultados(partido_id) on delete cascade,
  equipo_tipo text not null check (equipo_tipo in ('local', 'visitante')),
  jugador     text not null,
  asistente   text,
  minuto      integer,
  orden       integer not null default 0,
  created_at  timestamptz default now()
);

-- Seguridad a nivel de fila
alter table resultados enable row level security;
alter table goles      enable row level security;

-- Lectura pública (clave anon puede leer)
create policy "Public read resultados" on resultados for select to anon using (true);
create policy "Public read goles"      on goles      for select to anon using (true);

-- El service_role bypasea RLS automáticamente (escritura desde el admin)
