/* Turns an array of text, returned by Notion's API, into HTML */

const escapeText = require("../helpers/escape")

module.exports = (source, options = { escape: false, noBr: false }) => {
  const output = []

  source.forEach(clip => {

    if(clip.length === 1) {
      output.push(clip[0])
    } else {
      let text = clip[0]
      const modifiers = clip[1]

      modifiers.forEach(mod => {
        const modCode = mod[0]

        if(modCode === "b") {
          text = `<strong>${text}</strong>`
        } else if(modCode === "i") {
          text = `<em>${text}</em>`
        } else if(modCode === "a") {
          text = `<a href="${mod[1]}">${text}</a>`
        } else if(modCode === "s") {
          text = `<strike>${text}</strike>`
        } else if(modCode === "h") {
          const color = mod[1].split("_")[0]
          const isBackground = mod[1].split("_").length > 1
          text = `<span class="${isBackground ? "background" : "color"}-${color}">${text}</span>`
        } else if(modCode === "c") {
          text = `<code>${text}</code>`
        } else {
          console.error("Unhandled modification in textArrayToHtml()", mod)
        }
      })

      output.push(text)
    }

  })

  let joinedOutput = output.join("")
  
  console.log(joinedOutput)

  if(options.escape) {
    joinedOutput = escapeText(joinedOutput)
  }
  
  if(!options.noBr) {
    joinedOutput = joinedOutput.replace(/\n/g, "<br>")
  }
  
  return joinedOutput
}