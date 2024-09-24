import { View, StyleSheet, Pressable } from 'react-native';
import { Speaker } from '@/constants/types';
import Colors from '@/constants/Colors';
import { sizes, spacing, blurhash } from '@/constants/Styles';
import StyledText from '../common/StyledText';
import { Image } from 'expo-image';

interface SpeakerCardProps {
  speaker: Speaker;
  onPress?: () => void;
}

const SpeakerCard: React.FC<SpeakerCardProps> = ({ speaker, onPress }) => {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.card,
        { backgroundColor: pressed ? Colors.palette.primary : Colors.palette.cardBg },
      ]}
      onPress={onPress}
    >
      {speaker.profilePicture ? (
        <Image
          source={{ uri: speaker.profilePicture }}
          style={styles.image}
          contentFit="cover"
          placeholder={{ blurhash }}
          transition={200}
        />
      ) : (
        <View style={styles.imageFallback}>
          <StyledText size="md" style={styles.imageFallbackText}>
            No Image
          </StyledText>
        </View>
      )}
      <View style={styles.textContainer}>
        <StyledText size="lg" font="bold" style={styles.name}>
          {speaker.fullName}
        </StyledText>
        <StyledText size="sm">{speaker?.tagLine}</StyledText>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    borderColor: Colors.palette.border,
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: sizes.sm,
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.sm,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: spacing.sm,
    marginRight: spacing.lg,
    backgroundColor: Colors.palette.primary,
  },
  imageFallback: {
    width: 80,
    height: 80,
    borderRadius: spacing.sm,
    marginRight: spacing.lg,
    backgroundColor: Colors.palette.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageFallbackText: {
    color: Colors.palette.text,
  },
  textContainer: {
    flex: 1,
    gap: spacing.sm,
  },
  name: {
    color: Colors.palette.secondary,
  },
});

export default SpeakerCard;
