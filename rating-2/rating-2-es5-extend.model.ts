export const ratingHalfStarExtendEs5 = (function(){
  var ratingHalf;
  var ratingEntire;
  // 此类的目的是为了子类继承父类的时候调用一次父类的构造函数，
  var extend = function(subClass, superClass) {
    // 临时的F类 构造函数为空
    var F = function() {}
    F.prototype = superClass.prototype;
    // new F() 的时候调用了F的空构造函数和superClass的构造函数，
    subClass.prototype = new F();
    // 再将子类的构造函数赋给F这个空的构造函数
    subClass.prototype.constructor = subClass;
  }
   // light
  // 点亮
  // 构造函数
  var Light = function(el, options) {
    this.starEle = document.querySelector(el);
    this.starItemsEle = this.starEle.getElementsByClassName('rating-item');
    this.starItems = Array.from(this.starItemsEle);
    this.opts = options;
    this.add =  1;
    this.selectEvent = 'onmouseover';
  }

  Light.prototype.init = function() {
    this.lightOn(this.opts.num);
    if (!this.opts.readOnly) { // 不是只读的时候才会绑定事件
      this.bindEvent();
    }
  }

  Light.prototype.lightOn = function(num) {
    num = parseInt(num);
    this.starItems.forEach((item, index) => {
      if (index < num) {
        item.classList.remove('full-star');
        item.classList.remove('half-star');
        item.classList.add('full-star');
      } else {
        item.classList.remove('full-star');
        item.classList.remove('half-star');
      }
    })
  };

  Light.prototype.bindEvent = function() {
    const _self = this;
    const starItemLength = this.starItems.length;
    this.starItems.forEach((item, index) => {
      
      item[_self.selectEvent] = (event) => {
        let currentNum = 0;
        _self.select(event, item);
        currentNum = index + _self.add;
        this.lightOn(currentNum);
        (typeof this.opts.select === 'function') && this.opts.select(event, currentNum, starItemLength);
        
      }

      item.onclick = function() {
        _self.opts.num = index + _self.add;
        (typeof _self.opts.chosen === 'function') && _self.opts.chosen.call(this, _self.opts.num, starItemLength);
      }

      item.onmouseout = () => {
        this.lightOn(this.opts.num);
      }
    })
  };

  Light.prototype.unbindEvent = function() {
    this.starItems.forEach((item, index) => {
      item.onclick = null;
      item.onmousemove = null;
      item.onmouseout = null;
      item.onmouseover = null;
    })
  }

  Light.prototype.select = function() {
    throw new Error('子类必须实现此方法');
  }

  // 点亮半棵星
  // 构造函数
  var LightHalf = function(el, options) {
    Light.call(this, el, options);
    this.selectEvent = 'onmousemove';
  }

  extend(LightHalf, Light);

  LightHalf.prototype.lightOn = function(num) {
    const count  = parseInt(num);
    const isHalf = count !== num;
    // 判断parseInt之后是不是和本身相等，如相等则不是半颗星星，如不相等则是整颗星星， 比如num = 2.5，则parseInt之后为2，即不等于2.5，所以传入的num就是半颗星星
    
    // 比如传入的num为2.5，则将2颗内的星星点亮，
    Light.prototype.lightOn.call(this, count);
    // 如果是x.5 z则点亮下一个半颗星星
    if(isHalf) {
      this.starItems[count].classList.add('half-star');
    }
  };

  LightHalf.prototype.select = function(event, itemEle) {
    // （鼠标距屏幕最左边的距离pageX - 元素最左边距屏幕最左边的值offsetLeft 之差） < 元素自身的一半的话
        console.log(event.pageX);
        if(event.pageX - itemEle.offsetLeft < (itemEle.offsetWidth /2)) {
          this.add = 0.5;
        } else {
          this.add = 1;
        }
  }

  // lightEntire 
  // 点亮整棵星
  // 构造函数
  var LightEntire = function(el, options) {
    Light.call(this, el, options);
    this.selectEvent = 'onmouseover';
  }

  extend(LightEntire, Light);

  LightEntire.prototype.lightOn = function(num) {
    Light.prototype.lightOn.call(this, num);
  };

  LightEntire.prototype.select = function() {
    this.add = 1;
  }

  // 默认参数
  var defaults = {
    num: 0,
    readOnly: false,
    model: 'LightEntire',
    select: function() {

    },
    chosen: function() {
      
    }
  }

  var mode = {
    'LightEntire': LightEntire,
    'LightHalf': LightHalf
  }

  var init = function(el, option) {
    
    // 初始化配置参数，若用户没有传参，则用defaults的参数，若有传参，则合并用户传参和默认参数给options
    const options = Object.assign({}, defaults, typeof option === 'object' && option);
    if(!mode[options.model]) {
      options.model = 'LightEntire';
    }
   
   if (!ratingHalf && mode[options.model] === LightHalf){
      ratingHalf =  new mode[options.model](el, option);
      ratingHalf.unbindEvent();
      ratingHalf.init();
   }

   if (!ratingEntire && mode[options.model] === LightEntire){
      ratingEntire =  new mode[options.model](el, option);
      ratingEntire.unbindEvent();
      ratingEntire.init();
   }

   // 接触绑定
   if(typeof option === 'string'){
     ratingHalf[option]();
     ratingEntire[option]();
   }
  }
  return {
    init: init
  } 
})()