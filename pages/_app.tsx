import { CartProvider } from '@/context'
import '@/styles/globals.scss'
import type { AppProps } from 'next/app'
import NextNProgress from 'nextjs-progressbar'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <CartProvider>
        <NextNProgress color="red" height={4} />
        <Component {...pageProps} />
      </CartProvider>
    </>
  )
}

