// 'use-client';

// import { useState, useEffect } from 'react';
// import Header from '../components/Header'
// import SideBar from '../components/Sidebar';
// import JobList from '../components/Joblist';
// import { createClient } from '@supabase/supabase-js'

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

// function HomePage({ jobs, onFilterChange }: { jobs: Job[]; onFilterChange: (selectedCategories: string[], selectedSalary: number) => void }) {

//   const [filteredJobs, setFilteredJobs] = useState<Job[]>(jobs);

//   // フィルタの変更処理
//   const handleFilterChange = (selectedCategories: string[], selectedSalary: number) => {
//     const filtered = jobs.filter((job) => 
//       (selectedCategories.length === 0 || selectedCategories.includes(job.category)) &&
//       job.salary >= selectedSalary
//     );
//     setFilteredJobs(filtered);
//     onFilterChange(selectedCategories, selectedSalary);
//   };

//   return (
//     <div>
//       <Header />
//       <div className="flex">
//       <SideBar onFilterChange={handleFilterChange} />
//       <JobList jobs={filteredJobs} />
//     </div>
//     </div>
//   );
// }

// function App() {

//   const [jobs, setJobs] = useState<Job[]>();

//   const handleOnPostJob = (job: { title: string; category: string; salary: number })  => {

//     setJobs([...jobs, { ...job, id: jobs.length + 1 }]); // 新しい求人をリストに追加
//   };

//   return (
//     <Router>
//       <Routes>
//         <Route path="/post" element={<JobPostForm onPostJob={handleOnPostJob} />} />
//         <Route
//           path="/"
//           element={<HomePage jobs={jobs} onFilterChange={(filteredJobs) => { /* Handle filter changes if needed */ }} />}
//         />
//       </Routes>
//     </Router>
//   );
// }

// export default App;

// // export default async function HomePage () {
// //   // const { data: jobs, error } = await supabase.from('jobs').select('*');
  
// //   // if (error) return <p>エラーが発生しました: {error.message}</p>;
// //   const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
// //   const [jobs, setJobs] = useState([]);

// //   useEffect(() => {
// //     const fetchJobs = async () => {
// //       let query = supabase.from('jobs').select('*');
      
// //       if (selectedCategories.length > 0) {
// //         query = query.in('category', selectedCategories);
// //       }
      
// //       const { data, error } = await query;
// //       if (error) {
// //         console.error('Error fetching jobs:', error);
// //       } else {
// //         setJobs(data || []);
// //       }
// //     };

// //     fetchJobs();
// //   }, [selectedCategories]);

// //   return (
// //     // <div className="p-4">
// //     //   <h1 className="text-xl font-bold mb-4">求人一覧</h1>
// //     //   <ul>
// //     //     {jobs?.map(job => (
// //     //       <li key={job.id} className="border p-2 mb-2">
// //     //         <h2>{job.title}</h2>
// //     //         <p>カテゴリ: {job.category}</p>
// //     //         <p>年収: {job.salary}万円</p>
// //     //       </li>
// //     //     ))}
// //     //   </ul>
// //     // </div>
// //     <div className="flex">
// //       <SideBar selectedCategories={selectedCategories} setSelectedCategories={setSelectedCategories} />
// //       <JobList jobs={jobs} />
// //     </div>
// //   );
// // }

'use client';

import { useState, useEffect } from 'react';
import SideBar from '../components/Sidebar';
import JobList from '../components/Joblist';
import { createClient } from '@supabase/supabase-js';

// Supabaseクライアントの作成
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!, 
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

interface Job {
  id: number;
  title: string;
  category: string;
  salary: number;
}

export default function HomePage() {
  const [jobs, setJobs] = useState<Job[]>([]); // jobsの初期値は空配列
  const [filteredJobs, setFilteredJobs] = useState<Job[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedSalary, setSelectedSalary] = useState<number>(0);

  // Supabaseから求人情報を取得
  useEffect(() => {
    const fetchJobs = async () => {
      const { data, error } = await supabase.from('jobs').select('*');
      if (error) {
        console.error('Error fetching jobs:', error);
      } else {
        setJobs(data || []);
        setFilteredJobs(data || []); // フィルタされた求人リストも初期化
      }
    };

    fetchJobs();
  }, []);

  // フィルタの変更処理
  const handleFilterChange = (selectedCategories: string[], selectedSalary: number) => {
    const filtered = jobs.filter((job) => 
      (selectedCategories.length === 0 || selectedCategories.includes(job.category)) &&
      job.salary >= selectedSalary
    );
    setFilteredJobs(filtered);
    setSelectedCategories(selectedCategories);
    setSelectedSalary(selectedSalary);
  };

  return (
    <div>
      <div className="flex">
        <SideBar onFilterChange={handleFilterChange} />
        <JobList jobs={filteredJobs} />
      </div>
    </div>
  );
}
