import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import firestore from '@react-native-firebase/firestore';

// Colors from tech_rules.md and design.md
const COLORS = {
  actionBlue: '#0056D2',
  safetyWhite: '#FFFFFF',
  alertRed: '#D32F2F',
};

const SYMPTOMS = [
  { id: 'wd', label: 'Watery Diarrhea', icon: '💧' },
  { id: 'f', label: 'Fever', icon: '🔥' },
  { id: 'n', label: 'Nausea', icon: '🤢' },
  { id: 'd', label: 'Dehydration', icon: '📉' },
];

const ReportingForm = () => {
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);

  const toggleSymptom = (id) => {
    setSelectedSymptoms(prev => 
      prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
    );
  };

  const submitReport = async () => {
    // 1. Validation to prevent empty reports
    if (selectedSymptoms.length === 0) {
      Alert.alert('No Symptoms Selected', 'Please select at least one symptom before submitting.');
      return;
    }

    const reportData = {
      s_ids: selectedSymptoms,
      ts: firestore.FieldValue.serverTimestamp(),
    };

    try {
      // Offline-first: Firestore handles persistence automatically
      await firestore().collection('reports').add(reportData);
      
      // 2. Fixed mobile-compatible Alert
      Alert.alert('Success', 'Report Saved Offline/Online!');
      
      // 3. Reset form after success
      setSelectedSymptoms([]); 
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Failed to save report. Please try again.');
    }
  };
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.grid}>
        {SYMPTOMS.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={[
              styles.tile,
              selectedSymptoms.includes(item.id) && styles.selectedTile
            ]}
            onPress={() => toggleSymptom(item.id)}
          >
            <Text style={styles.icon}>{item.icon}</Text>
            <Text style={styles.label}>{item.label}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <TouchableOpacity style={styles.submitBtn} onPress={submitReport}>
        <Text style={styles.submitText}>SEND REPORT</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.safetyWhite },
  grid: { 
    flexDirection: 'row', 
    flexWrap: 'wrap', 
    padding: 10, 
    justifyContent: 'center' 
  },
  tile: {
    width: 140, // Large touch target
    height: 140,
    margin: 10,
    backgroundColor: '#F5F5F5',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
    // Card elevation from design.md
    elevation: 4,
  },
  selectedTile: {
    borderColor: COLORS.actionBlue,
    borderWidth: 4,
  },
  icon: { fontSize: 40 },
  label: { 
    fontSize: 16, 
    fontWeight: 'bold', 
    textAlign: 'center', 
    marginTop: 8,
    color: '#000' 
  },
  submitBtn: {
    backgroundColor: COLORS.alertRed,
    padding: 20,
    margin: 20,
    borderRadius: 16,
    alignItems: 'center',
  },
  submitText: { 
    color: '#FFF', 
    fontSize: 20, 
    fontWeight: '900' 
  },
});

export default ReportingForm;