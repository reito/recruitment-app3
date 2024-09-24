'use client';
import React, { useState } from 'react';
// import { useRouter } from 'next/router';
import { useRouter } from 'next/navigation';
import { createJob } from '../../api/createJob'; 

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
