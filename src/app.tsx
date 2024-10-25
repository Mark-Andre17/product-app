import React, { useEffect, useCallback, useState } from 'react';
import ProductList from './components/ProductList';
import { useAppDispatch, useAppSelector } from './hooks/appHooks';
import { fetchProducts } from './actions/fetchProducts';
import ProductFilter from './components/ProductFilter';
import AddProductButton from './components/AddProductButton';
import { AddModal } from './components/AddModal';
import './assets/styles/base.css';
import { CartButton } from './components/CartButton';
import { Cart } from './components/Cart';


function App() {
    const {products, loading, error} = useAppSelector(state => state.products)
    const [filterList, setFilterList] = useState<string[]>(['all'])
    const [currentCategory, setCurrentCategory] = useState<string>('all')
    const [visibleAdd, setVisibleAdd] = useState<boolean>(false)
    const [visibleCart, setVisibleCart] = useState<boolean>(false)
    const dispatch = useAppDispatch()
    useEffect(() => {
        dispatch(fetchProducts())
    }, [dispatch])

    const handleFilter = useCallback((category: string) => {
        setCurrentCategory(category);
    }, []);


    if  (loading) {
        return <div>Loading....</div>
    }

    if (error){
        return  <div>{error}</div>
    }
    products.forEach((item) => {
        if (!filterList.includes(item.category)) {
            setFilterList([...filterList, item.category])
        }
    })

    return (
        <div>
            <CartButton visibleCart={visibleCart} setVisibleCart={setVisibleCart}/>
            {visibleCart ? <Cart visibleCart={visibleCart} setVisibleCart={setVisibleCart}/> : null}
            <ProductFilter filterList={filterList} handleFilter={handleFilter}/>
            <ProductList currentCategory={currentCategory}/>
            {visibleAdd 
            ? <AddModal 
                filterList={filterList}
                products={products}
                visibleAdd={visibleAdd} 
                setVisibleAdd={setVisibleAdd}
            /> 
            : <AddProductButton 
                visibleAdd={visibleAdd} 
                setVisibleAdd={setVisibleAdd}
            />}
        </div>
    );
}

export default App;
