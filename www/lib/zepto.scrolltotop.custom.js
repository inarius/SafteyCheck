;(function($){
  var scrollToTopInProgress = false

  $.fn.scrollToTop = function (position, options) {
    var $this = this;
    if (typeof options != "undefined" && options.absolute) // absolute positioning requires an offset position relative to the element/scroll position
        position = position + $this.scrollTop() - $this.position().top;
    var targetY = position || 0,
        initialY = $this.scrollTop(),
        lastY = initialY,
        delta = targetY - initialY,
        speed = Math.min(1500, Math.min(2500, Math.abs(initialY-targetY))),
        start, t, y, frame = window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        function(callback){ setTimeout(callback,15) },
        cancelScroll = function(){ abort() }

    if (scrollToTopInProgress) return
    if (delta == 0) return

    function smooth(pos){
      if ((pos/=0.5) < 1) return 0.5*Math.pow(pos,5)
      return 0.5 * (Math.pow((pos-2),5) + 2)
    }

    function abort(){
      $this.off('touchstart', cancelScroll)
      scrollToTopInProgress = false
    }

    $this.on('touchstart', cancelScroll)
    scrollToTopInProgress = true

    frame(function render(now){
      if (!scrollToTopInProgress) return
      if (!start) start = now
      t = Math.min(1, Math.max((now - start)/speed, 0))
      y = Math.floor(initialY + delta * smooth(t))
      if (delta > 0 && y > targetY) y = targetY
      if (delta < 0 && y < targetY) y = targetY
      if (lastY != y) $this.scrollTop(y)
      lastY = y
      if (Math.floor(lastY) !== Math.floor(targetY)) frame(render)
        else abort()
    })
  }
})(Zepto)