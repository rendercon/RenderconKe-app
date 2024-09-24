import { allData } from '@/mock/all';

interface Link {
  title: FunctionStringCallback;
  url: FunctionStringCallback;
  linkType: FunctionStringCallback;
}

export type Speaker = {
  id: string;
  fullName: string;
  firstName: string;
  lastName: string;
  profilePicture: string | null;
  tagLine: string | null;
  bio: string | null;
  sessions: number[];
  isTopSpeaker: boolean;
  links: Link[];
  categoryItems: number[];
};

export type Session = {
  id: string;
  title: string;
  description: string | null;
  startsAt: string;
  endsAt: string;
  speakers: Speaker[];
  room: string;
  isServiceSession: boolean;
};

export type ApiData = typeof allData;

export type ApiSpeaker = (typeof allData)['speakers'][number];
