export const rating5Es5 = (function(){
  var ratingMap = new Map();
  // 策略 
  var strategies = {
    entire: function() { // 整棵星星
      return 1;
    },
    half: function() { // 一半星星
      return 2;
    },
    quarter: function() { // 1/4星星
      return 4;
    }
  }
  // 评分构造函数
    var Rating = function(el, options) {
      this.ele = document.querySelector(el);
      this.opts = Object.assign({}, Rating.DEFAULTS, options);
      // ratio 系数
      if(!strategies[this.opts.mode]) {
        this.opts.mode = 'entire';
      }
      this.ratio = strategies[this.opts.mode]();
      this.itemWidth = 33 / this.ratio;
      this.opts.total *= this.ratio;
      this.num *= this.ratio;
      this.displayWidth = this.opts.num * this.itemWidth;  // 展示层的默认宽度
    }

    Rating.DEFAULTS = {
      total: 5,
      num: 1, // 默认点亮2颗
      readOnly: false,
      mode: 'entire', // m默认点亮整棵
      select: function(){},
      chosen: function(){}
    }

    function setWidth(ele, width){
      if (typeof width === 'number') {
        ele.style.width = width + 'px';
      } else {
        ele.style.width = width;
      }
      
    }

    
    Rating.prototype.init = function() {
      this.buildHtml();
      this.setCss();
      if(!this.opts.readOnly) {
        this.bindEvent();
      }
    }

    // 创建HTML
    Rating.prototype.buildHtml = function(){
      var html = '';
      html += `
      <div class="rating-5-display">

      </div>
      <ul class="rating-5-mask"> `
      for(var i = 0; i< this.opts.total; i++){
          html += `<li class="rating-sprite-5-item"></li>`
      }
      html += `</ul>`;
      this.ele.innerHTML = html;
    }

    // 设置样式
    Rating.prototype.setCss = function() {
      setWidth(this.ele, this.opts.total * this.itemWidth );
      this.displayEle = this.ele.querySelector('.rating-5-display');
      // 设置display的宽度
      setWidth(this.displayEle, this.displayWidth);
      // 设置item星星的宽度
      this.itemEles = this.ele.getElementsByClassName('rating-sprite-5-item');
      Array.from(this.itemEles).forEach((item, index) => {
        setWidth(item, this.itemWidth);
      });
    }
    // 绑定事件
    Rating.prototype.bindEvent = function() { 
      // 绑定mouseover事件
      const itemEles = this.ele.getElementsByClassName('rating-sprite-5-item');
      Array.from(itemEles).forEach((item, index) => {
        const count = (index + 1);
        item.onmouseover = () => {
          setWidth(this.displayEle, count * this.itemWidth);

          if(typeof this.opts.select === 'function') {
            this.opts.select.call(item, count, this.opts.total);
          }
        }

        // 绑定点击事件
        item.onclick = () => {
          this.displayWidth = count * this.itemWidth;
          setWidth(this.displayEle, count * this.itemWidth);

          if(typeof this.opts.chosen === 'function') {
            this.opts.chosen.call(item, count, this.opts.total);
          }
        }

        // 绑定mouseout事件
        this.ele.onmouseout= () => {
          setWidth(this.displayEle, this.displayWidth);
        }
      });
    }

    // 解绑事件
    Rating.prototype.unbindEvent = function() {
      Array.from(this.ele.getElementsByClassName('rating-sprite-5-item'))
      .forEach((item, index) => {
        item.onclick = null;
        item.onmousemove = null;
        item.onmouseout = null;
        item.onmouseover = null;
      })
    }

    var init = function(el, option) {
      this.ele = document.querySelector(el);
      
      if (!ratingMap.has(el)) {
        let rating;
        ratingMap.set(el,
        rating = new Rating(el, 
                  typeof option === 'object' && option ));
        rating.init();
      }
      if(typeof option === 'string') {
        ratingMap.get(el)[option]();
      }
    }

  return {
    init: init
  }
})();