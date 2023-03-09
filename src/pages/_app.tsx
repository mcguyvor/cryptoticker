import { store } from "../store";

import { Provider } from "react-redux";

// FIXME:  fix any
function App({ Component, pageProps }: any) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}

export default App;
