'use server'

import { API_BASE_URL } from '@/lib/utils';


export const addToCart = async ({ productId, sessionId }: { productId: number, sessionId: string }) =>  {
    try {
      

        const res = await fetch(`${API_BASE_URL}/api/cart/add}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include", // indispensable pour envoyer les cookies (JWT)
            body: JSON.stringify({
                productId,
                quantity: 1,
                sessionId: sessionId, // pour user anonyme
            }),
        });

        if (!res.ok) {
            return {
                error: "Erreur lors de l’ajout au panier",
            }
        }
        return {
            success: "Ajout au panier avec succès",
        }


    } catch (err) {
        console.log(err)
        return {
            error: "Erreur d’ajout au panier", err
        }

    }
};


