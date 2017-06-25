var generatedColors = [];

var base0 = [255,255,255];
var base1 = [255,255,255];

var steps = 2;
var strength = 100;

function LWGenBridge() {
}

function toInt(hex) {
  return parseInt(hex, 16);
}

function toHex(decimal, minLength) {
  var out = decimal.toString(16);
  while (out.length<minLength){
    out = "0" + out;
  }
  return out;
}

function colorToInts(hex) {
  var out = [];
  for (var i = 0; i < 3; i++){
    out.push(toInt(hex.substring(2*i, 2*(i+1))));
  }
  return out;
}

function intsToColor(color) {
  var out = "";
  color.forEach(function (c) {
    out += toHex(c,2);
  });
  return out;
}

LWGenBridge.prototype.setBasesBridge = function(hex) {
  if (hex.length!==2){
    return false;
  }
  var valid = hex.filter(function (h) {
    return h.length === 6;
  }).length === 2;

  if (valid){
    base0 = colorToInts(hex[0]);
    base1 = colorToInts(hex[1]);
    return valid;
  }

  return valid;
};
LWGenBridge.prototype.setStepsBridge = function(s) {
  if (s>=2 && s<256){
    steps = s;
    return true;
  }
  return false;
};
LWGenBridge.prototype.setStrengthBridge = function(s) {
  if (s <= 100 && s >= 0){
    strength = s;
    return true;
  }
  return false;
};
LWGenBridge.prototype.getGeneratedBridge = function() {
  return generatedColors;
};
LWGenBridge.prototype.getBasesBridge = function() {
  return [intsToColor(base0),intsToColor(base1)];
};
LWGenBridge.prototype.getStepsBridge = function() {
  return steps;
};
LWGenBridge.prototype.getStrengthBridge = function() {
  return strength;
};

LWGenBridge.prototype.clearBridge = function() {
  generatedColors = [];
  base0 = [255,255,255];
  base1 = [255,255,255];
  steps = 2;
  strength = 100;
};

function intervalsBridge(input, min) {
  var out = [];
  var delta = input-min;
  for (var i = 0; i < steps; i++) {
    out.push(input - ((delta*strength/100.0)/(steps-1))*i);
  }
  return out;
}

LWGenBridge.prototype.bridge = function(input) {
  generatedColors = [];

  var clrs0 = intervalsBridge(base0[0],base1[0]); //r interval between one base and the other
  var clrs1 = intervalsBridge(base0[1],base1[1]); //g ""
  var	clrs2 = intervalsBridge(base0[2],base1[2]); //b ""

  for (var i = 0; i < steps; i++){
    generatedColors.push(intsToColor(clrs0[i],clrs1[i],clrs2[i]));
  }
  return toString();
};
