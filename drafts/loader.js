// =============================================
// loader.js — CyberSafe Boot Screen
// =============================================

console.log("CyberSafe loader initializing...");

// ===== BACKGROUND GRID ANIMATION =====
// Draws an animated dot grid on the canvas behind everything

var canvas = document.getElementById("grid-canvas");
var ctx = canvas.getContext("2d");

// Integer: spacing between each dot in the grid
var gridSpacing = 40;

// Integer: tracks animation frame time for wave effect
var time = 0;

// Make canvas fill the whole screen
function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

resizeCanvas();
window.addEventListener("resize", resizeCanvas);

// Draws each frame of the animated grid
function drawGrid() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  var cols = Math.ceil(canvas.width / gridSpacing);
  var rows = Math.ceil(canvas.height / gridSpacing);

  // Loop through every grid position
  for (var row = 0; row < rows; row++) {
    for (var col = 0; col < cols; col++) {

      var x = col * gridSpacing;
      var y = row * gridSpacing;

      // Math: sine wave to make dots pulse in a ripple pattern
      var dist = Math.sqrt(
        Math.pow(col - cols / 2, 2) + Math.pow(row - rows / 2, 2)
      );
      var pulse = Math.sin(dist * 0.4 - time * 0.05) * 0.5 + 0.5;

      // if/else: brighter dots near center of ripple
      var alpha;
      if (pulse > 0.7) {
        alpha = 0.6;
      } else if (pulse > 0.4) {
        alpha = 0.25;
      } else {
        alpha = 0.08;
      }

      // Math: dot size also pulses
      var dotSize = pulse * 1.5 + 0.5;

      ctx.beginPath();
      ctx.arc(x, y, dotSize, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(0, 245, 255, " + alpha + ")";
      ctx.fill();
    }
  }

  time = time + 1;
  requestAnimationFrame(drawGrid);
}

drawGrid();

// ===== TERMINAL TYPING ANIMATION =====
// Types out lines of fake system boot messages one by one

// Array of strings: the fake boot messages to display
var bootLines = [
  "> Initializing CyberSafe Threat Detection System...",
  "> Loading firewall protocols.............. OK",
  "> Scanning network interfaces............. OK",
  "> Checking SSL certificates............... OK",
  "> Analyzing phishing databases............ LOADED",
  "> Mounting awareness modules.............. OK",
  "> Detecting suspicious activity........... FOUND",
  "> WARNING: Phishing simulation prepared.",
  "> All systems nominal. Ready to deploy.",
  "> SYSTEM BOOT COMPLETE. ✓"
];

// Integer: which line we're currently typing
var currentLine = 0;

// Integer: which character in the current line we're on
var currentChar = 0;

// String: all the text shown in the terminal so far
var displayedText = "";

// Integer: total boot lines count
var totalLines = bootLines.length;

// Math: progress percentage per line
var progressPerLine = 100 / totalLines;

var terminalBody = document.getElementById("t-line");
var progressBar = document.getElementById("progress-bar");
var progressLabel = document.getElementById("progress-label");
var ctaWrap = document.getElementById("cta-wrap");

// This function types one character at a time — like a typewriter
function typeNextChar() {

  // if/else: check if we've finished all lines
  if (currentLine >= totalLines) {
    // Boot is complete — show the GET STARTED button
    terminalBody.textContent = displayedText;
    showGetStarted();
    return;
  }

  var line = bootLines[currentLine];

  // if/else: still typing the current line
  if (currentChar < line.length) {
    displayedText = displayedText + line[currentChar];
    terminalBody.textContent = displayedText;
    currentChar = currentChar + 1;

    // Math: typing speed — special chars slightly slower for drama
    var delay;
    if (line[currentChar] === ".") {
      delay = 60;
    } else {
      delay = 22;
    }

    setTimeout(typeNextChar, delay);

  } else {
    // Finished this line — move to next
    displayedText = displayedText + "\n";
    currentLine = currentLine + 1;
    currentChar = 0;

    // Math: update progress bar
    var progressPercent = (currentLine / totalLines) * 100;
    progressBar.style.width = progressPercent + "%";
    progressLabel.textContent =
      "LOADING... " + Math.floor(progressPercent) + "%";

    // if/else with logical operator: last line gets special label
    if (currentLine >= totalLines && progressPercent >= 100) {
      progressLabel.textContent = "SYSTEM READY ✓";
      progressLabel.style.color = "#39ff6e";
    }

    console.log("Boot line " + currentLine + " of " + totalLines + " complete.");

    // Pause briefly between lines before typing the next one
    setTimeout(typeNextChar, 180);
  }
}

// Wait a moment for the page to load before starting to type
setTimeout(typeNextChar, 1400);

// ===== SHOW GET STARTED BUTTON =====
// This function reveals the button once loading is done

function showGetStarted() {
  // Small delay so the last line has time to settle
  setTimeout(function () {
    ctaWrap.classList.add("visible");
    console.log("Boot complete. GET STARTED button is now visible.");
  }, 500);
}
