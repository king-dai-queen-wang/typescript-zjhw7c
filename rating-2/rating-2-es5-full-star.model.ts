export const ratingEs5 = (function(){
  // 点亮整棵星
  var LightEntire = function(el, options) {
    this.starEle = document.querySelector(el);
    this.starItemsEle = this.starEle.getElementsByClassName('rating-item');
    this.starItems = Array.from(this.starItemsEle);
    this.opts = options;
  }

  LightEntire.prototype.init = function() {
    this.lightOn(this.opts.num);
    if (!this.opts.readOnly) { // 不是只读的时候才会绑定事件
      this.bindEvent();
    }
    
  }

  LightEntire.prototype.lightOn = function(num) {
    num = parseInt(num);
    this.starItems.forEach((item, index) => {
      if (index < num) {
        item.classList.add('full-star');
      } else {
        item.classList.remove('full-star');
        item.classList.remove('half-star');
      }
    })
  };

  LightEntire.prototype.bindEvent = function() {
    const _self = this;
    this.starItems.forEach((item, index) => {
      
      const currentNum = index + 1,
      starItemLength = this.starItems.length;
      item.onmouseover = (event) => {
        this.lightOn(currentNum);
        (typeof this.opts.select === 'function') && this.opts.select(event, currentNum, starItemLength);
        
      }

      item.onclick = function() {
        _self.opts.num = index + 1;
        (typeof _self.opts.chosen === 'function') && _self.opts.chosen.call(this, currentNum, starItemLength);
      }

      item.onmouseout = () => {
        this.lightOn(this.opts.num);
      }
    })
  };

  // 默认参数
  var defaults = {
    num: 0,
    readOnly: false,
    select: function() {

    },
    chosen: function() {

    }
  }
  var init = function(el, options) {
    // 初始化配置参数，若用户没有传参，则用defaults的参数，若有传参，则合并用户传参和默认参数给options
    options = Object.assign({}, defaults, options);
    new LightEntire(el, options).init();
  }
  return {
    init: init
  } 
})()