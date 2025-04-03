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
      title: "Ticket Purchase",
      emailLabel: "Email Address",
      ageCategoryLabel: "Age Category",
      selectAgeCategory: "Choose your age category",
      ticketCountLabel: "Number of Tickets",
      priceLabel: "Price",
      paymentMethodLabel: "Payment Method",
      creditCard: "Credit Card",
      cardNumber: "Card Number",
      expiryDate: "Expiry Date",
      cvv: "CVV",
      buyButton: "Buy",
      successTitle: "Thank you for your purchase!",
      successMessage: "A confirmation email has been sent.",
      ticketNumber: "Your ticket number",
      viewTickets: "View Tickets",
      homeButton: "Back to Home",
    },
    guestbook: {
      title: "Guestbook",
      rating: "Rating",
      comment: "Comment",
      add_entry: "Add Entry",
      service_required: "You must have used a service provided by the provider to add an entry.",
      login_required: "You must be logged in to add an entry.",
      date: "Date",
      user: "User",
      report: "Report",
      report_title: "Report Entry",
      report_reason: "Reason",
      submit: "Submit",
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
    }
    

    
    

    

    
  };
  
