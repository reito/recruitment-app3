// app/api/jobs/route.ts
import { NextResponse } from 'next/server';
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const categories = searchParams.get('categories')?.split(',') || [];
  const salary = parseInt(searchParams.get('salary') || '0', 10);

  try {
    let query = 'SELECT * FROM jobs WHERE salary >= $1';
    // const queryParams: any[] = [salary];
    const queryParams: (string | number | string[])[] = [salary];


    if (categories.length > 0 && categories[0] !== '') {
      query += ' AND category = ANY($2)';
      queryParams.push(categories);
    }

    const result = await pool.query(query, queryParams);
    return NextResponse.json(result.rows);
  } catch (error) {
    console.error('Error fetching jobs:', error);
    return NextResponse.json({ error: 'Error fetching jobs' }, { status: 500 });
  }
}


// import { NextResponse } from 'next/server';
// import { Pool } from 'pg';

// const pool = new Pool({
//   connectionString: process.env.DATABASE_URL,
// });

// export async function GET(request: Request) {
//   const { searchParams } = new URL(request.url);
//   const categories = searchParams.get('categories')?.split(',') || [];
//   const salary = parseInt(searchParams.get('salary') || '0', 10);

//   try {
//     let query = 'SELECT * FROM jobs WHERE salary >= $1';
//     const queryParams: any[] = [salary];

//     if (categories.length > 0) {
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


// // app/api/jobs/route.ts
// import { NextResponse } from 'next/server';
// import { Pool } from 'pg';

// const pool = new Pool({
//   connectionString: process.env.DATABASE_URL,
// });

// export async function GET(request: Request) {
//   const { searchParams } = new URL(request.url);
//   const categories = searchParams.get('categories')?.split(',') || [];
//   const salary = parseInt(searchParams.get('salary') || '0', 10);

//   try {
//     let query = 'SELECT * FROM jobs WHERE salary >= $1';
//     const queryParams: any[] = [salary];

//     if (categories.length > 0) {
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
