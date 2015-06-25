var scNum = 0;
var scNumMax = 1;
// -------------- Buttons
var buttonPrev;
var buttonNext;
// -------------- Chapters
var text6p2;
// -------------- Path
var url = "http://gordeychernyy.github.io/motionComics";
// -------------- Sprites
var mahavitra;
var tree3, tree1, tree2;
var stone, stone2;
var eye;
// -------------- Constant
const CANVAS_H = 866;
const CANVAS_W = 797;
const RANDMAX = 30;
function preload(){

}
function setup() {
  tree1 = new Animation();
  tree1.load(url+'/images/tree/', 3, 1, 5); 
  stone = new Animation();
  stone.load(url+'/images/stone/', 3, 1, 6);
  tree2 = new Animation();
  tree2.load(url+'/images/tree/', 3, 1, 5);   
  tree2Eye = new Animation();
  tree2Eye.load(url+'/images/eye/', 1, 5, 1);  
  tree3 = new Animation();
  tree3.load(url+'/images/tree/', 3, 1, 5); 
  tree3Eye = new Animation();
  tree3Eye.load(url+'/images/eye/', 1, 5, 1);  
  mahavitra = new Animation();
  mahavitra.load(url+'/images/mahavitra/', 3, 1, 6);
  stone2 = new Animation();
  stone2.load(url+'/images/stone/', 3, 1, 6);
  stone2Eye = new Animation();
  stone2Eye.load(url+'/images/eye/', 1, 5, 1);
  stone2.makeDiv();
  tree2.makeDiv();
  tree3.makeDiv();
  text6p2 = createDiv("Согласно религии джайнизм, весь мир состоит из одушевленных существ, страдающих и испытывающих боль!");
  text6p2.hide();

  text6p2.class('bubble');
  

  buttonPrev = createDiv("<<");
  buttonPrev.class('button');
  buttonPrev.size(10, buttonPrev.height);
  buttonPrev.position(0, windowHeight/2);
  buttonPrev.mousePressed(prevScene);

  buttonNext = createDiv(">>");
  buttonNext.class('button');
  buttonNext.size(10, buttonNext.height);
  buttonNext.position(windowWidth-buttonNext.width, windowHeight/2);
  buttonNext.mousePressed(nextScene);

  frameRate(60);
}
function nextScene(){
  if (scNum<scNumMax) {scNum++;}
}
function prevScene() {
  if (scNum>0) {scNum--;}
}
function windowResized(){
  buttonNext.position(windowWidth-buttonNext.width, windowHeight/2);
  buttonPrev.position(0, windowHeight/2);  
}

