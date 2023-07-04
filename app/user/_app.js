import "bootstrap/dist/css/bootstrap.min.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "@/styles/globals.css";
import "@/styles/styles.css";
import { SessionProvider } from "next-auth/react";
import { useEffect, useState } from "react";
import Loading from "@/components/Loading";
import {store} from "@/components/Message/store";
import {Provider} from "react-redux";


const App = ({ Component, pageProps: { session, ...pageProps } }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    require("bootstrap/dist/js/bootstrap.bundle.min.js");
    setIsLoading(false);
  }, [isLoading]);

  return (
    <SessionProvider session={session}>
      <Provider store={store} >
        {isLoading ? (
            <Loading />
        ) : (
            <Component {...pageProps} />
        )}
      </Provider>
    </SessionProvider>
  );
};

export default App;
