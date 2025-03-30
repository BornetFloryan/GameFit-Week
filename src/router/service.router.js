import ServicesView from "../views/ServicesView.vue";
import DedicationView from "@/views/DedicationView.vue";
import DedicationHomeView from "@/components/client/services/DedicationHome.vue";
import DedicationFormView from "@/components/client/services/DedicationForm.vue";
import StreamView from "@/components/client/services/StreamView.vue";
import BracketsDisplay from "@/components/client/services/BracketsDisplay.vue";
import GoodiesView from "@/components/client/services/GoodiesView.vue";
import GoodiesSellerView from "@/components/client/services/GoodiesSellerView.vue";

export default [
    {
        path: '/services',
        name: 'services',
        component: ServicesView,
        children: [
            {
                path: 'dedication',
                name: 'dedication',
                component: DedicationView,
                children: [
                    {
                        path: 'dedication-home',
                        name: 'dedication-home',
                        component: DedicationHomeView,
                    },
                    {
                        path: 'dedication-form',
                        name: 'dedication-form',
                        component: DedicationFormView,

                    }
                ]
            },
            {
                path: 'stream',
                name: 'stream',
                component: StreamView,
            },
            {
                path: 'brackets',
                name: 'brackets',
                component: BracketsDisplay,
            },
            {
                path: "goodies-seller",
                name: 'goodies-seller',
                component: GoodiesSellerView,
            },
            {
                path: "goodies-view/:providerServiceCategory",
                name: "goodies-view",
                component: GoodiesView,
                props: route => ({ providerServiceCategory: route.params.providerServiceCategory })
            },

        ]
    },
];