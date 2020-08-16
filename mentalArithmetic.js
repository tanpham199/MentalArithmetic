const totalTime = 17;
const timePerTest = 5;

var numBlocks = 3;
var blocks = document.querySelectorAll(".block");
var test = document.getElementById("test");
var progressBar = document.getElementById("progressBar");
var btnReset = document.getElementById("reset");
var counter = document.getElementById("counter");
var btnMode = document.querySelectorAll(".mode");
var score = document.getElementById("score");
var detail = document.querySelectorAll(".detail");
var res, correct = 0, wrong = 0, timeOut = 0, o, sco;
var timeleft, timeleft2, timer, timer2;



init();

function init() {
    setupGameMode();
    setupBlocks();
    setupResetButton();
}

function setupGameMode() {
    for (var i = 0; i < btnMode.length; i++) {
        btnMode[i].addEventListener("click", function () {
            for (var j = 0; j < btnMode.length; j++) {
                btnMode[j].classList.remove("selected");
            }
            this.classList.add("selected");
            if (this.textContent === "Easy") {
                numBlocks = 3;
            } else {
                numBlocks = 6;
            }
        })
    }
}

function setupBlocks() {
    for (var i = 0; i < blocks.length; i++) {
        blocks[i].addEventListener("click", function () {
            var clicked = parseInt(this.textContent);
            if (clicked === res) {
                correct++;
                sco++;
            } else {
                wrong++;
                if (sco - 1 >= 0) sco--;
            }
            score.textContent = "Score: " + sco;
            refresh();
            timeleft2 = timePerTest;
        });
    }
}

function setupResetButton() {
    btnReset.addEventListener("click", function () {
        if (this.textContent === "Start" || this.textContent === "Restart") {
            correct = 0;
            wrong = 0;
            timeOut = 0;
            sco = 0;
            this.textContent = "Stop";
            progressBar.style.display = "inline-block";
            score.style.display = "inline-block";
            score.textContent = "Score: 0";
            for (var i = 0; i < btnMode.length; i++) {
                btnMode[i].style.display = "none";
            }
            refresh();
            startTimer();
            for (var i = 0; i < detail.length; i++) {
                detail[i].style.display = "none";
            }
        } else {
            timeOutHandler();
        }
    })
}

function refresh() {
    test.textContent = randomTest();
    for (var i = 0; i < numBlocks; i++) {
        blocks[i].style.display = "block";
        blocks[i].textContent = randomResults();
    }
    blocks[setRightAnswer()].textContent = res;
    progressBar.style.display = "inline-block";
}

function startTimer() {
    clearTimer();
    startProgressBar();
    startTestTimer();
}

function clearTimer() {
    progressBar.attributes[0].value = 0;
    progressBar.attributes[1].value = totalTime;
    clearInterval(timer);
    clearInterval(timer2);
}

function startProgressBar() {
    timeleft = totalTime;
    timer = setInterval(function () {
        if (timeleft <= 0) {
            timeOutHandler();
        }
        progressBar.value = totalTime - timeleft;
        timeleft -= 1;
    }, 1000);
}

function timeOutHandler() {
    btnReset.textContent = "Restart";
    score.style.display = "none";
    for (var i = 0; i < btnMode.length; i++) {
        btnMode[i].style.display = "inline-block";
    }
    clearTimer();
    clear();

}

function startTestTimer() {
    timeleft2 = timePerTest;
    timer2 = setInterval(function () {
        if (timeleft2 === 0) {
            timeleft2 = timePerTest;
            timeOut++;
            refresh();
        }
        counter.textContent = timeleft2;
        timeleft2 -= 1;
    }, 1000);
}

function clear() {
    test.textContent = "Result: " + sco;

    for (var i = 0; i < detail.length; i++) {
        detail[i].style.display = "block";
    }

    detail[0].textContent = "Correct Answers: " + correct;
    detail[1].textContent = "Wrong Answers: " + wrong;
    detail[2].textContent = "No Answers: " + timeOut;

    for (var i = 0; i < blocks.length; i++) {
        blocks[i].style.display = "none";
    }
    counter.textContent = "";
    progressBar.style.display = "none";
}

function randomTest() {
    var num1 = Math.floor(Math.random() * 500);
    var num2 = Math.floor(Math.random() * 500);
    var o = Math.floor(Math.random() * 2);
    if (o === 0) {
        res = num1 + num2;
        return num1 + " + " + num2 + " =";
    } else {
        res = num1 - num2;
        return num1 + " - " + num2 + " =";
    }
}

function randomResults() {
    var num1 = Math.floor(Math.random() * 100);
    var num2 = Math.floor(Math.random() * 100);
    return res - num1 + num2;
}

function setRightAnswer() {
    var i = Math.floor(Math.random() * numBlocks);
    return i;
}