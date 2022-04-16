let handlePosts = (e) => {
    e.preventDefault();
    let title = e.target.title.value;
    let review = e.target.body.value;
    let brew_id = e.target.brew_id.value;

    let body = {
        title: title,
        review: review,
        brew_id: brew_id
    }

    fetch('/posts', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    }).then(res => res.json())
    .then((data) => {
        console.log(data)
        location.href = '/dashboard'
    });
};


let review = document.getElementById('review-form');
review.addEventListener('submit', handlePosts);