let customer_accounts = [
    {
        "_id": "0",
        "name": "client",
        "login": "client",
        "password": "client",
        "email": "client@client.com",
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
        "name": "prestataire",
        "login": "prestataire",
        "password": "prestataire",
        "email": "prestataire@prestataire.com",
        "picture": "",
        "description": "",
        "privilege": "1",
        "session": ""
    },
    {
        "_id": "3",
        "name": "Lionel Messi",
        "login": "lionel.messi",
        "password": "lionel.messi",
        "email": "lionel.messi@prestataire.com",
        "picture": "Lionel Messi.jpg",
        "description": "Lionel Messi, de son nom complet Lionel Andrés Messi Cuccittini, né le 24 juin 1987 à Rosario, est un footballeur international argentin évoluant au poste d'attaquant au Paris Saint-Germain. Surnommé La Pulga, il est considéré comme l'un des plus grands footballeurs de l'histoire.",
        "privilege": "1",
        "session": ""
    },
    {
        "_id": "4",
        "name": "LeBron James",
        "login": "lebron.james",
        "password": "lebron.james",
        "email": "lebron.james@prestataire.com",
        "picture": "LeBron James.jpg",
        "description": "LeBron Raymone James, né le 30 décembre 1984 à Akron, est un joueur professionnel américain de basket-ball. Surnommé King James, il évolue au poste d'ailier fort ou d'ailier pour les Lakers de Los Angeles en NBA. Considéré comme l'un des meilleurs joueurs de l'histoire de la NBA, il est comparé à Michael Jordan.",
        "privilege": "1",
        "session": ""
    },
    {
        "_id": "5",
        "name": "Serena Williams",
        "login": "serena.williams",
        "password": "serena.williams",
        "email": "serena.williams@prestataire.com",
        "picture": "Serena Williams.jpg",
        "description": "Serena Jameka Williams, née le 26 septembre 1981 à Saginaw, est une joueuse de tennis américaine. Professionnelle depuis 1995, elle a remporté 23 titres en simple en Grand Chelem, ce qui constitue un record de l'ère Open, et 14 titres en double dames avec sa sœur Venus Williams. Elle a été numéro un mondiale à sept reprises entre 2002 et 2017.",
        "privilege": "1",
        "session": ""
    },
    {
        "_id": "6",
        "name": "Cristiano Ronaldo",
        "login": "cristiano.ronaldo",
        "password": "cristiano.ronaldo",
        "email": "cristiano.ronaldo@prestataire.com",
        "picture": "Cristiano Ronaldo.jpg",
        "description": "Cristiano Ronaldo dos Santos Aveiro, né le 5 février 1985 à Funchal sur l'île de Madère, est un footballeur international portugais qui évolue au poste d'attaquant à Manchester United. Considéré comme l'un des meilleurs joueurs de l'histoire de ce sport, il est le premier footballeur à avoir remporté le Ballon d'or avec deux clubs différents.",
        "privilege": "1",
        "session": ""
    },
    {
        "_id": "7",
        "name": "Tom Brady",
        "login": "tom.brady",
        "password": "tom.brady",
        "email": "tom.brady@prestataire.com",
        "picture": "Tom Brady.jpg",
        "description": "Thomas Edward Patrick Brady Jr., né le 3 août 1977 à San Mateo, est un joueur américain de football américain évoluant au poste de quarterback pour les Buccaneers de Tampa Bay en NFL. Considéré comme l'un des meilleurs joueurs de l'histoire de la NFL, il a remporté sept Super Bowl, un record.",
        "privilege": "1",
        "session": ""
    },
    {
        "_id": "8",
        "name": "Roger Federer",
        "login": "roger.federer",
        "password": "roger.federer",
        "email": "roger.federer@prestaire.com",
        "picture": "Roger Federer.jpg",
        "description": "Roger Federer, né le 8 août 1981 à Bâle, est un joueur de tennis suisse. Professionnel depuis 1998, il a remporté 20 titres en simple en Grand Chelem, un record, et a été numéro un mondial à plusieurs reprises entre 2004 et 2018. Il est considéré comme l'un des plus grands joueurs de l'histoire du tennis.",
        "privilege": "1",
        "session": ""
    },
    {
        "_id": "9",
        "name": "Stephen Curry",
        "login": "stephen.curry",
        "password": "stephen.curry",
        "email": "stephen.curry@prestaire.com",
        "picture": "Stephen Curry.jpg",
        "description": "Wardell Stephen Curry II, né le 14 mars 1988 à Akron, est un joueur américain de basket-ball évoluant au poste de meneur pour les Warriors de Golden State en NBA. Considéré comme l'un des meilleurs shooteurs de l'histoire de la NBA, il a révolutionné le jeu par son adresse à trois points.",
        "privilege": "1",
        "session": ""
    },
    {
        "_id": "10",
        "name": "Usain Bolt",
        "login": "usain.bolt",
        "password": "usain.bolt",
        "email": "usain.bolt@prestaire.com",
        "picture": "Usain Bolt.jpg",
        "description": "Usain Bolt, né le 21 août 1986 à Sherwood Content, est un athlète jamaïcain spécialiste des épreuves de sprint. Surnommé Lightning Bolt, il est l'athlète le plus titré de l'histoire des Jeux olympiques, avec huit médailles d'or.",
        "privilege": "1",
        "session": ""
    },
    {
        "_id": "11",
        "name": "Neymar Jr.",
        "login": "neymar.jr",
        "password": "neymar.jr",
        "email": "neymar.jr@prestaire.com",
        "picture": "Neymar Jr..jpg",
        "description": "Neymar da Silva Santos Júnior, dit Neymar Jr., né le 5 février 1992 à Mogi das Cruzes, est un footballeur international brésilien évoluant au poste d'attaquant au Paris Saint-Germain. Considéré comme l'un des meilleurs joueurs de sa génération, il est comparé à Pelé.",
        "privilege": "1",
        "session": ""
    },
    {
        "_id": "12",
        "name": "Michael Jordan",
        "login": "michael.jordan",
        "password": "michael.jordan",
        "email": "michael.jordan@prestaire.com",
        "picture": "Michael Jordan.jpg",
        "description": "Michael Jeffrey Jordan, né le 17 février 1963 à Brooklyn, est un joueur de basket-ball américain. Considéré comme le plus grand joueur de l'histoire de la NBA et l'un des plus grands sportifs de tous les temps, il a remporté six titres de champion NBA avec les Bulls de Chicago.",
        "privilege": "1",
        "session": ""
    },
    {
        "_id": "13",
        "name": "Khabib Nurmagomedov",
        "login": "khabib.nurmagomedov",
        "password": "khabib.nurmagomedov",
        "email": "khabib.nurmagomedov@prestaire.com",
        "picture": "Khabib Nurmagomedov.jpg",
        "description": "Khabib Abdulmanapovich Nurmagomedov, né le 20 septembre 1988 à Sildi, est un pratiquant russe d'arts martiaux mixtes (MMA) d'origine avar. Il a été champion du monde de sambo et champion du monde de combat sambo. Il a été champion de l'UFC dans la catégorie des poids légers.",
        "privilege": "1",
        "session": ""
    },
    {
        "_id": "14",
        "name": "Pele",
        "login": "pele",
        "password": "pele",
        "email": "pele@prestaire.com",
        "picture": "Pele.jpg",
        "description": "Pelé, de son vrai nom Edson Arantes do Nascimento, né le 23 octobre 1940 à Três Corações, est un footballeur international brésilien. Il est considéré comme l'un des plus grands joueurs de l'histoire du football. Il a remporté trois Coupes du monde avec la sélection brésilienne en 1958, 1962 et 1970.",
        "privilege": "1",
        "session": ""
    },
    {
        "_id": "15",
        "name": "Virat Kohli",
        "login": "virat.kohli",
        "password": "virat.kohli",
        "email": "virat.kohli@prestaire.com",
        "picture": "Virat Kohli.jpg",
        "description": "Virat Kohli, né le 5 novembre 1988 à Delhi, est un joueur de cricket international indien. Il est capitaine de l'équipe d'Inde de cricket dans les formats ODI et Test. Il est considéré comme l'un des meilleurs batteurs de cricket de tous les temps.",
        "privilege": "1",
        "session": ""
    },
    {
        "_id": "16",
        "name": "Misty May-Treanor",
        "login": "misty.may-treanor",
        "password": "misty.may-treanor",
        "email": "misty.maytreanor@prestaire.com",
        "picture": "Misty May-Treanor.jpg",
        "description": "Misty May-Treanor, née le 30 juillet 1977 à Los Angeles, est une joueuse de beach-volley américaine. Avec sa partenaire Kerri Walsh, elle a remporté trois médailles d'or olympiques en 2004, 2008 et 2012. Elle est considérée comme l'une des meilleures joueuses de beach-volley de l'histoire.",
        "privilege": "1",
        "session": ""
    },
    {
        "_id": "17",
        "name": "Bugha",
        "login": "bugha",
        "password": "bugha",
        "email": "bugha@prestaire.com",
        "picture": "Bugha.jpg",
        "description": "Kyle Giersdorf, dit Bugha, né le 30 décembre 2002 à Pottsgrove, est un joueur professionnel américain de jeux vidéo. Il est spécialisé dans le jeu Fortnite et a remporté la Fortnite World Cup en 2019. Il est considéré comme l'un des meilleurs joueurs de Fortnite de tous les temps.",
        "privilege": "1",
        "session": ""
    },
    {
        "_id": "18",
        "name": "Ninja",
        "login": "ninja",
        "password": "ninja",
        "email": "ninja@prestaire.com",
        "picture": "Ninja.jpg",
        "description": "Richard Tyler Blevins, dit Ninja, né le 5 juin 1991 à Detroit, est un joueur professionnel américain de jeux vidéo. Il est spécialisé dans les jeux Fortnite et Halo. Il est considéré comme l'un des meilleurs joueurs de jeux vidéo de tous les temps.",
        "privilege": "1",
        "session": ""
    }
];

