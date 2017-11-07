
var analyze;
var volhistory = [];
var cnv;
var vol;
var soundFile;
var fft;
var peakDetect;
var ellipseWidth = 100;
var songs;
var numSong;


function preload(){
    songs = [
        {
            song: loadSound("./song1.mp3"),
            cover: loadImage("./1.jpg"),
            title: 'Tomorrow Is Another Day - CMA',
        },
        {
            song: loadSound("./song2.mp3"),
            cover: loadImage("./2.jpg"),
            title: 'Dont You Dare - Mapps',
        },
        {
            song: loadSound("./song3.mp3"),
            cover: loadImage("./3.jpg"),
            title: 'If You Only Knew - Jacoo',
        },
    ];
    
}


function setup() {
    createCanvas(500,500);
    imageMode(CENTER)
    angleMode(DEGREES);
    
    //text
    textFont('Ubuntu Condensed');
    noStroke();
    textSize(17);
    
    //songs
    numSong = 0;
    songs[numSong].song.play();
    
    //audio
   
    analyze = new p5.Amplitude();
    
    fft = new p5.FFT();
    peakDetect = new p5.PeakDetect();

}

function draw() { 
    
    background(230);
    image(songs[numSong].cover,width/2,height/2,300,300);
    noStroke();
    fill(40);
    text(songs[numSong].title, 100, 450);
    
   
    //Sound Waves
    
    analyze.setInput(songs[numSong].song); 
    vol = analyze.getLevel();
    volhistory.push(vol);
    
    strokeWeight(1);
    stroke(255);
    noFill();

  push();
    var currentY = map(vol, 0, 1, 20, 0);
    translate(100, -250);
    beginShape();
    for (var i = 0; i < volhistory.length; i++) {
    var y = map(volhistory[i], 0, 2, height, 10);
    vertex(i, y);
    }
    endShape();
  pop();
    
    //Reverse wave
 push();
    rotate(180);
    var currentY = map(vol, 0, 1, 20, 0);
    translate(-400, -750);
    beginShape();
    for (var i = 0; i < volhistory.length; i++) {
    var y = map(volhistory[i], 0, 2, height, 0);
    vertex(i, y);
    }
    endShape();
  pop();
 
    
  if (volhistory.length > width - 199) {
    volhistory.splice(0, 1);
  }
   

 //Peak circles
    
   fft.analyze();
  peakDetect.update(fft);

    
  if ( peakDetect.isDetected ) {
    ellipseWidth = 50;
  } else {
    ellipseWidth = ellipseWidth+10 ;
  }
    
  ellipse(width/2, height/2, ellipseWidth, ellipseWidth);
    
  //Call button function
  createbuttons();
    
}
//end draw



//song changer 
function mouseClicked() {
   
    
    if (mouseX > 330 && mouseX<360 && mouseY>30 && mouseY<70 ) {
        songs[numSong].song.stop();
        numSong = numSong + 1;
        if (numSong >= songs.length) {
            numSong = 0;
        }
        songs[numSong].song.play();
    }
    if (mouseX > 140  && mouseX < 180 && mouseY>30 && mouseY<70) {
        songs[numSong].song.stop();
        numSong = numSong -1;
        if (numSong < 0) {
            numSong = songs.length - 1;
        }
        songs[numSong].song.play();
    }
    
    if (mouseX > 244  && mouseX < 266 && mouseY>30 && mouseY<70) {
       playpause();
    }
}

function createbuttons() {
    noStroke();
    fill(40);
    triangle(340, 40, 340, 60, 350, 50);
    triangle(330, 40, 330, 60, 340, 50);
    
    triangle(170, 40, 170, 60, 160, 50);
    triangle(160, 40, 160, 60, 150, 50);
    
    if(songs[numSong].song.isPlaying()){
        rect(244,38,7,24);
        rect(256,38,7,24);
    }  else {
        triangle(246, 35, 246, 65, 265, 50);
    }
}

function playpause() {
  if (!songs[numSong].song.isPlaying()) {
      songs[numSong].song.play();
  } else {
     songs[numSong].song.pause();
  }
}


