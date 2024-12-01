let customersAccounts = [
    {
        "_id": "0",
        "name": "test",
        "login": "test",
        "password": "test",
        "email": "test@test.com",
        "privilege": "0",
        "session": ""
    },
    {
        "_id": "1",
        "name": "admin",
        "login": "admin",
        "password": "admin",
        "email": "admin@admin.com",
        "privilege": "2",
        "session": ""
    },
    {
        "_id": "2",
        "name": "Lionel Messi",
        "login": "lionel.messi",
        "password": "lionel.messi",
        "email": "lionel.messi@prestataire.com",
        "privilege": "1",
        "session": ""
    },
    {
        "_id": "3",
        "name": "LeBron James",
        "login": "lebron.james",
        "password": "lebron.james",
        "email": "lebron.james@prestataire.com",
        "privilege": "1",
        "session": ""
    },
    {
        "_id": "4",
        "name": "Serena Williams",
        "login": "serena.williams",
        "password": "serena.williams",
        "email": "serena.williams@prestataire.com",
        "privilege": "1",
        "session": ""
    },
    {
        "_id": "5",
        "name": "Cristiano Ronaldo",
        "login": "cristiano.ronaldo",
        "password": "cristiano.ronaldo",
        "email": "cristiano.ronaldo@prestataire.com",
        "privilege": "1",
        "session": ""
    },
    {
        "_id": "6",
        "name": "Tom Brady",
        "login": "tom.brady",
        "password": "tom.brady",
        "email": "tom.brady@prestataire.com",
        "privilege": "1",
        "session": ""
    },
    {
        "_id": "7",
        "name": "Roger Federer",
        "login": "roger.federer",
        "password": "roger.federer",
        "email": "roger.federer@prestaire.com",
        "privilege": "1",
        "session": ""
    },
    {
        "_id": "8",
        "name": "Stephen Curry",
        "login": "stephen.curry",
        "password": "stephen.curry",
       "email": "stephen.curry@prestaire.com",
        "privilege": "1",
        "session": ""
    },
    {
        "_id": "9",
        "name": "Usain Bolt",
        "login": "usain.bolt",
        "password": "usain.bolt",
       "email": "usain.bolt@prestaire.com",
        "privilege": "1",
        "session": ""
    },
    {
        "_id": "10",
        "name": "Neymar Jr.",
        "login": "neymar.jr",
        "password": "neymar.jr",
       "email": "neymar.jr@prestaire.com",
        "privilege": "1",
        "session": ""
    },
    {
        "_id": "11",
        "name": "Michael Jordan",
        "login": "michael.jordan",
        "password": "michael.jordan",
       "email": "michael.jordan@prestaire.com",
        "privilege": "1",
        "session": ""
    },
    {
        "_id": "12",
        "name": "Khabib Nurmagomedov",
        "login": "khabib.nurmagomedov",
        "password": "khabib.nurmagomedov",
       "email": "khabib.nurmagomedov@prestaire.com",
        "privilege": "1",
        "session": ""
    },
    {
        "_id": "13",
        "name": "Pele",
        "login": "pele",
        "password": "pele",
       "email": "pele@prestaire.com",
        "privilege": "1",
        "session": ""
    },
    {
        "_id": "14",
        "name": "Virat Kohli",
        "login": "virat.kohli",
        "password": "virat.kohli",
       "email": "virat.kohli@prestaire.com",
        "privilege": "1",
        "session": ""
    },
    {
        "_id": "15",
        "name": "Misty May-Treanor",
        "login": "misty.may-treanor",
        "password": "misty.may-treanor",
       "email": "misty.maytreanor@prestaire.com",
        "privilege": "1",
        "session": ""
    },
    {
        "_id": "16",
        "name": "Bugha",
        "login": "bugha",
        "password": "bugha",
       "email": "bugha@prestaire.com",
        "privilege": "1",
        "session": ""
    },
    {
        "_id": "17",
        "name": "Ninja",
        "login": "ninja",
       "password": "ninja",
       "email": "ninja@prestaire.com",
        "privilege": "1",
        "session": ""
    }
]

let ticketsAnimationCategories = [
    {
        "_id": "0",
        "name": "Sport",
        "description": "Les plus grands sportifs de tous les temps",
    },
    {
        "_id": "1",
        "name": "Jeux Vidéo",
        "description": "Les plus grands joueurs de jeux vidéo de tous les temps",
    },
    {
        "_id": "2",
        "name": "Sport et Jeux Vidéo",
        "description": "Les plus grands sportifs et les plus grands joueurs de jeux vidéo de tous les temps",
    },
]

