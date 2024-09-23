import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import palette from '@/constants/Colors';
import StyledText from '@/components/common/StyledText'; // Import the StyledText component

interface SpeakerHeaderProps {
  name: string;
  occupation: string;
  profilePicture: string;
}

const SpeakerHeader: React.FC<SpeakerHeaderProps> = ({ name, occupation, profilePicture }) => {
  return (
    <View style={styles.header}>
      {/* Replaced Text with StyledText */}
      <StyledText size="xxl" font="bold" style={styles.name}>
        {name}
      </StyledText>
      <Image source={{ uri: profilePicture }} style={styles.image} resizeMode="cover" />
      <StyledText size="lg" font="regular" style={styles.occupation}>
        {occupation}
      </StyledText>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  name: {
    marginBottom: 8,
    color: palette.palette.secondary
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 20,
    marginVertical: 16,
  },
  occupation: {
    marginBottom: 12,
  },
});

export default SpeakerHeader;
