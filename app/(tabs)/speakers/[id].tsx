import { Image } from 'expo-image';
import { Stack, useLocalSearchParams, useNavigation, useRouter } from 'expo-router';
import { AntDesign, FontAwesome6, Ionicons } from '@expo/vector-icons';
import { useEffect } from 'react';
import { View, StyleSheet, Linking, Pressable, Platform } from 'react-native';
import MainContainer from '@/components/containers/MainContainer';
import Colors from '@/constants/Colors';
import { sizes, spacing } from '@/constants/Styles';
import StyledText from '@/components/common/StyledText';
import { useStore } from '@/state/store';
import { getSession } from '@/utils/sessions';
import { formatSessionDate } from '@/utils/formatDate';
import { useBookmarkStore } from '@/state/bookmarks';

const SpeakerPage = () => {
  const { id } = useLocalSearchParams();
  const allSessions = useStore((state) => state.allSessions);
  const speakers = useStore((state) => state.allSessions.speakers);
  const speaker = speakers.find((s) => s.id === id);

  const bookmarks = useBookmarkStore((state) => state.bookmarks);

  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({ title: speaker?.fullName });
  }, [speaker, navigation]);

  const router = useRouter();

  const openURL = (url: string) => {
    Linking.openURL(url);
  };

  const renderLinkIcon = (linkType: string) => {
    switch (linkType.toLowerCase()) {
      case 'twitter':
        return <FontAwesome6 name="x-twitter" size={36} color={Colors.palette.secondary} />;
      case 'linkedin':
        return <FontAwesome6 name="linkedin" size={36} color={Colors.palette.secondary} />;
      default:
        return <FontAwesome6 name="link" size={36} color={Colors.palette.secondary} />;
    }
  };

  return (
    <MainContainer
      backgroundImage={require('@/assets/images/bg.png')}
      ImageBackgroundProps={{ resizeMode: 'cover' }}
      preset="scroll"
      safeAreaEdges={['top']}
    >
      <Stack.Screen
        options={{
          headerLeft: () => (
            <AntDesign name="arrowleft" size={24} color={Colors.palette.secondary} onPress={() => router.back()} />
          ),
        }}
      />
      <View style={styles.container}>
        <View style={styles.top}>
          <Image
            source={
              speaker?.profilePicture
                ? { uri: speaker.profilePicture }
                : require('@/assets/images/rendercon-white-logo.png')
            }
            style={styles.image}
            contentFit="cover"
          />
          <StyledText size="md" style={styles.tagline}>
            {speaker?.tagLine}
          </StyledText>
        </View>

        <View style={styles.row}>
          {speaker?.links &&
            speaker?.links.map((link: { title: string; url: string; linkType: string }, index) => (
              <Pressable key={index} onPress={() => openURL(link.url)} style={styles.iconBtn}>
                <View>{renderLinkIcon(link.linkType)}</View>
              </Pressable>
            ))}
        </View>

        <StyledText style={styles.bio}>{speaker?.bio}</StyledText>

        <StyledText size="lg" font="medium" style={styles.subtitle}>
          Session(s)
        </StyledText>

        {speaker?.sessions.map((session: number, index) => (
          <Pressable key={index} style={styles.sessionCard} onPress={() => router.push(`/sessions/${session}`)}>
            <View style={styles.topRow}>
              <StyledText size="md" font="light">
                {formatSessionDate('2024-10-05T09:00:00Z')}
              </StyledText>
              <Ionicons
                name={
                  bookmarks.some((bookmark) => bookmark.sessionId === String(session)) ? 'bookmark' : 'bookmark-outline'
                }
                size={24}
                color={Colors.palette.secondary}
              />
            </View>
            <StyledText size="md" font="medium" style={{ color: Colors.palette.secondary }}>
              {getSession(session, allSessions).title}
            </StyledText>
          </Pressable>
        ))}
      </View>
    </MainContainer>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? sizes.header : sizes.md,
    paddingHorizontal: sizes.md,
    paddingBottom: sizes.xxxl,
    width: '100%',
  },
  name: {
    flex: 1,
    alignItems: 'center',
  },
  top: {
    alignItems: 'center',
    marginBottom: sizes.lg,
  },
  image: {
    width: sizes.cardImage,
    height: sizes.cardImage,
    borderRadius: spacing.sm,
    marginBottom: spacing.lg,
  },
  tagline: {
    color: Colors.palette.secondary,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    gap: sizes.md,
  },
  iconBtn: {
    backgroundColor: Colors.palette.iconBg,
    padding: sizes.sm,
    borderColor: Colors.palette.border,
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: sizes.sm,
  },
  socialIcon: {
    marginHorizontal: 15,
  },
  bio: {
    fontSize: 14,
    color: Colors.palette.text,
    marginVertical: 20,
    lineHeight: 22,
  },
  subtitle: {
    color: Colors.palette.secondary,
    marginVertical: sizes.md,
  },
  sessionCard: {
    width: '100%',
    backgroundColor: Colors.palette.cardBg,
    padding: spacing.lg,
    borderRadius: sizes.sm,
    marginBottom: spacing.lg,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.palette.border,
    flexDirection: 'column',
    gap: spacing.lg,
  },
  topRow: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export default SpeakerPage;
