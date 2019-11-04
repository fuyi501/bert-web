<template>
  <d2-container>
    <template slot="header">
      <el-row :gutter="20">
        <el-col :span="4">
          <el-button type="success" @click="dialogVisible = true">
            <d2-icon name="list-ul"/>
            输入多行文本进行预测
          </el-button>
        </el-col>
      </el-row>
      <p></p>
    </template>
    <el-dialog
      title="请输入多行文本，每行一句文本"
      :visible.sync="dialogVisible"
      width="60%"
      @close="dialogVisible = false">
      <el-input
        type="textarea"
        :autosize="{ minRows: 20, maxRows: 50}"
        placeholder="请输入内容，每行一句"
        v-model="textarea">
      </el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleTextarea">开始预测处理</el-button>
      </span>
    </el-dialog>
    <d2-crud
      ref="d2Crud"
      v-loading="loading"
      element-loading-text="拼命预测中"
      :columns="columns"
      :data="data"/>
  </d2-container>
</template>

<script>
import dayjs from 'dayjs'
import axios from 'axios'
// const searchUrl = 'http://192.168.9.94:8360/index/textarea'
const searchUrl = 'http://119.23.30.32:8360/index/textarea'
export default {
  data () {
    return {
      dialogVisible: false,
      textarea: '',
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
    handleTextarea () {
      console.log(this.textarea.split('\n'))
      if(this.textarea === ''){
        this.$alert('请输入要查询的内容', '提示', {
          confirmButtonText: '好的',
          type: 'warning'
        })
      } else {
        this.dialogVisible = false
        this.searchTextarea()
      }
    },
    searchTextarea () {
      console.log('查询数据')
      this.loading = true
      axios.post(searchUrl, {
        searchInfo: this.textarea
      }).then((res) => {
        console.log('结果', res)
        if(res.data.errno === 0) {
          for(let i in res.data.data) {
            this.data.push({
              id: this.data.length + 1,
              date: dayjs().format('YYYY-MM-DD HH:mm:ss'),
              text: res.data.data[i].type,
              lable: res.data.data[i].item_name
            })
          }
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