let service_categories = [
    {
        "_id": "0",
        "name": "Dédicace"
    },
    {
        "_id": "1",
        "name": "Goodies"
    },
    {
        "_id": "2",
        "name": "Produits alimentaires"
    }
]

let provider_service_categories = [
    {
        "_id": "0",
        "prestataire_id": "3", // Lionel Messi
        "service_category_id": "0" // Dédicace
    },
    {
        "_id": "1",
        "prestataire_id": "3", // LeBron James
        "service_category_id": "1" // Dédicace
    },
    {
        "_id": "2",
        "prestataire_id": "5", // Serena Williams
        "service_category_id": "0" // Dédicace
    },
    {
        "_id": "3",
        "prestataire_id": "6", // Cristiano Ronaldo
        "service_category_id": "0" // Dédicace
    },
    {
        "_id": "4",
        "prestataire_id": "7", // Tom Brady
        "service_category_id": "0" // Dédicace
    },
    {
        "_id": "5",
        "prestataire_id": "8", // Roger Federer
        "service_category_id": "0" // Dédicace
    },
    {
        "_id": "6",
        "prestataire_id": "9", // Stephen Curry
        "service_category_id": "0" // Dédicace
    },
    {
        "_id": "7",
        "prestataire_id": "10", // Usain Bolt
        "service_category_id": "0" // Dédicace
    },
    {
        "_id": "8",
        "prestataire_id": "11", // Neymar Jr.
        "service_category_id": "0" // Dédicace
    },
    {
        "_id": "9",
        "prestataire_id": "12", // Michael Jordan
        "service_category_id": "0" // Dédicace
    },
    {
        "_id": "10",
        "prestataire_id": "13", // Khabib Nurmagomedov
        "service_category_id": "0" // Dédicace
    },
    {
        "_id": "11",
        "prestataire_id": "14", // Pelé
        "service_category_id": "0" // Dédicace
    },
    {
        "_id": "12",
        "prestataire_id": "15", // Virat Kohli
        "service_category_id": "0" // Dédicace
    },
    {
        "_id": "13",
        "prestataire_id": "16", // Misty May-Treanor
        "service_category_id": "0" // Dédicace
    },
    {
        "_id": "14",
        "prestataire_id": "17", // Bugha
        "service_category_id": "0" // Dédicace
    },
    {
        "_id": "15",
        "prestataire_id": "18", // Ninja
        "service_category_id": "0" // Dédicace
    }
];


