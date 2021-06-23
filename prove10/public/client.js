const fillList = () => {
    const nameList = document.getElementById('nameList')

    fetch('/app/fetchAll')
        .then(res => res.json())
        .then(data => {
            //Data code
        })
        .catch(err => {
            console.error(err)
        })
}

console.log(window.location);

fillList();