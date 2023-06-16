interface CartItem {
    id: string;
    created_at: Date;
    updated_at: Date;
    product_id: string;
    cart_id: string;
    amount: number;
}

export { CartItem };