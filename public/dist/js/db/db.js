let dbPromised = idb.open("dbIsl", 1, function (upgradeDb) {
    if (!upgradeDb.objectStoreNames.contains("blogs")) {
        let blogsOS = upgradeDb.createObjectStore("blogs", {
            keyPath: "id"
        });
        blogsOS.createIndex("title", "title", {
            unique: false
        });
    }
});

function saveFavPost(post) {
    dbPromised
        .then(function (db) {
            let tx = db.transaction("blogs", "readwrite");
            let store = tx.objectStore("blogs");
            store.put(post);
            return tx.complete;
        })
        .then(function () {
            M.toast({
                html: `Post ${post.title} Saved <a class="btn-flat toast-action" onclick="getSaved()">Show</a>`,
            });
        })
        .catch(function (result) {
            console.log('Blog gagal disimpan.');
        });
}

function deleteFavPost(id) {
    dbPromised
      .then(function (db) {
        let tx = db.transaction("blogs", "readwrite");
        let store = tx.objectStore("blogs");
        store.delete(id);
        return tx.complete;
    })
    .then(function () {
        console.log("Post berhasil dihapus.");
    })
    .catch(function () {
        console.log('Post gagal dihapus.');
    });
}

function checkFavorite(id) {
    return new Promise(function (resolve, reject) {
        dbPromised
            .then(function (db) {
                let tx = db.transaction("blogs", "readonly");
                let store = tx.objectStore("blogs");
                return store.get(id);
            }).then(function (favorite) {
                if (favorite !== undefined) {
                    resolve(true);
                } else {
                    reject(false);
                }
            });
    });
}

function getAllFavTeams() {
    return new Promise(function (resolve, reject) {
        dbPromised
            .then(function (db) {
                let tx = db.transaction("blogs", "readonly");
                let store = tx.objectStore("blogs");
                return store.getAll();
            })
            .then(function (post) {
                resolve(post);
            });
    });
}
