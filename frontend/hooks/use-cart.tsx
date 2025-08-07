'use client'
import { API_BASE_URL, getOrCreateSessionId } from '@/lib/utils';
import { Cart, CartItem, Product } from '@/types';
import axios, { AxiosError } from 'axios';
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { toast } from 'sonner';



type CartContextType = {
    cartItems: CartItem[];
    totalItems: number;
    cartId: number | null;
    totalPrice: number;
    isLoading: boolean; // Add a loading state for better UX
    addToCart: (product: Product) => Promise<void>;
    removeItem: (itemId: number) => Promise<void>;
    updateQuantity: (itemId: number, newQuantity: number) => Promise<void>;
    refetchCart: () => Promise<void>;
    clearCart: () => void;

};


const CartContext = createContext<CartContextType | undefined>(undefined);

type CartProviderProps = {
    children: React.ReactNode;
};


export const CartProvider = ({ children }: CartProviderProps) => {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [cartId, setCartId] = useState<number | null>(null);
    const [isLoading, setIsLoading] = useState(true); // Initial load is true

    // 4. Create a single, reusable function to fetch/refresh the cart state
    const refetchCart = useCallback(async () => {
        setIsLoading(true);
        try {
            const sessionId = getOrCreateSessionId();
            const response = await axios.get<{ content: Cart[] } | Cart[]>(
                `${API_BASE_URL}/api/cart`,
                {
                    params: { sessionId, page: 0, size: 10 },
                    withCredentials: true,
                }
            );

            const carts = Array.isArray(response.data) ? response.data : response.data.content;


            if (carts && carts.length > 0) {
                const currentCart = carts[0];
                setCartId(currentCart.id);
                setCartItems(currentCart.items || []);
            } else {
                setCartId(null);
                setCartItems([]);
            }
        } catch (err) {
            console.error('Erreur chargement panier :', err);

            setCartId(null);
            setCartItems([]);
        } finally {
            setIsLoading(false);
        }

    }, []);

    // Fetch the cart on initial component mount
    useEffect(() => {
        refetchCart();
    }, [refetchCart]);

    // 5. Derive totalItems from cartItems state using useMemo for performance
    const totalItems = useMemo(() => {
        return cartItems.reduce((sum, item) => sum + item.quantity, 0);
    }, [cartItems]);
    const totalPrice = useMemo(() => {
        return cartItems.reduce((sum, item) => sum + item.quantity * item.product.sellPrice, 0);
    }, [cartItems]);

    // 6. Update cart manipulation functions to be consistent and to refetch data
    const addToCart = useCallback(async (product: Product) => {
        const sessionId = getOrCreateSessionId();

        try {
            // Use axios for consistency
            const res = await fetch(`${API_BASE_URL}/api/cart/add`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include", // indispensable pour envoyer les cookies (JWT)
                body: JSON.stringify({
                    productId: product.id,
                    quantity: 1,
                    sessionId: sessionId, // pour user anonyme
                }),
            });
            if (!res.ok) {
                throw new Error("Erreur lors de l’ajout au panier");
            }
            toast.success(`${product.name} added to cart!`);
            await refetchCart(); // Refetch to get the updated cart state
        } catch (err) {
            console.error('Erreur lors de l’ajout au panier:', err);
            const errorMessage = err instanceof AxiosError ? err.response?.data?.message : 'Failed to add item to cart.';
            toast.error(errorMessage);
        }
    }, [refetchCart]); // Dependency on refetchCart

    const clearCart = useCallback(async () => {
        setCartItems([])
    }, []);

    const removeItem = useCallback(async (itemId: number) => {
        try {
            await axios.delete(`${API_BASE_URL}/api/cart/item/${itemId}`, {
                withCredentials: true,
            });
            toast.success("Item removed from cart!");
            await refetchCart(); // Refetch to get the updated cart state
        } catch (err) {
            console.error('Erreur suppression article :', err);
            toast.error("Failed to remove item.");
        }
    }, [refetchCart]); // Dependency on refetchCart

    const updateQuantity = useCallback(async (itemId: number, newQuantity: number) => {
        if (newQuantity < 1) {
            await removeItem(itemId);
            return;
        }
        try {
            await axios.put(
                `${API_BASE_URL}/api/cart/item/${itemId}`,
                { quantity: newQuantity },
                { withCredentials: true }
            );
            toast.success("Quantity updated!");
            await refetchCart(); // Refetch to get the updated cart state
        } catch (err) {
            console.error('Erreur mise à jour quantité :', err);
            toast.error("Failed to update quantity.");
        }
    }, [refetchCart, removeItem]); // Dependency on refetchCart and removeItem

    // 7. Memoize the context value to prevent unnecessary re-renders of consumers
    const contextValue = useMemo(() => ({
        cartItems,
        totalItems,
        cartId,
        isLoading,
        totalPrice,
        addToCart,
        removeItem,
        updateQuantity,
        refetchCart,
        clearCart
    }), [cartItems, totalItems, cartId, isLoading, addToCart, removeItem, updateQuantity, refetchCart, totalPrice,clearCart]);

    return (
        <CartContext.Provider value={contextValue}>
            {children}
        </CartContext.Provider>
    );
};

// 8. Update the custom hook to provide strong types and a proper runtime check
export const useCart = (): CartContextType => {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};

