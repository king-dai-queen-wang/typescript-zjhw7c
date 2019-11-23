// Import stylesheets
import './style.css';
import {Rating} from './rating.model.ts';
import {ratingEs5} from './rating-es5.model';
import {ratingHalfStarEs5} from './rating-half-es5.model';

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
  const ratingHalfEs5 = ratingHalfStarEs5.init('#rating-half-star-es5', {
num: 2.5,
  select: function (event, num, total) {
    console.log(event.target, '当前滑过' + num, '总计' + total);
  },
  chosen: function(num, total) {
    console.log(this);
    console.log('当前选中' + num, '总计' + total);
  }
  })
