document.addEventListener("DOMContentLoaded", () => {

  // === SECRET MENU TRIGGER (3 ways) ===
  let pressCount = 0;
  let lastPress = 0;

  function bumpCounter() {
    const now = Date.now();
    if (now - lastPress < 1500) pressCount++;
    else pressCount = 1;
    lastPress = now;
    if (pressCount >= 3) { pressCount = 0; openSecret(); }
  }

  window.addEventListener("keydown", e => {
    if (e.key === "'" || e.key === '"' || e.code === "Quote") bumpCounter();
  });
  document.body.addEventListener("click", e => { if (e.detail === 3) bumpCounter(); });

  const hotspot = document.createElement("div");
  hotspot.style.cssText = "position:fixed;bottom:0;right:0;width:40px;height:40px;z-index:99999;cursor:pointer;";
  hotspot.addEventListener("click", openSecret);
  document.body.appendChild(hotspot);


  // === FAVORITES ===
  const FAV_KEY = "secretFavGames";
  let favorites = new Set(JSON.parse(localStorage.getItem(FAV_KEY) || "[]"));
  function saveFavorites() { localStorage.setItem(FAV_KEY, JSON.stringify([...favorites])); }


  // === CATEGORIES ===
  const gameCategories = {
    "Sports": ["basketRandom","basketRandom2","basketballStars","basketballLeg","soccerRandom","soccerStars","footballLegends","footballLeg21","volleyRandom","boxingRandom","rooftopSnipers","rooftopSnipers2","pingPong","miniGolf","archery","eightBall","dunkShot","tableTennis","hockeyChamps","footGoal","golfBattle","tennisOpen"],
    "Racing & Driving": ["drift","drift2","madalin","madalin2","madalin3","motoX3m","motoX3m2","motoX3m3","motoX3m4","motoX3m5","motoX3m6","crazyCars","trafficRacer","highwayRacer","parkingFury","parkingFury2","parkingFury3","smashCarz","derbyCrash","atvDestroyer","carRush","truckLoader"],
    "Endless Runners": ["slope","slope2","tunnelRush","tunnelRush2","run3","subwaySurfers","templeRun2","runRace3D","zigzag","stickRun"],
    "Platformer": ["classic1","classic2","vex","vex2","vex3","vex4","vex5","vex6","vex7","geoDash","geoDashSub","geoDashWorld","geoDashMelt","cutTheRope","cutTheRope2","cutTheRopeTime","cutTheRopeMagic","fireboy","fireboy2","fireboy3","fireboy4","fireboy5","fireboy6","doodleJump","stickFight","superMarioFlash","superMarioFlash2","worldsHardestGame","worldsHardestGame2","worldsHardestGame3","jumpKing","ninjaTrials","spelunky"],
    "Quality Indies": ["dadish","dadish2","dadish3","poof","heli","jelly","wormate","tinyArcher","helixJump","stackBall","drawIt","thereIsNoGame","swordsAndSouls","raftWars","raftWars2","chaosFaction","chaosFaction2","learnToFly","learnToFly2","learnToFly3"],
    "Puzzle": ["twoNeon","cookieClicker","sudoku","wordle","tetris","sokoban","mahjong","mahjongConnect","blockPuzzle","wordSearch","candyCrush","monumentValley","portal2D","lightBot","jigsaw","flowFree","brainOut","happyGlass","perfectSlices","fillOne","threes","2048Cupcakes","wordCookies","crosswords"],
    ".io Games": ["bloxd","paperio2","paperio3","holeio","diepio","agar","shellShock","krunker","oneVone","skribbl","wormate","amongUs","mope","slither","zombsroyale","starveio","deeeepio","bonkio","surviv","evoworld","drawasaurus"],
    "Arcade & Retro": ["snake","pacman","flappy","spaceInvaders","asteroids","breakout","pong","galaga","frogger","digdug","centipede","missileCommand","donkeyKong","qbert","defender","lunarLander","joust","pinball","plinko"],
    "Strategy": ["bloons","bloons2","bloons3","bloons4","bloons5","bloons6","chess","checkers","kingdomRush","kingdomRush2","kingdomRush3","kingdomRush4","plantsZombies","warMachines","tacticsGame","tankTrouble","tankTrouble2"],
    "Casual & Hyper": ["pianoTiles","magicTiles","bottleFlip","fruitNinja","heroRescue","stickHero","colorSwitch","crossyRoad","jellyJump","aquapark","amazeFrenzy"],
    "Card & Solitaire": ["solitaire","spiderSolitaire","freecell","unoOnline","klondike","hearts","spades"],
    "Word & Brain": ["spellingBee","wordoodle","mathPlayground","coolMath","trivia"],
    "Horror & Maze": ["granny","scaryMaze","slenderman"],
    "Emulator": ["retroEmu","gbaEmu","ndsEmu","n64Emu","psxEmu"],
    "Sandbox & Other": ["minecraft","happyWheels","blockcraft","brawlhalla","youtube","browser"]
  };


  // === GAMES ===
  const secretGames = {
    classic1:        { title: "Celeste Classic 1",       url: "https://www.lexaloffle.com/bbs/?tid=2145" },
    classic2:        { title: "Celeste Classic 2",       url: "https://www.lexaloffle.com/bbs/?tid=37892" },
    dadish:          { title: "Dadish",                  url: "https://thomasyoung.itch.io/dadish" },
    dadish2:         { title: "Dadish 2",                url: "https://thomasyoung.itch.io/dadish-2" },
    dadish3:         { title: "Dadish 3",                url: "https://thomasyoung.itch.io/dadish-3" },
    poof:            { title: "Poof",                    url: "https://html5.gamemonetize.com/poof/" },
    heli:            { title: "Heli Attack",             url: "https://html5.gamemonetize.com/heli-attack/" },
    jelly:           { title: "Jelly Truck",             url: "https://html5.gamemonetize.com/jelly-truck/" },
    wormate:         { title: "Wormate.io",              url: "https://wormate.io/" },
    tinyArcher:      { title: "Tiny Archer",             url: "https://html5.gamemonetize.com/tiny-archer/" },
    helixJump:       { title: "Helix Jump",              url: "https://html5.gamemonetize.com/helix-jump/" },
    stackBall:       { title: "Stack Ball",              url: "https://html5.gamemonetize.com/stack-ball/" },
    drawIt:          { title: "Draw It",                 url: "https://html5.gamemonetize.com/draw-it/" },
    thereIsNoGame:   { title: "There Is No Game",        url: "https://draw-logic-games.com/there-is-no-game/" },
    swordsAndSouls:  { title: "Swords & Souls",          url: "https://html5.gamemonetize.com/swords-and-souls/" },
    raftWars:        { title: "Raft Wars",               url: "https://html5.gamemonetize.com/raft-wars/" },
    raftWars2:       { title: "Raft Wars 2",             url: "https://html5.gamemonetize.com/raft-wars-2/" },
    chaosFaction:    { title: "Chaos Faction",           url: "https://html5.gamemonetize.com/chaos-faction/" },
    chaosFaction2:   { title: "Chaos Faction 2",         url: "https://html5.gamemonetize.com/chaos-faction-2/" },
    learnToFly:      { title: "Learn to Fly",            url: "https://html5.gamemonetize.com/learn-to-fly/" },
    learnToFly2:     { title: "Learn to Fly 2",          url: "https://html5.gamemonetize.com/learn-to-fly-2/" },
    learnToFly3:     { title: "Learn to Fly 3",          url: "https://html5.gamemonetize.com/learn-to-fly-3/" },

    basketRandom:    { title: "Basket Random",           url: "https://html5.gamemonetize.com/basket-random/" },
    basketRandom2:   { title: "Basket Random 2",         url: "https://html5.gamemonetize.com/basket-random-2/" },
    basketballStars: { title: "Basketball Stars",        url: "https://html5.gamemonetize.com/basketball-stars/" },
    basketballLeg:   { title: "Basketball Legends 2020", url: "https://html5.gamemonetize.com/basketball-legends-2020/" },
    soccerRandom:    { title: "Soccer Random",           url: "https://html5.gamemonetize.com/soccer-random/" },
    soccerStars:     { title: "Soccer Stars",            url: "https://html5.gamemonetize.com/soccer-stars/" },
    footballLegends: { title: "Football Legends",        url: "https://html5.gamemonetize.com/football-legends/" },
    footballLeg21:   { title: "Football Legends 2021",   url: "https://html5.gamemonetize.com/football-legends-2021/" },
    volleyRandom:    { title: "Volley Random",           url: "https://html5.gamemonetize.com/volley-random/" },
    boxingRandom:    { title: "Boxing Random",           url: "https://html5.gamemonetize.com/boxing-random/" },
    rooftopSnipers:  { title: "Rooftop Snipers",         url: "https://html5.gamemonetize.com/rooftop-snipers/" },
    rooftopSnipers2: { title: "Rooftop Snipers 2",       url: "https://html5.gamemonetize.com/rooftop-snipers-2/" },
    pingPong:        { title: "Ping Pong",               url: "https://html5.gamemonetize.com/ping-pong/" },
    miniGolf:        { title: "Mini Golf",               url: "https://html5.gamemonetize.com/mini-golf/" },
    archery:         { title: "Archery World Tour",      url: "https://html5.gamemonetize.com/archery-world-tour/" },
    eightBall:       { title: "8 Ball Pool",             url: "https://html5.gamemonetize.com/8-ball-pool/" },
    dunkShot:        { title: "Dunk Shot",               url: "https://html5.gamemonetize.com/dunk-shot/" },
    tableTennis:     { title: "Table Tennis",            url: "https://html5.gamemonetize.com/table-tennis/" },
    hockeyChamps:    { title: "Hockey Champs",           url: "https://html5.gamemonetize.com/hockey-champs/" },
    footGoal:        { title: "FootGoal",                url: "https://html5.gamemonetize.com/footgoal/" },
    golfBattle:      { title: "Golf Battle",             url: "https://html5.gamemonetize.com/golf-battle/" },
    tennisOpen:      { title: "Tennis Open",             url: "https://html5.gamemonetize.com/tennis-open/" },

    drift:           { title: "Drift Hunters",           url: "https://drifthunters.io/game/drift-hunters/" },
    drift2:          { title: "Drift Hunters 2",         url: "https://drifthunters.io/game/drift-hunters-2/" },
    madalin:         { title: "Madalin Stunt Cars",      url: "https://html5.gamemonetize.com/madalin-stunt-cars/" },
    madalin2:        { title: "Madalin Stunt Cars 2",    url: "https://html5.gamemonetize.com/madalin-stunt-cars-2/" },
    madalin3:        { title: "Madalin Stunt Cars 3",    url: "https://html5.gamemonetize.com/madalin-stunt-cars-3/" },
    motoX3m:         { title: "Moto X3M",                url: "https://html5.gamemonetize.com/moto-x3m/" },
    motoX3m2:        { title: "Moto X3M 2",              url: "https://html5.gamemonetize.com/moto-x3m-2/" },
    motoX3m3:        { title: "Moto X3M 3",              url: "https://html5.gamemonetize.com/moto-x3m-3/" },
    motoX3m4:        { title: "Moto X3M 4 Winter",       url: "https://html5.gamemonetize.com/moto-x3m-4-winter/" },
    motoX3m5:        { title: "Moto X3M 5 Pool Party",   url: "https://html5.gamemonetize.com/moto-x3m-5-pool-party/" },
    motoX3m6:        { title: "Moto X3M 6 Spooky Land",  url: "https://html5.gamemonetize.com/moto-x3m-6-spooky-land/" },
    crazyCars:       { title: "Crazy Cars",              url: "https://html5.gamemonetize.com/crazy-cars/" },
    trafficRacer:    { title: "Traffic Racer",           url: "https://html5.gamemonetize.com/traffic-racer/" },
    highwayRacer:    { title: "Highway Racer",           url: "https://html5.gamemonetize.com/highway-racer/" },
    parkingFury:     { title: "Parking Fury",            url: "https://html5.gamemonetize.com/parking-fury/" },
    parkingFury2:    { title: "Parking Fury 2",          url: "https://html5.gamemonetize.com/parking-fury-2/" },
    parkingFury3:    { title: "Parking Fury 3",          url: "https://html5.gamemonetize.com/parking-fury-3/" },
    smashCarz:       { title: "Smash Carz",              url: "https://html5.gamemonetize.com/smash-carz/" },
    derbyCrash:      { title: "Derby Crash",             url: "https://html5.gamemonetize.com/derby-crash/" },
    atvDestroyer:    { title: "ATV Destroyer",           url: "https://html5.gamemonetize.com/atv-destroyer/" },
    carRush:         { title: "Car Rush",                url: "https://html5.gamemonetize.com/car-rush/" },
    truckLoader:     { title: "Truck Loader",            url: "https://html5.gamemonetize.com/truck-loader/" },

    slope:           { title: "Slope",                   url: "https://slope-game.online/slope.html" },
    slope2:          { title: "Slope 2",                 url: "https://slope-game.online/slope-2.html" },
    tunnelRush:      { title: "Tunnel Rush",             url: "https://html5.gamemonetize.com/tunnel-rush/" },
    tunnelRush2:     { title: "Tunnel Rush 2",           url: "https://html5.gamemonetize.com/tunnel-rush-2/" },
    run3:            { title: "Run 3",                   url: "https://html5.gamemonetize.com/run-3/" },
    subwaySurfers:   { title: "Subway Surfers",          url: "https://html5.gamemonetize.com/subway-surfers/" },
    templeRun2:      { title: "Temple Run 2",            url: "https://html5.gamemonetize.com/temple-run-2/" },
    runRace3D:       { title: "Run Race 3D",             url: "https://html5.gamemonetize.com/run-race-3d/" },
    zigzag:          { title: "ZigZag",                  url: "https://html5.gamemonetize.com/zigzag/" },
    stickRun:        { title: "Stick Run",               url: "https://html5.gamemonetize.com/stick-run/" },

    vex:             { title: "Vex",                     url: "https://html5.gamemonetize.com/vex/" },
    vex2:            { title: "Vex 2",                   url: "https://html5.gamemonetize.com/vex-2/" },
    vex3:            { title: "Vex 3",                   url: "https://html5.gamemonetize.com/vex-3/" },
    vex4:            { title: "Vex 4",                   url: "https://html5.gamemonetize.com/vex-4/" },
    vex5:            { title: "Vex 5",                   url: "https://html5.gamemonetize.com/vex-5/" },
    vex6:            { title: "Vex 6",                   url: "https://html5.gamemonetize.com/vex-6/" },
    vex7:            { title: "Vex 7",                   url: "https://html5.gamemonetize.com/vex-7/" },
    geoDash:         { title: "Geometry Dash",           url: "https://html5.gamemonetize.com/geometry-dash/" },
    geoDashSub:      { title: "Geometry Dash SubZero",   url: "https://html5.gamemonetize.com/geometry-dash-subzero/" },
    geoDashWorld:    { title: "Geometry Dash World",     url: "https://html5.gamemonetize.com/geometry-dash-world/" },
    geoDashMelt:     { title: "Geometry Dash Meltdown",  url: "https://html5.gamemonetize.com/geometry-dash-meltdown/" },
    cutTheRope:      { title: "Cut the Rope",            url: "https://html5.gamemonetize.com/cut-the-rope/" },
    cutTheRope2:     { title: "Cut the Rope 2",          url: "https://html5.gamemonetize.com/cut-the-rope-2/" },
    cutTheRopeTime:  { title: "Cut the Rope: Time Travel", url: "https://html5.gamemonetize.com/cut-the-rope-time-travel/" },
    cutTheRopeMagic: { title: "Cut the Rope: Magic",     url: "https://html5.gamemonetize.com/cut-the-rope-magic/" },
    fireboy:         { title: "Fireboy & Watergirl 1",   url: "https://html5.gamemonetize.com/fireboy-watergirl/" },
    fireboy2:        { title: "Fireboy & Watergirl 2",   url: "https://html5.gamemonetize.com/fireboy-watergirl-2/" },
    fireboy3:        { title: "Fireboy & Watergirl 3",   url: "https://html5.gamemonetize.com/fireboy-watergirl-3/" },
    fireboy4:        { title: "Fireboy & Watergirl 4",   url: "https://html5.gamemonetize.com/fireboy-watergirl-4/" },
    fireboy5:        { title: "Fireboy & Watergirl 5",   url: "https://html5.gamemonetize.com/fireboy-watergirl-5/" },
    fireboy6:        { title: "Fireboy & Watergirl 6",   url: "https://html5.gamemonetize.com/fireboy-watergirl-6/" },
    doodleJump:      { title: "Doodle Jump",             url: "https://html5.gamemonetize.com/doodle-jump/" },
    stickFight:      { title: "Stick Fight",             url: "https://html5.gamemonetize.com/stick-fight/" },
    superMarioFlash: { title: "Super Mario Flash",       url: "https://html5.gamemonetize.com/super-mario-flash/" },
    superMarioFlash2:{ title: "Super Mario Flash 2",     url: "https://html5.gamemonetize.com/super-mario-flash-2/" },
    worldsHardestGame:  { title: "World's Hardest Game",  url: "https://html5.gamemonetize.com/worlds-hardest-game/" },
    worldsHardestGame2: { title: "World's Hardest Game 2",url: "https://html5.gamemonetize.com/worlds-hardest-game-2/" },
    worldsHardestGame3: { title: "World's Hardest Game 3",url: "https://html5.gamemonetize.com/worlds-hardest-game-3/" },
    jumpKing:        { title: "Jump King",               url: "https://html5.gamemonetize.com/jump-king/" },
    ninjaTrials:     { title: "Ninja Trials",            url: "https://html5.gamemonetize.com/ninja-trials/" },
    spelunky:        { title: "Spelunky",                url: "https://html5.gamemonetize.com/spelunky/" },

    bloxd:           { title: "Bloxd.io",                url: "https://bloxd.io/" },
    paperio2:        { title: "Paper.io 2",              url: "https://paperio2.us/" },
    paperio3:        { title: "Paper.io 3",              url: "https://paperio3.io/" },
    holeio:          { title: "Hole.io",                 url: "https://hole-io.com/" },
    diepio:          { title: "Diep.io",                 url: "https://diep.io/" },
    agar:            { title: "Agar.io",                 url: "https://agar.io/" },
    shellShock:      { title: "Shell Shockers",          url: "https://shellshock.io/" },
    krunker:         { title: "Krunker",                 url: "https://krunker.io/" },
    oneVone:         { title: "1v1.lol",                 url: "https://1v1.lol/" },
    skribbl:         { title: "Skribbl.io",              url: "https://skribbl.io/" },
    amongUs:         { title: "Among Us Online",         url: "https://html5.gamemonetize.com/among-us/" },
    mope:            { title: "Mope.io",                 url: "https://mope.io/" },
    slither:         { title: "Slither.io",              url: "https://slither.io/" },
    zombsroyale:     { title: "Zombs Royale",            url: "https://zombsroyale.io/" },
    starveio:        { title: "Starve.io",               url: "https://starve.io/" },
    deeeepio:        { title: "Deeeep.io",               url: "https://deeeep.io/" },
    bonkio:          { title: "Bonk.io",                 url: "https://bonk.io/" },
    surviv:          { title: "Surviv.io",               url: "https://surviv.io/" },
    evoworld:        { title: "EvoWorld.io",             url: "https://evoworld.io/" },
    drawasaurus:     { title: "Drawasaurus",             url: "https://www.drawasaurus.org/" },

    twoNeon:         { title: "2048",                    url: "https://play2048.co/" },
    cookieClicker:   { title: "Cookie Clicker",          url: "https://orteil.dashnet.org/cookieclicker/" },
    tetris:          { title: "Tetris",                  url: "https://tetris.com/play-tetris" },
    sokoban:         { title: "Sokoban",                 url: "https://html5.gamemonetize.com/sokoban/" },
    mahjong:         { title: "Mahjong",                 url: "https://html5.gamemonetize.com/mahjong/" },
    mahjongConnect:  { title: "Mahjong Connect",         url: "https://html5.gamemonetize.com/mahjong-connect/" },
    blockPuzzle:     { title: "Block Puzzle",            url: "https://html5.gamemonetize.com/block-puzzle/" },
    wordSearch:      { title: "Word Search",             url: "https://html5.gamemonetize.com/word-search/" },
    sudoku:          { title: "Sudoku",                  url: "https://sudoku.com/" },
    wordle:          { title: "Wordle",                  url: "https://wordleunlimited.org/" },
    candyCrush:      { title: "Candy Crush",             url: "https://html5.gamemonetize.com/candy-crush/" },
    monumentValley:  { title: "Monument Valley",         url: "https://html5.gamemonetize.com/monument-valley/" },
    portal2D:        { title: "Portal 2D",               url: "https://html5.gamemonetize.com/portal-2d/" },
    lightBot:        { title: "Lightbot",                url: "https://lightbot.com/flash.html" },
    jigsaw:          { title: "Jigsaw Puzzle",           url: "https://html5.gamemonetize.com/jigsaw-puzzle/" },
    flowFree:        { title: "Flow Free",               url: "https://html5.gamemonetize.com/flow-free/" },
    brainOut:        { title: "Brain Out",               url: "https://html5.gamemonetize.com/brain-out/" },
    happyGlass:      { title: "Happy Glass",             url: "https://html5.gamemonetize.com/happy-glass/" },
    perfectSlices:   { title: "Perfect Slices",          url: "https://html5.gamemonetize.com/perfect-slices/" },
    fillOne:         { title: "Fill One Line",           url: "https://html5.gamemonetize.com/fill-one-line/" },
    threes:          { title: "Threes!",                 url: "https://play.threesgame.com/" },
    "2048Cupcakes":  { title: "2048 Cupcakes",           url: "https://2048cupcakes.com/" },
    wordCookies:     { title: "Word Cookies",            url: "https://html5.gamemonetize.com/word-cookies/" },
    crosswords:      { title: "Crosswords",              url: "https://html5.gamemonetize.com/crosswords/" },

    snake:           { title: "Snake",                   url: "https://playsnake.org/" },
    pacman:          { title: "Pac-Man",                 url: "https://html5.gamemonetize.com/pac-man/" },
    flappy:          { title: "Flappy Bird",             url: "https://flappybird.io/" },
    spaceInvaders:   { title: "Space Invaders",          url: "https://html5.gamemonetize.com/space-invaders/" },
    asteroids:       { title: "Asteroids",               url: "https://html5.gamemonetize.com/asteroids/" },
    breakout:        { title: "Breakout",                url: "https://html5.gamemonetize.com/breakout/" },
    pong:            { title: "Pong",                    url: "https://html5.gamemonetize.com/pong/" },
    galaga:          { title: "Galaga",                  url: "https://html5.gamemonetize.com/galaga/" },
    frogger:         { title: "Frogger",                 url: "https://html5.gamemonetize.com/frogger/" },
    digdug:          { title: "Dig Dug",                 url: "https://html5.gamemonetize.com/dig-dug/" },
    centipede:       { title: "Centipede",               url: "https://html5.gamemonetize.com/centipede/" },
    missileCommand:  { title: "Missile Command",         url: "https://html5.gamemonetize.com/missile-command/" },
    donkeyKong:      { title: "Donkey Kong",             url: "https://html5.gamemonetize.com/donkey-kong/" },
    qbert:           { title: "Q*bert",                  url: "https://html5.gamemonetize.com/qbert/" },
    defender:        { title: "Defender",                url: "https://html5.gamemonetize.com/defender/" },
    lunarLander:     { title: "Lunar Lander",            url: "https://html5.gamemonetize.com/lunar-lander/" },
    joust:           { title: "Joust",                   url: "https://html5.gamemonetize.com/joust/" },
    pinball:         { title: "Pinball",                 url: "https://html5.gamemonetize.com/pinball/" },
    plinko:          { title: "Plinko",                  url: "https://html5.gamemonetize.com/plinko/" },

    bloons:          { title: "Bloons TD",               url: "https://html5.gamemonetize.com/bloons-td/" },
    bloons2:         { title: "Bloons TD 2",             url: "https://html5.gamemonetize.com/bloons-td-2/" },
    bloons3:         { title: "Bloons TD 3",             url: "https://html5.gamemonetize.com/bloons-td-3/" },
    bloons4:         { title: "Bloons TD 4",             url: "https://html5.gamemonetize.com/bloons-td-4/" },
    bloons5:         { title: "Bloons TD 5",             url: "https://html5.gamemonetize.com/bloons-td-5/" },
    bloons6:         { title: "Bloons TD 6",             url: "https://html5.gamemonetize.com/bloons-td-6/" },
    chess:           { title: "Chess",                   url: "https://www.chess.com/play/computer" },
    checkers:        { title: "Checkers",                url: "https://html5.gamemonetize.com/checkers/" },
    kingdomRush:     { title: "Kingdom Rush",            url: "https://html5.gamemonetize.com/kingdom-rush/" },
    kingdomRush2:    { title: "Kingdom Rush Frontiers",  url: "https://html5.gamemonetize.com/kingdom-rush-frontiers/" },
    kingdomRush3:    { title: "Kingdom Rush Origins",    url: "https://html5.gamemonetize.com/kingdom-rush-origins/" },
    kingdomRush4:    { title: "Kingdom Rush Vengeance",  url: "https://html5.gamemonetize.com/kingdom-rush-vengeance/" },
    plantsZombies:   { title: "Plants vs Zombies",       url: "https://html5.gamemonetize.com/plants-vs-zombies/" },
    warMachines:     { title: "War Machines",            url: "https://html5.gamemonetize.com/war-machines/" },
    tacticsGame:     { title: "Tactics Core",            url: "https://html5.gamemonetize.com/tactics-core/" },
    tankTrouble:     { title: "Tank Trouble",            url: "https://html5.gamemonetize.com/tank-trouble/" },
    tankTrouble2:    { title: "Tank Trouble 2",          url: "https://html5.gamemonetize.com/tank-trouble-2/" },

    pianoTiles:      { title: "Piano Tiles",             url: "https://html5.gamemonetize.com/piano-tiles/" },
    magicTiles:      { title: "Magic Tiles",             url: "https://html5.gamemonetize.com/magic-tiles/" },
    bottleFlip:      { title: "Bottle Flip",             url: "https://html5.gamemonetize.com/bottle-flip/" },
    fruitNinja:      { title: "Fruit Ninja",             url: "https://html5.gamemonetize.com/fruit-ninja/" },
    heroRescue:      { title: "Hero Rescue",             url: "https://html5.gamemonetize.com/hero-rescue/" },
    stickHero:       { title: "Stick Hero",              url: "https://html5.gamemonetize.com/stick-hero/" },
    colorSwitch:     { title: "Color Switch",            url: "https://html5.gamemonetize.com/color-switch/" },
    crossyRoad:      { title: "Crossy Road",             url: "https://html5.gamemonetize.com/crossy-road/" },
    jellyJump:       { title: "Jelly Jump",              url: "https://html5.gamemonetize.com/jelly-jump/" },
    aquapark:        { title: "Aquapark.io",             url: "https://html5.gamemonetize.com/aquapark-io/" },
    amazeFrenzy:     { title: "aMaze Frenzy",            url: "https://html5.gamemonetize.com/amaze-frenzy/" },

    solitaire:       { title: "Solitaire",               url: "https://html5.gamemonetize.com/solitaire/" },
    spiderSolitaire: { title: "Spider Solitaire",        url: "https://html5.gamemonetize.com/spider-solitaire/" },
    freecell:        { title: "FreeCell",                url: "https://html5.gamemonetize.com/freecell/" },
    unoOnline:       { title: "UNO Online",              url: "https://html5.gamemonetize.com/uno-online/" },
    klondike:        { title: "Klondike",                url: "https://html5.gamemonetize.com/klondike/" },
    hearts:          { title: "Hearts",                  url: "https://html5.gamemonetize.com/hearts/" },
    spades:          { title: "Spades",                  url: "https://html5.gamemonetize.com/spades/" },

    spellingBee:     { title: "Spelling Bee",            url: "https://html5.gamemonetize.com/spelling-bee/" },
    wordoodle:       { title: "Wordoodle",               url: "https://html5.gamemonetize.com/wordoodle/" },
    mathPlayground:  { title: "Math Playground",         url: "https://www.mathplayground.com/" },
    coolMath:        { title: "Cool Math Games",         url: "https://www.coolmathgames.com/" },
    trivia:          { title: "Trivia Crack",            url: "https://html5.gamemonetize.com/trivia-crack/" },

    granny:          { title: "Granny",                  url: "https://html5.gamemonetize.com/granny/" },
    scaryMaze:       { title: "Scary Maze",              url: "https://html5.gamemonetize.com/scary-maze/" },
    slenderman:      { title: "Slenderman",              url: "https://html5.gamemonetize.com/slenderman/" },

    retroEmu:        { title: "Retro Emulator (NES/SNES)", url: "https://demo.emulatorjs.org/" },
    gbaEmu:          { title: "Game Boy Advance Emulator", url: "https://demo.emulatorjs.org/?core=gba" },
    ndsEmu:          { title: "Nintendo DS Emulator",      url: "https://demo.emulatorjs.org/?core=nds" },
    n64Emu:          { title: "Nintendo 64 Emulator",      url: "https://demo.emulatorjs.org/?core=n64" },
    psxEmu:          { title: "PlayStation 1 Emulator",    url: "https://demo.emulatorjs.org/?core=psx" },

    minecraft:       { title: "Minecraft Classic",       url: "https://classic.minecraft.net/" },
    happyWheels:     { title: "Happy Wheels",            url: "https://www.totaljerkface.com/happy_wheels.html" },
    blockcraft:      { title: "Blockcraft 3D",           url: "https://html5.gamemonetize.com/blockcraft-3d/" },
    brawlhalla:      { title: "Brawlhalla Web",          url: "https://html5.gamemonetize.com/brawlhalla/" },
    youtube:         { title: "YouTube Embed",           url: "https://www.youtube.com/embed?listType=playlist&list=PL3UeTdNh-2Imydw3zPIIcPi5x8rBdPg7r" },
    browser:         { title: "Mini Browser",            url: "https://example.com", browser: true }
  };


  // === RENDER ===
  const secretPage = document.getElementById("secret-page");
  const gamePage = document.getElementById("game-page");
  const secretGameFrame = document.getElementById("secret-game-frame");
  const secretGameTitle = document.getElementById("secret-game-title");
  const secretFrameWrap = document.getElementById("secret-frame-wrap");

  function openSecret() {
    if (!secretPage) return;
    secretPage.classList.remove("hidden");
    if (gamePage) gamePage.classList.add("hidden");
  }

  function showSecretGame(name) {
    const game = secretGames[name];
    const bar = document.getElementById("browser-bar");
    const inp = document.getElementById("browser-url");
    secretGameTitle.textContent = game.title;
    secretGameFrame.src = game.url;
    if (game.browser) { bar.classList.remove("hidden"); inp.value = game.url; }
    else { bar.classList.add("hidden"); }
    secretPage.classList.add("hidden");
    gamePage.classList.remove("hidden");
  }

  function returnHome() {
    secretPage.classList.add("hidden");
    gamePage.classList.add("hidden");
    secretGameFrame.src = "";
    window.location.hash = "";
  }

  function buildOptionButton(key) {
    const btn = document.createElement("button");
    btn.className = "secret-option";
    btn.textContent = secretGames[key].title;
    btn.addEventListener("click", () => showSecretGame(key));

    const star = document.createElement("button");
    star.className = "fav-star" + (favorites.has(key) ? " active" : "");
    star.textContent = "★";
    star.addEventListener("click", e => {
      e.stopPropagation();
      if (favorites.has(key)) favorites.delete(key);
      else favorites.add(key);
      saveFavorites();
      renderSecretOptions(document.getElementById("game-search")?.value || "");
    });
    btn.appendChild(star);
    return btn;
  }

  function buildCategorySection(name, keys, term, openByDefault = false, isFav = false) {
    const wrap = document.createElement("div");
    wrap.className = "game-category" + (isFav ? " favorites-section" : "");
    const toggle = document.createElement("button");
    toggle.className = "category-toggle" + (term || openByDefault ? " open" : "");
    toggle.innerHTML = `<span>${isFav ? "★ " : ""}${name} (${keys.length})</span><span class="arrow">▶</span>`;
    const grid = document.createElement("div");
    grid.className = "category-grid" + (term || openByDefault ? "" : " collapsed");
    keys.forEach(k => grid.appendChild(buildOptionButton(k)));
    toggle.addEventListener("click", () => {
      grid.classList.toggle("collapsed");
      toggle.classList.toggle("open");
    });
    wrap.appendChild(toggle);
    wrap.appendChild(grid);
    return wrap;
  }

  function renderSecretOptions(filter = "") {
    const container = document.getElementById("secret-options");
    if (!container) return;
    container.innerHTML = "";
    const term = filter.trim().toLowerCase();
    const matches = key => secretGames[key] && (!term || secretGames[key].title.toLowerCase().includes(term));

    const favKeys = [...favorites].filter(matches);
    if (favKeys.length) container.appendChild(buildCategorySection("Favorites", favKeys, term, true, true));

    Object.entries(gameCategories).forEach(([name, keys]) => {
      const matched = keys.filter(matches);
      if (matched.length === 0) return;
      container.appendChild(buildCategorySection(name, matched, term));
    });
  }

  renderSecretOptions();

  const searchInput = document.getElementById("game-search");
  if (searchInput) searchInput.addEventListener("input", e => renderSecretOptions(e.target.value));


  // === BUTTONS ===
  document.querySelectorAll(".home-btn").forEach(b => b.addEventListener("click", returnHome));

  const enterFs = document.getElementById("enter-fullscreen");
  if (enterFs) enterFs.addEventListener("click", () => {
    if (secretFrameWrap.requestFullscreen) secretFrameWrap.requestFullscreen();
    else if (secretFrameWrap.webkitRequestFullscreen) secretFrameWrap.webkitRequestFullscreen();
  });

  const exitFs = document.getElementById("exit-fullscreen");
  if (exitFs) exitFs.addEventListener("click", () => {
    if (document.exitFullscreen) document.exitFullscreen();
    else if (document.webkitExitFullscreen) document.webkitExitFullscreen();
  });

  document.querySelectorAll(".corner-fullscreen-btn").forEach(b =>
    b.addEventListener("click", () => {
      const t = document.getElementById(b.dataset.fullscreenTarget);
      if (!t) return;
      if (t.requestFullscreen) t.requestFullscreen();
      else if (t.webkitRequestFullscreen) t.webkitRequestFullscreen();
    })
  );

  const goBtn = document.getElementById("browser-go");
  if (goBtn) goBtn.addEventListener("click", () => {
    let url = document.getElementById("browser-url").value.trim();
    if (!url) return;
    if (!/^https?:\/\//i.test(url)) url = "https://" + url;
    secretGameFrame.src = url;
  });

  const urlInput = document.getElementById("browser-url");
  if (urlInput) urlInput.addEventListener("keydown", e => { if (e.key === "Enter") goBtn.click(); });

});