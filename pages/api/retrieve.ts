import { NextApiRequest, NextApiResponse } from 'next'
import { Polybase } from '@polybase/client';

 async function retrieve(req: NextApiRequest, res: NextApiResponse) {

    const polybase = new Polybase({
        baseURL: 'https://testnet.polybase.xyz/v0',
        defaultNamespace: 'polyshort'
    })


    const data = JSON.parse(req.body)
    console.log(data)
    const id = data.id;
    console.log(`Retrieving ${id}...`)

    
    try {
        const collection =  polybase.collection('links');
        const data = await collection.record(id).get();
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json(error);
    }
}

export default retrieve;