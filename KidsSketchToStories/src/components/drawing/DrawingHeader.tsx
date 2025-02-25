import React from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

interface DrawingHeaderProps {
  onShowTools: () => void;
  onSave?: () => void;
  onUndo?: () => void;
  onRedo?: () => void;
  hasUndo?: boolean;
  hasRedo?: boolean;
  onClear?: () => void;
  isViewMode?: boolean;
}

export const DrawingHeader: React.FC<DrawingHeaderProps> = ({
  onShowTools,
  onSave,
  onUndo,
  onRedo,
  hasUndo,
  hasRedo,
  onClear,
  isViewMode = false,
}) => {
  return (
    <View style={styles.container}>
      {!isViewMode && (
        <View style={styles.leftSection}>
          <TouchableOpacity
            style={styles.button}
            onPress={onShowTools}
          >
            <Icon name="palette" size={24} color="#000000" />
            <Text style={styles.buttonText}>Tools</Text>
          </TouchableOpacity>
        </View>
      )}

      {!isViewMode && (
        <View style={styles.centerSection}>
          <TouchableOpacity
            style={[styles.iconButton, !hasUndo && styles.disabledButton]}
            onPress={hasUndo ? onUndo : undefined}
            disabled={!hasUndo}
          >
            <Icon 
              name="undo" 
              size={28} 
              color={hasUndo ? "#007AFF" : "#CCCCCC"} 
            />
            <Text style={[styles.iconText, !hasUndo && styles.disabledText]}>
              Undo
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.iconButton, !hasRedo && styles.disabledButton]}
            onPress={hasRedo ? onRedo : undefined}
            disabled={!hasRedo}
          >
            <Icon 
              name="redo" 
              size={28} 
              color={hasRedo ? "#007AFF" : "#CCCCCC"} 
            />
            <Text style={[styles.iconText, !hasRedo && styles.disabledText]}>
              Redo
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.iconButton, styles.clearButton]}
            onPress={onClear}
          >
            <Icon name="delete-outline" size={28} color="#FF3B30" />
            <Text style={[styles.iconText, styles.clearText]}>Clear</Text>
          </TouchableOpacity>
        </View>
      )}

      <View style={[styles.rightSection, isViewMode && styles.rightSectionViewMode]}>
        {!isViewMode ? (
          <TouchableOpacity
            style={[styles.button, styles.saveButton]}
            onPress={onSave}
          >
            <Icon name="content-save" size={24} color="#FFFFFF" />
            <Text style={styles.saveButtonText}>Save</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={[styles.button, styles.editButton]}
            onPress={onSave}
          >
            <Icon name="pencil" size={24} color="#FFFFFF" />
            <Text style={styles.saveButtonText}>Edit</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
    height: 64,
  },
  leftSection: {
    flex: 1,
    alignItems: 'flex-start',
  },
  centerSection: {
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 16,
  },
  rightSection: {
    flex: 1,
    alignItems: 'flex-end',
  },
  rightSectionViewMode: {
    flex: 0,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    borderRadius: 8,
    backgroundColor: '#F0F0F0',
  },
  buttonText: {
    marginLeft: 4,
    fontSize: 14,
    fontWeight: '500',
  },
  saveButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 12,
  },
  editButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 12,
  },
  saveButtonText: {
    color: '#FFFFFF',
    marginLeft: 4,
    fontSize: 14,
    fontWeight: '500',
  },
  iconButton: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
  },
  iconText: {
    fontSize: 12,
    marginTop: 2,
    color: '#007AFF',
  },
  disabledButton: {
    opacity: 0.5,
  },
  disabledText: {
    color: '#CCCCCC',
  },
  clearButton: {
    marginLeft: 8,
  },
  clearText: {
    color: '#FF3B30',
  },
});

export default DrawingHeader;
