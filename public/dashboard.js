let visitedBrew = document.getElementById('visitedBrew');


fetch('/brew_list').then(res => res.json()).then(data => {
    data.forEach(brewery => {
        findBrew(brewery.brew_id)
    }) 
})

fetch('/user_post').then(res => res.json()).then(data => {
    data.forEach(post => {
        findPost(post.user_id)
    }) 
})

function renderBrew(currentBrew) {
        return `<div class="brewCard"><div class="card w-75">
      <div class="card-body">
        <h5 class="card-title">${currentBrew.name}</h5>
        <p class="card-text">${currentBrew.street}</p>
        <a href="#" class="btn btn-primary" onclick="handlePost('${currentBrew.id}')">Write Review</a>
      </div>
    </div> 
    </div>`;
}
function renderNewBrew(brewArray) {
    let newBrewHTML = brewArray.map(function (currentBrew) {
        return `<div class="brewCard"><div class="card w-75">
      <div class="card-body">
        <h5 class="card-title">${currentBrew.name}</h5>
        <p class="card-text">${currentBrew.street}</p>
        <a href="#" class="btn btn-primary" onclick="handleVisited('${currentBrew.id}')">Add to visited</a>
      </div>
    </div>
    </div> `;
    });
    return newBrewHTML.join("");
}

function renderPost(currentPost) {
    return`<div class="card w-75">
    <div class="card-body">
      <h5 class="card-title">${currentPost.title}</h5>
      <p class="card-text">${currentPost.body}</p>
    </div>
  </div>`
}
let handleSubmit = (event) => {
    event.preventDefault();
    let brewery = event.target[0].value;

    fetch(`https://api.openbrewerydb.org/breweries/search?query=${brewery}`)
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            breweries.innerHTML = renderNewBrew(data);
        })
}

let handlePost = (breweryId) => {
    console.log(breweryId);
    location.href = '/posts/' + breweryId;
};

let findBrew = (brew_id) => {
    fetch(`https://api.openbrewerydb.org/breweries/${brew_id}`)
    .then((response) => response.json())
    .then((data) => {
        console.log(data);
   visitedBrew.innerHTML +=  renderBrew(data)
    })
}

let findPost = (user_id) => {
    fetch(`/user_post`)
    .then((response) => response.json())
    .then((data) => {
        console.log(data);
   reviews.innerHTML +=  renderPost(data)
    })
}

let reviews = document.getElementById('reviews');
let breweries = document.getElementById('breweries');
let searchbar = document.getElementById('searchbar');
searchbar.addEventListener('submit', handleSubmit);