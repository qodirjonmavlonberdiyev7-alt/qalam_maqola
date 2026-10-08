import './globals.css';
import { LikesProvider } from '@/components/Likes';
import Header from '@/components/Header';
export const metadata = { title: { default: 'Qalam — o‘qishga arziydigan maqolalar', template: '%s · Qalam' }, description: 'Texnologiya, dizayn, biznes va hayot haqida ochiq maqolalar. Ro‘yxatdan o‘tish shart emas.' };
export default function RootLayout({ children }) {
  return (
    <html lang="uz">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" /><link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400;12..96,600;12..96,800&family=Source+Serif+4:opsz,wght@8..60,400;8..60,600&display=swap" rel="stylesheet" />
      </head>
      <body>
        <LikesProvider>
          <Header />
          <main className="wrap">{children}</main>
          <footer className="wrap foot-site">Qalam — ochiq manbali loyiha (MIT). Ma’lumotlar JSONPlaceholder API’dan olinadi.</footer>
        </LikesProvider>
      </body>
    </html>
  );
}
