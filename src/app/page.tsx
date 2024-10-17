// app/page.tsx
'use client'

import Joblist from './components/Joblist';
import Sidebar from './components/Sidebar';
import { useState, useEffect } from 'react';

interface Job {
  id: number;
  title: string;
  category: string;
  salary: number;
}

export default function HomePage() {
  console.log("DATABASE_URL:", process.env.DATABASE_URL);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedSalary, setSelectedSalary] = useState<number>(0);

  useEffect(() => {
    const fetchJobs = async () => {
      const categoriesParam = selectedCategories.length > 0 ? selectedCategories.join(',') : '';
      console.log("Fetching from API: ", `/api/jobs?categories=${categoriesParam}&salary=${selectedSalary}`);
      const response = await fetch(`/api/jobs?categories=${categoriesParam}&salary=${selectedSalary}`);
      const data = await response.json();
      setJobs(data);
    };

    fetchJobs();
  }, [selectedCategories, selectedSalary]);

  return (
    <div className="flex">
      <Sidebar 
        selectedCategories={selectedCategories}
        selectedSalary={selectedSalary}
        onFilterChange={(categories, salary) => {
          setSelectedCategories(categories);
          setSelectedSalary(salary);
        }}
      />
      <Joblist jobs={jobs || []} />
    </div>
  );
}


// 'use client';

// import Joblist from './components/Joblist';
// import Sidebar from './components/Sidebar';
// import { useState, useEffect } from 'react';

// interface Job {
//   id: number;
//   title: string;
//   category: string;
//   salary: number;
// }

// export default function HomePage() {
//   const [jobs, setJobs] = useState<Job[]>([]);
//   const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
//   const [selectedSalary, setSelectedSalary] = useState<number>(0);

//   // ジョブリストを取得する関数
//   const fetchJobs = async () => {
//     try {
//       const categoriesParam = selectedCategories.join(',');
//       const response = await fetch(
//         `/api/jobs?categories=${categoriesParam}&salary=${selectedSalary}`
//       );
//       if (!response.ok) throw new Error('Failed to fetch jobs');
//       const data = await response.json();
//       console.log('Fetched jobs:', data); // 取得したデータを表示
//       setJobs(data);
//     } catch (error) {
//       console.error('Error fetching jobs:', error);
//     }
//   };

//   // 検索条件が変更された場合にジョブリストを更新
//   useEffect(() => {
//     fetchJobs();
//   }, [selectedCategories, selectedSalary]);

//   return (
//     <div className="flex">
//       <Sidebar 
//         selectedCategories={selectedCategories}
//         selectedSalary={selectedSalary}
//         onFilterChange={(categories, salary) => {
//           setSelectedCategories(categories);
//           setSelectedSalary(salary);
//         }}
//       />
//       <Joblist jobs={jobs || []} />
//     </div>
//   );
// }


// // app/page.tsx
// 'use client';

// import Joblist from './components/Joblist';
// import Sidebar from './components/Sidebar';
// import { useState, useEffect } from 'react';

// interface Job {
//   id: number;
//   title: string;
//   category: string;
//   salary: number;
// }

// export default function HomePage() {
//   const [jobs, setJobs] = useState<Job[]>([]);
//   const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
//   const [selectedSalary, setSelectedSalary] = useState<number>(0);

//   // ジョブリストを取得する関数
//   const fetchJobs = async () => {
//     const categoriesParam = selectedCategories.join(',');
//     const response = await fetch(
//       `/api/jobs?categories=${categoriesParam}&salary=${selectedSalary}`
//     );
//     const data = await response.json();
//     setJobs(data);
//   };

//   // 検索条件が変更された場合にジョブリストを更新
//   useEffect(() => {
//     fetchJobs();
//   }, [selectedCategories, selectedSalary]);

//   return (
//     <div className="flex">
//       <Sidebar 
//         selectedCategories={selectedCategories}
//         selectedSalary={selectedSalary}
//         onFilterChange={(categories, salary) => {
//           setSelectedCategories(categories);
//           setSelectedSalary(salary);
//         }}
//       />
//       <Joblist jobs={jobs || []} />
//     </div>
//   );
// }


// import Joblist from './components/Joblist';
// import Sidebar from './components/Sidebar';
// import { Pool } from 'pg'; // PostgreSQL用のpgモジュールをインポート

// // PostgreSQLへの接続設定
// const pool = new Pool({
//   connectionString: process.env.DATABASE_URL, // 環境変数にPostgreSQLの接続URLを設定
// });

// interface Job {
//   id: number;
//   title: string;
//   category: string;
//   salary: number;
// }

// interface HomePageProps {
//   searchParams: {
//     categories?: string;
//     salary?: string;
//   };
// }

// // サーバーサイドでジョブデータを取得
// async function fetchJobsFromDB(categories: string[], salary: number) {
//   let query = 'SELECT * FROM jobs WHERE salary >= $1';
//   const queryParams: any[] = [salary];

