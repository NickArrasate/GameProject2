// Global Variables ==========================================
var place = null; //used to index through room arrays. (roomCenter,roomRight)
var arrayPlace = null; //used to index through array of rooms. (roomArray)
var roomCenter = [];
var roomRight = [];
var roomLeft = [];
var roomArray = [];
var enteredText = "";
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
    youCrazy();
  } else if (this.sanity <= 3){
    almost();
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
    youDied();
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
    youDied();
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

// SOUND FILES
var cave = new Audio('sound/cave.mp3');
var pocket = new Audio('sound/pocket.mp3');
var spook = new Audio('sound/spook.mp3');
spook.volume = 0.2;
var footstep = new Audio('sound/footstep.mp3');
footstep.volume = 0.3;
var caveMusic = new Audio('sound/scarycavemusic.mp3');
var menu = new Audio('sound/menu.mp3');
menu.volume = 0.3;
var woods = new Audio('sound/woods.mp3');
woods.volume = 0.3;
var door = new Audio('sound/door.mp3');
door.volume = 0.3;
var wolf = new Audio('sound/wolf.mp3');
wolf.volume = 0.3;
var largeDoor = new Audio('sound/largeDoor.mp3');
largeDoor.volume = 0.3;


var Character = new Character(100,10,['Gold Lighter']);
// user interface logic ========================================
// Setup the rooms array and starting location and stats========================
$(document).ready(function(){
  var roomCenter = [introduction, path, entrance, foyer, hallway1, hallway2, null, null, catacomb1, catacomb2, catacomb3, null, water1, exit];// y-axis array================
  var roomRight = [null,null, terrace, null, null, libraryDoor, library, cryptEntrance, mausoleum, tunnel, tunnel2, null, water2, water3];// x-axis array ===========================
  var roomLeft = [null,null,null,null,null,labratory, office, null, null, shore4, shore1, shore2, shore3];
  var roomArray = [roomLeft,roomCenter,roomRight];//array for both y- and x-axis==============================
  var place = 0;
  var arrayPlace = 1;
  updatePlace(roomArray[arrayPlace][place].description,roomArray[arrayPlace][place].image);
  displayCoords(arrayPlace, place);

  // movement and setting=====================================================
  $('.directions').click(function() {
    var direction = $(this).attr('value');
    //updates the coords with the appropriate values from roomchange and arraychange functions on directional click============
    if (direction == 'up' || direction == 'down'){
      place += parseInt(roomChanger(direction));
    } else if (direction == 'right' || direction == 'left') {
      arrayPlace += parseInt(arrayChanger(direction));
    };
    updatePlace(roomArray[arrayPlace][place].description,roomArray[arrayPlace][place].image);
    $('#contextual').hide();
    console.log(place, arrayPlace);// logs current coords and displays them to user==========================
    //calls the room action function and refreshes stats=================================
    roomArray[arrayPlace][place].action(Character);
    characterRefresh(Character);
    $('.directions').hide();
    console.log(roomArray[arrayPlace][place].directions);//log to track available directions in console.===================
    directionCheck(roomArray[arrayPlace][place].directions);//appends available directions to UI
    displayCoords(arrayPlace, place, roomArray[arrayPlace][place].title);//appends current coords to UI
  });
  //Contextual button function. pressing the contextual button calls the rooms 'after' function======================================================
  $('#contextual').click(function(){
    $('#contextual').hide();
    roomArray[arrayPlace][place].after(Character);
    directionCheck(roomArray[arrayPlace][place].directions);
    $('#room-picture').empty();
    $('#room-picture').append(roomArray[arrayPlace][place].image2);
  });
  //triple contextual buttons for the catacomb puzzle===========================================
  $("#leftContextual").click(function(){
    $('#contextual').hide();
    roomArray[arrayPlace][place].leftCont(Character);
    tripleContextClick(roomArray[arrayPlace][place].directions,roomArray[arrayPlace][place].image2)
  });
  $("#rightContextual").click(function(){
    $('#contextual').hide();
    roomArray[arrayPlace][place].rightCont(Character);
    tripleContextClick(roomArray[arrayPlace][place].directions,roomArray[arrayPlace][place].image2)
  });
  $("#middleContextual").click(function(){
    $('#contextual').hide();
    roomArray[arrayPlace][place].middleCont(Character);
    tripleContextClick(roomArray[arrayPlace][place].directions,roomArray[arrayPlace][place].image2)
  });
  //Listener for the search bar=================================================
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

  $("#smokeACig").click(function(event){
    event.preventDefault();
    Character.smokeCig();
    characterRefresh(Character);
  });
  $('#continue').click(function(event){
    location.reload();
  });
});
// Business logic=======================================
function tripleContextClick (directions, image){
  directionCheck(directions);
  $('#room-picture').empty();
  $('#room-picture').append(image);
}
function updatePlace(description, image){
  $('#room-display').empty();
  $('#room-display').append(description);
  $('#room-display').hide();
  $('#room-display').fadeIn(500);
  $('#room-picture').empty();
  $('#room-picture').append(image);
  $('#room-picture').hide();
  $('#room-picture').fadeIn(500);
}

// checks object.directions for available directions and displays related buttons======================
function youDied(){
  $('#loseModal').modal();
  $('.arrow').empty();
  $("#smokeACig").hide();
  $('#room-display').empty();
  $('#continue').show();
}
function almost(){
  $('#almostModal').modal();
}
function youCrazy(){
  $('#insaneModal').modal();
  $('.arrow').empty();
  $("#smokeACig").hide();
  $('#room-display').empty();
  $('#continue').show();
}
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
