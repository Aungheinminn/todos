import clientPromise from '@/libs/database';
import type { NextApiRequest, NextApiResponse } from 'next';

export const POST = async (req: NextApiRequest) => {
  try {
    const client = await clientPromise;
    const db = client.db('test');
    const collection = await db.collection('inventory').insertOne({
        name: req.body.name,
    });

    return Response.json({ collection });
  } catch (e) {
    console.error(e);
    // return res.status(500).json({ error: 'Unable to fetch documents' });
  }
};



