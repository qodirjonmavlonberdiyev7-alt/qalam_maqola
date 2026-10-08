'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLikes } from './Likes';
export default function Header() {
  const { ids } = useLikes(); const path = usePathname();
  return (
    <header className="top"><div className="wrap bar">
      <Link href="/" className="logo">Qalam<i /></Link>
      <nav>
        <Link href="/" aria-current={path === '/' ? 'page' : undefined}>Maqolalar</Link>
        <Link href="/favorites" aria-current={path === '/favorites' ? 'page' : undefined}>Yoqqanlar{ids.length > 0 && <b>{ids.length}</b>}</Link>
      </nav>
    </div></header>
  );
}