//   if (categories.length > 0) {
//     query += ' AND category = ANY($2)';
//     queryParams.push(categories);
//   }

//   const result = await pool.query(query, queryParams);
//   return result.rows; // データベースから取得したジョブリスト
// }

// export default async function HomePage({ searchParams }: HomePageProps) {
//   const selectedCategories = searchParams.categories ? searchParams.categories.split(',') : [];
//   const selectedSalary = searchParams.salary ? parseInt(searchParams.salary, 10) : 0;

//   // サーバーサイドでジョブデータをフェッチ
//   const jobs = await fetchJobsFromDB(selectedCategories, selectedSalary);

//   return (
//     <div className="flex">
//       {/* Sidebar はクライアントコンポーネント */}
//       <Sidebar 
//         selectedCategories={selectedCategories} 
//         selectedSalary={selectedSalary} 
//       />
//       <Joblist jobs={jobs || []} />
//     </div>
//   );
// }


// import Sidebar from './components/Sidebar';
// import Joblist from './components/Joblist';
// import { Pool } from 'pg'; // PostgreSQL用のpgモジュールをインポート

// // PostgreSQLへの接続設定
// const pool = new Pool({
//   connectionString: process.env.DATABASE_URL, // 環境変数にPostgreSQLの接続URLを設定
// });

// interface Job {
//   id: number;
//   title: string;
//   category: string;
//   salary: number;
// }

// interface HomePageProps {
//   searchParams: {
//     categories?: string;
//     salary?: string;
//   };
// }

// export default async function HomePage({ searchParams }: HomePageProps) {
//   // サーバーサイドでデータベースからジョブデータを取得
//   const fetchJobsFromDB = async (categories: string[], salary: number) => {
//     let query = 'SELECT * FROM jobs WHERE salary >= $1';
//     const queryParams: any[] = [salary];

//     if (categories.length > 0) {
//       query += ' AND category = ANY($2)';
//       queryParams.push(categories);
//     }

//     const result = await pool.query(query, queryParams);
//     return result.rows; // データベースから取得したジョブリスト
//   };

//   const selectedCategories = searchParams.categories ? searchParams.categories.split(',') : [];
//   const selectedSalary = searchParams.salary ? parseInt(searchParams.salary, 10) : 0;

//   // サーバーサイドでジョブデータをフェッチ
//   const jobs = await fetchJobsFromDB(selectedCategories, selectedSalary);

//   // フィルタが変更された際にクエリを実行してデータを再取得
//   const handleFilterChange = async (categories: string[], salary: number) => {
//     const filteredJobs = await fetchJobsFromDB(categories, salary);
//     return filteredJobs; // フィルタされたデータを返す
//   };

//   return (
//     <div className="flex">
//       <Sidebar
//         selectedCategories={selectedCategories}
//         selectedSalary={selectedSalary}
//         onFilterChange={handleFilterChange}
//       />
//       <Joblist jobs={jobs || []} />
//     </div>
//   );
// }


// 'use client';

// import { useEffect, useState } from 'react';
// import { createClient } from '@supabase/supabase-js';
// import Sidebar from './components/Sidebar';
// import Joblist from './components/Joblist';

// const supabase = createClient(
//   process.env.NEXT_PUBLIC_SUPABASE_URL!, 
//   process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
// );

// interface Job {
//   id: number;
//   title: string;
//   category: string;
//   salary: number;
// }

// interface HomePageProps {
//   searchParams: {
//     categories?: string;
//     salary?: string;
//   };
// }

// export default function HomePage({ searchParams }: HomePageProps) {
//   const [filteredJobs, setFilteredJobs] = useState<Job[]>([]); // ここでfilteredJobsだけを使う
//   const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
//   const [selectedSalary, setSelectedSalary] = useState<number>(0);

//   // 初期値としてカテゴリと給与を取得
//   useEffect(() => {
//     const categories = searchParams.categories
//       ? searchParams.categories.split(',')
//       : [];
//     const salary = searchParams.salary
//       ? parseInt(searchParams.salary, 10)
//       : 0;

//     setSelectedCategories(categories);
//     setSelectedSalary(salary);

//     // 初期データをフェッチする
//     const fetchJobs = async () => {
//       let query = supabase.from('jobs').select('*');

//       if (categories.length > 0) {
//         query = query.in('category', categories);
//       }

//       query = query.gte('salary', salary);

//       const { data: jobsData, error } = await query;
//       if (error) {
//         console.error('Error fetching jobs:', error);
//       } else {
//         setFilteredJobs(jobsData || []); // 初期状態ではすべてのジョブを表示
//       }
//     };

//     fetchJobs();
//   }, [searchParams]);

//   // フィルタが変更されたときにクエリを実行
//   const handleFilterChange = (categories: string[], salary: number) => {
//     setSelectedCategories(categories);
//     setSelectedSalary(salary);

//     // フィルタリング後のジョブを取得
//     const fetchFilteredJobs = async () => {
//       let query = supabase.from('jobs').select('*');