let sports_categories = [
    {
        "_id": "0",
        "name": "Football",
        "description": "Le football est un sport collectif opposant deux équipes de onze joueurs dans un stade. " +
            "Le but est de marquer des buts en envoyant un ballon dans les buts adverses.",
    },
    {
        "_id": "1",
        "name": "Basket-ball",
        "description": "Le basket-ball est un sport collectif opposant deux équipes de cinq joueurs sur un terrain rectangulaire. " +
            "Le but est de marquer des paniers en lançant un ballon dans un panier.",
    },
    {
        "_id": "2",
        "name": "Tennis",
        "description": "Le tennis est un sport individuel ou collectif opposant deux joueurs ou deux équipes de deux joueurs sur un court. " +
            "Le but est de renvoyer une balle par-dessus un filet à l'aide d'une raquette.",
    },
    {
        "_id": "3",
        "name": "Athlétisme ",
        "description": "L'athlétisme est un sport individuel ou collectif regroupant différentes épreuves de course, de saut et de lancer. " +
            "Le but est de réaliser les meilleures performances dans chaque discipline.",
    },
    {
        "_id": "4",
        "name": "Cricket",
        "description": "Le cricket est un sport collectif opposant deux équipes de onze joueurs sur un terrain ovale. " +
            "Le but est de marquer des points en frappant une balle avec une batte.",
    },
    {
        "_id": "5",
        "name": "Beach-volley",
        "description": "Le beach-volley est un sport collectif opposant deux équipes de deux joueurs sur une plage. " +
            "Le but est de marquer des points en envoyant un ballon dans le camp adverse.",
    },
    {
        "_id": "6",
        "name": "Football Américain",
        "description": "Le football américain est un sport collectif opposant deux équipes de onze joueurs sur un terrain rectangulaire. " +
            "Le but est de marquer des touchdowns en portant le ballon dans la zone d'en-but adverse.",
    },
    {
        "_id": "7",
        "name": "MMA",
        "description": "Le MMA (Mixed Martial Arts) est un sport de combat opposant deux combattants dans un octogone. " +
            "Le but est de remporter le combat par soumission, KO ou décision des juges.",
    },
    {
        "_id": "8",
        "name": "Esports",
        "description": "Les esports sont des compétitions de jeux vidéo opposant des joueurs ou des équipes de joueurs. " +
            "Le but est de remporter la partie en réalisant les meilleures performances.",
    },
];

