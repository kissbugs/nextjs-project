import App, { Container } from 'next/app';
import 'antd/dist/antd.css';
import Layout from '../components/Layout';
import MyContext from "../lib/my-context";
import { Provider } from 'react-redux'
import testHoc from "../lib/with-redux"

class MyApp extends App {
  state = {
    context: 'value',
  }
  static async getInitialProps(ctx) {
    const { Component } = ctx;
    console.log("app init");
    let pageProps = {};
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }
    return { pageProps }
  }
  render() {
    console.log("=====render", this.props);
    
    const { Component, pageProps, reduxStore } = this.props;
    return (
      <Container>
        <Layout>
          <Provider store={reduxStore}>
            <MyContext.Provider value={this.state.context}>
              <Component {...pageProps} />
            </MyContext.Provider>
          </Provider>
        </Layout>
      </Container>
    )
  }
}

export default testHoc(MyApp);