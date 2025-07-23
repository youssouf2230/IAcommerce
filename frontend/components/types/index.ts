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
  date: string;
  hasliked: boolean;  
  category: Category;
  imageUrls: string[];
}


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
