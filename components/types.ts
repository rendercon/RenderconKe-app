// types.ts
interface Link {
  title: string;
  url: string;
  linkType: string;
}

export type Speaker = {
  id: string;
  fullName: string;
  profilePicture?: string;
  tagLine?: string;
  bio?: string;
  sessions: { name: string }[];
  isTopSpeaker: boolean;
  links: Link[];
};
