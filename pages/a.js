import { withRouter } from 'next/router'
import dynamic from 'next/dynamic';
import Link from 'next/link';
import styled from "styled-components";
// import moment from "moment";

const Comp = dynamic(import('../components/Comp'))

const Title = styled.h1`
  color: #49c114;
  font-size: 40px;
`

const A = ({ router, name, time }) => {
  // console.log(router) ;
  return (
    <>
      <Title>我是标题 {time}</Title>
      <Comp />
      <Link href="#aaa">
        <a>A{router.query.id} {name}</a>
      </Link>
      <style jsx>{`
        a {
          color: blue;
        }        
      `}
      </style>
    </>
  )
}

// A.getInitialProps = () => {
//   return {
//     name: 'liwei'
//   }
// }

// 先执行getInitialProp的逻辑，之后才会执行render的渲染
A.getInitialProps = async (ctx) => {
  const moment = await import('moment');

  const promise = new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        name: 'vonmo',
        time: moment.default(Date.now() - 60 * 1000).fromNow()
      })
    }, 1000);
  })
  return promise;
}

export default withRouter(A);