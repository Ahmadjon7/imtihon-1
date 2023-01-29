const url = "https://api.dictionaryapi.dev/api/v2/entries/en/";
const result = document.getElementById("result");
const sound = document.getElementById("sound");
const btn = document.getElementById("search-btn");
const form = document.querySelector('.serch-form')


form.addEventListener("submit", (e) => {
    e.preventDefault()
    let inpWord = document.getElementById("inp-word").value;

    fetch(`${url}${inpWord}`)
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            const item = document.createElement('li')
            item.className = 'card serch-item '
            item.innerHTML = `
                <div class="word d-flex gap-3 align-items-center">
                    <h3>${inpWord}</h3>-
                    <p>${data[0].phonetic}</p>
                </div>
                <p class="word-meaning">
                   ${data[0].meanings[0].definitions[0].definition}
                </p>
                <p class="word-example ms-3">
                    <strong>Example:</strong>${data[0].meanings[0].definitions[0].example || ""}
                </p>
                <p class="word-meaning">
                    ${data[0].meanings[0].definitions[1].definition}
                </p>
                <p class="word-example ms-3">
                    <strong>Example:</strong>${data[0].meanings[0].definitions[0].example || ""}
                </p>
                <p class="word-meaning">
                    ${data[0].meanings[0].definitions[2].definition}
                </p>
                `;
                const elAudio =document.createElement('audio')
                elAudio.src = `${data[0].phonetics[0].audio}`
                elAudio.controls = "auto"
                result.appendChild(item)
                item.appendChild(elAudio)
            })
            .catch(() => {
                result.innerHTML = `<h3 class="error">Couldn't Find The Word</h3>`
        });
    });

