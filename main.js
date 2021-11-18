song1="";
song2="";
function preload()
{
    song1=loadSound("music.1.mp3");
    song2=loadSound("music.2.mp3");

}
scoreRightWrist=0;
scoreLeftWrist=0;
rightWristX=0;
rightWristY=0;
leftWristX=0;
leftWristY=0;
function setup()
{
    canvas=createCanvas(600,500);
    canvas.center();
    video=createCapture(VIDEO);
    video.hide();
    poseNet=ml5.poseNet(video,modelLoaded);
    poseNet.on('pose',gotPoses);
}
function modelLoaded()
{
console.log("poseNet is Initialized")
}
function clearCanvas()
    {
        background("white");
    }

function draw()
{
   image(video,0,0,600,500);
   fill("#FF0000")
   stroke("#FF0000")
   song1_status=song1.isPlaying();
   song2_status=song2.isPlaying();
    
   if(scoreRightWrist>0.2)
   {
       circle(rightWristX,rightWristY,20);
       song2.stop();
       if(song1_status==false)
       {
           document.getElementById("song").innerHTML="Playing Kill chori";
          song1.play();
        
       }
       }
      
       if(scoreLeftWrist>0.2)
   {
       circle(leftWristX,leftWristY,20);
       song1.stop();
       if(song2_status==false)
       {
           document.getElementById("song2").innerHTML="Playing Seeti mar";
          song2.play();
        
       }
       }
   }

   if(scoreLeftWrist>0.2)
   {
       circle(leftWristX,leftWristY,20);
       InNumberleftWristY=Number(leftWristY);
       remove_decimal=floor(InNumberleftWristY);
       volume=remove_decimal/500;
       document.getElementById("volume").innerHTML= "V = "+ volume;
       song.setVolume(volume);
   }
    

    function play()
    {
        song.play();
        song.setVolume(1);
        song.rate(1);
    }
    
    function gotPoses(results)
    {
        if(results.length>0)
        {
            scoreRightWrist=results[0].pose.keypoints[10].score;
            scoreLeftWrist=results[0].pose.keypoints[9].score;

            rightWristX=results[0].pose.rightWrist.x;
            rightWristY=results[0].pose.rightWrist.y;
            leftWristX=results[0].pose.leftWrist.x;
            leftWristY=results[0].pose.leftWrist.y;
        }
        
       
    }