function draw() {
  switch(scNum){
    case 0:
      sc1();
      break;
    case 1:
      sc2();
      break;
  }
  tree3.update(171, 66, 465, 469, 7);
  tree3.updateDiv(220, 85, 379, 318, 7);
  tree3Eye.update(318, 156, 180, 251, 7);
  tree1.update(50, 258, 152, 152, 50);
  tree2.update(489, 225, 274, 276, 15);
  tree2.updateDiv(522, 228, 225, 266, 15);
  tree2Eye.update(581, 371, 86, 121, 15);
  mahavitra.update(328, 337, 192, 238, 5); 
  stone.update(168, 313, 225, 201, 12); 
  stone2.update(29, 302, 454, 407, 3); 
  stone2.updateDiv(171, 563, 201, 126, 3); 
  stone2Eye.update(189, 564, 180, 251, 3);
  var w = windowWidth;
  var h = windowHeight;
  text6p2.size(200, 100);
  text6p2.position(w/2-text6p2.width/2, windowHeight/1.2-text6p2.height);
}
function sc1(){
  if(frameCount%int(random(RANDMAX))==0) text6p2.show();
  if(frameCount%int(random(RANDMAX))==0) mahavitra.buttonOver = true;
  if(frameCount%int(random(RANDMAX))==0) tree3.buttonOver = true;
  if(frameCount%int(random(RANDMAX))==0) tree1.buttonOver = true;
  if(frameCount%int(random(RANDMAX))==0) tree2.buttonOver = true;
  if(frameCount%int(random(RANDMAX))==0) stone.buttonOver = true;
  if(frameCount%int(random(RANDMAX))==0) stone2.buttonOver = true;
  stone2.divOver ? stone2Eye.buttonOver = true : stone2Eye.buttonOver = false
  tree3.divOver ? tree3Eye.buttonOver = true : tree3Eye.buttonOver = false
  tree2.divOver ? tree2Eye.buttonOver = true : tree2Eye.buttonOver = false
}
function sc2(){
  if(frameCount%int(random(RANDMAX))==0) text6p2.hide();
  if(frameCount%int(random(RANDMAX))==0) mahavitra.buttonOver = false;
  if(frameCount%int(random(RANDMAX))==0) tree3.buttonOver = false;
  if(frameCount%int(random(RANDMAX))==0) tree1.buttonOver = false;
  if(frameCount%int(random(RANDMAX))==0) tree2.buttonOver = false;
  if(frameCount%int(random(RANDMAX))==0) stone.buttonOver = false;
  if(frameCount%int(random(RANDMAX))==0) stone2.buttonOver = false;
}
function mousePressed(){ 
}
var Animation = function(){
  this.start = [];
  this.middle = [];
  this.end = [];
  this.startIndex = 0;
  this.middleIndex = 0;
  this.endIndex = 0;
  this.begining = false;
  this.ending = false;
  this.beginingEnd = false;
  this.endingEnd = true;
  this.loopEnd = false;
  this.buttonOver = false;
  this.div;
  this.divOver = false;
  var _divOver = false;
  this.w = 0;
  this.h = 0;
  
  this.makeDiv = function(){
    this.div = createDiv('');
    this.div.class('animButton');
    this.div.mouseOver(divOverFunc);
    this.div.mouseOut(divOutFunc);
  }
  function divOverFunc(){
    _divOver = true;
    
  } 
  function divOutFunc(){
    _divOver = false; 
  }
  this.updateDiv = function(_x, _y, _w, _h, paralaxAmount){
    if (this.begining && this.endingEnd) {
      this.divOver = _divOver;
      this.div.show();
      var y = this.calcY(_y);
      var x = this.calcX(_x, _y, y, paralaxAmount);
      var h = (_h/CANVAS_H)*windowHeight;
      var w = (_w/_h)*h;
      var paralaxY = mouseY-windowHeight/2;
      y += paralaxY/paralaxAmount;
      this.div.position(x,y);
      this.div.size(w, h);

    }else{
      this.div.hide();
    };
  }
  this.load = function(path, s, m, e){ // load images into arrays
    for (var i = 0; i <= s; i++) { // start
      var img = createImg(path+'s'+i+'.gif');
      img.hide();
      img.class('animation');
      img.position(0,0);
      this.start.push(img);
    };
    for (var i = 0; i <= m; i++) { // middle
      var img = createImg(path+'m'+i+'.gif');
      img.hide();
      img.class('animation');
      img.position(0,0);
      this.middle.push(img);
    };
    for (var i = 0; i <= e; i++) { // end
      var img = createImg(path+'e'+i+'.gif');
      img.hide();
      img.class('animation');
      img.position(0,0);
      this.end.push(img);
    };
  }
  this.reset = function(){
    this.startIndex = 0;
    this.middleIndex = 0;
    this.endIndex = 0;
    this.ending = false;
    this.beginingEnd = false;
    this.endingEnd = true;
    this.loopEnd = false;
    if (!this.buttonOver) {this.begining=false;}
  }
  this.calcY = function(_y){
    var kh = _y/CANVAS_H;
    return _y = kh*windowHeight;
  }
  this.calcX = function(_x, _y, y, paralaxAmount){
    var x;
    var kw = _x/CANVAS_W;
    var canvasScaledWidth = (windowHeight*CANVAS_W)/CANVAS_H;
    var scaledMouseX = (windowHeight*CANVAS_W)/CANVAS_H;
    var offsetX = (windowWidth - canvasScaledWidth)/2;
    var paralaxX = mouseX+touchX-windowWidth/2;
    return x = paralaxX/paralaxAmount+(_x/_y)*y+offsetX;
  }
  this.update = function(_x, _y, _w, _h, paralaxAmount){
    var y = this.calcY(_y);
    var x = this.calcX(_x, _y, y, paralaxAmount);

    this.h = (_h/CANVAS_H)*windowHeight;
    this.w = (_w/_h)*this.h;
    
    var paralaxY = mouseY+touchY-windowHeight/2;
    y += paralaxY/paralaxAmount;

    for (var i = 0; i < this.start.length; i++) {
      // this.start[i].size(w, h);
      this.start[i].position(x, y);
    };
    for (var i = 0; i < this.middle.length; i++) {
      // this.middle[i].size(w, h);
      this.middle[i].position(x, y);
    };
    for (var i = 0; i < this.end.length; i++) {
      // this.end[i].size(w, h);
      this.end[i].position(x, y);
    };
    if (frameCount%4==0) {
      // this.start[this.startIndex].size(w, h);
      this.play();
    };
    
  }
  this.play = function(){
    this.buttonCheck();
    // print('_______________________________ ');
    // print('.buttonOver '+this.buttonOver);
    // print('.begining '+this.begining);
    // print('.ending '+this.ending);
    // print('.beginingEnd '+this.beginingEnd);
    // print('.endingEnd '+this.endingEnd);
    // print('.loopEnd '+this.loopEnd );
    if (this.begining && this.endingEnd){
      if(!this.isEnd(this.start, this.startIndex)){
        this.playStart(this.startIndex);
      } else {
        if(this.middleIndex==0) this.start[this.startIndex-1].hide();
        this.playMiddle(this.middleIndex);
        this.checkMiddleEnd();
        this.middleIndex = this.loopIndex(this.middle, this.middleIndex);
      }
      this.startIndex = this.encreaseIndex(this.start, this.startIndex);
    }
    if (this.ending && this.beginingEnd){
      if (!this.isEnd(this.end, this.endIndex)) {
        this.middle[this.middle.length-1].hide();
        this.playEnd(this.endIndex);
      }else{
        this.endingEnd = true;
        this.end[this.end.length-1].hide();
        this.reset();
      }
      this.endIndex = this.encreaseIndex(this.end, this.endIndex);
    } 
  }
  this.checkMiddleEnd = function(){
      if(this.ending && this.loopEnd) {
        this.middle[this.middleIndex].hide();
        this.endingEnd = false;
        this.beginingEnd = true;
      }
  }
  this.buttonCheck = function(){
    if (this.buttonOver) {
      this.begining = true;
    }else{
      if (this.begining) {
        this.ending = true;
      }
    }
  }
  this.playStart = function(index){
    if(index>0){
      this.start[index-1].hide();
      this.start[index].size(this.w, this.h);
      this.start[index].show();
    }else{
      this.start[index].size(this.w, this.h);
      this.start[index].show();
      // start.end[start.end.length-1].hide(); // for looped
    }
  }
  this.playMiddle = function(index){
    if(index>0){
      this.middle[index-1].hide();
      this.middle[index].size(this.w, this.h);      
      this.middle[index].show();
    }else{
      this.middle[index].size(this.w, this.h);      
      this.middle[index].show();
      this.middle[this.middle.length-1].hide(); // for looped
    }
  }
  this.playEnd = function(index){
    if(index>0){
      this.end[index-1].hide();
      this.end[index].size(this.w, this.h);  
      this.end[index].show();
    }else{
      this.end[index].size(this.w, this.h);  
      this.end[index].show();
    }
  }
  this.loopIndex = function(frames, index){
    if(index < frames.length) index++;
    if(index==frames.length){
      index = 0;
      this.loopEnd = true;
    }
    return index;
  }
  this.encreaseIndex = function(frames, index){
    if(index < frames.length) index++;
    return index;
  }
  this.isEnd = function(frames, index){
    if (index==frames.length){
      return true;
    } else {
      return false;
    }
  }
}
