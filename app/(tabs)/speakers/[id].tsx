import React, { useState, useMemo } from 'react';
import { View, ScrollView, ActivityIndicator, StyleSheet, TouchableOpacity, Linking, Image } from 'react-native';
import { Stack, useLocalSearchParams, useNavigation } from 'expo-router';
import palette from '@/constants/Colors';
import { useFetchSpeakers } from '@/hooks/useFetchSpeakers';
import SpeakerHeader from '@/components/headers/SpeakerHeader';
import BackgroundWrapper from '@/components/containers/BackgroundWrapper';
import StyledText from '@/components/common/StyledText';
import { FontAwesome } from '@expo/vector-icons';

const SpeakerPage = () => {
  const { id } = useLocalSearchParams(); // Fetch dynamic ID from route
  const navigation = useNavigation();
  const { speakerList, loading, error } = useFetchSpeakers();
  const [savedSessions, setSavedSessions] = useState<{ [key: string]: boolean }>({});

  const speaker = useMemo(() => speakerList.find((s) => s.id === id), [speakerList, id]);

  if (loading) {
    return <ActivityIndicator size="large" color={palette.palette.secondary} style={styles.loader} />;
  }

  if (error || !speaker) {
    return (
      <StyledText variant="error" style={styles.error}>
        Speaker not found
      </StyledText>
    );
  }

  const toggleSaveSession = (sessionIndex: number) => {
    setSavedSessions((prevState) => ({
      ...prevState,
      [sessionIndex]: !prevState[sessionIndex],
    }));
  };

  const socialMediaLinks = [
    {
      name: 'twitter',
      url: speaker.socialMedia?.twitter || 'https://x.com/renderconke',
      icon: require('@/assets/images/x.png'),
    },
    {
      name: 'linkedin',
      url: speaker.socialMedia?.linkedin || 'https://www.linkedin.com/company/renderconke/',
      icon: require('@/assets/images/linkedin.png'),
    },
  ];

  return (
    <BackgroundWrapper>
      <ScrollView contentContainerStyle={styles.container}>
        {/* Back Button */}
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <FontAwesome name="arrow-left" size={18} color={palette.palette.secondary} />
        </TouchableOpacity>

        <SpeakerHeader
          name={speaker.fullName}
          occupation={speaker.occupation}
          profilePicture={speaker.profilePicture}
        />

        <StyledText size="md" variant="text" style={styles.bio}>
          {speaker.bio}
        </StyledText>

        <View style={styles.socialMediaContainer}>
          {socialMediaLinks.map((social, index) => (
            <TouchableOpacity key={index} onPress={() => Linking.openURL(social.url)} style={styles.socialIconImage}>
              <Image source={social.icon} />
            </TouchableOpacity>
          ))}
        </View>

        {speaker.sessions.map((session, index) => (
          <View key={index} style={styles.sessionCard}>
            <View style={styles.sessionHeader}>
              <View>
                <StyledText size="md" variant="text" style={styles.sessionTime}>
                  {session.time}
                </StyledText>
                <StyledText size="sm" font="bold" style={styles.sessionTitle}>
                  {session.name}
                </StyledText>
              </View>
              <TouchableOpacity onPress={() => toggleSaveSession(index)}>
                <FontAwesome
                  name={savedSessions[index] ? 'bookmark' : 'bookmark-o'}
                  size={20}
                  color={savedSessions[index] ? palette.palette.secondary : '#ccc'}
                />
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>
    </BackgroundWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    justifyContent: 'center',
    marginTop: 30,
  },
  backButton: {
    position: 'absolute',
    top: 10,
    left: 10,
    zIndex: 10,
    padding: 8,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  error: {
    textAlign: 'center',
    marginTop: 20,
  },
  bio: {
    marginTop: 0,
    marginBottom: 20,
    lineHeight: 22,
  },
  socialMediaContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 15,
    gap: 16,
  },
  socialIconImage: {
    borderWidth: 1,
    borderColor: '#eee',
    padding: 6,
    borderRadius: 5,
    backgroundColor: 'rgba(250, 250, 250, 0.2)',
  },
  sessionCard: {
    backgroundColor: 'rgba(250, 250, 250, 0.2)',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#eee',
  },
  sessionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 4,
  },
  sessionTime: {
    color: '#eee',
  },
  sessionTitle: {
    marginTop: 4,
    marginRight: 6,
    flexShrink: 1,
    flexWrap: 'wrap',
  },
});

export default SpeakerPage;
