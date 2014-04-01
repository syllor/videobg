videobg = function(el,options){
  this.options = options
  this.ele = $(el);
  this.ratio = this.options.height/this.options.width;
  this.videobg = $("<div/>").css({
    position:'fixed',
    overflow:'hidden',
    top:0,
    left:0,
    width:'100%',
    height:'100%',
    'z-index':0
  })
  this.video= $("<video/>").css({
    position:'absolute',
    top:'50%',
    left:0,
    'z-index':0
  }).prop({
    autoplay:true,
    loop:true,
    preload:'auto'
  }),
  this.wrapper = $("<div/>").addClass('video_wrapper')
      .css({
        position:'absolute',
        top:0,
        left:0,
        'z-index':1,
        width:'100%',
        height:'100%'
      })
}
videobg.prototype = {
  init:function(){
    var that = this;
    if (isMobile.any())
      return;

    if (this.canplay()) {
      if (this.supportType('webm')){
        this.video.attr('src',this.options.webm);
      }
      else if (this.supportType('mp4')) {     
        this.video.attr('src',this.options.mp4);
      }
      else {
        this.video.attr('src',this.options.ogv);
      }
      this.fixheight();
      window.onresize = function(){
        that.fixheight();
      }
    }else{
      this.buildimgslide();
    }
    this.ele.wrap(this.wrapper);
    this.videobg.addClass('videobg')
    this.videobg.append(this.video);
    $("body").append(this.videobg);
   
  },
  buildimgslide:function(){
    var that = this;
    // load all images when page load then bind event
    var len = this.options.imgs.length;
    if(len == 1){
      var img = $('<img/>');
      img.attr('src',this.options.imgs[0])
          .css('position','absolute')
          .css('top',0)
          .css('left',0)
          .css('min-width','100%')
          .css('min-height','100%')
      return this.videobg.append(img);
    }
    var index = 0;
    $(this.options.imgs).each(function(i,item){
      var img = $('<img/>');
      var url = that.options.imgs[i];
      img.attr('src',url)
          .css('position','absolute')
          .css('top',0)
          .css('left',0)
          .css('min-width','100%')
          .css('min-height','100%')
          .css('opacity','0');
        that.videobg.append(img);
    })
    function changeimg(){
      $(".videobg img").eq(index-1).animate({
        opacity:0
      },1000);
      $(".videobg img").eq(index).animate({
        opacity:1
      },1000,function(){
        if (index == len-1){
          index = 0;
        }else{
          index += 1;
        }
        setTimeout(function(){
          changeimg();
        },10000)
      })
    }

    $(document).ready(function() {
      changeimg();    
    })
  },
  fixheight:function(){
    var h = $(window).height();
    var w = $(window).width();
    //console.log(h)
    //console.log(w)
    //console.log(h/w);
    //console.log(this.ratio)
    if(h/w < this.ratio ){
      this.video.css('width',w);
      this.video.css('height','auto')
      this.video.css('margin-top',-w*this.ratio/2)
      this.video.css('margin-left','0px')
      this.video.css('top','50%')
      this.video.css('left','0')
    }else{
      this.video.css('height',h)
      this.video.css('width','auto');
      this.video.css('margin-left',-h/this.ratio/2)
      this.video.css('margin-top','0px')
      this.video.css('top','0')
      this.video.css('left','50%')
    }
  },
  canplay:function(){
    var can = document.createElement('video');
    if(can.canPlayType){
      return true;
    } else{
      return false;
    }
  },
  supportType:function(str){
    var v = document.createElement('video');
    switch (str) {
      case 'webm' :
        return (v.canPlayType('video/webm; codecs="vp8, vorbis"'));
        break;
      case 'mp4' :
        return (v.canPlayType('video/mp4; codecs="avc1.42E01E, mp4a.40.2"'));
        break;
      case 'ogv' :
        return (v.canPlayType('video/ogg; codecs="theora, vorbis"'));
        break;      
    }
  }
}

var isMobile = {  
    Android: function() {  
        return navigator.userAgent.match(/Android/i) ? true : false;  
    },  
    BlackBerry: function() {  
        return navigator.userAgent.match(/BlackBerry/i) ? true : false;  
    },  
    iOS: function() {  
        return navigator.userAgent.match(/iPhone|iPad|iPod/i) ? true : false;  
    },  
    Windows: function() {  
        return navigator.userAgent.match(/IEMobile/i) ? true : false;  
    },  
    any: function() {  
        return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Windows());  
    }  
};  
