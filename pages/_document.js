/**
 * document
 * 只有在服务端渲染的时候才会被调用
 * 用来修改服务端渲染的文档内容
 * 一般用来配合第三方 css-in-js 方案使用
 */
import Document, { Html, Head, Main, NextScript } from 'next/document'
import { ServerStyleSheet } from 'styled-components'

// HOC
const withLog = (Comp) => {
  return (props) => {
    return <Comp {...props} />
  }
}

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const sheet = new ServerStyleSheet()
    const originalRenderPage = ctx.renderPage;
    try {
      ctx.renderPage = () =>
        originalRenderPage({
          // 在sheet上挂载了 渲染了整个App的样式代码都会被挂载到sheet上
          enhanceApp: App => (props) => sheet.collectStyles(<App {...props} />),
          // enhanceComponent: Component => withLog(Component)
        })
      const props = await Document.getInitialProps(ctx)
      return {
        ...props,
        styles: (
          <>
            {props.styles}
            {sheet.getStyleElement()}
          </>
        )
      }
    } finally {
      sheet.seal();
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