function startTime() {
    var today=new Date();
    var h=checkTime(today.getHours());
    var m=checkTime(today.getMinutes());
    var s=checkTime(today.getSeconds());
    var timeString = s%2===0 ? h + ":" + m + ":" + s : h + ":" + m + " " + s;
    document.getElementById("time").innerHTML = timeString;
    var twentyFour = 10.625;
    var sixty = 4.25;
    var c1 = Math.round(twentyFour*h).toString(16);
    var c2 = Math.round(sixty*m).toString(16);
    var c3 = Math.round(sixty*s).toString(16);
    [c1, c2, c3].forEach(function (c) {
      c = c.length === 2 ? c : "0"+c;
    });
    document.getElementById("center-container").style.backgroundColor = "#" + c1 + c2 + c3;
    var t = setTimeout(function(){ startTime(); },500);
}

function checkTime(i) {
    if (i<10) {i = "0" + i;}  // add zero in front of numbers < 10
    return i;
}

startTime();
