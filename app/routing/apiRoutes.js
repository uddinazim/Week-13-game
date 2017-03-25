

var friends = require("../data/friends");


module.exports = function(app) {

  app.get("/api/friends", function(req, res) {
    res.json(friends);
  });

  


  app.post("/api/friends", function(req, res) {
 

      var newFriend = req.body;
      var differenceArray = [];

      for(var i = 0; i <newFriend.scores.length; i++){
        newFriend.scores[i] = parseInt(newFriend.scores[i]);        
      }


      for (var j=0; j<friends.length; j++){

        var totalDifference = 0;
        var compare = friends[j];
     
          for (var k=0; k<compare.scores.length; k++){

              var difference = Math.abs(compare.scores[k] - newFriend.scores[k]);
             
              totalDifference += difference; 
          }
        
        differenceArray[j] = totalDifference;

      }

      var bestFriendNumbDiff = differenceArray[0];
      var bestFriendIndex =0;
      console.log(differenceArray);

      for (var l=0; l < (differenceArray.length); l++){

        if (differenceArray[l] < bestFriendNumbDiff){
          bestFriendNumbDiff = differenceArray[l];
          bestFriendIndex = l; 
          console.log(bestFriendNumbDiff);
        }
      }

     friends.push(req.body); 
     res.json(friends[bestFriendIndex]);

  });


  app.post("/api/clear", function() {

    friends = [];
  

    console.log(friends);
  });
};