# ICHT-TRAIN
- 国际站火车移动端APP开发。
## 开发技术栈
- 使用antd-mobile组件库做UI设计，方便之后做三端（pc、ios、andriod）融合。
- 使用redux管理APP全局状态。
- 使用react-router开发APP路由。
- 使用redux-thunk、isomorphic-fetch处理数据异步请求。
- 使用react-transition-group/CSSTransitionGroup处理切换动画。
## 开发进度
### 2016-05-12
- 增加日期全局状态管理。
- 增加moment，完成日期国际化方案。
### 2016-05-10
- 车站状态使用全局store管理。
### 2016-05-09
- 增加车站列表List。
- 车站的自动完成功能OK。
### 2016-05-09
- 分离routes逻辑到单独的routes文件夹中。
- 添加redux-thunk、es6-promise、isomorphic-fetch 处理action内异步调用。
- 完成车站名的异步获取。
- 增加加载状态变化。
### 2016-05-07
- 首页布局完成。
- webpack调整，可以按需载入antd样式。
- react-router高阶组件。
- 添加切换CSS3动画，react-transition-group/CSSTransitionGroup。
- 整合router和动画组件。
### 2016-05-06
- 初始化开发环境，等待加入antd-mobile。