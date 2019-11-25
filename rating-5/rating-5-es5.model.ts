export const rating5Es5 = (function(){
  // 评分
    var Rating = function(el, options) {
      this.ele = document.querySelector(el);
      this.opts = Object.assign({}, Rating.DEFAULTS, options);
      this.itemWidth = 33;
      this.displayWidth = this.opts.num * this.itemWidth; 
    }

    Rating.DEFAULTS = {
      total: 5,
      num: 2,
      readOnly: false,
      select: function(){},
      chosen: function(){}
    }

    
    Rating.prototype.init = function() {
      this.buildHtml();
      this.setCss();
      if(this.opts.readOnly) {
        this.bindEvent();
      }
    }

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


    Rating.prototype.setCss = function() {
      this.ele.width = this.opts.total * this.itemWidth;
      this.displayEle = this.ele.querySelector('.rating-5-display');
      // 设置display的宽度
      this.displayEle.width = this.displayWidth;
      // 设置item星星的宽度
      this.itemEles = this.ele.getElementsByClassName('rating-sprite-5-item');
      Array.from(this.itemEles).forEach((item, index) => {
        item.width = this.itemWidth;
      });
    }

    Rating.prototype.bindEvent = function() { 
      // 绑定mouseover事件
      this.ele.onmouseover= () => {
        const itemEles = this.ele.getElementsByClassName('rating-sprite-5-item');
        Array.from(itemEles).forEach((item, index) => {
          const count = (index + 1);
          this.displayEle.width = count * this.itemWidth;

          if(typeof this.opts.select === 'function') {
            this.opts.select.call(item, count, this.opts.total);
          }
        });
      }

      // 绑定点击事件
      this.ele.onclick= () => {
        const itemEles = this.ele.getElementsByClassName('rating-sprite-5-item');
        Array.from(itemEles).forEach((item, index) => {
          const count = (index + 1);
          this.displayEle.width = count * this.itemWidth;

          if(typeof this.opts.chosen === 'function') {
            this.opts.chosen.call(item, count, this.opts.total);
          }
        });
      }


      // 绑定mouseout事件
      this.ele.onmouseout= () => {
        this.displayEle.width = this.displayWidth;
      }
    }

  var init = function(el, option) {
    new Rating(el, option).init();
  }

  return {
    init: init
  }
})();