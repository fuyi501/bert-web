# 基于 bert 模型的商品分类前端展示

本系统使用 [D2Admin](https://github.com/d2-projects/d2-admin) 简化版设计开发。

登陆系统可以输入 单行文本，多行文本和批量文件输入进行分类测试，测试数据可以从 `data/star_test.tsv` 文件中随便复制一行，去掉前面的 hello ，只保留后面的语句进行测试，测试效果如下：

## 单行文本测试

![](http://img.fuwenwei.com/blog/20190402234932.png)

## 多行文本测试

![](http://img.fuwenwei.com/blog/20190402235059.png)

![](http://img.fuwenwei.com/blog/20190402235201.png)

## 批量上传文件测试

选择要上传的文件，比如 `data/test.tsv` 文件，上传完成后点击开始预测，预测完成后可以下载预测结果。

![](http://img.fuwenwei.com/blog/20190403004140.png)

![](http://img.fuwenwei.com/blog/20190403004030.png)