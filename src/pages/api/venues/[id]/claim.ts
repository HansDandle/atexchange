import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const { id } = req.query;
        const userId = (req as any).user?.id; // Assume user is authenticated

        if (!userId) {
            return res.status(401).json({ error: 'Not authenticated' });
        }

        try {
            await prisma.venueProfile.update({
                where: { id: String(id) },
                data: { userId: userId },
            });
            res.status(200).json({ message: 'Venue claimed successfully' });
        } catch (error) {
            res.status(500).json({ error: 'Failed to claim venue' });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}