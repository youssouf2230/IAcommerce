
export type Category = {
      id: number;
      name: string;
      urlImage: string;
  }


  export type User = {
      id: number;
      email: string;
      username: string;
      roles: string[];
  }

  export interface Product {
    id: number;
    name: string;
    purchasePrice: number;       
    sellPrice: number;
    oldPrice: number;
    stockQuantity: number;
    description: string;
    numberOfView: number;
    rating: number;
    numberOfComments: number;
    numberOfLiked: number;
    numberOfDisliked: number;
    colors : string[],
    date: string;
    hasLiked: boolean;
    category: Category;
    imageUrls: string[];
  }


  export type category = {
    id: number;
    name: string;
    urlImage: string;
  };

  export type CommentProps = {
      id: number;
      content: string;
      rating: number;
      authorName: string;
      createdAt: string;

  };



  export type CommentType= {
    id: number;
    content: string;
    rating: number; // from 1 to 5
    createdAt: string; // ISO date string, e.g. "2025-07-25T18:00:00Z"
    authorName: string;
    productId: number; // reference to Product ID (since product is @JsonIgnore in backend)
    userId?: number | null; // optional user ID (nullable)
  }

  export type CartItem = {
      id: number;
      quantity: number;
      product: Product;
  };

  export type Cart = {
      id: number;
      sessionId?: string;
      user?: object;
      items: CartItem[];
  };

