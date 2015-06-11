#URL2QR Chrome插件
##简介
将正在打开的网页生成一张二维码，如果是本地服务器则生成局域网可访问的二维码。
###功能特点
1. 支持自定义过滤条件，插件选项页面可以设置URL替换规则（暂不支持正则）。比如你可以把`localhost`替换成你的`局域网IP`，这样就可以用手机预览你本电脑的网页。
2. 支持自定义填写链接或文字。比如你要往你手机上发送一个电话号码，你可以在二维码的填写框中输入链接然后生成二维码。比如`tel:10086`（试试看）！

##1.使用方法

[进入Chrome App Store安装最新版](https://chrome.google.com/webstore/detail/pmlpmeejppihnemepiadkmnghmbclhpg)
##2.自己改造

把所有文件`clone`下来，然后根据你的想法改造。改造完毕后运行`grunt deploy`将插件所需要的文件打包到`url2qr`文件夹，然后再到`Chrome`里选择这个子文件夹进行打包。

Good Luck ！

注：这个想法是和[Neyo](https://github.com/niandalu)一块想到的，于是我做了Chrome插件版，他做了屌炸天的~~[Alfred版本](https://github.com/Niandalu/alfred-convert-url-to-qrcode)~~可以自动检测局域网IP，有需要的亲可以戳过去。

##版本更新
v1.0 将当前网址生成二维码

v1.1 增加本地局域网IP检测，参考[webrtc-ips](https://github.com/diafygi/webrtc-ips)

v1.2 增加选项，可自定义始终检测局域网IP替换，即使更换网络也能做到自适应地址。

v1.3 剔除10段IP局域网自动检测，很多VPN都是这个IP端会导致检测到两个局域网地址并生成两张二维码。

v1.4 重新添加10段IP局域网检测（校园网分配IP就是10段），但不会出现多次产生二维码的问题。同时将插件上线至Chrome Store

v2.0 修复无配置选项时无法生成二维码的bug，增加局域网IP权重排序。默认启用局域网IP替换，真正达到`0`配置。