//       if (categories.length > 0) {
//         query = query.in('category', categories);
//       }

//       if (salary > 0) {
//         query = query.gte('salary', salary);
//       }

//       const { data: filteredData, error } = await query;
//       if (error) {
//         console.error('Error fetching filtered jobs:', error);
//       } else {
//         setFilteredJobs(filteredData || []);
//       }
//     };

//     fetchFilteredJobs();
//   };

//   return (
//     <div className="flex">
//       <Sidebar
//         selectedCategories={selectedCategories}
//         selectedSalary={selectedSalary}
//         onFilterChange={handleFilterChange}
//       />
//       <Joblist jobs={filteredJobs} /> {/* filteredJobsのみを使う */}
//     </div>
//   );
// }


//以下、クエリパラメータによるフィルタリングと部分的SSR適用コード
//jobs定義済みにもかかわらず未使用
// 'use client';

// import { useEffect, useState } from 'react';
// import { createClient } from '@supabase/supabase-js';
// import Sidebar from './components/Sidebar';
// import Joblist from './components/Joblist';

// const supabase = createClient(
//   process.env.NEXT_PUBLIC_SUPABASE_URL!, 
//   process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
// );

// interface Job {
//   id: number;
//   title: string;
//   category: string;
//   salary: number;
// }

// interface HomePageProps {
//   searchParams: {
//     categories?: string;
//     salary?: string;
//   };
// }

// export default function HomePage({ searchParams }: HomePageProps) {
//   const [jobs, setJobs] = useState<Job[]>([]);
//   const [filteredJobs, setFilteredJobs] = useState<Job[]>([]);
//   const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
//   const [selectedSalary, setSelectedSalary] = useState<number>(0);

//   // 初期値としてカテゴリと給与を取得（クエリパラメータを使わない場合も内部的に保持）
//   useEffect(() => {
//     const categories = searchParams.categories
//       ? searchParams.categories.split(',')
//       : [];
//     const salary = searchParams.salary
//       ? parseInt(searchParams.salary, 10)
//       : 0;

//     setSelectedCategories(categories);
//     setSelectedSalary(salary);

//     // 初期データをフェッチする
//     const fetchJobs = async () => {
//       let query = supabase.from('jobs').select('*');

//       if (categories.length > 0) {
//         query = query.in('category', categories);
//       }

//       query = query.gte('salary', salary);

//       const { data: jobsData, error } = await query;
//       if (error) {
//         console.error('Error fetching jobs:', error);
//       } else {
//         setJobs(jobsData || []);
//         setFilteredJobs(jobsData || []); // 初期状態ではすべてのジョブを表示
//       }
//     };

//     fetchJobs();
//   }, [searchParams]);

//   // フィルタが変更されたときにクエリを実行
//   const handleFilterChange = (categories: string[], salary: number) => {
//     setSelectedCategories(categories);
//     setSelectedSalary(salary);

//     // フィルタリング後のジョブを取得
//     const fetchFilteredJobs = async () => {
//       let query = supabase.from('jobs').select('*');

//       if (categories.length > 0) {
//         query = query.in('category', categories);
//       }

//       if (salary > 0) {
//         query = query.gte('salary', salary);
//       }

//       const { data: filteredData, error } = await query;
//       if (error) {
//         console.error('Error fetching filtered jobs:', error);
//       } else {
//         setFilteredJobs(filteredData || []);
//       }
//     };

//     fetchFilteredJobs(); // 新しいフィルタ条件でジョブをフェッチ
//   };

//   return (
//     <div className="flex">
//       <Sidebar
//         selectedCategories={selectedCategories}
//         selectedSalary={selectedSalary}
//         onFilterChange={handleFilterChange} // フィルタ条件が変更されたときにフィルタ処理を実行
//       />
//       <Joblist jobs={filteredJobs} />
//     </div>
//   );
// }



//動作したけどURLにクエリパラメータが表示される
// 'use client';

// import { useEffect, useState } from 'react';
// import { createClient } from '@supabase/supabase-js';
// import Sidebar from './components/Sidebar';
// import Joblist from './components/Joblist';

// const supabase = createClient(
//   process.env.NEXT_PUBLIC_SUPABASE_URL!, 
//   process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
// );

// interface Job {
//   id: number;
//   title: string;
//   category: string;
//   salary: number;
// }

// interface HomePageProps {
//   searchParams: {
//     categories?: string;
//     salary?: string;
//   };
// }

// export default function HomePage({ searchParams }: HomePageProps) {
//   const [jobs, setJobs] = useState<Job[]>([]);
//   const [filteredJobs, setFilteredJobs] = useState<Job[]>([]);
//   const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
//   const [selectedSalary, setSelectedSalary] = useState<number>(0);

//   // 初期値としてURLのクエリパラメータからカテゴリと給与を取得
//   useEffect(() => {
//     const categories = searchParams.categories
//       ? searchParams.categories.split(',')
//       : [];
//     const salary = searchParams.salary
//       ? parseInt(searchParams.salary, 10)
//       : 0;

