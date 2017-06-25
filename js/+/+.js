var elem, two, gen, height, width, params, gene, rects, topOffset, pivot;
var steps, base, str, type;

function generate(){
  gen.setBase(base);
  gen.setSteps(steps);
  gen.setStrength(str);
  gen.setPivot(pivot);
  [
    gen.linear,
    gen.linearR,
    gen.distill,
    gen.distillR,
    gen.shade,
    gen.shadeR
  ][type]();
}

function runMe() {
  height = document.body.scrollHeight-topOffset;
  width = document.body.scrollWidth*2;
  document.getElementById("interactions-container").style.top = window.innerHeight/2 - (document.getElementById("interactions-container").offsetHeight/2) + topOffset/2 + "px";

  two.appendTo(elem);
  two.clear();
  generate();
  gene = gen.getGenerated();
  var colorArr = ["00", "00", "00"];
  colorArr[pivot] = "ff";

  document.getElementById("more").style.color = "#"+colorArr.join();
  document.getElementById("less").style.color = "#"+colorArr.join();

  rects = gene.map(function (g, i) {
    var temp = two.makeRectangle(0, (height / steps * (i+.5))+topOffset, width, height/steps);
    temp.fill = "#" + g;
    temp.opacity = 1;
    temp.stroke = "#" + g;
    temp.lineWidth = 1;
    return temp;
  });
  two.update();
}

function morePerc(){
  str += 5;
  if (str>100){
    str = 100;
  }
  runMe();
}

function lessPerc(){
  str -= 5;
  if (str<0){
    str = 0;
  }
  runMe();
}

function moreC(){
  if (steps<window.innerHeight/35){
    steps++;
  }
  runMe();
}

function lessC(){
  if (steps>2){
    steps--;
  }
  runMe();
}

function getV(){
  var value = base[pivot];
  return value;
}

function setV(value){
  var v1 = base[0].toString(16);
  var v2 = base[1].toString(16);
  var v3 = base[2].toString(16);
  value = value.toString(16);
  while (value.length !== 2){
    value =  "0"+value;
  }
  while (v1.length !== 2){
    v1 = "0"+v1;
  }
  while (v2.length !== 2){
    v2 = "0"+v2;
  }
  while (v3.length !== 2){
    v3 = "0"+v3;
  }
  if (pivot === 0){
    return ""+value+v2+v3;
  }
  if (pivot === 1){
    return ""+v1+value+v3;
  }
  if (pivot ===2){
    return ""+v1+v2+value;
  }
}

function moreV(){
  var value = getV();
  value += 5;
  if (value > 255){
    value = 255;
  }
  base = setV(value);
  runMe();
}

function lessV(){
  var value = getV();
  value -= 5;
  if (value < 0){
    value=0;
  }
  base = setV(value);
  runMe();
}

function checkTime(i) {
  if (i<10) {i = "0" + i;}  // add zero in front of numbers < 10
  return i;
}

function initialize(){
  var today=new Date();
  var h=checkTime(today.getHours());
  var m=checkTime(today.getMinutes());
  var s=checkTime(today.getSeconds());
  var twentyFour = 10.625;
  var sixty = 4.25;
  var c1 = Math.round(twentyFour*h).toString(16);
  var c2 = Math.round(sixty*m).toString(16);
  var c3 = Math.round(sixty*s).toString(16);
  while (c1.length!==2){
    c1 = "0"+c1;
  }
  while (c2.length!==2){
    c2 = "0"+c2;
  }
  while (c3.length!==2){
    c3 = "0"+c3;
  }
  gen = new LWGenPallete();
  base = c1 + c2 + c3;
  steps = 5;
  str = 70;
  type = 0;

  gen.setBaseS(base);
  pivot = gen.getPivot();
  gen.setSteps(steps);
  gen.setStrength(str);
}

function R(){
  pivot = 0;
  runMe();
}

function G(){
  pivot = 1;
  runMe();
}

function B(){
  pivot = 2;
  runMe();
}

[
  { id: "R", f: R },
  { id: "G", f: G },
  { id: "B", f: B },
  { id: "more", f: moreV },
  { id: "less", f: lessV },
  { id: "morePerc", f: morePerc },
  { id: "lessPerc", f: lessPerc },
  { id: "moreNumber", f: moreC },
  { id: "lessNumber", f: lessC }
].forEach(function ({id, f}){ $("#" + id).click(f); });

topOffset = document.getElementById("links").offsetHeight;
initialize();
elem = document.getElementById("background-box");
params = {
  fullscreen: true
};
two = new Two(params).appendTo(elem);
runMe();
if (window.attachEvent) {
  window.attachEvent("onresize", function() {
    runMe(top);
  });
}
else if (window.addEventListener) {
  window.addEventListener("resize", function() {
    runMe(top);
  }, true);
}
