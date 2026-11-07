create table if not exists public.vip_registration_capacity (
  id smallint primary key check (id = 1),
  capacity integer not null check (capacity >= 0),
  reserved_count integer not null check (reserved_count >= 0),
  updated_at timestamptz not null default now()
);

insert into public.vip_registration_capacity (id, capacity, reserved_count)
select
  1,
  100,
  count(*)::integer
from public.registrations
where participant_type = 'VIP'
on conflict (id) do nothing;

alter table public.vip_registration_capacity enable row level security;
revoke all on table public.vip_registration_capacity from anon, authenticated;
grant all on table public.vip_registration_capacity to service_role;

create or replace function public.enforce_vip_registration_capacity()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  updated_count integer;
begin
  if new.participant_type = 'VIP'
    and (tg_op = 'INSERT' or old.participant_type is distinct from 'VIP') then
    update public.vip_registration_capacity
    set reserved_count = reserved_count + 1,
        updated_at = now()
    where id = 1
      and reserved_count < capacity
    returning reserved_count into updated_count;

    if not found then
      raise exception 'VIP_REGISTRATION_CLOSED'
        using errcode = 'P0001';
    end if;
  elsif tg_op = 'UPDATE'
    and old.participant_type = 'VIP'
    and new.participant_type is distinct from 'VIP' then
    update public.vip_registration_capacity
    set reserved_count = greatest(reserved_count - 1, 0),
        updated_at = now()
    where id = 1;
  end if;

  return new;
end;
$$;

drop trigger if exists registrations_enforce_vip_capacity
  on public.registrations;

create trigger registrations_enforce_vip_capacity
before insert or update of participant_type
on public.registrations
for each row
execute function public.enforce_vip_registration_capacity();