//     setSelectedCategories(categories);
//     setSelectedSalary(salary);

//     // 初期データをフェッチする
//     const fetchJobs = async () => {
//       let query = supabase.from('jobs').select('*');

//       if (categories.length > 0) {
//         query = query.in('category', categories);
//       }

//       query = query.gte('salary', salary);

//       const { data: jobsData, error } = await query;
//       if (error) {
//         console.error('Error fetching jobs:', error);
//       } else {
//         setJobs(jobsData || []);
//         setFilteredJobs(jobsData || []); // 初期状態ではすべてのジョブを表示
//       }
//     };

//     fetchJobs();
//   }, [searchParams]);

//   // URLクエリを更新する処理
//   const handleFilterChange = (categories: string[], salary: number) => {
//     setSelectedCategories(categories);
//     setSelectedSalary(salary);

//     // クエリパラメータを更新
//     const url = new URL(window.location.href);

//     // カテゴリが空でない場合のみURLに設定
//     if (categories.length > 0) {
//       url.searchParams.set('categories', categories.join(','));
//     } else {
//       url.searchParams.delete('categories'); // 空の場合は削除
//     }

//     // 給与が0以外の場合のみURLに設定
//     if (salary > 0) {
//       url.searchParams.set('salary', salary.toString());
//     } else {
//       url.searchParams.delete('salary'); // 0の場合は削除
//     }

//     window.history.pushState({}, '', url.toString()); // URLのクエリを更新

//     // フィルタリング後のジョブを取得
//     const fetchFilteredJobs = async () => {
//       let query = supabase.from('jobs').select('*');

//       if (categories.length > 0) {
//         query = query.in('category', categories);
//       }

//       if (salary > 0) {
//         query = query.gte('salary', salary);
//       }

//       const { data: filteredData, error } = await query;
//       if (error) {
//         console.error('Error fetching filtered jobs:', error);
//       } else {
//         setFilteredJobs(filteredData || []);
//       }
//     };

//     fetchFilteredJobs(); // 新しいフィルタ条件でジョブをフェッチ
//   };

//   return (
//     <div className="flex">
//       <Sidebar
//         selectedCategories={selectedCategories}
//         selectedSalary={selectedSalary}
//         onFilterChange={handleFilterChange}
//       />
//       <Joblist jobs={filteredJobs} />
//     </div>
//   );
// }


// 'use client';

// import { createClient } from '@supabase/supabase-js';
// import { cookies } from 'next/headers'; // SSR用にcookieを扱う
// import Sidebar from './components/Sidebar';
// import Joblist from './components/Joblist';
// import { Suspense } from 'react';

// interface Job {
//   id: number;
//   title: string;
//   category: string;
//   salary: number;
// }

// interface HomePageProps {
//   searchParams: {
//     categories?: string;
//     salary?: string;
//   };
// }

// export default async function HomePage({ searchParams }: HomePageProps) {
//   // サーバーサイドでSupabaseクライアントを作成
//   const supabase = createClient(
//     process.env.NEXT_PUBLIC_SUPABASE_URL!, 
//     process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
//   );

//   // クエリパラメータからカテゴリと給与を取得
//   const selectedCategories = searchParams.categories
//     ? searchParams.categories.split(',')
//     : [];
//   const selectedSalary = searchParams.salary
//     ? parseInt(searchParams.salary, 10)
//     : 0;

//   // Supabaseクエリを実行し、データを取得（SSR部分）
//   let query = supabase.from('jobs').select('*');

//   // カテゴリでフィルタリング
//   if (selectedCategories.length > 0) {
//     query = query.in('category', selectedCategories);
//   }

//   // 給与でフィルタリング
//   query = query.gte('salary', selectedSalary);

//   // データを取得
//   const { data: jobs, error } = await query;

//   if (error) {
//     console.error('Error fetching jobs:', error);
//     return <div>エラーが発生しました。</div>;
//   }

//   // クライアントサイドのフィルタ更新関数
//   const handleFilterChange = (categories: string[], salary: number) => {
//     const query = {
//       categories: categories.join(','),  // カンマ区切りでクエリを生成
//       salary: salary.toString(),
//     };

//     // URLのクエリパラメータを変更してページリロード
//     const url = new URL(window.location.href);
//     url.searchParams.set('categories', query.categories);
//     url.searchParams.set('salary', query.salary);
//     window.location.href = url.toString(); // リダイレクト処理
//   };

//   return (
//     <div className="flex">
//       <Sidebar
//         selectedCategories={selectedCategories}
//         selectedSalary={selectedSalary}
//         onFilterChange={handleFilterChange}
//       />
//       {/* Suspenseを使用して、ロード中の状態を処理 */}
//       <Suspense fallback={<div>Loading jobs...</div>}>
//         <Joblist jobs={jobs || []} />
//       </Suspense>
//     </div>
//   );
// }


// import Sidebar from './components/Sidebar';
// import Joblist from './components/Joblist';

