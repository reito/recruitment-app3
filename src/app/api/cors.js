export default async function handler(req, res) {
    // CORSヘッダーを設定
    res.setHeader('Access-Control-Allow-Origin', 'https://recruitment-app3-n8xvkw03s-reitos-projects.vercel.app');  // 必要に応じてドメインを指定
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
    if (req.method === 'OPTIONS') {
      return res.status(200).end();
    }
  
    try {
      // Supabaseにリクエストをリレー
      const response = await fetch('https://ucjkhmuwwrzlbgojcdee.supabase.co/rest/v1/jobs', {
        method: req.method,
        headers: {
          'Content-Type': 'application/json',
          'apikey': process.env.SUPABASE_KEY,
          'Authorization': `Bearer ${process.env.SUPABASE_KEY}`,
        },
        body: req.method !== 'GET' ? JSON.stringify(req.body) : undefined,  // GETリクエストの場合はbodyを省略
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        // リクエストが失敗した場合のエラーハンドリング
        return res.status(response.status).json({ error: 'Supabaseリクエストに失敗しました', details: data });
      }
  
      res.status(response.status).json(data);
    } catch (error) {
      console.error('エラー:', error);
      res.status(500).json({ error: '内部サーバーエラーが発生しました' });
    }
  }
  

// export default async function handler(req, res) {
//     // CORSヘッダーを設定
//     res.setHeader('Access-Control-Allow-Origin', '*');  // または指定するドメイン
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
//     res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
//     if (req.method === 'OPTIONS') {
//       return res.status(200).end();
//     }
  
//     // Supabaseにリクエストをリレー
//     const response = await fetch('https://ucjkhmuwwrzlbgojcdee.supabase.co/rest/v1/jobs', {
//       method: req.method,
//       headers: {
//         'Content-Type': 'application/json',
//         'apikey': process.env.SUPABASE_KEY,
//         'Authorization': `Bearer ${process.env.SUPABASE_KEY}`,
//       },
//       body: JSON.stringify(req.body),
//     });
  
//     const data = await response.json();
//     res.status(response.status).json(data);
//   }
  