// src/components/drawing/DrawingTools.tsx
import React, { useMemo } from 'react';
import { View, TouchableOpacity, Text, ScrollView, StyleSheet } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Svg, { Path, Defs, Filter, FeTurbulence, FeDisplacementMap, FeGaussianBlur, LinearGradient, Stop } from 'react-native-svg';
import { DrawingTool } from '../../types/drawing';

const tools = [
  { 
    id: 'pencil',
    name: 'Pencil',
    icon: 'pencil',
    description: 'Natural pencil with pressure sensitivity'
  },
  { 
    id: 'crayon',
    name: 'Crayon',
    icon: 'brush',
    description: 'Textured crayon effect'
  },
  { 
    id: 'marker',
    name: 'Marker',
    icon: 'marker',
    description: 'Soft edge marker'
  },
  { 
    id: 'pen',
    name: 'Pen',
    icon: 'pen',
    description: 'Precise pen with tapered ends'
  },
  { 
    id: 'highlight',
    name: 'Highlight',
    icon: 'brush-variant',
    description: 'Semi-transparent highlighter'
  },
  { 
    id: 'eraser',
    name: 'Eraser',
    icon: 'eraser',
    description: 'Clean eraser tool'
  },
] as const;

const colors = [
  { name: 'Red', value: '#FF0000' },
  { name: 'Orange', value: '#FFA500' },
  { name: 'Yellow', value: '#FFFF00' },
  { name: 'Green', value: '#00FF00' },
  { name: 'Turquoise', value: '#40E0D0' },
  { name: 'Blue', value: '#0000FF' },
  { name: 'Purple', value: '#800080' },
  { name: 'Pink', value: '#FFC0CB' },
  { name: 'White', value: '#FFFFFF' },
  { name: 'Black', value: '#000000' },
  { name: 'Grey', value: '#808080' },
  { name: 'Brown', value: '#8B4513' },
];

const gradientColors = [
  { 
    name: 'Sunset', 
    value: 'linear-gradient(45deg, #FF416C, #FF9C44)',
    colors: ['#FF416C', '#FF9C44']
  },
  { 
    name: 'Ocean', 
    value: 'linear-gradient(45deg, #2193b0, #6dd5ed)',
    colors: ['#2193b0', '#6dd5ed']
  },
  { 
    name: 'Forest', 
    value: 'linear-gradient(45deg, #134E5E, #71B280)',
    colors: ['#134E5E', '#71B280']
  },
  { 
    name: 'Rainbow', 
    value: 'linear-gradient(45deg, #FF0000, #00FF00, #0000FF)',
    colors: ['#FF0000', '#00FF00', '#0000FF']
  },
  { 
    name: 'Cotton Candy', 
    value: 'linear-gradient(45deg, #FF69B4, #DDA0DD)',
    colors: ['#FF69B4', '#DDA0DD']
  },
];

const sizes = [
  { width: 2, label: 'Fine' },
  { width: 4, label: 'Medium' },
  { width: 6, label: 'Thick' },
  { width: 8, label: 'Extra Thick' },
];

export interface DrawingToolsProps {
  selectedTool: DrawingTool;
  selectedColor: string;
  strokeWidth: number;
  isPanelExpanded: boolean;
  onToolChange: (tool: DrawingTool) => void;
  onColorChange: (color: string) => void;
  onStrokeWidthChange: (width: number) => void;
  onPanelToggle: () => void;
}

