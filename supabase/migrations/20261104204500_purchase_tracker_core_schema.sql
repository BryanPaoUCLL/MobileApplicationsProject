-- Core schema for tracking game-related purchases and comparing regional prices.
-- Monetary values are stored as integer minor units. Currency metadata defines
-- how many minor digits each currency uses (for example, EUR = 2 and JPY = 0).

create function public.set_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create table public.currencies (
  code text primary key check (code ~ '^[A-Z]{3}$'),
  name text not null check (char_length(trim(name)) between 1 and 80),
  symbol text not null check (char_length(symbol) between 1 and 8),
  minor_unit smallint not null check (minor_unit between 0 and 6),
  is_enabled boolean not null default true
);

insert into public.currencies (code, name, symbol, minor_unit)
values
  ('AUD', 'Australian Dollar', 'A$', 2),
  ('CAD', 'Canadian Dollar', 'C$', 2),
  ('CHF', 'Swiss Franc', 'CHF', 2),
  ('CNY', 'Chinese Yuan', 'CN¥', 2),
  ('EUR', 'Euro', '€', 2),
  ('GBP', 'Pound Sterling', '£', 2),
  ('JPY', 'Japanese Yen', '¥', 0),
  ('KRW', 'South Korean Won', '₩', 0),
  ('USD', 'US Dollar', '$', 2);

create table public.categories (
  slug text primary key check (slug ~ '^[a-z][a-z0-9_]*$'),
  name text not null unique check (char_length(trim(name)) between 1 and 80),
  parent_slug text references public.categories (slug) on delete restrict,
  sort_order smallint not null default 0,
  is_active boolean not null default true,
  check (parent_slug is null or parent_slug <> slug)
);

insert into public.categories (slug, name, parent_slug, sort_order)
values
  ('base_game', 'Base game', null, 10),
  ('dlc', 'DLC or expansion', null, 20),
  ('microtransaction', 'Microtransaction', null, 30),
  ('subscription', 'Subscription', null, 40),
  ('other', 'Other', null, 90),
  ('cosmetic', 'Cosmetic', 'microtransaction', 31),
  ('virtual_currency', 'Virtual currency', 'microtransaction', 32),
  ('loot_box', 'Loot box', 'microtransaction', 33),
  ('battle_pass', 'Battle pass', 'microtransaction', 34),
  ('convenience', 'Convenience or pay-to-progress', 'microtransaction', 35);

create table public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  display_name text not null check (char_length(trim(display_name)) between 1 and 80),
  default_currency text not null default 'EUR'
    references public.currencies (code) on update cascade,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.companies (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid()
    references auth.users (id) on delete cascade,
  name text not null check (char_length(trim(name)) between 1 and 160),
  country_code text check (country_code is null or country_code ~ '^[A-Z]{2}$'),
  website_url text,
  logo_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (id, user_id)
);

create unique index companies_user_name_unique
on public.companies (user_id, lower(name));

create table public.games (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid()
    references auth.users (id) on delete cascade,
  name text not null check (char_length(trim(name)) between 1 and 160),
  release_date date,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (id, user_id)
);

create unique index games_user_name_unique
on public.games (user_id, lower(name));

create table public.game_companies (
  user_id uuid not null default auth.uid()
    references auth.users (id) on delete cascade,
  game_id uuid not null,
  company_id uuid not null,
  role text not null check (role in ('developer', 'publisher', 'distributor')),
  is_primary boolean not null default false,
  created_at timestamptz not null default now(),
  primary key (game_id, company_id, role),
  foreign key (game_id, user_id)
    references public.games (id, user_id) on delete cascade,
  foreign key (company_id, user_id)
    references public.companies (id, user_id) on delete cascade
);

create table public.products (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid()
    references auth.users (id) on delete cascade,
  game_id uuid,
  category_slug text not null references public.categories (slug) on update cascade,
  name text not null check (char_length(trim(name)) between 1 and 200),
  description text check (
    description is null or char_length(trim(description)) between 1 and 1000
  ),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (id, user_id),
  foreign key (game_id, user_id)
    references public.games (id, user_id) on delete cascade
);

create table public.stores (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid()
    references auth.users (id) on delete cascade,
  company_id uuid,
  name text not null check (char_length(trim(name)) between 1 and 120),
  website_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (id, user_id),
  foreign key (company_id, user_id)
    references public.companies (id, user_id) on delete set null (company_id)
);

create unique index stores_user_name_unique
on public.stores (user_id, lower(name));

create table public.regional_prices (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid()
    references auth.users (id) on delete cascade,
  product_id uuid not null,
  store_id uuid not null,
  region_code text not null check (region_code ~ '^[A-Z]{2}$'),
  amount_minor bigint not null check (amount_minor >= 0),
  currency_code text not null references public.currencies (code) on update cascade,
  tax_included boolean,
  is_available boolean not null default true,
  observed_at timestamptz not null default now(),
  source_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (id, user_id, product_id),
  unique (product_id, store_id, region_code, currency_code, observed_at),
  foreign key (product_id, user_id)
    references public.products (id, user_id) on delete cascade,
  foreign key (store_id, user_id)
    references public.stores (id, user_id) on delete cascade
);

