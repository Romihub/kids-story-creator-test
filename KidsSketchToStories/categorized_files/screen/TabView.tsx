// src/components/profile/TabView.tsx
import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';

interface TabViewProps {
  sections: Array<{
    id: string;
    title: string;
    component: React.ComponentType<any>;
  }>;
  activeSection: string;
  onChangeSection: (sectionId: string) => void;
}

export const TabView: React.FC<TabViewProps> = ({
  sections,
  activeSection,
  onChangeSection,
}) => {
  return (
    <ScrollView 
      horizontal 
      showsHorizontalScrollIndicator={false}
      style={styles.container}
    >
      {sections.map((section) => (
        <TouchableOpacity
          key={section.id}
          style={[
            styles.tab,
            activeSection === section.id && styles.activeTab
          ]}
          onPress={() => onChangeSection(section.id)}
        >
          <Text style={[
            styles.tabText,
            activeSection === section.id && styles.activeTabText
          ]}>
            {section.title}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 0,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5EA',
  },
  tab: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#007AFF',
  },
  tabText: {
    fontSize: 14,
    color: '#666',
  },
  activeTabText: {
    color: '#007AFF',
    fontWeight: '600',
  },
}); 