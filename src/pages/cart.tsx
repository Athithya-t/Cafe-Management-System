import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'Store';

const Cart:React.FC = () => {
    const Items = useSelector((state:RootState)=>state.Order);
    console.log(Items)
    return(
        <div>
            {Items.Total}
        </div>
    )
}

export default Cart