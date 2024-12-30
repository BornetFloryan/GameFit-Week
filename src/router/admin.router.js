import AdminDashBoardView from "@/views/admin/AdminDashBoardView.vue";
import AdminDedication from "@/views/admin/AdminDedication.vue";


export default [
    {
        path: '/admindashboard',
        name: 'admindashboard',
        component: AdminDashBoardView,
        meta: { requiresAuth: true, requiredPrivilege: '2' },
        children: [
            {
                path: 'admindedication',
                name: 'admindedication',
                component: AdminDedication,
                meta: { requiresAuth: true, requiredPrivilege: '2' },
            },
        ],
    },
];