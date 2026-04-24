const IMG={player:{},ui:{}};

const ASSETS={
  player:{
    idle:'assets/player/idle.png',
    runL:'assets/player/run-left.png',
    runR:'assets/player/run-right.png',
    jumpL:'assets/player/jump-left.png',
    jumpR:'assets/player/jump-right.png'
  },
  ball:'assets/ball/football.png',
  coin:'assets/coins/coin_1.png',
  ground:'assets/platforms/ground.png',
  wall:'assets/platforms/stone_wall.png',
  grass:'assets/platforms/grass_top.png',
  bg:'assets/background/city_1.png',
  ui:{
    level:'assets/ui/level.png',
    time:'assets/ui/time.png',
    coin:'assets/ui/coin.png',
    score:'assets/ui/score.png',
    best:'assets/ui/best.png'
  }
};

function loadAssets(done){
  let list=[];

  // flatten
  for(const k in ASSETS){
    if(typeof ASSETS[k]==='string'){
      list.push({key:k,src:ASSETS[k]});
    }else{
      for(const sub in ASSETS[k]){
        if(typeof ASSETS[k][sub]==='string'){
          list.push({key:k+'.'+sub,src:ASSETS[k][sub]});
        }else{
          for(const sub2 in ASSETS[k][sub]){
            list.push({key:k+'.'+sub+'.'+sub2,src:ASSETS[k][sub][sub2]});
          }
        }
      }
    }
  }

  let loaded=0;

  for(const item of list){
    let img=new Image();
    img.src=item.src;

    img.onload=()=>{
      assignIMG(item.key,img);
      loaded++;
      if(loaded===list.length)done();
    };

    img.onerror=()=>{
      console.warn('Failed:',item.src);
      loaded++;
      if(loaded===list.length)done();
    };
  }
}

function assignIMG(path,img){
  let parts=path.split('.');
  let ref=IMG;
  for(let i=0;i<parts.length-1;i++){
    if(!ref[parts[i]])ref[parts[i]]={};
    ref=ref[parts[i]];
  }
  ref[parts[parts.length-1]]=img;
}