// import { createClient } from '@supabase/supabase-js';
// import { cookies } from 'next/headers';

// export default async function HomePage() {
//   const supabase = createClient(
//     process.env.NEXT_PUBLIC_SUPABASE_URL!,
//     process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
//   );

//   // Supabaseクエリを実行
//   let { data: jobs, error } = await supabase.from('jobs').select('*');
//   if (error) {
//     console.error('Error fetching jobs:', error);
//     return <div>エラーが発生しました。</div>;
//   }

//   return (
//     <div>
//       <Sidebar
//         selectedCategories={selectedCategories}
//         selectedSalary={selectedSalary}
//         onFilterChange={handleFilterChange}
//       />
//       <h1>求人一覧</h1>
//       {jobs?.map((job) => (
//         <div key={job.id}>
//           <h2>{job.title}</h2>
//           <p>Category: {job.category}</p>
//           <p>Salary: {job.salary}</p>
//         </div>
//       ))}
//     </div>
//   );
// }


// // 'use client';

// import { createClient } from '@supabase/supabase-js';
// import { cookies } from 'next/headers'; // SSR用にcookieを扱う
// import Sidebar from './components/Sidebar';
// import Joblist from './components/Joblist';


// interface Job {
//   id: number;
//   title: string;
//   category: string;
//   salary: number;
// }

// interface HomePageProps {
//   searchParams: {
//     categories?: string;
//     salary?: string;
//   };
// }

// export default async function HomePage({ searchParams }: HomePageProps) {
//   const supabase = createClient({
//     cookies,
//     supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL!, 
//     supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
// });

//   // クエリパラメータからカテゴリと給与を取得
//   const selectedCategories = searchParams.categories
//     ? searchParams.categories.split(',')
//     : [];
//   const selectedSalary = searchParams.salary
//     ? parseInt(searchParams.salary, 10)
//     : 0;

//   // Supabaseクライアントをサーバーサイドで作成
//   // const supabase = createClient({ cookies });
  
//   // Supabaseクエリを実行
//   let query = supabase.from('jobs').select('*');

//   // カテゴリでフィルタリング
//   if (selectedCategories.length > 0) {
//     query = query.in('category', selectedCategories);
//   }

//   // 給与でフィルタリング
//   query = query.gte('salary', selectedSalary);

//   // データを取得
//   const { data: jobs, error } = await query;

//   if (error) {
//     console.error('Error fetching jobs:', error);
//     return <div>エラーが発生しました。</div>;
//   }

//   const handleFilterChange = (categories: string[], salary: number) => {
//     // クライアントサイドのフィルタリング更新処理
//     const query = {
//       categories: categories.join(','),  // カンマ区切りでクエリを生成
//       salary: salary.toString(),
//     };

//     // ページをリダイレクト（この処理はクライアント側で行うため、Router.pushの代わりにリンク生成や直接URL変更）
//     const url = new URL(window.location.href);
//     url.searchParams.set('categories', query.categories);
//     url.searchParams.set('salary', query.salary);
//     window.location.href = url.toString();
//   };

//   return (
//     <div className="flex">
//       <Sidebar
//         selectedCategories={selectedCategories}
//         selectedSalary={selectedSalary}
//         onFilterChange={handleFilterChange}
//       />
//       <Joblist jobs={jobs || []} />
//     </div>
//   );
// }


// 'use client';

// import { useState, useEffect } from 'react';
// import { createClient } from '@supabase/supabase-js';
// import Sidebar from './components/Sidebar';
// import Joblist from './components/Joblist';

// const supabase = createClient(
//   process.env.NEXT_PUBLIC_SUPABASE_URL!, 
//   process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
// );

// interface Job {
//     id: number;
//     title: string;
//     category: string;
//     salary: number;
//   }

// export default async function HomePage({ searchParams }: { searchParams: { categories?: string, salary?: string } }) {
//   const { categories = '', salary = '0' } = searchParams;
//   const initialCategories = categories ? categories.split(',') : [];
//   const initialSalary = parseInt(salary, 10) || 0;

//   const [jobs, setJobs] = useState<Job[]>([]);
//   const [selectedCategories, setSelectedCategories] = useState<string[]>(initialCategories);
//   const [selectedSalary, setSelectedSalary] = useState<number>(initialSalary);

//   const fetchJobs = async (categories: string[], salary: number) => {
//     let query = supabase.from('jobs').select('*');
//     if (categories.length > 0) {
//       query = query.in('category', categories);
//     }
//     query = query.gte('salary', salary);

//     const { data: jobsData, error } = await query;
//     if (error) {
//       console.error('Error fetching jobs:', error);
//       return;
//     }
//     setJobs(jobsData || []);
//   };

//   // 初期データをフェッチ
//   useEffect(() => {
//     fetchJobs(selectedCategories, selectedSalary);
//   }, []);

//   const handleFilterChange = (categories: string[], salary: number) => {
//     setSelectedCategories(categories);
//     setSelectedSalary(salary);
//     fetchJobs(categories, salary);
//   };

