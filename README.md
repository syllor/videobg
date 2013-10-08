videobg
=======
http://syllor.com/videobg/

use html5 video as background 

this one works the same as spotify

https://www.spotify.com/us/video-splash/

+ do not works on cell phone

+ ie7 ie8 and other bowser which can not support video will repeat show images

+ chrome firefox safari ie9+ the video works


##setup
this is depend on jquery 
var yourvideobg = new videobg("#main",options)


##options

#####option.width 
#####option.height
you have to provide a video width height,then the script need init with the video ratio

#####option.webm
#####option.mp4
#####option.ogg
need 3 types of the video

#####options.imgs
this is a set of images or one image
when the array length is not 1,a set of images will repeat shown in 10sec

if length is 1,there will be a image as background