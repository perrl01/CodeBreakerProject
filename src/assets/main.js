let answer = document.getElementById('answer');
let attempt = document.getElementById('attempt');

function guess() {
    let input = document.getElementById('user-guess');
    //add functionality to guess function here
    if (answer.value == '' || attempt.value == '') {
      setHiddenFields();
    }

    if (!validateInput(input.value)) {
      return false;
    }

    attempt.value++;

    if (getResults(input.value)) {
      setMessage('You Win! :)');
      showAnswer(true);
      showReplay();
    } else if (attempt.value >= 10) {
      setMessage('You Lose! :(');
      showAnswer(false);
      showReplay();
    } else {
      setMessage('Incorrect, try again.');
    }

    return true;
}

//implement new functions here
function setHiddenFields() {
  let value = '0000' + Math.floor(Math.random() * 10000);
  answer.value = value.slice(-4);
  attempt.value = 0;
}

function setMessage(message) {
  document.getElementById('message').innerHTML = message;
}

function validateInput(input){
  if(input.length == 4) return true;
  // if(input.length != 4){
    //setMessage('Guess must be exactly 4 characters long.');
    setMessage('Guesses must be exactly 4 characters long.');
    return false;
  // }
  // return true;
}

function getResults(input) {
  let results = document.getElementById('results');
  let result = '<div class="row"><span class="col-md-6">' + input + '</span><div class="col-md-6">';
  let good = 0;

  for (let i = 0; i < 4; i++) {
    if (answer.value[i] == input[i]) {
      result += '<span class="glyphicon glyphicon-ok"></span>';
      good += 1;
    } else if (answer.value.includes(input[i])) {
      result += '<span class="glyphicon glyphicon-transfer"></span>'
    } else {
      result += '<span class="glyphicon glyphicon-remove"></span>';
    }
  }

  result += '</div>';
  results.innerHTML += result;

  return good >= 4;
}

function showAnswer(success) {
  let code = document.getElementById('code');
  code.innerHTML = answer.value;
  code.className += success ? ' success' : ' failure'
}

function showReplay() {
  document.getElementById('guessing-div').style.display = 'none';
  document.getElementById('replay-div').style.display = 'block';
}
