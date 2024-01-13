import { createClient } from '@supabase/supabase-js';

const url = process.env.NEXT_PUBLIC_SUPABASE_URL2;
const key = process.env.NEXT_PUBLIC_SUPABASE_KEY2;

const supabase = createClient(url, key);

export { supabase };