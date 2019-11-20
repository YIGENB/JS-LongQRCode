(function(win) {
    /**
     * 长按功能，长按 700ms 以上即可调用回调方法
     *
     * @class
     */
    class LongPress {
      /**
       * 构造器
       *
       * @public
       * @param {String} el 需要长按的 DOM 节点
       * @param {function} callback 长按触发的回调函数
       */
      constructor(el, callback) {
        this.el = el;
        this.timer = null;
        this.init(callback);
      }
  
      /**
       * 初始化
       *
       * @private
       * @param {function} callback 回调函数
       */
      init(callback) {
        this.touchstart(callback);
        this.touchend();
      }
  
      /**
       * 手指按下时开启定时器，700 毫秒后触发回调函数
       *
       * @private
       * @param {function} callback 回调函数
       */
      touchstart(callback) {
        this.el.addEventListener('touchstart', function(event) {
          // 清除默认行为
          event.preventDefault();
          // 开启定时器
          this.timer = setTimeout(() => {
            if (typeof callback === 'function') {
              callback();
            } else {
              console.error('callback is not a function!');
            }
          }, 700);
        });
      }
  
      /**
       * 手指抬起时清除定时器，无论按住时间是否达到 700 毫秒的阈值
       *
       * @private
       */
      touchend() {
        this.el.addEventListener('touchend', function(event) {
          // 清除默认行为
          event.preventDefault();
          // 清除定时器
          clearTimeout(this.timer);
        });
      }
    }
  
    win.LongPress = LongPress;
  })(window);
  