import * as React from "react";

interface ValueWithAntecedent<T> {
  previous: T | null;
  current: T | null;
}

export default function usePrevious<T>(value: T) {
  const [values, setValues] = React.useState<ValueWithAntecedent<T>>({
    previous: null,
    current: value,
  });

  if (values.current !== value) {
    setValues({ previous: values.current, current: value });
  }

  return values.previous;
}
