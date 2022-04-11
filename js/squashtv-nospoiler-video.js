var dailymotionPlayerRef;
var currentTime;
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

  // controls.append(createButton("<---", -60*5));
  // controls.append(createButton("<<", -30));
  // controls.append(createButton("<", -5));
  // controls.append(createButton(">", 5));
  // controls.append(createButton(">>", 30));
  // controls.append(createButton("--->", 60*5));
  vidControls.prepend(controls)
}

function hideTimeControls(){
  document.querySelectorAll(".np_Filmstrip-time, .np_TimerContent-duration, .np_Seek ")
  
}

function createButton(text, time){
  let btn = document.createElement('button');
  btn.onclick = () => timeDiff(time);
  btn.textContent = text;
  return btn;
}

function timeDiff(amountSeconds){
  dailymotionPlayerRef.seek(player.currentTime + amountSeconds);
}