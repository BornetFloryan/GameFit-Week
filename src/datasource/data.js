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
        "email": "roger.federer@prestataire.com",
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
        "email": "stephen.curry@prestataire.com",
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
        "email": "usain.bolt@prestataire.com",
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
        "email": "neymar.jr@prestataire.com",
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
        "email": "michael.jordan@prestataire.com",
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
        "email": "khabib.nurmagomedov@prestataire.com",
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
        "email": "pele@prestataire.com",
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
        "email": "virat.kohli@prestataire.com",
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
        "email": "misty.maytreanor@prestataire.com",
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
        "email": "bugha@prestataire.com",
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
        "email": "ninja@prestataire.com",
        "picture": "Ninja.jpg",
        "description": "Richard Tyler Blevins, dit Ninja, né le 5 juin 1991 à Detroit, est un joueur professionnel américain de jeux vidéo. Il est spécialisé dans les jeux Fortnite et Halo. Il est considéré comme l'un des meilleurs joueurs de jeux vidéo de tous les temps.",
        "privilege": "1",
        "session": ""
    }
];

let provider_requests = [
    {
        "_id": "0",
        "date": "2025-10-30",
        "status": "1",
        "customer_id": "3",
    },
    {
        "_id": "1",
        "date": "2025-10-30",
        "status": "1",
        "customer_id": "4",
    },
    {
        "_id": "2",
        "date": "2025-10-30",
        "status": "1",
        "customer_id": "5",
    },
    {
        "_id": "3",
        "date": "2025-10-30",
        "status": "1",
        "customer_id": "6",
    },
    {
        "_id": "4",
        "date": "2025-10-30",
        "status": "1",
        "customer_id": "7",
    },
    {
        "_id": "5",
        "date": "2025-10-30",
        "status": "1",
        "customer_id": "8",
    },
    {
        "_id": "6",
        "date": "2025-10-30",
        "status": "1",
        "customer_id": "9",
    },
    {
        "_id": "7",
        "date": "2025-10-30",
        "status": "1",
        "customer_id": "10",
    },
    {
        "_id": "8",
        "date": "2025-10-30",
        "status": "1",
        "customer_id": "11",
    },
    {
        "_id": "9",
        "date": "2025-10-30",
        "status": "1",
        "customer_id": "12",
    },
    {
        "_id": "10",
        "date": "2025-10-30",
        "status": "1",
        "customer_id": "13",
    },
    {
        "_id": "11",
        "date": "2025-10-30",
        "status": "1",
        "customer_id": "14",
    },
    {
        "_id": "12",
        "date": "2025-10-30",
        "status": "1",
        "customer_id": "15",
    },
    {
        "_id": "13",
        "date": "2025-10-30",
        "status": "1",
        "customer_id": "16",
    },
    {
        "_id": "14",
        "date": "2025-10-30",
        "status": "1",
        "customer_id": "17",
    },
    {
        "_id": "15",
        "date": "2025-10-30",
        "status": "1",
        "customer_id": "18",
    },
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
        "status": "1",
        "customer_id": "3", // Lionel Messi
        "service_category_id": "0" // Dédicace
    },
    {
        "_id": "1",
        "status": "1",
        "customer_id": "3", // LeBron James
        "service_category_id": "1" // Dédicace
    },
    {
        "_id": "2",
        "status": "1",
        "customer_id": "5", // Serena Williams
        "service_category_id": "0" // Dédicace
    },
    {
        "_id": "3",
        "status": "1",
        "customer_id": "6", // Cristiano Ronaldo
        "service_category_id": "0" // Dédicace
    },
    {
        "_id": "4",
        "status": "1",
        "customer_id": "7", // Tom Brady
        "service_category_id": "0" // Dédicace
    },
    {
        "_id": "5",
        "status": "1",
        "customer_id": "8", // Roger Federer
        "service_category_id": "0" // Dédicace
    },
    {
        "_id": "6",
        "status": "1",
        "customer_id": "9", // Stephen Curry
        "service_category_id": "0" // Dédicace
    },
    {
        "_id": "7",
        "status": "1",
        "customer_id": "10", // Usain Bolt
        "service_category_id": "0" // Dédicace
    },
    {
        "_id": "8",
        "status": "1",
        "customer_id": "11", // Neymar Jr.
        "service_category_id": "0" // Dédicace
    },
    {
        "_id": "9",
        "status": "1",
        "customer_id": "12", // Michael Jordan
        "service_category_id": "0" // Dédicace
    },
    {
        "_id": "10",
        "status": "1",
        "customer_id": "13", // Khabib Nurmagomedov
        "service_category_id": "0" // Dédicace
    },
    {
        "_id": "11",
        "status": "1",
        "customer_id": "14", // Pelé
        "service_category_id": "0" // Dédicace
    },
    {
        "_id": "12",
        "status": "1",
        "customer_id": "15", // Virat Kohli
        "service_category_id": "0" // Dédicace
    },
    {
        "_id": "13",
        "status": "1",
        "customer_id": "16", // Misty May-Treanor
        "service_category_id": "0" // Dédicace
    },
    {
        "_id": "14",
        "status": "1",
        "customer_id": "17", // Bugha
        "service_category_id": "0" // Dédicace
    },
    {
        "_id": "15",
        "status": "1",
        "customer_id": "18", // Ninja
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
        "customer_id": "3",
        "sportsCategories_id": "0"
    },
    {
        "_id": "1",
        "customer_id": "4",
        "sportsCategories_id": "1"
    },
    {
        "_id": "2",
        "customer_id": "5",
        "sportsCategories_id": "2"
    },
    {
        "_id": "3",
        "customer_id": "6",
        "sportsCategories_id": "0"
    },
    {
        "_id": "4",
        "customer_id": "7",
        "sportsCategories_id": "6"
    },
    {
        "_id": "5",
        "customer_id": "8",
        "sportsCategories_id": "2"
    },
    {
        "_id": "6",
        "customer_id": "9",
        "sportsCategories_id": "1"
    },
    {
        "_id": "7",
        "customer_id": "10",
        "sportsCategories_id": "3"
    },
    {
        "_id": "8",
        "customer_id": "11",
        "sportsCategories_id": "0"
    },
    {
        "_id": "9",
        "customer_id": "12",
        "sportsCategories_id": "1"
    },
    {
        "_id": "10",
        "customer_id": "13",
        "sportsCategories_id": "7"
    },
    {
        "_id": "11",
        "customer_id": "14",
        "sportsCategories_id": "0"
    },
    {
        "_id": "12",
        "customer_id": "15",
        "sportsCategories_id": "4"
    },
    {
        "_id": "13",
        "customer_id": "16",
        "sportsCategories_id": "5"
    },
    {
        "_id": "14",
        "customer_id": "17",
        "sportsCategories_id": "8"
    },
    {
        "_id": "15",
        "customer_id": "18",
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
        "customer_id": "0",
        "price_id": "0",
    },
];

