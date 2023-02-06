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

    setCashReceiptRegionFilter: function(state, payload){
        state.cash_receipt_list.filter.region = payload;
        return state;
    },
    setCashReceiptSiteFilter: function(state, payload){
        state.cash_receipt_list.filter.site = payload;
        return state;
    },
    setCashReceiptCustomerFilter: function(state, payload){
        state.cash_receipt_list.filter.customer = payload;
        return state;
    },
    setCashReceiptDateFilter: function(state, payload){
        state.cash_receipt_list.filter.date_filter = payload;
        return state;
    },
};

export default mutations;
