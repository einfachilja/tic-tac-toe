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
                symbol = 'o';
            } else if (fields[index] === 'cross') {
                symbol = 'x';
            }
            html += `<td>${symbol}</td>`;
        }
        html += '</tr>';
    }
    html += '</table>';

    // Set table HTML to contentDiv
    contentDiv.innerHTML = html;
}

