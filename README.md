# LMR-TRAIN
- 2016-03-20 测试-UI框架太重了，要换
- 2016-03-21 测试蚂蚁金服的UI：ant ui，遇到同样文件体积太大的问题，例如：
##### 简单的引用日历，体积就超过382k
- import Calendar from 'antd/lib/Calendar'
- import 'antd/lib/date-picker/style/css'
##### LAST：还是使用最原始的HTML5（Flex）+CSS开发，这样既利于设计和一般市场人员参与，也避免使用UI带了的文件体积过大。 --LMR
