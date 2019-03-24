<template>
  <d2-container>
    <template slot="header">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-input
            type="text"
            autosize
            placeholder="请输入内容"
            v-model="singleText">
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="handlePrediction">预测标签</el-button>
        </el-col>
      </el-row>
      <p></p>
    </template>
    <d2-crud
      ref="d2Crud"
      v-loading="loading"
      :columns="columns"
      :data="data"/>
  </d2-container>
</template>

<script>
import dayjs from 'dayjs'
import axios from 'axios'
const searchUrl = 'http://119.23.30.32:8360/index/single'
// const searchUrl = 'http://192.168.9.94:8360/index/single'
export default {
  name: 'single',
  data () {
    return {
      singleText: '',
      loading: false,
      columns: [
        { title: '序号', key: 'id', width: '80' },
        { title: '时间', key: 'date', width: '180' },
        { title: '文本', key: 'text' },
        { title: '预测结果', key: 'lable', width: '300' }
      ],
      data: [
        // {
        //   id: '1',
        //   date: '2019-03-22 12:23:23',
        //   text: '腾讯QQ绿钻贵族 音乐绿钻 39个月直充',
        //   lable: '游戏充值--游戏充值--游戏充值'
        // }
      ]
    }
  },
  methods: {
    handlePrediction () {
      if(this.singleText === ''){
        this.$alert('请输入要查询的内容', '提示', {
          confirmButtonText: '好的',
          type: 'warning'
        }).then(() => {
        })
      } else {
        this.searchSingle()
      }
    },
    searchSingle () {
      console.log('查询数据')
      this.loading = true
      axios.post(searchUrl, {
        searchInfo: this.singleText
      }).then((res) => {
        console.log('结果', res)
        if(res.data.errno === 0) {
          this.data.push({
            id: this.data.length + 1,
            date: dayjs().format('YYYY-MM-DD HH:mm:ss'),
            text: this.singleText,
            lable: res.data.data[0].item_name
          })
          this.loading = false
        }
      }).catch((err) => {
        console.log(err)
        this.loading = false
      })
    }
  }
}
</script>

<style>
.d2-container-full__body {
  padding-top: 0px !important;
}
</style>
