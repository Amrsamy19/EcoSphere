import { CartItems } from "@/types/cart";
import CartClient from "./CartClient";

export const getCartFromServer = (): CartItems[] => {
	// call your internal API or DB here, e.g.
	// const res = await fetch(`api/cart`, { headers: {...} })
	// return res.json();
	// For now: return [] as placeholder
	return [
		{
			id: "1",
			title: "product a",
			description: "description",
			image: "/11.png",
			price: 600,
			quantity: 1,
		},
		{
			id: "2",
			title: "product b",
			description: "description",
			image: "/11.png",
			price: 40,
			quantity: 1,
		},
		{
			id: "4",
			title: "product b",
			description: "description",
			image: "/11.png",
			price: 40,
			quantity: 1,
		},
	];
};

const Cart = async () => {
	const serverCart = getCartFromServer();
	return <CartClient initialCart={serverCart} />;
};

export default Cart;
