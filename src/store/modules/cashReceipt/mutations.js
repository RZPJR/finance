const mutations = {  
    // Sales Payment List
    setCashReceipt: function(state, payload) {
        state.cash_receipt_list.data = payload;
        return state;
    },
    setPreloadCashReceipt: function(state, payload) {
        state.cash_receipt_list.isLoading = payload;
        return state;
    },

    setCashReceiptFilter: function(state, payload){
        state.cash_receipt_list.filter = payload;
        return state;
    },
};

export default mutations;
