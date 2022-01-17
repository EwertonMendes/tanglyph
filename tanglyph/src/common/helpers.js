import glyphMaps from "./glyphMaps";

export default {
  convertTextToGlyph({ baseText, mapName }) {
    let newText = "";
    [...baseText].forEach((letter) => {
      const glyphLetter = glyphMaps.getLetter({ letter, charMap: mapName });

      newText += glyphLetter;
    });
    return newText;
  }
};
