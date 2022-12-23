import { useEffect } from "react";
import { useRouter } from "next/router";

export default function Page(data: any) {
  const  router  = useRouter();
  
  useEffect(() => {
    console.log(data)
    
    
    const url = data.data.data.url
    router.replace(url)
    window.location.href= `https://${url}`
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
  

  const res = await fetch('http://localhost:3000/api/retrieve', {
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

