import glyphMaps from "./glyphMaps";

function _normalizeLetter(letter) {
    return letter
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

export default {
  convertTextToGlyph({ baseText, mapName }) {
    let newText = "";
    [...baseText].forEach((letter) => {
      const glyphLetter = glyphMaps.getLetter({letter, charMap: mapName});
      if (!glyphLetter) {
        const normalizedLetter = _normalizeLetter(letter)

        return (newText +=
          glyphMaps.getLetter({ letter: normalizedLetter.toLowerCase(), charMap: mapName }) ?? letter);
      }
      newText += glyphLetter;
    });
    return newText;
  },
};
