import Header from '../components/Header';
// import Sidebar from '../components/Sidebar';
import './globals.css';

export const metadata = {
  title: 'recruitment-app3',
  description: '求人検索・投稿アプリ',
}

export default function Rootlayout ({ children }: { children: React.ReactNode }) {
  return (
    <html lang='ja'>
      <body className='flex'>
        <div className='w-full'>
          <Header />
          <main>{children}</main>
        </div>
      </body>
    </html>
  );
}
