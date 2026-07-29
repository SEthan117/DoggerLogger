import { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, View } from 'react-native';
import { supabase } from '../lib/supabase'; // Adjust path based on where your lib folder is

export default function App() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const { data, error } = await supabase
          .from('breeds') 
          .select('*')
          .limit(10);

        if (error) throw error;
        setItems(data || []);
      } catch (err: any) {
        setErrorMsg(err.message || 'An error occurred');
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#3ecf8e" />
        <Text style={styles.text}>Connecting to Supabase...</Text>
      </View>
    );
  }

  if (errorMsg) {
    return (
      <View style={styles.center}>
        <Text style={[styles.text, styles.error]}>Error: {errorMsg}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Supabase Connected</Text>
      <Text style={styles.subheader}>Showing first 10 items:</Text>
      
      <FlatList
        data={items}
        keyExtractor={(item, index) => item.id?.toString() || index.toString()}
        renderItem={({ item }) => (
          <View style={styles.itemCard}>
            {/* Convert the row object into text to easily view all column data */}
            <Text style={styles.itemText}>{JSON.stringify(item, null, 2)}</Text>
          </View>
        )}
        ListEmptyComponent={
          <Text style={styles.text}>Connection worked, but the table is empty</Text>
        }
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#161616', paddingTop: 60, paddingHorizontal: 20 },
  center: { flex: 1, backgroundColor: '#161616', justifyContent: 'center', alignItems: 'center', padding: 20 },
  header: { fontSize: 22, fontWeight: 'bold', color: '#3ecf8e', marginBottom: 5, textAlign: 'center' },
  subheader: { fontSize: 14, color: '#9ca3af', marginBottom: 20, textAlign: 'center' },
  itemCard: { backgroundColor: '#1e1e1e', padding: 15, borderRadius: 8, marginBottom: 10, borderWidth: 1, borderColor: '#2e2e2e' },
  itemText: { color: '#e5e7eb', fontFamily: 'monospace', fontSize: 12 },
  text: { color: '#ffffff', marginTop: 10, fontSize: 16, textAlign: 'center' },
  error: { color: '#ef4444', fontWeight: 'bold' }
});
