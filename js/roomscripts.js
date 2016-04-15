var end = {
  title: "The End",
  description: '<div class="room" id="exit">' +
  '<p>' + 'You awake to find yourself tied to a table... cloaked figures surround you.  "Welcome harbinger" one of the them breathes.  "We have been waiting for you."' + '</p>' +
  '</div>',
  action:function(){
    $(".buttontext").empty();
    $('#contextual').show();
    $('#contextual span.buttontext').append('To Be Continued');
  },
  after:function(){
    location.reload();
  },
  image: '<img src="img/sacrifice.jpg" class="img-styles">',
}

var death = {
  title: "-",
  description: '<div class="room" id="exit">' +
  '<p>' + 'You are nearing the light... you sense your goal is moments away.' + '</p>' +
  '</div>',
  action:function(){
    $(".buttontext").empty();
    $('#contextual').show();
    $('#contextual span.buttontext').append('Continue');
  },
  after:function(){
    $("#room-display").empty();
    $("#room-display").append("<div class='room' id='deathroom'>" + "<p>" + "Suddenly, you feel the gnarled hands of the figure around your throat.  He is impossibly strong.  'You said you would help me', you rasp.  'But I am' he whispers back.  As you feel consciousness slipping away from you, you are pushed from the boat into the black water.  You feel it envelope you as you sink deeper and deeper..." + "</p>" + "</div>");
    death.directions.push('up');
  },
  directions: [''],
  image: '<img src="img/light.jpg" class="img-styles">',
  image2: '<img src="img/underwater.jpg" class="img-styles">'
}


var water3 = {

  title: "Water",
  keywords: ['nothing'],
  description: "<div class='room' id='water2'>" + '<p>' + 'You continue rowing into the blackness, and the figure poses his last riddle: "What do the poor possess, the rich lack, and if eaten will kill you?" ' + '</p></div>',
  action: function(){},
  results: function(){
    $("#room-display").empty();
    $("#room-display").append("<div class='room' id='water3'><p>'How clever...' he cackles.</p></div>");
    water3.directions.push("up");
    Character.addSanity(1);
  },
  directions: [],
  image: '<img src="img/water3.png" class="img-styles">',
}

