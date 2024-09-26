import { FlatList, StyleSheet, View } from 'react-native';
import MainContainer from '@/components/containers/MainContainer';
import StyledText from '@/components/common/StyledText';
import { sizes, spacing } from '@/constants/Styles';
import { useBookmarkStore } from '@/state/bookmarks';
import { useStore } from '@/state/store';
import Colors from '@/constants/Colors';
import { getSpeaker, getRoom } from '@/utils/sessions';
import SessionCard from '@/components/cards/SessionCard';

export default function BookmarksPage() {
  const bookmarks = useBookmarkStore((state) => state.bookmarks);
  const allSessions = useStore((state) => state.allSessions);
  const sessions = useStore((state) => state.allSessions.sessions);
  const bookmarkedSessions = sessions.filter((session) =>
    bookmarks.some((bookmark) => bookmark.sessionId === session.id),
  );

  return (
    <MainContainer
      backgroundImage={require('@/assets/images/bg.png')}
      ImageBackgroundProps={{ resizeMode: 'cover' }}
      preset="scroll"
      safeAreaEdges={['top']}
    >
      <View style={styles.container}>
        <StyledText size="xl" font="semiBold" style={styles.header}>
          Bookmarked Sessions
        </StyledText>

        <FlatList
          data={bookmarkedSessions}
          renderItem={({ item }) => {
            const speakers = item.speakers.map((speakerId) => getSpeaker(speakerId, allSessions));
            const room = item?.roomId ? getRoom(item.roomId, allSessions)?.name : 'TBA';
            return <SessionCard session={{ ...item, room, speakers }} />;
          }}
          keyExtractor={(item) => item.id}
          initialNumToRender={10}
          maxToRenderPerBatch={10}
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={() => <View style={{ height: sizes.md }} />}
          ListEmptyComponent={
            <StyledText size="base" style={styles.error}>
              No bookmarked sessions found.
            </StyledText>
          }
          scrollEnabled={false}
        />
      </View>
    </MainContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: sizes.header,
    paddingHorizontal: sizes.md,
    paddingBottom: sizes.xxxl,
    width: '100%',
  },
  header: {
    color: Colors.palette.secondary,
    marginVertical: sizes.xl,
  },
  sessions: {
    // flex: 1,
    gap: spacing.md,
  },
  error: {
    textAlign: 'center',
  },
});
