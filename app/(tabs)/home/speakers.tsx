import React from 'react';
import { StyleSheet, View } from 'react-native';
import Speakers from '@/components/Speakers'; // Assuming you have the Speakers component in the right path
import MainContainer from '@/components/containers/MainContainer';
import StyledText from '@/components/common/StyledText';
import { spacing } from '@/constants/Styles';

const Home = () => {
  return (
    <MainContainer>
      <View style={styles.container}>
        <Speakers />
      </View>
    </MainContainer>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: spacing.lg,
    width: '100%',
    paddingBottom: spacing.xl,
  },
});
