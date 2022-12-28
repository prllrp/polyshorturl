import { Polybase } from '@polybase/client';
import { NextApiRequest, NextApiResponse } from 'next';
import { nanoid } from 'nanoid';
import { aescbc, encodeToString, decodeFromString } from '@polybase/util'




export default async function shorten(req: NextApiRequest, res: NextApiResponse) {
    //create a new polybase instance
    const polybase = new Polybase({
        baseURL: 'https://testnet.polybase.xyz/v0',
        defaultNamespace: 'polyshort'
    })

    


    //recieve a url from the client
    console.log(req.body)
    const url = JSON.parse(req.body).url;
    const secret = JSON.parse(req.body).secret;
    //generate a random id
    const id = nanoid(8).toString();
    //create a collection
    const collection = polybase.collection('links');
    //create a symmetric key
    if(secret == 'true'){
    const symmetricKey = await aescbc.generateSecretKey()
    //create a record
    const symmetricEncryptedStr = await aescbc.symmetricEncryptToEncoding(symmetricKey, url, 'base64')
    //encode the symmetric key to a string
    const symmetricKeyStr = encodeToString(symmetricKey, 'base64')
    const record = await collection.create([id, symmetricEncryptedStr]);
    //return the id to the client
    res.status(200).json({ id, symmetricKeyStr });
    //encode  the symmetric encrypted string to a string
    }else{
        const record = await collection.create([id, url]);
    //return the id to the client
        res.status(200).json({ id, url });
    }

    //https://spacetimexyz.notion.site/Software-Engineer-Second-Interview-Task-16c92543231c4a3a83a04b6779b3ebc1
    
}

