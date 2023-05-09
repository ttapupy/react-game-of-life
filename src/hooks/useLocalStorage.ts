import {useEffect, useState, Dispatch, SetStateAction,} from 'react';

type SetValue<T> = Dispatch<SetStateAction<T>>

function useLocalStorage<T>(key: string, defaultValue: T): [T, SetValue<T>] {

  const [state, setState] = useState(() => {
    const valueInLocalStorage = window.localStorage.getItem(key)

    if (valueInLocalStorage) {
      return JSON.parse(valueInLocalStorage)
    }
    return defaultValue
  })

  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(state))
  }, [key, state])

  return [state, setState]
}

export default useLocalStorage;