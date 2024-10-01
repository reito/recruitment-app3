'use client';

import { createClient } from '@supabase/supabase-js';
import Sidebar from './components/Sidebar';
import Joblist from './components/Joblist';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!, 
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default async function HomePage({ searchParams }: { searchParams: { categories?: string, salary?: string } }) {
  const { categories = '', salary = '0' } = searchParams;

  const selectedCategories = categories ? categories.split(',') : [];
  const selectedSalary = parseInt(salary, 10) || 0;

  // サーバーサイドでデータをフェッチ
  let query = supabase.from('jobs').select('*');

  if (selectedCategories.length > 0) {
    query = query.in('category', selectedCategories);
  }

  query = query.gte('salary', selectedSalary);

  const { data: jobs, error } = await query;

  if (error) {
    console.error('Error fetching jobs:', error);
    return <div>エラーが発生しました。</div>;
  }

  return (
    <div className="flex">
      <Sidebar
        selectedCategories={selectedCategories}
        selectedSalary={selectedSalary}
        onFilterChange={() => {}}  // クライアント側で動くのでダミー関数
      />
      <Joblist jobs={jobs || []} />
    </div>
  );
}

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
