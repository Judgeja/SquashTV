var dailymotionPlayerRef;
var currentTime;

function addPlayerControls(){
  if(typeof player !== 'undefined' && !!player) { 
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
  else {
    // retry
    setTimeout(() => addPlayerControls(), 5000);
  }
}

addPlayerControls();