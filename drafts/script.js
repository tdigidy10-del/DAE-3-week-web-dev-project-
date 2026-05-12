// Confirm JavaScript is running
console.log("JavaScript is working — Stay secure out there!");

// ============================================================
// VARIABLES
// ============================================================

// Integer: tracks how many tips are on the page
var tipCount = 4;

// String: the current security threat level label
var threatLevel = "HIGH";

// Boolean: tracks whether the user has signed up
var isSignedUp = false;

// Math operation: calculate a "risk score" out of 100
var baseRisk = 75;
var bonusRisk = tipCount * 5;
var totalRiskScore = baseRisk + bonusRisk;

// Log the risk score to the console
console.log("Calculated risk score: " + totalRiskScore);

// ============================================================
// THREAT LEVEL DISPLAY (DOM Output)
// Uses if/else and logical operators to set the message
// ============================================================

// This function sets the threat level text on the page
function displayThreatLevel() {
    var outputElement = document.getElementById("threat-output");

    // Check risk level using logical operators
    if (totalRiskScore >= 90 && threatLevel === "CRITICAL") {
        outputElement.textContent = "CRITICAL — Immediate action required!";
    } else if (totalRiskScore >= 70 || threatLevel === "HIGH") {
        outputElement.textContent = "HIGH ⚠ — You are a potential target.";
    } else {
        outputElement.textContent = "MODERATE — Stay alert.";
    }
}

// Run on page load
displayThreatLevel();

// ============================================================
// BINARY BACKGROUND GENERATOR
// Fills the fixed background div with random binary digits
// ============================================================

// This function creates the scrolling binary code background effect
function generateBinaryBackground() {
    var binaryContainer = document.getElementById("binary-bg");
    var columns = Math.floor(window.innerWidth / 14);
    var rows = Math.floor(window.innerHeight / 22);
    var totalChars = columns * rows;
    var binaryString = "";

    for (var i = 0; i < totalChars; i++) {
        // Randomly pick 0 or 1 using math
        var randomBit = Math.round(Math.random());
        binaryString += randomBit;
        if ((i + 1) % columns === 0) {
            binaryString += "\n";
        }
    }

    binaryContainer.textContent = binaryString;
}

generateBinaryBackground();

// Regenerate binary background when window resizes
window.addEventListener("resize", generateBinaryBackground);

// ============================================================
// SIGN-UP HANDLER
// Validates the form and shows a message on the page
// ============================================================

// This function runs when the user clicks "Create Account"
function handleSignup() {
    var usernameInput = document.getElementById("username").value;
    var passwordInput = document.getElementById("password").value;
    var messageElement = document.getElementById("signup-message");

    var minPasswordLength = 6;

    // Check if both fields are filled AND password is long enough
    if (usernameInput !== "" && passwordInput.length >= minPasswordLength) {
        isSignedUp = true;
        messageElement.textContent = "✔ Account created! Welcome, " + usernameInput + ". Stay secure!";
        messageElement.style.color = "#00ff88";
        console.log("New user signed up: " + usernameInput);
    } else if (usernameInput === "") {
        messageElement.textContent = "⚠ Please enter a username.";
    } else {
        messageElement.textContent = "⚠ Password must be at least " + minPasswordLength + " characters.";
    }
}