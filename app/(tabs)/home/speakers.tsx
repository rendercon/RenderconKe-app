import React, { useEffect, useState } from 'react';
import { FlatList, View, ActivityIndicator, StyleSheet, Text } from 'react-native';
import palette from '@/constants/Colors'; // Use your color palette
import SpeakerCard from '@/components/SpeakerCard';
import { Speaker } from '@/components/types';

const SpeakersTab = () => {
  const [speakerList, setSpeakerList] = useState<Speaker[]>([]);
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
      <Text style={styles.header}>Speakers</Text>

      {loading ? (
        <ActivityIndicator size="large" color={palette.palette.secondary} />
      ) : error ? (
        <Text style={styles.error}>Failed to load speakers. Please try again later.</Text>
      ) : (
        <FlatList
          data={speakerList}
          renderItem={({ item }) => <SpeakerCard speaker={item} />}
          keyExtractor={(item) => item.id}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: palette.palette.primary,
  },
  header: {
    fontSize: 24,
    fontWeight: '700',
    color: palette.palette.secondary,
    textAlign: 'center',
    marginBottom: 16,
  },
  error: {
    textAlign: 'center',
    color: palette.palette.error,
  },
});

export default SpeakersTab;
