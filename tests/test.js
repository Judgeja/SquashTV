


function testRemovingNames(){
    // Should remove
    assertRemovePlayerNames('Replay – U.S Open 2023 Quarter Final: Amanda Sobhy v Amina Orfi', 'Replay – U.S Open 2023 Quarter Final:')
    assertRemovePlayerNames('Replay – U.S Open 2023 Quarter Final: Nour El Tayeb v Raneem El Weliliy', 'Replay – U.S Open 2023 Quarter Final:')
    assertRemovePlayerNames('Replay – U.S Open 2023 Quarter Final: Amanda Sobhy vs Amina Orfi', 'Replay – U.S Open 2023 Quarter Final:')
    assertRemovePlayerNames('Replay | U.S Open 2023 Quarter Final: Amanda Sobhy v Amina Orfi', 'Replay | U.S Open 2023 Quarter Final:')
    // Shouldn't remove since it's unexpected
    assertRemovePlayerNames('Replay – U.S Open 2023 Quarter Final: Nour El Tayeb - Amina Orfi', 'Replay – U.S Open 2023 Quarter Final:')
    assertRemovePlayerNames('Replay – U.S Open 2023 Quarter Final: Amanda Sobhy | Amina Orfi', 'Replay – U.S Open 2023 Quarter Final:')
  }
  
  function assertRemovePlayerNames(str1, str2){
    var removed = removePlayerNames(str1);
    if(removed != str2){ console.log("ERROR: " + removed + " != " + str2)}
    else { console.log("Parsed as expected: " + str1)}
  }
  
  
  
  function removePlayerNames(vidTitle){
    if(vidTitle.indexOf(" v ") < 0  && vidTitle.indexOf(" vs ") < 0 ){ return vidTitle; }
    var markers = "–-|:_>".split("")
    var namePart = vidTitle;
    var newTitle = "";
    for(var i=0; i< markers.length; i++){
      if(namePart.indexOf(markers[i])){
        var parts = namePart.split(markers[i]);
        if(parts.length == 1){
            continue;
        }
        for(j=0; j<parts.length; j++){
          if(parts[j].indexOf(" v ") >=0 || parts[j].indexOf(" vs ") >=0){
            namePart = parts[j];
          }
          else {
            newTitle += parts[j] + markers[i];
          }
        }
      }
    }

    return newTitle;
  }

  testRemovingNames();