# Kids Story Creator Project Components

## Backend Components (Initial Stage)

### API Endpoints (FastAPI)
- `/api/process-drawing`
- `/api/generate-story`

### Core Services
- Drawing Processor Service
- Story Generator Service
- Database Service
- ML Models Service

### Utilities
- Content Safety Checks

## Frontend Components (React Native)

### 1. Core Components

#### Camera Module
- `CameraCapture`
  - Handles photo capture functionality
- `CameraOverlay`
  - UI overlay for camera interface
- `CameraPermissionRequest`
  - Manages camera permissions
- `ImagePreview`
  - Displays captured images

#### Drawing Module
- `DrawingCanvas`
  - Main drawing interface
- `DrawingTools`
  - Basic Tools
  - Enhanced Tools
- `DrawingHeader`
  - Navigation and controls

#### Common UI Components
- `Button`
- `LoadingIndicator`
- `LoadingOverlay`

### 2. Main Screens
- `HomeScreen`
- `DrawingScreen`
- `CameraScreen`
- `GalleryScreen`
- `StoryScreen`
- `StoryCreationScreen`
- `SettingsScreen`

### 3. Services & Integration

#### Core Services
- Firebase Services
- Payment Processing
- Story Generation
- AI Integration

#### External Integrations
- Social Sharing
- Google Drive Integration
- Apple CloudKit Integration

### 4. State Management

#### Custom Hooks
- `useDrawing`
- `useStory`
- `useGallery`
- `useAuth`
- `useSubscription`
- `useProfile`
- `useAnalytics`
- `usePreferences`

#### State Architecture
- Redux Store
  - Multiple slices for different features
- Context API
  - Auth Context
  - Theme Context

### 5. Core Features
- Authentication System
- Gallery Management
- Drawing Tools
  - Basic tools
  - Enhanced tools (Premium)
- Story Generation
- Subscription System
- Error Handling
  - Error Boundary
  - Error Recovery UI
- Analytics
- Profile Management

### 6. Testing Infrastructure
- Integration Tests
- End-to-End Tests
- Performance Tests
- Mock Data Utilities
- Test Automation

---

**Note**: While the frontend has a comprehensive structure, some components need fixing to work properly. The backend is still in initial stages of development.
