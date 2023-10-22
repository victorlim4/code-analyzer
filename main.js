import { analyze } from "./analyze.js";

const jsCode = `
  var x = 10;
  let y = 20;
  const z = 30;

  for(let i = 0; i < y; i++) {
    let str = "victor" + "lima"
  }
`;

analyze(jsCode);