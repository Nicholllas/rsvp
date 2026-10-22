/**
 * Seed script to populate the guests table with personalized invitation slugs.
 * 
 * Usage:
 *   1. Create .env.local with SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY
 *   2. Run: node scripts/seed-guests.mjs
 * 
 * Each guest gets a unique slug like: bapak-budi-santoso-a3f7c2e1
 */

import { createClient } from '@supabase/supabase-js';
import { randomBytes } from 'crypto';
import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load .env.local from project root
dotenv.config({ path: join(__dirname, '..', '.env.local') });

const supabaseUrl = process.env.SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

if (!supabaseUrl || !serviceRoleKey) {
  console.error('❌ Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env.local');
  console.error('   Add SUPABASE_SERVICE_ROLE_KEY from Supabase Settings > API > service_role key');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, serviceRoleKey);

// Sample guest list - replace with your actual guest data
const guestList = [
  { name: 'Bapak Budi Santoso', phone: '081234567890', type: 'family', max: 4 },
  { name: 'Ibu Siti Nurhaliza', phone: '081298765432', type: 'friends', max: 2 },
  { name: 'Dr. Ahmad Rahman', phone: '081345678901', type: 'colleagues', max: 3 },
  { name: 'Keluarga Wijaya', phone: '081456789012', type: 'family', max: 5 },
  { name: 'Tuan Richard Chen', phone: '081567890123', type: 'vip', max: 2 },
];

function generateSlug(name) {
  const cleaned = name
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '') // Remove special chars
    .replace(/\s+/g, '-')          // Replace spaces with hyphens
    .slice(0, 30);                 // Limit base length
  
  const suffix = randomBytes(4).toString('hex'); // 8 random hex chars
  return `${cleaned}-${suffix}`;
}

async function seed() {
  console.log('🌱 Starting guest seed...\n');

  let successCount = 0;
  let failCount = 0;

  for (const guest of guestList) {
    const slug = generateSlug(guest.name);
    
    try {
      const { error } = await supabase.from('guests').insert({
        slug,
        name: guest.name,
        phone: guest.phone,
        guest_type: guest.type,
        max_companions: guest.max,
      });

      if (error) {
        console.error(`❌ Failed: ${guest.name}`);
        console.error(`   Error: ${error.message}\n`);
        failCount++;
      } else {
        console.log(`✅ ${guest.name}`);
        console.log(`   Slug: ${slug}`);
        console.log(`   Link: ${siteUrl}/${slug}\n`);
        successCount++;
      }
    } catch (err) {
      console.error(`❌ Failed: ${guest.name}`);
      console.error(`   Error: ${err.message}\n`);
      failCount++;
    }
  }

  console.log('\n📊 Summary:');
  console.log(`   ✅ Success: ${successCount}`);
  console.log(`   ❌ Failed: ${failCount}`);
  console.log(`   📋 Total: ${guestList.length}`);

  if (successCount > 0) {
    console.log('\n💡 Next steps:');
    console.log('   1. Copy the slugs above and send personalized WhatsApp messages');
    console.log('   2. Optional: Export to CSV with query:');
    console.log('      SELECT slug, name, phone FROM guests ORDER BY created_at DESC;');
  }
}

seed().catch(console.error);
