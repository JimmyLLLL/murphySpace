export const handleDirective = Vue => {
  Vue.directive("dragable", {
    inserted: function(el) {
      el.onmousedown = function(event) {
        const targetX = event.offsetX;
        const targetY = event.offsetY;
        document.onmousemove = function(docEvent) {
          const moveX = docEvent.clientX;
          const moveY = docEvent.clientY;
          el.style.left = parseInt(moveX) - parseInt(targetX) + "px";
          el.style.top = parseInt(moveY) - parseInt(targetY) + "px";
        };
        document.onmouseup = function(event) {
          document.onmousemove = null;
          document.onmouseup = null;
        };
      };
    }
  });
};
