import React, { useState } from 'react';
import { View, TouchableOpacity, Text, ActivityIndicator, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

interface PDFDownloaderProps {
  storyId: string;
}

export const PDFDownloader: React.FC<PDFDownloaderProps> = ({ storyId }) => {
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = async () => {
    setIsDownloading(true);
    try {
      // Implement PDF generation and download logic
      await new Promise(resolve => setTimeout(resolve, 2000)); // Simulated delay
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={styles.button}
        onPress={handleDownload}
        disabled={isDownloading}
      >
        {isDownloading ? (
          <ActivityIndicator color="#FFF" />
        ) : (
          <>
            <Icon name="file-pdf-box" size={24} color="#FFF" />
            <Text style={styles.buttonText}>Download PDF</Text>
          </>
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FF3B30',
    padding: 12,
    borderRadius: 8,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
}); 