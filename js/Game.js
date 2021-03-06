class Game {
  constructor(){

  }

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }

    p1 = createSprite(100,200);
    //p1.addImage("car1",car1_img);
    p2= createSprite(300,200);
    //p2.addImage("car2",car2_img);
    
    p = [p1,p2];
  }

  play(){
    form.hide();
    
    Player.getPlayerInfo();
    
    
    if(allPlayers !== undefined){
      background(rgb(198,135,103));
      //image(track, 0,-displayHeight*4,displayWidth, displayHeight*5);
      
      //var display_position = 100;
      
      //index of the array
      var index = 0;

      //x and y position of the cars
      var x = 100 ;
      var y;

      for(var plr in allPlayers){
        //add 1 to the index for every loop
        index = index + 1 ;

        //position the cars a little away from each other in x direction
        
        //use data form the database to display the cars in y direction
        y = displayHeight - allPlayers[plr].distance;
        p[index-1].x = x;
        p[index-1].y = y;
       // console.log(index, player.index)
   
   
       //Current Player
        if (index === player.index){
          p[index - 1].shapeColor = "red";
          if (keyDown("space")){
            var weapon = createSprite(p[index-1].x,p[index-1].y,50,30)
            if(p[index-1].x<200){
             weapon.velocityX=5
             
            }
           else{
           weapon.velocityX=-5
           }
           }
         // camera.position.x = displayWidth/2;
         // camera.position.y = p[index-1].y;
        }
        x = x + displayWidth-150;
        if(frameCount%100===0){
          var x = random (100,displayWidth-100 )
          var y = random (50, displayHeight-50 )
          var enemy = createSprite(x,y,50,50)
          //lifetime means time span of an object (survival time)
          enemy.lifetime=100
        }
        
        //textSize(15);
        //text(allPlayers[plr].name + ": " + allPlayers[plr].distance, 120,display_position)
      }
 
    }

    if(keyIsDown(UP_ARROW) && player.index !== null){
      player.distance +=10
      player.update();
    }
    if(keyIsDown(DOWN_ARROW) && player.index !== null){
      player.distance -=10
      player.update();
    }
    if(player.distance > 3860){
      gameState = 2;
      player.rank +=1
     // Player.updateCarsAtEnd(player.rank)
    }
   
    drawSprites();
  }


  end(){
    console.log("Game Ended");
    console.log(player.rank);
  }
}
