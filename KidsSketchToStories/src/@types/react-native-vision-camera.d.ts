//src/@types/react-native-vision-camera.d.ts
declare module 'react-native-vision-camera' {
    import { ViewProps } from 'react-native';
    
    export interface CameraProps extends ViewProps {
      device: CameraDevice;
      isActive: boolean;
      photo?: boolean;
      video?: boolean;
      audio?: boolean;
      enableZoomGesture?: boolean;
    }
  
    export interface CameraDevice {
      id: string;
      name: string;
      supportsLowLightBoost: boolean;
      supportsFocus: boolean;
      hasFlash: boolean;
      hasTorch: boolean;
      position: 'front' | 'back';
    }
  
    export type CameraPermissionStatus = 'authorized' | 'not-determined' | 'denied' | 'restricted';
  
    export function useCameraDevices(): {
      back: CameraDevice | undefined;
      front: CameraDevice | undefined;
    };
  
    export class Camera extends React.Component<CameraProps> {
      takePhoto(options?: {
        qualityPriority?: 'quality' | 'speed';
        flash?: 'on' | 'off' | 'auto';
        enableAutoRedEyeReduction?: boolean;
      }): Promise<{ path: string }>;
  
      static requestCameraPermission(): Promise<CameraPermissionStatus>;
    }
}
