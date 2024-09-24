import { supabase } from '../../lib/supabase';  // Supabaseクライアントをインポート

type Job = {
  title: string;
  category: string;
  salary: number;
};

export const createJob = async (job: Job) => {
  const { data, error } = await supabase
    .from('jobs') // jobsテーブルを指定
    .insert([
      {
        title: job.title,
        category: job.category,
        salary: job.salary,
      },
    ]);

  if (error) {
    throw new Error(`求人の投稿中にエラーが発生しました: ${error.message}`);
  }

  return data;
};
