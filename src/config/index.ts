export const SITE_CONFIG = {
  name: "Aura AI",
  description: "Next-Generation AI SaaS Platform",
  url: process.env.NEXT_PUBLIC_APP_URL,
  links: {
    twitter: "https://twitter.com/aura_ai",
    github: "https://github.com/aura_ai",
  },
}

export const PLANS = [
  {
    name: "Free",
    slug: "free",
    quota: 10,
    pagesPerPdf: 5,
    price: {
      amount: 0,
      priceIds: {
        test: "",
        production: "",
      },
    },
  },
  {
    name: "Pro",
    slug: "pro",
    quota: 50,
    pagesPerPdf: 25,
    price: {
      amount: 19,
      priceIds: {
        test: "price_1P3y9K...", // This should be your Stripe price ID
        production: "",
      },
    },
  },
]
