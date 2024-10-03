'use client';
import React, { useState } from 'react';
// import { useRouter } from 'next/router';
import { useRouter } from 'next/navigation';
import { createJob } from '../api/createJob'; 

const JobPostForm: React.FC = () => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [salary, setSalary] = useState<string>('');
  const [error, setError] = useState<string>('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const salaryValue = Number(salary);

    // フォームのバリデーション
    if (!title || !category || salaryValue <= 0) {
      setError('すべてのフィールドを正しく入力してください。');
      return; // 送信を中断
    }

    try {
      // APIに求人情報を送信
      await createJob({
        title,
        category,
        salary: salaryValue,
      });

      // フォームをリセット
      setTitle('');
      setCategory('');
      setSalary('');
      setError('');

      // ホーム画面へリダイレクト
      router.push('/');
    } catch (error) {
      console.error('求人投稿に失敗:', error); 
      setError('求人の投稿に失敗しました。もう一度お試しください。');
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="p-4 bg-white shadow-md rounded">
        {error && <p className="text-red-500">{error}</p>}

        <div className="mb-4 w-1/3">
          <label className="block text-gray-700 text-sm font-bold mb-2">求人カテゴリを選択</label>
          <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full p-2 border">
            <option value="">カテゴリを選択</option>
            <option value="エンジニア">エンジニア</option>
            <option value="デザイン">デザイン</option>
            <option value="マーケティング">マーケティング</option>
            <option value="人事">人事</option>
            <option value="財務・経理">財務・経理</option>
            <option value="医療・介護">医療・介護</option>
          </select>
        </div>

        <div className="mb-4 w-1/3">
          <label className="block text-gray-700 text-sm font-bold mb-2">年収 (万円)</label>
          <input
            type="number"
            value={salary}
            onChange={(e) => setSalary(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="年収を入力してください"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">求人タイトル</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="求人タイトルを入力してください"
          />
        </div>

        <button type="submit" className="p-2 bg-blue-500 text-white rounded w-1/3">
          投稿
        </button>
      </form>
    </div>
  );
};
export default JobPostForm;

// //getServerSidePropsはNext.jsのpages/ディレクトリで使用するものだが、
// //app/ディレクトリ（App Router）ではサポートされていない。
// //app/ディレクトリでは、getServerSidePropsの代わりに
// //新しいデータフェッチング手法を用いる。
// import { createJob } from '../../api/createJob';

// type Props = {
//   categories: string[];
//   error?: string;
// };

// const JobPostForm = async ({ searchParams }: { searchParams: { error?: string } }) => {
//   const categories = ['エンジニア', 'デザイン', 'マーケティング', '人事', '財務・経理', '医療・介護'];
//   const error = searchParams.error;

//   return (
//     <div>
//       {error && <p className="text-red-500">{error}</p>}

//       <form method="POST" action="/api/jobpost" className="p-4 bg-white shadow-md rounded">
//         <div className="mb-4 w-1/3">
//           <label className="block text-gray-700 text-sm font-bold mb-2">求人カテゴリを選択</label>
//           <select name="category" className="w-full p-2 border">
//             <option value="">カテゴリを選択</option>
//             {categories.map((cat) => (
//               <option key={cat} value={cat}>
//                 {cat}
//               </option>
//             ))}
//           </select>
//         </div>

//         <div className="mb-4 w-1/3">
//           <label className="block text-gray-700 text-sm font-bold mb-2">年収 (万円)</label>
//           <input
//             name="salary"
//             type="number"
//             className="w-full p-2 border rounded"
//             placeholder="年収を入力してください"
//           />
//         </div>

//         <div className="mb-4">
//           <label className="block text-gray-700 text-sm font-bold mb-2">求人タイトル</label>
//           <input
//             name="title"
//             type="text"
//             className="w-full p-2 border rounded"
//             placeholder="求人タイトルを入力してください"
//           />
//         </div>

//         <button type="submit" className="p-2 bg-blue-500 text-white rounded w-1/3">
//           投稿
//         </button>
//       </form>
//     </div>
//   );
// };

// export default JobPostForm;


// //以下SSR適用コード
// import { GetServerSideProps } from 'next';
// import React from 'react';
// import { createJob } from '../api/createJob';

// type Props = {
//   categories: string[];
//   error?: string;
// };

// const JobPostForm: React.FC<Props> = ({ categories, error }) => {
//   return (
//     <div>
//       {error && <p className="text-red-500">{error}</p>}

//       <form method="POST" action="/api/jobpost" className="p-4 bg-white shadow-md rounded">
//         <div className="mb-4 w-1/3">
//           <label className="block text-gray-700 text-sm font-bold mb-2">求人カテゴリを選択</label>
//           <select name="category" className="w-full p-2 border">
//             <option value="">カテゴリを選択</option>
//             {categories.map((cat) => (
//               <option key={cat} value={cat}>
//                 {cat}
//               </option>
//             ))}
//           </select>
//         </div>

//         <div className="mb-4 w-1/3">
//           <label className="block text-gray-700 text-sm font-bold mb-2">年収 (万円)</label>
//           <input
//             name="salary"
//             type="number"
//             className="w-full p-2 border rounded"
//             placeholder="年収を入力してください"
//           />
//         </div>

//         <div className="mb-4">
//           <label className="block text-gray-700 text-sm font-bold mb-2">求人タイトル</label>
//           <input
//             name="title"
//             type="text"
//             className="w-full p-2 border rounded"
//             placeholder="求人タイトルを入力してください"
//           />
//         </div>

//         <button type="submit" className="p-2 bg-blue-500 text-white rounded w-1/3">
//           投稿
//         </button>
//       </form>
//     </div>
//   );
// };

// // サーバーサイドでカテゴリデータとエラーを取得
// export const getServerSideProps: GetServerSideProps = async (context) => {
//   const categories = ['エンジニア', 'デザイン', 'マーケティング', '人事', '財務・経理', '医療・介護'];
//   const error = context.query.error as string | undefined;

//   return {
//     props: {
//       categories,
//       error,
//     },
//   };
// };

// export default JobPostForm;


// // //以下部分的SSR適用コード
// 'use client';

// import React, { useState } from 'react';
// import { useRouter } from 'next/navigation'
// import { createJob } from '../api/createJob';

// type Props = {
//     categories: string[];
// }

// const JobPostForm: React.FC<Props> = ({ categories }) => {
//     const [title, setTitle] = useState('');
//     const [category,  setCategory] = useState('');
//     const [salary, setSalary] = useState<string>('');
//     const [error, setError] = useState<string>('');
//     const router = useRouter();

//     const handleSubmit = async (e: React.FormEvent) => {
//         e.preventDefault();

//         const salaryValue = Number(salary);

//         if (!title || !categories || salaryValue <= 0) {
//             setError('すべてのフィールドを正しく入力してください。');
//             return;
//         }

//         try {
//             await createJob({
//                 title,
//                 category,
//                 salary: salaryValue,

//             });

//             setTitle('');
//             setCategory('');
//             setSalary('');
//             setError('');

//             router.push('/');
//         } catch (error) {
//             setError('求人の投稿に失敗しました。もう一度お試しください。');
//         }
//     };

//     return (
//         <div>
//       <form onSubmit={handleSubmit} className="p-4 bg-white shadow-md rounded">
//         {error && <p className="text-red-500">{error}</p>}

//         <div className="mb-4 w-1/3">
//           <label className="block text-gray-700 text-sm font-bold mb-2">求人カテゴリを選択</label>
//           <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full p-2 border">
//             <option value="">カテゴリを選択</option>
//             {categories.map((cat) => (
//               <option key={cat} value={cat}>{cat}</option>
//             ))}
//           </select>
//         </div>

//         <div className="mb-4 w-1/3">
//           <label className="block text-gray-700 text-sm font-bold mb-2">年収 (万円)</label>
//           <input
//             type="number"
//             value={salary}
//             onChange={(e) => setSalary(e.target.value)}
//             className="w-full p-2 border rounded"
//             placeholder="年収を入力してください"
//           />
//         </div>

//         <div className="mb-4">
//           <label className="block text-gray-700 text-sm font-bold mb-2">求人タイトル</label>
//           <input
//             type="text"
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//             className="w-full p-2 border rounded"
//             placeholder="求人タイトルを入力してください"
//           />
//         </div>

//         <button type="submit" className="p-2 bg-blue-500 text-white rounded w-1/3">
//           投稿
//         </button>
//       </form>
//     </div>
//     );
// };

// // サーバーサイドでカテゴリデータを取得する関数
// export const getServerSideProps = async () => {
//   const categories = ['エンジニア', 'デザイン', 'マーケティング', '人事', '財務・経理', '医療・介護'];

//   return {
//       props: {
//           categories,
//       },
//   };
// };

// export default JobPostForm;




// export const getServerProps: GetServerSideProps = async () => {
//     //カテゴリーをサーバーサイドで取得
//     const categories = ['エンジニア', 'デザイン', 'マーケティング', '人事', '財務・経理', '医療・介護'];

//     return {
//         props: {
//             categories,
//         },
//     };
// };

// export default JobPostForm;
