// types.ts
export type Speaker = {
  id: string;
  fullName: string;
  profilePicture: string;
  sessions: { name: string }[];
};
