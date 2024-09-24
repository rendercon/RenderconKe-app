import { View, StyleSheet, Pressable } from 'react-native';
import { Speaker, Session } from '@/constants/types';
import Colors from '@/constants/Colors';
import { sizes, spacing } from '@/constants/Styles';
import StyledText from '../common/StyledText';
import { Image } from 'expo-image';
import { format } from 'date-fns';
import { Ionicons } from '@expo/vector-icons';

interface SessionCardProps {
  session: Session;
  speakers: Speaker[];
  room: string;
  onPress?: () => void;
}

const SessionCard: React.FC<SessionCardProps> = ({ session, speakers, room, onPress }) => {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.card,
        { backgroundColor: pressed ? Colors.palette.primary : Colors.palette.cardBg },
      ]}
      onPress={onPress}
    >
      <View style={styles.column}>
        {speakers.map((_speaker) => (
          <View key={_speaker.id} style={styles.speaker}>
            {_speaker.profilePicture ? (
              <Image source={{ uri: _speaker.profilePicture }} style={styles.image} contentFit="cover" />
            ) : (
              <Image
                source={require('@/assets/images/rendercon-white-logo.png')}
                style={styles.image}
                contentFit="cover"
              />
            )}
            <View style={styles.textContainer}>
              <StyledText size="md" font="semiBold" style={{ color: Colors.palette.secondary }}>
                {_speaker.fullName}
              </StyledText>
              <StyledText size="sm">{_speaker?.tagLine}</StyledText>
            </View>
          </View>
        ))}
      </View>

      <View style={styles.divider} />

      <View style={styles.column}>
        <View style={styles.room}>
          <Ionicons name="location-outline" size={20} color={Colors.palette.secondary} />
          <StyledText style={styles.italic}>{room}</StyledText>
        </View>
        <StyledText style={styles.description}>{session.title}</StyledText>
        <StyledText size="base" font="light" style={{ color: Colors.palette.secondary }}>
          {session?.startsAt ? format(session.startsAt, 'h:mm a') : 'TBA'} -{' '}
          {session?.endsAt ? format(session.endsAt, 'h:mm a') : 'TBA'}
        </StyledText>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    borderColor: Colors.palette.border,
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: sizes.sm,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.lg,
  },
  column: {
    flexDirection: 'column',
  },
  speaker: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  image: {
    width: 72,
    height: 72,
    borderRadius: spacing.sm,
    marginRight: spacing.lg,
    backgroundColor: Colors.palette.primary,
  },
  divider: {
    height: 1,
    backgroundColor: Colors.palette.secondary,
    marginVertical: spacing.xl,
  },
  textContainer: {
    flex: 1,
    gap: spacing.xs,
  },
  name: {
    color: Colors.palette.secondary,
  },
  room: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginBottom: spacing.sm,
  },
  italic: {
    fontStyle: 'italic',
    color: Colors.palette.text,
  },
  description: {
    color: Colors.palette.text,
    marginBottom: spacing.lg,
  },
});

export default SessionCard;
