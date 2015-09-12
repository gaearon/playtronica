const dbVersion = 1;
const request = window.indexedDB.open('playtronica', dbVersion);

let waiting = [];
let db;

request.onupgradeneeded = (e) => {
  e.target.result.createObjectStore('sounds');
};

request.onsuccess = () => {
  db = request.result;
  waiting.forEach(cb => cb());
  waiting = [];
}

function wait(cb) {
  if (db) {
    cb();
  } else {
    waiting.push(cb);
  }
}

export function put(key, file, cb) {
  wait(() => {
    const transaction = db.transaction(['sounds'], 'readwrite');
    const request = transaction.objectStore('sounds').put(file, key);
    request.onsuccess = cb;
  });
}

export function del(key, cb) {
  wait(() => {
    const transaction = db.transaction(['sounds'], 'readwrite');
    const request = transaction.objectStore('sounds').delete(key);
    request.onsuccess = cb;
  });
}

export function get(key, cb) {
  wait(() => {
    const transaction = db.transaction(['sounds'], 'readonly');
    return transaction.objectStore('sounds').get(key);
    request.onsuccess = () => cb(request.result);
  });
}