for(var vid of document.querySelectorAll(".videoplayer__title, .item__title")){
  vid.textContent = removePlayerNames(vid.textContent);
  if(!!vid.parentElement.href){
    var urlParts = vid.parentElement.href.split("/");
    vid.textContent += "[" + urlParts[urlParts.length - 1] + "]";
  }

  vid.style.display = "inline-block";
  vid.style.opacity = "1";
}

var s = document.createElement('script');
s.src = chrome.runtime.getURL('/js/squashtv-nospoiler-video.js');
s.onload = function() {
    this.remove();
};
(document.head || document.documentElement).appendChild(s);


function removePlayerNames(vidTitle){
  var parts = vidTitle.split("-");
  var newName = "";
  for(var i=0; i<parts.length - 1 ; i++){
    newName += parts[i];
  }
  return newName;
}