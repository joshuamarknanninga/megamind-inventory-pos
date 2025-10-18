import { Client, Environment } from 'square';
const client = new Client({
  accessToken: process.env.SQUARE_ACCESS_TOKEN,
  environment: process.env.SQUARE_ENV === 'production' ? Environment.Production : Environment.Sandbox
});

export async function createPaymentLink(totalCents:number, note:string) {
  const { result } = await client.checkoutApi.createPaymentLink({
    idempotencyKey: crypto.randomUUID(),
    description: note,
    quickPay: {
      locationId: process.env.SQUARE_LOCATION_ID!,
      name: 'Megamind POS',
      priceMoney: { amount: BigInt(totalCents), currency: 'USD' }
    }
  });
  return result.paymentLink?.url;
}
