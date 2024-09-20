import React, { useEffect, useState } from 'react';
import { FlatList, View, ActivityIndicator, StyleSheet, Text } from 'react-native';
import SpeakerCard from './SpeakerCard'; // Assuming it's in the same directory
import palette from '@/constants/Colors'; // Use default import if Colors is exported as default
import { Speaker } from './types'; // Import the Speaker type
import StyledText from './common/StyledText';

const Speakers = () => {
  const [speakerList, setSpeakerList] = useState<Speaker[]>([]); // Use Speaker[] type for the array
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchSpeakers = async () => {
    setLoading(true);
    setError(false);
    try {
      const res = await fetch("https://sessionize.com/api/v2/d899srzm/view/Speakers");
      if (!res.ok) throw new Error("Failed to fetch speakers");
      const data = await res.json();
      setSpeakerList(data);
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSpeakers();
  }, []);

  return (
    <View style={styles.container}>
        <StyledText size="lg" font="semiBold" style={styles.header}>
          Speakers
        </StyledText>
      {loading ? (
        <ActivityIndicator size="large" color={palette.palette.secondary} /> // Access secondary color correctly
      ) : error ? (
        <Text style={styles.error}>Failed to load speakers. Please try again later.</Text>
      ) : (
        <FlatList
          data={speakerList}
          renderItem={({ item }) => <SpeakerCard speaker={item} />}
          keyExtractor={(item) => item.id} // TypeScript will recognize id because of the Speaker type
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#1e0536', // Primary background color
  },
  header: {
    fontSize: 24,
    fontWeight: '700',
    color
: '#eee712', // secondary color
    textAlign: 'left',
    marginBottom: 16,
  },
  error: {
    textAlign: 'center',
    color: '#ff3232', // error color
  },
});

export default Speakers;
