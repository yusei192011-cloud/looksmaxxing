import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseKey)

// app-logic.js is loaded as a plain <script> (not an ES module), so it
// reaches the Supabase client through window instead of an import.
if (typeof window !== 'undefined') {
  window.supabase = supabase
}
