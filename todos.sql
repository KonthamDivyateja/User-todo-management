create table todos (
  id uuid primary key,
  title text not null,
  description text,
  is_completed boolean default false,
  user_id uuid references users(id) on delete cascade,
  created_at timestamp default now()
);
