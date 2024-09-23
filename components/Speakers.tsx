import React from 'react';
import { FlatList, View, ActivityIndicator, StyleSheet } from 'react-native';
import SpeakerCard from './SpeakerCard';
import palette from '@/constants/Colors'; // Use default import if Colors is exported as default
import { useFetchSpeakers } from '@/hooks/useFetchSpeakers'; // Use the custom hook
import StyledText from './common/StyledText';

const Speakers = () => {
  const { speakerList, loading, error } = useFetchSpeakers(); // Use the custom hook to fetch speakers

  return (
    <View style={styles.container}>
      {/* StyledText replaces Text for a consistent font style */}
      <StyledText size="lg" font="semiBold" style={styles.header}>
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
    backgroundColor: palette.palette.primary, // Consistent primary background color
  },
  header: {
    marginBottom: 16,
    color: palette.palette.secondary // Removed font size and color since StyledText handles that
  },
  error: {
    textAlign: 'center',
    marginVertical: 10,
  },
});

export default Speakers;
