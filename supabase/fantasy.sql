-- Liga SSD — Fantasy + actas de asistencia
-- Ejecutar en: Supabase > SQL Editor > New query
-- (se puede ejecutar varias veces sin romper nada)

-- ---------------------------------------------------------------- asistencia
-- Quién jugó cada partido. Se rellena desde /admin junto con el acta y sirve
-- para no regalar puntos del fantasy a quien no estuvo, y para contar de
-- verdad los partidos jugados de cada uno.
create table if not exists alineaciones (
  partido_id  text not null,
  equipo_tipo text not null check (equipo_tipo in ('local', 'visitante')),
  jugador     text not null,
  created_at  timestamptz default now(),
  primary key (partido_id, equipo_tipo, jugador)
);

alter table alineaciones enable row level security;

do $$ begin
  create policy "Public read alineaciones" on alineaciones for select to anon using (true);
exception when duplicate_object then null;
end $$;

-- ------------------------------------------------------------------- fantasy
-- Un participante por persona de la liga. El PIN nunca se guarda en claro.
create table if not exists fantasy_usuarios (
  persona_id text primary key,
  pin_hash   text not null,
  created_at timestamptz default now()
);

-- El cinco de cada participante en cada jornada.
create table if not exists fantasy_equipos (
  persona_id text not null references fantasy_usuarios(persona_id) on delete cascade,
  jornada    int  not null,
  jugadores  text[] not null,
  capitan    text not null,
  updated_at timestamptz default now(),
  primary key (persona_id, jornada)
);

-- Sin política para anon: las tablas del fantasy solo se tocan desde el
-- servidor con la service_role key, que se salta RLS.
alter table fantasy_usuarios enable row level security;
alter table fantasy_equipos  enable row level security;
