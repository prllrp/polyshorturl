import { Polybase } from '@polybase/client';
import { NextApiRequest, NextApiResponse } from 'next';
import { nanoid } from 'nanoid';



export default async function shorten(req: NextApiRequest, res: NextApiResponse) {
    //create a new polybase instance
    const polybase = new Polybase({
        baseURL: 'https://testnet.polybase.xyz/v0',
        defaultNamespace: 'polyshort'
    })

    
    //recieve a url from the client
    console.log(req.body)
    const url = JSON.parse(req.body).url;
    //generate a random id
    const id = nanoid(8).toString();
    //create a collection
    const collection = polybase.collection('links');
    //create a record
    const record = await collection.create([id, url]);
    //return the id to the client
    res.status(200).json({ id });
    
}