let provider_sport_categories = [
    {
        "_id": "0",
        "prestataire_id": "3",
        "sportsCategories_id": "0"
    },
    {
        "_id": "1",
        "prestataire_id": "4",
        "sportsCategories_id": "1"
    },
    {
        "_id": "2",
        "prestataire_id": "5",
        "sportsCategories_id": "2"
    },
    {
        "_id": "3",
        "prestataire_id": "6",
        "sportsCategories_id": "0"
    },
    {
        "_id": "4",
        "prestataire_id": "7",
        "sportsCategories_id": "6"
    },
    {
        "_id": "5",
        "prestataire_id": "8",
        "sportsCategories_id": "2"
    },
    {
        "_id": "6",
        "prestataire_id": "9",
        "sportsCategories_id": "1"
    },
    {
        "_id": "7",
        "prestataire_id": "10",
        "sportsCategories_id": "3"
    },
    {
        "_id": "8",
        "prestataire_id": "11",
        "sportsCategories_id": "0"
    },
    {
        "_id": "9",
        "prestataire_id": "12",
        "sportsCategories_id": "1"
    },
    {
        "_id": "10",
        "prestataire_id": "13",
        "sportsCategories_id": "7"
    },
    {
        "_id": "11",
        "prestataire_id": "14",
        "sportsCategories_id": "0"
    },
    {
        "_id": "12",
        "prestataire_id": "15",
        "sportsCategories_id": "4"
    },
    {
        "_id": "13",
        "prestataire_id": "16",
        "sportsCategories_id": "5"
    },
    {
        "_id": "14",
        "prestataire_id": "17",
        "sportsCategories_id": "8"
    },
    {
        "_id": "15",
        "prestataire_id": "18",
        "sportsCategories_id": "8"
    }
];