//   return (
//     <div className="flex">
//       <Sidebar
//         selectedCategories={selectedCategories}
//         selectedSalary={selectedSalary}
//         onFilterChange={handleFilterChange}
//       />
//       <Joblist jobs={jobs} />
//     </div>
//   );
// }


// 'use client';

// import { createClient } from '@supabase/supabase-js';
// import Sidebar from './components/Sidebar';
// import Joblist from './components/Joblist';

// const supabase = createClient(
//   process.env.NEXT_PUBLIC_SUPABASE_URL!, 
//   process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
// );

// export default async function HomePage({ searchParams }: { searchParams: { categories?: string, salary?: string } }) {
//   const { categories = '', salary = '0' } = searchParams;

//   const selectedCategories = categories ? categories.split(',') : [];
//   const selectedSalary = parseInt(salary, 10) || 0;

//   // サーバーサイドでデータをフェッチ
//   let query = supabase.from('jobs').select('*');

//   if (selectedCategories.length > 0) {
//     query = query.in('category', selectedCategories);
//   }

//   query = query.gte('salary', selectedSalary);

//   const { data: jobs, error } = await query;

//   if (error) {
//     console.error('Error fetching jobs:', error);
//     return <div>エラーが発生しました。</div>;
//   }

//   return (
//     <div className="flex">
//       <Sidebar
//         selectedCategories={selectedCategories}
//         selectedSalary={selectedSalary}
//         onFilterChange={handleFilterChange}
//         // onFilterChange={() => {}}  // クライアント側で動くのでダミー関数
//       />
//       <Joblist jobs={jobs || []} />
//     </div>
//   );
// }

// import { createClient } from '@supabase/supabase-js';
// import Sidebar from './components/Sidebar'
// import Joblist from './components/Joblist'
// import { useState, useEffect } from 'react';

// const supabase = createClient(
//   process.env.NEXT_PUBLIC_SUPABASE_URL!, 
//   process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
// );

// // SSR を使ってサーバーサイドでデータを取得
// export async function getServerSideProps() {
//   const { data: jobs, error } = await supabase.from('jobs').select('*');

//   if (error) {
//     console.error('Error fetching jobs:', error);
//     return { props: { jobs: [] } };
//   }

//   return {
//     props: {
//       jobs, // サーバーサイドで取得したジョブデータをクライアントに渡す
//     },
//   };
// }

// type Job = {
//   id: number;
//   title: string;
//   salary: number;
//   category: string;
// }

// type HomePageProps = {
//   jobs: Job[];
// }

// export default function HomePage({ jobs: initialJobs }: HomePageProps) {
//   const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
//   const [selectedSalary, setSelectedSalary] = useState<number>(0);
//   const [jobs, setJobs] = useState<Job[]>(initialJobs); // 初期値にSSRで取得したジョブデータを使用

//   const handleFilterChange = (categories: string[], salary: number) => {
//     setSelectedCategories(categories);
//     setSelectedSalary(salary);
//   };

//   useEffect(() => {
//     const fetchJobs = async () => {
//       let query = supabase.from('jobs').select('*');

//       if (selectedCategories.length > 0) {
//         query = query.in('category', selectedCategories);
//       }

//       if (selectedSalary > 0) {
//         query = query.gte('salary', selectedSalary);
//       }

//       const { data: jobs, error } = await query;

//       if (error) {
//         console.error('Error fetching jobs:', error);
//         return;
//       }

//       setJobs(jobs || []);
//     };

//     fetchJobs();
//   }, [selectedCategories, selectedSalary]);

//   return (
//     <div className="flex">
//       <Sidebar
//         selectedCategories={selectedCategories}
//         selectedSalary={selectedSalary}
//         onFilterChange={handleFilterChange}
//       />
//       <Joblist jobs={jobs} />
//     </div>
//   );
// }


// import { createClient } from '@supabase/supabase-js';
// import Sidebar from './components/Sidebar';
// import Joblist from './components/Joblist';

// const supabase = createClient(
//   process.env.NEXT_PUBLIC_SUPABASE_URL!, 
//   process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
// );

// export default async function HomePage({ searchParams }: { searchParams: { categories?: string, salary?: string } }) {
//   const { categories = '', salary = '0' } = searchParams;

//   const selectedCategories = categories ? categories.split(',') : [];
//   const selectedSalary = parseInt(salary, 10) || 0;

//   // サーバーサイドでデータをフェッチ
//   let query = supabase.from('jobs').select('*');

//   if (selectedCategories.length > 0) {
//     query = query.in('category', selectedCategories);
//   }

//   query = query.gte('salary', selectedSalary);

//   const { data: jobs, error } = await query;

//   if (error) {
//     console.error('Error fetching jobs:', error);
//     return <div>エラーが発生しました。</div>;
//   }

