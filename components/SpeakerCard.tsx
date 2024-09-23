import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { Speaker } from './types'; // Import the Speaker type
import { Link } from 'expo-router';
import StyledText from './common/StyledText'; // Import the StyledText component

interface SpeakerCardProps {
  speaker: Speaker;
}

const SpeakerCard: React.FC<SpeakerCardProps> = ({ speaker }) => {
  return (
    <View style={styles.card}>
      {speaker.profilePicture ? (
        <Image source={{ uri: speaker.profilePicture }} style={styles.image} resizeMode="cover" />
      ) : (
        <View style={styles.imageFallback}>
          <StyledText size="xs" font="light" style={styles.imageFallbackText}>No Image</StyledText>
        </View>
      )}
      <View style={styles.textContainer}>
        <StyledText size="lg" font="semiBold" style={styles.name}>
          {speaker.fullName}
        </StyledText>
        <Link href={`/speakers/${speaker.id}`}>
          <StyledText size="sm" font="regular" style={styles.occupation}>
            {speaker.sessions[0]?.name || 'Session you can’t afford to miss!'}
          </StyledText>
        </Link>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'rgba(250, 250, 250,0.15)',
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    borderWidth: 1,
    borderColor: '#eee',
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 16,
    backgroundColor: '#fff', // Fallback background
  },
  imageFallback: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 16,
    backgroundColor: '#333',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageFallbackText: {
    color: '#fff',
  },
  textContainer: {
    flex: 1,
  },
  name: {
    marginBottom: 4, // Adjusted for spacing between name and occupation
  },
  occupation: {
    color: '#fff', // You can customize the color here if needed
    marginTop: 4,
  },
});

export default SpeakerCard;