let ticket_animation_categories = [
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
];


let ticket_age_categories = [
    {
        "_id": "0",
        "name": "Enfant",
        "description": "Pour les enfants de 0 à 12 ans",
    },
    {
        "_id": "1",
        "name": "Etudiant",
        "description": "Pour les étudiants de 13 à 25 ans",
    },
    {
        "_id": "2",
        "name": "Adulte",
        "description": "Pour les adultes à partir 26 ans",
    },
];

let ticket_prices = [
    // Animation: Sport
    { "_id": "0", "age_category_id": "0", "animation_category_id": "0", "price": "5" },
    { "_id": "1", "age_category_id": "1", "animation_category_id": "0", "price": "8" },
    { "_id": "2", "age_category_id": "2", "animation_category_id": "0", "price": "10" },

    // Animation: Jeux Vidéo
    { "_id": "3", "age_category_id": "0", "animation_category_id": "1", "price": "5" },
    { "_id": "4", "age_category_id": "1", "animation_category_id": "1", "price": "8" },
    { "_id": "5", "age_category_id": "2", "animation_category_id": "1", "price": "10" },

    // Animation: Sport et Jeux Vidéo
    { "_id": "6", "age_category_id": "0", "animation_category_id": "2", "price": "8" },
    { "_id": "7", "age_category_id": "1", "animation_category_id": "2", "price": "14" },
    { "_id": "8", "age_category_id": "2", "animation_category_id": "2", "price": "18" },
];

let tickets = [
    {
        "_id": "0",
        "date": "2024/10/30",
        "time": "07:00",
        "_idCustomer": "0",
        "price_id": "0",
    },
];

