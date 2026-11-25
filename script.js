var xhr = new XMLHttpRequest();
xhr.open("GET", "dati.json");

xhr.onload = function () {
  var dati = JSON.parse(xhr.responseText);
  var colonne = Object.keys(dati[0]);

  var html = "<table border='1'><tr>";
  for (var i = 0; i < colonne.length; i++) {
    html += "<th>" + colonne[i] + "</th>";
  }
  html += "</tr>";

  for (var r = 0; r < dati.length; r++) {
    html += "<tr>";
    for (var c = 0; c < colonne.length; c++) {
      html += "<td>" + dati[r][colonne[c]] + "</td>";
    }
    html += "</tr>";
  }

  html += "</table>";
  document.getElementById("tabella").innerHTML = html;
};

xhr.send();
