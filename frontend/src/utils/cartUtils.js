export const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2); //Rounds numbers to 2 decimal places
};


export const updateCart =(state)=>{
    /* calculating item price */
    state.itemsPrice = addDecimals(
        state.cartItems.reduce(
            (acc, item) => acc + item.price * item.quantity,
            0
        )
    );
    /* shipping price  */
    state.shippingPrice = addDecimals(state.itemsPrice > 50 ? 0 : 5);

    /* tax price  19%*/
    state.taxPrice = addDecimals(Number(state.itemsPrice * 0.19).toFixed(2));

    /* total price */

    state.totalPrice = (
        Number(state.itemsPrice) +
        Number(state.shippingPrice) +
        Number(state.taxPrice)
    ).toFixed(2);

    /* save the entire state to local storage */

    localStorage.setItem("cart", JSON.stringify(state));

    return state
}