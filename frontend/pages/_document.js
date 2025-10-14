import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* Theme color for address bar / UI (light & dark) */}
        <meta name="theme-color" media="(prefers-color-scheme: light)" content="#F4F4F4" />
        <meta name="theme-color" media="(prefers-color-scheme: dark)" content="#121212" />
        {/* Support both color schemes */}
        <meta name="color-scheme" content="light dark" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
