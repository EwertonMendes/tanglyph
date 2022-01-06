import glyphMaps from "./glyphMaps";

export default {
  convertTextToGlyph({ baseText, mapName }) {
    let newText = "";
    [...baseText].forEach((letter) => {
      const glyphLetter = glyphMaps.getLetter({ letter, charMap: mapName });

      newText += glyphLetter;
    });
    return newText;
  },

  getMiddleOfString(s) {
   return s.indexOf(s.substr((s.length - 1) >>> 1, (~s.length & 1) + 1));
  },
};
