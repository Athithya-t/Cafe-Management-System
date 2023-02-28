import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons"/>
      <style>
        {`
          body{
            --animate-duration: 0.1s;
          }
          ::-webkit-scrollbar {
            display: none;
          }
          .form-control:focus {
            box-shadow: none;
            outline: none;
          }
        `}
      </style>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
