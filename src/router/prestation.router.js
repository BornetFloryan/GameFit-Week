import GoodiesView from "@/components/prestataire/goodies/GoodiesView.vue";
import RestaurantView from "@/components/prestataire/foods/RestaurantView.vue";
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
                path: "restaurations",
                name: "restaurations-view",
                component: RestaurantView,
            },
        ],
    }
]
;
