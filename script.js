// Das Spielfeld: 9 Zellen (3x3)
let fields = [
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null
];

// aktueller Spieler (circle beginnt)
let currentPlayer = 'circle';

// initialisiert das Spiel und rendert das Spielfeld
function init() {
    render();
}

// rendert das Spielfeld in den content-Div
function render() {
    let contentDiv = document.getElementById('content');

    let html = '<table>'; // startet Tabellen-HTML
    for (let row = 0; row < 3; row++) { // für jede Zeile
        html += '<tr>'; // beginnt Tabellenzeile
        for (let col = 0; col < 3; col++) { // für jede Spalte
            let index = row * 3 + col; // berechnet Index im fields-Array
            let symbol = '';

            // wenn Kreis im Feld: SVG für Kreis
            if (fields[index] === 'circle') {
                symbol = generateCircleSVG();
            }
            // wenn Kreuz im Feld: SVG für Kreuz
            else if (fields[index] === 'cross') {
                symbol = generateCrossSVG();
            }
            // erstellt Zelle mit onclick-Handler
            html += `<td onclick="handleClick(${index}, this)">${symbol}</td>`;
        }
        html += '</tr>'; // schließt Tabellenzeile
    }
    html += '</table>'; // schließt Tabelle

    // rendert Tabelle in den content-Div
    contentDiv.innerHTML = html;
}

// erzeugt SVG-Code für animierten Kreis
function generateCircleSVG() {
    return `
        <svg width="70" height="70" viewBox="0 0 70 70">
            <circle cx="35" cy="35" r="30"
                    stroke="#00B0EF"
                    stroke-width="5"
                    fill="none"
                    stroke-dasharray="188.4"
                    stroke-dashoffset="188.4">
                <animate attributeName="stroke-dashoffset"
                         from="188.4"
                         to="0"
                         dur="250ms"
                         fill="freeze"
                         repeatCount="1"/>
            </circle>
        </svg>
    `;
}

// erzeugt SVG-Code für animiertes Kreuz
function generateCrossSVG() {
    return `
        <svg width="90" height="90" viewBox="0 0 70 70">
            <line x1="20" y1="20" x2="50" y2="50"
                  stroke="#FFC000"
                  stroke-width="5"
                  stroke-linecap="round"
                  stroke-dasharray="42.43"
                  stroke-dashoffset="42.43">
                <animate attributeName="stroke-dashoffset"
                         from="42.43"
                         to="0"
                         dur="250ms"
                         fill="freeze"
                         repeatCount="1"/>
            </line>
            <line x1="50" y1="20" x2="20" y2="50"
                  stroke="#FFC000"
                  stroke-width="5"
                  stroke-linecap="round"
                  stroke-dasharray="42.43"
                  stroke-dashoffset="42.43">
                <animate attributeName="stroke-dashoffset"
                         from="42.43"
                         to="0"
                         dur="250ms"
                         fill="freeze"
                         repeatCount="1"/>
            </line>
        </svg>
    `;
}

// behandelt Klick auf ein Spielfeld
function handleClick(index, element) {
    // prüft ob Feld leer ist
    if (!fields[index]) {
        fields[index] = currentPlayer; // setzt aktuellen Spieler in Feld

        if (currentPlayer === 'circle') {
            element.innerHTML = generateCircleSVG(); // rendert Kreis
            currentPlayer = 'cross'; // wechselt Spieler
        } else {
            element.innerHTML = generateCrossSVG(); // rendert Kreuz
            currentPlayer = 'circle'; // wechselt Spieler
        }

        element.removeAttribute('onclick'); // deaktiviert weiteres Klicken

        const winner = checkWinner(); // prüft ob jemand gewonnen hat
        if (winner) {
            drawWinningLine(winner); // zeichnet Linie über Gewinnreihe
        }
    }
}

// prüft alle Gewinnmuster ob 3 gleiche Symbole vorhanden sind
function checkWinner() {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Reihen
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Spalten
        [0, 4, 8], [2, 4, 6]           // Diagonalen
    ];

    for (let pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (fields[a] && fields[a] === fields[b] && fields[a] === fields[c]) {
            return pattern; // gibt Gewinner-Muster zurück
        }
    }
    return null; // kein Gewinner
}

// zeichnet eine weiße Linie über die Gewinnkombination
function drawWinningLine(pattern) {
    const table = document.querySelector('table'); // holt Tabelle
    const tds = table.getElementsByTagName('td'); // holt alle Zellen

    const [a, b, c] = pattern; // Indexe der Gewinnzellen

    const rectA = tds[a].getBoundingClientRect(); // Koordinaten von Feld a
    const rectC = tds[c].getBoundingClientRect(); // Koordinaten von Feld c

    // erstellt SVG-Element
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('width', table.offsetWidth);
    svg.setAttribute('height', table.offsetHeight);
    svg.style.position = 'absolute';
    svg.style.top = table.offsetTop + 'px';
    svg.style.left = table.offsetLeft + 'px';
    svg.style.pointerEvents = 'none'; // verhindert Interaktion

    // erstellt Linie im SVG
    const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    line.setAttribute('x1', rectA.left + rectA.width / 2 - table.offsetLeft);
    line.setAttribute('y1', rectA.top + rectA.height / 2 - table.offsetTop);
    line.setAttribute('x2', rectC.left + rectC.width / 2 - table.offsetLeft);
    line.setAttribute('y2', rectC.top + rectC.height / 2 - table.offsetTop);
    line.setAttribute('stroke', 'white');
    line.setAttribute('stroke-width', '5');

    svg.appendChild(line); // fügt Linie in SVG ein
    document.body.appendChild(svg); // fügt SVG auf Seite ein
}

// Setzt das Spielfeld zurück und rendert neu
function restartGame() {
    // Alle Felder auf null setzen (leeren)
    fields = [null, null, null, null, null, null, null, null, null];

    // Startspieler wieder auf 'circle' setzen
    currentPlayer = 'circle';

    // Spielfeld neu zeichnen
    render();
}
