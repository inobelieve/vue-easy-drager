/**
 * 传参举例
 * {
 *  handler: handleDrag,
 *  limit: {y: [0, 1920]}
 * }
 */
// import { countScale } from '@/utils'
function registerDrag(app = null) {
  if (!app) {
    return '未传入实例！'
  }
  let keyBoard = {
    Shift: false,
    Alt: false
  }
  function setVal(e) {
    keyBoard.Shift = e.shiftKey
    keyBoard.Alt = e.altKey
  }
  function clearVal() {
    keyBoard.Shift = false
    keyBoard.Alt = false
  }

  let doMove = (el, binding, direction = '') => {
    document.addEventListener('keydown', setVal)
    document.addEventListener('keyup', clearVal)
    el.style.cursor = 'move'
    el.setAttribute('draggable', false)
    el.onmousedown = (dom) => {
      // 算出鼠标相对元素的位置
      let initLeft = el.offsetLeft
      let initTop = el.offsetTop
      let movStartLeft = dom.clientX
      let movStartTop = dom.clientY
      // let scal = countScale()
      let scal = 1
      document.onmousemove = (e) => {
        if (keyBoard.Shift) {
          direction = 'x'
        } else if (keyBoard.Alt) {
          direction = 'y'
        } else {
          direction = ''
        }
        // 用鼠标的位置减去鼠标相对元素的位置，得到元素的位置
        let left = (e.clientX - movStartLeft) / scal
        let top = (e.clientY - movStartTop) / scal
        let positionLeft = initLeft
        let positionTop = initTop
        // 是否传入限制
        let limit = binding.value.limit || {}
        let limitX = limit.x || []
        let limitY = limit.y || []
        let x = initLeft + left
        let y = initTop + top
        let leftVal = (limitX[0] || limitX[0] === 0) ? Math.max(x, limitX[0]) : x
        leftVal = (limitX[1] || limitX[1] === 0) ? Math.min(leftVal, limitX[1]) : leftVal
        let topVal = (limitY[0] || limitY[0] === 0) ? Math.max(y, limitY[0]) : y
        topVal = (limitY[1] || limitY[1] === 0) ? Math.min(topVal, limitY[1]) : topVal
        // 是否是一维拖动
        if (direction === 'x') {
          positionLeft = leftVal
        } else if (direction === 'y') {
          positionTop = topVal
        } else {
          positionLeft = leftVal
          positionTop = topVal
        }
        el.style.left = positionLeft + 'px'
        el.style.top = positionTop + 'px'
        if (typeof binding.value === 'function') {
          binding.value({
            el: e,
            status: 'draging',
            left: positionLeft,
            top: positionTop
          })
        } else if (binding.value && typeof binding.value.handler === 'function') {
          binding.value.handler({
            el: e,
            status: 'draging',
            left: positionLeft,
            top: positionTop
          })
        }
      }
      // 当鼠标松开，且未触发onmouseup时
      document.onmouseup = () => {
        document.onmousemove = null
        document.onmouseup = null
        if (typeof binding.value === 'function') {
          binding.value({
            el: dom,
            status: 'dragend'
          })
        }
      }
    }
  }

  app.directive('drag', {
    // vue2.0
    bind (el, binding) {
      if (binding.value) {
        el.style.position = 'absolute'
        doMove(el, binding)
      }
    },
    update (el, binding) {
      if (binding.value) {
        el.style.position = 'absolute'
        doMove(el, binding)
      } else {
        el.style.cursor = 'default'
        el.onmousedown = null
      }
    },
    // vue3.0
    mounted (el, binding) {
      if (binding.value) {
        el.style.position = 'absolute'
        doMove(el, binding)
      }
    },
    updated (el, binding) {
      if (binding.value) {
        el.style.position = 'absolute'
        doMove(el, binding)
      } else {
        el.style.cursor = 'default'
        el.onmousedown = null
      }
    }
  })
  app.directive('drag-x', {
    bind (el, binding) {
      if (binding.value) {
        el.style.position = 'absolute'
        doMove(el, binding, 'x')
      }
    },
    update (el, binding) {
      if (binding.value) {
        el.style.position = 'absolute'
        doMove(el, binding, 'x')
      } else {
        el.style.cursor = 'default'
        el.onmousedown = null
      }
    },
    // vue3.0
    mounted (el, binding) {
      if (binding.value) {
        el.style.position = 'absolute'
        doMove(el, binding, 'x')
      }
    },
    updated (el, binding) {
      if (binding.value) {
        el.style.position = 'absolute'
        doMove(el, binding, 'x')
      } else {
        el.style.cursor = 'default'
        el.onmousedown = null
      }
    }
  })
  app.directive('drag-y', {
    bind (el, binding) {
      if (binding.value) {
        el.style.position = 'absolute'
        doMove(el, binding, 'y')
      }
    },
    update (el, binding) {
      if (binding.value) {
        el.style.position = 'absolute'
        doMove(el, binding, 'y')
      } else {
        el.style.cursor = 'default'
        el.onmousedown = null
      }
    },
    // vue3.0
    mounted (el, binding) {
      if (binding.value) {
        el.style.position = 'absolute'
        doMove(el, binding, 'y')
      }
    },
    updated (el, binding) {
      if (binding.value) {
        el.style.position = 'absolute'
        doMove(el, binding, 'y')
      } else {
        el.style.cursor = 'default'
        el.onmousedown = null
      }
    }
  })
  return app
}
export default registerDrag
