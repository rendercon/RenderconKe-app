import React from 'react';
import { ImageBackground, StyleSheet, ViewStyle, StyleProp } from 'react-native';
import palette from '@/constants/Colors';

interface BackgroundWrapperProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

const BackgroundWrapper: React.FC<BackgroundWrapperProps> = ({ children, style }) => {
  return (
    <ImageBackground source={require('@/assets/images/bg-gradient.png')} style={[styles.background, style]}>
      {children}
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: palette.palette.primary,
  },
});

export default BackgroundWrapper;
