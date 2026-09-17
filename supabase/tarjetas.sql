-- Liga SSD — Tarjetas del acta
-- Ejecutar en: Supabase > SQL Editor > New query
-- (se puede ejecutar varias veces sin romper nada)

create table if not exists tarjetas (
  id          serial primary key,
  partido_id  text not null references resultados(partido_id) on delete cascade,
  equipo_tipo text not null check (equipo_tipo in ('local', 'visitante')),
  jugador     text not null,
  tipo        text not null check (tipo in ('amarilla', 'roja')),
  minuto      integer,
  orden       integer not null default 0,
  created_at  timestamptz default now()
);

alter table tarjetas enable row level security;

do $$ begin
  create policy "Public read tarjetas" on tarjetas for select to anon using (true);
exception when duplicate_object then null;
end $$;
