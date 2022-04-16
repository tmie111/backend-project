let visitedBrew = document.getElementById('visitedBrew');

fetch('/brew_list').then(res => res.json()).then(data => {
    data.forEach(brewery => {
        findBrew(brewery.brew_id)
    }) 
})

function renderBrew(currentBrew) {
        return `<div class="card w-75">
      <div class="card-body">
        <h5 class="card-title">${currentBrew.name}</h5>
        <p class="card-text">${currentBrew.street}</p>
        <a href="#" class="btn btn-primary" onclick="handlePost('${currentBrew.id}')">Write Review</a>
      </div>
    </div> `;
}
let handlePost = (breweryId) => {
    console.log(breweryId);
    fetch('/posts', {
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

let findBrew = (brew_id) => {
    fetch(`https://api.openbrewerydb.org/breweries/${brew_id}`)
    .then((response) => response.json())
    .then((data) => {
        console.log(data);
   visitedBrew.innerHTML +=  renderBrew(data)
    })
}

