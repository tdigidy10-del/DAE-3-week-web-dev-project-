console.log("CyberSafe initialized.");

/* =========================================================
   VARIABLES
========================================================= */

var tipCount = 4;
var threatLevel = "HIGH";

var baseRisk = 75;
var bonusRisk = tipCount * 5;

var totalRiskScore = baseRisk + bonusRisk;

var isSignedUp = false;

/* =========================================================
   THREAT DISPLAY
========================================================= */

function displayThreatLevel() {

    var outputElement =
        document.getElementById("threat-output");

    if (
        totalRiskScore >= 90 &&
        threatLevel === "CRITICAL"
    ) {

        outputElement.textContent =
            "CRITICAL — Immediate action required!";

    }

    else if (
        totalRiskScore >= 70 ||
        threatLevel === "HIGH"
    ) {

        outputElement.textContent =
            "HIGH ⚠ — You are a potential target.";

    }

    else {

        outputElement.textContent =
            "MODERATE — Stay alert.";

    }

}

displayThreatLevel();

/* =========================================================
   BINARY BACKGROUND
========================================================= */

function generateBinaryBackground() {

    var binaryContainer =
        document.getElementById("binary-bg");

    var columns =
        Math.floor(window.innerWidth / 14);

    var rows =
        Math.floor(window.innerHeight / 22);

    var totalChars = columns * rows;

    var binaryString = "";

    for (var i = 0; i < totalChars; i++) {

        var randomBit =
            Math.round(Math.random());

        binaryString += randomBit;

        if ((i + 1) % columns === 0) {
            binaryString += "\n";
        }

    }

    binaryContainer.textContent = binaryString;

}

generateBinaryBackground();

window.addEventListener(
    "resize",
    generateBinaryBackground
);

/* =========================================================
   SIGNUP
========================================================= */

function handleSignup() {

    var usernameInput =
        document.getElementById("username").value;

    var passwordInput =
        document.getElementById("password").value;

    var messageElement =
        document.getElementById("signup-message");

    var minPasswordLength = 6;

    if (
        usernameInput !== "" &&
        passwordInput.length >= minPasswordLength
    ) {

        isSignedUp = true;

        messageElement.textContent =
            "✔ Account created! Welcome, " +
            usernameInput +
            ". Stay secure!";

        messageElement.style.color =
            "#00ff88";

    }

    else if (usernameInput === "") {

        messageElement.textContent =
            "⚠ Please enter a username.";

    }

    else {

        messageElement.textContent =
            "⚠ Password must be at least " +
            minPasswordLength +
            " characters.";

    }

}

/* =========================================================
   LOADER CANVAS GRID
========================================================= */

var canvas =
    document.getElementById("loader-canvas");

var ctx =
    canvas.getContext("2d");

var gridSpacing = 40;
var time = 0;

function resizeCanvas() {

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

}

resizeCanvas();

window.addEventListener(
    "resize",
    resizeCanvas
);

function drawGrid() {

    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );

    var cols =
        Math.ceil(canvas.width / gridSpacing);

    var rows =
        Math.ceil(canvas.height / gridSpacing);

    for (var row = 0; row < rows; row++) {

        for (var col = 0; col < cols; col++) {

            var x = col * gridSpacing;
            var y = row * gridSpacing;

            var dist = Math.sqrt(
                Math.pow(col - cols / 2, 2) +
                Math.pow(row - rows / 2, 2)
            );

            var pulse =
                Math.sin(dist * 0.4 - time * 0.05)
                * 0.5 + 0.5;

            var alpha;

            if (pulse > 0.7) {
                alpha = 0.5;
            }

            else if (pulse > 0.4) {
                alpha = 0.2;
            }

            else {
                alpha = 0.06;
            }

            var dotSize =
                pulse * 1.5 + 0.5;

            ctx.beginPath();

            ctx.arc(
                x,
                y,
                dotSize,
                0,
                Math.PI * 2
            );

            ctx.fillStyle =
                "rgba(232,28,28," +
                alpha +
                ")";

            ctx.fill();

        }

    }

    time++;

    requestAnimationFrame(drawGrid);

}

drawGrid();

/* =========================================================
   TERMINAL BOOT
========================================================= */

var bootLines = [

    "> Initializing CyberSafe Threat Detection...",
    "> Loading firewall protocols............. OK",
    "> Checking SSL certificates.............. OK",
    "> Analyzing phishing databases........... OK",
    "> Detecting suspicious activity.......... FOUND",
    "> WARNING: Phishing simulation active.",
    "> SYSTEM BOOT COMPLETE ✓"

];

var currentLine = 0;
var currentChar = 0;

var displayedText = "";

var totalLines =
    bootLines.length;

var terminalBody =
    document.getElementById("loader-t-line");

var progressBar =
    document.getElementById("loader-bar");

var progressLabel =
    document.getElementById("loader-bar-label");

var ctaWrap =
    document.getElementById("loader-cta");

function typeNextChar() {

    if (currentLine >= totalLines) {

        terminalBody.textContent =
            displayedText;

        showGetStarted();

        return;

    }

    var line =
        bootLines[currentLine];

    if (currentChar < line.length) {

        displayedText +=
            line[currentChar];

        terminalBody.textContent =
            displayedText;

        currentChar++;

        var delay;

        if (line[currentChar] === ".") {
            delay = 45;
        }

        else {
            delay = 18;
        }

        setTimeout(typeNextChar, delay);

    }

    else {

        displayedText += "\n";

        currentLine++;

        currentChar = 0;

        var progressPercent =
            (currentLine / totalLines) * 100;

        progressBar.style.width =
            progressPercent + "%";

        progressLabel.textContent =
            "LOADING... " +
            Math.floor(progressPercent) +
            "%";

        if (progressPercent >= 100) {

            progressLabel.textContent =
                "SYSTEM READY ✓";

            progressLabel.style.color =
                "#00ff88";

        }

        setTimeout(typeNextChar, 180);

    }

}

setTimeout(typeNextChar, 1200);

/* =========================================================
   SHOW BUTTON
========================================================= */

function showGetStarted() {

    setTimeout(function () {

        ctaWrap.classList.add("visible");

    }, 400);

}

/* =========================================================
   DISMISS LOADER
========================================================= */

function dismissLoader() {

    var overlay =
        document.getElementById("loader-overlay");

    var site =
        document.getElementById("site-content");

    overlay.classList.add("hidden");

    setTimeout(function () {

        overlay.style.display = "none";

        site.style.display = "block";

        setTimeout(function () {

            site.classList.add("visible");

        }, 50);

    }, 500);

}

/* =========================================================
   MOUSE GLOW EFFECT
========================================================= */

document.addEventListener(
    "mousemove",
    function (event) {

        document.documentElement.style.setProperty(
            "--mouse-x",
            event.clientX + "px"
        );

        document.documentElement.style.setProperty(
            "--mouse-y",
            event.clientY + "px"
        );

    }
);