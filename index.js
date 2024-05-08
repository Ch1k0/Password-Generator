function handleInputChange(e) {
  let target = e.target;
  if (e.target.type !== "range") {
    target = document.getElementById("range");
  }
  const min = target.min;
  const max = target.max;
  const val = target.value;

  pwLength = target.value;

  target.style.backgroundSize = ((val - min) * 100) / (max - min) + "% 100%";
}

function generatePassword(characters, length) {
  let pw = "";

  for (let i = 0; i < length; i++) {
    pw += characters[Math.floor(Math.random() * characters.length)];
  }

  return pw;
}

const LCL = "abcdefghijklmnopqrstuvwxyz";
const UCL = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const NUMS = "0123456789";
const SYM = ".<+|&!*-%_>?:=";
//console.log(LCL, UCL, NUMS, SYM);

let password = "nFof49Bog4oieMpe";
const passwordOutput = document.querySelector("#password-output");
const btnCopy = document.querySelector(".svg");

const rangeInput = document.querySelector('input[type="range"]');
let pwLength = 16;

const includeLower = document.querySelector("#cbLower");
let lowerChecked = includeLower.checked;
const includeUpper = document.querySelector("#cbUpper");
let upperChecked = includeUpper.checked;
const includeNumbers = document.querySelector("#cbNums");
let numbersChecked = includeNumbers.checked;
const includeSymbols = document.querySelector("#cbSymbol");
let symbolsChecked = includeSymbols.checked;

const indicatorText = document.querySelector(".strengthIndicatorText");
const indicatorWeak = document.querySelector(".indicatorWeak");
const indicatorMedium = document.querySelector(".indicatorMedium");
const indicatorStrong = document.querySelector(".indicatorStrong");

const btnGenerate = document.querySelector(".generate");

btnCopy.addEventListener("click", () => {
  navigator.clipboard.writeText(password).then(
    function () {
      //console.log("Async: Copying to clipboard was successful!");
    },
    function (err) {
      //console.error("Async: Could not copy text: ", err);
    }
  );
});

includeLower.addEventListener("change", () => {
  lowerChecked = includeLower.checked;
});

includeUpper.addEventListener("change", () => {
  upperChecked = includeUpper.checked;
});

includeNumbers.addEventListener("change", () => {
  numbersChecked = includeNumbers.checked;
});

includeSymbols.addEventListener("change", () => {
  symbolsChecked = includeSymbols.checked;
});

rangeInput.addEventListener("input", handleInputChange);

btnGenerate.addEventListener("click", (e) => {
  e.preventDefault();
  let pwString = "";
  if (lowerChecked) {
    pwString += LCL;
  }
  if (upperChecked) {
    pwString += UCL;
  }
  if (numbersChecked) {
    pwString += NUMS;
  }
  if (symbolsChecked) {
    pwString += SYM;
  }

  let pwStrength = pwString.length * pwLength * pwLength;

  indicatorWeak.classList.remove(
    "indiFillRed",
    "indiFillYellow",
    "indiFillGreen"
  );
  indicatorMedium.classList.remove(
    "indiFillRed",
    "indiFillYellow",
    "indiFillGreen"
  );
  indicatorStrong.classList.remove(
    "indiFillRed",
    "indiFillYellow",
    "indiFillGreen"
  );

  if (pwStrength >= 19456) {
    //strong password
    indicatorWeak.classList.add("indiFillGreen");
    indicatorMedium.classList.add("indiFillGreen");
    indicatorStrong.classList.add("indiFillGreen");
    indicatorText.innerText = "Strong";
  } else if (pwStrength >= 8928) {
    //medium password
    indicatorWeak.classList.add("indiFillYellow");
    indicatorMedium.classList.add("indiFillYellow");
    indicatorText.innerText = "Medium";
  } else {
    //weak password
    indicatorWeak.classList.add("indiFillRed");
    indicatorText.innerText = "Weak";
  }

  password = generatePassword(pwString, pwLength);
  passwordOutput.innerText = password;
});

password = generatePassword(LCL + UCL + NUMS + SYM, pwLength);
passwordOutput.innerText = password;
