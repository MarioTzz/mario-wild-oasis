import { createClient } from '@supabase/supabase-js';
export const supabaseUrl = 'https://odhgosobkjnooprhttbs.supabase.co';
// 由于在supabase中采用了行级安全策略，在supabase中我允许他人通过api来读取数据库中的数据，但是不允许修改，所以还是可以安全把API暴露给他人的
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9kaGdvc29ia2pub29wcmh0dGJzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI5MTE4NzUsImV4cCI6MjA3ODQ4Nzg3NX0.mkdKmGSFEbnOlWGljwFRZ3AX5QIGKsL9qA7ryelWoyI';
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