var water2 = {
  title: "Water",
  keywords: ['breath', 'his breath'],
  description: "<div class='room' id='water2'><p>You continue rowing into the blackness, and the figure poses his next riddle: 'What is light as a feather, but even the world's strongest man could not hold it for more than one minute?'</p></div>",
  action: function(){},
  results: function(){
    $("#room-display").empty();
    $("#room-display").append("<div class='room' id='water2'><p>'Very wise...' he cackles, and continues rowing.</p></div>");
    water2.directions.push("up");
    Character.addSanity(1);
  },
  directions: ['left'],
  image: '<img src="img/water2.jpg" class="img-styles">',
}
var water1 = {
  title: 'Water',
  keywords: ["pawn", "pawns"],
  description: '<div class="room" id="waterBoat1">' +
  '<p>' + 'As the skiff departs from the shore, you notice the shrouded figure accompanying you begins to display a strange attitude. Almost as if he had this entire encounter planned all along. He poses his first riddle: "The eight of us go forth not back to protect our king from a foes attack. What are we?"' + '</p>' +
  '</div>',
  action: function(){
    Character.loseSanity(1);
    $(".tripleContextual").hide();
  },
  results: function(){
    $("#room-display").empty();
    $("#room-display").append("<div class='room' id='water2'><p>'Ah, surprisngly smart'... he continues rowing.</p></div>");
    water1.directions.push("right");
    Character.addSanity(1);
  },
  directions: [],
  image: '<img src="img/water1.jpg" class="img-styles">',
}
var shore4 = {
  title: "Shore",
  keywords: ["tree","light","marking","markings","symbols","symbol","cuts","cut", "wood", "bark"],
  description: '<div class="room" id="shoreline4">' +
  '<p>' + 'As you walk along the shoreline you see a small beam of light. It seems to be coming from a small opening in the cave ceiling far above. The beam of light shines on a large desolate tree covered in abnormal and unmentionable scrawlings... the work of a madman. There are deep cuts in the tree as if something hacked at it. The occult symbols glow before your eyes and the darkness seems ever more consuming. A cliffside blocks you from continuing on in this direction...' + '</p>' +
  '</div>',
  action: function(){
    Character.loseSanity(2);
  },
  results: function(){
    var strangeChipsCheck = Character.checkInventory(" Strange Bark");
    if (strangeChipsCheck !== false){
      var verifyWood = Character.checkInventory(" Strange Bark");
      if(verifyWood !== false){
        $("#myModal .textBody").empty();
        $("#myModal .textBody").append("<p class='modalText'>You tear some bark from the strange tree.</p>");
        $('#myModal .modalItem').empty();
        $('#myModal .modalItem').append('<img id="wood" src="modalimg/wood.png" alt="parchment key" />');
        $("#myModal").modal();
        Character.items.push(' Strange Bark');
        $('#room-display').empty();
        $('#room-display').append(
          '<div class="room">' +
          '<p>' + 'As you investigate the tree further you notice disturbed earth covered in glowings woodchips. Whoever or whatever... made these markings was chopping was gathering woodchips from the tree. You pick up some a handful of woodchips and put them in your pocket.' + '</p>' +
          '</div>');
      characterRefresh(Character);
    }
  }
},
  directions: ["up"],
  image: '<img src="img/shore4.jpg" class="img-styles">',
}
var shore2 = {
  title: 'Shore',
  keywords: ["journal", "book", "rock"],
  description: '<div class="room" id="shore2"><p>You continue along the shore.  Walking further into the blackness...You notice a small black journal resting on a rock nearby.</p><div>',
  action: function(){
  },
  after: null,
  results: function(){
    $(".modal-page1").empty();
    $(".modal-page1").append("<p>Journal 3, 8, 1260<br>The ritual was successful. Our lord has arisen! He has asked that I bring the others to complete our transformation, though they might resist his embrace at first they will come to love him as I do. We are all saved! WE ARE ALL SAVED! -- Augustus.</p>");
    $("#myJournal").modal();
    },
  directions: ['up','down'],
  image: '<img src="img/shore2.jpg" class="img-styles">',
}
var shore1 ={
  title: 'Shore',
  keywords: [],
  description: '<div class="room" id="shore1"><p>The floor opens up beneath you and you fall into the blackness.  Your fall is stopped when you land on the sandy shore of a vast underground lake.  You cannot see the other side.</p><div>',
  action:function(){},
  directions: ['up','down'],
  image: '<img src="img/shore1.png" class="img-styles">',
}
var shore3 = {
  title: 'Shore',
  keywords: ['boat', 'hull', 'the boat'],
  description: '<div class="room" id="shore">' +
  '<p>' + 'As you walk up the shoreline, the inky water continues to lap gently onto the sand. There is a small row boat in the sand. ' + '</p>' +
  '</div>',
  action: function(){
    var keyCheck = Character.checkInventory(" Strange Bark");
    $('.buttontext').empty();
    if (keyCheck == false) {
      $('#contextual').show();
      $('#contextual span.buttontext').append('Use the' + '<span class ="item">' + ' Strange Bark' + '</span>.');
    } else {
      $('#contextual').hide();
    };
  },
  after: function(){
    $('#room-display').empty();
    $('#room-display').append("<div class='room' id='shore3'>" + "<p>You begin work on the boat. After some time you are able to patch the hole with the" + '<span class ="item">' + ' Strange Bark' + '</span>. Suddenly a shrouded figure approaches you from behind.  He thanks you for fixing the boat and offers to transport you... if you can answer 3 riddles.  Seeing no other choice, you accept and depart.' + '</p></div>');
    shore3.directions.push('right');
  },
  results: function(){
    $('#room-display').empty();
    $('#room-display').append(
      '<div class="room">' +
      '<p>' + 'The boards at the bottom of the boat are broken out in some places. You doubt it would float in this condition.' + '</p>' +
      '</div>');
  },
  directions: ['down'],
  image: '<img src="img/boat.jpg" class="img-styles">',
  image2: '<img src="img/cloak.jpeg" class="img-styles">',
}
var tunnel2 = {
  title: 'Tunnel',
  keywords: ["note", "journal"],
  description: '<div class="room" id="tunnel2">' +
  '<p>' + 'The door slams shut behind you and will not open. The air is noticably stale here. you notice a small note lying on the ground... Your only option is to proceed through the cavernous halls.' + '</p>' +
  '</div>',
  action: function(){
    Character.loseSanity(1);
    characterRefresh(Character);
    $(".tripleContextual").hide();
  },
  results: function(){
    $(".modal-page1").empty();
    $(".modal-page1").append("<p>Journal 3, 6, 1260<br>I am eager to meet our lord, but this set of crypts presents itself as quite a maze. different levers seem to open different doors. I am lost in here, but I know my lord will guide the way.   -- Augustus.</p>");
    $("#myJournal").modal();
  },
  directions: ['down'],
  image: '<img src="img/tunnel2.jpg" class="img-styles">',
}
var tunnel = {
  title: 'Tunnel',
  keywords: [],
  description: '<div class="room" id="cistern">' +
  '<p>' + 'The door slams shut behind you and will not open.  You find yourself in a cavernous tunnel. You can only follow the tunnel and see where it leads.' + '</p>' +
  '</div>',
  action: function(){
    Character.loseSanity(1);
    characterRefresh(Character);
    $(".tripleContextual").hide();
  },
  results: function(){},
  directions: ['down'],
  image: '<img src="img/tunnel.jpg" class="img-styles">',
}
var catacomb3 = {
  title: 'Catacomb',
  keywords: [],
  description: '<div class="room" id="catacomb3">' +
  '<p>' + 'The door slams shut behind you and will not open.  You find yourself in yet another catacomb.  Another stone column stands in the middle, with three more levers facing you.' + '</p>' +
  '</div>',
  action: function(){
    catacomb3.directions = [];
    Character.loseSanity(1);
    characterRefresh(Character);
    $("#tripleContextual").fadeIn();
  },
  results: function(){},
  leftCont: function(){
    $("#tripleContextual").hide();
    catacomb3.directions.push("left");
    $('#room-display').empty();
    $('#room-display').append("<div class='room' id='catacomb1'>" + "<p>A door opens to your left...</p></div>");
  },
  middleCont: function(){
    $("#tripleContextual").hide();
    catacomb3.directions.push("right");
    $('#room-display').empty();
    $('#room-display').append("<div class='room' id='catacomb1'>" + "<p>A door to the right has appeared.</p></div>");
  },
  rightCont: function(){
    $("#tripleContextual").hide();
    catacomb3.directions.push("right");
    $('#room-display').empty();
    $('#room-display').append("<div class='room' id='catacomb1'>" + "<p>A door to the right has appeared.</p></div>");
  },
  directions: [],
  image: '<img src="img/catacomb2.jpg" class="img-styles">',
  image2: '<img src="img/catacomb2.jpg" class="img-styles">',
}
var catacomb2 = {
  title: 'Catacomb',
  keywords: [],
  description: '<div class="room" id="catacomb2">' +
  '<p>' + 'The door slams shut behind you and will not open.  You find yourself in another catacomb.  Another stone column stands in the middle, with three more levers facing you.' + '</p>' +
  '</div>',
  action: function(){
    catacomb2.directions = [];
    Character.loseSanity(1);
    characterRefresh(Character);
    $("#tripleContextual").fadeIn();
  },
  results: function(){},
  leftCont: function(){
    $("#tripleContextual").hide();
    catacomb2.directions.push("right");
    $('#room-display').empty();
    $('#room-display').append("<div class='room' id='catacomb1'>" + "<p>A door to the right has appeared.</p></div>");
  },
  middleCont: function(){
    $("#tripleContextual").hide();
    catacomb2.directions.push("right");
    $('#room-display').empty();
    $('#room-display').append("<div class='room' id='catacomb1'>" + "<p>A door to the right has appeared.</p></div>");
  },
  rightCont: function(){
    $("#tripleContextual").hide();
    catacomb2.directions.push("up");
    $('#room-display').empty();
    $('#room-display').append("<div class='room' id='catacomb1'>" + "<p>A door on the far wall has appeared.</p></div>");
  },
  directions: [],
  image: '<img src="img/cryptEntrance.jpg" class="img-styles">',
  image2: '<img src="img/cryptEntrance.jpg" class="img-styles">',
}
var catacomb1 = {
  title: 'Catacomb',
  keywords: [],
  description: '<div class="room" id="catacomb1">' +
  '<p>' + 'The door slams shut behind you and will not open.  You find yourself in a decrepit catacomb.  Skulls and bones line the walls. A stone column stands in the middle, with three levers facing you.' + '</p>' +
  '</div>',
  action: function(){
    catacomb1.directions = [];
    Character.loseSanity(1);
    characterRefresh(Character);
    $("#tripleContextual").fadeIn();
  },
  results: function(){},
  leftCont: function(){
    $("#tripleContextual").hide();
    catacomb1.directions.push("up");
    $('#room-display').empty();
    $('#room-display').append("<div class='room' id='catacomb1'>" + "<p>A door on the far wall has appeared.</p></div>");
  },
  middleCont: function(){
    $("#tripleContextual").hide();
    catacomb1.directions.push("right");
    $('#room-display').empty();
    $('#room-display').append("<div class='room' id='catacomb1'>" + "<p>The door you entered through has reappeared.</p></div>");
  },
  rightCont: function(){
    $("#tripleContextual").hide();
    catacomb1.directions.push("right");
    $('#room-display').empty();
    $('#room-display').append("<div class='room' id='catacomb1'>" + "<p>The door you entered through has reappeared.</p></div>");
  },
  directions: [],
  image: '<img src="img/catacomb1.jpg" class="img-styles">',
  image2: '<img src="img/catacomb1.jpg" class="img-styles">',
}
var mausoleum = {
  title: 'Mausoleum',
  keywords: [],
  description: '<div class="room" id="mausoleum">' +
  '<p>' + 'As you continue walking, the stench of death grows. You can barely make out still shapes around you, bodies eternally resting. You arrive in a large open space, dimly lit by torches. There seem to be multiple diverging passages branching out from the larger room' + '<p/>' +
  '<div>',
  action: function(){
    $("#tripleContextual").hide();
    Character.loseSanity(1);
    $(".buttontext").empty();
    $('#contextual').show();
    $('#contextual span.buttontext').append('Listen');
  },
  after: function() {
    $('#room-display').empty();
    $('#room-display').append(
      '<div class="room">' +
      '<p>' + 'You hear a faint chanting down the passage to your left.' + '</p>' +
      '</div>');
    },
    directions: ["down", "left"],
    image: '<img src="img/mausoleum.jpg" class="img-styles">',
    image2: '<img src="img/mausoleum.jpg" class="img-styles">',
}
var cryptEntrance = {
  title: 'Crypt Entrance',
  keywords: [],
  description: '<div class="room" id="cryptEntrance">' +
  '<p>' + 'You step tentatively through the hidden door into a dark musty cold room. The floors are stone and the smell of death greets you... You raise your lighter in an attempt to see better but the darkness seems to continue on for quite some distance. The oppressive atmosphere begins to wear away at your nerves, How much more of this can your psyche endure?' + '<p/>' +
  '<div>',
  action: function(){
    Character.loseSanity(1);
    characterRefresh(character);
    },
  directions: ["down", "up"],
  image: '<img src="img/crypt2.jpg" class="img-styles">',
}

