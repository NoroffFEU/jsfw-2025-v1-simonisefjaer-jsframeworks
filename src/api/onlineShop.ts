export type onlineShopDetail = {
  id: string;
  title: string;
  description: string;
  price: number; //says float in the API for decimals but it is a number
  discountedPrice: number; //says float in the API for decimals but it is a number
  image: { url: string };
  rating: number;
  tags: Array<string>;
  reviews: Array<{
    id: string;
    username: string;
    rating: number; //says float in the API for decimals but it is a number
    description: string;
  }>;
};

export type OnlineShopProductSummary = {
  id: string;
  title: string;
  price: number;
  discountedPrice: number;
  imageUrl: string;
  rating?: number;
  description?: string;
};

const resolveImageUrl = (image: unknown, images?: unknown): string => {
  if (typeof image === "string") {
    return image;
  }

  if (image && typeof image === "object" && "url" in image) {
    return String((image as { url: unknown }).url ?? "");
  }

  if (Array.isArray(images) && images.length > 0) {
    return typeof images[0] === "string" ? images[0] : "";
  }

  return "";
};

export const getOnlineShopDetails = async (
  id: string,
): Promise<onlineShopDetail> => {
  const response = await fetch(`https://v2.api.noroff.dev/online-shop/${id}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch product details for id: ${id}`);
  }
  const json = await response.json();
  const data = json.data;
  return {
    id: data.id,
    title: data.title,
    description: data.description,
    price: data.price,
    discountedPrice: data.discountedPrice,
    image: { url: data.image?.url ?? "" },
    rating: data.rating,
    tags: data.tags ?? [],
    reviews: (data.reviews ?? []).map(
      (review: {
        id: string;
        username: string;
        rating: number;
        description: string;
      }) => ({
        id: review.id,
        username: review.username,
        rating: review.rating,
        description: review.description,
      }),
    ),
  };
};

export const getOnlineShopProducts = async (): Promise<
  OnlineShopProductSummary[]
> => {
  const response = await fetch("https://v2.api.noroff.dev/online-shop");
  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }

  const json = await response.json();
  const items = json.data ?? [];

  return items.map(
    (item: {
      id: string | number;
      title?: string;
      price?: number;
      discountedPrice?: number;
      image?: { url?: string };
      images?: Array<{ url?: string }>;
      rating?: number;
      description?: string;
    }) => ({
      id: String(item.id),
      title: String(item.title ?? ""),
      price: Number(item.price ?? 0),
      discountedPrice: Number(item.discountedPrice ?? item.price ?? 0),
      imageUrl: resolveImageUrl(item.image, item.images),
      description: String(item.description ?? ""),
      rating: item.rating,
    }),
  );
};
