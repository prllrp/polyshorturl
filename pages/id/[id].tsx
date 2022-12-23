import { useEffect } from "react";
import { useRouter } from "next/router";

export default function Page(data: any) {
  const  router  = useRouter();
  
  useEffect(() => {
    console.log(data)
    
    
    const url = data.data.data.url
    router.replace(url)
    window.location.href= `${url}`
    return
  }, []);
  return (
    <div>
      
    </div>
  );
}

//get server side props
export async function getServerSideProps(context: any) {

  const id = context.params.id
  

  const res = await fetch(`${process.env.NEXT_API_URL}/api/retrieve`, {
    method: 'POST',
    body: JSON.stringify({
      id: id
    })
  }) 
  const data = await res.json()
  
  
  return {
    props: {
      data: data
    },
  };
}

