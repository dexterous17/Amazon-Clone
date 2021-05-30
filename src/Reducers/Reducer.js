export const initialState = {
    basket:[],
    user:null,
    switch_order:false
}

export const getBasketTotal = (basket) => 
  basket?.reduce((amount, item) => item.price + amount, 0);



export const Reducer = (state, action) => {
        switch (action.type) {
              case "ADD_TO_BASKET":
                return {
                  ...state,
                  basket: [...state.basket, action.item],
                };
              case"EMPTY_BASKET":
              return{
                ...state,
                basket:[]
              }
              case "REMOVE_FROM_BASKET":
              const index = state.basket.findIndex(
                (basketItem) => basketItem.id === action.id
              );
              let NewBasket = [...state.basket]
              if(index >=0 ){
                NewBasket.splice(index,1);
              }else{
                console.warn(`can't remove ${action.id}`)
              }
              return {
                ...state,
                  basket:NewBasket
              };

              case"SET_USER":
              return{
                ...state,
                user:action.user
              }

              case"SWITCH_ORDER":
              return{
                ...state,
                switch_order:action.order
              }

            default:
                return state;
            }
          };

export default Reducer;
