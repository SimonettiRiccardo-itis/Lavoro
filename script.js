var xhr = new XMLHttpRequest();
xhr.open("GET", "dati.json", true);

xhr.onreadystatechange = function () {
  if (xhr.readyState === 4) {
    if (xhr.status === 200 || xhr.status === 0) {
      var dati = JSON.parse(xhr.responseText);
      creaTabella(dati);
    } else {
      document.getElementById("info").textContent = "Errore nel caricamento del file.";
    }
  }
};

xhr.send();

function creaTabella(dati) {
  var colonne = Object.keys(dati[0]);

  var html = "<table><thead><tr>";
  for (var i = 0; i < colonne.length; i++) {
    html += "<th>" + colonne[i] + "</th>";
  }
  html += "</tr></thead><tbody>";

  for (var r = 0; r < dati.length; r++) {
    html += "<tr>";
    for (var c = 0; c < colonne.length; c++) {
      var valore = dati[r][colonne[c]];
      if (valore === null) {
        valore = "";
      }
      html += "<td>" + valore + "</td>";
    }
    html += "</tr>";
  }

  html += "</tbody></table>";

  document.getElementById("contenitore").innerHTML = html;
  document.getElementById("info").textContent = dati.length + " righe caricate.";
}
