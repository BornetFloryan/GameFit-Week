import AdminDashBoardView from "@/views/admin/AdminDashBoardView.vue";
import AdminDedicationView from "@/views/admin/AdminDedicationView.vue";
import AdminRequests from "@/components/admin/AdminRequests.vue";
import AdminDedicationManagement from "@/components/admin/AdminDedicationManagement.vue";


export default [
    {
        path: '/admin-dashboard',
        name: 'admin-dashboard',
        component: AdminDashBoardView,
        meta: { requiresAuth: true, requiredPrivilege: '2' },
        children: [
            {
                path: 'admin-dedication',
                name: 'admin-dedication',
                component: AdminDedicationView,
                meta: { requiresAuth: true, requiredPrivilege: '2' },
                children: [
                    {
                        path: 'admin-dedication-management',
                        name: 'admin-dedication-management',
                        component: AdminDedicationManagement,
                        meta: { requiresAuth: true, requiredPrivilege: '2' },
                    },
                ],
            },
            {
                path: 'admin-requests',
                name: 'admin-requests',
                component: AdminRequests,
                meta: { requiresAuth: true, requiredPrivilege: '2'},
            },
        ],
    },
];