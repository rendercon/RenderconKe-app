import { Pressable, StyleSheet } from 'react-native';
import StyledText from '../common/StyledText';
import Colors from '@/constants/Colors';
import { Feather } from '@expo/vector-icons';
import { spacing } from '@/constants/Styles';

const ListHeaderButton = ({
  onPress,
  isBold,
  title,
  subtitle,
}: {
  onPress: () => void;
  isBold: boolean;
  title: string;
  subtitle: string | null;
}) => {
  const opacity = { opacity: isBold ? 1 : 0.5 };
  const color = { color: isBold ? Colors.palette.secondary : Colors.palette.text };

  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.tab,
        {
          borderBottomColor: isBold ? Colors.palette.secondary : 'transparent',
        },
      ]}
    >
      <Feather
        name="calendar"
        size={24}
        color={isBold ? Colors.palette.secondary : Colors.palette.text}
        style={opacity}
      />
      <StyledText font="medium" size="xl" style={[styles.text, { ...color, ...opacity }]}>
        {title},{' '}
        {subtitle ? (
          <StyledText font="medium" size="xl" style={[styles.text, { ...color, ...opacity }]}>
            {' '}
            {subtitle}{' '}
          </StyledText>
        ) : null}
      </StyledText>
    </Pressable>
  );
};

export default ListHeaderButton;

const styles = StyleSheet.create({
  tab: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xl,
    borderBottomWidth: 3,
    paddingBottom: spacing.sm,
  },
  text: {
    letterSpacing: 1.5,
  },
});
