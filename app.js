const container = document.querySelector('#container')
const search = document.querySelector('#search');
const button = document.querySelector('#btn');
const apiurl = 'https://api.dictionaryapi.dev/api/v2/entries/en/';

const findMeaning = async () => {
    const word = search.value.trim()
    if (!word) {
        alert("Please enter a word to search.")
        return
    }

    try {
        const response = await fetch(`${apiurl}${word}`)
        if (!response.ok) throw new Error("No matching word found")

        const data = await response.json()
        displayMeaning(data)
    } catch (error) {
        alert(error.message)
    }
}

const displayMeaning = (data) => {
    // Logic to display the meaning of the word
    console.log(data);
    const voiceurl = data[0]?.phonetics[0]?.audio || data[0]?.phonetics[1].audio
    const word = data[0]?.meanings[0]?.antonyms  
    const word1 = data[0]?.meanings[0]?.synonyms[0] || data[0]?.meanings[0]?.synonyms[1] 
    container.innerHTML = `
        <p>${data[0]?.phonetic}</p>
        <audio controls src="${voiceurl}"></audio><br>
        <p><b>Part Of Speech</b> :${data[0].meanings[0]?.partOfSpeech}</p>
        <h3>Definations :</h3><p>${data[0].meanings[0]?.definitions[0]?.definition}</p>
        <p>${data[0].meanings[1]?.definitions[0]?.definition}</p>
        <p>Antonym : ${word}</p>
        <p>Synonyms : ${word1}</p>
        `
};

button.addEventListener('click', findMeaning);