import store from "../store/store";
import { Provider } from "react-redux";

// FIXME:  fix any
export default function App({ Component, pageProps }: any) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />;
    </Provider>
  );
}
