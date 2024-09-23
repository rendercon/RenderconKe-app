import Colors from '@/constants/Colors';
import type { StatusBarProps } from 'expo-status-bar';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import type {
  ImageBackgroundProps,
  KeyboardAvoidingViewProps,
  ScrollViewProps,
  StyleProp,
  ViewStyle,
} from 'react-native';
import { ImageBackground, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, View } from 'react-native';
import type { Edge, SafeAreaViewProps } from 'react-native-safe-area-context';
import { SafeAreaProvider, SafeAreaView, initialWindowMetrics } from 'react-native-safe-area-context';

interface BaseScreenProps {
  children?: React.ReactNode;
  SafeAreaViewProps?: SafeAreaViewProps;
  StatusBarProps?: StatusBarProps;
  keyboardOffset?: number;
  KeyboardAvoidingViewProps?: KeyboardAvoidingViewProps;
  safeAreaEdges?: Edge[];
  style?: StyleProp<ViewStyle>;
  backgroundImage?: ImageBackgroundProps['source'];
  ImageBackgroundProps?: Omit<ImageBackgroundProps, 'source'>;
}

interface FixedScreenProps extends BaseScreenProps {
  preset?: 'fixed';
}

interface ScrollScreenProps extends BaseScreenProps {
  preset: 'scroll';
  keyboardShouldPersistTaps?: 'handled' | 'always' | 'never';
  ScrollViewProps?: ScrollViewProps;
}

export type ScreenProps = ScrollScreenProps | FixedScreenProps;

const isIos = Platform.OS === 'ios';

function isNonScrolling(preset?: ScreenProps['preset']) {
  return !preset || preset === 'fixed';
}

function ScreenWithoutScrolling(props: ScreenProps) {
  const { children, ...rest } = props;
  return (
    <View style={styles.container} {...rest}>
      {children}
    </View>
  );
}

function ScreenWithScrolling(props: ScreenProps) {
  const { children, keyboardShouldPersistTaps = 'handled', ScrollViewProps, ...rest } = props as ScrollScreenProps;
  return (
    <View style={styles.container} {...rest}>
      <ScrollView
        {...{ keyboardShouldPersistTaps }}
        {...ScrollViewProps}
        contentContainerStyle={styles.containerStyle}
        showsVerticalScrollIndicator={false}
      >
        {children}
      </ScrollView>
    </View>
  );
}

const MainContainer = (props: ScreenProps) => {
  const {
    SafeAreaViewProps,
    StatusBarProps,
    safeAreaEdges,
    keyboardOffset = 0,
    KeyboardAvoidingViewProps,
    style,
    backgroundImage,
    ImageBackgroundProps,
  } = props;

  const backgroundColor = Colors.palette.primary;

  const statusBarStyle = 'light';

  const Wrapper = safeAreaEdges?.length ? SafeAreaView : View;

  const wrapperStyles = StyleSheet.compose(styles.container, style);

  const Content = (
    <KeyboardAvoidingView
      behavior={isIos ? 'padding' : undefined}
      keyboardVerticalOffset={keyboardOffset}
      {...KeyboardAvoidingViewProps}
      style={[styles.keyboard, KeyboardAvoidingViewProps?.style]}
    >
      {isNonScrolling(props.preset) ? <ScreenWithoutScrolling {...props} /> : <ScreenWithScrolling {...props} />}
    </KeyboardAvoidingView>
  );

  return (
    <SafeAreaProvider testID="main-container" initialMetrics={initialWindowMetrics}>
      <Wrapper edges={safeAreaEdges} {...SafeAreaViewProps} style={[{ backgroundColor }, wrapperStyles]}>
        <StatusBar style={statusBarStyle} {...StatusBarProps} />
        {backgroundImage ? (
          <ImageBackground source={backgroundImage} style={styles.backgroundImage} {...ImageBackgroundProps}>
            {Content}
          </ImageBackground>
        ) : (
          Content
        )}
      </Wrapper>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? 60 : 40,
  },
  containerStyle: {
    width: '100%',
    alignItems: 'center',
  },
  keyboard: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
});

export default MainContainer;
