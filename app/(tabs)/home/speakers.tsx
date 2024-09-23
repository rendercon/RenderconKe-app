import React from 'react';
import { FlatList, View, ActivityIndicator, StyleSheet } from 'react-native';
import palette from '@/constants/Colors';
import SpeakerCard from '@/components/SpeakerCard';
import BackgroundWrapper from '@/components/containers/BackgroundWrapper';
import { useFetchSpeakers } from '@/hooks/useFetchSpeakers';
import StyledText from '@/components/common/StyledText'; // Import StyledText
import { Stack } from 'expo-router';

const SpeakersTab = () => {
  const { speakerList, loading, error } = useFetchSpeakers();

  return (
    <BackgroundWrapper>
      <View style={styles.container}>
        <StyledText size="xl" font="semiBold" style={styles.header}>
          Speakers
        </StyledText>
        {loading ? (
          <ActivityIndicator size="large" color={palette.palette.secondary} />
        ) : error ? (
          <StyledText variant="error" style={styles.error}>
            Failed to load speakers. Please try again later.
          </StyledText>
        ) : (
          <FlatList
            data={speakerList}
            renderItem={({ item }) => <SpeakerCard speaker={item} />}
            keyExtractor={(item) => item.id}
          />
        )}
      </View>
    </BackgroundWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    marginBottom: 16, // Adjusted to ensure space between the header and the list
  },
  error: {
    textAlign: 'center',
    marginTop: 16, // Added margin to position error message properly
  },
});

export default SpeakersTab;
