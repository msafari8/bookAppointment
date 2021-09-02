// DB api used for this app is supabase.com which is similar to firebase/dynamodb/cognito
// this was chosen because it had less hassle of setting it up for a demo project compared to others

import { createClient } from '@supabase/supabase-js'
import { DbCredentials } from './config'; //this file should be in app level directory in an env file

// Initialize 
const supabaseUrl = DbCredentials.dbUrl;
const supabaseKey = DbCredentials.key;
export const dbStore = createClient(supabaseUrl, supabaseKey);