let ticketsAgeCategories = [
    {
        "_id": "0",
        "name": "Enfant",
        "price": "5",
        "description": "Pour les enfants de 0 à 12 ans",
        "_idTicketAnimationCategories": "0",
    },
    {
        "_id": "1",
        "name": "Etudiant",
        "price": "8",
        "description": "Pour les étudiants de 13 à 25 ans",
        "_idTicketAnimationCategories": "0",
    },
    {
        "_id": "2",
        "name": "Adulte",
        "price": "10",
        "description": "Pour les adultes à partir 26 ans",
        "_idTicketAnimationCategories": "0",
    },

    {
        "_id": "3",
        "name": "Enfant",
        "price": "5",
        "description": "Pour les enfants de 0 à 12 ans",
        "_idTicketAnimationCategories": "1",
    },
    {
        "_id": "4",
        "name": "Etudiant",
        "price": "8",
        "description": "Pour les étudiants de 13 à 25 ans",
        "_idTicketAnimationCategories": "1",
    },
    {
        "_id": "5",
        "name": "Adulte",
        "price": "10",
        "description": "Pour les adultes à partir 26 ans",
        "_idTicketAnimationCategories": "1",
    },

    {
        "_id": "6",
        "name": "Enfant",
        "price": "8",
        "description": "Pour les enfants de 0 à 12 ans",
        "_idTicketAnimationCategories": "2",
    },
    {
        "_id": "7",
        "name": "Etudiant",
        "price": "14",
        "description": "Pour les étudiants de 13 à 25 ans",
        "_idTicketAnimationCategories": "2",
    },
    {
        "_id": "8",
        "name": "Adulte",
        "price": "18",
        "description": "Pour les adultes à partir 26 ans",
        "_idTicketAnimationCategories": "2",
    },
]

let tickets = [
    {
        "_id": "0",
        "date": "2024-10-30T00:00:00.000Z",
        "time": "07:00",
        "_idCustomer": "0",
        "_idTicketAnimationCategories": "0",
        "_idTicketAgeCategories": "0"
    },
]

