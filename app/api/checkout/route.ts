import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

export async function POST(request: NextRequest) {
  try {
    // Check if Stripe key is available
    const stripeKey = process.env.STRIPE_SECRET_KEY;
    if (!stripeKey) {
      console.error('STRIPE_SECRET_KEY is not set');
      return NextResponse.json(
        { error: 'Stripe key not configured' },
        { status: 500 }
      );
    }

    const stripe = new Stripe(stripeKey);

    const body = await request.json();
    const { teamId } = body;

    const TEAM_PRODUCTS: Record<string, { name: string; price: number }> = {
      'startup-launch': { name: 'Startup Launch Team', price: 900 },
      'social-media-growth': { name: 'Social Media Growth Team', price: 900 },
      'content-engine': { name: 'Content Engine Team', price: 900 },
      'dev-tools': { name: 'Dev Tools Team', price: 900 },
      'data-pipeline': { name: 'Data Pipeline Team', price: 900 },
      'research-squad': { name: 'Research Squad', price: 900 },
    };

    const product = TEAM_PRODUCTS[teamId];
    if (!product) {
      return NextResponse.json({ error: 'Invalid team ID' }, { status: 400 });
    }

    const origin = request.headers.get('origin') || 'https://agentforge.sh';

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: product.name,
              description: `5 specialist AI agents for your workflow`,
            },
            unit_amount: product.price,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${origin}/teams/${teamId}?success=true`,
      cancel_url: `${origin}/teams/${teamId}?canceled=true`,
      metadata: {
        teamId,
      },
    });

    console.log('Stripe session created:', session.id);
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