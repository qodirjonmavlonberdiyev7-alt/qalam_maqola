'use client';
import { createContext, useContext, useEffect, useState } from 'react';
const C = createContext({ ids: [], toggle() {} });
export const useLikes = () => useContext(C);
export function LikesProvider({ children }) {
  const [ids, set] = useState([]);
  useEffect(() => { try { set(JSON.parse(localStorage.getItem('qalam-likes') || '[]')); } catch {} }, []);
  const toggle = (id) => set((p) => { const n = p.includes(id) ? p.filter((x) => x !== id) : [...p, id]; try { localStorage.setItem('qalam-likes', JSON.stringify(n)); } catch {} return n; });
  return <C.Provider value={{ ids, toggle }}>{children}</C.Provider>;
}
export function LikeButton({ id, label }) {
  const { ids, toggle } = useLikes();
  const on = ids.includes(id);
  return (
    <button className={'like' + (on ? ' on' : '')} aria-pressed={on} aria-label={on ? 'Yoqqanlardan olib tashlash' : 'Yoqqanlarga qo‘shish'} onClick={(e) => { e.preventDefault(); toggle(id); }}>
      <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><path d="M12 21s-7.5-4.6-9.6-9.2C.9 8.4 3 5 6.3 5c2 0 3.7 1.1 5.7 3.3C14 6.1 15.7 5 17.7 5 21 5 23.1 8.4 21.6 11.8 19.5 16.4 12 21 12 21z" /></svg>
      {label && <span>{on ? 'Yoqqan' : 'Yoqdi'}</span>}
    </button>
  );
}
