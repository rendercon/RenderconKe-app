import { StyleSheet, View } from 'react-native';
import MainContainer from '@/components/containers/MainContainer';
import StyledText from '@/components/common/StyledText';
import { spacing } from '@/constants/Styles';
// import Colors from '@/constants/Colors';

const home = () => {
  return (
    <MainContainer>
      <View style={styles.container}>
        <StyledText size="lg" font="semiBold">
          Bookmarks
        </StyledText>
      </View>
    </MainContainer>
  );
};

export default home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: spacing.lg,
    width: '100%',
    paddingBottom: spacing.xl,
  },
});