create table public.exchange_rates (
  id bigint generated always as identity primary key,
  base_currency text not null references public.currencies (code) on update cascade,
  quote_currency text not null references public.currencies (code) on update cascade,
  rate numeric(24, 12) not null check (rate > 0),
  effective_at timestamptz not null,
  provider text not null check (char_length(trim(provider)) between 1 and 80),
  created_at timestamptz not null default now(),
  unique (base_currency, quote_currency, effective_at, provider),
  check (base_currency <> quote_currency)
);

create table public.subscriptions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid()
    references auth.users (id) on delete cascade,
  product_id uuid not null,
  store_id uuid,
  amount_minor bigint not null check (amount_minor > 0),
  currency_code text not null references public.currencies (code) on update cascade,
  billing_interval smallint not null default 1 check (billing_interval > 0),
  billing_unit text not null check (billing_unit in ('day', 'week', 'month', 'year')),
  started_on date not null default current_date,
  next_billing_on date,
  ended_on date,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (id, user_id, product_id),
  foreign key (product_id, user_id)
    references public.products (id, user_id) on delete cascade,
  foreign key (store_id, user_id)
    references public.stores (id, user_id) on delete set null (store_id),
  check (ended_on is null or ended_on >= started_on)
);

create table public.purchases (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid()
    references auth.users (id) on delete cascade,
  product_id uuid not null,
  store_id uuid,
  regional_price_id uuid,
  subscription_id uuid,
  amount_minor bigint not null check (amount_minor > 0),
  currency_code text not null references public.currencies (code) on update cascade,
  region_code text check (region_code is null or region_code ~ '^[A-Z]{2}$'),
  purchased_at timestamptz not null default now(),
  notes text check (notes is null or char_length(trim(notes)) between 1 and 1000),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  foreign key (product_id, user_id)
    references public.products (id, user_id) on delete restrict,
  foreign key (store_id, user_id)
    references public.stores (id, user_id) on delete set null (store_id),
  foreign key (regional_price_id, user_id, product_id)
    references public.regional_prices (id, user_id, product_id)
    on delete set null (regional_price_id),
  foreign key (subscription_id, user_id, product_id)
    references public.subscriptions (id, user_id, product_id)
    on delete set null (subscription_id)
);

create index companies_user_id_idx on public.companies (user_id);
create index games_user_id_idx on public.games (user_id);
create index game_companies_company_owner_idx
  on public.game_companies (company_id, user_id);
create index products_user_id_idx on public.products (user_id);
create index products_game_owner_idx on public.products (game_id, user_id);
create index products_category_idx on public.products (category_slug);
create index stores_user_id_idx on public.stores (user_id);
create index stores_company_owner_idx on public.stores (company_id, user_id);
create index regional_prices_product_latest_idx
  on public.regional_prices (product_id, observed_at desc);
create index regional_prices_store_owner_idx
  on public.regional_prices (store_id, user_id);
create index exchange_rates_pair_effective_idx
  on public.exchange_rates (base_currency, quote_currency, effective_at desc);
create index subscriptions_user_active_idx
  on public.subscriptions (user_id, is_active, next_billing_on);
create index subscriptions_product_owner_idx
  on public.subscriptions (product_id, user_id);
create index subscriptions_store_owner_idx
  on public.subscriptions (store_id, user_id);
create index purchases_user_purchased_at_idx
  on public.purchases (user_id, purchased_at desc);
create index purchases_product_owner_idx
  on public.purchases (product_id, user_id);
create index purchases_store_owner_idx
  on public.purchases (store_id, user_id);
create index purchases_regional_price_owner_product_idx
  on public.purchases (regional_price_id, user_id, product_id);
create index purchases_subscription_owner_product_idx
  on public.purchases (subscription_id, user_id, product_id);

create trigger profiles_set_updated_at
before update on public.profiles
for each row execute function public.set_updated_at();

create trigger companies_set_updated_at
before update on public.companies
for each row execute function public.set_updated_at();

create trigger games_set_updated_at
before update on public.games
for each row execute function public.set_updated_at();

create trigger products_set_updated_at
before update on public.products
for each row execute function public.set_updated_at();

create trigger stores_set_updated_at
before update on public.stores
for each row execute function public.set_updated_at();

create trigger regional_prices_set_updated_at
before update on public.regional_prices
for each row execute function public.set_updated_at();

create trigger subscriptions_set_updated_at
before update on public.subscriptions
for each row execute function public.set_updated_at();

create trigger purchases_set_updated_at
before update on public.purchases
for each row execute function public.set_updated_at();

