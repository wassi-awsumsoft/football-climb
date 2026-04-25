const IMG={player:{},ui:{},backgrounds:[]};

const BG_COUNT=3;

const ASSETS={
 player:{
  sheet:'assets/player/player_sheet.png',
  idle:'assets/player/idle.png',
  runL:'assets/player/run-left.png',
  runR:'assets/player/run-right.png',
  jumpL:'assets/player/jump-left.png',
  jumpR:'assets/player/jump-right.png'
},
  ball:'assets/ball/football.png',
  coin:'assets/coins/coin_1.png',
  coinSpin:'assets/coins/coin_spin.png',
  ground:'assets/platforms/ground.png',
  wall:'assets/platforms/stone_wall.png',
  grass:'assets/platforms/grass_top.png',
  underground:'assets/platforms/underground.png',
  bg:'assets/background/city_1.png',
  backgrounds:Array.from({length:BG_COUNT},(_,i)=>`assets/background/city_${i+1}.png`),
  ui:{
    level:'assets/ui/level.png',
    time:'assets/ui/time.png',
    coin:'assets/ui/coin.png',
    score:'assets/ui/score.png',
    best:'assets/ui/best.png',
    starFull:'assets/ui/star_full.png',
    starEmpty:'assets/ui/star_empty.png',
    buttonLeft:'assets/ui/button_left.png',
    buttonRight:'assets/ui/button_right.png',
    buttonJump:'assets/ui/button_jump.png',
    buttonLob:'assets/ui/button_lob.png',
    buttonGrab:'assets/ui/button_grab.png',
    settings:'assets/ui/settings.png',
    closeCross:'assets/ui/close_cross.png',
    bgmusic:'assets/ui/bgmusic.png',
    soundfx:'assets/ui/soundfx.png'
  }
};

function loadAssets(done){
  let list=[];

  for(const k in ASSETS){
    if(Array.isArray(ASSETS[k])){
      ASSETS[k].forEach((src,i)=>list.push({key:k+'.'+i,src}));
    }else if(typeof ASSETS[k]==='string'){
      list.push({key:k,src:ASSETS[k]});
    }else{
      for(const s in ASSETS[k]){
        list.push({key:k+'.'+s,src:ASSETS[k][s]});
      }
    }
  }

  let loaded=0;

  for(const item of list){
    let img=new Image();
    img.src=item.src;

    img.onload=()=>{
      assignIMG(item.key,img);
      if(++loaded===list.length)done();
    };

    img.onerror=()=>{
      console.warn('Failed:',item.src);
      if(++loaded===list.length)done();
    };
  }
}

function assignIMG(path,img){
  let parts=path.split('.');

  if(parts[0]==='backgrounds'){
    IMG.backgrounds[Number(parts[1])]=img;
    return;
  }

  let ref=IMG;

  for(let i=0;i<parts.length-1;i++){
    if(!ref[parts[i]])ref[parts[i]]={};
    ref=ref[parts[i]];
  }

  ref[parts[parts.length-1]]=img;
}
