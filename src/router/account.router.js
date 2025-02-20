import AccountView from "@/views/client/AccountView.vue";
import ProfilView from "@/components/client/account/ProfilView.vue";
import ReservationView from "@/components/client/account/ReservationView.vue";
import TicketView from "@/components/client/account/TicketView.vue";
import LoginFormView from "@/components/client/account/LoginForm.vue";
import RegisterForm from "@/components/client/account/RegisterForm.vue";
import ProviderRegister from "@/views/prestataire/ProviderRegister.vue";
import ProviderRequestView from "@/components/client/account/ProviderRequestView.vue";

export default [
    {
        path: '/account',
        name: 'account',
        component: AccountView,
        children: [
            {
              path: 'login',
              name: 'login',
              component: LoginFormView,

            },
            {
              path: 'register',
              name: 'register',
              component: RegisterForm,
            },
            {
                path: 'register-provider',
                name: 'register-provider',
                component: ProviderRegister,
            },
            {
                path: 'profil',
                name: 'profil',
                component: ProfilView,
                meta: { requiresAuth: true, requiredPrivilege: "0" },
            },
            {
                path: "reservation",
                name: "reservation",
                component: ReservationView,
                meta: { requiresAuth: true, requiredPrivilege: "0" },
            },
            {
                path: "ticket",
                name: "ticket",
                component: TicketView,
                meta: { requiresAuth: true, requiredPrivilege: "0" },
            },
            {
                path: "request",
                name: "request",
                component: ProviderRequestView,
                meta: { requiresAuth: true, requiredPrivilege: "0" },
            }
        ]
    },
];