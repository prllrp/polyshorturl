import Head from 'next/head'
import styles from '../styles/Home.module.css'
import {
  Container, Input, Button, FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Stack,
  Text,
  Link,
  Box,
  LinkOverlay,
  LinkBox
} from '@chakra-ui/react'
import { useState } from 'react'




export default function Home() {

  const [url, setUrl] = useState('')
  const [shortUrl, setShortUrl] = useState('')
  const [loading, setLoading] = useState(false)
  const [opacity, setOpacity] = useState(0)

  const submit = async () => {
    //check if url is valid
    if (!url) return
    if (!url.startsWith('https://') && !url.startsWith('http://')) {
      setUrl('https://' + url)
    }
    setLoading(true)

    //call shorten url function
    const res = await fetch('/api/shorten', {
      method: 'POST',
      body: JSON.stringify({
        url: url
      })
  })
  const data = await res.json()
  setShortUrl(`${process.env.NEXT_PUBLIC_API_URL}/id/${data.id}`)
  setLoading(false)
  setOpacity(1)
  }

  return (
    <Box w='100%'>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="PolyShort" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container centerContent maxW={'full'} bgColor={'black'} >
        <LinkBox>
        <LinkOverlay href="https://polybase.xyz">
        <Text  fontSize="md" fontWeight="bold" color={'white'}>Built with Polybase. Click here to learn more. </Text>
        </LinkOverlay>
        </LinkBox>
      </Container>
      <Container maxW='full'  className={styles.main} bgGradient='linear(to-bl, gray.300, purple.300)' centerContent>
        <Stack spacing={30}  w='75%' direction={'column'} >
        <Container maxW={'full'}>
          <Text fontSize="6xl" fontWeight="bold">PolyShort </Text>
          <Text fontSize="xl" fontWeight="bold" color={'gray.100'} >URL shortener built with Polybase</Text>
          </Container>
          <Container >
            <FormControl>
            <FormHelperText fontWeight={'bold'}>Get a shortened link from a decentralized database</FormHelperText>
              <Input type='link' placeholder="Enter your URL here" borderColor={'blackAlpha.300'} value={url} onChange={(e) => setUrl(e.target.value)} />
              <Button onClick={submit} isLoading={loading} colorScheme={'purple'} opacity={'.5'}> Submit</Button>
            </FormControl>
          </Container>
          <Container bgColor={'gray.400'} borderRadius = 'md'  opacity={opacity} >
            <Text fontSize="xl" fontWeight="bold" color = 'HighlightText'>Your shortened link:</Text>
            <Link  href={shortUrl}>{shortUrl}</Link>
          </Container>
          <Container>
            <Text fontSize="xl" fontWeight="bold" color={'black'} >What is Polybase?</Text>
            <Text fontSize="md" fontWeight="bold" color={'gray.100'} >
            Polybase is the database for all of humanity’s data. Fast, decentralized and designed from the ground up to scale beyond 1M transactions per second.

Polybase is better than using a centralized database like Firebase or Postgres because you can encrypt data using wallets for “self sovereign data” and verifiably query Polybase from smart collections (coming soon).

Polybase is better than storing data on-chain because it’s 1000 to a million times cheaper than on-chain storage. For example, storing 1MB on Ethereum costs around $64,000.

Blockchains are not built for scalable structured data storage so we built Polybase to combine the best attributes of web2 databases and blockchains.
            </Text>
          </Container>
        </Stack>
      </Container>
    </Box>
  )
}
