import { useEffect, useRef } from 'react';
import JsBarcode from 'jsbarcode';

export default function Barcode({ value }:{ value:string }){
  const ref = useRef<SVGSVGElement>(null);
  useEffect(()=>{
    if(ref.current && value) JsBarcode(ref.current, value, { format:'CODE128', height:40, displayValue:true });
  },[value]);
  return <svg ref={ref} />;
}