//   return (
//     <div className="flex">
//       <Sidebar
//         selectedCategories={selectedCategories}
//         selectedSalary={selectedSalary}
//         onFilterChange={() => {}}  // クライアント側で動くのでダミー関数
//       />
//       <Joblist jobs={jobs || []} />
//     </div>
//   );
// }


// //以下完全SSR適用コード
// import { createClient } from '@supabase/supabase-js';
// import Sidebar from './components/Sidebar';
// import Joblist from './components/Joblist';

// // Supabaseクライアントを作成
// const supabase = createClient(
//   process.env.NEXT_PUBLIC_SUPABASE_URL!, 
//   process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
// );

// export default async function HomePage({ searchParams }: { searchParams: { categories?: string, salary?: string } }) {
//   const { categories = '', salary = '0' } = searchParams;
  
//   const selectedCategories = categories ? categories.split(',') : [];
//   const selectedSalary = parseInt(salary, 10) || 0;

//   const handleFilterChange = (categories: string[], salary: number) => {
//     // フィルタが変更された際の処理をここに実装
//     console.log('Filtered categories:', categories, 'Filtered salary:', salary);
//   };

//   // サーバーサイドでデータをフェッチ
//   let query = supabase.from('jobs').select('*');

//   if (selectedCategories.length > 0) {
//     query = query.in('category', selectedCategories);
//   }

//   query = query.gte('salary', selectedSalary);

//   const { data: jobs, error } = await query;

//   if (error) {
//     console.error('Error fetching jobs:', error);
//     return <div>エラーが発生しました。</div>;
//   }

//   return (
//     <div className="flex">
//       <Sidebar
//   selectedCategories={selectedCategories}
//   selectedSalary={selectedSalary}
//   onFilterChange={handleFilterChange} // onFilterChangeを渡す
// />

//       {/* <Sidebar selectedCategories={selectedCategories} selectedSalary={selectedSalary} /> */}
//       <Joblist jobs={jobs || []} />
//     </div>
//   );
// }



// import { createClient } from '@supabase/supabase-js';
// import SideBar from '../components/Sidebar';
// import JobList from '../components/JobList';
// import { useRouter } from 'next/navigation'; // next/routerの代わりにnext/navigationを使用

// const supabase = createClient(
//   process.env.NEXT_PUBLIC_SUPABASE_URL!, 
//   process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
// );

// interface Job {
//   id: number;
//   title: string;
//   category: string;
//   salary: number;
// }

// // サーバー側でデータをフェッチする関数
// async function fetchJobs(selectedCategories: string[], selectedSalary: number) {
//   let query = supabase.from('jobs').select('*');

//   // カテゴリでフィルタリング
//   if (selectedCategories.length > 0) {
//     query = query.in('category', selectedCategories);
//   }

//   // 給与でフィルタリング
//   query = query.gte('salary', selectedSalary);

//   const { data: jobs, error } = await query;

//   if (error) {
//     console.error('Error fetching jobs:', error);
//     return [];
//   }

//   return jobs;
// }

// export default async function HomePage({ searchParams }: { searchParams: { categories: string, salary: string } }) {
//   const router = useRouter();

//   // クエリパラメータからカテゴリと給与を取得
//   const selectedCategories = searchParams.categories ? searchParams.categories.split(',') : [];
//   const selectedSalary = parseInt(searchParams.salary || '0', 10);

//   // サーバーサイドでジョブデータを取得
//   const jobs = await fetchJobs(selectedCategories, selectedSalary);

//   const handleFilterChange = (categories: string[], salary: number) => {
//     // クライアントサイドでクエリを変更し、サーバーサイドでデータを再取得
//     const query = {
//       categories: categories.join(','),
//       salary: salary.toString()
//     };
//     router.push({ pathname: '/', query });
//   };

//   return (
//     <div className="flex">
//       <SideBar onFilterChange={handleFilterChange} selectedCategories={selectedCategories} selectedSalary={selectedSalary} />
//       <JobList jobs={jobs} />
//     </div>
//   );
// }



// import { GetServerSideProps } from 'next';
// import SideBar from '../components/Sidebar';
// import JobList from '../components/Joblist';
// import { createClient } from '@supabase/supabase-js';
// import { useRouter } from 'next/router';

// const supabase = createClient(
//   process.env.NEXT_PUBLIC_SUPABASE_URL!, 
//   process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
// );

// interface Job {
//   id: number;
//   title: string;
//   category: string;
//   salary: number;
// }

// interface HomePageProps {
//   jobs: Job[];
//   selectedCategories: string[];
//   selectedSalary: number;
// }

// export default function HomePage({ jobs, selectedCategories, selectedSalary }: HomePageProps) {
//   const router = useRouter();

//   const handleFilterChange = (categories: string[], salary: number) => {
//     // フィルタが変更されたらページをリロードしてサーバーサイドで処理する
//     const query = {
//       categories: categories.join(','),  // カテゴリをカンマ区切りで渡す
//       salary: salary.toString()
//     };
//     router.push({ pathname: '/', query });
//   };

