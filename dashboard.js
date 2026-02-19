import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Alert } from 'react-native';
import firestore from '@react-native-firebase/firestore';

const Dashboard = () => {
  const [reports, setReports] = useState([]);
  const [outbreakAlert, setOutbreakAlert] = useState(false);

  useEffect(() => {
    // Real-time listener for the "reports" collection
    const subscriber = firestore()
      .collection('reports')
      .onSnapshot(querySnapshot => {
        const data = [];
        querySnapshot.forEach(documentSnapshot => {
          data.push({ ...documentSnapshot.data(), id: documentSnapshot.id });
        });

        setReports(data);

        // EARLY WARNING LOGIC: If total reports > 5, trigger alert
        if (data.length > 5) {
          setOutbreakAlert(true);
        }
      });

    return () => subscriber();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Health Surveillance Dashboard</Text>
      
      {outbreakAlert && (
        <View style={styles.alertBanner}>
          <Text style={styles.alertText}>⚠️ WARNING: Potential Outbreak Detected!</Text>
          <Text style={styles.alertSub}>Threshold of 5 cases exceeded in this cluster.</Text>
        </View>
      )}

      <FlatList
        data={reports}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.reportCard}>
            <Text style={styles.cardText}>Report ID: {item.id.substring(0, 6)}</Text>
            <Text style={styles.cardSymptoms}>Symptoms: {item.s_ids?.join(', ') || 'N/A'}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F0F4F8', padding: 20 },
  header: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, color: '#333' },
  alertBanner: { backgroundColor: '#D32F2F', padding: 20, borderRadius: 12, marginBottom: 20 },
  alertText: { color: 'white', fontWeight: 'bold', fontSize: 18, textAlign: 'center' },
  alertSub: { color: 'white', textAlign: 'center', marginTop: 5 },
  reportCard: { backgroundColor: 'white', padding: 15, borderRadius: 8, marginBottom: 10, elevation: 2 },
  cardText: { fontWeight: 'bold', color: '#555' },
  cardSymptoms: { color: '#777', marginTop: 5 }
});

export default Dashboard;