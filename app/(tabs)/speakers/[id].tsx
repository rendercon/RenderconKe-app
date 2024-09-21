import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ActivityIndicator, ScrollView, Linking } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import palette from '@/constants/Colors';
import { FontAwesome } from '@expo/vector-icons'; // Importing FontAwesome icons for Twitter (X) and LinkedIn

type Speaker = {
  id: string;
  fullName: string;
  profilePicture: string;
  occupation: string;
  bio: string;
  socialMedia?: {
    twitter?: string;
    linkedin?: string;
  };
  sessions: {
    time: string;
    title: string;
  }[];
};

const SpeakerPage = () => {
  const { id } = useLocalSearchParams(); // Fetch dynamic ID from route
  const [speaker, setSpeaker] = useState<Speaker | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching the speaker data based on the dynamic ID
    const fetchSpeaker = async () => {
      try {
        const res = await fetch(`https://sessionize.com/api/v2/d899srzm/view/Speakers`);
        const data = await res.json();
        const speakerData = data.find((s: Speaker) => s.id === id); // Find speaker by dynamic ID
        setSpeaker(speakerData);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchSpeaker();
  }, [id]);

  if (loading) {
    return <ActivityIndicator size="large" color={palette.palette.secondary} style={styles.loader} />;
  }

  if (!speaker) {
    return <Text style={styles.error}>Speaker not found</Text>;
  }

  // Fallbacks for social media links
  const twitterLink = speaker.socialMedia?.twitter || 'https://twitter.com'; // Fallback Twitter link
  const linkedinLink = speaker.socialMedia?.linkedin || 'https://linkedin.com'; // Fallback LinkedIn link

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.name}>{speaker.fullName}</Text>
        <Image source={{ uri: speaker.profilePicture }} style={styles.image} resizeMode="cover" />
        <Text style={styles.occupation}>{speaker.occupation}</Text>
      </View>

      <View style={styles.socialMediaContainer}>
        <FontAwesome
          name="twitter"
          size={40}
          color="#1DA1F2"
          onPress={() => openURL(twitterLink)}
          style={styles.socialIcon}
        />
        <FontAwesome
          name="linkedin"
          size={40}
          color="#0077B5"
          onPress={() => openURL(linkedinLink)}
          style={styles.socialIcon}
        />
      </View>

      <Text style={styles.bio}>{speaker.bio}</Text>

      {speaker.sessions.map((session, index) => (
        <View key={index} style={styles.sessionCard}>
          <Text style={styles.sessionTime}>{session.time}</Text>
          <Text style={styles.sessionTitle}>{session.title}</Text>
        </View>
      ))}
    </ScrollView>
  );
};

const openURL = (url: string) => {
  // Function to open social media links
  Linking.openURL(url);
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: palette.palette.primary,
    padding: 16,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  error: {
    color: palette.palette.error,
    textAlign: 'center',
    marginTop: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: palette.palette.secondary,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginVertical: 16,
  },
  occupation: {
    fontSize: 18,
    color: palette.palette.secondary,
    marginBottom: 12,
  },
  socialMediaContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 12,
  },
  socialIcon: {
    marginHorizontal: 15,
  },
  bio: {
    fontSize: 14,
    color: palette.palette.text,
    marginVertical: 20,
    lineHeight: 22,
  },
  sessionCard: {
    backgroundColor: '#2c2c54',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#eee',
  },
  sessionTime: {
    fontSize: 16,
    color: '#eee',
  },
  sessionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 4,
  },
});

export default SpeakerPage;