let availabledates = [
    // Lionel Messi
    {
        "_id": "0",
        "$date": "2024-10-30T00:00:00.000Z",
        "times": [
            "07:00",
            "10:00",
            "11:00",
            "12:00",
            "14:00",
            "15:00",
            "16:00"
        ],
        "anim_id": "2",
    },
    {
        "_id": "1",
        "$date": "2024-10-31T00:00:00.000Z",
        "times": [
            "08:00",
            "10:00",
            "11:00",
            "12:00",
            "14:00",
            "15:00",
            "16:00"
        ],
        "anim_id": "2",
    },

    // LeBron James
    {
        "_id": "2",
        "$date": "2024-10-31T00:00:00.000Z",
        "times": [
            "08:00",
            "10:00",
            "11:00",
            "12:00",
            "14:00",
            "15:00",
            "16:00"
        ],
        "anim_id": "3",
    },
    {
        "_id": "3",
        "$date": "2024-11-01T00:00:00.000Z",
        "times": [
            "09:00",
            "11:00",
            "13:00",
            "15:00"
        ],
        "anim_id": "3",
    },

    // Serena Williams
    {
        "_id": "4",
        "$date": "2024-11-01T00:00:00.000Z",
        "times": [
            "10:00",
            "12:00",
            "14:00",
            "16:00"
        ],
        "anim_id": "4",
    },
    {
        "_id": "5",
        "$date": "2024-11-02T00:00:00.000Z",
        "times": [
            "08:00",
            "10:00",
            "14:00",
            "16:00"
        ],
        "anim_id": "4",
    },

    // Cristiano Ronaldo
    {
        "_id": "6",
        "$date": "2024-11-02T00:00:00.000Z",
        "times": [
            "09:00",
            "11:00",
            "13:00",
            "15:00"
        ],
        "anim_id": "5",
    },
    {
        "_id": "7",
        "$date": "2024-11-03T00:00:00.000Z",
        "times": [
            "08:00",
            "10:00",
            "12:00",
            "14:00"
        ],
        "anim_id": "5",
    },

    // Tom Brady
    {
        "_id": "8",
        "$date": "2024-11-03T00:00:00.000Z",
        "times": [
            "10:00",
            "12:00",
            "13:00",
            "15:00"
        ],
        "anim_id": "6",
    },
    {
        "_id": "9",
        "$date": "2024-11-04T00:00:00.000Z",
        "times": [
            "07:00",
            "09:00",
            "11:00",
            "13:00",
            "15:00"
        ],
        "anim_id": "6",
    },

    // Roger Federer
    {
        "_id": "10",
        "$date": "2024-11-04T00:00:00.000Z",
        "times": [
            "08:00",
            "10:00",
            "12:00",
            "14:00"
        ],
        "anim_id": "7",
    },
    {
        "_id": "11",
        "$date": "2024-11-05T00:00:00.000Z",
        "times": [
            "09:00",
            "11:00",
            "13:00",
            "15:00"
        ],
        "anim_id": "7",
    },

    // Stephen Curry
    {
        "_id": "12",
        "$date": "2024-11-05T00:00:00.000Z",
        "times": [
            "08:00",
            "10:00",
            "12:00",
            "14:00"
        ],
        "anim_id": "8",
    },
    {
        "_id": "13",
        "$date": "2024-11-06T00:00:00.000Z",
        "times": [
            "09:00",
            "11:00",
            "13:00",
            "15:00"
        ],
        "anim_id": "8",
    },

    // Usain Bolt
    {
        "_id": "14",
        "$date": "2024-11-06T00:00:00.000Z",
        "times": [
            "08:00",
            "10:00",
            "12:00",
            "14:00"
        ],
        "anim_id": "9",
    },
    {
        "_id": "15",
        "$date": "2024-11-07T00:00:00.000Z",
        "times": [
            "09:00",
            "11:00",
            "13:00",
            "15:00"
        ],
        "anim_id": "9",
    },

    // Neymar Jr.
    {
        "_id": "16",
        "$date": "2024-11-07T00:00:00.000Z",
        "times": [
            "08:00",
            "10:00",
            "12:00",
            "14:00"
        ],
        "anim_id": "10",
    },
    {
        "_id": "17",
        "$date": "2024-11-08T00:00:00.000Z",
        "times": [
            "07:00",
            "10:00",
            "12:00",
            "14:00"
        ],
        "anim_id": "10",
    },

    // Michael Jordan
    {
        "_id": "18",
        "$date": "2024-11-08T00:00:00.000Z",
        "times": [
            "08:00",
            "11:00",
            "13:00",
            "15:00"
        ],
        "anim_id": "11",
    },
    {
        "_id": "19",
        "$date": "2024-11-09T00:00:00.000Z",
        "times": [
            "09:00",
            "12:00",
            "14:00"
        ],
        "anim_id": "11",
    },

    // Khabib Nurmagomedov
    {
        "_id": "20",
        "$date": "2024-11-09T00:00:00.000Z",
        "times": [
            "10:00",
            "12:00",
            "14:00"
        ],
        "anim_id": "12",
    },
    {
        "_id": "21",
        "$date": "2024-11-10T00:00:00.000Z",
        "times": [
            "09:00",
            "11:00",
            "13:00"
        ],
        "anim_id": "12",
    },

    // Pele
    {
        "_id": "22",
        "$date": "2024-11-10T00:00:00.000Z",
        "times": [
            "08:00",
            "10:00",
            "12:00",
            "14:00"
        ],
        "anim_id": "13",
    },
    {
        "_id": "23",
        "$date": "2024-11-11T00:00:00.000Z",
        "times": [
            "10:00",
            "12:00",
            "14:00"
        ],
        "anim_id": "13",
    },

    // Virat Kohli
    {
        "_id": "24",
        "$date": "2024-11-11T00:00:00.000Z",
        "times": [
            "09:00",
            "11:00",
            "13:00"
        ],
        "anim_id": "14",
    },
    {
        "_id": "25",
        "$date": "2024-11-12T00:00:00.000Z",
        "times": [
            "08:00",
            "10:00",
            "14:00"
        ],
        "anim_id": "14",
    },

    // Misty May-Treanor
    {
        "_id": "26",
        "$date": "2024-11-12T00:00:00.000Z",
        "times": [
            "09:00",
            "12:00",
            "14:00"
        ],
        "anim_id": "15",
    },
    {
        "_id": "27",
        "$date": "2024-11-13T00:00:00.000Z",
        "times": [
            "10:00",
            "12:00",
            "14:00"
        ],
        "anim_id": "15",
    },

    // Bugha
    {
        "_id": "28",
        "$date": "2024-11-13T00:00:00.000Z",
        "times": [
            "09:00",
            "11:00",
            "13:00"
        ],
        "anim_id": "16",
    },
    {
        "_id": "29",
        "$date": "2024-11-14T00:00:00.000Z",
        "times": [
            "10:00",
            "12:00",
            "14:00"
        ],
        "anim_id": "16",
    },

    // Ninja
    {
        "_id": "30",
        "$date": "2024-11-14T00:00:00.000Z",
        "times": [
            "09:00",
            "11:00",
            "13:00"
        ],
        "anim_id": "17",
    },
    {
        "_id": "31",
        "$date": "2024-11-15T00:00:00.000Z",
        "times": [
            "08:00",
            "10:00",
            "14:00"
        ],
        "anim_id": "17",
    }
];

let dedicationreservations = [
    {
        "_id": "0",
        "date": "2024-11-15T00:00:00.000Z",
        "time": "08:00",
        "_idCustomer": "0",
        "anim_id": "17",
    },
]

module.exports = {
    customersAccounts,
    tickets,
    ticketsAnimationCategories,
    ticketsAgeCategories,
    availabledates,
    dedicationreservations,
}
