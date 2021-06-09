/**
 * document
 * 只有在服务端渲染的时候才会被调用
 * 用来修改服务端渲染的文档内容
 * 一般用来配合第三方 css-in-js 方案使用
 */
import Document, { Html, Head, Main, NextScript } from 'next/document'

// HOC
const withLog = (Comp) => {
  return (props) => {
    return <Comp {...props} />
  }
}

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const originalRenderPage = ctx.renderPage;
    
    ctx.renderPage = () => originalRenderPage({
      enhanceApp: App => App,
      enhanceComponent: Component => Component
    })

    const initialProps = await Document.getInitialProps(ctx)

    return {
      ...initialProps
    }
  }

  render() {
    return (
      <Html>
        <Head />
        <body>
          <Main />
          <NextScript /> 
        </body>
      </Html>
    )
  }
}

export default MyDocument;