
for(var vid of document.getElementsByClassName("videoplayer__title")){

  vid.textContent = removePlayerNames(vid.textContent);
  var urlParts = vid.parentElement.href.split("/");
  vid.textContent += "[" + urlParts[urlParts.length - 1] + "]";
  vid.style.display = "inline-block";
}


function removePlayerNames(vidTitle){
  var parts = vidTitle.split("-");
  var newName = "";
  for(var i=0; i<parts.length - 1 ; i++){
    newName += parts[i];
  }
  return newName;
}