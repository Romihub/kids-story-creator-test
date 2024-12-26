// src/components/drawing/EnhancedDrawingTools.tsx
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useSubscription } from '../../hooks/useSubscription';
import { CustomBrushPanel } from './premium/CustomBrushPanel';
import { LayersPanel } from './premium/LayersPanel';
import {TemplateSelector } from './premium/TemplateSelector';
import BasicDrawingTools from './BasicDrawingTools';
import { ExportOptions } from './premium/ExportOptions';

export const EnhancedDrawingTools: React.FC = () => {
    const { tier } = useSubscription();
  
    const features = {
      customBrushes: tier.id !== 'free',
      layers: tier.id === 'professional',
      templates: tier.id !== 'free',
      export: tier.id !== 'free',
    };
  
    return (
      <View style={styles.container}>
        {features.customBrushes && <CustomBrushPanel />}
        {features.layers && <LayersPanel />}
        {features.templates && <TemplateSelector />}
        <BasicDrawingTools />
        {features.export && <ExportOptions />}
      </View>
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
});