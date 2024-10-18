// app/api/jobs/route.ts
import { NextResponse } from 'next/server';
import { Pool } from 'pg';

// デバッグ用に一時的に追加
if (process.env.NODE_ENV === 'development') {
  console.log("DATABASE_URL:", process.env.DATABASE_URL);
}

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

// 接続確認用のログ
pool.on('connect', () => {
  console.log('Connected to PostgreSQL');
});

pool.on('error', (err) => {
  console.error('PostgreSQL connection error:', err.message);
});

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const categories = searchParams.get('categories')?.split(',') || [];
  const salary = parseInt(searchParams.get('salary') || '0', 10);

  try {
    let query = 'SELECT * FROM jobs WHERE salary >= $1';
    const queryParams: (string | number | string[])[] = [salary];

    if (categories.length > 0 && categories[0] !== '') {
      query += ' AND category = ANY($2)';
      queryParams.push(categories);
    }

    // クエリとパラメータのログ
    console.log('Executing query:', query);
    console.log('With parameters:', queryParams);

    const result = await pool.query(query, queryParams);
    return NextResponse.json(result.rows);
  } catch (error) {
    // エラーがErrorオブジェクトかどうかを確認する
    if (error instanceof Error) {
      console.error('Error fetching jobs:', error.message, error.stack);
      return NextResponse.json({ error: 'Error fetching jobs', details: error.message }, { status: 500 });
    } else {
      // errorがErrorオブジェクトでない場合の対応
      console.error('Unknown error:', error);
      return NextResponse.json({ error: 'Unknown error occurred' }, { status: 500 });
    }
  }
}

// export async function GET(request: Request) {
//   const { searchParams } = new URL(request.url);
//   const categories = searchParams.get('categories')?.split(',') || [];
//   const salary = parseInt(searchParams.get('salary') || '0', 10);

//   try {
//     let query = 'SELECT * FROM jobs WHERE salary >= $1';
//     const queryParams: (string | number | string[])[] = [salary];

//     if (categories.length > 0 && categories[0] !== '') {
//       query += ' AND category = ANY($2)';
//       queryParams.push(categories);
//     }

//     // クエリとパラメータのログ
//     console.log('Executing query:', query);
//     console.log('With parameters:', queryParams);

//     const result = await pool.query(query, queryParams);
//     return NextResponse.json(result.rows);
//   } catch (error) {
//     console.error('Error fetching jobs:', error.message, error.stack);
//     return NextResponse.json({ error: 'Error fetching jobs', details: error.message }, { status: 500 });
//   }
// }


// // app/api/jobs/route.ts
// import { NextResponse } from 'next/server';
// import { Pool } from 'pg';

// // デバッグ用に一時的に追加
// console.log("DATABASE_URL:", process.env.DATABASE_URL);


// const pool = new Pool({
//   connectionString: process.env.DATABASE_URL,
//   ssl: { rejectUnauthorized: false }
// });

// export async function GET(request: Request) {
//   const { searchParams } = new URL(request.url);
//   const categories = searchParams.get('categories')?.split(',') || [];
//   const salary = parseInt(searchParams.get('salary') || '0', 10);

//   try {
//     let query = 'SELECT * FROM jobs WHERE salary >= $1';
//     // const queryParams: any[] = [salary];
//     const queryParams: (string | number | string[])[] = [salary];


//     if (categories.length > 0 && categories[0] !== '') {
//       query += ' AND category = ANY($2)';
//       queryParams.push(categories);
//     }

//     const result = await pool.query(query, queryParams);
//     return NextResponse.json(result.rows);
//   } catch (error) {
//     console.error('Error fetching jobs:', error);
//     return NextResponse.json({ error: 'Error fetching jobs' }, { status: 500 });
//   }
// }


// // import { NextResponse } from 'next/server';
// // import { Pool } from 'pg';

// // const pool = new Pool({
// //   connectionString: process.env.DATABASE_URL,
// // });

// // export async function GET(request: Request) {
// //   const { searchParams } = new URL(request.url);
// //   const categories = searchParams.get('categories')?.split(',') || [];
// //   const salary = parseInt(searchParams.get('salary') || '0', 10);

// //   try {
// //     let query = 'SELECT * FROM jobs WHERE salary >= $1';
// //     const queryParams: any[] = [salary];

// //     if (categories.length > 0) {
// //       query += ' AND category = ANY($2)';
// //       queryParams.push(categories);
// //     }

// //     const result = await pool.query(query, queryParams);
// //     return NextResponse.json(result.rows);
// //   } catch (error) {
// //     console.error('Error fetching jobs:', error);
// //     return NextResponse.json({ error: 'Error fetching jobs' }, { status: 500 });
// //   }
// // }


// // // app/api/jobs/route.ts
// // import { NextResponse } from 'next/server';
// // import { Pool } from 'pg';

// // const pool = new Pool({
// //   connectionString: process.env.DATABASE_URL,
// // });

// // export async function GET(request: Request) {
// //   const { searchParams } = new URL(request.url);
// //   const categories = searchParams.get('categories')?.split(',') || [];
// //   const salary = parseInt(searchParams.get('salary') || '0', 10);

// //   try {
// //     let query = 'SELECT * FROM jobs WHERE salary >= $1';
// //     const queryParams: any[] = [salary];

// //     if (categories.length > 0) {
// //       query += ' AND category = ANY($2)';
// //       queryParams.push(categories);
// //     }

// //     const result = await pool.query(query, queryParams);
// //     return NextResponse.json(result.rows);
// //   } catch (error) {
// //     console.error('Error fetching jobs:', error);
// //     return NextResponse.json({ error: 'Error fetching jobs' }, { status: 500 });
// //   }
// // }
