// Global Variables ==========================================
var place = null; //used to index through room arrays. (roomCenter,roomRight)
var arrayPlace = null; //used to index through array of rooms. (roomArray)
var roomCenter = [];
var roomRight = [];
var roomLeft = [];
var roomArray = [];
var enteredText = "";
// var Character = null;
var directions = null;
function Character(health, sanity, items){
 this.health= health;
 this.sanity = sanity;
 this.items= items;
};
Character.prototype.addSanity = function(amount){
  return this.sanity += amount;
  characterRefresh();
};
Character.prototype.loseSanity = function(amount){
  this.sanity -= amount;
  if(this.sanity <= 0){
    //Modal to display Game over
    $('#insaneModal').modal();
    // location.reload();
  } else if (this.sanity > 0){
      return this.sanity;
      characterRefresh(Character);
  }
};
Character.prototype.addHealth = function(amount){
  return this.health += amount;
  characterRefresh();
};
Character.prototype.loseHealth = function(amount){
  this.health -= amount;
  if(this.health <= 0){
    //Modal to display Game over
    $('#loseModal').modal();
    // location.reload();
  } else if (this.health > 0){
      return this.health;
      characterRefresh(Character);
  }
};
Character.prototype.smokeCig = function(){
  this.health -= 10;
  this.sanity += 1;
  characterRefresh(Character);
  if(this.health <= 0){
    //Modal to display Game over
    $('#loseModal').modal();
    // location.reload();
  } else if (this.health > 0){
      return this.health;
      characterRefresh(Character);
  }

}
Character.prototype.checkInventory = function(passItem){
  for(i = 0; i < this.items.length; i += 1){
    if(this.items[i] == passItem){
    return false;
    }
  }
}
var Character = new Character(100,10,['Gold Lighter']);
// user interface logic ========================================
// Setup the rooms array and starting location and stats========================
$(document).ready(function(){
  var roomCenter = [introduction, path, entrance, foyer, hallway1, hallway2, null, null, catacomb1, catacomb2, catacomb3, null, null, water1];// y-axis array================
  var roomRight = [null,null, terrace, null, null, libraryDoor, library, cryptEntrance, mausoleum, tunnel, tunnel2];// x-axis array ===========================
  var roomLeft = [null,null,null,null,null,labratory, office, null, null, shore4, shore1, shore2, shore3];
  var roomArray = [roomLeft,roomCenter,roomRight];//array for both y- and x-axis==============================
  var place = 0;
  var arrayPlace = 1;
  $('#room-display').append(roomArray[arrayPlace][place].description);
  $('#room-display').hide();
  $('#room-display').fadeIn(500);

  $('#room-picture').append(roomArray[arrayPlace][place].image);
  $('#room-picture').hide();
  $('#room-picture').fadeIn(500);
  displayCoords(arrayPlace, place);

  // movement and setting=====================================================
  $('.directions').click(function() {
    var direction = $(this).attr('value');
    //updates the coords with the appropriate values from roomchange and arraychange functions============
    if (direction == 'up' || direction == 'down'){
    place += parseInt(roomChanger(direction));
  } else if (direction == 'right' || direction == 'left') {
    arrayPlace += parseInt(arrayChanger(direction));
  };
    $('#room-display').empty();
    $('#room-display').append(roomArray[arrayPlace][place].description);
    $('#room-display').hide();

    $('#room-display').fadeIn(500);
    $('#room-picture').empty();
    $('#room-picture').append(roomArray[arrayPlace][place].image);
    $('#room-picture').hide();
    $('#room-picture').fadeIn(500);
    console.log(place, arrayPlace);// logs current coords==========================
    displayCoords(arrayPlace, place, roomArray[arrayPlace][place].title);
//calls the room action function and refreshes stats=================================
    $('#contextual').hide();
    roomArray[arrayPlace][place].action(Character);
    characterRefresh(Character);
    $('.directions').hide();
    console.log(roomArray[arrayPlace][place].directions);//log to track our coords in console.===================
    directionCheck(roomArray[arrayPlace][place].directions);
    displayCoords(arrayPlace, place, roomArray[arrayPlace][place].title);
});
//Contextual button function. pressing the contextual button calls the rooms 'after' function======================================================
  $('#contextual').click(function(){
    $('#contextual').hide();
    roomArray[arrayPlace][place].after(Character);
    directionCheck(roomArray[arrayPlace][place].directions);
    $('#room-picture').empty();
    $('#room-picture').append(roomArray[arrayPlace][place].image2);
  });

  $("#leftContextual").click(function(){
    $('#contextual').hide();
    roomArray[arrayPlace][place].leftCont(Character);
    directionCheck(roomArray[arrayPlace][place].directions);
    $('#room-picture').empty();
    $('#room-picture').append(roomArray[arrayPlace][place].image2);
  });


  $("#rightContextual").click(function(){
    $('#contextual').hide();
    roomArray[arrayPlace][place].rightCont(Character);
    directionCheck(roomArray[arrayPlace][place].directions);
    $('#room-picture').empty();
    $('#room-picture').append(roomArray[arrayPlace][place].image2);
  });

  $("#middleContextual").click(function(){
    $('#contextual').hide();
    roomArray[arrayPlace][place].middleCont(Character);
    directionCheck(roomArray[arrayPlace][place].directions);
    $('#room-picture').empty();
    $('#room-picture').append(roomArray[arrayPlace][place].image2);
  });

  //Text Enter
  $("button#textSubmit").click(function(event){
    event.preventDefault();
    keyArray = [];
    var enteredText = $("#textInput").val();
    $("#textInput").val('');
    var keyArray = roomArray[arrayPlace][place].keywords;
    var checkedText = compareText(keyArray, enteredText);
    if (checkedText === true){
      roomArray[arrayPlace][place].results(Character);
      directionCheck(roomArray[arrayPlace][place].directions);
    }
    characterRefresh();
  });

  $("button#smokeACig").click(function(event){
    event.preventDefault();
    Character.smokeCig();
    characterRefresh(Character);
  });
});
// Business logic=======================================
// protoypes for updating character stats. Call the proto in the room object functions.

