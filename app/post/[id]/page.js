import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getPost, getPosts, getComments, getGallery } from '@/lib/api';
import { Card } from '@/components/Explorer';
import { LikeButton } from '@/components/Likes';
import { cap, fmt } from '@/lib/util';

export async function generateMetadata({ params }) { const { id } = await params; const p = await getPost(id).catch(() => null); return { title: p ? cap(p.title) : 'Maqola' }; }

export default async function Article({ params }) {
  const { id } = await params;
  const p = await getPost(id).catch(() => null);
  if (!p) notFound();
  const [g, comments, all] = await Promise.all([getGallery(p.id), getComments(p.id), getPosts()]);
  const more = all.filter((x) => x.topic === p.topic && x.id !== p.id).slice(0, 3);
  return (
    <article className="post">
      <Link href="/" className="back">← Barcha maqolalar</Link>
      <div><span className="chip">{p.topic}</span></div>
      <h1>{cap(p.title)}</h1>
      <div className="byline">
        <img src={p.author.avatar} alt="" />
        <div><strong>{p.author.name}</strong><span>{p.author.company} · {fmt(p.date)} · {p.minutes} daqiqa o‘qish</span></div>
        <LikeButton id={p.id} label />
      </div>
      <img className="hero-img" src={p.cover} alt="" />
      <div className="prose">{p.body.split('\n').map((t, i) => <p key={i}>{cap(t)}.</p>)}</div>
      <section><h2>Fotolavha: {cap(g.album.title)}</h2>
        <div className="gallery">{g.photos.map((f) => <figure key={f.id}><img src={f.src} alt={f.title} loading="lazy" /><figcaption>{cap(f.title)}</figcaption></figure>)}</div>
      </section>
      <section><h2>Fikrlar ({comments.length})</h2>
        <ul className="comments">{comments.map((c) => <li key={c.id}><b>{c.name.split(' ').slice(0, 3).join(' ')}</b><small>{c.email}</small><p>{cap(c.body)}</p></li>)}</ul>
      </section>
      {more.length > 0 && <section><h2>{p.topic} bo‘yicha yana</h2><div className="grid">{more.map((x) => <Card key={x.id} p={x} />)}</div></section>}
    </article>
  );
}
