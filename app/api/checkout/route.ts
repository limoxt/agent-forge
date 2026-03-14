import { NextRequest, NextResponse } from 'next/server';

const TEAM_PRODUCTS: Record<string, { name: string; price: number }> = {
  'startup-launch': { name: 'Startup Launch Team', price: 900 },
  'social-media-growth': { name: 'Social Media Growth Team', price: 900 },
  'content-engine': { name: 'Content Engine Team', price: 900 },
  'dev-tools': { name: 'Dev Tools Team', price: 900 },
  'data-pipeline': { name: 'Data Pipeline Team', price: 900 },
  'research-squad': { name: 'Research Squad', price: 900 },
};

export async function POST(request: NextRequest) {
  try {
    const stripeKey = process.env.STRIPE_SECRET_KEY;
    if (!stripeKey) {
      return NextResponse.json(
        { error: 'Stripe key not configured' },
        { status: 500 }
      );
    }

    const body = await request.json();
    const { teamId } = body;

    const product = TEAM_PRODUCTS[teamId];
    if (!product) {
      return NextResponse.json({ error: 'Invalid team ID' }, { status: 400 });
    }

    const origin = request.headers.get('origin') || 'https://agentforge.sh';

    // Use fetch directly instead of Stripe SDK
    const response = await fetch('https://api.stripe.com/v1/checkout/sessions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${stripeKey}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        'payment_method_types[]': 'card',
        'mode': 'payment',
        'success_url': `${origin}/teams/${teamId}?success=true`,
        'cancel_url': `${origin}/teams/${teamId}?canceled=true`,
        'line_items[0][price_data][currency]': 'usd',
        'line_items[0][price_data][product_data][name]': product.name,
        'line_items[0][price_data][product_data][description]': '5 specialist AI agents for your workflow',
        'line_items[0][price_data][unit_amount]': String(product.price),
        'line_items[0][quantity]': '1',
        'metadata[teamId]': teamId,
      }).toString(),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error('Stripe API error:', response.status, error);
      return NextResponse.json(
        { error: `Stripe API error: ${response.status}` },
        { status: 500 }
      );
    }

    const session = await response.json();
    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error('Stripe checkout error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      { error: `Failed to create checkout session: ${errorMessage}` },
      { status: 500 }
    );
  }
}