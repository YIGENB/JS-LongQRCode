var util = {
      imageToBlob:function(src, cb){
        var me=this;
        this.imageToCanvas(src, function (canvas){
            var aa=me.canvasToDataURL(canvas);
            var bb=me.dataURLToBlob(aa);
            cb(me.dataURLToBlob(me.canvasToDataURL(canvas)));
        });
    },
    imageToCanvas:function(src, cb){
        var canvas = document.createElement('CANVAS');
        var ctx = canvas.getContext('2d');
        var img = new Image();
        img.src = src;
        img.setAttribute("crossOrigin",'Anonymous');
        img.onload = function (){
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0);
            cb(canvas);
        };
    },
    dataURLToBlob:function(dataurl){
        var arr = dataurl.split(',');
        var mime = arr[0].match(/:(.*?);/)[1];
        var bstr = atob(arr[1]);
        var n = bstr.length;
        var u8arr = new Uint8Array(n);
        while(n--){
            u8arr[n] = bstr.charCodeAt(n);
        }
        return new Blob([u8arr], {type:mime});
    },
    dataURLToCanvas:function(dataurl, cb){
        var canvas = document.createElement('CANVAS');
        var ctx = canvas.getContext('2d');
        var img = new Image();
        img.onload = function(){
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0);
            cb(canvas);
        };
        img.setAttribute("crossOrigin",'Anonymous');
        img.src = dataurl;
    },
    canvasToDataURL:function(canvas, format, quality){
        return canvas.toDataURL(format||'image/jpeg', quality||1.0);
    },
    loadImageToBlob:function(url, callback) {
		if(!url || !callback) return false;
		var xhr = new XMLHttpRequest();
		xhr.open('get', url, true);
		xhr.responseType = 'blob';
		xhr.onload = function() {
			// 注意这里的this.response 是一个blob对象 就是文件对象
			callback(this.status == 200 ? this.response : false);
		}
		xhr.send();
		return true;
  },
  imageLoad:function(src,callback){
    var me=this;

    if(!src) return;

    if(src.indexOf("http")>-1)
    {
        this.loadImageToBlob(src,function(res){
            callback(me.getObjectURL(res));
        });
    }
    else
    {
        this.imageToBlob(src,function(res){
            callback(me.getObjectURL(res));
        });
    }
  },
  getObjectURL:function (file) {
    var url = null;
    if (window.createObjectURL != undefined) { // basic
      url = window.createObjectURL(file);
    } else if (window.URL != undefined) { // mozilla(firefox)
    url = window.URL.createObjectURL(file);
    } else if (window.webkitURL != undefined) { // webkit or chrome
      url = window.webkitURL.createObjectURL(file);
    }
    return url;
}
}