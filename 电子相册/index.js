window.onload=function () {
			    let oA=document.querySelector("#a1");
			    let timer=null;
			    function autoPlay() {
			        if (oA.paused) { //如果暂停
			            oA.paused=false;//设为不暂停
			            oA.volume=0.1;//设置自动播放的初始音量
			            oA.play();//调用play（）方法播放
			        }else {//如果未暂停
			            clearInterval(timer);//清掉定时器
			        }
			    }
			    timer=setInterval(autoPlay,1);//用定时器触发autoplay自动播放
			}