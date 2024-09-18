import { Link, Stack } from 'expo-router';
import { StyleSheet, View } from 'react-native';

import StyledText from '@/components/common/StyledText';

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'Oops!' }} />
      <View style={styles.container}>
        <StyledText size="lg" font="bold">
          This screen doesn't exist.
        </StyledText>

        <Link href="/" style={styles.link}>
          <StyledText size="base" variant="link">
            Go to home screen!
          </StyledText>
        </Link>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
});
