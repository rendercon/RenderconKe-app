import AsyncStorage from '@react-native-async-storage/async-storage';
import { type SetStateAction, useState } from 'react';
import useAsyncEffect from 'use-async-effect';

export const useStoredState = <Type extends string | boolean | number | string[]>(key: string, initialValue: Type) => {
  const [value, _setValue] = useState(initialValue);

  const setValue = (valueOrCallback: SetStateAction<Type>) => {
    const newValue = typeof valueOrCallback === 'function' ? valueOrCallback(value) : valueOrCallback;
    _setValue(newValue);

    AsyncStorage.setItem(key, JSON.stringify(newValue));
  };

  useAsyncEffect(async () => {
    const _stored = await AsyncStorage.getItem(key);
    if (_stored) {
      const _val = JSON.parse(_stored);
      setValue(_val);
    }
  }, []);

  return [value, setValue] as const;
};
