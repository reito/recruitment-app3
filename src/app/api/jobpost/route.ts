// // pages/api/jobpost.ts

// import { NextApiRequest, NextApiResponse } from 'next';
// import { Pool } from 'pg';

// // PostgreSQLへの接続設定
// const pool = new Pool({
//   connectionString: process.env.DATABASE_URL, // 環境変数からPostgreSQL接続URLを取得
// });

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   if (req.method === 'POST') {
//     const { title, category, salary } = req.body;

//     try {
//       const result = await pool.query(
//         'INSERT INTO jobs (title, category, salary) VALUES ($1, $2, $3) RETURNING *',
//         [title, category, salary]
//       );

//       res.status(200).json(result.rows[0]);
//     } catch (error) {
//       console.error('求人投稿エラー:', error);
//       res.status(500).json({ message: '求人の投稿に失敗しました' });
//     }
//   } else {
//     res.status(405).json({ message: 'メソッドが許可されていません' });
//   }
// }
// src/app/api/jobpost/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { Pool } from 'pg';

// デバッグ用に一時的に追加
console.log("DATABASE_URL:", process.env.REACT_APP_DATABASE_URL);


// PostgreSQLへの接続設定
const pool = new Pool({
  connectionString: process.env.REACT_APP_DATABASE_URL || "postgresql://postgres.ucjkhmuwwrzlbgojcdee:oisrit095384@aws-0-ap-northeast-1.pooler.supabase.com:6543/postgres", // 環境変数からPostgreSQL接続URLを取得
  ssl: { rejectUnauthorized: false },
});

// POSTリクエストに対応する関数をエクスポート
export async function POST(request: NextRequest) {
  const { title, category, salary } = await request.json();

  try {
    const result = await pool.query(
      'INSERT INTO jobs (title, category, salary) VALUES ($1, $2, $3) RETURNING *',
      [title, category, salary]
    );

    return NextResponse.json(result.rows[0], { status: 200 });
  } catch (error) {
    console.error('求人投稿エラー:', error);
    return NextResponse.json({ message: '求人の投稿に失敗しました' }, { status: 500 });
  }
}
