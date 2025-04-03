export default {
    nav: {
        home: 'Home',
        ticketing: 'Ticketing',
        services: 'Services',
        live: 'Live',
        login: 'Login',
        logout: 'Logout',
        profile: 'Profile',
        orders: 'Orders',
        reservations: 'Reservations',
        tickets: 'Tickets',
        dashboard: 'Dashboard',
        request: 'Request',
        providerList: 'Provider List',
        dedicaces: 'Dedications',
        tournaments: 'Tournaments',
        goodies: 'Goodies',
        stream: 'Stream',
    },
    home: {
        explain: {
            title: '<p>What is <span style="color: rgb(102, 163, 224);">GameFit Week</span>?</p>',
            description: '<p>Located in <span style="color: rgb(102, 163, 224);">Paris</span>, GameFit Week brings together enthusiasts, amateurs, and experts.</p>',
        },
        main: {
            title: '<p>Welcome to <span style="color: rgb(102, 163, 224);">GameFit Week</span></p>',
            description: '<p>The event that merges sports and esports into a unique experience.</p>',
        },

        cards: [
            {
                title: 'A Celebration of Sports and Esports',
                description: 'Take part in thrilling competitions.',
            },
            {
                title: 'Activities',
                description: 'Join interactive activities.',
            },
            {
                title: 'Services',
                description: 'Explore high-quality services.',
            },
        ],
        join_button: 'Join us',
        carousel: {
            slides: {
                slide1: {
                    title: 'Signature Reservation',
                    text: 'Meet your esports and sports idols in person!<br>Book a private autograph session and leave with a personalized souvenir.',
                    link: 'See more',
                },
                slide2: {
                    title: 'Live Streaming',
                    text: 'Follow GameFit Week in real time with our high-definition streams.<br>Don’t miss any competition, interview, or key moment, wherever you are.',
                    link: 'See more',
                },
                slide3: {
                    title: 'Tournaments',
                    text: "Attend thrilling matches between sports and esports teams during GameFit Week.<br>Experience the intensity of the competition and support your favorite teams in spectacular showdowns.",
                    link: 'See more',
                }
            }

        }
    },

    login: {
        title: "Login",
        username: "Username",
        username_placeholder: "Enter your username",
        password: "Password",
        password_placeholder: "Enter your password",
        login_button: "Login to account",
        register_button: "Create an account",
        provider_button: "Become a Provider",
        error_message: "An error occurred during login.",
    },

    register: {
        title: "Register",
        email: "Email",
        email_placeholder: "Enter your email",
        name: "Full Name",
        name_placeholder: "Enter your full name",
        username: "Username",
        username_placeholder: "Enter your username",
        password: "Password",
        password_placeholder: "Enter your password",
        register_button: "Register",
        cancel_button: "Cancel",
        error_message: "An error occurred during registration.",
    },

    reservation: {
        number: "Number",
        host: "Host",
        stand: "Stand",
        service: "Service",
        date: "Date",
        time: "Time",
        operation: "Operation",
        stand_label: "Stand",
        cancel: "Cancel",
    },

    dedication: {
        welcome_title: "Welcome to the Dedication System",
        welcome_message: "Book a slot to meet your favorite host and get a personalized dedication!",
        enter_ticket: "Enter your ticket number",
        book_now: "Book Now",
        easy_to_use: "Easy to Use",
        easy_to_use_desc: "An intuitive interface to choose your host and book a time slot quickly.",
        available_anytime: "Available Anytime",
        available_anytime_desc: "Book your time slot 24/7 based on host availability.",
        personalized_dedication: "Personalized Dedications",
        personalized_dedication_desc: "Get a unique and memorable dedication for yourself or loved ones.",
    },
    ticket: {
        number: "Number",
        date: "Date",
        email: "Email",
        age_category: "Age Category",
        price: "Price",
        actions: "Actions",
        delete: "Delete",
    },

    provider_request: {
        title: "Provider Request",
        number: "Number",
        date: "Date",
        services: "Services",
        status: "Status",
        pending: "Pending",
        validated: "Validated",
        refused: "Refused",
        unknown: "Unknown",
        no_requests: "No requests found for the current user.",
        no_services: "No services found for the current user.",
        error_fetching: "Error while fetching data:",
    },

    order: {
        title: "Order View",
        no_order: "No orders",
        number: "Order Number",
        shop: "Shop",
        date: "Date",
        ticket_number: "Ticket Number",
        status: "Status",
        actions: "Actions",
        show_details: "Show Details",
        show_qr: "Show QR Code",
        details_title: "Order Details",
        total: "Total",
        in_preparation: "In preparation",
        to_collect: "Ready for pickup",
        collected: "Collected",
        unknown: "Unknown",
    },

  ticketing: {
    title: "Ticketing",
    emailLabel: "Email",
    ageCategoryLabel: "Age Category",
    selectAgeCategory: "Select Age Category",
    ticketCountLabel: "Ticket Count",
    priceLabel: "Price",
    paymentMethodLabel: "Payment Method",
    creditCard: "Credit Card",
    cardNumber: "Card Number",
    expiryDate: "Expiry Date",
    cvv: "CVV",
    buyButton: "Buy Ticket",
    successTitle: "Purchase Successful",
    successMessage: "Thank you for your purchase!",
    ticketNumber: "Ticket Number",
    viewTickets: "View Tickets",
    homeButton: "Home",
    ageCategories: {
      enfant: "Child",
      etudiant: "Student",
      adulte: "Adult"
    }
  },

    guestbook: {
        title: "Guestbook",
        rating: "Rating",
        comment: "Comment",
        addEntry: "Add Entry",
        mustUseService: "You must have used a service offered by the provider to add an entry.",
        mustBeLoggedIn: "You must be logged in to add an entry.",
        date: "Date",
        user: "User",
        report: "Report",
        reportEntry: "Report an entry",
        reason: "Reason",
        submit: "Submit",
        reportSuccess: "Your report has been successfully submitted."
    },

    provider_list: {
        title: "Provider List",
        search_placeholder: "Search for a provider...",
        all_services: "All services",
        guestbook: "Guestbook",
        calendar: "Calendar",
        name: "Name",
        email: "Email",
        description: "Description",
        info_button: "Access provider space",
        provider_image: "Provider image",
        unknown_service: "Unknown service",
        unknown_name: "Unknown name",
        unknown_email: "Unknown email",
        no_description: "No description available",
        load_error: "Error loading providers",
    },

    signature: {
        reservation_title: "Signature Slot Reservation",
        reservation_success: "Reservation successful!",
        select_animator: "Select your host",
        your_animator: "Your host",
        search_animator: "Search for a host...",
        animator_image: "Host image",
        book: "Book",
        change_animator: "Change host",
        select_time_slot: "Select your time slot",
        time: "Time",
        select_time: "Select a time",
        cancel: "Cancel",
    },

    dedication_home: {
        title: "Welcome to the Dedication System",
        description: "Book a slot to meet your favorite host and get a personalized dedication!",
        search_placeholder: "Enter your ticket number",
        reserve_button: "Book Now",
        feature_simple: "Easy to Use",
        feature_simple_desc: "An intuitive interface to choose your host and book a time slot quickly.",
        feature_anytime: "Available Anytime",
        feature_anytime_desc: "Book your time slot 24/7 based on host availability.",
        feature_custom: "Personalized Dedications",
        feature_custom_desc: "Get a unique and memorable dedication for yourself or loved ones.",
        ticket_invalid: "Invalid ticket number",
    },

    profile: {
        personal_info: "Personal Information",
        email: "Email",
        name: "Full Name",
        username: "Username",
        modify_button: "Modify",
        cancel_button: "Back",
        modify_success: "Information updated successfully.",
        modify_error: "Error updating information",
    },

  interactive_map: {
    "title": "Interactive Map",
    "dateTitle": "Select the date of your visit to discover the services available at each stand!",
    "more_info": "More info",
    "close": "Close"
  },

  stand_info: {
    stand_title: "Stand Schedule: ",
    service_label: "Service",
    provider_label: "Provider"
  },

  service_categories: {
    dédicace: "Dedication",
    goodies: "Goodies"
  },

  reservationView: {
    number: "Number",
    host: "Host",
    stand: "Stand",
    service: "Service",
    date: "Date",
    time: "Time",
    operation: "Operation",
    cancel: "Cancel",
    email: "Email",
    ageCategory: "Age Category",
    price: "Price"
  },

  orderView: {
    orderNumber: "Order Number",
    shop: "Shop",
    date: "Date",
    ticketNumber: "Ticket Number",
    state: "State",
    actions: "Actions",
    viewDetails: "View Details",
    showQRCode: "Show QR Code",
    orderDetails: "Order Details",
    total: "Total",
    noOrders: "No orders",
    states: {
        0: "In preparation",
        1: "Ready for pickup",
        2: "Retrieved",
        unknown: "Unknown"
    }
  },

  registerProvider: {
    title: "Become a provider",
    email: "Email address",
    name: "Company name or First Last name",
    serviceType: "Type of service",
    chooseServiceType: "Choose your type of service",
    username: "Username",
    password: "Password",
    submit: "Register"
  },

  providerRequestView: {
    title: "Request to become a provider",
    number: "Number",
    date: "Date",
    services: "Services",
    status: "Status",
    unknown: "Unknown",
    statusTexts: {
      pending: "pending",
      approved: "approved",
      rejected: "rejected",
      unknown: "unknown"
    }
  },

  prestataireInfo: {
    servicesOffered: "Services Offered",
    guestbookNotActivated: "The guestbook is not activated.",
    back: "Back"
   },

    providerSchedule: {
        activateService: "Activate service",
        deactivateService: "Deactivate service",
        scheduleTitle: "Provider's Schedule for the Event Week",
        scheduleDisabled: "The schedule is disabled",
        tooltip: "Learn more",
        serviceActivated: "Service activated successfully",
        serviceDeactivated: "Service deactivated successfully",
        updateError: "Error updating service status",
        statusNotFound: "Error: Schedule status not found for this provider"
    },

    goodiesSellerView: {
        title: "Goodies Sellers",
        accessShop: "Access the shop"
    },

    goodiesView: {
        availableGoodies: "Available Goodies",
        price: "Price",
        stock: "Stock",
        addToBasket: "Add to Basket",
        noGoodies: "No goodies available at the moment."
    },

    sizeSelectorModal: {
        selectSize: "Select Size",
        close: "Close"
    },

    cartSidebar: {
        myCart: "🛍️ My Cart",
        price: "Price",
        size: "Size",
        remove: "Remove",
        total: "Total",
        ticketNumber: "Ticket Number",
        checkout: "Checkout",
        emptyCart: "Your cart is empty."
    },

    paymentComponent: {
        payment: "Payment",
        orderSummary: "Order Summary",
        total: "Total",
        ticketNumber: "Ticket Number",
        cardNumber: "Card Number",
        expiryDate: "Expiry Date",
        cvv: "CVV",
        pay: "Pay",
        orderPlaced: "Order Placed",
        confirmationEmail: "A confirmation email has been sent to you.",
        findOrder: "You can find your order via the account associated with the ticket email or by creating an account with this email address.",
        orderNumber: "Your order number",
        returnHome: "Return to the main page"
    },

    dedicationForm: {
        reservationSlot: "Dedication Slot Reservation",
        reservationDone: "Reservation Done!",
        selectAnimator: "Select your animator",
        yourAnimator: "Your animator",
        searchAnimator: "Search for an animator...",
        reserve: "Reserve",
        changeAnimator: "Change animator",
        selectTimeSlot: "Select your time slot",
        time: "Time",
        selectTime: "Select a time",
        confirmEmail: "A confirmation email has been sent to you",
        findReservation: "You can find your dedication reservation via the account associated with the ticket email or by creating an account with this email address.",
        reservationNumber: "Your reservation number",
        reservedSlot: "You have reserved a dedication slot with",
        date: "Date",
        stand: "Stand",
        returnHome: "Return to the main page",
        viewReservations: "View your reservations",
        cancel: "Cancel",
        cardImageAlt: "Card Image",
        book: "Book",
        confirmationEmail: "A confirmation email has been sent to you.",
        bookedSlot: "You have booked a slot with",
    },

    providerGuestbook: {
        activateService: "Activate service",
        deactivateService: "Deactivate service",
        guestbookTitle: "Your Guestbook",
        date: "Date",
        rating: "Rating",
        comment: "Comment",
        user: "User",
        report: "Report",
        serviceNotActivated: "The service is not activated.",
        reportEntry: "Report an entry",
        reason: "Reason",
        submit: "Submit",
        reportSuccess: "Your report has been successfully submitted.",
        reportError: "Error submitting the report.",
        serviceStatusError: "Error: Guestbook status not found for this provider",
        serviceStatusUpdateError: "Error updating service status",
        serviceActivated: "Service successfully activated",
        serviceDeactivated: "Service successfully deactivated"
    },

    providerDedicationManagement: {
        activateService: "Activate service",
        deactivateService: "Deactivate service",
        viewAllReservations: "View all reservations",
        addDedicationSlot: "Add a dedication slot",
        serviceDeactivated: "The service is deactivated.",
        deleteConfirmation: "Do you really want to delete this reservation?",
        serviceActivatedSuccess: "Service successfully activated",
        serviceDeactivatedSuccess: "Service successfully deactivated",
        serviceStatusUpdateError: "Error updating service status",
        title: "Dedication Management",
        number: "Number",
        date: "Date",
        startTime: "Start Time",
        endTime: "End Time",
        description: "Description",
        provider: "Provider",
        service: "Service",
        stand: "Stand",
        modify: "Modify",
        viewReservations: "View reservations",
        delete: "Delete"
    },

    providerDedicationReservation: {
        backToManagement: "Back to dedication management",
        viewAllReservations: "View all dedication reservations",
        title: "Dedication Reservation Management",
        number: "Number",
        date: "Date",
        time: "Time",
        ticketNumber: "Ticket Number",
        serviceNumber: "Service Number",
        standReservationNumber: "Stand Reservation Number",
        modify: "Modify",
        viewReservations: "View reservations",
        delete: "Delete",
        deleteConfirmation: "Do you really want to delete this reservation?",
        deleteError: "Unable to delete this reservation"
    },

    providerAddDedication: {
        addDedication: "Add a dedication",
        back: "Back",
        submit: "Add",
        cancel: "Cancel",
        provider: "Provider",
        providerService: "Provider Service",
        stand: "Stand",
        date: "Date",
        startTime: "Start Time",
        endTime: "End Time",
        description: "Description"
    },

    providerSidebar: {
        logout: "Logout",
        menu: "Menu",
        schedule: "Schedule",
        editor: "Presentation Page",
        dedications: "Dedications",
        goodies: "Goodies",
        foodProducts: "Food Products",
        guestbook: "Guestbook"
    },

    providerGoodieList: {
        activateService: "Activate service",
        deactivateService: "Deactivate service",
        goodieSalesList: "Goodie Sales List",
        addGoodie: "Add a Goodie",
        viewOrders: "View Orders",
        viewValidation: "Order Pickup?",
        serviceDeactivated: "The service is deactivated.",
        number: "Number",
        goodie: "Goodie",
        image: "Image",
        price: "Price",
        sizesAndStocks: "Sizes and Stocks",
        modify: "Modify",
        delete: "Delete",
        deleteConfirmation: "Are you sure you want to delete this goodie?",
        deleteError: "Error deleting the goodie",
        deleteSuccess: "Goodie deleted successfully",
        serviceStatusUpdateError: "Error updating service status",
        serviceActivatedSuccess: "Service activated successfully",
        serviceDeactivatedSuccess: "Service deactivated successfully",
        goodieInOrderedBasket: "This goodie cannot be deleted because it is in an ordered basket.",
        noServiceCategoryFound: "No service category found for this user."
    },

    goodieForm: {
        back: "Back",
        editGoodie: "Edit Goodie",
        addGoodie: "Add Goodie",
        name: "Goodie Name:",
        price: "Goodie Price:",
        image: "Goodie Image:",
        variation: "Variation",
        size: "Size:",
        stock: "Stock:",
        removeVariation: "Remove this variation",
        addVariation: "Add a variation",
        saveChanges: "Save Changes",
        addNewGoodie: "Add Goodie"
    },

    providerOrderView: {
        back: "Back",
        orderNumber: "Order Number",
        date: "Date",
        ticketNumber: "Ticket Number",
        state: "State",
        actions: "Actions",
        viewDetails: "View Details",
        markAsProcessed: "Mark as Processed",
        orderDetails: "Order Details",
        total: "Total",
        noOrders: "No Orders",
        confirmMarkAsProcessed: "Are you sure you want to mark this order as processed?",
        orderProcessed: "Order marked as processed",
        orderProcessingError: "Error updating order status",
        shop: "Shop",
    },

    orderValidation: {
        title: "Validate Order Pickup",
        basketId: "Basket ID:",
        search: "Search",
        orderDetails: "Order Details",
        total: "Total",
        validateOrder: "Validate Pickup",
        back: "Back",
        errorFetchingItems: "Error fetching basket items.",
        invalidOrder: "The basket is not a valid order or is not ready for pickup.",
        errorFetchingDetails: "Error fetching basket details.",
        orderMarkedAsRetrieved: "Order marked as retrieved",
        errorValidatingOrder: "Error validating order pickup"
    }

};
  
