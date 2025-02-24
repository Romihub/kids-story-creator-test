# Admin Setup Guide

This guide explains how to set up admin users in the SketchTales app.

## Prerequisites

1. Firebase project set up with Authentication enabled
2. Firebase Admin SDK credentials (service account key)
3. Node.js installed

## Initial Setup

### 1. Version Compatibility
The app uses specific versions of dependencies to ensure compatibility:
- Kotlin version: 1.9.0
- Firebase Android SDK: 32.3.1
- React Native Firebase: 18.7.3

### 2. Clean and Rebuild Project
First, ensure all dependencies are properly installed and the project is built with the correct versions:

```bash
# On Windows
scripts\clean-rebuild.bat

# On macOS/Linux
chmod +x scripts/clean-rebuild.sh
./scripts/clean-rebuild.sh
```

### 3. Set Up Firebase Admin SDK
1. Get your Firebase Admin SDK service account key:
   - Go to Firebase Console
   - Project Settings > Service Accounts
   - Click "Generate New Private Key"
   - Save the JSON file as `firebase-admin-key.json` in the project root

2. Create a regular user account through the app's sign-up process.

3. Run the admin setup script:
   ```bash
   # Navigate to project directory
   cd KidsSketchToStories

   # Install firebase-admin if not already installed
   npm install firebase-admin

   # Run the setup script with the user's email
   node scripts/setup-admin.js user@example.com
   ```

4. After running the script successfully, sign out and sign back in to the app to get the updated admin claims.

## Admin Features

Once set up, admin users will have access to:

1. Admin Dashboard (accessible through Settings)
   - User Management
   - App Statistics
   - System Settings
   - Analytics Dashboard

2. Additional Capabilities:
   - Add/remove admin users
   - Monitor app performance
   - View user statistics
   - Manage content moderation

## Security Implementation

Admin claims are enforced at multiple levels:

### Client-side
- UI elements and routes are only shown to users with admin claims
- Admin navigation is conditionally rendered
- Settings screen includes admin-only options

### Server-side
- Firebase security rules check for admin claims
- API endpoints verify admin claims in the Firebase ID token
- Backend services validate admin permissions

## Adding More Admins

Additional admins can be added through two methods:

1. Admin Dashboard (Recommended)
   - Navigate to Settings > Admin Dashboard
   - Select User Management
   - Search for the user
   - Click "Grant Admin Access"

2. Command Line
   ```bash
   node scripts/setup-admin.js new-admin@example.com
   ```

## Troubleshooting

### Common Issues

1. Version Compatibility Errors
   ```bash
   # Clean the project and rebuild
   scripts/clean-rebuild.bat  # Windows
   ./scripts/clean-rebuild.sh # macOS/Linux
   ```

2. Admin Access Not Working
   - Verify the user's admin claim:
     ```javascript
     // In the app console
     const idTokenResult = await firebase.auth().currentUser.getIdTokenResult();
     console.log('Admin claim:', idTokenResult.claims.admin);
     ```
   - Sign out and sign back in to refresh claims
   - Check Firebase Authentication console

3. Build Errors
   - Ensure Kotlin version is 1.9.0 in `android/build.gradle`
   - Verify Firebase dependencies in `package.json` are version 18.7.3
   - Run the clean-rebuild script

### Error Messages

1. Kotlin Version Mismatch
   ```
   Module was compiled with an incompatible version of Kotlin
   ```
   Solution: Update Kotlin version in `android/build.gradle`

2. Firebase Version Conflict
   ```
   Execution failed for task ':app:processDebugGoogleServices'
   ```
   Solution: Update Firebase dependencies in both `build.gradle` and `package.json`

## Best Practices

1. Security
   - Regularly rotate admin credentials
   - Monitor admin activity logs
   - Review admin permissions periodically

2. Performance
   - Keep the admin dashboard lightweight
   - Implement pagination for large datasets
   - Cache frequently accessed admin data

3. User Experience
   - Provide clear feedback for admin actions
   - Implement confirmation dialogs for critical operations
   - Maintain audit logs for admin activities

## Support

For any issues with admin setup:
1. Check the troubleshooting section above
2. Review the error logs
3. Contact the development team if issues persist

## Updates and Maintenance

1. Regular Updates
   - Keep dependencies up to date
   - Monitor Firebase console for security updates
   - Update admin features based on feedback

2. Backup
   - Regularly backup admin configurations
   - Document any custom admin settings
   - Maintain version history of admin tools

Remember to always test admin features in a development environment before deploying to production.
