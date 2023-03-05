const terminalObject = document.getElementById("terminal1");
const commandInput = terminalObject.querySelector('#command');
const output = terminalObject.querySelector('.output');
let commandsHistory = [];
let cas = -1;

function echo(text, attr = undefined) {
  // process the command and print the output to the terminal
  const outputLine = document.createElement('div');
  if (attr != undefined) {
    outputLine.setAttribute(attr[0], attr[1]);
  }
  outputLine.innerText = text;
  output.appendChild(outputLine);

  // scroll to the bottom of the terminal
  output.scrollTop = output.scrollHeight;
}

function clear() {
  output.innerHTML = '';
  commandsHistory = [];
  cas = -1;
}

function handleInput(event) {
  if (event.key === 'Enter') {
    const command = commandInput.value;
    commandInput.value = '';
    commandsHistory.push(command);
    cas = commandsHistory.length-1;
    // print the command to the output
    echo('> '+command, ["user", ""]);
    // process the command and print the output to the terminal
    tajnica(command);
  } else if (event.key === "ArrowUp") {
    if (cas >= 0) {
      commandInput.value = commandsHistory[cas];
      cas--;
    }
  } else if (event.key === "ArrowDown") {
    if (cas < commandsHistory.length-1) {
      cas++;
      commandInput.value = commandsHistory[cas];
    }
  }
}

function undo () {
  let c  = output.children;
  let i = c.length-1;
  while (i >= 0 && c[i].hasAttribute("user") === false) {
    i--;
  }
  if (i === -1) {
    return false;
  }
  for (let j = c.length-1; j >= i; j--) {
    output.removeChild(c[j]);
  }
  commandsHistory = [];
  cas = -1;
  return true;
}

// add event listener for enter key
commandInput.addEventListener('keydown', function(event) {
  handleInput(event);
}.bind(this));
