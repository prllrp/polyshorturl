import { Polybase } from '@polybase/client'


const schema = `
collection test {
  id: string; 
  url: string;
  
  constructor (id: string,url: string ) {
    this.id = id;
    this.url = url;
  }
  
}
`


async function load () {
  const db = new Polybase({
    baseURL: `https://testnet.polybase.xyz/v0`,
    
  })

 

  await db.applySchema(schema, 'polyshort/test')

  return 'Schema loaded'
}

load()
  .then(console.log)
  .catch(console.error)