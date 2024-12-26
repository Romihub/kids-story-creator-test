// src/types/features.ts
export interface PremiumFeatures {
    drawing: {
      layers: boolean;
      customBrushes: boolean;
      templates: boolean;
      exportFormats: string[];
      aiAssist: boolean;
    };
    story: {
      voiceNarration: boolean;
      customCharacters: boolean;
      animations: boolean;
      musicBackground: boolean;
      multiLanguage: boolean;
    };
    sharing: {
      export: boolean;
      collaborate: boolean;
      socialShare: boolean;
      printQuality: boolean;
    };
}