var library = {
  title: 'Library',
  keywords: ['candle','candles','sconce','torch','candlestick'],
  description: '<div class="room" id="library">' +
  '<p>' + 'The door lead to a mouldy library. There are tall bookcases and nooks for study. The books are badly damaged by age and have no discernible titles. There is a brass candlestick holder attached to a wall near a bookcase. You don\'t immmediately see any exits or entrances but you notice odd markings at the foot of one of the tall bookcases.' + '<p/>' +
  '</div>',
  action: function(){
  },
  results: function(){
    library.directions.push('up');
    $('#room-display').empty();
    $('#room-display').append(
      '<div class="room">' +
      '<p>' + 'You reach up to the the candlestick on the wall and give it a firm pull. The bookcase groans and swings out slowly. Beyond, there is a stairway leading down into the darkness...' + '</p>' +
      '</div>');
      $(".textBody").empty();
      $(".textBody").append("<p class='modalText'>You found a lever disguised as a candle.</p>");
      $('.modalItem').empty();
      $('.modalItem').append('<img id="candle" src="modalimg/candle.png" alt="parchment key" />');
      $("#myModal").modal();
    },
    directions: ['down'],
    image: '<img src="img/library.jpg" class="img-styles">',
  }

var libraryDoor = {
  title: 'Mysterious Door',
  keywords: [],
  description: '<div class="room" id="libraryDoor">' +
  '<p>' + 'You encounter an old door, barely illuminated by a lit torch.' + '</p>' +
  '</div>',
  action: function() {
    var keyCheck = Character.checkInventory(" Small Key");
    $('.buttontext').empty();
    if (keyCheck == false) {
      $('#contextual').show();
      $('#contextual span.buttontext').append('Unlock the door with the' + '<span class ="item">' + 'small key' + '</span>.');
    } else {
      $('#contextual').show();
      $('#contextual span.buttontext').text('Try the door.');
    };
},
  after: function() {
  var keyCheck = Character.checkInventory(" Small Key")
  if (keyCheck == false) {
    Character.addSanity(1);
    characterRefresh(Character);
    $('#contextual').hide();
    $('#contextual span.buttontext').empty();
    libraryDoor.directions.push("up");
    $('#room-display').empty();
    $('#room-display').append(
    '<div class="room" id="libraryDoor">' +
    '<p>' + 'You take the <span class ="item">small key </span>from your pocket and try to fit it into the lock. With some effort you hear a click and the door unlocks.' + '</p>' +
    '</div>');
    $(".textBody").empty();
    $(".textBody").append("<p class='modalText'>You used the <span class='item'>small key</span>.</p>");
    $('.modalItem').empty();
    $('.modalItem').append('<img id="key" src="modalimg/key.png" alt="parchment key" />');
    $("#myModal").modal();
  } else {
    characterRefresh(Character);
    $('#contextual').hide();
    $('#contextual span.buttontext').empty();
    $('#room-display').empty();
    $('#room-display').append(
      '<div class="room" id="libraryDoor">' +
      '<p>' + 'You turn the knob, but the door is locked.' + '</p>' +
      '</div>');
    }
  },
  directions: ['left'],
  image: '<img src="img/door.jpg" class="img-styles">',
  image2: '<img src="img/door.jpg" class="img-styles">',
}
var office = {
  title: 'Office',
  keywords: ['drawer','desk','drawers','furniture'],
  description: '<div class="room" id="office">' +
  '<p>' + 'At the end of the hall you enter a small office. Tipped and molding furniture lay on the ground among various scattered documents. There is a desk in the middle of the room strewn with papers.' + '<p/>' +
  '<div>',
  action: function(){
  },
  results: function(){
    var firstKeyCheck = Character.checkInventory(" Small Key");
    if (firstKeyCheck !== false){
      $(".textBody").empty();
      $(".textBody").append("<p class='modalText'>You find a <span class='item'>small key</span>.</p>");
      $('.modalItem').empty();
      $('.modalItem').append('<img id="key" src="modalimg/key.png" alt="parchment key" />');
      $("#myModal").modal();
      Character.items.push(' Small Key');
    }
    },
  directions: ['down'],
  image: '<img src="img/study.jpg" class="img-styles">',
}
var labratory = {
  title: 'Labratory',
  description: '<div class="room" id="labratory">' +
  '<p>' + 'You make your way down the passage to the left. After walking for a bit, you come across a wood door set in the wall. There is an old sconce on the wall nearby. You light the sconce to shed more light on your surroundings. The door is slightly ajar. Will you investigate?' + '</p>' +
  '</div>',
  action: function(){
  $('#contextual').show();
  $('#contextual span.buttontext').text('Push the door open.');
},
  after: function(Character){
    Character.loseSanity(3);
    characterRefresh(Character);
    $('#contextual').hide();
    $('#contextual span.buttontext').empty();
    $('#room-display').empty();
    $('#room-display').append(
      '<div class="room" id="labratory">' +
      '<p>' + 'The room is small and contains several tables densely cluttered with glass vials and scientific equipment. Dust covers every surface. You approach a large glass container. When you hold your light up to it, the shape of a large, curled tentacle emerges through the cloudy liquid that suspends it. You recoil in disgust at the sight and knock a vial off the table behind you sending it to the ground. The sound of it shattering in the silence is enough to send your heart racing. You exit the labratory in a hurry, eager to put some distance between you and the odd tentacle in the jar...' + '</p>' +
      '</div>');
    },
  directions: ['up','right'],
  image: '<img src="img/labdoor.jpg" class="img-styles">',
  image2: '<img src="img/lab.jpg" class="img-styles">',
}
var hallway2 = {
  title: 'Hallway',
  keywords: ['scrap','paper','note','floor','book'],
  description: '<div class="room" id="hallway2">' +
  '<p>' + 'As you reach the bottom of the stairs, the air smells more and more fetid. you notice a small book on the floor The weak flame in your hand is the only light. There is a path to your left and one to your right, each indiscernible from the other in the darkness...' + '</p>' +
  '</div>',
  action: function(){
  },
  after: null,
  results: function(){
    $(".modal-page1").empty();
    $(".modal-page1").append("<p>Journal 3, 5, 1260<br>We have finally made contact with our Lord! Augustus went into the crypts to perform the ritual. He never returned. Xavier went down to check on him and reported that he found nothing anywhere in the catacombs. We know our Lord took him into his embrace. We will all be with Him soon.</p>");
    $("#myJournal").modal();
    },
  directions: ['left','right'],
  image: '<img src="img/wall.jpg" class="img-styles">',
}
var hallway1 = {
  title: 'Staircase',
  description: '<div class="room" id="hallway1">' +
  '<p>' + 'As you enter the stairway, you feel a chill wind rise to greet you. The air has an old smell about it as if it has been laying still for eons. The stairs before you plunge into darkness. If only there was an item to light help the way...' + '</p>' +
  '</div>',
  action: function(){
    $('#contextual').show();
    $('#contextual span.buttontext').append('Light the <span class ="item">gold lighter</span>.');
    },
  after: function(Character){
    Character.addSanity(1);
    characterRefresh(Character);
    $('#contextual').hide();
    $('#contextual span.buttontext').empty();
    $('.textBody').empty();
    $('.textBody').append('<p class="modalText">' + 'You used the ' + '<span class="item">' + 'gold lighter' + '</p>');
    $('.modalItem').empty();
    $('.modalItem').append('<img id="lighter" src="modalimg/lighter.png" alt="parchment key" />');
    $('#myModal').modal();
    hallway1.directions.push("up");
    $('#room-display').empty();
    $('#room-display').append(
      '<div class="room" id="hallway1">' +
      '<p>' + 'You take the antique <span class ="item">gold lighter </span>from your pocket and ignite it, shedding a warm glow onto the damp walls of the stairway. You are still unable to see the bottom...' + '</p>' +
      '</div>');
    },
    image: '<img src="img/stairstop.jpg" class="img-styles">',
    image2: '<img src="img/stairs.jpg" class="img-styles">',
    directions: ["down"],
  }
