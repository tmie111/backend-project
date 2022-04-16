//render breweries
function renderBrew(brewArray) {
    let brewHTML = brewArray.map(function (currentBrew) {
        return `<div class="card w-75">
      <div class="card-body">
        <h5 class="card-title">${currentBrew.name}</h5>
        <p class="card-text">${currentBrew.street}</p>
        <a href="#" class="btn btn-primary" onclick="handleVisited('${currentBrew.id}')">Add to visited</a>
      </div>
    </div> `;
    });
    return brewHTML.join("");
}

//searchbar fetch API
let handleSubmit = (event) => {
    event.preventDefault();
    let brewery = event.target[0].value;

    fetch(`https://api.openbrewerydb.org/breweries/search?query=${brewery}`)
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            breweries.innerHTML = renderBrew(data);
        })
}

let handleButton = (event) =>{
    location.href = '/login'
}

let handleVisited = (breweryId) => {
    console.log(breweryId);
    fetch('/visited', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            brew_id: breweryId,
            visited: true
        })
    },
    ).then(response => response.json()).then(data => {
        console.log(data)
    })
};

let loginBtn = document.getElementById('loginBtn');
let breweries = document.getElementById('breweries');
let searchbar = document.getElementById('searchbar');
loginBtn.addEventListener('click', handleButton);
searchbar.addEventListener('submit', handleSubmit);

