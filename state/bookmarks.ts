import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

type BookmarkState = {
  bookmarks: { sessionId: string }[];
  toggleBookmarked: (sessionId: string) => void;
  resetBookmarks: () => void;
};

export const useBookmarkStore = create(
  persist<BookmarkState>(
    (set) => ({
      bookmarks: [],
      toggleBookmarked: (sessionId: string) => {
        set((state) => {
          const isBookmarked = state.bookmarks.find((b) => b.sessionId === sessionId);

          if (isBookmarked) {
            // Remove the bookmark if already present
            const newBookmarks = state.bookmarks.filter((b) => b.sessionId !== sessionId);
            return {
              bookmarks: newBookmarks,
            };
          } else {
            // Add the session ID to the bookmarks
            return {
              bookmarks: [...state.bookmarks, { sessionId }],
            };
          }
        });
      },
      resetBookmarks: () => {
        set(() => ({
          bookmarks: [],
        }));
      },
    }),
    {
      name: 'renderconke-24-bookmarks',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
