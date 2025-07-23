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

export type Product = {
  id: number;
  name: string;
  purchasePrice: number;
  sellPrice: number;
  stockQuantity: number;
  description: string;
  oldPrice: number;
  numberOfView: number;
  rating: number;
  numberOfComments: number;
  numberOfLiked: number;
  hasLiked: boolean;
  numberOfDisliked: number;
  date: string; // ISO date string (e.g., "2025-07-23")
  category: Category;
  colors: Color[];
};

 export type category = {
  id: number;
  name: string;
  urlImage: string;
};

export type Color = {
  id: number;
  color: string;
  urlImage: string;
};
