import { ApiData, Session, Speaker } from '@/constants/types';
import { isDayOneSession, isDayTwoSession } from './formatDate';
import { allData } from '@/mock/all';

export const formatSessions = (talks: ApiData): Session[][] => {
  const allSessions = talks.sessions.map((talk) => ({
    id: talk.id,
    title: talk.title,
    description: talk.description,
    startsAt: talk.startsAt,
    endsAt: talk.endsAt,
    isServiceSession: talk.isServiceSession,
    speakers: (talk.speakers?.map((speakerId) => talks.speakers.find((sp) => sp.id === speakerId)).filter(Boolean) ||
      []) as unknown as Speaker[],
    room: talks.rooms.find((room) => room.id === talk.roomId)?.name || '...',
  }));

  const dayOne = allSessions.filter((session: Session) => isDayOneSession(session.startsAt));

  const dayTwo = allSessions.filter((session: Session) => isDayTwoSession(session.startsAt));

  return [dayOne, dayTwo];
};

export const formatSession = (talk: ApiData['sessions'][number], talks: typeof allData): Session => {
  return {
    id: talk.id,
    title: talk.title,
    description: talk.description,
    startsAt: talk.startsAt,
    endsAt: talk.endsAt,
    isServiceSession: talk.isServiceSession,
    speakers: (talk.speakers
      // @ts-ignore
      ?.map((speakerId) => talks.speakers.find((sp) => sp.id === speakerId))
      .filter(Boolean) || []) as unknown as Speaker[],
    // @ts-ignore
    room: talks.rooms.find((room) => room.id === talk.roomId)?.name || '...',
  };
};

// getSession from the list of sessions by passing the id of the session
export const getSession = (id: number, talks: ApiData): Session => {
  const _id = String(id);
  return formatSession(talks.sessions.find((s) => s.id === _id) as ApiData['sessions'][number], talks);
};

// getSpeaker from the list of speakers by passing the id of the speaker
export const getSpeaker = (id: string, talks: ApiData): Speaker => {
  return talks.speakers.find((s) => s.id === id) as ApiData['speakers'][number];
};

// getRoom from the list of rooms by passing the id of the room
export const getRoom = (id: number, talks: ApiData): ApiData['rooms'][number] => {
  return talks.rooms.find((r) => r.id === id) as ApiData['rooms'][number];
};
