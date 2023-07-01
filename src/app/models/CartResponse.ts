import Product from "./Product";

export interface CartResponse {
    id: string;
    user_id: string;
    amount: number;
    total: number;
    created_at: Date;
    updated_at: Date;
    finished_at?: Date | undefined;
    products: Product[];
}