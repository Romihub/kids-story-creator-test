// This script sets up the initial admin user in Firebase
// Run with: node scripts/setup-admin.js

import admin from 'firebase-admin';
import { readFileSync } from 'fs';
import { join } from 'path';

// Initialize Firebase Admin
const serviceAccount = JSON.parse(
  readFileSync(join(process.cwd(), 'firebase-admin-key.json'))
);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const email = process.argv[2];
if (!email) {
  console.error('Please provide an email address: node scripts/setup-admin.js <email>');
  process.exit(1);
}

async function setupAdmin() {
  try {
    // Get user by email
    const user = await admin.auth().getUserByEmail(email);
    
    // Set custom claims
    await admin.auth().setCustomUserClaims(user.uid, {
      admin: true
    });

    console.log(`Successfully set admin claim for user: ${email}`);
    process.exit(0);
  } catch (error) {
    console.error('Error setting admin claim:', error);
    process.exit(1);
  }
}

setupAdmin();
