const globalMixin = {
  methods:{
    htmlToText(content){
      const theConvertDiv = document.createElement('div')
      theConvertDiv.innerHTML = content
      return theConvertDiv.textContent || theConvertDiv.innerText || ''
    },
    getPubTime(date){
      const dt = new Date(date);

      var y = dt.getFullYear();
      var m = padZero(dt.getMonth() + 1);
      var d = padZero(dt.getDate());

      function padZero(n) {
        return n > 9 ? n : "0" + n;
      }

      return y + "-" + m + "-" + d + " " ;
    }
  }
}

export default globalMixin