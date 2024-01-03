const fromText = document.querySelector(".from-text");
const toText = document.querySelector(".to-text");
const exchangeIcon = document.querySelector(".exchange");
const btnTranlator = document.querySelector("button");
const icons = document.querySelectorAll(".row i");

const selectTags = document.querySelectorAll("select");
const selectFrom = selectTags[0];
const selectTo = selectTags[1];

for (let country_code in countries) {
    let selectedFrom = country_code === "en-GB" ? "selected" : "";
    let selectedTo = country_code === "ar-SA" ? "selected" : "";
    let optionFrom = `<option ${selectedFrom} value="${country_code}">${countries[country_code]}</option>`;
    let optionTo = `<option ${selectedTo} value="${country_code}">${countries[country_code]}</option>`;
    selectFrom.insertAdjacentHTML("beforeend", optionFrom);
    selectTo.insertAdjacentHTML("beforeend", optionTo);
}



// This kind of functionality is commonly seen in language translation interfaces, allowing users to easily switch between the source and target languages.
  exchangeIcon.addEventListener("click", () => {
    let tempText = fromText.value,
    tempLang = selectTags[0].value;
    fromText.value = toText.value;
    toText.value = tempText;
    selectTags[0].value = selectTags[1].value;
    selectTags[1].value = tempLang;
});

// exchangeIcon.addEventListener("click", () => { ... });
// This line adds a click event listener to an HTML element with the ID or class name "exchangeIcon." 
//When this element is clicked, the arrow function inside the parentheses will be executed.

// let tempText = fromText.value, tempLang = selectTags[0].value;: This line captures the current value of the fromText input field and the selected language in the first dropdown (selectTags[0]).
// These values are stored in temporary variables (tempText and tempLang).

fromText.addEventListener("keyup", () => {
    if(!fromText.value) {
        toText.value = "";
    }
});

btnTranlator.addEventListener("click", () => {
    // Capture the input values and selected languages
    let text = fromText.value.trim(),
        translateFrom = selectTags[0].value,
        translateTo = selectTags[1].value;
  
    // Check if the input text is empty, and if so, return without performing translation
    if (!text) return;
  
    // Set a placeholder for the toText input field while the translation is in progress
    toText.setAttribute("placeholder", "Translating...");
  
    // Construct the API URL for translation
    let apiUrl = `https://api.mymemory.translated.net/get?q=${text}&langpair=${translateFrom}|${translateTo}`;
  
    // Fetch data from the API
    fetch(apiUrl)
      .then(res => res.json())
      .then(data => {
        // Update the toText input field with the translated text
        toText.value = data.responseData.translatedText;
  
        // Iterate through the matches and update the toText value if a match is found
        data.matches.forEach(match => {
          if (match.id === 0) {
            toText.value = match.translation;
          }
        });
  
        // Set back the placeholder for the toText input field
        toText.setAttribute("placeholder", "Translation");
      });
  });
  

  icons.forEach(icon => {
    icon.addEventListener("click", ({ target }) => {
      // Check if either fromText or toText is empty, and if so, return without performing any action
      if (!fromText.value || !toText.value) return;
  
      if (target.classList.contains("fa-copy")) {
        // If the clicked icon is the copy icon
        if (target.id === "from") {
          navigator.clipboard.writeText(fromText.value);
        } else {
          navigator.clipboard.writeText(toText.value);
        }
      } else {
        // If the clicked icon is not the copy icon (assumed to be a speech synthesis icon)
        let utterance;
        if (target.id === "from") {
          utterance = new SpeechSynthesisUtterance(fromText.value);
          utterance.lang = selectTags[0].value;
        } else {
          utterance = new SpeechSynthesisUtterance(toText.value);
          utterance.lang = selectTags[1].value;
        }
        speechSynthesis.speak(utterance);
      }
    });
  });
  