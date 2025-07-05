
        let score = JSON.parse(localStorage.getItem('score')) ||   {
                wins: 0,
                losses: 0,
                ties: 0
            };  
       


//*******************************************************//



        updateScoreElement();            // here we call the function , and avoid duplicasy


//****************** autoplay and stop button  ********************//

     let isAutoPlaying = false;
     let intervalId;

    // const autoplay = () => {

    // }

     function autoplay(){
     if(!isAutoPlaying){
        intervalId = setInterval( () => {
            const playerMove = pickComputerMove();
            playGame(playerMove)
        },1000);
        
        isAutoPlaying = true;

           // When the game is auto playing, change
    // the text in the button to 'Stop Playing'.
       document.querySelector('.js-auto-play-button')
      .innerHTML = 'Stop Playing';
     }
     else{
        clearInterval(intervalId);       // for stop interval we use " clearInterval "
        isAutoPlaying = false;
        
    // When the game is not playing, change
    // the text back to 'Auto Play'.
    document.querySelector('.js-auto-play-button')
      .innerHTML = 'Auto Play';
     }
       
     }


     //**************** */ using addEventListner ******************//

       // solution for exercise 12s
       document.querySelector('.js-auto-play-button')
       .addEventListener('click' ,() => {
        autoplay();
       })

       document.querySelector('.js-rock-button')
       .addEventListener('click', () => {
        playGame('rock')
       });

       document.querySelector('.js-paper-button')
       .addEventListener('click', () => {
        playGame('paper')
       });

       document.querySelector('.js-scissors-button')
       .addEventListener('click', () => {
        playGame('scissors')
       });
                            
        // we use here "body" element so that if we type anaywhere in the page we can run some code
      
        document.body.addEventListener('keydown',(event) => {
           if(event.key === 'r'){
            playGame('rock');
           }
           else if(event.key === 'p'){
             playGame('paper')
           }
           else if(event.key === 's'){
            playGame('scissors')

            // Add an if-statement condition to
            // check if 'a' was pressed.   // Solution of 12u.
           } else if(event.key === 'a'){
            autoplay();

              // Add an if-statement condition to
  // check if 'Backspace' was pressed.
           }
           else if(event.key === 'Backspcae'){
             // Update 'Backspace' to show the
            // confirmation message instead of
            // resetting the score immediately.
            //Solution for 12x
            showResetConfirmation();
           }
           resetScore();
        });


          function playGame(playerMove){

              const computerMove = pickComputerMove();           

       let result = '';

       if(playerMove === 'Scissors'){
           if( computerMove === 'Rock'){
         result = 'You lose';
       }
       else if ( computerMove === 'Paper'){
        result = 'You win';
       }
       else if( computerMove === 'Scissors'){
        result = 'Tie';
       }

    } 
    else if( playerMove === 'Paper'){
          if( computerMove === 'Rock'){
            result = 'You win';
        }
        else if ( computerMove === 'Paper'){
            result = 'Tie';
        }
        else if( computerMove === 'Scissors'){
            result = 'You lose';
        }

    }
    else if( playerMove === 'Rock'){
         if( computerMove === 'Rock'){
         result = 'Tie'; 
       }
       else if ( computerMove === 'Paper'){
        result = 'You lose';
       }
       else if( computerMove === 'Scissors'){
        result = 'You win';
       }
    }

    //***********for updating the score *************//

    if(result === 'You win'){
       score.wins += 1;

    }
    else if( result === 'You lose'){
        score.losses += 1;

    }
    else if ( result === 'Tie'){
        score.ties +=1;

    }


    //*********localStorage *****************// syntax:-   localStorage.setItem('key','value');

    localStorage.setItem('score',JSON.stringify(score));

    // .stringify :- it is used to convert the object into string



//*****************************************************//


        updateScoreElement();    // here we call the function , and avoid duplicasy


            document.querySelector('.js-result')
            .innerHTML = result ;       
            
            document.querySelector('.js-move').innerHTML
             = `   You
         <img src="images/${playerMove}-emoji.png" alt="rock" class="move-icon">
          
        <img src="images/${computerMove}-emoji.png" alt="scissor" class="move-icon">
        Computer`;


//         alert(`You picked ${playerMove}. Computer picked ${computerMove}. ${result} 
// Wins: ${score.wins},Losses: ${score.losses},Ties: ${score.ties} `);
    
    }
        
//************************************************************//


          function updateScoreElement(){
             document.querySelector('.js-score').innerHTML = `Wins: ${score.wins},Losses: ${score.losses},Ties: ${score.ties}`

          } 

        
          function pickComputerMove() {
           
             const randomNumber = Math.random();
           
               let computerMove = '' ;  

       if( randomNumber >= 0 && randomNumber < 1/3) {
          computerMove = 'Rock';
       }
       else if (randomNumber >= 1/3 && randomNumber < 2/3) {
          computerMove ='Paper';

       }
       else if (randomNumber >= 2/3 && randomNumber < 1 ){
           computerMove = 'Scissors';
       }

    //    return 'rock' ;            // whenever we call the function it will return this value , whenever we use return statement is ends up the function , so after that if want perform anything it can not give any output
          return computerMove; 
   }  

          // Solution for 12v.
       function resetScore(){
        score.wins = 0;
        score.losses = 0;
        score.ties = 0;
        localStorage.removeItem('score')       
        updateScoreElement(); 
       }
        // Solution for 12v.
       document.querySelector('.js-reset-score-button')
       .addEventListener('click',() => {
            // Solution for 12v.
           // resetScore();

           //Solution of 12x
           showResetConfirmation();
       })

               //Solution of 12x
// Function for showing the confirmation message.
         function showResetConfirmation(){
            document.querySelector('.js-reset-confirmation')
            .innerHTML = `Are you sure you want to reset the score?
            <button class = "js-reset-confirm-yes  reset-confirm-button">
            Yes
            </button>
            <button class = "js-reset-confirm-no  reset-confirm-button">
            No
            </button>` ;



            document.querySelector('.js-reset-confirm-yes')
            .addEventListener('click',() => {
                resetScore();
                hideResetConfirmation();
            });

            document.querySelector('.js-reset-confirm-no')
            .addEventListener('click',() => {
                hideResetConfirmation();
            });
         }      

         // A helper function (it helps us reuse the
        // code for hiding the confirmation message).

        function hideResetConfirmation(){
            document.querySelector('.js-reset-confirmaion')
            .innerHTML = '';
        }