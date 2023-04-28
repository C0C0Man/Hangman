//Initial References
const letterContainer = document.getElementById("letter-container");
const optionsContainer = document.getElementById("options-container");
const userInputSection = document.getElementById("user-input-section");
const playAgainBtn = document.getElementById('play-button');
const finalMessage = document.getElementById('final-message');

const figureParts= document.querySelectorAll(".figure-part");

//Options values for buttons
let options = {
    start: ["Apple", "Blueberry", "Mandarin", "Pineapple", "Pomegranate", "Watermelon", "Hedgehog", "Rhinoceros", "Squirrel", "Panther", "Walrus", "Zebra"],
}

//count
let winCount = 0;
let count = 0;

let chosenWord = "";

//Display option buttons
const displayOptions = () => {
    optionsContainer.innerHTML += `<h3>Please Select An Option</h3>`;
    let buttonCon = document.createElement("div");
    for (let value in options) {
      buttonCon.innerHTML += `<button class="options" onclick="generateWord('${value}')">${value}</button>`;
    }
    optionsContainer.appendChild(buttonCon);
  };
  
  //Block all the Buttons
  const blocker = () => {
    let optionsButtons = document.querySelectorAll(".options");
    let letterButtons = document.querySelectorAll(".letters");
    //disable all options
    optionsButtons.forEach((button) => {
      button.disabled = true;
    });
  
    //disable all letters
    letterButtons.forEach((button) => {
      button.disabled.true;
    });
    newGameContainer.classList.remove("hide");
  };

  //Word Generator
const generateWord = (optionValue) => {
    let optionsButtons = document.querySelectorAll(".options");
    //If optionValur matches the button innerText then highlight the button
    optionsButtons.forEach((button) => {
      if (button.innerText.toLowerCase() === optionValue) {
        button.classList.add("active");
      }
      button.disabled = true;
    });

  //initially hide letters, clear previous word
  letterContainer.classList.remove("hide");
  userInputSection.innerText = "";

  let optionArray = options[optionValue];
  //choose random word
  chosenWord = optionArray[Math.floor(Math.random() * optionArray.length)];
  chosenWord = chosenWord.toUpperCase();

  //replace every letter with span containing dash
  let displayItem = chosenWord.replace(/./g, '<span class="dashes">_</span>');

  //Display each element as span
  userInputSection.innerHTML = displayItem;
};

//Initial Function (Called when page loads/user presses new game)
const initializer = () => {
    winCount = 0;
    count = 0;

    
  
    //Initially erase all content and hide letteres and new game button
    userInputSection.innerHTML = "";
    optionsContainer.innerHTML = "";
    letterContainer.classList.add("hide");

    //to reset hangman
    figureParts.forEach((part,index) => {
                    
        if(index < count) {
            part.style.display = 'block';
        }
        else{
            part.style.display = 'none';
        }
    })

    // newGameContainer.classList.add("hide");
    letterContainer.innerHTML = "";
  
    //For creating letter buttons
    for (let i = 65; i < 91; i++) {
      let button = document.createElement("button");
      button.classList.add("letters");
      //Number to ASCII[A-Z]
      button.innerText = String.fromCharCode(i);
      //character button click
      button.addEventListener("click", () => {
        let charArray = chosenWord.split("");
        let dashes = document.getElementsByClassName("dashes");
        //if array contains clciked value replace the matched dash with letter else draw on figure part
        if (charArray.includes(button.innerText)) {
          charArray.forEach((char, index) => {
            //if character in array is same as clicked button
            if (char === button.innerText) {
              //replace dash with letter
              dashes[index].innerText = char;
              //increment counter
              winCount += 1;
              //if winCount equals word length
              if (winCount == charArray.length) {
                finalMessage.innerHTML = `You Win!! The word was <span>${chosenWord}</span>`;
                //block all buttons
                var nodes = document.getElementById("container").getElementsByTagName('*');
        for(var i = 0; i < nodes.length; i++){
     nodes[i].disabled = true;
        }  
              }
            }
          });
        } else {
          //lose count
          count += 1;
          //Draw figure
          figureParts.forEach((part,index) => {
                    
            if(index < count) {
                part.style.display = 'block';
            }
            else{
                part.style.display = 'none';
            }
            //Check if lost
    if(count === figureParts.length){
        finalMessage.innerText = 'Unfortunately you lost.';
        //Block all buttons
        var nodes = document.getElementById("container").getElementsByTagName('*');
        for(var i = 0; i < nodes.length; i++){
     nodes[i].disabled = true;
        }  
        
    }
        });
        }
        
        //disable clicked button
        button.disabled = true;
      });
      letterContainer.append(button);
    }
    
    
    displayOptions();
    //Call to canvasCreator (for clearing previous canvas and creating initial canvas)
  };

  playAgainBtn.addEventListener('click', () => {
    finalMessage.innerText = '';
    /*figureParts.foreach(figurePart => {
        figurePart.display = 'none';
    });*/
    initializer();
});

  window.onload = initializer;