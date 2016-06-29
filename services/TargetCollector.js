function TargetCollector() {
  this.collection = [];
}

function isElementInViewport (el) {

    var rect = this.getBoundingClientRect();

    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && /*or $(window).height() */
        rect.right <= (window.innerWidth || document.documentElement.clientWidth) /*or $(window).width() */
    );
}

TargetCollector.prototype.collect = function(query) {
  this.collection = $(query).filter(isElementInViewport)
};