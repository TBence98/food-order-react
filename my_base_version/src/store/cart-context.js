import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import CartModal from "../components/Cart/CardModal";

const CartContext = React.createContext({
    addItemAmount: () => {},
    addItem: () => {},
    removeItem: () => {},
    enableModal: () => {},
    disableModal: () => {},
    itemsInCart: 0,
    cartList: [],
});

export const CartContextProvider = (props) => {
    const [cartList, setCartList] = useState([]);
    const [itemsInCart, setItemsInCart] = useState(0);
    const [showModal, setShowModal] = useState(false);

    const showCartList = () => {
        setShowModal(true);
    };

    const closeCartList = () => {
        setShowModal(false);
    };

    const addItemAmount = (itemName, itemPrice, itemCount) => {
        const itemIndex = cartList.findIndex((item) => item.name === itemName);
        // create new item in the list
        if (itemIndex < 0) {
            setCartList((prevList) => [
                ...prevList,
                { name: itemName, price: itemPrice, count: itemCount },
            ]);
        } // increase the existing item count
        else {
            let newList = cartList;
            newList[itemIndex].count += itemCount;
            setCartList(newList);
        }
        setItemsInCart((prevState) => prevState + itemCount);
    };

    const addItemHandler = (itemName) => {
        const itemIndex = cartList.findIndex((item) => item.name === itemName);
        const newList = [...cartList];
        newList[itemIndex].count++;
        setCartList(newList);
        setItemsInCart((prevState) => prevState + 1);
    };

    const removeItemHandler = (itemName) => {
        const itemIndex = cartList.findIndex((item) => item.name === itemName);
        // remove item if the count is only 1
        if (cartList[itemIndex].count === 1) {
            const newList = [...cartList];
            newList.splice(itemIndex, 1);
            setCartList(newList);
            //closeCartList();
        } else {
            const newList = cartList;
            newList[itemIndex].count--;
            setCartList(newList);
        }
        setItemsInCart((prevState) => prevState - 1);
    };

    // if the user removed all meals, close modal automatically
    useEffect(() => {
        if (itemsInCart === 0) {
            closeCartList();
        }
    }, [itemsInCart]);

    return (
        <CartContext.Provider
            value={{
                addItemAmount: addItemAmount,
                addItem: addItemHandler,
                removeItem: removeItemHandler,
                itemsInCart: itemsInCart,
                cartList: cartList,
                enableModal: showCartList,
                disableModal: closeCartList,
            }}
        >
            {props.children}
            {showModal === true &&
                ReactDOM.createPortal(
                    <CartModal />,
                    document.getElementById("modal-root")
                )}
        </CartContext.Provider>
    );
};

export default CartContext;