var foyer = {
  title: 'Vestibule',
  description: '<div class="room" id="foyer">' +
  '<p>' + 'You scraped your back on the rusty gate as you passed beneath. You find yourself in a small, dim vestibule. The once grand meeting place of the cathedral is badly damaged and the pews are a jumbled mess. The aisles are a mess of dusty detritus. You see a narrow staircase leading down and you can not go back... ' + '</p>' +
  '</div>',
  action: function(Character){
    characterRefresh(Character);
    },
  after: null,
  directions: ['up'],
  image: '<img src="img/vestibule.jpg" class="img-styles">',
}
var terrace = {
  title: 'Terrace',
  keywords: ['investigate','look','explore','bushes','search'],
  description: '<div class="room" id="entrance">' +
  '<p>' + 'You find yourself on a small overgrown terrace, the wind moans through the trees. The shadows beneath the limbs deepen and you feel something watching you. Your skin crawls and you wonder if you might just be imagining things. You are torn between investigating or retreating back to the beaten path.'  + '</p>' +
  '</div>',
  action: function(Character){
    Character.loseSanity(2);
    $("#tripleContextual").hide();
    },
  after: null,
  results: function() {
    $(".textBody").empty();
    $(".textBody").append("<p class='modalText'>Only a second after investigating you discover your suspicions were correct.<br /> You see glowing eyes gleaming back at you.<br /> Your heart skips,your stomach drops into what seems like an endless void<br /> and you break out into a cold sweat.</p>");
    $('.modalItem').empty();
    $('.modalItem').append('<img id="eyes" src="img/eyes.jpg" alt="scary eyes" />');
    $('#myModal').modal();
    Character.loseSanity(2);
    characterRefresh(Character);
  },
  directions: ['left'],
  image: '<img src="img/terrace.jpeg" class="img-styles">',
}
var entrance = {
  title: 'Entrance',
  description: '<div class="room" id="entrance">' +
  '<p>' + 'After seeing the front door of the large building is blocked by debris you move around to the side to seek entrance. You are facing a moss-laden archway on the broad side of the building. There is a rusted, dilapidated gate hanging from it\'s hinges. There may be just enough space to squeeze between the doors. To your right there is an overgrown path.' + '</p>' +
  '</div>',
  action: function(){
  },
  after: null,
  directions: ['up','down','right'],
  image: '<img src="img/gate.jpg" class="img-styles">'
}
var path = {
  title: 'Path',
  keywords: ['pocket','coat','jacket','pockets',],
  description: '<div class="room" id="path">' +
  '<p>' + 'You stand alone on a narrow path hemmed in by towering trees.  You don\'t know how you got here but you feel compelled to continue. A blocky shadow looms ahead. You can only go forward.  You remember you have something of importance in your coat pocket...' + '</p>' +
  '</div>',
  action: function(){
    $('#down').hide();
    },
  after: null,
  results: function(){
    var verifyCigs = Character.checkInventory(" Cigarettes");
    if(verifyCigs !== false){
      $("#myModal .textBody").empty();
      $("#myModal .textBody").append("<p class='modalText'>You search your pockets and find pack of <span class='item'>Cigarettes</span>.</p><br><p class='modalText'>You can smoke these to calm your nerves and restore <span class='sanity'>sanity</span>.<br>Be careful though!  Each time You smoke you will lose <span class='health'>health</span>.</p>");
      $('#myModal .modalItem').empty();
      $('#myModal .modalItem').append('<img id="key" src="modalimg/rolls.png" alt="parchment key" />');
      $("#myModal").modal();
      Character.items.push(' Cigarettes');
      path.directions.push('up')
      $('#smokeACig').show();
      characterRefresh(Character);
    }
    },
  directions: [],
  image: '<img src="img/path.jpg" class="img-styles">',
}
var turnback = {
  title: 'Path',
  description: '<div class="room" id="path">' +
  '<p>' + 'You really should investigate the path ahead...' + '</p>' +
  '</div>',
  action: function(){},
  after: null,
  directions: ['up'],
}
var introduction = {
  title: 'Introduction',
  description: '<div class="room" id="introduction">' +
  '<p>' + 'Welcome to Harbinger: Prelude. There are many rooms and places to explore and you have been provided with a set of coordinates to track your progress. Remember to \'Search\' your surroundings. Please note that your statistics and a list of your held items may be found on the right side of your screen. Enjoy.' + '</p>' +
  '</div>',
  action: function(){},
  after: function(){
    $('#contextual').hide();
    $('#contextual span.buttontext').empty();
    characterRefresh(Character);
    this.directions.push('up');
    place = 2;
    },
  directions: [],
  image: '<img src="img/startScreen.gif" class="img-styles">',
  image2: '<img src="img/startScreen.gif" class="img-styles">',
}
