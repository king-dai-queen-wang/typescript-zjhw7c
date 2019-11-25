// Import stylesheets
import './style.css';
import './rating-3-use-css/css/style-sprite.scss';
import './rating-4/rating-4-style.scss';
import './rating-5/rating-5-style.scss';
import {Rating} from './rating-1/rating-1-es6.model.ts';
import {ratingEs5} from './rating-2/rating-2-es5-full-star.model';
import {ratingHalfStarEs5} from './rating-2/rating-2-half-es5.model';
import {ratingHalfStarExtendEs5} from './rating-2/rating-2-es5-extend.model';
import {rating5Es5} from './rating-5/rating-5-es5.model';
const num = 3;
// 第一种ES6实现
const rating =  new Rating('#rating-full-star', num);
rating.initRating(num);

// 第二种ES5实现
const ratingFullStarEs5 = ratingEs5.init('#rating-full-star-es5', {
  num: 2,
  select: function (event, num, total) {
    console.log(event.target, '当前滑过' + num, '总计' + total);
  },
  chosen: function(num, total) {
    console.log(this);
    console.log('当前选中' + num, '总计' + total);
  }
  });


// 第三种选择半颗ES5实现
  document.querySelector('#select-rating-type').onchange = 
  function (event) {
    const ratingHalfEs5 = ratingHalfStarExtendEs5.init('#rating-half-star-es5', {
      num: 2.5,
      model: event.target.value,
      select: function (event, num, total) {
        console.log(event.target, '当前滑过' + num, '总计' + total);
      },
      chosen: function(num, total) {
        console.log(this);
        console.log('当前选中' + num, '总计' + total);
        ratingHalfStarExtendEs5.init('#rating-half-star-es5', 'unbindEvent')
      }
      });
      
  }


// 第五种ES5实现
const rating5 = rating5Es5.init('#rating-5', {});