import glyphMaps from "./glyphMaps";

export default {
  convertTextToGlyph({ baseText, mapName }) {
    let newText = "";
    [...baseText].forEach((letter) => {
      if (!glyphMaps[mapName][letter.toLowerCase()]) {
        const normalizedLetter = letter
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "");

        return (newText +=
          glyphMaps[mapName][normalizedLetter.toLowerCase()] ?? letter);
      }
      newText += glyphMaps[mapName][letter.toLowerCase()];
    });
    return newText;
  },
};