let dedication_dates = [
    // Lionel Messi
    {
        "_id": "0",
        "date": "2025-07-07",
        "time": "09:00",
        "customer_id": "3",
    },
    {
        "_id": "1",
        "date": "2025-07-07",
        "time": "10:00",
        "customer_id": "3",
    },

    // LeBron James
    {
        "_id": "2",
        "date": "2025-07-07",
        "time": "11:00",
        "customer_id": "4",
    },
    {
        "_id": "3",
        "date": "2025-07-07",
        "time": "13:00",
        "customer_id": "4",
    },

    // Serena Williams
    {
        "_id": "4",
        "date": "2025-07-07",
        "time": "14:00",
        "customer_id": "5",
    },
    {
        "_id": "5",
        "date": "2025-07-07",
        "time": "15:00",
        "customer_id": "5",
    },

    // Cristiano Ronaldo
    {
        "_id": "6",
        "date": "2025-07-07",
        "time": "16:00",
        "customer_id": "6",
    },
    {
        "_id": "7",
        "date": "2025-07-07",
        "time": "17:00",
        "customer_id": "6",
    },

    // Tom Brady
    {
        "_id": "8",
        "date": "2025-07-08",
        "time": "09:00",
        "customer_id": "7",
    },
    {
        "_id": "9",
        "date": "2025-07-08",
        "time": "10:00",
        "customer_id": "7",
    },

    // Roger Federer
    {
        "_id": "10",
        "date": "2025-07-08",
        "time": "11:00",
        "customer_id": "8",
    },
    {
        "_id": "11",
        "date": "2025-07-08",
        "time": "13:00",
        "customer_id": "8",
    },

    // Stephen Curry
    {
        "_id": "12",
        "date": "2025-07-08",
        "time": "14:00",
        "customer_id": "9",
    },
    {
        "_id": "13",
        "date": "2025-07-08",
        "time": "15:00",
        "customer_id": "9",
    },

    // Usain Bolt
    {
        "_id": "14",
        "date": "2025-07-08",
        "time": "16:00",
        "customer_id": "10",
    },
    {
        "_id": "15",
        "date": "2025-07-08",
        "time": "17:00",
        "customer_id": "10",
    },

    // Neymar Jr.
    {
        "_id": "16",
        "date": "2025-07-09",
        "time": "09:00",
        "customer_id": "11",
    },
    {
        "_id": "17",
        "date": "2025-07-09",
        "time": "10:00",
        "customer_id": "11",
    },

    // Michael Jordan
    {
        "_id": "18",
        "date": "2025-07-09",
        "time": "11:00",
        "customer_id": "12",
    },
    {
        "_id": "19",
        "date": "2025-07-09",
        "time": "13:00",
        "customer_id": "12",
    },

    // Khabib Nurmagomedov
    {
        "_id": "20",
        "date": "2025-07-09",
        "time": "14:00",
        "customer_id": "13",
    },
    {
        "_id": "21",
        "date": "2025-07-09",
        "time": "15:00",
        "customer_id": "13",
    },

    // Pele
    {
        "_id": "22",
        "date": "2025-07-09",
        "time": "16:00",
        "customer_id": "14",
    },
    {
        "_id": "23",
        "date": "2025-07-09",
        "time": "17:00",
        "customer_id": "14",
    },

    // Virat Kohli
    {
        "_id": "24",
        "date": "2025-07-10",
        "time": "09:00",
        "customer_id": "15",
    },
    {
        "_id": "25",
        "date": "2025-07-10",
        "time": "10:00",
        "customer_id": "15",
    },

    // Misty May-Treanor
    {
        "_id": "26",
        "date": "2025-07-10",
        "time": "11:00",
        "customer_id": "16",
    },
    {
        "_id": "27",
        "date": "2025-07-10",
        "time": "13:00",
        "customer_id": "16",
    },

    // Bugha
    {
        "_id": "28",
        "date": "2025-07-10",
        "time": "14:00",
        "customer_id": "17",
    },
    {
        "_id": "29",
        "date": "2025-07-10",
        "time": "15:00",
        "customer_id": "17",
    },

    // Ninja
    {
        "_id": "30",
        "date": "2025-07-10",
        "time": "16:00",
        "customer_id": "18",
    },
    {
        "_id": "31",
        "date": "2025-07-10",
        "time": "17:00",
        "customer_id": "18",
    }
];

