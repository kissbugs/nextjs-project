路由映射:
  Link 标签内添加 as="/a/1"
  Router push的第二个参数添加 ,'/a/2'




getInitialProps:
 只有放在pages目录下的文件才可以调用getInitialProps。

  只有路由对应的组件 他才会去被路由的这个功能去被特定的处理, 当我们在做路由切换的时候，在我们路由真正切换成功之前去调用我们组件中的getInitialProps，然后其return的内容，拿到他上面的内容, 传到对应的组件当中去渲染这个组件.
  getInitialProps无论是在服务端渲染还是在客户端渲染都是会被执行的。