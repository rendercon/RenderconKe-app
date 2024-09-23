import { useState, useEffect } from 'react';
import { Speaker } from '@/components/types';

export const useFetchSpeakers = () => {
  const [speakerList, setSpeakerList] = useState<Speaker[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchSpeakers = async () => {
      setLoading(true);
      setError(false);
      try {
        const res = await fetch('https://sessionize.com/api/v2/d899srzm/view/Speakers');
        if (!res.ok) throw new Error('Failed to fetch speakers');
        const data = await res.json();
        setSpeakerList(data);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchSpeakers();
  }, []);

  return { speakerList, loading, error };
};
