-- Cover foreign keys that are not already the leading columns of an index.

create index categories_parent_slug_idx
  on public.categories (parent_slug);

create index profiles_default_currency_idx
  on public.profiles (default_currency);

create index game_companies_game_owner_idx
  on public.game_companies (game_id, user_id);

create index game_companies_user_id_idx
  on public.game_companies (user_id);

create index regional_prices_user_id_idx
  on public.regional_prices (user_id);

create index regional_prices_product_owner_idx
  on public.regional_prices (product_id, user_id);

create index regional_prices_currency_idx
  on public.regional_prices (currency_code);

create index exchange_rates_quote_currency_idx
  on public.exchange_rates (quote_currency);

create index subscriptions_currency_idx
  on public.subscriptions (currency_code);

create index purchases_currency_idx
  on public.purchases (currency_code);
