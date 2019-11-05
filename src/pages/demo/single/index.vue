<template>
  <d2-container>
    <template slot="header">
      新闻内容测试
    </template>
    <el-row :gutter="10">
      <el-col :span="16">
        <el-row style="margin-top:10px;">
          <el-input
            type="textarea"
            :autosize="{ minRows: 10, maxRows: 10}"
            placeholder="请输入您要检测的新闻内容"
            v-model="singleText">
          </el-input>
        </el-row>
        <el-row style="margin-top:10px;margin-bottom:10px;border:1px solid #DCDFE6;border-radius: 4px;">
          <div v-html="resData" class="res-type"></div>
        </el-row>
        <el-row :gutter="40">
          <el-col :span="4">
            <el-button icon="el-icon-search" type="success" @click="handlePrediction">开始检测</el-button>
          </el-col>
          <el-col :span="4">
            <el-button icon="el-icon-delete" type="warning" @click="cleanContent">清空内容</el-button>
          </el-col>
          <!-- <el-col :span="2">
            <el-button type="primary" @click="createToken">生成Token</el-button>
          </el-col> -->
        </el-row>
      </el-col>
      <el-col :span="8" >
        <el-row style="margin-top:10px;">
          <el-alert v-if="resStatus === 0" title="审核未通过" type="error" show-icon :closable='false'></el-alert>
          <el-alert v-if="resStatus === 1" title="审核通过" type="success" show-icon :closable='false'></el-alert>
          <el-alert v-if="resStatus === 2" title="审核状态" type="warning" show-icon :closable='false'></el-alert>
        </el-row>
        <el-row>
          <div style="margin-top:2px;padding:5px;height:396px;width:100%;border:1px solid #DCDFE6;overflow:scroll;border-radius: 4px;">
            <el-row v-for="list in resList" :gutter="10">
              <el-col :span="12" style="color:#F56C6C" >
                疑似错误：{{list.clue}}
              </el-col>
              <el-col :span="12" style="color:#E6A23C">
                提示： {{list.tag}}
              </el-col>
            </el-row>
          </div>
        </el-row>
      </el-col>
    </el-row>
  </d2-container>
</template>

<script>
import dayjs from 'dayjs'
import axios from 'axios'
var jwt = require('jsonwebtoken')
import qs from 'qs'
const searchUrl = '/api'
export default {
  name: 'single',
  data () {
    return {
      singleText: '',
      token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1NzI2MTcxNTgsImFwcEtleSI6ImI0NGRkMjQ3LTk1M2MtNjY5NC1kNjAwLWYzYzUxZTI2MmFlMiIsImlhdCI6MTU3MjU3Mzk1OH0.jNeWP8eovCbCVCGariNitlr_RI5_aH43HmoDsd4DnjU',
      resData: '审核结果显示区域',
      resStatus: 2,
      resList: []
    }
  },
  mounted () {
    this.createToken()
  },
  methods: {
    cleanContent () {
      this.singleText = ''
      this.resData = "审核结果显示区域"
      this.resList = []
      this.resStatus = 2
    } ,
    handlePrediction () {
      if(this.singleText === ''){
        this.$alert('请输入您要检测的新闻内容', '提示', {
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
      this.resList = []
      let searchData = {
        format_content: this.singleText,
        token: this.token,
        cmd: 'fullcheck'
      }
      // console.log(qs.stringify(searchData))
      axios.post(searchUrl, qs.stringify(searchData)).then((res) => {
        console.log('结果', res, res.data.msg)
        this.resStatus = res.data.status
        if(res.data.status === 1) { //为 1 表示审核通过
          this.resData = res.data.msg
        }else if(res.data.status === 0) { //为 0 表示有错误
          this.resData = res.data.msg.response_content
          let reslist = res.data.msg.item
          reslist.forEach(element => {
            this.resList.push({
              "clue": element.clue,
              "tag": element.tag
            })
          })
        }
      }).catch((err) => {
        console.log(err)
      })
    },
    createToken() {
      let appKey = 'b44dd247-953c-6694-d600-f3c51e262ae2';
      let secret = "NDQyZmVjNWM5MjNkMzY5ZTU1Y2ZkNzZkNDdiNTljZmExMjc2MWMxMA==";

      var token = jwt.sign({
        exp: Math.floor(Date.now() / 1000) + (60 * 60 * 12),
        appKey: appKey}, secret);

      this.token = token

      console.log("token:",token)
    }
  }
}
</script>

<style>
.d2-container-full__body {
  padding-top: 0px !important;
}
.res-type {
  color: #909399;
  height:200px;
  width:98%;
  overflow:scroll;
  border-radius: 4px;
  margin: 5px 10px;
}
</style>
