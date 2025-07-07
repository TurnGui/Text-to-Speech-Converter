let speech = new SpeechSynthesisUtterance();

let voices = [];

let voicesSelect = document.querySelector("select");

window.speechSynthesis.onvoiceschanged = () => {
    voices = window.speechSynthesis.getVoices();
    speech.voice = voices[0];

    voices.forEach((voice, i) => (voicesSelect.options[i] = new Option(voice.name, i)));
}
voicesSelect.addEventListener("change", () => {
    speech.voice = voices[voicesSelect.value];
});

document.querySelector("button").addEventListener("click", () => {
        speech.text = document.querySelector("textarea").value;
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
