//以下SSR適用コード
import React from 'react';

type Job = {
  id: number;
  title: string;
  category: string;
  salary: number;
};

type JobListProps = {
  jobs: Job[];
};

const JobList: React.FC<JobListProps> = ({ jobs }) => {
  return (
    <div className="w-3/4 p-4">
      <h2 className="text-2xl font-bold mb-4">求人一覧</h2>
      {jobs.length > 0 ? (
        <ul>
          {jobs.map((job) => (
            <li key={job.id} className="mb-4 p-4 border rounded-lg shadow">
              <h3 className="text-xl font-bold">{job.title}</h3>
              <p>カテゴリ: {job.category}</p>
              <p>年収: {job.salary}万円</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>該当する求人はありません。</p>
      )}
    </div>
  );
};

export default JobList;


//以下CSR適用コード
//  'use-client';

// type Job = {
//   id: number;
//   title: string;
//   category: string;
//   salary: number;
// };

// type JobListProps = {
//   jobs: Job[];
// };

// const JobList: React.FC<JobListProps> = ({ jobs }) => {
//   return (
//     <div className="w-3/4 p-4">
//       <h2 className="text-2xl font-bold mb-4">求人一覧</h2>
//       {jobs.length > 0 ? (
//         <ul>
//           {jobs.map((job) => (
//             <li key={job.id} className="mb-4 p-4 border rounded-lg shadow">
//               <h3 className="text-xl font-bold">{job.title}</h3>
//               <p>カテゴリ: {job.category}</p>
//               <p>年収: {job.salary}万円</p>
//             </li>
//           ))}
//         </ul>
//       ) : (
//         <p>該当する求人はありません。</p>
//       )}
//     </div>
//   );
// };

// export default JobList;
