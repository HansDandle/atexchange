import { createClient } from '@/lib/supabase/server';

export default async function handler(req, res) {
  const supabase = createClient();

  if (req.method === 'GET') {
    const { id } = req.query;

    const { data: reviews, error } = await supabase
      .from('reviews')
      .select('rating, body, created_at, reviewer_id')
      .eq('venue_id', id)
      .order('created_at', { ascending: false });

    if (error) return res.status(500).json({ error: error.message });

    return res.status(200).json(reviews);
  }

  if (req.method === 'POST') {
    const { id } = req.query;
    const { rating, body, userId } = req.body;

    const { data, error } = await supabase
      .from('reviews')
      .insert({
        venue_id: id,
        reviewer_id: userId,
        rating,
        body,
      });

    if (error) return res.status(500).json({ error: error.message });

    return res.status(201).json(data);
  }

  res.setHeader('Allow', ['GET', 'POST']);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}