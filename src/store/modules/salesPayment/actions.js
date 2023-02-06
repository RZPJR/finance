import http from "../../../services/http";

const actions = {
    fetchSalesPayment: async ({ state, commit }, payload) => {
        commit("setPreloadSalesPayment", true)
        commit("setSalesPayment", [])
        try {
            let filter = state.sales_payment_list.filter
            let site = filter.site
            let region = filter.region
            let customer = filter.customer
            let date_type = filter.date_type
            let date_filter = filter.date_filter
            let status = filter.status === 999 ? '' : filter.status
            // const response = await http.get('/app', {params: {
            //     per_page:1000,
            //     site: site,
            //     region: region,
            //     customer: customer,
            //     date_type: date_type,
            //     date_filter: date_filter,
            //     status: status,
            // }});
            // if(response.data.data !== null) commit("setSalesPayment", response.data.data)
            commit("setPreloadSalesPayment", false)
        } catch (error) {
            console.log(error)
            commit("setPreloadSalesPayment", false)
        }
    },

    fetchUpdateSalesPaymentDetail: async ({ commit, dispatch}, payload) => {
        try {
            // const response = await http.get("/app/"+payload.id)
        } catch (error) {
            console.log(error)
        }
    }
}

export default actions;

