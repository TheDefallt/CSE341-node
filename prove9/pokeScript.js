const list = document.getElementById("swData")
const prevB = document.getElementById("prev")
const nextB = document.getElementById("next")
let pageURLnext = "";
let pageURLprev = "";
let pagelist = 0;
let navi = document.getElementById("navigate");

fetch("https://swapi.dev/api/starships/")
    .then(response => response.json())
    .then((data) => {
        pagelist = (Math.ceil(data.count / 10))
        for (let i = 1; i <= pagelist; i++) {
            let num = document.createElement("input")
            num.setAttribute("type", "button");
            num.setAttribute("value", i);
            navi.appendChild(num)
            num.addEventListener('click', () => fetchData(`https://swapi.dev/api/starships/?page=${i}`), false)
        }
    });

fetchData("https://swapi.dev/api/starships/")

function fetchData(fetchURL) {
    list.innerHTML = "";
    if (fetchURL !== null) {
        fetch(fetchURL)
        .then(response => response.json())
        .then((data) => {
            let obj = Object.entries(data.results);
            pageURLnext = data.next;
            pageURLprev = data.previous;
            if(pageURLnext !== null && pageURLnext.search('https:') <0) {
                pageURLnext = pageURLnext.replace('http:', 'https:')
            }
            if(pageURLprev !== null && pageURLprev.search('https:') <0) {
                pageURLprev = pageURLprev.replace('http:', 'https:')
            }
            obj.forEach(item => {
                let lItem = document.createElement("li");
                lItem.textContent = item[1].name;
                list.appendChild(lItem);
            })
        })
    } else {
        let lItem = document.createElement("li");
        lItem.textContent = "No items found";
        list.appendChild(lItem);
    }
}
prevB.addEventListener('click', () => fetchData(pageURLprev), false);
nextB.addEventListener('click', () => fetchData(pageURLnext), false);

