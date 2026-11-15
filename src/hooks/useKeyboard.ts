import { useEffect, useRef, useCallback } from 'react';

/** Tracks all currently-pressed keys, exposed as a stable `Map<string, boolean>`. */
export function useKeyboard() {
  const keys = useRef<Map<string, boolean>>(new Map());

  const onKeyDown = useCallback((e: KeyboardEvent) => {
    keys.current.set(e.code, true);
  }, []);

  const onKeyUp = useCallback((e: KeyboardEvent) => {
    keys.current.set(e.code, false);
  }, []);

  useEffect(() => {
    const onBlur = () => {
      keys.current.clear();
    };

    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('keyup', onKeyUp);
    window.addEventListener('blur', onBlur);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('keyup', onKeyUp);
      window.removeEventListener('blur', onBlur);
    };
  }, [onKeyDown, onKeyUp]);

  return keys;
}
