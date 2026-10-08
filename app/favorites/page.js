import Explorer from '@/components/Explorer';
import { getPosts } from '@/lib/api';
export const metadata = { title: 'Yoqqanlar' };
export default async function Favorites() {
  const posts = await getPosts();
  return (<><section className="hero small"><h1>Yoqqan maqolalar</h1><p>Ular faqat shu brauzerda saqlanadi.</p></section><Explorer posts={posts} favoritesOnly /></>);
}
