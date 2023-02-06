import http from "../../../services/http";

const actions = {
    fetchCashReceipt: async ({ state, commit }, payload) => {
        commit("setPreloadCashReceipt", true)
        commit("setCashReceipt", [])
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
            // if(response.data.data !== null) commit("setCashReceipt", response.data.data)
            commit("setPreloadCashReceipt", false)
        } catch (error) {
            console.log(error)
            commit("setPreloadCashReceipt", false)
        }
    },
}

export default actions;

