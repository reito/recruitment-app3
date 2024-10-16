// pages/api/jobs.js
export default async function handler(req, res) {
    // CORS設定
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    // プリフライトリクエストに対応
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    try {
        // Supabaseにリクエスト
        const response = await fetch(`${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/jobs`, {
            method: req.method,
            headers: {
                'Content-Type': 'application/json',
                'apikey': process.env.SUPABASE_API_KEY,
                'Authorization': `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`,
            },
            body: JSON.stringify(req.body),
        });

        // リクエストが失敗した場合
        if (!response.ok) {
            console.error('Error:', response.statusText);
            return res.status(500).json({ message: '求人の投稿に失敗しました' });
        }

        const data = await response.json();
        res.status(200).json(data);
    } catch (error) {
        console.error('Fetch error:', error);
        res.status(500).json({ message: '求人の投稿に失敗しました' });
    }
}
