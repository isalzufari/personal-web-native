function showPostHTML(data) {
    let postHTML = '';
    data.forEach((post) => {
      let thumbImages = post.images;
      if (thumbImages === undefined) {
        thumbImages = '/dist/img/BlogBlank.png';
      } else {
        thumbImages = thumbImages[0].url;
      }
  
      const months = ['Jan', 'Feb', 'Mar','Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      const current_datetime = new Date(post.published)
      const formatted_date = months[current_datetime.getMonth()] + ' ' + current_datetime.getDate() + ', ' +  current_datetime.getFullYear()
  
      // const commentApi = post.replies.selfLink + '?key=AIzaSyDseH2DsJhfAGWuP40r2z4DHsppVWtEMZg';
  
      let getlabels = post.labels;
      if (getlabels === undefined) {
        getlabels = '-';
      };
  
        postHTML += `
          <div data-aos='fade-up' class='col s12 m6 l4'>
            <div class='card' style='width: 100%;'>
              <div class='card-image'>
                <a href='${post.url}' target='_blank' rel='nofollow'>
                  <img src='${thumbImages}' alt='${post.title}'>
                </a>
                <button class='btn-floating halfway-fab  waves-effect waves-light btn-floating red' onclick='favPost(this)' value='${post.id}' id='fav${post.id}' style='display : none'><i class='material-icons'>favorite_border</i></button>
                <button class='btn-floating halfway-fab  waves-effect waves-light btn-floating red' onclick='delPost(this)' value='${post.id}' id='del${post.id}' style='display : none'><i class='material-icons'>favorite</i></button>
              </div>
              <div class='card-content'>
                <p class="truncate">${post.title}</p>
                <p>${formatted_date}</p>
                <div class="right-align">
                  <a href="#head" onclick="getBlog('${getlabels}')">
                    <div class="chip">
                      ${getlabels}
                    </div>
                  </a>
                </div>  
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