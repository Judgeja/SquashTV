
window.onload = () => {
  replaceSpoilerImagesAndText();
  addPlayerControls();
}

///////
// Text/Image Spoiler Replacement
///////
var timeInputMins, timeInputSecs, videoElement;
function replaceSpoilerImagesAndText(){
  for(var vid of document.querySelectorAll("article .title a, .article-related .repeat-inner h2 a")){
    // // Skip for the video title of the one we're watching.
    // if(vid.parentElement.className.indexOf("page") == -1){ 
      // Set actual title as tooltip
    var originalTitle = vid.textContent;
    vid.textContent = removePlayerNames(vid.textContent);
    vid.title = originalTitle;
  
    if(!!vid.parentElement.href){
      var urlParts = vid.parentElement.href.split("/");
      vid.textContent += "[" + urlParts[urlParts.length - 1] + "] -hover here for info-";
    }
    // }
  
    vid.style.display = "inline-block";
    vid.style.opacity = "1";
  }
  

  // If there's a stupid apparently SLICK-list featured at the top, then remove that piece of crap.
  if(document.querySelectorAll(".featured .slick-list").length > 0){
    var main  = document.getElementsByClassName("site-main")[0];
    var newTopList = document.createElement("div");
    newTopList.className="squashtv-nospoiler-toplist";
    var newTopListExplain = document.createElement("p");
    newTopListExplain.innerHTML = "I hate the featured slider so much that I've replaced it with just the text links minus names.<br/>You can hover on any links to see the original link title for the player names. <br/><br/>If you like the \"SquashTV Spoilers\" extension please leave a good review on the extension page. <br/>(If you had issues, please send feedback to jajudgeja@gmail.com)";
    newTopList.append(newTopListExplain);
    //newTopList.style.height = stupidListHeight;
    main.prepend(newTopList);

    for(var slide of document.querySelectorAll(".featured .slick-list h1.event-heading, .featured .slick-list h1.heading")){
      var originalTitle = slide.textContent;
      var href = slide.getElementsByTagName("a")[0];
      href.textContent = removePlayerNames(slide.textContent);
      slide.title = originalTitle;
      slide.style.display = "block";
      slide.style.opacity = "1";
      newTopList.append(slide);
    }
  }
}
function removePlayerNames(vidTitle){
  var parts = vidTitle.split("–");
  var newName = "";
  for(var i=0; i<parts.length; i++){
    let section = parts[i];
    if(section.indexOf(" v ") < 0 && section.indexOf(" vs ") < 0){
      newName += parts[i];
    }
  }
  return newName;
}

///////
// Video timeline spoiler and time controls
///////
function addPlayerControls(){
  var vidControls = document.querySelectorAll(".vjs-time-control")[0];
  videoElement = document.querySelectorAll(".vjs-tech")[0];

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
        UpdateTime();
      }
      else {
        videoElement.currentTime = timeToSet;
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
    vidControls.insertAdjacentElement("beforebegin", controls)
  }
  else {
    // retry
    setTimeout(() => addPlayerControls(), 5000);
  }
}
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
function UpdateTime(){
  UpdateTimers(Math.floor(videoElement.currentTime));
}