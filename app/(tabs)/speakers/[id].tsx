import { Image } from 'expo-image';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { AntDesign, FontAwesome6 } from '@expo/vector-icons';
import { useMemo } from 'react';
import { View, StyleSheet, ActivityIndicator, Linking, Pressable } from 'react-native';
import MainContainer from '@/components/containers/MainContainer';
import Colors from '@/constants/Colors';
import { sizes, spacing } from '@/constants/Styles';
import StyledText from '@/components/common/StyledText';
import { useFetchSpeakers } from '@/hooks/useFetchSpeakers';

const SpeakerPage = () => {
  const { id } = useLocalSearchParams();

  const { speakerList, loading, error } = useFetchSpeakers();

  const router = useRouter();

  const speaker = useMemo(() => speakerList.find((s) => s.id === id), [speakerList, id]);

  if (loading) {
    return (
      <MainContainer backgroundImage={require('@/assets/images/bg.png')} ImageBackgroundProps={{ resizeMode: 'cover' }}>
        <ActivityIndicator size="large" color={Colors.palette.secondary} style={styles.loader} />
      </MainContainer>
    );
  }

  if (error) {
    return (
      <MainContainer backgroundImage={require('@/assets/images/bg.png')} ImageBackgroundProps={{ resizeMode: 'cover' }}>
        <View style={styles.container}>
          <StyledText style={styles.error}>Speaker not found</StyledText>
        </View>
      </MainContainer>
    );
  }

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
      <View style={styles.container}>
        <View style={styles.header}>
          <Pressable
            onPress={() => router.back()}
            style={({ pressed }) => [
              styles.backBtn,
              { backgroundColor: pressed ? Colors.palette.cardBg : 'transparent' },
            ]}
          >
            <View>
              <AntDesign name="arrowleft" size={24} color={Colors.palette.secondary} />
            </View>
          </Pressable>
          <View style={styles.name}>
            <StyledText size="xl" font="bold" style={{ color: Colors.palette.secondary }}>
              {speaker?.fullName}
            </StyledText>
          </View>
        </View>

        <View style={styles.top}>
          <Image source={{ uri: speaker?.profilePicture }} style={styles.image} contentFit="cover" />
          <StyledText size="md" style={styles.tagline}>
            {speaker?.tagLine}
          </StyledText>
        </View>

        <View style={styles.row}>
          {speaker?.links.map((link, index) => (
            <Pressable key={index} onPress={() => openURL(link.url)} style={styles.iconBtn}>
              <View>{renderLinkIcon(link.linkType)}</View>
            </Pressable>
          ))}
        </View>

        <StyledText style={styles.bio}>{speaker?.bio}</StyledText>

        {speaker?.sessions.map((session, index) => (
          <View key={index} style={styles.sessionCard}>
            <StyledText size="lg" font="medium" style={{ color: Colors.palette.secondary }}>
              {session?.name}
            </StyledText>
          </View>
        ))}
      </View>
    </MainContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: spacing.lg,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  error: {
    color: Colors.palette.error,
    textAlign: 'center',
  },
  header: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  backBtn: {
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.lg,
    borderRadius: spacing.sm,
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
  sessionCard: {
    backgroundColor: Colors.palette.cardBg,
    padding: spacing.lg,
    borderRadius: sizes.sm,
    marginBottom: spacing.lg,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.palette.border,
  },
});

export default SpeakerPage;
