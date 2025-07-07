let speech = new SpeechSynthesisUtterance();
let voices = [];
const voicesSelect = document.querySelector("select");

function populateVoices() {
    voices = window.speechSynthesis.getVoices();

    if (voices.length === 0) {
        setTimeout(populateVoices, 100);
        return;
    }

    voicesSelect.innerHTML = ""; 
    voices.forEach((voice, i) => {
        const option = new Option(voice.name, i);
        voicesSelect.add(option);
    });

    speech.voice = voices[0];
}

populateVoices();

if ("onvoiceschanged" in window.speechSynthesis) {
    window.speechSynthesis.onvoiceschanged = populateVoices;
}

voicesSelect.addEventListener("change", () => {
    speech.voice = voices[voicesSelect.value];
});

document.querySelector("button").addEventListener("click", () => {
    speech.text = document.querySelector("textarea").value;
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(speech);
});

document.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        document.querySelector(".play-button").click();
    }
});

const textarea = document.querySelector("textarea");

let geckoInterval;
let easterEggActivated = false;

textarea.addEventListener("input", () => {
    const text = textarea.value.trim();

    if (text.toLowerCase() === "i love manu" && !easterEggActivated || text.toLowerCase() === "gecko rain" && !easterEggActivated) {
        easterEggActivated = true;
        startGeckoRain();
    } else if (text.toLowerCase() !== "i love manu" && easterEggActivated || text.toLowerCase() === "gecko rain" && !easterEggActivated) {
        easterEggActivated = false;
        stopGeckoRain();
    }
});


function startGeckoRain() {
    geckoInterval = setInterval(() => {
        const gecko = document.createElement("div");
        gecko.classList.add("gecko-egg");

        gecko.style.top = `${Math.random() * 90}vh`;
        gecko.style.left = `${Math.random() * 90}vw`;

        document.body.appendChild(gecko);

        setTimeout(() => {
            gecko.remove();
        }, 4000);
    }, 300); 
}

function stopGeckoRain() {
    clearInterval(geckoInterval);
}
