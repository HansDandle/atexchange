import { supabase } from '@/lib/supabaseClient';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { id } = req.query;

    if (req.method === 'GET') {
        const { data, error } = await supabase
            .from('reviews')
            .select('*, users(id, name, email)')
            .eq('venue_id', id);

        if (error) {
            return res.status(500).json({ error: error.message });
        }

        return res.status(200).json(data);
    }

    if (req.method === 'POST') {
        const { rating, text, userId } = req.body;

        if (!rating) {
            return res.status(400).json({ error: 'Rating is required' });
        }

        let reviewerId = null;

        // If userId provided, look up the database user by supabaseId
        if (userId) {
            const { data: dbUser, error: userError } = await supabase
                .from('users')
                .select('id')
                .eq('supabaseId', userId)
                .single();

            if (userError) {
                console.error('User lookup error:', userError);
                return res.status(400).json({ error: 'User not found in database' });
            }

            reviewerId = dbUser?.id || null;
        }

        const { data, error } = await supabase
            .from('reviews')
            .insert([
                {
                    venue_id: id,
                    reviewer_id: reviewerId,
                    rating: Math.round(rating),
                    body: text,
                }
            ])
            .select();

        if (error) {
            console.error('Review insert error:', error);
            return res.status(500).json({ error: error.message });
        }

        return res.status(201).json(data);
    }

    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
}