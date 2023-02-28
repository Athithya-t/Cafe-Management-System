import type { AppProps } from "next/app";
import Login from ".";
import { store } from "./slices/Store";
import { Provider} from "react-redux";
import 'bootstrap/dist/css/bootstrap.min.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
      <Provider store={store}>
        <Component {...pageProps}/>
      </Provider>
  )
}
