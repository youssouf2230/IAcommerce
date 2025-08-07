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
<<<<<<< HEAD
    id: number;
    name: string;
    description: string;
    sellPrice: number;
    oldPrice?: number;
    stockQuantity: number;
    rating: number;
    imageUrls: string[];
    category?: { name: string };
    colors?: string[];
    brand?: string;
    discount?: string;
    tags?: string[];
    features?: string[];
    deliveryInfo?: string;
    returnPolicy?: string;
    warranty?: string;
    material?: string;
    weight?: string;
    dimensions?: string;
=======
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
  colors: string[],
  date: string;
  hasLiked: boolean;
  category: Category;
  imageUrls: string[];
>>>>>>> 7ed5d017b1b1294ad56300c334688b451606e6ba
}

export type Order = {
  id: number;
  contactPhone: string;
  deliveryAddress: string;
  deliveryInstructions: string;
  status: OrderStatus;
  total: number;
  date: string;
  items: OrderItem[];
  user?: Omit<User, 'roles'> | null;
  sessionId?: string | null;
};
export type OrderItem = {
  id: number;
  quantity: number;
  price: number;
  product: Product;
  
}

<<<<<<< HEAD

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
=======
export type OrderStatus =
  | "PENDING"
  | "CONFIRMED"
  | "REJECTED"
  | "PROCESSING"
  | "SHIPPED"
  | "DELIVERED"
  | "CANCELLED"
  | "RETURNED"
  | "REFUNDED";
>>>>>>> 7ed5d017b1b1294ad56300c334688b451606e6ba







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



export type CommentType = {
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
