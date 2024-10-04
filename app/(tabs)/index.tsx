import { useScrollToTop } from '@react-navigation/native';
import { useFocusEffect } from 'expo-router';
import { useState } from 'react';
import { FlatList, StyleSheet, View, ViewToken } from 'react-native';
import Animated, { useAnimatedRef, useSharedValue, useAnimatedScrollHandler } from 'react-native-reanimated';

import MainContainer from '@/components/containers/MainContainer';
import StyledText from '@/components/common/StyledText';
import { sizes, spacing } from '@/constants/Styles';
import Colors from '@/constants/Colors';
import { useStore } from '@/state/store';
import SessionCard from '@/components/cards/SessionCard';
import ListHeaderButton from '@/components/headers/ListHeaderButton';
import { format } from 'date-fns';
import { Session } from '@/constants/types';

type SessionItem =
  | {
      type: 'session';
      day: number;
      item: Session;
    }
  | {
      type: 'section-header';
      day: number;
    };

const headerHeight = 50;

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList<SessionItem>);

export default function Schedule() {
  const scrollRef = useAnimatedRef<FlatList>();
  useScrollToTop(scrollRef as any);
  const [shouldShowDayOneHeader, setShouldShowDayOneHeader] = useState(true);

  const scrollOffset = useSharedValue(0);
  const scrollHandler = useAnimatedScrollHandler((event) => {
    scrollOffset.value = event.contentOffset.y;
  });

  const { dayOne, dayTwo } = useStore((state) => state.schedule);
  const refreshSchedule = useStore((state) => state.refreshData);

  useFocusEffect(() => {
    refreshSchedule({ ttlMs: 60_000 });
  });

  const scrollToSection = ({ isDayOne }: { isDayOne: boolean }) => {
    // console.log('scrollToSection', isDayOne, dayOne.length, dayTwo.length);
    const index = isDayOne ? 0 : dayOne.length;
    scrollRef.current?.scrollToIndex({
      index,
      animated: true,
      viewOffset: isDayOne ? headerHeight : 0,
    });
  };

  const onViewableItemsChanged = (items: {
    viewableItems: ViewToken<SessionItem>[];
    changed: ViewToken<SessionItem>[];
  }) => {
    const topVisibleIndex = items.viewableItems?.[0]?.index || 0;
    const isDayOneThreshold = topVisibleIndex <= dayOne.length;
    const isDayTwoThreshold = topVisibleIndex >= dayOne.length;

    if (!shouldShowDayOneHeader && isDayOneThreshold) {
      setShouldShowDayOneHeader(true);
    }

    if (shouldShowDayOneHeader && isDayTwoThreshold) {
      setShouldShowDayOneHeader(false);
    }
  };

  const data = [
    ...dayOne.map((item) => ({ type: 'session', day: 1, item })),
    { type: 'section-header', day: 2 },
    ...dayTwo.map((item) => ({ type: 'session', day: 2, item })),
  ] as SessionItem[];

  return (
    <MainContainer
      backgroundImage={require('@/assets/images/bg.png')}
      ImageBackgroundProps={{ resizeMode: 'cover' }}
      preset="fixed"
      safeAreaEdges={['top']}
    >
      <Animated.View style={styles.container}>
        <AnimatedFlatList
          ref={scrollRef}
          onScroll={scrollHandler}
          onViewableItemsChanged={onViewableItemsChanged}
          data={data}
          contentContainerStyle={{ paddingTop: spacing.xl, paddingBottom: spacing.xxl }}
          scrollEventThrottle={8}
          stickyHeaderIndices={[0]}
          ListHeaderComponent={() => {
            return (
              <View style={[styles.sectionHeader]}>
                <ListHeaderButton
                  title={format('2024-10-04T00:00:00Z', 'EEE')}
                  subtitle="Day 1"
                  isBold={shouldShowDayOneHeader}
                  onPress={() => scrollToSection({ isDayOne: true })}
                />
                <ListHeaderButton
                  title={format('2024-10-05T00:00:00Z', 'EEE')}
                  subtitle="Day 2"
                  isBold={!shouldShowDayOneHeader}
                  onPress={() => scrollToSection({ isDayOne: false })}
                />
              </View>
            );
          }}
          renderItem={({ item }) => {
            const isDayOne = item.day === 1;
            if (item.type === 'section-header') {
              return (
                <View style={[styles.sectionHeader]}>
                  <ListHeaderButton
                    title={format('2024-10-04T00:00:00Z', 'EEE')}
                    subtitle="Day 1"
                    isBold={isDayOne}
                    onPress={() => scrollToSection({ isDayOne: true })}
                  />
                  <ListHeaderButton
                    title={format('2024-10-05T00:00:00Z', 'EEE')}
                    subtitle="Day 2"
                    isBold={!isDayOne}
                    onPress={() => scrollToSection({ isDayOne: false })}
                  />
                </View>
              );
            } else {
              return <SessionCard session={item.item} />;
            }
          }}
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={() => <View style={{ height: sizes.md }} />}
          ListEmptyComponent={
            <StyledText size="base" style={styles.error}>
              No sessions found.
            </StyledText>
          }
        />
      </Animated.View>
    </MainContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: sizes.header + 20,
    paddingHorizontal: sizes.md,
    paddingBottom: sizes.xxxl,
    width: '100%',
  },
  header: {
    color: Colors.palette.secondary,
    marginVertical: sizes.md,
  },
  sectionHeader: {
    backgroundColor: Colors.palette.primary,
    marginBottom: sizes.md,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  error: {
    textAlign: 'center',
  },
});
