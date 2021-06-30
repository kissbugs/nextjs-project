import Link from 'next/link';
import Router from 'next/router';
import { Button } from 'antd';
import { connect } from 'react-redux';
import { add } from "../store/store"


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

const Index = ({ counter, username, add, rename }) => {
  // const gotoA = () => {
  //   // Router.push('/a')
  //   Router.push({
  //     pathname: '/a',
  //     query: {
  //       id: 2
  //     }
  //   }, '/a/2')
  // }
  // return (
  //   <>
  //     <Link href="/a" as="/a/1" title="AAA">
  //       <Button type="primary">A</Button>
  //     </Link>
  //     <Button type="dashed" onClick={gotoA}>B</Button>
  //   </>
  // )

  return (
    <>
      <span>Count: {counter}</span>{"  "}
      <a>姓名：{username}</a>
      <input value={username} onChange={e => rename(e.target.value)} />
      <button onClick={() => add(counter)}>button</button>
    </>
  )
}

Index.getInitialProps = async ({ reduxStore }) => {
  reduxStore.dispatch(add(3))
  return {}
}

export default connect(function mapStateToProps(state) {
  return {
    counter: state.counter.count,
    username: state.user.username
  }
}, function mapDispatchToProps(dispatch) {
  return {
    add: (num) => dispatch({ type: 'ADD', num }),
    rename: (name) => dispatch({ type: 'UPDATE_USERNAME', name })
  }
})(Index);