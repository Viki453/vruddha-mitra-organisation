import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;
const supabaseServiceKey = import.meta.env.VITE_SUPABASE_SERVICE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);
export default supabase;
export { supabaseUrl, supabaseServiceKey };
