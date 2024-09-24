import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

import { ApiData, Session } from '@/constants/types';
import { formatSessions } from '@/utils/sessions';
import initialAllSessions from '@/mock/allSessions.json';

const doFetch = async (url: string) => {
  try {
    const result = await fetch(url);
    return await result.json();
  } catch {
    return null;
  }
};

type State = {
  schedule: {
    dayOne: Session[];
    dayTwo: Session[];
  };
  allSessions: ApiData;
  isRefreshing?: boolean;
  lastRefreshed: string | null;
  refreshData: (options?: { ttlMs?: number }) => Promise<void>;
  shouldUseLocalTz: boolean;
  toggleLocalTz: () => void;
};

const getInitialSchedule = () => {
  const [dayOne, dayTwo] = formatSessions(initialAllSessions as ApiData);
  return {
    schedule: {
      dayOne,
      dayTwo,
    },
    allSessions: initialAllSessions as ApiData,
  };
};

export const useStore = create(
  persist<State>(
    (set, get) => ({
      ...getInitialSchedule(),
      isRefreshing: false,
      lastRefreshed: null,
      shouldUseLocalTz: false,
      refreshData: async (options) => {
        const ttlMs = options?.ttlMs;
        const { isRefreshing, lastRefreshed } = get();

        // Bail out if already refreshing
        if (isRefreshing) {
          return;
        }

        // Bail out if last refresh was within TTL
        if (lastRefreshed) {
          const diff = new Date().getTime() - new Date(lastRefreshed).getTime();
          if (ttlMs && diff < ttlMs) {
            return;
          }
        }

        try {
          set({ isRefreshing: true });

          const allSessions = await doFetch('https://sessionize.com/api/v2/d899srzm/view/All');

          if (allSessions) {
            const [dayOne, dayTwo] = formatSessions(allSessions);
            set({
              schedule: {
                dayOne,
                dayTwo,
              },
              allSessions,
              lastRefreshed: new Date().toISOString(),
            });
          }
        } catch (e) {
          console.warn(e);
        } finally {
          set({ isRefreshing: false });
        }
      },
      toggleLocalTz: () => {
        set((state) => ({ shouldUseLocalTz: !state.shouldUseLocalTz }));
      },
    }),
    {
      name: 'renderconke-24',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => {
        const { isRefreshing: _, ...dataToPersist } = state;
        return dataToPersist;
      },
    },
  ),
);