const ToolPreview: React.FC<{ tool: typeof tools[number]; color: string; width: number }> = ({ 
  tool, 
  color, 
  width 
}) => {
  // Generate a sample stroke path for preview
  const pathData = "M10,25 C20,10 40,40 50,25";
  
  const getFilter = () => {
    switch (tool.id) {
      case 'pencil':
        return (
          <Filter id={`preview-pencil`}>
            <FeTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" seed="1" />
            <FeDisplacementMap in="SourceGraphic" scale="1" />
          </Filter>
        );
      case 'crayon':
        return (
          <Filter id={`preview-crayon`}>
            <FeTurbulence type="turbulence" baseFrequency="0.05" numOctaves="2" seed="2" />
            <FeDisplacementMap in="SourceGraphic" scale="2" />
          </Filter>
        );
      case 'marker':
        return (
          <Filter id={`preview-marker`}>
            <FeGaussianBlur in="SourceGraphic" stdDeviation="0.5" />
          </Filter>
        );
      case 'pen':
        return (
          <Filter id={`preview-pen`}>
            <FeTurbulence type="fractalNoise" baseFrequency="1" numOctaves="4" seed="3" />
            <FeDisplacementMap in="SourceGraphic" scale="0.5" />
          </Filter>
        );
      default:
        return null;
    }
  };

  return (
    <Svg height={50} width={60}>
      <Defs>
        {getFilter()}
      </Defs>
      <Path
        d={pathData}
        stroke={tool.id === 'eraser' ? '#FFFFFF' : color}
        strokeWidth={width}
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        filter={tool.id !== 'eraser' && tool.id !== 'highlight' ? `url(#preview-${tool.id})` : undefined}
        opacity={tool.id === 'highlight' ? 0.3 : 1}
      />
    </Svg>
  );
};

