<template>
  <d2-container>
    <span></span>
    <template slot="header">
      <el-row :gutter="30" type="flex" justify="left">
        <el-col :span="4">
          <el-upload :before-upload="handleUpload" action="default">
            <el-button type="primary">
              <d2-icon name="file-text"/>
              选择要导入的文件
            </el-button>
          </el-upload>
        </el-col>
        <el-col :span="3" style="width:130px;">
          <el-button type="success" @click="handlePrediction">开始预测</el-button>
        </el-col>
        <el-col :span="3" style="width:160px;" v-if="isDownload">
          <el-button type="danger" @click="handleDownload">
            <d2-icon name="download"/>
            导出excel
          </el-button>
        </el-col>
      </el-row>
      <span class="text">支持导入 tsv，csv，xlsx 文件</span>
    </template>
    <d2-crud
      v-loading="batchLoading"
      :columns="columns"
      :data="data"
    />
  </d2-container>
</template>

<script>
import { ExportToCsv } from 'export-to-csv'
import axios from 'axios'
// const searchBatchUrl = 'http://192.168.9.94:8360/index/search'
const searchBatchUrl = 'http://119.23.30.32:8360/index/search'
const options = {
  filename: '预测结果',
  fieldSeparator: ',',
  quoteStrings: '',
  decimalSeparator: '.',
  // showLabels: true, 
  // showTitle: true,
  // title: '预测结果',
  useTextFile: false,
  useBom: true,
  // useKeysAsHeaders: true,
  // headers: ['Column 1', 'Column 2', etc...] <-- Won't work with useKeysAsHeaders present!
}
const csvExporter = new ExportToCsv(options)
export default {
  name: 'single',
  data () {
    return {
      isDownload: false,
      batchLoading: false,
      columns: [
        { title: '文本', key: 'text' }
      ],
      data: []
    }
  },
  mounted () {
  },
  methods: {
    handleUpload (file) {
      this.$import.csv(file)
        .then(res => {
          this.columns = Object.keys(res.data[0]).map(e => ({
            title: '文本',
            key: e
          }))
          this.data = res.data
          console.log(this.columns, this.data)
        })
      return false
    },
    handleDownload (params = {}) {
      let resultDate = this.data.map(e => ({
        id: e.id,
        text: e.text,
        label: e.label
      }))
      csvExporter.generateCsv(resultDate)
    },
    handlePrediction () {
      if(this.data.length === 0){
        this.$alert('请上传文件', '提示', {
          confirmButtonText: '好的',
          type: 'warning'
        })
      } else {
        let sendString = ''
        for(let i in this.data) {
          sendString += this.data[i].text + '\n'
        }
        // console.log(sendString)
        this.searchBatch(sendString)
      }
    },
    searchBatch (sendString) {
      console.log('批量查询数据', this.data)
      this.batchLoading = true
      axios.post(searchBatchUrl, {
        searchInfo: sendString
      }).then((res) => {
        console.log('结果', res)
        if(res.data.errno === 0) {
          this.data = []
          this.columns = [
            { title: '序号', key: 'id', width: '80'},
            { title: '文本', key: 'text' },
            { title: '预测结果', key: 'label', width: '300' },
          ]
          for(let i in res.data.data) {
            if(res.data.data[i] !== null) {
              this.data.push({
                id: Number(i) + 1,
                text: res.data.data[i].type,
                label: res.data.data[i].item_name
              })
            }
          }
          this.batchLoading = false
          this.isDownload = true
        }
      }).catch((err) => {
        console.log(err)
        this.batchLoading = false
      })
    }
  }
}
</script>

<style>
.d2-container-full__body {
  padding-top: 0px !important;
}
.d2-container-full__header {
  padding-bottom: 0px !important;
}
.text {
  margin-left:0px;
  color:gray;
  text-align:center;
  line-height:40px;
  font-size: 14px;
}
</style>
