# Progetto XHR - Mini Dashboard Meteo

Esercitazione su AJAX con XMLHttpRequest (classi quinte).
La home (`index.html`) è il progetto finale, poi ci sono i 4 esercizi (`es1.html` ... `es4.html`).

## Tecnologie
- HTML, CSS, JavaScript
- XMLHttpRequest (niente fetch, niente librerie)
- API pubbliche: Open-Meteo (https://open-meteo.com) e JSONPlaceholder (Es.4)

## Come avviare
Non aprire i file con `file://` (CORS), serve un server locale:

```
python -m http.server
```

poi vai su http://localhost:8000

Sito online (Vercel): *incolla qui il link*

## Cosa fa il progetto
- l'utente scrive il nome di una città (anche parziale, es. "Rom")
- prima GET: cerca la città per nome (`?name=Roma`) e ricava latitudine e longitudine
- seconda GET: chiede il meteo con latitudine e longitudine in query string
- la risposta (`responseText`) viene trasformata con `JSON.parse` e mostrata nel DOM
- gestisce errori di rete, timeout, errori HTTP, campo vuoto e città non trovata

## Risposte alle domande

**Es.1 - Cosa significa `readyState === 4`?**
Che la richiesta è terminata (stato DONE) e la risposta è arrivata. Non dice se è andata bene o male.

**Es.1 - Perché serve `status === 200`?**
Perché 200 è il codice HTTP "OK": la risorsa è stata trovata. Senza controllarlo si leggerebbe anche la risposta di un errore (404, 500...).

**Es.1 - Cosa succede se metto `false` come terzo parametro di `open()`?**
La richiesta diventa sincrona: blocca la pagina finché il server non risponde. È deprecato e sconsigliato.

**Es.4 - Perché `send()` deve stare dopo `open()`?**
`open()` prepara la richiesta (metodo, URL, async) e `send()` la manda. Se si chiama `send()` prima, la richiesta è ancora in stato 0 (UNSENT) e il browser genera un'eccezione. Anche `setRequestHeader()` va messo tra `open()` e `send()`.

## Autore
*Nome Cognome - Classe*
