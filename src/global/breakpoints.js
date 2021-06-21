const numbers = {
  vp3:  322,
  vp4:  481,
  vp7:  769,
  vp10: 1025,
  vp12: 1281,
}

let breakpoints = {}
for (const prop in numbers) {
  breakpoints[prop] = `@media only screen and (max-width: ${numbers[prop]-1}px)`
}

export { numbers, breakpoints }
