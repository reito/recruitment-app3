import Link from 'next/link';

const Header = () => {
    return (
        <header className='bg-blue-950 text-white p-4'>
            <nav>
                <ul className='flex justify-end space-x-4'>
                    <li><Link href="/">求人検索</Link></li>
                    <li><Link href="/jobpost">求人投稿</Link></li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;