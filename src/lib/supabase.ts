import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://oxvexipgjqdjweaepjbm.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im94dmV4aXBnanFkandlYWVwamJtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTY0Mzk4MTcsImV4cCI6MjA3MjAxNTgxN30.zC13qFo7n-npHDTuA2OJ7-56z0kSwatcvjeJy4n-nww'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)