export interface ProductUpdate{
    id: number
    update: {
        title?: string
        price?: number
        description?: string
        images?: string[]
    }
}