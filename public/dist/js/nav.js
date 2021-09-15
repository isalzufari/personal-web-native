document.addEventListener("DOMContentLoaded", function() {
    // Activate sidebar nav
    var sidenav = document.querySelectorAll(".sidenav");
    M.Sidenav.init(sidenav); 
    
    loadNav();
  
    function loadNav() {  
      var xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function() {
        if (this.readyState == 4) {
          if (this.status != 200) return;
  
          // Muat daftar tautan menu
          document.querySelectorAll(".topnav, .sidenav").forEach(function(elm) {
            elm.innerHTML = xhttp.responseText;
          });

          // Daftarkan event listener untuk setiap tautan menu
          document
            .querySelectorAll(".sidenav a, .topnav a, footer a, .navbar a.brand-logo")
            .forEach(function(elm) {
              elm.addEventListener("click", function(event) {
                // Tutup sidenav
                var sidenav = document.querySelector(".sidenav");
                M.Sidenav.getInstance(sidenav).close();
  
                // Muat konten halaman yang dipanggil
                page = event.target.getAttribute("href").substr(1);
                loadPage(page);
              });
            });
        }
      };
      xhttp.open("GET", "nav.html", true);
      xhttp.send();
    }
  
    // Load page content
    var page = window.location.hash.substr(1);
    if (page == "") page = "hello";
    loadPage(page);
  
    function loadPage(page) {
      // fetch('pages/' + page + '.html')
      var xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function() {
        if (this.readyState == 4) {
          var content = document.querySelector("#body-content");
          
          if (this.status == 200) {
            content.innerHTML = xhttp.responseText;
            AOS.init();
          
            if (page === "blogs") {
              document.title = "Blog | SiISAL";
              getBlog()

              var toolTipped = document.querySelectorAll('.tooltipped');
              M.Tooltip.init(toolTipped);

            } else if (page === "hello") {
              document.title = "Personal Blog | SiISAL";
              
              const modalHello = document.querySelector('.modal');
              const instance = M.Modal.init(modalHello);
              instance.open();

              const helloToolTipped = document.querySelector('.tooltipped');
              M.Tooltip.init(helloToolTipped)

              const app = document.getElementById('typewriter');

              const typewriter = new Typewriter(app, {
                loop: false,
                delay: 75,
              });
              
              typewriter
                .pauseFor(1500)
                .typeString('Selamat Datang')
                .pauseFor(2500)
                .deleteChars(6)
                .typeString('Menikmati')
                .pauseFor(1000)
                .deleteAll(50)
                .typeString('Baca gak baca tetap Tengkyu.')
                .pauseFor(1000)
                .deleteChars(14)
                .typeString('i hope you enjoy it.')
                .start();
            } else if (page === "film"){
              document.title = "Film | SiISAL";
              const tab = document.querySelectorAll('.tabs')
              M.Tabs.init(tab, {
                swipeable :false
              });
              getListRatedTV()
              getListRatedMovies()
            } else if (page === "contact") {
              document.title = "Kontak | SiISAL";
            } else if (page === "about") {
              document.title = "Tentang | SiISAL";
            }
          } else if (this.status == 404) {
            document.title = "404 | Error";
            content.innerHTML = "<p>Halaman tidak ditemukan.</p>";
          } else {
            document.title = "Error";
            content.innerHTML = "<p>Ups.. halaman tidak dapat diakses.</p>";
          }
        }
      };
      xhttp.open("GET", "pages/" + page + ".html", true);
      xhttp.send();
    }
  });