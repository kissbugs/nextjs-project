import { withRouter } from 'next/router'
import Link from 'next/link';

const A = ({ router, name }) => {
  // console.log(router) ;
  return (
    <>
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

A.getInitialProps = async (ctx) => {
  const promise = new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        name: 'vonmo'
      })
    }, 1000);
  })
  return promise;
}

export default withRouter(A);