import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://hlofsndfzlbrllrkafdc.supabase.co';
const supabaseKey = 'yoursupabasekey';

export const supabase = createClient(supabaseUrl, supabaseKey);