let dedication_reservations = [
    {
        "_id": "0",
        "date": "2025-07-10",
        "time": "17:00",
        "ticket_id": "0",
        "customer_id": "18",
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
        "customer_id": "3",
        "service_id":"0",
        "stand_id": "4",
    },
    {
        "_id": "1",
        "date": "2025-07-07",
        "start_time": "10:00",
        "end_time": "11:00",
        "description": "Venez rencontrer LeBron James !",
        "customer_id": "4",
        "service_id":"0",
        "stand_id": "4",
    },
    {
        "_id": "2",
        "date": "2025-07-07",
        "start_time": "11:00",
        "end_time": "12:00",
        "description": "Venez rencontrer Serena Williams !",
        "customer_id": "5",
        "service_id":"0",
        "stand_id": "4",
    },
    {
        "_id": "3",
        "date": "2025-07-07",
        "start_time": "13:00",
        "end_time": "14:00",
        "description": "Venez rencontrer Cristiano Ronaldo !",
        "customer_id": "6",
        "service_id":"0",
        "stand_id": "4",
    },
    {
        "_id": "4",
        "date": "2025-07-07",
        "start_time": "14:00",
        "end_time": "15:00",
        "description": "Venez rencontrer Tom Brady !",
        "customer_id": "7",
        "service_id":"0",
        "stand_id": "4",
    },
    {
        "_id": "5",
        "date": "2025-07-07",
        "start_time": "15:00",
        "end_time": "16:00",
        "description": "Venez rencontrer Roger Federer !",
        "customer_id": "8",
        "service_id":"0",
        "stand_id": "4",
    },
    {
        "_id": "6",
        "date": "2025-07-07",
        "start_time": "16:00",
        "end_time": "17:00",
        "description": "Venez rencontrer Stephen Curry !",
        "customer_id": "9",
        "service_id":"0",
        "stand_id": "4",
    },
    {
        "_id": "7",
        "date": "2025-07-07",
        "start_time": "17:00",
        "end_time": "18:00",
        "description": "Venez rencontrer Usain Bolt !",
        "customer_id": "10",
        "service_id":"0",
        "stand_id": "4",
    },
    {
        "_id": "8",
        "date": "2025-07-07",
        "start_time": "12:00",
        "end_time": "13:00",
        "description": "Venez rencontrer Neymar Jr. !",
        "customer_id": "11",
        "service_id":"0",
        "stand_id": "4",
    },
    {
        "_id": "9",
        "date": "2025-07-08",
        "start_time": "10:00",
        "end_time": "11:00",
        "description": "Venez rencontrer Michael Jordan !",
        "customer_id": "12",
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
        "customer_id":"13",
        "service_id":"0",
        "stand_id": "14",
    },
    {
        "_id": "11",
        "date": "2025-07-08",
        "start_time": "13:00",
        "end_time": "14:00",
        "description": "Venez rencontrer Pelé !",
        "customer_id":"14",
        "service_id":"0",
        "stand_id": "15",
    },
    {
        "_id": "12",
        "date": "2025-07-08",
        "start_time": "14:00",
        "end_time": "15:00",
        "description": "Venez rencontrer Virat Kohli !",
        "customer_id":"15",
        "service_id":"0",
        "stand_id": "16",
    },
    {
        "_id": "13",
        "date": "2025-07-08",
        "start_time": "15:00",
        "end_time": "16:00",
        "description": "Venez rencontrer Misty May-Treanor !",
        "customer_id":"16",
        "service_id":"0",
        "stand_id": "17",
    },
    {
        "_id": "14",
        "date": "2025-07-08",
        "start_time": "16:00",
        "end_time": "17:00",
        "description": "Venez rencontrer Bugha !",
        "customer_id":"17",
        "service_id":"0",
        "stand_id": "18",
    },
    {
        "_id": "15",
        "date": "2025-07-08",
        "start_time": "17:00",
        "end_time": "18:00",
        "description": "Venez rencontrer Ninja !",
        "customer_id": "18",
        "service_id":"0",
        "stand_id": "19",
    },
];

