const blog_url = 'https://blogger.googleapis.com/v3/blogs/3334448623930804077/posts?fetchBodies=false&fetchImages=true&key=AIzaSyDseH2DsJhfAGWuP40r2z4DHsppVWtEMZg';
const mdb_url = 'https://api.themoviedb.org/3/account/{account_id}/rated/'
const key_mdb_url = '?api_key=f8202448cdac34a2663659e9ab67564f&language=en-US&session_id=6033481a172d67a6d148caf06b57babd43213ffc&sort_by=created_at.asc&page=1'

let fetchApi = url => {
  return fetch(url, {
    headers: { 
      'Accept': 'application/json',
    }
  });
};

// Blok kode yang akan di panggil jika fetch berhasil
function status(response) {
    if (response.status !== 200) {
    console.log('Error : ' + response.status);
    // Method reject() akan membuat blok catch terpanggil
    return Promise.reject(new Error(response.statusText));
    } else {
    // Mengubah suatu objek menjadi Promise agar bisa 'di-then-kan'
    return Promise.resolve(response);
    }
}
// Blok kode untuk memparsing json menjadi array JavaScript
function json(response) {
    return response.json();
}
// Blok kode untuk meng-handle kesalahan di blok catch
function error(error) {
    // Parameter error berasal dari Promise.reject()
    console.log('Error : ' + error);
}

let pageToken = '';
let labels;

function getBlog(labels) {
  if (labels === undefined) {
    labels = '';
  } else {
    pageToken = '';
  }

  getListPost(labels)
}

function loadMore() {
  getListPost(pageToken)
  window.location.href = '#head';
}

const USER_DATA = {
  saveDataPost: {}
};

function getListPost(labels) {
  document.getElementById('changePage').style.display = 'block';
  document.getElementById('loader').style.display = 'block';
  fetchApi(blog_url + '&labels=' + labels + pageToken + '&maxResults=8')
    .then(status)
    .then(json)
    .then((data) => {
      
      showPostHTML(data.items);
      USER_DATA.saveDataPost = data.items;

      if('nextPageToken' in data){
        pageToken = '+ &pageToken=' + data.nextPageToken;;
        document.getElementById('nextPage').disabled = false;
      } else {
        document.getElementById('nextPage').disabled = true;
        pageToken = '';
      }    
    })
    .catch(error);
}

function favPost(btn) {
  const idPost = btn.value;
  const saveDataPost = USER_DATA.saveDataPost;

  const findIdPost = saveDataPost.find( ({ id }) => id === idPost);
  saveFavPost(findIdPost)

  document.getElementById('fav' + btn.value).style.display = 'none';
  document.getElementById('del' + btn.value).style.display = 'block';

}

function delPost(btn) {
  const idPost = btn.value;

  deleteFavPost(idPost)
  
  document.getElementById('fav' + btn.value).style.display = 'block';
  document.getElementById('del' + btn.value).style.display = 'none';
}

function getSaved() {
  document.getElementById('changePage').style.display = 'none';
  document.getElementById('loader').style.display = 'block';
  getAllFavTeams().then(function (post) {
    if(post[0]) {
      showPostHTML(post)
    } else {
      const postHTML = `
        <div class="card">
          <div class="card-content">
            <span class="card-title">Notifikasi</span>
            <hr>
            <p>Favorite Kosong.
            </p>
          </div>
        </div>
      `;
      document.getElementById('postBlog').innerHTML = postHTML;
      document.getElementById('loader').style.display = 'none';
    }
  });
}

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCuVIRxvlwXfT2E040CLIVHnQRReMVe300",
  authDomain: "dev-isalzufari.firebaseapp.com",
  databaseURL: "https://dev-isalzufari.firebaseio.com",
  projectId: "dev-isalzufari",
  storageBucket: "dev-isalzufari.appspot.com",
  messagingSenderId: "460839476418",
  appId: "1:460839476418:web:5368ff19295a4fba8baf5b",
  measurementId: "G-F0DB4LHYL6"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

const todoRef = firebase.database().ref().child('contact')

function contactSubmit(btn) {
  const name = document.getElementById("name").value
  const telp = document.getElementById("telephone").value
  const email = document.getElementById("email").value
  const subject = document.getElementById("subject").value
  const message = document.getElementById("message").value
  const dateNow = new Date().toLocaleDateString("en-US")

  // console.log(dateNow)

  const forms = document.getElementById('contactForm');
  Array.prototype.filter.call(forms, (form) => {
      if (form.checkValidity() === false) {
          const notifHTML = `
              <div class="card-content">
                  <span class="card-title">Notifikasi</span>
                  <hr>
                  <p>Pengisian from belum terpenuhi,
                      Coba periksa secara teliti. Terimakasih.
                  </p>
              </div>
          `;
          document.getElementById('notifContact').innerHTML = notifHTML;
      }
  });

  if (!name || !telp || !email || !subject || !message) {
      return
  }
  
  // console.log(name, telp, email, subject, message);
  saveTodo(name, telp, email, subject, message, dateNow);
  document.getElementById(btn.id).disabled = true;
}

function saveTodo(name, telp, email, subject, message, dateNow){
  const newTodo = todoRef.push();
  newTodo.set({
      done: false,
      name: name,
      telp: telp,
      email: email,
      subject: subject,
      message: message,
      date: dateNow
  });
  document.getElementById('notifContact').style.display = 'block';
  const notifHTML = `
      <div class="card-content">
          <span class="card-title">Notifikasi</span>
          <hr>
          <p>Sukses terkirim, Terimakasih.
          </p>
      </div>
  `;
  document.getElementById('notifContact').innerHTML = notifHTML;
}

function getListRatedTV() {
  // document.getElementById('changePage').style.display = 'block';
  // document.getElementById('loader').style.display = 'block';
  fetchApi(mdb_url + 'tv' + key_mdb_url)
    .then(status)
    .then(json)
    .then((data) => {
      
      // console.log(data.results)
      showRatedTV(data.results);
      // USER_DATA.saveDataPost = data.items;
   
    })
    .catch(error);
}

function getListRatedMovies() {
  // document.getElementById('changePage').style.display = 'block';
  // document.getElementById('loader').style.display = 'block';
  fetchApi(mdb_url + 'movies' + key_mdb_url)
    .then(status)
    .then(json)
    .then((data) => {
      
      // console.log(data.results)
      showRatedMovies(data.results);
      // USER_DATA.saveDataPost = data.items;
   
    })
    .catch(error);
}

function triggerDropdown() {
  console.log("hello")
  const dropdown = document.querySelectorAll('dropdown-trigger');
  M.Dropdown.init(dropdown);
}
