// src/components/profile/advanced/ScheduleManager.tsx
import React, { useState } from 'react';
import { View, Text, Switch, TouchableOpacity, Modal, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';

interface Schedule {
  weekdays: { start: string; end: string };
  weekends: { start: string; end: string };
}

interface ScheduleManagerProps {
  enabled: boolean;
  schedule: Schedule;
  onUpdate: (schedule: Schedule) => void;
}

export const ScheduleManager: React.FC<ScheduleManagerProps> = ({
  enabled,
  schedule,
  onUpdate,
}) => {
  const [showPicker, setShowPicker] = useState(false);
  const [currentEdit, setCurrentEdit] = useState<{
    period: 'weekdays' | 'weekends';
    type: 'start' | 'end';
    value: string;
  } | null>(null);

  const updateTime = (time: string) => {
    if (currentEdit) {
      const { period, type } = currentEdit;
      onUpdate({
        ...schedule,
        [period]: {
          ...schedule[period],
          [type]: time,
        },
      });
    }
  };

  const hours = Array.from({ length: 24 }, (_, i) => 
    i.toString().padStart(2, '0') + ':00'
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Usage Schedule</Text>
        <Switch value={enabled} onValueChange={() => {}} />
      </View>

      {enabled && (
        <>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Weekdays</Text>
            <View style={styles.timeRow}>
              <TimeButton
                label="From"
                value={schedule.weekdays.start}
                onPress={() => {
                  setCurrentEdit({ period: 'weekdays', type: 'start', value: schedule.weekdays.start });
                  setShowPicker(true);
                }}
              />
              <TimeButton
                label="To"
                value={schedule.weekdays.end}
                onPress={() => {
                  setCurrentEdit({ period: 'weekdays', type: 'end', value: schedule.weekdays.end });
                  setShowPicker(true);
                }}
              />
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Weekends</Text>
            <View style={styles.timeRow}>
              <TimeButton
                label="From"
                value={schedule.weekends.start}
                onPress={() => {
                  setCurrentEdit({ period: 'weekends', type: 'start', value: schedule.weekends.start });
                  setShowPicker(true);
                }}
              />
              <TimeButton
                label="To"
                value={schedule.weekends.end}
                onPress={() => {
                  setCurrentEdit({ period: 'weekends', type: 'end', value: schedule.weekends.end });
                  setShowPicker(true);
                }}
              />
            </View>
          </View>
        </>
      )}

      <Modal
        visible={showPicker}
        transparent
        animationType="slide"
      >
        <View style={styles.modalContainer}>
          <View style={styles.pickerContainer}>
            <View style={styles.pickerHeader}>
              <TouchableOpacity onPress={() => setShowPicker(false)}>
                <Text style={styles.cancelButton}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  if (currentEdit?.value) {
                    updateTime(currentEdit.value);
                  }
                  setShowPicker(false);
                }}
              >
                <Text style={styles.doneButton}>Done</Text>
              </TouchableOpacity>
            </View>
            <Picker
              selectedValue={currentEdit?.value}
              onValueChange={(value) => {
                setCurrentEdit(prev => prev ? { ...prev, value } : null);
              }}
            >
              {hours.map((hour) => (
                <Picker.Item key={hour} label={hour} value={hour} />
              ))}
            </Picker>
          </View>
        </View>
      </Modal>
    </View>
  );
};

interface TimeButtonProps {
  label: string;
  value: string;
  onPress: () => void;
}

const TimeButton: React.FC<TimeButtonProps> = ({ label, value, onPress }) => (
  <View style={styles.timeSelector}>
    <Text style={styles.timeLabel}>{label}</Text>
    <TouchableOpacity style={styles.timeButton} onPress={onPress}>
      <Text style={styles.timeValue}>{value}</Text>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
  },
  section: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  timeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  timeSelector: {
    flex: 1,
    marginHorizontal: 8,
  },
  timeLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  timeValue: {
    fontSize: 14,
    color: '#333',
    padding: 8,
    backgroundColor: '#F0F0F0',
    borderRadius: 4,
    textAlign: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  pickerContainer: {
    backgroundColor: '#FFF',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  pickerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#DDD',
  },
  cancelButton: {
    color: '#666',
    fontSize: 16,
  },
  doneButton: {
    color: '#007AFF',
    fontSize: 16,
    fontWeight: '600',
  },
  timeButton: {
    backgroundColor: '#F0F0F0',
    padding: 8,
    borderRadius: 4,
  },
}); 