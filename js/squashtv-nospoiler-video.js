var dailymotionPlayerRef;
var currentTime;

if(typeof variable !== 'undefined' && !!player) { 
  player.then(p => {
    dailymotionPlayerRef = p;
  });

  var vidControls = document.querySelectorAll(".videoplayer .container")[0];

  if(!!vidControls){
    var controls = document.createElement("div");
    controls.className="squashtv-nospoiler-controls";

    let timeInput = document.createElement('input');
    timeInput.textContent = "0";

    let btn = document.createElement('button');
    btn.onclick = () => {
      if(isNaN(timeInput.value)){
        timeInput.value = "0";
      }
      else {
        dailymotionPlayerRef.seek(timeInput.value);
      }
    }
    btn.textContent = "Set time in seconds";
    controls.append(btn);
    controls.append(timeInput);
    vidControls.prepend(controls)
  }
}
