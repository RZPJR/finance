const mutations = {  
    // Sales Payment List
    setSalesPayment: function(state, payload) {
        state.sales_payment_list.data = payload;
        return state;
    },
    setPreloadSalesPayment: function(state, payload) {
        state.sales_payment_list.isLoading = payload;
        return state;
    },

    setSalesPaymentRegionFilter: function(state, payload){
        state.sales_payment_list.filter.region = payload;
        return state;
    },
    setSalesPaymentSiteFilter: function(state, payload){
        state.sales_payment_list.filter.site = payload;
        return state;
    },
    setSalesPaymentCustomerFilter: function(state, payload){
        state.sales_payment_list.filter.customer = payload;
        return state;
    },
    setSalesPaymentDateFilter: function(state, payload){
        state.sales_payment_list.filter.date_filter = payload;
        return state;
    },
};

export default mutations;
