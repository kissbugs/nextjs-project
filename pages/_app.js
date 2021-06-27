import App, { Container } from 'next/app';
import 'antd/dist/antd.css';
import Layout from '../components/Layout';
import { Provider } from 'react-redux'
import store from "../store/store"

class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    console.log("app init");
    let pageProps = {};
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }
    return { pageProps }
  }
  render() {
    const { Component, pageProps } = this.props;
    return (
      <Container>
        <Layout>
          <Provider store={store}>
            <Component {...pageProps} />
          </Provider>
        </Layout>
      </Container>
    )
  }
}

export default MyApp;