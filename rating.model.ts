export class Rating {

  starWrapperEle;
  starItemsEle;
  starItems;
  
  constructor(ratingDomId: string, public totalStar) {
    this.starWrapperEle = document.querySelector(ratingDomId);
    this.init();
    this.bindEvent();
  }

  private init() {
    this.starItemsEle = this.starWrapperEle.getElementsByClassName('rating-item');
    this.starItems  = Array.from(this.starItemsEle);
  }

  public initRating() {
    this.lightOn(this.totalStar);
  }

  private bindEvent() {
    this.starItems.forEach((starItem, starIndex) => {
      starItem.onmouseover = (e, index) => {
        return this.lightOn(starIndex + 1);
      }
    });
    this.starWrapperEle.onmouseout = () => {
      return this.lightOn(this.totalStar);
    }
  }

  private lightOn(num) {
    this.starItems.forEach((starItem, starIndex) => {
      if(starIndex < num) {
        this.addFullStarClass(starItem);
      } else {
        this.removeStarClass(starItem);
      }
    });
  }

  private addFullStarClass(target) {
    target.classList.add('full-star');
  }

  private addHalfStarClass(target) {
    target.classList.add('half-star');
  }

  private removeStarClass(target) {
    target.classList.remove('full-star');
    target.classList.remove('half-star');
  }

}