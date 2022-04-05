const { response } = require("express");

document.addEventListener("DOMContentLoaded", async () => {
    
    /*1. read in file 
       2. fetch answer from etymonline
       3. present option for user to guess equivalent*/
    
    let total = 10;
    let current = 0;
    let correct = 0;
    let guessedList = [];

    querySite();
    serveWord();
    

    let etymology = "french";

    /*returns nodelist*/

    function querySite() {
        //let url = 'http://jsonplaceholder.typicode.com/users'
        let url = 'https://www.etymonline.com/search?q=eat'
        let h = new Headers();
        h.append('Accept', 'application/xml');
        //h.append('Access-Control-Allow-Origin', '*');

        let req = new Request(url, {
            method: 'GET',
            headers: h,
            mode: 'no-cors'
        });

        fetch(req)
            .then((response) => {
                console.log(response);
            })
            .catch((err) => {
              console.error(err);
            });
      }

    function getWordSync() {
        str = ["beef", "venison", "ask", "help", "omnipotent"]
        return str[current];
    }

    async function getWord() {
        const data = await fetch("/word")
            .then(response => response.text)
  
        return data;
    }

    function handleSubmit() {
        console.log("submit")
        const answerEl = document.getElementById("answer-button");
        if (answerEl) {
            /*get answer */
            const choiceEL = answerEl.getElementsByTagName("button")[0];
            console.log("choice el", choiceEL);
            const choice = choiceEL.getAttribute("data-key");

            console.log("choice", choice);
            const feedCont = document.getElementById("feedback-container");
            let feedEl = document.createElement("div");
            feedCont.setAttribute("id", "feedback")
            feedCont.appendChild(feedEl)

            /*check answer & update*/
            if(choice === etymology) {
                correct = correct +1;
                const tileColor = "rgb(58, 58, 60)";
                let square = document.createElement("div");
                square.classList.add("square");
                square.textContent = 'good job';
                square.style = `background-color:${tileColor};border-color:${tileColor}`;
                feedEl.appendChild(square);
        }

        }
        else {
            alert("choose one")
        }

        


    }

    function handleDelete() {
        guessedList.pop();
        const answer = document.getElementById("answer-button");
        answer.remove();
        
    }

    /* removes word, feedback, serves new word, updates counter */
    async function serveWord() {
        /*remove any existing word  & feedback*/
        const wordExists = document.getElementById("word");
        if (wordExists) {
            wordExists.remove();
        } 

        const feedbackExists = document.getElementById("feedback");
        if (feedbackExists) {
            feedbackExists.remove();
        } 

        /*update stats elements */
        const currentEl = document.getElementById("current")
        currentEl.textContent = String(current)+"/"+ String(total);

        const correctEl = document.getElementById("correct")
        correctEl.textContent = String(correct);

        const gameBoard = document.getElementById("serve-container");
        const word = await getWord();

        const interval = 200;
        const tileColor = "rgb(58, 58, 60)";

        
        let currentWord = document.createElement("div");
        currentWord.setAttribute("id", "word");
        gameBoard.appendChild(currentWord);

        /*add word */
        for (let i = 0; i < word.length; i++) {
            setTimeout(() => {
                let square = document.createElement("div");
                square.classList.add("square");
                square.classList.add("animate__flipInX");
                square.setAttribute("id", i + 1);
                square.textContent = word.charAt(i);
                square.style = `background-color:${tileColor};border-color:${tileColor}`;
                currentWord.appendChild(square);

            }, interval*i); 
        }
        current= current +1;
           
    }

        
    function displayGuess(guess) {
        const gameBoard = document.getElementById("answer-container");
            var answerExists = document.getElementById("answer");
            if (answerExists) {
                window.alert("remove guess first")

            } else {
                let answer = document.createElement("div");
                answer.setAttribute("id", "answer-button");

                let button = document.createElement("button");
                button.addEventListener("click", handleDelete );
                button.innerHTML =guess;
                button.setAttribute("data-key", guess)

                answer.appendChild(button);
                gameBoard.appendChild(answer);
            }

    }
    const anskeys = document.querySelectorAll('div.answer-button button')
    const keys = document.querySelectorAll('.option-button button')/*returns nodelist*/

    const nextEl = document.getElementById('next')
    console.log(nextEl)
    nextEl.addEventListener("click", serveWord);

    for (let i = 0; i < anskeys.length; i++) {
        anskeys[i].onclick = ({ target }) => {
            const guess = target.getAttribute("data-key");
            /* display guess on notepad*/
            displayGuess(guess); 
        }
    };


    for (let i = 0; i < keys.length; i++) {
        keys[i].onclick = ({ target }) => {
            const guess = target.getAttribute("data-key");

            /* log the guess */
            console.log(guess);

            if (guess === "enter") {
                console.log("enter");
                handleSubmit();
                return;
              }
        
            if (guess === "del") {
                handleDelete();
                return;
            }

            guessedList.push(guess);

            /* display guess on notepad*/
            displayGuess(guess);

            /* check guess*/
        }
    };

})