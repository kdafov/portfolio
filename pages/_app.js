import '@/styles/globals.css'
import { Roboto_Mono } from 'next/font/google';

const roboto_mono = Roboto_Mono({ subsets: ['latin'] });

export default function App({ Component, pageProps }) {
  return (
    <>
      <style jsx global>{`
        html {
          font-family: ${roboto_mono.style.fontFamily};
        }
      `}</style>
      <Component {...pageProps} />
    </>
  )
}
