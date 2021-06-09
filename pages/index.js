import Link from 'next/link';
import Router from 'next/router';
import { Button } from 'antd';

const events = [
  'routeChangeStart',
  'routeChangeComplete',
  'routeChangeError',
  'beforeHistoryChange',
  'hashChangeStart',
  'hashChangeComplete'
]

function makeEvent(type) {
  return (...args) => {
    console.log(type, ...args);
  }
}
events.forEach(event => {
  Router.events.on(event, makeEvent(event))
})

export default () => {
  const gotoA = () => {
    // Router.push('/a')
    Router.push({
      pathname: '/a',
      query: {
        id: 2
      }
    }, '/a/2')
  }
  return (
    <>
      <Link href="/a" as="/a/1" title="AAA">
        <Button type="primary">A</Button>
      </Link>
      <Button type="dashed" onClick={gotoA}>B</Button>
    </>
  )
}