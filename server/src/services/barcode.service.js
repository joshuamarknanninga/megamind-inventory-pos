import bwipjs from 'bwip-js';

export async function renderBarcodePng(value:string) {
  const png = await bwipjs.toBuffer({
    bcid: 'code128',
    text: value,
    scale: 3,
    height: 10,
    includetext: true
  });
  return png; // Buffer
}