let proteams = [
    {
        "id": "1",
        "name": "Team Liquid",
        "img": require("../assets/img/TL_Logo.jpg"),
        "description": "Team Liquid est l’une des organisations les plus emblématiques de l’e-sport mondial, reconnue pour son incroyable polyvalence et ses résultats constants dans de multiples disciplines telles que Dota 2, League of Legends, CS:GO et bien d’autres. Fondée en 2000, cette équipe a su évoluer avec les tendances de l’industrie, recrutant des talents de classe mondiale et développant des stratégies innovantes. Leur capacité à s’adapter à différents styles de jeu et à maintenir un haut niveau de performance les a souvent placés parmi les favoris dans les compétitions majeures. Au-delà de leurs performances en tournoi, Team Liquid est également reconnue pour son engagement envers la communauté e-sportive et son influence dans la culture gaming.",
    },
    {
        "id": "2",
        "name": "Fnatic",
        "img": require("../assets/img/FNATIC_Logo.jpg"),
        "description": "Fnatic est une légende vivante de l’e-sport, avec un palmarès impressionnant couvrant plus d’une décennie. Cette équipe basée au Royaume-Uni est particulièrement célèbre pour son succès dans League of Legends et CS:GO, où elle a remporté de nombreux titres prestigieux. Fnatic est connue pour son approche innovante du jeu, testant constamment de nouvelles stratégies et surprenant ses adversaires avec des mouvements imprévisibles. Leur équipe est composée de joueurs talentueux qui excellent individuellement tout en montrant une synergie d’équipe remarquable. En plus de leur succès compétitif, Fnatic est un pionnier dans la promotion de l’e-sport en tant que phénomène global, grâce à des partenariats innovants et une forte présence sur les réseaux sociaux.",
    },
    {
        "id": "3",
        "name": "G2 Esports",
        "img": require("../assets/img/G2_Logo.jpg"),
        "description": "G2 Esports, souvent surnommée 'les Samouraïs', est une organisation qui combine talent brut, flair et charisme. Basée en Europe, cette équipe s’est imposée comme l’une des plus dominantes dans des jeux comme League of Legends, CS:GO et Valorant. G2 est connue pour son style de jeu agressif et audacieux, qui leur permet de dicter le rythme des parties et de maintenir leurs adversaires sous pression constante. En dehors du terrain, G2 Esports est célèbre pour son humour et son approche décontractée, attirant une base de fans passionnés. Malgré cette légèreté apparente, leur engagement envers l’excellence compétitive est indéniable, et ils continuent de figurer parmi les meilleures équipes dans presque toutes les disciplines qu’ils touchent.",
    },
    {
        "id": "4",
        "name": "T1",
        "img": require("../assets/img/T1_Logo.jpg"),
        "description": "T1 est une institution en Corée du Sud et un nom incontournable dans l’histoire de l’e-sport mondial, notamment grâce à ses incroyables succès dans League of Legends. Avec Faker, considéré comme le plus grand joueur de l’histoire de LoL, T1 a remporté trois championnats du monde et continue de figurer parmi les équipes les plus redoutées du circuit. Leur jeu repose sur une discipline tactique rigoureuse, une exécution mécanique parfaite et une préparation stratégique qui les distingue des autres équipes. En plus de leur domination dans LoL, T1 s’est également aventurée dans d’autres titres comme Valorant, où ils cherchent à étendre leur héritage légendaire. Leur influence dépasse les frontières du jeu, faisant d’eux des ambassadeurs de la culture e-sportive coréenne dans le monde entier.",
    },
    {
        "id": "5",
        "name": "Cloud9",
        "img": require("../assets/img/Cloud9_Logo.jpg"),
        "description": "Cloud9 est une organisation nord-américaine qui représente l’innovation et l’adaptabilité dans l’e-sport. Active dans des jeux comme CS:GO, League of Legends, et Valorant, cette équipe est connue pour ses stratégies créatives et son style de jeu rapide qui met constamment ses adversaires sur la défensive. Fondée en 2013, Cloud9 a rapidement gravi les échelons pour devenir l’une des équipes les plus respectées sur la scène internationale. Ce qui les distingue, c’est leur capacité à exceller dans des situations de forte pression, où ils transforment souvent des désavantages apparents en victoires spectaculaires. Cloud9 est également adorée pour sa culture d’équipe positive et son approche inclusive, ce qui en fait un favori des fans.",
    },
    {
        "id": "6",
        "name": "Natus Vincere",
        "img": require("../assets/img/NAVI_Logo.jpg"),
        "description": "Natus Vincere, ou NAVI, est une organisation ukrainienne de renom qui domine depuis des années la scène compétitive dans des jeux comme CS:GO et Dota 2. NAVI a marqué l’histoire en devenant la première équipe à remporter un Grand Chelem en CS:GO, en décrochant tous les titres majeurs de la saison 2021. Leur style de jeu repose sur une combinaison de tactiques méticuleuses, de coordination d’équipe impeccable et de performances individuelles exceptionnelles. Les joueurs de NAVI, comme s1mple, sont souvent considérés parmi les meilleurs au monde dans leurs disciplines respectives. Au-delà de leurs succès compétitifs, NAVI incarne la résilience et la passion, représentant fièrement leur région sur la scène mondiale.",
    },
    {
        "id": "7",
        "name": "Evil Geniuses",
        "img": require("../assets/img/EG_Logo.jpg"),
        "description": "Evil Geniuses, fondée en 1999, est l’une des organisations les plus anciennes et les plus respectées de l’e-sport. Connue pour ses succès dans des titres comme Dota 2, CS:GO et Valorant, EG est une équipe qui allie expérience, innovation et détermination. Leur victoire emblématique à The International 2015 reste un moment légendaire dans l’histoire de Dota 2. Ce qui distingue Evil Geniuses, c’est leur capacité à analyser le jeu de leurs adversaires et à s’adapter rapidement, leur permettant de prendre l’avantage même dans des situations difficiles. En dehors des compétitions, EG est reconnue pour son engagement envers le développement des talents et son rôle de pionnier dans l’e-sport.",
    },
    {
        "id": "8",
        "name": "100 Thieves",
        "img": require("../assets/img/100T_Logo.jpg"),
        "description": "100 Thieves est une organisation jeune et dynamique qui a rapidement gagné en popularité grâce à son approche novatrice de l’e-sport. Fondée par l’ancien joueur professionnel Matthew 'Nadeshot' Haag, 100 Thieves a su se démarquer à la fois sur le terrain, dans des jeux comme Valorant et League of Legends, et en dehors grâce à son identité de marque unique. Ils combinent une stratégie de jeu efficace avec une communication de marque axée sur le lifestyle, attirant une audience qui dépasse le simple cadre des compétitions. En compétition, 100 Thieves est reconnue pour ses stratégies bien pensées, ses joueurs talentueux et son esprit d’équipe inébranlable, qui leur permettent de s’imposer comme un sérieux concurrent dans les tournois internationaux.",
    }
]

module.exports = {
    customer_accounts,
    provider_requests,
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
    proteams
}
