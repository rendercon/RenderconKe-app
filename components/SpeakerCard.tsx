import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { Speaker } from './types'; // Import the Speaker type
import { Link } from 'expo-router';

interface SpeakerCardProps {
  speaker: Speaker;
}

const SpeakerCard: React.FC<SpeakerCardProps> = ({ speaker }) => {
  return (
    <View style={styles.card}>
      
      {speaker.profilePicture ? (
        <Image
          source={{ uri: speaker.profilePicture }}
          style={styles.image}
          resizeMode="cover"
        />
      ) : (
        <View style={styles.imageFallback}>
          <Text style={styles.imageFallbackText}>No Image</Text>
        </View>
      )}
      <View style={styles.textContainer}>
        <Text style={styles.name}>{speaker.fullName}</Text>
        <Link href={`/speakers/${speaker.id}`}>
        <Text style={styles.occupation}>{speaker.sessions[0]?.name || 'Session you cant afford to miss!'}</Text>
        </Link>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#351e4a', // primary color
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
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
    fontSize: 12,
  },
  textContainer: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: '700',
    color: '#eee712', // secondary color
  },
  occupation: {
    fontSize: 14,
    color: '#fff', // text color
    marginTop: 4,
   
  },
});

export default SpeakerCard;
