import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import { PolybaseProvider } from "@polybase/react"
import  polybase  from "../config/polybase"



export default function App({ Component, pageProps }: AppProps) {
  return (
    <PolybaseProvider polybase={polybase}>
    <ChakraProvider >
      <Component {...pageProps} />
    </ChakraProvider>
    </PolybaseProvider>
  ) 
  
}

  
