export type Store = {
    id: string;
    name: string;
    address: string;
    location: {
        latitude: number;
        longitude: number;
    };
};

export type StockAlert = {
    store: string;
    model: string;
    inventory: number;
}

export type StockData = {
    store: string;
    storeId: string;
    inventory: number;
}
