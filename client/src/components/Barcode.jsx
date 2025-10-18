import { useEffect, useRef } from 'react';
import JsBarcode from 'jsbarcode';

export default function Barcode({ value = '', height = 40 }) {
  const ref = useRef(null);

  useEffect(() => {
    if (ref.current && value) {
      try {
        JsBarcode(ref.current, value, {
          format: 'CODE128',
          height,
          displayValue: true,
          lineColor: '#111',
          width: 2,
          margin: 10,
        });
      } catch (error) {
        console.error('Barcode generation failed:', error);
      }
    }
  }, [value, height]);

  return (
    <div className="flex flex-col items-center justify-center p-2">
      {value ? <svg ref={ref}></svg> : <p className="text-gray-500 text-sm">No barcode value</p>}
    </div>
  );
}
