// Custom remark plugin
const visit = require("unist-util-visit");

module.exports = ({ markdownAST }) => {
    visit(markdownAST, "html", node => {
        if (node.value.includes("<!-- alphatab:")) {
            const filename = node.value.match(/'(.+)'/)[1];
            const filenameSoundfont = filename.replace('.gp', '.sf2');
            const simpleFilename = filename.replace(/\.gp$/, '').replace(/[^a-zA-Z0-9]/g, '_');
            console.log(filename);
            console.log(filenameSoundfont);
            node.type = "html";
            node.value = `
                <div class="alphaTabWrapper" id="wrapper-${simpleFilename}">
                    <button class="playPauseButton at-button" onclick="document.getElementById('${simpleFilename}').alphaTabApi.playPause()">Play/Pause</button>
                    <div id="${simpleFilename}" class="alphaTab" data-file="${filename}" data-soundfont="${filenameSoundfont}"></div>
                </div>
            `;
        }
    });
};
