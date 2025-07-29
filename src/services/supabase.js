import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://hsgefnzqzmubkazvxyqw.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhzZ2Vmbnpxem11YmthenZ4eXF3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDkwNDk5NzksImV4cCI6MjA2NDYyNTk3OX0.zcb0Ax0tpmSgIwHQOs59VGzz5vSlDsU4uWEr0-Uqpl8";
const supabase = createClient(supabaseUrl, supabaseKey);
export default supabase;
export { supabaseUrl, supabaseKey };
