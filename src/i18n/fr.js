export default {
    nav: {
      home: 'Accueil',
      ticketing: 'Billetterie',
      services: 'Prestations',
      live: 'En direct',
      login: 'Se connecter',
      logout: 'Déconnexion',
      profile: 'Profil',
      orders: 'Commandes',
      reservations: 'Réservations',
      tickets: 'Billets',
      dashboard: 'Tableau de bord',
      request: 'Demande',
      providerList: 'Liste des prestataires',
      dedicaces: 'Dédicaces',
      tournaments: 'Tournois',
      goodies: 'Goodies',
      stream: 'En direct',
    },
    home: {
        
      explain: {
        title: '<p>Qu’est-ce que <span style="color: rgb(102, 163, 224);">GameFit Week</span> ?</p>',
        description: '<p>Situé à Paris, GameFit Week rassemble passionnés, amateurs et experts.</p>',
      },
      main: {
        title: '<p>Bienvenue à <span style="color: rgb(102, 163, 224);">GameFit Week</span></p>',
        description: '<p>L’événement qui fusionne sport et esport dans une expérience unique.</p>',
      },
      cards: [
        {
          title: 'Une célébration du sport et de l’esport',
          description: 'Participez à des compétitions exaltantes.',
        },
        {
          title: 'Les Activités',
          description: 'Participez à des activités interactives.',
        },
        {
          title: 'Les Services',
          description: 'Explorez des services de qualité.',
        },
      ],
      join_button: 'Rejoignez-nous',


      carousel: {
        slides: {
          slide1: {
            title: 'Réservation de Dédicaces',
            text: 'Rencontrez vos idoles de l’esport et du sport en personne !<br>Réservez une séance de dédicaces privée et repartez avec un souvenir personnalisé.',
            link: 'Voir plus',
          },
          slide2: {
            title: 'Diffusion en direct',
            text: 'Suivez GameFit Week en temps réel avec nos streams en haute définition.<br>Ne manquez aucune compétition, interview ou moment clé, où que vous soyez.',
            link: 'Voir plus',
          },
          slide3: {
            title: 'Les Tournois',
            text: "Assistez aux matchs palpitants entre équipes sportives ou esportives lors de GameFit Week.<br>Suivez l'intensité de la compétition et soutenez vos équipes favorites dans des affrontements spectaculaires.",
            link: 'Voir plus',
          }
        }
    }
    },

    login: {
      title: "Connexion",
      username: "Nom d'utilisateur",
      username_placeholder: "Entrez votre nom d'utilisateur",
      password: "Mot de passe",
      password_placeholder: "Entrez votre mot de passe",
      login_button: "Se connecter",
      register_button: "Créer un compte",
      provider_button: "Devenir Prestataire",
      error_message: "Une erreur est survenue lors de la connexion.",
    },

    register: {
      title: "Enregistrement",
      email: "Email",
      email_placeholder: "Entrez votre email",
      name: "Nom Prénom",
      name_placeholder: "Entrez votre nom et prénom",
      username: "Nom d'utilisateur",
      username_placeholder: "Entrez votre nom d'utilisateur",
      password: "Mot de passe",
      password_placeholder: "Entrez votre mot de passe",
      register_button: "S'enregistrer",
      cancel_button: "Annuler",
      error_message: "Une erreur est survenue lors de l'enregistrement.",
    },
    reservation: {
      number: "Numéro",
      host: "Animateur",
      stand: "Stand",
      service: "Service",
      date: "Date",
      time: "Horaire",
      operation: "Opération",
      stand_label: "Stand",
      cancel: "Annuler",
    },
    dedication: {
      welcome_title: "Bienvenue dans le système de dédicace",
      welcome_message: "Réservez un créneau pour rencontrer votre animateur préféré et obtenir une dédicace personnalisée !",
      enter_ticket: "Entrez votre numéro de billet",
      book_now: "Réservez maintenant",
      easy_to_use: "Simple à utiliser",
      easy_to_use_desc: "Une interface intuitive pour choisir votre animateur et réserver un créneau horaire rapidement.",
      available_anytime: "Disponible à tout moment",
      available_anytime_desc: "Réservez votre créneau horaire 24h/24, 7j/7 selon les disponibilités des animateurs.",
      personalized_dedication: "Dédicaces personnalisées",
      personalized_dedication_desc: "Obtenez une dédicace unique et mémorable pour vous ou vos proches.",
    },
    ticket: {
      number: "Numéro",
      date: "Date",
      email: "Adresse e-mail",
      age_category: "Catégorie d'âge",
      price: "Prix",
      actions: "Actions",
      delete: "Supprimer",
    },

    provider_request: {
      title: "Demande pour devenir prestataire",
      number: "Numéro",
      date: "Date",
      services: "Services",
      status: "Statut",
      pending: "En attente",
      validated: "Validé",
      refused: "Refusé",
      unknown: "Inconnu",
      no_requests: "Aucune demande trouvée pour l'utilisateur actuel.",
      no_services: "Aucun service trouvé pour l'utilisateur actuel.",
      error_fetching: "Erreur lors de la récupération des données :",
    },

    order: {
      title: "Vue des commandes",
      no_order: "Aucune commande",
      number: "Numéro de commande",
      shop: "Boutique",
      date: "Date",
      ticket_number: "Numéro de ticket",
      status: "État",
      actions: "Actions",
      show_details: "Voir le détail",
      show_qr: "Afficher QR Code",
      details_title: "Détails de la commande",
      total: "Total",
      in_preparation: "En préparation",
      to_collect: "À venir récupérer",
      collected: "Récupérée",
      unknown: "Inconnu",
    },

  ticketing: {
    title: "Billetterie",
    emailLabel: "Email",
    ageCategoryLabel: "Catégorie d'âge",
    selectAgeCategory: "Sélectionnez la catégorie d'âge",
    ticketCountLabel: "Nombre de billets",
    priceLabel: "Prix",
    paymentMethodLabel: "Méthode de paiement",
    creditCard: "Carte de crédit",
    cardNumber: "Numéro de carte",
    expiryDate: "Date d'expiration",
    cvv: "CVV",
    buyButton: "Acheter le billet",
    successTitle: "Achat réussi",
    successMessage: "Merci pour votre achat!",
    ticketNumber: "Numéro de billet",
    viewTickets: "Voir les billets",
    homeButton: "Accueil",
    ageCategories: {
      enfant: "Enfant",
      etudiant: "Étudiant",
      adulte: "Adulte"
    }
  },

  guestbook: {
    title: "Livre d'Or",
    rating: "Note",
    comment: "Commentaire",
    addEntry: "Ajouter une Entrée",
    mustUseService: "Vous devez avoir utilisé un service proposé par le prestataire pour pouvoir ajouter une entrée.",
    mustBeLoggedIn: "Vous devez être connecté pour ajouter une entrée.",
    date: "Date",
    user: "Utilisateur",
    report: "Signaler",
    reportEntry: "Signaler une entrée",
    reason: "Raison",
    submit: "Valider",
    reportSuccess: "Votre signalement a bien été pris en compte."
  },

    provider_list: {
      title: "Liste des prestataires",
      search_placeholder: "Rechercher un prestataire...",
      all_services: "Tous les services",
      guestbook: "Livre d'or",
      calendar: "Calendrier",
      name: "Nom",
      email: "Email",
      description: "Description",
      info_button: "Accéder à l'espace du prestataire",
      provider_image: "Image du prestataire",
      unknown_service: "Service inconnu",
      unknown_name: "Nom inconnu",
      unknown_email: "Email inconnu",
      no_description: "Aucune description",
      load_error: "Erreur lors du chargement des prestataires",
    },

    signature: {
      reservation_title: "Réservation de créneau de signature",
      reservation_success: "Réservation effectuée !",
      select_animator: "Sélectionnez votre animateur",
      your_animator: "Votre animateur",
      search_animator: "Rechercher un animateur...",
      animator_image: "Image de l'animateur",
      book: "Réserver",
      change_animator: "Changer d'animateur",
      select_time_slot: "Sélectionnez votre créneau horaire",
      time: "Heure",
      select_time: "Sélectionnez une heure",
      cancel: "Annuler",
    },

    dedication_home: {
      title: "Bienvenue dans le système de dédicace",
      description: "Réservez un créneau pour rencontrer votre animateur préféré et obtenir une dédicace personnalisée !",
      search_placeholder: "Entrez votre numéro de billet",
      reserve_button: "Réservez maintenant",
      feature_simple: "Simple à utiliser",
      feature_simple_desc: "Une interface intuitive pour choisir votre animateur et réserver un créneau horaire rapidement.",
      feature_anytime: "Disponible à tout moment",
      feature_anytime_desc: "Réservez votre créneau horaire 24h/24, 7j/7 selon les disponibilités des animateurs.",
      feature_custom: "Dédicaces personnalisées",
      feature_custom_desc: "Obtenez une dédicace unique et mémorable pour vous ou vos proches.",
      ticket_invalid: "Numéro de billet invalide",
    },

    profile: {
      personal_info: "Informations Personnelles",
      email: "Email",
      name: "Nom Prénom",
      username: "Nom d'utilisateur",
      modify_button: "Modifier",
      cancel_button: "Retour",
      modify_success: "Les informations ont été mises à jour avec succès.",
      modify_error: "Erreur lors de la modification des informations",
    },

  stand_info: {
    stand_title: "Planning du stand : ",
    service_label: "Prestation",
    provider_label: "Prestataire"
  },

  service_categories: {
    dédicace: "Dédicace",
    goodies: "Goodies"
  },

  reservationView: {
    number: "Numéro",
    host: "Animateur",
    stand: "Stand",
    service: "Service",
    date: "Date",
    time: "Horaire",
    operation: "Opération",
    cancel: "Annuler",
    email: "Adresse e-mail",
    ageCategory: "Catégorie d'âge",
    price: "Prix"
  },

  orderView: {
    orderNumber: "Numéro de commande",
    shop: "Boutique",
    date: "Date",
    ticketNumber: "Numéro de ticket",
    state: "État",
    actions: "Actions",
    viewDetails: "Voir le détail",
    showQRCode: "Afficher QR Code",
    orderDetails: "Détails de la commande",
    total: "Total",
    noOrders: "Aucune commande"
  },

  registerProvider: {
    title: "Devenir prestataire",
    email: "Adresse email",
    name: "Nom de l'entreprise ou NOM Prénom",
    serviceType: "Type de prestation",
    chooseServiceType: "Choisissez votre type de prestation",
    username: "Nom d'utilisateur",
    password: "Mot de passe",
    submit: "S'inscrire"
  },

  providerRequestView: {
    title: "Demande pour devenir prestataire",
    number: "Numéro",
    date: "Date",
    services: "Services",
    status: "Statut",
    unknown: "Inconnu",
    statusTexts: {
      pending: "en attente",
      approved: "validé",
      rejected: "refusé",
      unknown: "inconnu"
    }
  },

  prestataireInfo: {
    servicesOffered: "Services Proposés",
    guestbookNotActivated: "Le livre d'or n'est pas activé.",
    back: "Retour"
  },

  providerSchedule: {
    activateService: "Activer le service",
    deactivateService: "Désactiver le service",
    scheduleTitle: "Planning du Prestataire pour la Semaine de l'Événement",
    scheduleDisabled: "L'emploi du temps est désactivé",
    tooltip: "En savoir plus",
    serviceActivated: "Service activé avec succès",
    serviceDeactivated: "Service désactivé avec succès",
    updateError: "Erreur lors de la mise à jour du statut du service",
    statusNotFound: "Erreur: Statut du planning non trouvé pour ce prestataire"
  }
    
  };
  
