export const TOPICS = ['Texnologiya','Dizayn','Biznes','Hayot','Ilm-fan','Sayohat','Madaniyat','Salomatlik'];
const M = ['yanvar','fevral','mart','aprel','may','iyun','iyul','avgust','sentabr','oktabr','noyabr','dekabr'];
export const fmt = (iso) => { const d = new Date(iso); return `${d.getUTCDate()}-${M[d.getUTCMonth()]}, ${d.getUTCFullYear()}`; };
export const cap = (s = '') => s.charAt(0).toUpperCase() + s.slice(1);
export const img = (seed, w = 800, h = 500) => `https://picsum.photos/seed/${seed}/${w}/${h}`;
