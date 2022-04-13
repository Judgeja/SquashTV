for(var vid of document.querySelectorAll(".videoplayer__title, .item__title")){
  // Skip for the video title of the one we're watching.
  if(vid.parentElement.className.indexOf("page") == -1){ 
    // Set actual title as tooltip
    var originalTitle = vid.textContent;
    vid.textContent = removePlayerNames(vid.textContent);
    vid.title = originalTitle;

    if(!!vid.parentElement.href){
      var urlParts = vid.parentElement.href.split("/");
      vid.textContent += "[" + urlParts[urlParts.length - 1] + "] -hover here for info-";
    }
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