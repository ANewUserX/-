// 节流函数
function throttle(fn,deley = 1000){
  const startTime = 0;
  return function(){
    const nowTime = new Date()
    const context = this
    const args = arguments
    if(nowTime - startTime >= deley){
      fn.call(context,args)
      startTime = nowTime
    }
  }
}

// 防抖函数
function debounce(fn,deley = 1000){
  let timer;
  return function(){
    timer && clearInterval(timer)
    const context = this
    const args = arguments
    timer = setTimeout(()=>{
      fn.call(context,args)
    },deley)
  }
}

export default{
  throttle,
  debounce
}