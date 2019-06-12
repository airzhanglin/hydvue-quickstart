#  app_template模板

### 模板目录结构

```project
├── public  #打包所需静态资源
├── src
    ├── api  #axios请求接口封装
    └── assets  #项目静态资源
        ├── fonts  #iconfont字体图标文件
        ├── image  #图片资源，按模块分文件夹储存
        └── scss #sass文件
           ├── helpers 
           ├── _functions.scss #自定义sass函数
           ├── _mixins.scss #自定义混合宏
           └── _variables #sass变量，例如主题色、通用字体颜色..
           ├── pages #文件夹将包含一些特殊页面的CSS
           ├── _reset.scss #重置页面样式及第三方组件样式
           ├── components #页面中公共样式
               ├── _button.scss #列如
           ├── _layouts.scss #页面布局样式
           └── main.scss #一个文件导入所有规则,通过@import将所有子文件导入进来
    ├── components  #全局组件
    ├── directive  #自定义指令
    ├── utils  #封装工具函数,全局公共函数，请求拦截等
    ├── router  #路由配置
          ├── module #多人协同公开发可以切分出每个人的模块出来，把自己的模块路由文件放此文件中
    	   └── router-z.js #文件命名由router+名字字母缩写
          └── index.js  #导入所有module下所有模块
    ├── store  #Vuex配置
       ├── actions.js #根级别的 action
       ├── mutation.js #根级别的 mutation
       ├── modules.js 
           ├── user.js #用户模块
       └── index.js 我们组装模块并导出store的地方
    ├── view  #页面文件
    ├── app.vue  #入口页面
    ├── main.js  #入口文件，加载组件、初始化等
    └── tests  #测试相关
 ├── .env.producion #打包到producion 环境配置
 ├── .deploy.js #打包文件上传oss
 ├── .env.review #打包到review环境配置
 ├── .env.staging #打包到staging环境配置
 ├── .gitlab-ci.yml #gitlab配置，配置相关自动运行部署命令
 ├── .gitignore #配置不提交git仓库的相关文件
 ├── .postcss.config.js #postcss相关配置（移动端适配视窗单位转换）
 ├── .babel.config.js 
 └── vue.config.js 
```
### git 相关使用
```
  #添加当前工作目录文件到index,每次修改文件需要提交到远程分支的时候需要先次命令
  git add .

  #从远程分支中拉取代码 master是分支名字。在合并分支和提交代码的时候需要先pull最新代码
  git pull origin master

  #生成一个commit
  git commit -m '备注'

  #提交代码  master为分支名字
  git push origin master 

  #切换分支 如果本地分支存在使用checkout 切换分支
  git checkout reivew

  #查看当前在哪个分支
  git branch

  #查看远程分支
  git branch -r

  #例如远程分支存在review，但本地分支不存在如何切换
  1、git checout -b review
  2、git pull origin review
  
  #新建分支并提交到远程仓库
  git checkout -b 1.0.0-zhanglin  //创建并切换分支
  git add .
  git commit -m 'first commit'
  git push origin 1.0.0-zhanglin
```

### 关于移动端适配方案
 此模板默认做了移动端的适配，使用方案为vw来达到适配，vw单位目前兼容安卓4.4以上和ios8以上
 ![此处输入图片的描述][1]
 #### 使用方法
 ```
 //你的样式文件直接写px 按照设计图给的尺寸来写 例如设计图中给出盒子的width为100px
 .box{
   width:100px
 }
 //编译后的
 .box{
   width:13.333vw
 }
 ```
 vw单位不适用于pc端，所以如果使用该模板开发pc网站的话只需把postcss.config.js下注释掉即可
 [vw适配方案资料][2]
```javascript
 module.exports = {
   "plugins": {
     // "postcss-import": {},
     // "postcss-url": {},
     // "postcss-aspect-ratio-mini": {},
     // "postcss-write-svg": {
     //   utf8: false
     // },
     // "postcss-cssnext": {},
     // "postcss-px-to-viewport": {
     //   viewportWidth: 750,     //视窗的宽度，对应的是我们设计稿的宽度，一般是750.
     //   viewportHeight: 1334,    // 视窗的高度，根据750设备的宽度来指定，一般指定1334，也可以不配置。
     //   unitPrecision: 3,       // 指定`px`转换为视窗单位值的小数位数（很多时候无法整除）.
     //   viewportUnit: 'vw',     // 指定需要转换成的视窗单位，建议使用vw.
     //   selectorBlackList: ['.ignore', '.hairlines'],  // 指定不转换为视窗单位的类，可以自定义，可以无限添加,建议定义一至两个通用的类名。
     //   minPixelValue: 1,       // 小于或等于`1px`不转换为视窗单位，你也可以设置为你想要的值。
     //   mediaQuery: false       // 允许在媒体查询中转换`px`
     // },
     // "postcss-viewport-units":{},
     // "cssnano": {
     //   preset: "advanced",
     //   autoprefixer: false,
     //   "postcss-zindex": false
     // },
   }
 }
```
### 注意事项

    .gitlab-ci.yml文件中的配置需要自信修改、.env.reivew这些文件中的地址也需要根据本项目地址去修改

### deploy.js打包资源上传oss  使用CDN加速
    使用CDN加速是为了优化页面加载速度的一种方式，把打包资源再上传到oss上去，页面中会自动引用cdn链接地址，在.gitlab-ci.yml文件中，shell命令执行 node石先生上传，相关的oss参数可以在deploy.js中修改

### Getting started

```
     # clone the project
     git clone git@10.200.25.127:client/app-template.git
     
     # enter the project directory
     cd app-template
     
     # install dependency
     npm install
     
     # develop
     npm run serve
```
 


  [1]: http://sl0703.oss-cn-shenzhen.aliyuncs.com/Image/1555464171%281%29.png
  [2]: https://www.w3cplus.com/mobile/vw-layout-in-vue.html
