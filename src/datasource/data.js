let customersAccounts = [
    {
        "_id": "0",
        "name": "test",
        "login": "test",
        "password": "test",
        "email": "test@test.com",
        "picture": "",
        "description": "",
        "privilege": "0",
        "session": ""
    },
    {
        "_id": "1",
        "name": "admin",
        "login": "admin",
        "password": "admin",
        "email": "admin@admin.com",
        "picture": "",
        "description": "",
        "privilege": "2",
        "session": ""
    },
    {
        "_id": "2",
        "name": "Lionel Messi",
        "login": "lionel.messi",
        "password": "lionel.messi",
        "email": "lionel.messi@prestataire.com",
        "picture": "Lionel Messi.jpg",
        "description": "Lionel Messi, de son nom complet Lionel Andrés Messi Cuccittini, né le 24 juin 1987 à Rosario, " +
            "est un footballeur international argentin évoluant au poste d'attaquant au Paris Saint-Germain. " +
            "Surnommé La Pulga, il est considéré comme l'un des plus grands footballeurs de l'histoire.",
        "privilege": "1",
        "session": ""
    },
    {
        "_id": "3",
        "name": "LeBron James",
        "login": "lebron.james",
        "password": "lebron.james",
        "email": "lebron.james@prestataire.com",
        "picture": "LeBron James.jpg",
        "description": "LeBron Raymone James, né le 30 décembre 1984 à Akron, est un joueur professionnel américain de basket-ball. " +
            "Surnommé King James, il évolue au poste d'ailier fort ou d'ailier pour les Lakers de Los Angeles en NBA. " +
            "Considéré comme l'un des meilleurs joueurs de l'histoire de la NBA, il est comparé à Michael Jordan.",
        "privilege": "1",
        "session": ""
    },
    {
        "_id": "4",
        "name": "Serena Williams",
        "login": "serena.williams",
        "password": "serena.williams",
        "email": "serena.williams@prestataire.com",
        "picture": "Serena Williams.jpg",
        "description": "Serena Jameka Williams, née le 26 septembre 1981 à Saginaw, est une joueuse de tennis américaine. " +
            "Professionnelle depuis 1995, elle a remporté 23 titres en simple en Grand Chelem, ce qui constitue un record de l'ère " +
            "Open, et 14 titres en double dames avec sa sœur Venus Williams. Elle a été numéro un mondiale à sept reprises entre 2002 et 2017.",
        "privilege": "1",
        "session": ""
    },
    {
        "_id": "5",
        "name": "Cristiano Ronaldo",
        "login": "cristiano.ronaldo",
        "password": "cristiano.ronaldo",
        "email": "cristiano.ronaldo@prestataire.com",
        "picture": "Cristiano Ronaldo.jpg",
        "description": "Cristiano Ronaldo dos Santos Aveiro, né le 5 février 1985 à Funchal sur l'île de Madère, est un footballeur " +
            "international portugais qui évolue au poste d'attaquant à Manchester United. " +
            "Considéré comme l'un des meilleurs joueurs de l'histoire de ce sport, il est le premier footballeur à avoir remporté " +
            "le Ballon d'or avec deux clubs différents.",
        "privilege": "1",
        "session": ""
    },
    {
        "_id": "6",
        "name": "Tom Brady",
        "login": "tom.brady",
        "password": "tom.brady",
        "email": "tom.brady@prestataire.com",
        "picture": "Tom Brady.jpg",
        "description": "Thomas Edward Patrick Brady Jr., né le 3 août 1977 à San Mateo, est un joueur américain de football américain " +
            "évoluant au poste de quarterback pour les Buccaneers de Tampa Bay en NFL. " +
            "Considéré comme l'un des meilleurs joueurs de l'histoire de la NFL, il a remporté sept Super Bowl, un record.",
        "privilege": "1",
        "session": ""
    },
    {
        "_id": "7",
        "name": "Roger Federer",
        "login": "roger.federer",
        "password": "roger.federer",
        "email": "roger.federer@prestaire.com",
        "picture": "Roger Federer.jpg",
        "description": "Roger Federer, né le 8 août 1981 à Bâle, est un joueur de tennis suisse. " +
            "Professionnel depuis 1998, il a remporté 20 titres en simple en Grand Chelem, un record, et a été numéro un mondial à " +
            "plusieurs reprises entre 2004 et 2018. Il est considéré comme l'un des plus grands joueurs de l'histoire du tennis.",
        "privilege": "1",
        "session": ""
    },
    {
        "_id": "8",
        "name": "Stephen Curry",
        "login": "stephen.curry",
        "password": "stephen.curry",
       "email": "stephen.curry@prestaire.com",
        "picture": "Stephen Curry.jpg",
        "description": "Wardell Stephen Curry II, né le 14 mars 1988 à Akron, est un joueur américain de basket-ball évoluant au poste " +
            "de meneur pour les Warriors de Golden State en NBA. " +
            "Considéré comme l'un des meilleurs shooteurs de l'histoire de la NBA, il a révolutionné le jeu par son adresse à trois points.",
        "privilege": "1",
        "session": ""
    },
    {
        "_id": "9",
        "name": "Usain Bolt",
        "login": "usain.bolt",
        "password": "usain.bolt",
       "email": "usain.bolt@prestaire.com",
        "picture": "Usain Bolt.jpg",
        "description": "Usain Bolt, né le 21 août 1986 à Sherwood Content, est un athlète jamaïcain spécialiste des épreuves de sprint. " +
            "Surnommé Lightning Bolt, il est l'athlète le plus titré de l'histoire des Jeux olympiques, avec huit médailles d'or.",
        "privilege": "1",
        "session": ""
    },
    {
        "_id": "10",
        "name": "Neymar Jr.",
        "login": "neymar.jr",
        "password": "neymar.jr",
       "email": "neymar.jr@prestaire.com",
        "picture": "Neymar Jr..jpg",
        "description": "Neymar da Silva Santos Júnior, dit Neymar Jr., né le 5 février 1992 à Mogi das Cruzes, est un footballeur " +
            "international brésilien évoluant au poste d'attaquant au Paris Saint-Germain. " +
            "Considéré comme l'un des meilleurs joueurs de sa génération, il est comparé à Pelé.",
        "privilege": "1",
        "session": ""
    },
    {
        "_id": "11",
        "name": "Michael Jordan",
        "login": "michael.jordan",
        "password": "michael.jordan",
       "email": "michael.jordan@prestaire.com",
        "picture": "Michael Jordan.jpg",
        "description": "Michael Jeffrey Jordan, né le 17 février 1963 à Brooklyn, est un joueur de basket-ball américain. " +
            "Considéré comme le plus grand joueur de l'histoire de la NBA et l'un des plus grands sportifs de tous les temps, " +
            "il a remporté six titres de champion NBA avec les Bulls de Chicago.",
        "privilege": "1",
        "session": ""
    },
    {
        "_id": "12",
        "name": "Khabib Nurmagomedov",
        "login": "khabib.nurmagomedov",
        "password": "khabib.nurmagomedov",
       "email": "khabib.nurmagomedov@prestaire.com",
        "picture": "Khabib Nurmagomedov.jpg",
        "description": "Khabib Abdulmanapovich Nurmagomedov, né le 20 septembre 1988 à Sildi, est un pratiquant russe d'arts martiaux " +
            "mixtes (MMA) d'origine avar. Il a été champion du monde de sambo et champion du monde de combat sambo. " +
            "Il a été champion de l'UFC dans la catégorie des poids légers.",
        "privilege": "1",
        "session": ""
    },
    {
        "_id": "13",
        "name": "Pele",
        "login": "pele",
        "password": "pele",
       "email": "pele@prestaire.com",
        "picture": "Pele.jpg",
        "description": "Pelé, de son vrai nom Edson Arantes do Nascimento, né le 23 octobre 1940 à Três Corações, est un footballeur " +
            "international brésilien. Il est considéré comme l'un des plus grands joueurs de l'histoire du football. " +
            "Il a remporté trois Coupes du monde avec la sélection brésilienne en 1958, 1962 et 1970.",
        "privilege": "1",
        "session": ""
    },
    {
        "_id": "14",
        "name": "Virat Kohli",
        "login": "virat.kohli",
        "password": "virat.kohli",
       "email": "virat.kohli@prestaire.com",
        "picture": "Virat Kohli.jpg",
        "description": "Virat Kohli, né le 5 novembre 1988 à Delhi, est un joueur de cricket international indien. " +
            "Il est capitaine de l'équipe d'Inde de cricket dans les formats ODI et Test. " +
            "Il est considéré comme l'un des meilleurs batteurs de cricket de tous les temps.",
        "privilege": "1",
        "session": ""
    },
    {
        "_id": "15",
        "name": "Misty May-Treanor",
        "login": "misty.may-treanor",
        "password": "misty.may-treanor",
       "email": "misty.maytreanor@prestaire.com",
        "picture": "Misty May-Treanor.jpg",
        "description": "Misty May-Treanor, née le 30 juillet 1977 à Los Angeles, est une joueuse de beach-volley américaine. " +
            "Avec sa partenaire Kerri Walsh, elle a remporté trois médailles d'or olympiques en 2004, 2008 et 2012. " +
            "Elle est considérée comme l'une des meilleures joueuses de beach-volley de l'histoire.",
        "privilege": "1",
        "session": ""
    },
    {
        "_id": "16",
        "name": "Bugha",
        "login": "bugha",
        "password": "bugha",
       "email": "bugha@prestaire.com",
        "picture": "Bugha.jpg",
        "description": "Kyle Giersdorf, dit Bugha, né le 30 décembre 2002 à Pottsgrove, est un joueur professionnel américain de jeux vidéo. " +
            "Il est spécialisé dans le jeu Fortnite et a remporté la Fortnite World Cup en 2019. " +
            "Il est considéré comme l'un des meilleurs joueurs de Fortnite de tous les temps.",
        "privilege": "1",
        "session": ""
    },
    {
        "_id": "17",
        "name": "Ninja",
        "login": "ninja",
       "password": "ninja",
       "email": "ninja@prestaire.com",
        "picture": "Ninja.jpg",
        "description": "Richard Tyler Blevins, dit Ninja, né le 5 juin 1991 à Detroit, est un joueur professionnel américain de jeux vidéo. " +
            "Il est spécialisé dans les jeux Fortnite et Halo. " +
            "Il est considéré comme l'un des meilleurs joueurs de jeux vidéo de tous les temps.",
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

let pavillons = [
    {
        "_id": "0",
        "name": "Pavillon 1",
    },
    {
        "_id": "1",
        "name": "Pavillon 2",
    },
    {
        "_id": "2",
        "name": "Pavillon 3",
    },
    {
        "_id": "3",
        "name": "Palais des Sports",
    },
]

let stands = [
    {
        "_id": "0",
        "name": "Stand 1",
        "description": "Stand 1",
        "price": "100",
        "prestataire_id": "",
        "pavillon_id": "0",
    },
    {
        "_id": "1",
        "name": "Stand 2",
        "description": "Stand 2",
        "price": "100",
        "prestataire_id": "",
        "pavillon_id": "0",
    },
    {
        "_id": "2",
        "name": "Stand 3",
        "description": "Stand 3",
        "price": "100",
        "prestataire_id": "",
        "pavillon_id": "0",
    },
    {
        "_id": "3",
        "name": "Stand 4",
        "description": "Stand 4",
        "price": "100",
        "prestataire_id": "",
        "pavillon_id": "0",
    },
    {
        "_id": "4",
        "name": "Stand 5",
        "description": "Venez rencontrer ",
        "price": "100",
        "prestataire_id": "2",
        "pavillon_id": "1",
    },
    {
        "_id": "5",
        "name": "Stand 6",
        "description": "Venez rencontrer ",
        "price": "100",
        "prestataire_id": "3",
        "pavillon_id": "1",
    },
    {
        "_id": "6",
        "name": "Stand 7",
        "description": "Venez rencontrer ",
        "price": "100",
        "prestataire_id": "4",
        "pavillon_id": "1",
    },
    {
        "_id": "7",
        "name": "Stand 8",
        "description": "Venez rencontrer ",
        "price": "100",
        "prestataire_id": "5",
        "pavillon_id": "1",
    },
    {
        "_id": "8",
        "name": "Stand 9",
        "description": "Venez rencontrer ",
        "price": "100",
        "prestataire_id": "6",
        "pavillon_id": "1",
    },
    {
        "_id": "9",
        "name": "Stand 10",
        "description": "Venez rencontrer ",
        "price": "100",
        "prestataire_id": "7",
        "pavillon_id": "1",
    },
    {
        "_id": "10",
        "name": "Stand 11",
        "description": "Venez rencontrer ",
        "price": "100",
        "prestataire_id": "8",
        "pavillon_id": "1",
    },
    {
        "_id": "11",
        "name": "Stand 12",
        "description": "Venez rencontrer ",
        "price": "100",
        "prestataire_id": "9",
        "pavillon_id": "1",
    },
    {
        "_id": "12",
        "name": "Stand 13",
        "description": "Venez rencontrer ",
        "price": "100",
        "prestataire_id": "10",
        "pavillon_id": "1",
    },
    {
        "_id": "13",
        "name": "Stand 14",
        "description": "Venez rencontrer ",
        "price": "100",
        "prestataire_id": "11",
        "pavillon_id": "1",
    },
    {
        "_id": "14",
        "name": "Stand 15",
        "description": "Venez rencontrer ",
        "price": "100",
        "prestataire_id": "12",
        "pavillon_id": "1",
    },
    {
        "_id": "15",
        "name": "Stand 16",
        "description": "Venez rencontrer ",
        "price": "100",
        "prestataire_id": "13",
        "pavillon_id": "1",
    },
    {
        "_id": "16",
        "name": "Stand 17",
        "description": "Venez rencontrer ",
        "price": "100",
        "prestataire_id": "14",
        "pavillon_id": "1",
    },
    {
        "_id": "17",
        "name": "Stand 18",
        "description": "Venez rencontrer ",
        "price": "100",
        "prestataire_id": "15",
        "pavillon_id": "1",
    },
    {
        "_id": "18",
        "name": "Stand 19",
        "description": "Venez rencontrer ",
        "price": "100",
        "prestataire_id": "16",
        "pavillon_id": "1",
    },
    {
        "_id": "19",
        "name": "Stand 20",
        "description": "Venez rencontrer ",
        "price": "100",
        "prestataire_id": "17",
        "pavillon_id": "1",
    },
    {
        "_id": "20",
        "name": "Stand 21",
        "description": "Stand 21",
        "price": "100",
        "prestataire_id": "",
        "pavillon_id": "2",
    },
    {
        "_id": "21",
        "name": "Stand 22",
        "description": "Stand 22",
        "price": "100",
        "prestataire_id": "",
        "pavillon_id": "2",
    },
    {
        "_id": "22",
        "name": "Stand 23",
        "description": "Stand 23",
        "price": "100",
        "prestataire_id": "",
        "pavillon_id": "2",
    },
    {
        "_id": "23",
        "name": "Stand 24",
        "description": "Stand 24",
        "price": "100",
        "prestataire_id": "",
        "pavillon_id": "2",
    },
    {
        "_id": "24",
        "name": "Stand 25",
        "description": "Stand 25",
        "price": "100",
        "prestataire_id": "",
        "pavillon_id": "2",
    },
    {
        "_id": "25",
        "name": "Stand 26",
        "description": "Stand 26",
        "price": "100",
        "prestataire_id": "",
        "pavillon_id": "2",
    },
    {
        "_id": "26",
        "name": "Stand 27",
        "description": "Stand 27",
        "price": "100",
        "prestataire_id": "",
        "pavillon_id": "2",
    },
    {
        "_id": "27",
        "name": "Stand 28",
        "description": "Stand 28",
        "price": "100",
        "prestataire_id": "",
        "pavillon_id": "2",
    },
    {
        "_id": "28",
        "name": "Stand 29",
        "description": "Stand 29",
        "price": "100",
        "prestataire_id": "",
        "pavillon_id": "2",
    },
    {
        "_id": "29",
        "name": "Stand 30",
        "description": "Stand 30",
        "price": "100",
        "prestataire_id": "",
        "pavillon_id": "2",
    },
    {
        "_id": "30",
        "name": "Stand 31",
        "description": "Stand 31",
        "price": "100",
        "prestataire_id": "",
        "pavillon_id": "2",
    },
    {
        "_id": "31",
        "name": "Stand 32",
        "description": "Stand 32",
        "price": "100",
        "prestataire_id": "",
        "pavillon_id": "2",
    },
    {
        "_id": "32",
        "name": "Stand 33",
        "description": "Stand 33",
        "price": "100",
        "prestataire_id": "",
        "pavillon_id": "2",
    }
]

module.exports = {
    customersAccounts,
    tickets,
    ticketsAnimationCategories,
    ticketsAgeCategories,
    availabledates,
    dedicationreservations,
    pavillons,
    stands,
}