let dedication_dates = [
    // Lionel Messi
    {
        "_id": "0",
        "date": "2025-07-07",
        "time": "09:00",
        "anim_id": "3",
    },
    {
        "_id": "1",
        "date": "2025-07-07",
        "time": "10:00",
        "anim_id": "3",
    },

    // LeBron James
    {
        "_id": "2",
        "date": "2025-07-07",
        "time": "11:00",
        "anim_id": "4",
    },
    {
        "_id": "3",
        "date": "2025-07-07",
        "time": "13:00",
        "anim_id": "4",
    },

    // Serena Williams
    {
        "_id": "4",
        "date": "2025-07-07",
        "time": "14:00",
        "anim_id": "5",
    },
    {
        "_id": "5",
        "date": "2025-07-07",
        "time": "15:00",
        "anim_id": "5",
    },

    // Cristiano Ronaldo
    {
        "_id": "6",
        "date": "2025-07-07",
        "time": "16:00",
        "anim_id": "6",
    },
    {
        "_id": "7",
        "date": "2025-07-07",
        "time": "17:00",
        "anim_id": "6",
    },

    // Tom Brady
    {
        "_id": "8",
        "date": "2025-07-08",
        "time": "09:00",
        "anim_id": "7",
    },
    {
        "_id": "9",
        "date": "2025-07-08",
        "time": "10:00",
        "anim_id": "7",
    },

    // Roger Federer
    {
        "_id": "10",
        "date": "2025-07-08",
        "time": "11:00",
        "anim_id": "8",
    },
    {
        "_id": "11",
        "date": "2025-07-08",
        "time": "13:00",
        "anim_id": "8",
    },

    // Stephen Curry
    {
        "_id": "12",
        "date": "2025-07-08",
        "time": "14:00",
        "anim_id": "9",
    },
    {
        "_id": "13",
        "date": "2025-07-08",
        "time": "15:00",
        "anim_id": "9",
    },

    // Usain Bolt
    {
        "_id": "14",
        "date": "2025-07-08",
        "time": "16:00",
        "anim_id": "10",
    },
    {
        "_id": "15",
        "date": "2025-07-08",
        "time": "17:00",
        "anim_id": "10",
    },

    // Neymar Jr.
    {
        "_id": "16",
        "date": "2025-07-09",
        "time": "09:00",
        "anim_id": "11",
    },
    {
        "_id": "17",
        "date": "2025-07-09",
        "time": "10:00",
        "anim_id": "11",
    },

    // Michael Jordan
    {
        "_id": "18",
        "date": "2025-07-09",
        "time": "11:00",
        "anim_id": "12",
    },
    {
        "_id": "19",
        "date": "2025-07-09",
        "time": "13:00",
        "anim_id": "12",
    },

    // Khabib Nurmagomedov
    {
        "_id": "20",
        "date": "2025-07-09",
        "time": "14:00",
        "anim_id": "13",
    },
    {
        "_id": "21",
        "date": "2025-07-09",
        "time": "15:00",
        "anim_id": "13",
    },

    // Pele
    {
        "_id": "22",
        "date": "2025-07-09",
        "time": "16:00",
        "anim_id": "14",
    },
    {
        "_id": "23",
        "date": "2025-07-09",
        "time": "17:00",
        "anim_id": "14",
    },

    // Virat Kohli
    {
        "_id": "24",
        "date": "2025-07-10",
        "time": "09:00",
        "anim_id": "15",
    },
    {
        "_id": "25",
        "date": "2025-07-10",
        "time": "10:00",
        "anim_id": "15",
    },

    // Misty May-Treanor
    {
        "_id": "26",
        "date": "2025-07-10",
        "time": "11:00",
        "anim_id": "16",
    },
    {
        "_id": "27",
        "date": "2025-07-10",
        "time": "13:00",
        "anim_id": "16",
    },

    // Bugha
    {
        "_id": "28",
        "date": "2025-07-10",
        "time": "14:00",
        "anim_id": "17",
    },
    {
        "_id": "29",
        "date": "2025-07-10",
        "time": "15:00",
        "anim_id": "17",
    },

    // Ninja
    {
        "_id": "30",
        "date": "2025-07-10",
        "time": "16:00",
        "anim_id": "18",
    },
    {
        "_id": "31",
        "date": "2025-07-10",
        "time": "17:00",
        "anim_id": "18",
    }
];

let dedication_reservations = [
    {
        "_id": "0",
        "date": "2025-07-10",
        "time": "17:00",
        "ticket_id": "0",
        "anim_id": "18",
    },
];

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
];

