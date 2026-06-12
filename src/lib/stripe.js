import 'server-only'

import Stripe from 'stripe'

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

export const PLAN_PRICE_ID = {
    'seeker_pro': 'price_1TgjiuP7aA1D1GSJIPqJ70K1',
    'seeker_premium': 'price_1Tgo1yP7aA1D1GSJNr93HnRm',
    'recruiter_growth': 'price_1Tgo38P7aA1D1GSJPcKNRqJf',
    'recruiter_enterprise': 'price_1ThLyNP7aA1D1GSJOnjgBKw3'
}
