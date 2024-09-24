import { differenceInDays, format, formatDate } from 'date-fns';

import { Session } from '@/constants/types';

const timeFormat = 'h:mm aaa';
const dateTimeFormat = `${timeFormat}, LLL d`;
const fullDateFormat = `${timeFormat}, LLL d, yyyy`;

export const formatSessionTime = (session: Session) => {
  try {
    const startsAtDate = new Date(session.startsAt);
    const endsAtDate = new Date(session.endsAt);

    return `${formatDate(startsAtDate, dateTimeFormat)} - ${formatDate(endsAtDate, dateTimeFormat)}`;
  } catch {
    return '...';
  }
};

export const formatFullDate = (dateString: string) => {
  try {
    return formatDate(new Date(dateString), fullDateFormat);
  } catch {
    return '...';
  }
};

export const getCurrentTimezone = () => {
  try {
    return formatDate(new Date(), 'zzzz');
  } catch {
    return '...';
  }
};

export const isDayOneSession = (date: string) => {
  const targetDate = new Date('2024-10-04');
  const session = new Date(date);

  try {
    return (
      session.getUTCFullYear() === targetDate.getUTCFullYear() &&
      session.getUTCMonth() === targetDate.getUTCMonth() &&
      session.getUTCDate() === targetDate.getUTCDate()
    );
  } catch {
    return false;
  }
};

export const isDayTwoSession = (date: string) => {
  const targetDate = new Date('2024-10-05');
  const session = new Date(date);

  try {
    return (
      session.getUTCFullYear() === targetDate.getUTCFullYear() &&
      session.getUTCMonth() === targetDate.getUTCMonth() &&
      session.getUTCDate() === targetDate.getUTCDate()
    );
  } catch {
    return false;
  }
};

export const formatSessionDate = (sessionDate: string, referenceDate = '2024-10-04T00:00:00Z') => {
  const session = new Date(sessionDate);
  const reference = new Date(referenceDate);

  // Format the time and date
  const formattedDate = format(session, 'h:mm a, MMMM do');

  // Calculate the difference in days to show "Day 1", "Day 2", etc.
  const dayDifference = differenceInDays(session, reference) + 1;

  return `${formattedDate} (Day ${dayDifference})`;
};
