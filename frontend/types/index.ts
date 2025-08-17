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

export type Client=Omit<User,'roles'>

export interface Product {
    id: number;
    name: string;
    description: string;
    sellPrice: number;
    oldPrice?: number;
    stockQuantity: number;
    rating: number;
    hasLiked: boolean;
    imageUrls: string[];
    category?: { name: string };
    colors?: string[];
    brand?: string;
    discount?: string;
    tags?: string[];
    features?: string[];
    deliveryInfo?: string;
    returnPolicy?: string;
    sku?:string;
    warranty?: string;
    material?: string;
    weight?: string;
    dimensions?: string;
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
