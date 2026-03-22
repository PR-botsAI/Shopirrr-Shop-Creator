export const PRODUCT_CARD_FRAGMENT = `#graphql
  fragment ProductCard on Product {
    id title handle
    priceRange { minVariantPrice { amount currencyCode } }
    featuredImage { id url altText width height }
    variants(first: 1) {
      nodes { id availableForSale selectedOptions { name value } }
    }
    tags
  }
`;

export const COLLECTION_CARD_FRAGMENT = `#graphql
  fragment CollectionCard on Collection {
    id title handle description
    image { id url altText width height }
  }
`;
