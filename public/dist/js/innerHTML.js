function showPostHTML(data) {
    let postHTML = '';
    data.forEach((post) => {
      let thumbImages = post.images;
      if (thumbImages === undefined) {
        thumbImages = 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/31/Blogger.svg/245px-Blogger.svg.png';
      } else {
        thumbImages = thumbImages[0].url;
      }
  
      const months = ['Jan', 'Fev', 'Mar','Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      const current_datetime = new Date(post.published)
      const formatted_date = months[current_datetime.getMonth()] + ' ' + current_datetime.getDate() + ', ' +  current_datetime.getFullYear()
  
      let getlabels = post.labels;
      if (getlabels === undefined) {
        getlabels = '-';
      };
  
        postHTML += `
          <div data-aos='fade-up' class='col s12 m6 l4'>
            <div class='card'>
              <div class='card-image'>
                <img class='activator' src='${thumbImages}'>
                <span class='card-title'>
                  <blockquote>
                    <b class='activator'>${getlabels}</b>
                  </blockquote>
                </span>
                <a class='btn-floating halfway-fab waves-effect waves-light red activator'><i class='material-icons'>expand_less</i></a>
              </div>
              <div class='card-content'>
                <p class='card-title activator grey-text text-darken-4'><b>${post.title.substr(0, 15)}...</b></p>
                <p>${formatted_date}</p>
                <br>
                  <div class='row'>
                    <div class='col s6'>
                      <button class='waves-effect waves-light btn-floating' onclick='favPost(this)' value='${post.id}' id='fav${post.id}' style='display : none'><i class='material-icons'>favorite_border</i></button>
                      <button class='waves-effect waves-light btn-floating' onclick='delPost(this)' value='${post.id}' id='del${post.id}' style='display : none'><i class='material-icons'>favorite</i></button>
                    </div>
                    <div class='col s6'>
                      <a class='waves-effect waves-light btn-floating right' target='_blank' href='${post.url}'><i class='material-icons'>chevron_right</i></a>
                    </div>
                  </div>
              </div>
              <div class='card-reveal'>
                <p class='card-title grey-text text-darken-4'><b>${post.title}</b><a class='btn-floating waves-effect waves-light red activator right'><i class='material-icons'>expand_more</i></a></p>
                <ul class='collection'>
                  <li class='collection-item avatar'>
                    <img src='${post.author.image.url}' alt='${post.author.displayName}' class='circle'>
                    <span class='title'>${post.author.displayName}</span>
                    <p>- Author</p>
                    <a href='${post.author.url}' class='secondary-content'><i class='material-icons'>grade</i></a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        `;
  
        checkFavorite(post.id)
        .then(() => {
            document.getElementById('fav' + post.id).style.display = 'none'
            document.getElementById('del' + post.id).style.display = 'block'
        })
        .catch(() => {
            document.getElementById('fav' + post.id).style.display = 'block'
            document.getElementById('del' + post.id).style.display = 'none'
        });
  
    }); // Api Post
    
    
    document.getElementById('loader').style.display = 'none';
    document.getElementById('postBlog').innerHTML = postHTML;
}

function showRatedTV(data) {
    let postHTML = '';
    data.forEach((post) => {
        console.log(post)
        const posterImg = `//image.tmdb.org/t/p/w500${post.poster_path}`

        const months = ['Jan', 'Fev', 'Mar','Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const current_datetime = new Date(post.first_air_date)
        const formatted_date = months[current_datetime.getMonth()] + ' ' + current_datetime.getDate() + ', ' +  current_datetime.getFullYear()
  
        postHTML += `
            <div data-aos='fade-up' class="col s12">
                <div class="card">
                    <div class="row">
                        <div class="col s12 m3">
                            <div class="card-image">
                                <img src="${posterImg}" alt="${post.name}">
                            </div>
                        </div>
                        <div class="col s12 m9">
                            <div class="card-stacked">
                                <div class="card-content">
                                    <h5>${post.name}<span class="badge red white-text">${post.vote_average}</span></h5>
                                    <p>${post.overview.substr(0, 250)}...</p>
                                  <br>
                                    <span>Rilis : ${formatted_date}</span>
                                    <p>My Vote : ${post.rating}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }); // Api Post
    
    document.getElementById('contentFilmTv').innerHTML = postHTML;
    document.getElementById('loader').style.display = 'none';
}

function showRatedMovies(data) {
  let postHTML = '';
  data.forEach((post) => {
      console.log(post)
      const posterImg = `//image.tmdb.org/t/p/w500${post.poster_path}`

      const months = ['Jan', 'Fev', 'Mar','Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      const current_datetime = new Date(post.release_date)
      const formatted_date = months[current_datetime.getMonth()] + ' ' + current_datetime.getDate() + ', ' +  current_datetime.getFullYear()

      postHTML += `
          <div data-aos='fade-up' class="col s12">
              <div class="card">
                  <div class="row">
                      <div class="col s12 m3">
                          <div class="card-image">
                              <img src="${posterImg}" alt="${post.title}">
                          </div>
                      </div>
                      <div class="col s12 m9">
                          <div class="card-stacked">
                              <div class="card-content">
                                  <h5>${post.title}<span class="badge red white-text">${post.vote_average}</span></h5>
                                  <p>${post.overview.substr(0, 250)}...</p>
                                <br>
                                  <span>Rilis : ${formatted_date}</span>
                                  <p>My Vote : ${post.rating}</p>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      `;
  }); // Api Post
  
  document.getElementById('contentFilmMovies').innerHTML = postHTML;
}