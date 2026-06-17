// Lightweight client-side safety net: if a follow-up signals distress or an
// unsafe home situation, the UI surfaces a gentle support note in addition to
// Khatun's (already gentle) reply. Errs toward kindness; false positives only
// show a caring message.
const PATTERNS = [
  // Mongolian
  /амиа/i,
  /амьдрахаа болих/i,
  /үхэхийг/i,
  /үхмээр/i,
  /зод(ож|сон|до|уул)/i,
  /хүчирхийл/i,
  /дээрэлх/i,
  /айж байна/i,
  /гэрт.{0,12}аюул/i,
  /надад туслаач/i,
  // English
  /suicide/i,
  /kill myself/i,
  /hurt myself/i,
  /self[ -]?harm/i,
  /abus(e|ing|ed)/i,
  /hitting me/i,
  /unsafe at home/i,
  /afraid for my/i,
]

export function detectDistress(text = '') {
  return PATTERNS.some((p) => p.test(text))
}
