import Explorer from '@/components/Explorer';
import { getPosts } from '@/lib/api';
export default async function Home() {
  const posts = await getPosts();
  return (<><section className="hero"><h1>Bilim va g‘oyalar, ro‘yxatdan o‘tmasdan.</h1><p>Mavzu, muallif va kalit so‘z bo‘yicha saralang. Yoqqanlarini saqlab qo‘ying.</p></section><Explorer posts={posts} /></>);
}
