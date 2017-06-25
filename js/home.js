function startTime() {
    var today=new Date();
    var h=checkTime(today.getHours());
    var m=checkTime(today.getMinutes());
    var s=checkTime(today.getSeconds());
    var timeString = s%2===0 ? h + ":" + m + ":" + s : h + ":" + m + " " + s;
    document.getElementById("time").innerHTML = timeString;
    var twentyFour = 10.625;
    var sixty = 4.25;
    var backgroundColor = "#";
    [
      Math.round(twentyFour*h).toString(16),
      Math.round(sixty*m).toString(16),
      Math.round(sixty*s).toString(16)
    ].forEach(function (c) {
      backgroundColor += c.length === 2 ? c : "0" + c;
    });
    document.getElementById("center-container").style.backgroundColor = backgroundColor;
    var t = setTimeout(function(){ startTime(); },500);
}

function checkTime(i) {
    if (i<10) {i = "0" + i;}  // add zero in front of numbers < 10
    return i;
}

startTime();
