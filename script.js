// Das Spielfeld: 9 Zellen (3x3)
let fields = [
    null,
    'circle',
    'circle',
    'circle',
    null,
    null,
    'cross',
    'cross',
    null
];

function init() {
    render();
}

function render() {
    let contentDiv = document.getElementById('content');

    // Generate table HTML
    let html = '<table>';
    for (let row = 0; row < 3; row++) {
        html += '<tr>';
        for (let col = 0; col < 3; col++) {
            let index = row * 3 + col;
            let symbol = '';

            if (fields[index] === 'circle') {
                symbol = generateCircleSVG();
            } else if (fields[index] === 'cross') {
                symbol = generateCrossSVG();
            }
            html += `<td>${symbol}</td>`;
        }
        html += '</tr>';
    }
    html += '</table>';

    // Set table HTML to contentDiv
    contentDiv.innerHTML = html;
}

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
