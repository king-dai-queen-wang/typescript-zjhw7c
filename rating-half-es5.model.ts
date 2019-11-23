export const ratingHalfStarEs5 = (function(){
  // 点亮整棵星
  var LightHalf = function(el, options) {
    this.starEle = document.querySelector(el);
    this.starItemsEle = this.starEle.getElementsByClassName('rating-item');
    this.starItems = Array.from(this.starItemsEle);
    this.opts = options;
  }

  LightHalf.prototype.init = function() {
    this.lightOn(this.opts.num);
    if (!this.opts.readOnly) { // 不是只读的时候才会绑定事件
      this.bindEvent();
    }
    
  }

  LightHalf.prototype.lightOn = function(num) {
    const count  = parseInt(num);
    const isHalf = count !== num;
    // 判断parseInt之后是不是和本身相等，如相等则不是半颗星星，如不相等则是整颗星星， 比如num = 2.5，则parseInt之后为2，即不等于2.5，所以传入的num就是半颗星星
    
    // 比如传入的num为2.5，则将2颗内的星星点亮，
    this.starItems.forEach((item, index) => {
      if (index < count) {
        item.classList.add('full-star');
      } else {
        item.classList.remove('full-star');
        item.classList.remove('half-star');
      }
    });

    // 如果是x.5 z则点亮下一个半颗星星
    if(isHalf) {
      this.starItems[count].classList.add('half-star');
    }
  };

  LightHalf.prototype.bindEvent = function() {
    const _self = this;
    this.starItems.forEach((item, index) => {
      
      const currentNum = index + 1,
      starItemLength = this.starItems.length;
      
      // bind move func
      // 鼠标先经过move事件，再进click事件
      item.onmousemove = (event) => {
        // （鼠标距屏幕最左边的距离pageX - 元素最左边距屏幕最左边的值offsetLeft 之差） < 元素自身的一半的话
        let offsetNum = 0;// 偏移值
        if(event.pageX - item.offsetLeft < (item.style.width /2)) {
          _self.opts.add = 0.5;
        } else {
          _self.opts.add = 1;
        }
        offsetNum = index + _self.opts.add;
        this.lightOn(offsetNum);
        (typeof this.opts.select === 'function') && this.opts.select(event, offsetNum, starItemLength);
        
      }

      item.onclick = function() {
        _self.opts.num = index + _self.opts.add;
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
    add: 1,
    readOnly: false,
    select: function() {

    },
    chosen: function() {

    }
  }
  var init = function(el, options) {
    // 初始化配置参数，若用户没有传参，则用defaults的参数，若有传参，则合并用户传参和默认参数给options
    options = Object.assign({}, defaults, options);
    new LightHalf(el, options).init();
  }
  return {
    init: init
  } 
})()