// checks object.directions for available directions and displays related buttons======================
function directionCheck(directions){
  for (i = 0; i < directions.length; i++){
  if (directions[i] == 'up'){
    $('#up').show();
  }else if (directions[i] == 'down'){
    $('#down').show();
  }else if (directions[i] == 'left'){
    $('#left').show();
  }else if (directions[i] == 'right'){
    $('#right').show();
  }
}
}
function compareText(passedKeyArray, passedEnteredText){
  for(i = 0; i < passedKeyArray.length; i += 1){
    if(passedKeyArray[i] === passedEnteredText){
      return true;
      break;
    }
  }
}
//updates character sheet info====================================
function characterRefresh(Character){
  $('#healthdisplay').text(Character.health);
  $('#sanitydisplay').text(Character.sanity);
  $("#itemdisplay").empty();
  for(var i = 0; i <= Character.items.length; i += 1){
    if(Character.items[i] !== undefined){
      $('#itemdisplay').append(Character.items[i] + "<br>");
    }
  }
}
//updates the y-axis information when 'up' or 'down' is pressed=======================
function roomChanger(direction){
  if (direction == 'up'){
    place = 1;
  } else if (direction == 'down'){
    place = -1;
  }
  return place;
}
//updates the x-axis information when 'left' or 'right' is pressed=======================
function arrayChanger(direction){
  if (direction == 'right'){
    arrayPlace = 1;
  } else if (direction == 'left'){
    arrayPlace = -1;
  }
  return arrayPlace;
}
function displayCoords(x,y,title){
  $('#x-coord').text(x);
  $('#y-coord').text(y);
  $('#roomName').text(title)
}
