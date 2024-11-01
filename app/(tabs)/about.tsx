import { Linking, Pressable, StyleSheet, View } from 'react-native';
import MainContainer from '@/components/containers/MainContainer';
import StyledText from '@/components/common/StyledText';
import { sizes, spacing } from '@/constants/Styles';
import Colors from '@/constants/Colors';
import { Image } from 'expo-image';
import { AntDesign } from '@expo/vector-icons';

const home = () => {
  const handleOpenLink = () => {
    Linking.openURL('https://bit.ly/rcke24pics');
  };

  return (
    <MainContainer
      backgroundImage={require('@/assets/images/bg.png')}
      ImageBackgroundProps={{ resizeMode: 'cover' }}
      preset="scroll"
      safeAreaEdges={['top']}
    >
      <View style={styles.container}>
        <StyledText size="xl" font="medium" style={styles.header}>
          Meet the community
        </StyledText>

        <StyledText style={styles.text}>
          RenderCon Kenya invites you to explore the ever-evolving universe of React and React Native. Unite with
          software engineers, developers, and designers from all levels of expertise, and engage in an unforgettable
          experience of innovation, mentorship, and community spirit.
        </StyledText>

        <StyledText style={styles.text}>
          This is more than just a conference - it's an opportunity to connect, share, and learn from the brightest
          minds in the industry.
        </StyledText>

        <View style={styles.grid}>
          <View style={styles.row}>
            <Image
              source={require('@/assets/images/gallery/1.png')}
              style={[styles.imageHalf, { borderTopLeftRadius: spacing.lg }]}
            />
            <Image
              source={require('@/assets/images/gallery/2.png')}
              style={[styles.imageHalf, { borderTopRightRadius: spacing.lg }]}
            />
          </View>

          <View style={styles.imageWrapper}>
            <Image source={require('@/assets/images/gallery/3.png')} style={styles.imageFull} />
            <Pressable
              onPress={handleOpenLink}
              style={({ pressed }) => [
                styles.buttonContainer,
                {
                  opacity: pressed ? 0.5 : 1,
                },
              ]}
            >
              <View style={styles.centered}>
                <StyledText font="medium" size="md" style={styles.buttonText}>
                  View Gallery RenderConKe '24
                </StyledText>
                <AntDesign name="arrowright" size={16} color={Colors.palette.primary} />
              </View>
            </Pressable>
          </View>
        </View>

        <StyledText size="xl" font="semiBold" style={styles.header}>
          Organizer
        </StyledText>

        <View style={styles.sponsors}>
          <Image
            source={require('@/assets/images/gallery/Reactdevske_logo.png')}
            style={{ width: '100%', height: 100 }}
            contentFit="contain"
          />
        </View>

        <StyledText size="xl" font="semiBold" style={styles.header}>
          Partners & Sponsors
        </StyledText>

        <View style={styles.sponsors}>
          <View style={styles.row}>
            <Image
              source={require('@/assets/images/gallery/lemonade.png')}
              style={{ width: '50%', height: 100 }}
              contentFit="contain"
            />
            <Image
              source={require('@/assets/images/gallery/payd.png')}
              style={{ width: '50%', height: 100 }}
              contentFit="contain"
            />
          </View>
        </View>

        <StyledText size="xl" font="semiBold" style={styles.header}>
          Past Sponsors & Partners
        </StyledText>

        <View style={styles.sponsors}>
          <View style={styles.row}>
            <Image
              source={require('@/assets/images/gallery/devkenya_logo.png')}
              style={{ width: '40%', height: 80, borderRadius: spacing.sm }}
              contentFit="contain"
            />

            <Image
              source={require('@/assets/images/gallery/osca_nairobi_logo.jpg')}
              style={{ width: '40%', height: 80, borderRadius: spacing.sm }}
              contentFit="contain"
            />
          </View>

          <View style={styles.row}>
            <Image
              source={require('@/assets/images/gallery/spaceyatech_logo.jpg')}
              style={{ width: '40%', height: 80, borderRadius: spacing.sm }}
              contentFit="contain"
            />

            <Image
              source={require('@/assets/images/gallery/supabase_logo.png')}
              style={{ width: '50%', height: 80 }}
              contentFit="contain"
            />
          </View>
        </View>
      </View>
    </MainContainer>
  );
};

export default home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: sizes.header,
    paddingHorizontal: sizes.md,
    paddingBottom: sizes.xxxl,
  },
  header: {
    color: Colors.palette.secondary,
    paddingTop: sizes.xl,
    marginBottom: spacing.sm,
  },
  text: {
    color: Colors.palette.text,
    marginBottom: sizes.sm,
    lineHeight: sizes.lg,
  },
  grid: {
    marginBottom: spacing.lg,
    gap: spacing.lg,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  imageHalf: {
    width: '48%',
    height: sizes.galleryImage,
  },
  imageWrapper: {
    position: 'relative',
    width: '100%',
    height: sizes.galleryImage,
  },
  imageFull: {
    width: '100%',
    height: sizes.galleryImage,
    borderBottomLeftRadius: spacing.lg,
    borderBottomRightRadius: spacing.lg,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 50,
    backgroundColor: Colors.palette.secondary,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.lg,
    borderBottomLeftRadius: spacing.lg,
    borderBottomRightRadius: spacing.lg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  centered: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  buttonText: {
    color: Colors.palette.primary,
  },
  sponsors: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.lg,
    alignItems: 'center',
    marginVertical: spacing.lg,
  },
});
