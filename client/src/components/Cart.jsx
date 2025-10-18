import { useMemo } from 'react';
import { useApp } from '../lib/store';
import { api } from '../lib/api';

export default function Cart(){
  const { cart, clearCart } = useApp();
  const totals = useMemo(()=>{
    const subtotal = cart.reduce((s,c)=>s+c.price*c.qty,0);
    const tax = +(subtotal*0.0825).toFixed(2);
    const total = +(subtotal+tax).toFixed(2);
    return { subtotal, tax, total };
  },[cart]);

  const checkout = async ()=>{
    // create pending sale then request Square link
    const sale = await api.post('/sales', {
      storeId: (window as any).CURRENT_STORE,
      items: cart.map(c=>({ itemId:c.itemId, name:c.name, price:c.price, qty:c.qty })),
      subtotal: totals.subtotal, tax: totals.tax, total: totals.total
    });
    const link = await api.post('/square/link', { saleId: sale.data._id });
    window.open(link.data.url, '_blank');
    clearCart();
  };

  return (
    <div className="border rounded p-2">
      <h3 className="font-semibold mb-2">Cart</h3>
      {cart.map(c=><div key={c.itemId} className="flex justify-between text-sm"><span>{c.name} x{c.qty}</span><span>${(c.price*c.qty).toFixed(2)}</span></div>)}
      <div className="border-t mt-2 pt-2 text-sm">
        <div className="flex justify-between"><span>Subtotal</span><span>${totals.subtotal.toFixed(2)}</span></div>
        <div className="flex justify-between"><span>Tax</span><span>${totals.tax.toFixed(2)}</span></div>
        <div className="flex justify-between font-semibold"><span>Total</span><span>${totals.total.toFixed(2)}</span></div>
      </div>
      <button className="mt-3 w-full bg-green-600 text-white py-2 rounded" onClick={checkout}>Take Payment (Square)</button>
    </div>
  );
}
