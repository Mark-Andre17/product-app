export enum EProductTypes {
    FetchProducts = 'FETCH_PRODUCTS',
    FetchProductsSuccess = 'FETCH_PRODUCTS_SUCCESS',
    FetchProductsError = 'FETCH_PRODUCTS_ERROR',
    AddProduct = 'ADD_PRODUCT' 
}
type Keys = Array<"title" | "price" | "category" | "description" | "image">;

type ProductsAction = {
    type: EProductTypes.FetchProducts,
    payload: IProduct[]
}
type ProductsActionSuccess = {
    type: EProductTypes.FetchProductsSuccess,
    payload: IProduct
}
type ProductsActionError = {
    type: EProductTypes.FetchProductsError,
    payload: string
}
interface IRate {
    count: number,
    rate: number
}
interface IProduct {
    id:  number,
    title: string,
    price: number,
    category: string,
    description: string,
    image: string,
    rating?: IRate 
}
interface IProductState {
    products: IProduct[],
    loading: boolean,
    error: string | null
}
type ProductsActionType = ProductsAction | ProductsActionSuccess | ProductsActionError


export type {
    IProduct, 
    IProductState, 
    ProductsActionSuccess,
    ProductsActionError,
    ProductsAction,
    ProductsActionType,
    Keys
};
