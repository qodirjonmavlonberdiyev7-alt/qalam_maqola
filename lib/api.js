import { TOPICS, img } from './util';
const B = 'https://jsonplaceholder.typicode.com';
const j = async (p) => { const r = await fetch(B + p, { next: { revalidate: 3600 } }); if (!r.ok) throw new Error(p); return r.json(); };

// JSONPlaceholder'da sana/rasm/mavzu yo'q — ularni post ID'dan barqaror tarzda hosil qilamiz.
const enrich = (p, users) => {
  const u = users.find((x) => x.id === p.userId);
  return {
    ...p,
    topic: TOPICS[p.id % TOPICS.length],
    date: new Date(Date.UTC(2026, 9, 8) - p.id * 1.7 * 864e5).toISOString(),
    minutes: 3 + (p.id % 7),
    cover: img('post' + p.id, 1200, 700),
    author: { id: u.id, name: u.name, company: u.company.name, avatar: img('user' + u.id, 96, 96) },
  };
};
export async function getPosts() { const [p, u] = await Promise.all([j('/posts'), j('/users')]); return p.map((x) => enrich(x, u)); }
export async function getPost(id) { const [p, u] = await Promise.all([j('/posts/' + id), j('/users')]); return enrich(p, u); }
export const getComments = (id) => j(`/posts/${id}/comments`);
export async function getGallery(id) {
  const [album, photos] = await Promise.all([j('/albums/' + id), j(`/albums/${id}/photos?_limit=6`)]);
  return { album, photos: photos.map((x) => ({ ...x, src: img('photo' + x.id, 700, 460) })) };
}
