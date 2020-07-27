# 将 phpMyAdmin 的时间戳字段转换成日期格式显示

#### 介绍
这是一个 Chrome 插件，可将 phpMyAdmin 查询结果的时间戳字段转换成日期格式显示。


#### 安装教程

1. 克隆此仓库代码到本地，存放目录如：`D:\phpmyadmin-timestamp-field-format`
2. 打开 Chrome 浏览器，在地址栏输入 `chrome://extensions` 打开扩展程序管理页面；
3. 将扩展程序管理页面右上角的`『开发者模式』`选项激活；
4. 点击扩展程序管理页面左上角的`『加载已解压的扩展程序』`按钮，选择插件源代码所在目录，确认后即可安装成功。

#### 使用说明

1. 进入 phpMyAdmin 页面，按`『Ctrl + 鼠标左键』`进行转换，按`『Alt + 鼠标左键』`关闭转换；
2. 也可在插件的设置页面开启自动转换，每次进入页面或当数据变动后，插件可自动转换显示；
3. 字段处理的判断条件是：①该字段类型为 int，②该字段值以1开头且长度为10位数；
4. 此插件不处理时区问题，即默认跟随用户电脑设置的时区。

#### 注意事项

以开发者模式加载插件，在每次打开 Chrome 后会弹出提示`『请停用以开发者模式运行的扩展程序』`，通过本人的另一个补丁程序可禁用此提示，见：https://gitee.com/yangrz/disable-chrome-extension-prompt

#### 截图预览

![设置](https://gitee.com/yangrz/phpmyadmin-timestamp-field-format/raw/master/preview/setting.png)

![转换前](https://gitee.com/yangrz/phpmyadmin-timestamp-field-format/raw/master/preview/before.png)

![转换后](https://gitee.com/yangrz/phpmyadmin-timestamp-field-format/raw/master/preview/after.png)