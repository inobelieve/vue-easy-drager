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
    console.log('setVal')
  }
  function clearVal() {
    keyBoard.Shift = false
    keyBoard.Alt = false
  }
  function addListener() {
    document.addEventListener('keydown', setVal)
    document.addEventListener('keyup', clearVal)
  }
  function removeListener() {
    document.removeEventListener('keydown', setVal)
    document.removeEventListener('keyup', clearVal)
  }

  let doMove = (el, binding, direction = '') => {
    el.style.cursor = 'move'
    el.setAttribute('draggable', false)
    el.onmousedown = (dom) => {
      addListener()
      // 算出鼠标相对元素的位置
      let initLeft = el.offsetLeft
      let initTop = el.offsetTop
      let movStartLeft = dom.clientX
      let movStartTop = dom.clientY
      // let scal = countScale()
      let scal = 1
      let positionLeft = initLeft
      let positionTop = initTop
      function handleMousemove (e) {
        // 用鼠标的位置减去鼠标相对元素的位置，得到元素的位置
        let left = (e.clientX - movStartLeft) / scal
        let top = (e.clientY - movStartTop) / scal
        // 是否传入限制
        let limit = binding.value.limit || {}
        let limitX = limit.x || []
        let limitY = limit.y || []
        let x = initLeft + left
        let y = initTop + top
        // 取中间值
        let leftVal = [x, limitX[0]??-10000, limitX[1]??10000].sort((a, b) => {
          return a - b
        })[1]
        let topVal = [y, limitY[0]??-10000, limitY[1]??10000].sort((a, b) => {
          return a - b
        })[1]
        // 是否是一维拖动
        if (direction === 'x' || (keyBoard.Shift && !direction)) {
          positionLeft = leftVal
        } else if (direction === 'y' || keyBoard.Alt) {
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
        } else if (typeof binding?.value?.handler === 'function') {
          binding.value.handler({
            el: e,
            status: 'draging',
            left: positionLeft,
            top: positionTop
          })
        }
      }
      document.addEventListener('mousemove', handleMousemove)
      // 当鼠标松开，且未触发onmouseup时
      document.onmouseup = () => {
        document.onmouseup = null
        document.removeEventListener('mousemove', handleMousemove)
        removeListener()
        if (typeof binding.value === 'function') {
          binding.value({
            el: dom,
            status: 'dragend',
            left: positionLeft,
            top: positionTop
          })
        } else if (typeof binding?.value?.handler === 'function') {
          binding.value.handler({
            el: dom,
            status: 'dragend',
            left: positionLeft,
            top: positionTop
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
