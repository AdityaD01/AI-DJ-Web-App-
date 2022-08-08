song = "";
leftWristX = 0;
leftWristY = 0;
RightWristX = 0;
RightWristY = 0;
scoreLeftWrist = 0;
scoreRightWrist = 0;


function preload(){
    song = loadSound("music.mp3");
}

function setup(){
    canvas = createCanvas(600,500);
    canvas.center();


    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video,modelLoaded);
    poseNet.on("pose",gotPoses);
}

function modelLoaded(){
    console.log("poseNet is Initiallised");
}

function gotPoses(results){
    if(results.length > 0){
    
        console.log(results);
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        
        scoreRightWrist = results[0].pose.keypoints[10].score;
        console.log("scoreLeftWrist = " + scoreLeftWrist + " scoreRightWrist = " + scoreRightWrist);
        leftWristX = results[0].pose.leftWrist.x;
        leftWristY =results[0].pose.leftWrist.y;
        console.log("leftWristX = " + leftWristX + "leftWristY = " + leftWristY)

        RightWristX = results[0].pose.rightWrist.x;
        RightWristY = results[0].pose.rightWrist.y;
        console.log("RightWristX = " + RightWristX + "RightWristY = " + RightWristY)

        
    }
}

function draw(){
    image(video,0,0,600,500);

    fill("#FF0000")
    stroke("#FF0000")
    if(scoreLeftWrist > 0.2)
    {

    circle(leftWristX,leftWristY,20);
    InNumberleftWristY = Number(leftWristY);
    remove_decimal = floor(InNumberleftWristY);
    volume = remove_decimal/500;
    document.getElementById("volume").innerHTML = " Volume = " + volume;
    song.setVolume(volume);
    

}
if(scoreRightWrist > 0.2)
{
    circle(RightWristX,RightWristY,20);  
    if(RightWristY >0 && RightWristY <= 100)
    {
       document.getElementById("speed").innerHTML = "Speed is = 0.5x";
       song.rate(0.5);
    }

    else if(RightWristX > 100 && RightWristX <= 200)
    {
        document.getElementById("speed").innerHTML = "Speed is = 1x";
        song.rate(1);
    }

    
    else if(RightWristX > 200 && RightWristX <= 300)
    {
        document.getElementById("speed").innerHTML = "Speed is = 1.5x";
        song.rate(1.5);
    }
 
    
    else if(RightWristX > 300 && RightWristX <= 400)
    {
        document.getElementById("speed").innerHTML = "Speed is = 2x";
        song.rate(2);
    }

    else{
        document.getElementById("speed").innerHTML = "Speed is = 2.5x";
        song.rate(2.5);
    }

}
} 

function play(){
    song.play();
}
