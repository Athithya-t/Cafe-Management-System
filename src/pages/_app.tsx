import type { AppProps } from "next/app";
import Login from ".";
import { store } from "../../Store";
import { Provider} from "react-redux";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'animate.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
      <Provider store={store}>
        <Component {...pageProps}/>
      </Provider>
  )
}
