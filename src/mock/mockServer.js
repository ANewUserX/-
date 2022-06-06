// 引入Mock
import Mock from "mockjs"

// 引入json文件
import banner from "./banner.json"
import hotNews from "./hotNews.json"
import newNews from "./newNews.json"
import recommendList from "./recommendList.json"
import recomInforList from "./recomInforList.json"
import newsList from "./newsList.json"
import collect from "./collect.json"
import infoList from "./infoList.json"

// 进行数据绑定
Mock.mock('/mock/banner',{code:200,data:banner})
Mock.mock('/mock/hotnews',{code:200,data:hotNews})
Mock.mock('/mock/newnews',{code:200,data:newNews})
Mock.mock('/mock/recommend',{code:200,data:recommendList})
Mock.mock('/mock/recominfo',{code:200,data:recomInforList})
Mock.mock('/mock/news',{code:200,data:newsList})
Mock.mock('/mock/collect',{code:200,data:collect})
Mock.mock('/mock/info',{code:200,data:infoList})
// 在mainjs中引入