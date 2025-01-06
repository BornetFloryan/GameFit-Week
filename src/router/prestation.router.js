import GoodiesView from "@/components/prestataire/GoodiesView.vue";
import RestaurantView from "@/components/prestataire/RestaurantView.vue";
import PrestationLayout from "@/components/prestataire/PrestationLayout.vue"; // Composant parent

export default [
    {
        path: "/prestation",
        name: "prestation",
        component: PrestationLayout,
        children: [
            {
                path: "goodies",
                name: "goodies-view",
                component: GoodiesView,
            },
            {
                path: "restaurant",
                name: "restaurant-view",
                component: RestaurantView,
            },
        ],
    }
]
;
