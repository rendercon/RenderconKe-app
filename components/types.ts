export type Speaker = {
  id: string;
  fullName: string;
  profilePicture: string;
  occupation: string; // Add occupation property
  bio: string; // Add bio property (since it is used in the speaker page)
  socialMedia?: {
    twitter?: string;
    linkedin?: string;
  }; // Add optional socialMedia object with twitter and linkedin fields
  sessions: {
    name: string; // Add time property to each session
    time: string; // Add title property to each session
  }[];
};
