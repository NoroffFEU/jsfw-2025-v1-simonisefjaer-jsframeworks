import { describe, it, expect, vi, type MockedFunction } from "vitest";
import { getOnlineShopDetails } from "../api/onlineShop";

vi.mock("../api/onlineShop", () => ({
    getOnlineShopDetails: vi.fn(),
}));

const mockedGetOnlineShopDetails =
    getOnlineShopDetails as MockedFunction<typeof getOnlineShopDetails>;

describe("getOnlineShopDetails", () => {
  it("should return online shop details", async () => {
      const mockData = {  
          id: "1",
          title: "Test Product",
          description: "This is a test product",
          price: 100,
          discountedPrice: 80,
          image: { url: "https://example.com/image.jpg" },
          rating: 4.5,
          tags: ["tag1", "tag2"],
          reviews: [
              {
                  id: "1",
                  username: "testuser",
                  rating: 5,
                  description: "Great product!"
              }
          ]
      };
            mockedGetOnlineShopDetails.mockResolvedValue(mockData);
      const result = await getOnlineShopDetails("1");
      expect(result).toEqual(mockData);
  });

    it("should throw an error if the fetch fails", async () => {
                mockedGetOnlineShopDetails.mockRejectedValue(
                    new Error("Failed to fetch product details for id: 1")
                );
        await expect(getOnlineShopDetails("1")).rejects.toThrow("Failed to fetch product details for id: 1");
    });
});
