import { FlatList, View, StyleSheet } from 'react-native';
import Colors from '@/constants/Colors';
import SpeakerCard from '@/components/cards/SpeakerCard';
import StyledText from '@/components/common/StyledText';
import MainContainer from '@/components/containers/MainContainer';
import { sizes } from '@/constants/Styles';
import { useRouter } from 'expo-router';
import { useStore } from '@/state/store';

const Speakers = () => {
  const router = useRouter();
  const speakers = useStore((state) => state.allSessions.speakers);

  return (
    <MainContainer
      backgroundImage={require('@/assets/images/bg.png')}
      ImageBackgroundProps={{ resizeMode: 'cover' }}
      preset="fixed"
      safeAreaEdges={['top']}
    >
      <View style={styles.container}>
        <StyledText size="xl" font="semiBold" style={styles.header}>
          Speakers
        </StyledText>
        <FlatList
          data={speakers}
          renderItem={({ item }) => <SpeakerCard speaker={item} onPress={() => router.push(`/speakers/${item.id}`)} />}
          keyExtractor={(item) => item.id}
          initialNumToRender={10}
          maxToRenderPerBatch={10}
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={() => <View style={{ height: sizes.md }} />}
          ListEmptyComponent={<StyledText style={styles.error}>No speakers found. Please try again later.</StyledText>}
        />
      </View>
    </MainContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: sizes.header,
    paddingHorizontal: sizes.md,
    paddingBottom: sizes.md,
  },
  header: {
    color: Colors.palette.secondary,
    marginVertical: sizes.md,
  },
  error: {
    textAlign: 'center',
    marginTop: 16,
  },
});

export default Speakers;
