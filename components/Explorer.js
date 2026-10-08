'use client';
import { useMemo, useState } from 'react';
import Link from 'next/link';
import { LikeButton, useLikes } from './Likes';
import { cap, fmt, TOPICS } from '@/lib/util';

export function Card({ p, lead }) {
  const href = `/post/${p.id}`;
  return (
    <article className={'card' + (lead ? ' lead' : '')}>
      <Link href={href} className="cover" tabIndex={-1}><img src={p.cover} alt="" loading="lazy" /></Link>
      <div className="cb">
        <div className="meta"><span className="chip">{p.topic}</span><span>{fmt(p.date)}</span><span>{p.minutes} daqiqa</span></div>
        <h3><Link href={href}>{cap(p.title)}</Link></h3>
        <p>{cap(p.body.split('\n')[0])}.</p>
        <div className="foot"><span className="who"><img src={p.author.avatar} alt="" />{p.author.name}</span><LikeButton id={p.id} /></div>
      </div>
    </article>
  );
}

export default function Explorer({ posts, favoritesOnly = false }) {
  const { ids } = useLikes();
  const [q, setQ] = useState(''); const [topic, setTopic] = useState(''); const [author, setAuthor] = useState('');
  const [sort, setSort] = useState('new'); const [n, setN] = useState(12);
  const authors = useMemo(() => [...new Map(posts.map((p) => [p.author.id, p.author])).values()], [posts]);
  const list = useMemo(() => {
    const s = q.trim().toLowerCase();
    const r = posts.filter((p) => (!favoritesOnly || ids.includes(p.id)) && (!topic || p.topic === topic) && (!author || p.author.id === +author) && (!s || (p.title + ' ' + p.body + ' ' + p.author.name).toLowerCase().includes(s)));
    const by = { new: (a, b) => b.date.localeCompare(a.date), old: (a, b) => a.date.localeCompare(b.date), az: (a, b) => a.title.localeCompare(b.title) };
    return r.sort(by[sort]);
  }, [posts, q, topic, author, sort, favoritesOnly, ids]);
  const filtered = q || topic || author;
  const showLead = !favoritesOnly && !filtered && sort === 'new' && list.length > 0;
  const rest = showLead ? list.slice(1) : list;
  const f = (set) => (e) => { set(e.target.value); setN(12); };
  return (
    <>
      <div className="tools" role="search">
        <input type="search" value={q} onChange={f(setQ)} placeholder="Maqola, muallif yoki so‘z bo‘yicha qidiring" aria-label="Qidiruv" />
        <select value={author} onChange={f(setAuthor)} aria-label="Muallif"><option value="">Barcha mualliflar</option>{authors.map((a) => <option key={a.id} value={a.id}>{a.name}</option>)}</select>
        <select value={sort} onChange={f(setSort)} aria-label="Saralash"><option value="new">Yangilari avval</option><option value="old">Eskilari avval</option><option value="az">Alifbo bo‘yicha</option></select>
      </div>
      <div className="chips">
        {['', ...TOPICS].map((t) => <button key={t} aria-pressed={topic === t} onClick={() => { setTopic(t); setN(12); }}>{t || 'Hammasi'}</button>)}
      </div>
      <p className="count">{list.length} ta maqola</p>
      {showLead && <Card p={list[0]} lead />}
      {list.length === 0 ? (
        <div className="empty">{favoritesOnly && !filtered ? <><h3>Hali yoqqan maqola yo‘q</h3><p>Maqola kartasidagi yurakcha tugmasini bosing — u shu yerda paydo bo‘ladi.</p><Link href="/" className="btn">Maqolalarni ko‘rish</Link></> : <><h3>Hech narsa topilmadi</h3><p>Qidiruv so‘zini yoki filtrlarni o‘zgartirib ko‘ring.</p></>}</div>
      ) : (
        <div className="grid">{rest.slice(0, n).map((p) => <Card key={p.id} p={p} />)}</div>
      )}
      {rest.length > n && <div className="more"><button className="btn" onClick={() => setN(n + 12)}>Yana {Math.min(12, rest.length - n)} ta ko‘rsatish</button></div>}
    </>
  );
}