let stands = [
    {
        "_id": "0",
        "name": "Stand 1",
        "price": "100",
        "pavillon_id": "0",
    },
    {
        "_id": "1",
        "name": "Stand 2",
        "price": "100",
        "pavillon_id": "0",
    },
    {
        "_id": "2",
        "name": "Stand 3",
        "price": "100",
        "pavillon_id": "0",
    },
    {
        "_id": "3",
        "name": "Stand 4",
        "price": "100",
        "pavillon_id": "0",
    },
    {
        "_id": "4",
        "name": "Stand 5",
        "price": "100",
        "pavillon_id": "1",
    },
    {
        "_id": "5",
        "name": "Stand 6",
        "price": "100",
        "pavillon_id": "1",
    },
    {
        "_id": "6",
        "name": "Stand 7",
        "price": "100",
        "pavillon_id": "1",
    },
    {
        "_id": "7",
        "name": "Stand 8",
        "price": "100",
        "pavillon_id": "1",
    },
    {
        "_id": "8",
        "name": "Stand 9",
        "price": "100",
        "pavillon_id": "1",
    },
    {
        "_id": "9",
        "name": "Stand 10",
        "price": "100",
        "pavillon_id": "1",
    },
    {
        "_id": "10",
        "name": "Stand 11",
        "price": "100",
        "pavillon_id": "1",
    },
    {
        "_id": "11",
        "name": "Stand 12",
        "price": "100",
        "pavillon_id": "1",
    },
    {
        "_id": "12",
        "name": "Stand 13",
        "price": "100",
        "pavillon_id": "1",
    },
    {
        "_id": "13",
        "name": "Stand 14",
        "price": "100",
        "pavillon_id": "1",
    },
    {
        "_id": "14",
        "name": "Stand 15",
        "price": "100",
        "pavillon_id": "1",
    },
    {
        "_id": "15",
        "name": "Stand 16",
        "price": "100",
        "pavillon_id": "1",
    },
    {
        "_id": "16",
        "name": "Stand 17",
        "price": "100",
        "pavillon_id": "1",
    },
    {
        "_id": "17",
        "name": "Stand 18",
        "price": "100",
        "pavillon_id": "1",
    },
    {
        "_id": "18",
        "name": "Stand 19",
        "price": "100",
        "pavillon_id": "1",
    },
    {
        "_id": "19",
        "name": "Stand 20",
        "price": "100",
        "pavillon_id": "1",
    },
    {
        "_id": "20",
        "name": "Stand 21",
        "price": "100",
        "pavillon_id": "2",
    },
    {
        "_id": "21",
        "name": "Stand 22",
        "price": "100",
        "pavillon_id": "2",
    },
    {
        "_id": "22",
        "name": "Stand 23",
        "price": "100",
        "pavillon_id": "2",
    },
    {
        "_id": "23",
        "name": "Stand 24",
        "price": "100",
        "pavillon_id": "2",
    },
    {
        "_id": "24",
        "name": "Stand 25",
        "price": "100",
        "pavillon_id": "2",
    },
    {
        "_id": "25",
        "name": "Stand 26",
        "price": "100",
        "pavillon_id": "2",
    },
    {
        "_id": "26",
        "name": "Stand 27",
        "price": "100",
        "pavillon_id": "2",
    },
    {
        "_id": "27",
        "name": "Stand 28",
        "price": "100",
        "pavillon_id": "2",
    },
    {
        "_id": "28",
        "name": "Stand 29",
        "price": "100",
        "pavillon_id": "2",
    },
    {
        "_id": "29",
        "name": "Stand 30",
        "price": "100",
        "pavillon_id": "2",
    },
    {
        "_id": "30",
        "name": "Stand 31",
        "price": "100",
        "pavillon_id": "2",
    },
    {
        "_id": "31",
        "name": "Stand 32",
        "price": "100",
        "pavillon_id": "2",
    },
    {
        "_id": "32",
        "name": "Stand 33",
        "price": "100",
        "pavillon_id": "2",
    },
    {
        "_id": "33",
        "name": "Terrain de Football",
        "price": "10000",
        "pavillon_id": "0",
    },
    {
        "_id": "34",
        "name": "Scène 1",
        "price": "10000",
        "pavillon_id": "1",
    },
    {
        "_id": "35",
        "name": "Scène 2",
        "price": "10000",
        "pavillon_id": "2",
    },
];

