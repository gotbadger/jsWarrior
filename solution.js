jsWarrior.turn = function(warrior){
  //warrior.retreatAt = 6; //level3
  warrior.retreatAt = 7;
  warrior.expectHealth = (warrior.expectHealth == undefined) ? warrior.getHealth() : warrior.expectHealth
  
  for(var i=0; i< jsWarrior.lifecycle.length; i++){
    if(jsWarrior.lifecycle[i](warrior)){
      break;
    }
  }
}
jsWarrior.checkMap = {
  "empty" : function(w){
      return false;
	},
  "enemy" :function(w){
    w.attack();
    return true;
  },
  "diamond" :function(w){
    w.collect();
    return true;
  },
  "wall" :function(w){
    w.foundLeft = true;
    w.pivot();
    return true;
  },
}
//whats important in life
jsWarrior.lifecycle = [
  function(w){
    if(w.check('backward') == 'wall' && !w.foundLeft){
      w.seeking = false;
      w.foundLeft = true;
    }
    if(!w.foundLeft && !w.seeking && w.check('backward') != "wall"){
      w.seeking = true;
      w.pivot();
      return true;
    }
    return false;
  },
  function(w){
    var checkActionResult = jsWarrior.checkMap[w.check()](w);
    if(checkActionResult){
      w.isHealing = false;
    }
    return checkActionResult;
  },
  
  function(w){
    if(w.getHealth() < 20){
      if(w.isHealing && w.getHealth() !=  w.expectHealth){
        w.expectHealth = w.getHealth();
        w.isHealing = false;
        //depending on health retreat or not
        if(w.getHealth() <= w.retreatAt){
        	w.walk('backward');
          	return true;
        }else{
          //charge
          return false;
        }
        
      }
      w.expectHealth = w.getHealth()+2;
      w.isHealing = true;
      w.rest();
      return true;
    }
    return false;
  },
  
  function(w){
    w.walk()
    return true;
  },
]