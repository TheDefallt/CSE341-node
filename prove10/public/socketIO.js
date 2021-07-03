

const fillList = () => {
    const nameList = document.getElementById('nameList')

    fetch('/fetchAll')
        .then(res => res.json())
        .then(data => {
            nameList.innerHTML = '';

            data.avengers.forEach(element => {
                nameList.innerHTML += `<li>${element.name}</li>`;
            });
        })
        .catch(err => {
            console.error(err)
        })
}

const addToList = () => {
    const newHero = document.getElementById('newName').value

    fetch('/insert', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ newHero })
    })
    .catch(err => {
        document.getElementById('newName').value = ''
        console.error(err)
    })

    document.getElementById('newName').value = '';

    fillList()
}

fillList();