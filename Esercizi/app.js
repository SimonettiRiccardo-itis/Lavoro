const URL_CITTA = 'https://geocoding-api.open-meteo.com/v1/search';
const URL_METEO = 'https://api.open-meteo.com/v1/forecast';
const messaggio = document.getElementById('messaggio');
const risultato = document.getElementById('risultato');

// funzione riutilizzabile con callback (come nella teoria)
function richiediJSON(url, onSuccesso, onErrore) {
  const xhr = new XMLHttpRequest();
  xhr.onload = function () {
    if (xhr.status === 200) {
      onSuccesso(JSON.parse(xhr.responseText));
    } else {
      onErrore('Errore HTTP: ' + xhr.status);
    }
  };
  xhr.onerror = function () {
    onErrore('Errore di rete: server irraggiungibile');
  };
  xhr.ontimeout = function () {
    onErrore('Timeout della richiesta');
  };
  xhr.timeout = 5000;
  xhr.open('GET', url, true);
  xhr.send();
}

function mostraMessaggio(testo, errore) {
  messaggio.textContent = testo;
  messaggio.className = errore ? 'errore' : '';
}

function mostraErrore(testo) {
  mostraMessaggio(testo, true);
}

function mostraMeteo(citta, meteo) {
  risultato.textContent = '';
  const card = document.createElement('div');
  card.className = 'card';

  const titolo = document.createElement('h2');
  let nome = citta.name;
  if (citta.admin1) nome += ', ' + citta.admin1;
  titolo.textContent = nome + ' (' + citta.country + ')';

  const temp = document.createElement('p');
  temp.textContent = 'Temperatura: ' + meteo.current.temperature_2m + ' ' + meteo.current_units.temperature_2m;
  const vento = document.createElement('p');
  vento.textContent = 'Vento: ' + meteo.current.wind_speed_10m + ' ' + meteo.current_units.wind_speed_10m;
  const ora = document.createElement('p');
  ora.textContent = 'Aggiornato: ' + meteo.current.time;

  card.appendChild(titolo);
  card.appendChild(temp);
  card.appendChild(vento);
  card.appendChild(ora);
  risultato.appendChild(card);
  mostraMessaggio('');
}

function cerca() {
  const nomeCitta = document.getElementById('citta').value.trim();
  if (nomeCitta === '') {
    mostraErrore('Scrivi il nome di una città');
    return;
  }
  mostraMessaggio('Caricamento...');
  risultato.textContent = '';

  // 1) GET con il nome della città in query string
  const url1 = URL_CITTA + '?name=' + encodeURIComponent(nomeCitta) + '&count=1&language=it';
  richiediJSON(url1, function (dati) {
    if (!dati.results || dati.results.length === 0) {
      mostraErrore('Nessuna città trovata');
      return;
    }
    const citta = dati.results[0];

    // 2) GET con latitudine e longitudine in query string
    const url2 = URL_METEO + '?latitude=' + citta.latitude + '&longitude=' + citta.longitude +
      '&current=temperature_2m,wind_speed_10m';
    richiediJSON(url2, function (meteo) {
      mostraMeteo(citta, meteo);
    }, mostraErrore);
  }, mostraErrore);
}

document.getElementById('btnCerca').addEventListener('click', cerca);
