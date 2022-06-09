var dailymotionPlayerRef;
var currentTime;
var timeInputMins, timeInputSecs;

function addPlayerControls(){
  if(typeof player !== 'undefined' && !!player) { 
    player.then(p => {
      dailymotionPlayerRef = p;
    });
  
    var vidControls = document.querySelectorAll(".videoplayer .container")[0];
  
    if(!!vidControls){
      var controls = document.createElement("div");
      controls.className="squashtv-nospoiler-controls";
  
      timeInputMins = document.createElement('input');
      timeInputMins.value = "0";

      timeInputSecs = document.createElement('input');
      timeInputSecs.value = "0";
      timeInputSecs.style.marginLeft = "5px";
  
      let btnSetTime = document.createElement('button');
      btnSetTime.onclick = () => {
        let timeToSet = GetInputTimeInSeconds();
        if(isNaN(timeToSet)){
          UpdateTimers(0);
        }
        else {
          dailymotionPlayerRef.seek(timeToSet);
        }
      }
      btnSetTime.textContent = "Set time";

      let btnUpdateTime = document.createElement('button');
      btnUpdateTime.onclick = () => {
        UpdateTime();
      }
      btnUpdateTime.textContent = "<- Sync";
      btnUpdateTime.style = "background: none;color: white;text-decoration: underline;font-size: 14px; margin-left: .5em;";

      controls.append(btnSetTime);
      controls.append(timeInputMins);
      controls.append(AddSpan("m"));
      controls.append(timeInputSecs);
      controls.append(AddSpan("s"));
      controls.append(btnUpdateTime);
      vidControls.prepend(controls)
    }
  }
  else {
    // retry
    setTimeout(() => addPlayerControls(), 5000);
  }
}

addPlayerControls();

function GetInputTimeInSeconds(){
  let timeSecs = parseInt(timeInputSecs.value);
  if(!isNaN(timeSecs) && timeSecs > 59){
    timeSecs = 59;
    timeInputSecs.value = timeSecs;
  }
  return parseInt(timeInputMins.value) * 60 + timeSecs;
}
function UpdateTimers(time){
  timeInputSecs.value = time % 60;
  timeInputMins.value = Math.floor(time/60);
}
function AddSpan(text){
  let element = document.createElement('span');
  element.textContent = text;
  return element;
}

function UpdateTime(text){
  dailymotionPlayerRef.getState().then(state=>{
    UpdateTimers(Math.floor(state.videoTime));
  })
}