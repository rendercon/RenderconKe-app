import { FlatList, View, ActivityIndicator, StyleSheet } from 'react-native';
import Colors from '@/constants/Colors';
import SpeakerCard from '@/components/cards/SpeakerCard';
import { useFetchSpeakers } from '@/hooks/useFetchSpeakers';
import StyledText from '@/components/common/StyledText';
import MainContainer from '@/components/containers/MainContainer';
import { sizes } from '@/constants/Styles';
import { useRouter } from 'expo-router';

const Speakers = () => {
  const router = useRouter();
  const { speakerList, loading, error } = useFetchSpeakers();

  return (
    <MainContainer backgroundImage={require('@/assets/images/bg.png')} ImageBackgroundProps={{ resizeMode: 'cover' }}>
      <View style={styles.container}>
        <StyledText size="xl" font="semiBold" style={styles.header}>
          Speakers
        </StyledText>
        {loading ? (
          <ActivityIndicator size="large" color={Colors.palette.secondary} />
        ) : error ? (
          <StyledText variant="error" style={styles.error}>
            Failed to load speakers. Please try again later.
          </StyledText>
        ) : (
          <FlatList
            data={speakerList}
            renderItem={({ item }) => (
              <SpeakerCard speaker={item} onPress={() => router.push(`/speakers/${item.id}`)} />
            )}
            keyExtractor={(item) => item.id}
          />
        )}
      </View>
    </MainContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
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