export const DrawingTools: React.FC<DrawingToolsProps> = ({
  selectedTool,
  selectedColor,
  strokeWidth,
  isPanelExpanded,
  onToolChange,
  onColorChange,
  onStrokeWidthChange,
  onPanelToggle
}) => {
  return (
    <View style={styles.container}>
      <View style={[styles.header, !isPanelExpanded && styles.headerCollapsed]}>
        <Text style={styles.title}>Drawing Tools</Text>
        <TouchableOpacity onPress={onPanelToggle} style={styles.toggleButton}>
          <MaterialCommunityIcons 
            name={isPanelExpanded ? "chevron-down" : "chevron-up"}
            size={24} 
            color="#000000" 
          />
        </TouchableOpacity>
      </View>

      {/* Tools Section */}
      {isPanelExpanded && (<>
        <Text style={styles.sectionTitle}>Tools</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.toolsScroll}>
        <View style={styles.tools}>
          {tools.map((tool) => (
            <TouchableOpacity
              key={tool.id}
              style={[styles.tool, selectedTool === tool.id && styles.selectedTool]}
              onPress={() => onToolChange(tool.id as DrawingTool)}
            >
              <ToolPreview tool={tool} color={selectedColor} width={strokeWidth} />
              <MaterialCommunityIcons 
                name={tool.icon} 
                size={24} 
                color={selectedTool === tool.id ? '#FFFFFF' : '#000000'} 
              />
              <Text style={[
                styles.toolText,
                selectedTool === tool.id && styles.selectedToolText
              ]}>
                {tool.name}
              </Text>
              <Text style={[
                styles.toolDescription,
                selectedTool === tool.id && styles.selectedToolDescription
              ]}>
                {tool.description}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* Colors Section */}
        <Text style={styles.sectionTitle}>Colors</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.colorsScroll}>
        <View style={styles.colors}>
          {colors.map((color) => (
            <TouchableOpacity
              key={color.value}
              style={[
                styles.colorButton,
                { backgroundColor: color.value },
                selectedColor === color.value && styles.selectedColor,
                color.value === '#FFFFFF' && styles.whiteColorButton
              ]}
              onPress={() => onColorChange(color.value)}
            >
              {selectedColor === color.value && (
                <MaterialCommunityIcons 
                  name="check" 
                  size={16} 
                  color={color.value === '#FFFFFF' ? '#000000' : '#FFFFFF'} 
                />
              )}
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* Gradient Colors Section */}
        <Text style={styles.sectionTitle}>Gradient Colors</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.colorsScroll}>
        <View style={styles.colors}>
          {gradientColors.map((gradient) => (
            <TouchableOpacity
              key={gradient.value}
              style={[
                styles.colorButton,
                styles.gradientButton,
                selectedColor === gradient.value && styles.selectedColor,
              ]}
              onPress={() => onColorChange(gradient.value)}
            >
              <View style={styles.gradientButton}>
                <Svg style={styles.gradientPreview}>
                  <Defs>
                    <LinearGradient
                      id={`preview-${gradient.value}`}
                      x1="0"
                      y1="0"
                      x2="1"
                      y2="1"
                    >
                      {gradient.colors.map((color, i, colors) => (
                        <Stop
                          key={`stop-${i}`}
                          offset={`${(i / (colors.length - 1))}`}
                          stopColor={color}
                        />
                      ))}
                    </LinearGradient>
                  </Defs>
                  <Path
                    d={`M0,0 L40,0 L40,40 L0,40 Z`}
                    fill={`url(#preview-${gradient.value})`}
                  />
                </Svg>
                {selectedColor === gradient.value && (
                  <View style={styles.checkIconContainer}>
                    <MaterialCommunityIcons 
                      name="check" 
                      size={16} 
                      color="#FFFFFF"
                    />
                  </View>
                )}
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* Sizes Section */}
        <Text style={styles.sectionTitle}>Stroke Width</Text>
      <View style={styles.sizes}>
        {sizes.map(({width, label}) => (
          <TouchableOpacity
            key={width}
            style={[styles.sizeButton, strokeWidth === width && styles.selectedSize]}
            onPress={() => onStrokeWidthChange(width)}
          >
            <View style={styles.sizePreviewContainer}>
              <ToolPreview tool={tools.find(t => t.id === selectedTool)!} color={selectedColor} width={width} />
            </View>
            <Text style={[
              styles.sizeLabel,
              strokeWidth === width && styles.selectedSizeLabel
            ]}>
              {label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      </>)}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 16,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
    height: 'auto',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 16,
  },
  headerCollapsed: {
    paddingBottom: 0,
  },
  toggleButton: {
    padding: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 12,
    marginBottom: 8,
  },
  toolsScroll: {
    maxHeight: 140,
  },
  tools: {
    flexDirection: 'row',
    paddingVertical: 8,
  },
  tool: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    marginRight: 12,
    borderRadius: 12,
    backgroundColor: '#F5F5F5',
    width: 120,
  },
  selectedTool: {
    backgroundColor: '#007AFF',
  },
  toolText: {
    marginTop: 4,
    fontSize: 14,
    fontWeight: '500',
    color: '#000000',
  },
  selectedToolText: {
    color: '#FFFFFF',
  },
  toolDescription: {
    marginTop: 2,
    fontSize: 10,
    color: '#666666',
    textAlign: 'center',
  },
  selectedToolDescription: {
    color: '#E0E0E0',
  },
  colorsScroll: {
    maxHeight: 60,
  },
  colors: {
    flexDirection: 'row',
    paddingVertical: 8,
  },
  colorButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedColor: {
    borderWidth: 2,
    borderColor: '#007AFF',
  },
  whiteColorButton: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  gradientButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    overflow: 'hidden',
    position: 'relative',
  },
  gradientPreview: {
    width: '100%',
    height: '100%',
  },
  checkIconContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sizes: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 8,
    marginBottom: 8,
  },
  sizeButton: {
    width: 80,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    marginRight: 12,
    padding: 8,
  },
  selectedSize: {
    backgroundColor: '#E0E0E0',
  },
  sizePreviewContainer: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sizeLabel: {
    marginTop: 4,
    fontSize: 12,
    color: '#666666',
  },
  selectedSizeLabel: {
    color: '#000000',
    fontWeight: '500',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 8,
    marginBottom: 8,
  },
  actionButton: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
  },
  actionText: {
    marginTop: 4,
    fontSize: 12,
    color: '#007AFF',
  },
  clearText: {
    color: '#FF3B30',
  },
});

export default DrawingTools;