create function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.profiles (id, display_name, default_currency)
  values (
    new.id,
    coalesce(
      nullif(trim(new.raw_user_meta_data ->> 'full_name'), ''),
      split_part(coalesce(new.email, 'gamer'), '@', 1)
    ),
    'EUR'
  );
  return new;
end;
$$;

insert into public.profiles (id, display_name, default_currency)
select
  id,
  coalesce(
    nullif(trim(raw_user_meta_data ->> 'full_name'), ''),
    split_part(coalesce(email, 'gamer'), '@', 1)
  ),
  'EUR'
from auth.users
on conflict (id) do nothing;

create trigger on_auth_user_created
after insert on auth.users
for each row execute function public.handle_new_user();

alter table public.currencies enable row level security;
alter table public.categories enable row level security;
alter table public.profiles enable row level security;
alter table public.companies enable row level security;
alter table public.games enable row level security;
alter table public.game_companies enable row level security;
alter table public.products enable row level security;
alter table public.stores enable row level security;
alter table public.regional_prices enable row level security;
alter table public.exchange_rates enable row level security;
alter table public.subscriptions enable row level security;
alter table public.purchases enable row level security;

create policy "Currencies are readable by authenticated users"
on public.currencies for select to authenticated using (true);

create policy "Categories are readable by authenticated users"
on public.categories for select to authenticated using (true);

create policy "Exchange rates are readable by authenticated users"
on public.exchange_rates for select to authenticated using (true);

create policy "Profiles are readable by their owner"
on public.profiles for select to authenticated
using ((select auth.uid()) = id);

create policy "Profiles are insertable by their owner"
on public.profiles for insert to authenticated
with check ((select auth.uid()) = id);

create policy "Profiles are updatable by their owner"
on public.profiles for update to authenticated
using ((select auth.uid()) = id)
with check ((select auth.uid()) = id);

create policy "Companies are owned by their user"
on public.companies for all to authenticated
using ((select auth.uid()) = user_id)
with check ((select auth.uid()) = user_id);

create policy "Games are owned by their user"
on public.games for all to authenticated
using ((select auth.uid()) = user_id)
with check ((select auth.uid()) = user_id);

create policy "Game companies are owned by their user"
on public.game_companies for all to authenticated
using ((select auth.uid()) = user_id)
with check ((select auth.uid()) = user_id);

create policy "Products are owned by their user"
on public.products for all to authenticated
using ((select auth.uid()) = user_id)
with check ((select auth.uid()) = user_id);

create policy "Stores are owned by their user"
on public.stores for all to authenticated
using ((select auth.uid()) = user_id)
with check ((select auth.uid()) = user_id);

create policy "Regional prices are owned by their user"
on public.regional_prices for all to authenticated
using ((select auth.uid()) = user_id)
with check ((select auth.uid()) = user_id);

create policy "Subscriptions are owned by their user"
on public.subscriptions for all to authenticated
using ((select auth.uid()) = user_id)
with check ((select auth.uid()) = user_id);

create policy "Purchases are owned by their user"
on public.purchases for all to authenticated
using ((select auth.uid()) = user_id)
with check ((select auth.uid()) = user_id);

revoke all privileges on table public.currencies from anon, authenticated;
revoke all privileges on table public.categories from anon, authenticated;
revoke all privileges on table public.profiles from anon, authenticated;
revoke all privileges on table public.companies from anon, authenticated;
revoke all privileges on table public.games from anon, authenticated;
revoke all privileges on table public.game_companies from anon, authenticated;
revoke all privileges on table public.products from anon, authenticated;
revoke all privileges on table public.stores from anon, authenticated;
revoke all privileges on table public.regional_prices from anon, authenticated;
revoke all privileges on table public.exchange_rates from anon, authenticated;
revoke all privileges on table public.subscriptions from anon, authenticated;
revoke all privileges on table public.purchases from anon, authenticated;
revoke all privileges on sequence public.exchange_rates_id_seq from anon, authenticated;

revoke execute on function public.set_updated_at() from public, anon, authenticated;
revoke execute on function public.handle_new_user() from public, anon, authenticated;

grant usage on schema public to authenticated;
grant select on table public.currencies to authenticated;
grant select on table public.categories to authenticated;
grant select, insert, update on table public.profiles to authenticated;
grant select, insert, update, delete on table public.companies to authenticated;
grant select, insert, update, delete on table public.games to authenticated;
grant select, insert, update, delete on table public.game_companies to authenticated;
grant select, insert, update, delete on table public.products to authenticated;
grant select, insert, update, delete on table public.stores to authenticated;
grant select, insert, update, delete on table public.regional_prices to authenticated;
grant select on table public.exchange_rates to authenticated;
grant select, insert, update, delete on table public.subscriptions to authenticated;
grant select, insert, update, delete on table public.purchases to authenticated;
