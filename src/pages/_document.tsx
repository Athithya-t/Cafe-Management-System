import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <style>
        {`
          body{
            --animate-duration: 0.1s;
            height:'100%';
          }
          .animate__zoomIn{
            --animate-duration:0.3s;
          }
          .animate__fadeInUp{
            --animate-duration:0.3s;
          }
          ::-webkit-scrollbar {
            display: none;
          }
          .form-control:focus {
            
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