let stands_reservations = [
    {
        "_id": "0",
        "date": "2025-07-07",
        "start_time": "09:00",
        "end_time": "10:00",
        "description": "Venez rencontrer Lionel Messi !",
        "prestataire_id": "3",
        "service_id":"0",
        "stand_id": "4",
    },
    {
        "_id": "1",
        "date": "2025-07-07",
        "start_time": "10:00",
        "end_time": "11:00",
        "description": "Venez rencontrer LeBron James !",
        "prestataire_id": "4",
        "service_id":"0",
        "stand_id": "4",
    },
    {
        "_id": "2",
        "date": "2025-07-07",
        "start_time": "11:00",
        "end_time": "12:00",
        "description": "Venez rencontrer Serena Williams !",
        "prestataire_id": "5",
        "service_id":"0",
        "stand_id": "4",
    },
    {
        "_id": "3",
        "date": "2025-07-07",
        "start_time": "13:00",
        "end_time": "14:00",
        "description": "Venez rencontrer Cristiano Ronaldo !",
        "prestataire_id": "6",
        "service_id":"0",
        "stand_id": "4",
    },
    {
        "_id": "4",
        "date": "2025-07-07",
        "start_time": "14:00",
        "end_time": "15:00",
        "description": "Venez rencontrer Tom Brady !",
        "prestataire_id": "7",
        "service_id":"0",
        "stand_id": "4",
    },
    {
        "_id": "5",
        "date": "2025-07-07",
        "start_time": "15:00",
        "end_time": "16:00",
        "description": "Venez rencontrer Roger Federer !",
        "prestataire_id": "8",
        "service_id":"0",
        "stand_id": "4",
    },
    {
        "_id": "6",
        "date": "2025-07-07",
        "start_time": "16:00",
        "end_time": "17:00",
        "description": "Venez rencontrer Stephen Curry !",
        "prestataire_id": "9",
        "service_id":"0",
        "stand_id": "4",
    },
    {
        "_id": "7",
        "date": "2025-07-07",
        "start_time": "17:00",
        "end_time": "18:00",
        "description": "Venez rencontrer Usain Bolt !",
        "prestataire_id": "10",
        "service_id":"0",
        "stand_id": "4",
    },
    {
        "_id": "8",
        "date": "2025-07-07",
        "start_time": "12:00",
        "end_time": "13:00",
        "description": "Venez rencontrer Neymar Jr. !",
        "prestataire_id": "11",
        "service_id":"0",
        "stand_id": "4",
    },
    {
        "_id": "9",
        "date": "2025-07-08",
        "start_time": "10:00",
        "end_time": "11:00",
        "description": "Venez rencontrer Michael Jordan !",
        "prestataire_id": "12",
        "service_id":"0",
        "stand_id": "13",
    },
    {
        "_id": "10",
        "date": "2025-07-08",
        "start_time": "11:00",
        "end_time": "12:00",
        "name": "Stand 15",
        "description": "Venez rencontrer Khabib Nurmagomedov !",
        "price": "100",
        "prestataire_id": "13",
        "service_id":"0",
        "stand_id": "14",
    },
    {
        "_id": "11",
        "date": "2025-07-08",
        "start_time": "13:00",
        "end_time": "14:00",
        "description": "Venez rencontrer Pelé !",
        "prestataire_id": "14",
        "service_id":"0",
        "stand_id": "15",
    },
    {
        "_id": "12",
        "date": "2025-07-08",
        "start_time": "14:00",
        "end_time": "15:00",
        "description": "Venez rencontrer Virat Kohli !",
        "prestataire_id": "15",
        "service_id":"0",
        "stand_id": "16",
    },
    {
        "_id": "13",
        "date": "2025-07-08",
        "start_time": "15:00",
        "end_time": "16:00",
        "description": "Venez rencontrer Misty May-Treanor !",
        "prestataire_id": "16",
        "service_id":"0",
        "stand_id": "17",
    },
    {
        "_id": "14",
        "date": "2025-07-08",
        "start_time": "16:00",
        "end_time": "17:00",
        "description": "Venez rencontrer Bugha !",
        "prestataire_id": "17",
        "service_id":"0",
        "stand_id": "18",
    },
    {
        "_id": "15",
        "date": "2025-07-08",
        "start_time": "17:00",
        "end_time": "18:00",
        "description": "Venez rencontrer Ninja !",
        "prestataire_id": "18",
        "service_id":"0",
        "stand_id": "19",
    },
];

module.exports = {
    customer_accounts,
    service_categories,
    provider_service_categories,
    sports_categories,
    provider_sport_categories,
    ticket_animation_categories,
    ticket_age_categories,
    ticket_prices,
    tickets,
    dedication_dates,
    dedication_reservations,
    pavillons,
    stands,
    stands_reservations,
}
