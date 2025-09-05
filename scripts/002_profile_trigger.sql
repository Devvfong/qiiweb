-- Create function to handle new user profile creation
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (
    id, 
    first_name, 
    last_name, 
    email,
    age,
    sex,
    date_of_birth
  )
  values (
    new.id,
    coalesce(new.raw_user_meta_data ->> 'first_name', null),
    coalesce(new.raw_user_meta_data ->> 'last_name', null),
    new.email,
    coalesce((new.raw_user_meta_data ->> 'age')::integer, null),
    coalesce(new.raw_user_meta_data ->> 'sex', null),
    coalesce((new.raw_user_meta_data ->> 'date_of_birth')::date, null)
  )
  on conflict (id) do nothing;

  return new;
end;
$$;

-- Create trigger to automatically create profile on user signup
drop trigger if exists on_auth_user_created on auth.users;

create trigger on_auth_user_created
  after insert on auth.users
  for each row
  execute function public.handle_new_user();
