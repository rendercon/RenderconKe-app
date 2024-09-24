import { Image } from 'expo-image';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import { View, StyleSheet, Pressable, ImageBackground, useWindowDimensions } from 'react-native';
import MainContainer from '@/components/containers/MainContainer';
import Colors from '@/constants/Colors';
import { sizes, spacing } from '@/constants/Styles';
import StyledText from '@/components/common/StyledText';
import { useStore } from '@/state/store';
import { getSpeaker, getRoom } from '@/utils/sessions';
import { format } from 'date-fns';
import { useBookmarkStore } from '@/state/bookmarks';

const SessionPage = () => {
  const { id } = useLocalSearchParams();
  const allSessions = useStore((state) => state.allSessions);
  const sessions = useStore((state) => state.allSessions.sessions);
  const session = sessions.find((s) => s.id === id);

  const bookmarks = useBookmarkStore((state) => state.bookmarks);
  const toggleBookmarked = useBookmarkStore((state) => state.toggleBookmarked);
  const isBookmarked = bookmarks.some((b) => b.sessionId === id);

  const { height } = useWindowDimensions();

  const router = useRouter();

  return (
    <MainContainer preset="scroll">
      <Stack.Screen
        options={{
          title: '',
          headerLeft: () => (
            <AntDesign name="arrowleft" size={24} color={Colors.palette.secondary} onPress={() => router.back()} />
          ),
          headerRight: () => (
            <Pressable
              style={({ pressed }) => [
                {
                  opacity: pressed ? 0.5 : 1,
                },
              ]}
              onPress={() => session?.id && toggleBookmarked(session.id)}
            >
              <Ionicons
                name={isBookmarked ? 'bookmark' : 'bookmark-outline'}
                size={24}
                color={Colors.palette.secondary}
              />
            </Pressable>
          ),
        }}
      />

      <View style={styles.container}>
        <ImageBackground
          source={require('@/assets/images/bg-gradient.png')}
          style={[styles.topImage, { height: height / 3 }]}
          resizeMode="cover"
        >
          <StyledText size="xl" font="medium" style={styles.header}>
            {session?.title}
          </StyledText>
        </ImageBackground>

        <View style={styles.wrapper}>
          {session?.speakers.map((speakerId: string) => {
            const _speaker = getSpeaker(speakerId, allSessions);

            return (
              <Pressable
                key={_speaker.id}
                style={({ pressed }) => [
                  styles.speaker,
                  { backgroundColor: pressed ? Colors.palette.cardBg : 'transparent' },
                ]}
                onPress={() => router.push(`/speakers/${_speaker.id}`)}
              >
                {_speaker.profilePicture ? (
                  <Image source={{ uri: _speaker.profilePicture }} style={styles.image} contentFit="cover" />
                ) : (
                  <Image
                    source={require('@/assets/images/rendercon-white-logo.png')}
                    style={styles.image}
                    contentFit="cover"
                  />
                )}
                <View style={styles.textContainer}>
                  <StyledText size="md" font="bold" style={{ color: Colors.palette.secondary }}>
                    {_speaker.fullName}
                  </StyledText>
                  <StyledText size="sm">{_speaker?.tagLine}</StyledText>
                </View>
              </Pressable>
            );
          })}

          <View style={styles.content}>
            <View style={styles.label}>
              <StyledText size="md" font="medium" style={{ color: Colors.palette.primary }}>
                About
              </StyledText>
            </View>

            <StyledText size="base" style={styles.description}>
              {session?.description}
            </StyledText>
          </View>

          <View style={styles.content}>
            <View style={styles.label}>
              <StyledText size="md" font="medium" style={{ color: Colors.palette.primary }}>
                Date
              </StyledText>
            </View>

            <StyledText size="base">
              {session?.startsAt ? format(session.startsAt, 'EEEE, MMM d, yyyy') : 'TBA'}
            </StyledText>
          </View>

          <View style={styles.content}>
            <View style={styles.label}>
              <StyledText size="md" font="medium" style={{ color: Colors.palette.primary }}>
                Time
              </StyledText>
            </View>

            <StyledText size="base">{session?.startsAt ? format(session.startsAt, 'h:mm a') : 'TBA'}</StyledText>
          </View>

          <View style={styles.content}>
            <View style={styles.label}>
              <StyledText size="md" font="medium" style={{ color: Colors.palette.primary }}>
                Venue
              </StyledText>
            </View>

            <StyledText size="base">{session?.roomId ? getRoom(session.roomId, allSessions).name : 'TBA'}</StyledText>
          </View>
        </View>
      </View>
    </MainContainer>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
  topImage: {
    width: '100%',
    marginBottom: spacing.lg,
    padding: spacing.sm,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomColor: Colors.palette.border,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  header: {
    color: Colors.palette.secondary,
    textAlign: 'center',
  },
  wrapper: {
    flex: 1,
    width: '100%',
    paddingHorizontal: spacing.lg,
  },
  speaker: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  image: {
    width: 72,
    height: 72,
    borderRadius: spacing.sm,
    marginRight: spacing.lg,
    backgroundColor: Colors.palette.primary,
  },
  textContainer: {
    flex: 1,
    gap: spacing.sm,
  },
  content: {
    gap: spacing.sm,
    marginTop: spacing.lg,
  },
  label: {
    maxWidth: 80,
    backgroundColor: Colors.palette.secondary,
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.lg,
    borderRadius: spacing.lg,
  },
  description: {
    lineHeight: sizes.lg,
  },
});

export default SessionPage;
