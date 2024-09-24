import { FlatList, StyleSheet, View } from 'react-native';
import MainContainer from '@/components/containers/MainContainer';
import StyledText from '@/components/common/StyledText';
import { sizes, spacing } from '@/constants/Styles';
import Colors from '@/constants/Colors';
import { useStore } from '@/state/store';
import { useRouter } from 'expo-router';
import SessionCard from '@/components/cards/SessionCard';
import { getRoom, getSpeaker } from '@/utils/sessions';
import ListHeaderButton from '@/components/headers/ListHeaderButton';
import { format } from 'date-fns';

export default function Schedule() {
  const router = useRouter();
  const allSessions = useStore((state) => state.allSessions);
  const sessions = useStore((state) => state.allSessions.sessions);

  return (
    <MainContainer
      backgroundImage={require('@/assets/images/bg.png')}
      ImageBackgroundProps={{ resizeMode: 'cover' }}
      preset="scroll"
      safeAreaEdges={['top']}
    >
      <View style={styles.container}>
        <FlatList
          data={sessions}
          ListHeaderComponent={() => {
            return (
              <View style={[styles.sectionHeader]}>
                <ListHeaderButton
                  title={format('2024-10-04T00:00:00Z', 'EEE')}
                  subtitle="Day 1"
                  isBold={true}
                  onPress={() => {}}
                />
                <ListHeaderButton
                  title={format('2024-10-05T00:00:00Z', 'EEE')}
                  subtitle="Day 2"
                  isBold={false}
                  onPress={() => {}}
                />
              </View>
            );
          }}
          renderItem={({ item }) => {
            const speakers = item.speakers.map((speakerId) => getSpeaker(speakerId, allSessions));
            return (
              <SessionCard
                session={{ ...item, room: '' }}
                speakers={speakers}
                room={item?.roomId ? getRoom(item.roomId, allSessions).name : 'TBA'}
                onPress={() => router.push(`/sessions/${item.id}`)}
              />
            );
          }}
          keyExtractor={(item) => item.id}
          initialNumToRender={10}
          maxToRenderPerBatch={10}
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={() => <View style={{ height: sizes.md }} />}
          ListEmptyComponent={
            <StyledText size="base" style={styles.error}>
              No sessions found.
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
    paddingTop: sizes.header + 40,
    paddingHorizontal: sizes.md,
    paddingBottom: sizes.xxxl,
    width: '100%',
  },
  header: {
    color: Colors.palette.secondary,
    marginVertical: sizes.md,
  },
  sectionHeader: {
    marginBottom: sizes.md,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  error: {
    textAlign: 'center',
  },
});
