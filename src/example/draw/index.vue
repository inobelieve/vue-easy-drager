<!--图形计数-->
<template>
  <div class="picture-count sys-flex-row">
    <canvas ref="gameBoard" id="gameCanvas" :class="canvasStatus" width="1920"
            height="1080"></canvas>
    <div class="btn-container sys-flex-column">
      <el-button @click="autoDraw" class="sys-button">抛物线</el-button>
      <el-button @click="drawLine" class="sys-button">画笔</el-button>
      <el-button @click="eraser" class="sys-button">橡皮擦</el-button>
      <el-button @click="startRecord" :disabled="ispalying" class="sys-button">{{isRecording ? '停止' : '开始'}}录制
      </el-button>
      <el-button @click="play" :disabled="isRecording" class="sys-button">播放录屏</el-button>
      <el-button @click="clearTrail" :disabled="isRecording" class="sys-button">清空数据</el-button>
      <el-button @click="clearDisplay" class="sys-button">清屏</el-button>
    </div>
  </div>
</template>

<script>
// import Recorder from 'js-audio-recorder';

export default {
  name: 'draw',
  data() {
    return {
      oQuadraticCurveTo: null,
      oContext: null,
      // 绘制抛物线的次数
      drawTime: 1,
      localtion: {
        x: 0,
        y: 0
      },
      lineWidth: 8,
      pointsList: [],
      canvasStatus: 'is-drawing',
      isRecording: false,
      // 用于收起画笔的节流
      writeTimer: null,
      // 开始绘制时的时间
      startTime: 0,
      trailData: [],
      // 播放帧
      playIndex: 0,
      ispalying: false,
      // recorder: null
    }
  },
  methods: {
    clearDisplay() {
      let {oContext} = this
      this.drawTime = 0
      oContext.clearRect(0, 0, 1920, 1080)
    },
    clearTrail() {
      this.clearDisplay()
      this.trailData = []
    },
    init() {
      this.oQuadraticCurveTo = document.getElementById('gameCanvas')
      this.oContext = this.oQuadraticCurveTo.getContext('2d')
      this.oContext.strokeStyle = 'blue'
      this.oContext.lineCap = 'round'
      this.oContext.lineJoin = 'round'
      this.oContext.lineWidth = this.lineWidth
      // this.recorder = new Recorder()
      document.onmousewheel = () => {
        document.onmousemove = null
        document.onmouseup = null
      }
    },
    // 开始/停止录屏
    startRecord() {
      this.isRecording = !this.isRecording
      if (this.isRecording) {
        // this.recorder.start()
        // 记录开始时间
        this.startTime = new Date().getTime()
      } else {
        // this.recorder.stop()
      }
    },
    play() {
      this.pointsList = []
      this.oContext.clearRect(0, 0, 1920, 1080)
      this.oContext.beginPath()
      this.playIndex = 0
      this.ispalying = true
      this.playRecord()
      // this.recorder.play()
    },
    playRecord() {
      let {oContext} = this
      let item = this.trailData[this.playIndex]
      if (item && item.type === 'line') {
        this.pointsList.push({...item})
        if (item.status === 'draw-line') {
          oContext.lineWidth = item.data.width || 2
          if (this.playIndex < 2) {
            oContext.lineTo(item.x, item.y)
          } else {
            let lastIndex = this.playIndex - 1
            let endIndex = this.playIndex
            let lastTwoPoints = [{...this.trailData[lastIndex]}, {...this.trailData[endIndex]}]
            const controlPoint = lastTwoPoints[0]
            const endPoint = {
              x: (lastTwoPoints[0].x + lastTwoPoints[1].x) / 2,
              y: (lastTwoPoints[0].y + lastTwoPoints[1].y) / 2,
            }
            oContext.quadraticCurveTo(controlPoint.x, controlPoint.y, endPoint.x, endPoint.y)
            oContext.stroke()
            oContext.beginPath()
            oContext.moveTo(endPoint.x, endPoint.y)
          }
        } else {
          oContext.moveTo(item.x, item.y)
        }
      } else if (item && item.type === 'eraser') {
        oContext.clearRect(item.x, item.y, 30, 30)
      }
      if (item) {
        setTimeout(() => {
          this.playRecord()
        }, item.time)
        this.playIndex++
      } else {
        this.ispalying = false
      }
    },
    // 橡皮擦
    eraser() {
      let {gameBoard} = this.$refs
      let {oContext} = this
      this.canvasStatus = 'is-clear'
      gameBoard.onmousedown = () => {
        document.onmousemove = (e) => {
          this.localtion.x = e.offsetX
          this.localtion.y = e.offsetY
          if (e.target.nodeName === 'CANVAS') {
            this.trailData.push({
              ...this.localtion,
              type: 'eraser',
              status: 'start',
              time: new Date().getTime() - this.startTime,
              data: {}
            })
            oContext.clearRect(this.localtion.x, this.localtion.y, 30, 30)
            // 上一个点的时间
            this.startTime = new Date().getTime()
          }
        }
        document.onmouseup = () => {
          document.onmousemove = null
          document.onmouseup = null
        }
      }
    },
    // 画线条
    drawLine() {
      this.canvasStatus = 'is-drawing'
      let {gameBoard} = this.$refs
      let {oContext} = this
      gameBoard.onmousedown = (evt) => {
        clearTimeout(this.writeTimer)
        oContext.beginPath()
        // 清除上一次绘图数据影响
        this.pointsList = []
        const beginPoint = {
          x: evt.offsetX,
          y: evt.offsetY
        }
        oContext.moveTo(beginPoint.x, beginPoint.y)
        document.onmousemove = (e) => {
          if (e.target.nodeName === 'CANVAS') {
            this.localtion.x = e.offsetX
            this.localtion.y = e.offsetY
            this.pointsList.push({...this.localtion})
            let t = new Date().getTime() - this.startTime
            if (this.pointsList.length > 2) {
              let lastTwoPoints = this.pointsList.slice(-2)
              //
              let last = lastTwoPoints[0]
              let s = ((last.x - this.localtion.x) ** 2 + (last.y - this.localtion.y) ** 2) ** 0.5
              let v = parseInt(s / t, 10)
              let width = Math.max(6 - 1.4 * v, 2)
              // 画笔宽度变化不超过20%
              if (width > this.lineWidth) {
                this.lineWidth = Math.min(width, 1.2 * this.lineWidth)
              } else {
                this.lineWidth = Math.max(width, this.lineWidth / 1.2)
              }
              oContext.lineWidth = this.lineWidth
              //
              const controlPoint = lastTwoPoints[0]
              const endPoint = {
                x: (lastTwoPoints[0].x + lastTwoPoints[1].x) / 2,
                y: (lastTwoPoints[0].y + lastTwoPoints[1].y) / 2,
              }
              // 防止采样不足，使用贝塞尔曲线
              oContext.quadraticCurveTo(controlPoint.x, controlPoint.y, endPoint.x, endPoint.y)
              oContext.stroke()
              oContext.beginPath()
              oContext.moveTo(endPoint.x, endPoint.y)
            } else {
              oContext.lineTo(e.offsetX, e.offsetY)
              oContext.beginPath()
            }
            // 录制
            if (this.isRecording) {
              // console.log('录制中')
              if (this.pointsList.length === 1) {
                console.log('开始绘图')
                this.trailData.push({
                  ...this.localtion,
                  type: 'line',
                  status: 'start',
                  time: t,
                  data: {}
                })
              } else {
                this.trailData.push({
                  ...this.localtion,
                  type: 'line',
                  status: 'draw-line',
                  time: t,
                  data: {
                    width: this.lineWidth
                  }
                })
              }
            }
            // 上一个点的时间
            this.startTime = new Date().getTime()
          } else {
            // 便于画笔重新进入画布时设置起点
            this.pointsList = []
          }
        }
        document.onmouseup = () => {
          // 忽略10ms以内的断触
          this.writeTimer = setTimeout(() => {
            document.onmousemove = null
            document.onmouseup = null
          }, 10)
        }
      }
    },
    // 抛物线绘制
    drawDarabola() {
      let {oContext} = this
      oContext.beginPath()
      // 起点
      oContext.moveTo(this.localtion.x, this.localtion.y)
      this.localtion.x += 10
      switch (this.drawTime) {
        case 1:
          this.localtion.y = 0.004 * this.localtion.x ** 2 - 1.6 * this.localtion.x + 660
          break
        case 2:
          this.localtion.y = 0.0005 * this.localtion.x ** 2 - 0.2 * this.localtion.x + 646
          break
        default:
          this.localtion.y = 0.0002 * this.localtion.x ** 2 - 0.07747 * this.localtion.x + 645
      }
      // 终点
      oContext.lineTo(this.localtion.x, this.localtion.y)
      oContext.strokeStyle = 'blue'
      oContext.lineCap = 'round'
      oContext.lineWidth = this.lineWidth
      oContext.stroke()
      if (this.localtion.x < 1920 && this.localtion.y < 1080) {
        window.requestAnimationFrame(this.drawDarabola)
      }
    },
    autoDraw() {
      this.localtion.x = 10
      this.localtion.y = 644
      this.drawTime < 3 ? this.drawTime++ : this.drawTime = 1
      this.drawDarabola()
    }
  },
  mounted() {
    this.init()
    // this.drawDarabola()
    this.drawLine()
  }
}
</script>

<style lang="scss" scoped>
  .picture-count {
    position: fixed;
    z-index: 200;
    .is-clear {
      cursor: url("./images/clear.svg"), auto;
    }
    .is-drawing {
      cursor: url("./images/pen.svg"), auto;
    }
    .btn-container {
      position: absolute;
      top: 10px;
      left: 20px;
      .sys-button {
        margin: 5px 10px;
        min-width: 100px;
        text-align: center;
        border-radius: 10px;
      }
    }
  }
</style>
