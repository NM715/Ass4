// supabase.tsx

import { createClient } from '@supabase/supabase-js'; // Correct import statement

// Replace with your actual Supabase project URL and public API key (anon key)
const supabaseUrl = 'https://ozjvpaxlvngorancuamq.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im96anZwYXhsdm5nb3JhbmN1YW1xIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDExODY3NTUsImV4cCI6MjA1Njc2Mjc1NX0.sRK-ombGZ-XKC_V5j4ToKAEpVmEGtH0vnA-j-thU4RE'; // Make sure to use the anon public key

// Create the Supabase client instance
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
