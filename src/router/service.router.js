import ServicesView from "../views/client/ServicesView.vue";
import DedicationView from "@/components/client/services/Dedication.vue";
import StreamView from "@/components/client/services/StreamView.vue";
import BracketsDisplay from "@/components/client/services/BracketsDisplay.vue";

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
                props: route => ({ selectedAnimator: route.params.selectedAnimator })
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
        ]
    },
];