//   return (
//     <div>
//       <div className="flex">
//         <SideBar onFilterChange={handleFilterChange} selectedCategories={selectedCategories} selectedSalary={selectedSalary} />
//         <JobList jobs={jobs} />
//       </div>
//     </div>
//   );
// }

// // サーバーサイドでフィルタリングを実行
// export const getServerSideProps: GetServerSideProps = async (context) => {
//   let { categories = '', salary = '0' } = context.query;

//    // categoriesが配列かどうかをチェックし、適切に処理
//    if (Array.isArray(categories)) {
//     categories = categories.join(','); // 配列ならカンマ区切りの文字列に変換
//   }

//   // カテゴリがクエリパラメータに存在すればそれを配列に変換
//   const selectedCategories = categories ? categories.split(',') : [];
//   const selectedSalary = parseInt(salary as string, 10) || 0;

//   // Supabaseクエリの作成
//   let query = supabase.from('jobs').select('*');
  
//   // カテゴリでフィルタリング
//   if (selectedCategories.length > 0) {
//     query = query.in('category', selectedCategories);
//   }

//   // 給与でフィルタリング
//   query = query.gte('salary', selectedSalary);

//   // データの取得
//   const { data: jobs, error } = await query;

//   if (error) {
//     console.error('Error fetching jobs:', error);
//     return { props: { jobs: [], selectedCategories, selectedSalary } };
//   }

//   return {
//     props: {
//       jobs,
//       selectedCategories,
//       selectedSalary
//     },
//   };
// };


// //以下部分的SSR適用コード
// import { GetServerSideProps } from 'next';
// import { useState } from 'react';
// import SideBar from '../components/Sidebar';
// import JobList from '../components/Joblist';
// import { createClient } from '@supabase/supabase-js';

// const supabase = createClient(
//   process.env.NEXT_PUBLIC_SUPABASE_URL!, 
//   process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
// );

// interface Job {
//   id: number;
//   title: string;
//   category: string;
//   salary: number;
// }

// export default function HomePage({ jobs }: { jobs: Job[] }) {
//   const [filteredJobs, setFilteredJobs] = useState<Job[]>(jobs);
//   const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
//   const [selectedSalary, setSelectedSalary] = useState<number>(0);

//   const handleFilterChange = (selectedCategories: string[], selectedSalary: number) => {
//     const filtered = jobs.filter((job) => 
//       (selectedCategories.length === 0 || selectedCategories.includes(job.category)) &&
//       job.salary >= selectedSalary
//     );
//     setFilteredJobs(filtered);
//     setSelectedCategories(selectedCategories);
//     setSelectedSalary(selectedSalary);
//   };

//   return (
//     <div>
//       <div className="flex">
//         <SideBar onFilterChange={handleFilterChange} />
//         <JobList jobs={filteredJobs} />
//       </div>
//     </div>
//   );
// }

// export const getServerSideProps: GetServerSideProps = async () => {
//   const { data: jobs, error } = await supabase.from('jobs').select('*');

//   if (error) {
//     console.error('Error fetching jobs:', error);
//     return { props: { jobs: [] } };
//   }

//   return {
//     props: {
//       jobs,
//     },
//   };
// };


//以下CSR適用コード
// 'use client';

// import { useState, useEffect } from 'react';
// import SideBar from '../components/Sidebar';
// import JobList from '../components/Joblist';
// import { createClient } from '@supabase/supabase-js';

// // Supabaseクライアントの作成
// const supabase = createClient(
//   process.env.NEXT_PUBLIC_SUPABASE_URL!, 
//   process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
// );

// interface Job {
//   id: number;
//   title: string;
//   category: string;
//   salary: number;
// }

// export default function HomePage() {
//   const [jobs, setJobs] = useState<Job[]>([]); // jobsの初期値は空配列
//   const [filteredJobs, setFilteredJobs] = useState<Job[]>([]);
//   const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
//   const [selectedSalary, setSelectedSalary] = useState<number>(0);

//   // Supabaseから求人情報を取得
//   useEffect(() => {
//     const fetchJobs = async () => {
//       const { data, error } = await supabase.from('jobs').select('*');
//       if (error) {
//         console.error('Error fetching jobs:', error);
//       } else {
//         setJobs(data || []);
//         setFilteredJobs(data || []); // フィルタされた求人リストも初期化
//       }
//     };

//     fetchJobs();
//   }, []);

//   // フィルタの変更処理
//   const handleFilterChange = (selectedCategories: string[], selectedSalary: number) => {
//     const filtered = jobs.filter((job) => 
//       (selectedCategories.length === 0 || selectedCategories.includes(job.category)) &&
//       job.salary >= selectedSalary
//     );
//     setFilteredJobs(filtered);
//     setSelectedCategories(selectedCategories);
//     setSelectedSalary(selectedSalary);
//   };

//   return (
//     <div>
//       <div className="flex">
//         <SideBar onFilterChange={handleFilterChange} />
//         <JobList jobs={filteredJobs} />
//       </div>
//     </div>
//   );
// }
