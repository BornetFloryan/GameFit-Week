let customersAccounts=[
{"_id":"0","name":"test","login":"test","password":"test","email":"tester@nowhere.org", "session":""},
]

let ticketAnimationCategories = [
   {"_id":"0","name":"Sport","description":"Les plus grands sportifs de tous les temps"},
   {"_id":"1","name":"Jeux Vidéo","description":"Les plus grands joueurs de jeux vidéo de tous les temps"},
   {"_id":"2","name":"Sport et Jeux Vidéo","description":"Les plus grands sportifs et les plus grands joueurs de jeux vidéo de tous les temps"},
]

let ticketAgeCategories = [
   {"_id":"0","name":"Enfant", "Prix":"5", "description":"Pour les enfants de 0 à 12 ans", "_idticketAnimationCategories":"0"},
   {"_id":"1","name":"Etudiant", "Prix":"8","description":"Pour les étudiants de 13 à 25 ans", "_idticketAnimationCategories":"0"},
   {"_id":"2","name":"Adulte", "Prix":"10","description":"Pour les adultes à partir 26 ans", "_idticketAnimationCategories":"0"},

   {"_id":"3","name":"Enfant", "Prix":"5", "description":"Pour les enfants de 0 à 12 ans", "_idticketAnimationCategories":"1"},
   {"_id":"4","name":"Etudiant", "Prix":"8","description":"Pour les étudiants de 13 à 25 ans", "_idticketAnimationCategories":"1"},
   {"_id":"5","name":"Adulte", "Prix":"10","description":"Pour les adultes à partir 26 ans", "_idticketAnimationCategories":"1"},

   {"_id":"6","name":"Enfant", "Prix":"8", "description":"Pour les enfants de 0 à 12 ans", "_idticketAnimationCategories":"2"},
   {"_id":"7","name":"Etudiant", "Prix":"14","description":"Pour les étudiants de 13 à 25 ans", "_idticketAnimationCategories":"2"},
   {"_id":"8","name":"Adulte", "Prix":"18","description":"Pour les adultes à partir 26 ans", "_idticketAnimationCategories":"2"},
]

let animators = [
   {
      "_id": "0",
      "name": "Lionel Messi",
      "email": "",
   },
   {
      "_id": "1",
      "name": "LeBron James",
      "email": "",
   },
   {
      "_id": "2",
      "name": "Serena Williams",
      "email": "",
   },
   {
      "_id": "3",
      "name": "Cristiano Ronaldo",
      "email": "",
   },
   {
      "_id": "4",
      "name": "Tom Brady",
      "email": "",
   },
   {
      "_id": "5",
      "name": "Roger Federer",
      "email": "",
   },
   {
      "_id": "6",
      "name": "Stephen Curry",
      "email": "",
   },
   {
      "_id": "7",
      "name": "Usain Bolt",
      "email": "",
   },
   {
      "_id": "8",
      "name": "Neymar Jr.",
      "email": "",
   },
   {
      "_id": "9",
      "name": "Michael Jordan",
      "email": "",
   },
   {
      "_id": "10",
      "name": "Khabib Nurmagomedov",
      "email": "",
   },
   {
      "_id": "11",
      "name": "Pele",
      "email": "",
   },
   {
      "_id": "12",
      "name": "Virat Kohli",
      "email": "",
   },
   {
      "_id": "13",
      "name": "Misty May-Treanor",
      "email": "",
   },
   {
      "_id": "14",
      "name": "Bugha",
      "email": "",
   },
   {
      "_id": "15",
      "name": "Ninja",
      "email": "",
   }
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
      "anim_id": "0",
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
      "anim_id": "0",
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
      "anim_id": "1",
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
      "anim_id": "1",
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
      "anim_id": "2",
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
      "anim_id": "2",
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
      "anim_id": "3",
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
      "anim_id": "3",
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
      "anim_id": "4",
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
      "anim_id": "4",
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
      "anim_id": "5",
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
      "anim_id": "5",
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
      "anim_id": "6",
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
      "anim_id": "6",
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
      "anim_id": "7",
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
      "anim_id": "7",
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
      "anim_id": "8",
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
      "anim_id": "8",
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
      "anim_id": "9",
   },
   {
      "_id": "19",
      "$date": "2024-11-09T00:00:00.000Z",
      "times": [
         "09:00",
         "12:00",
         "14:00"
      ],
      "anim_id": "9",
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
      "anim_id": "10",
   },
   {
      "_id": "21",
      "$date": "2024-11-10T00:00:00.000Z",
      "times": [
         "09:00",
         "11:00",
         "13:00"
      ],
      "anim_id": "10",
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
      "anim_id": "11",
   },
   {
      "_id": "23",
      "$date": "2024-11-11T00:00:00.000Z",
      "times": [
         "10:00",
         "12:00",
         "14:00"
      ],
      "anim_id": "11",
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
      "anim_id": "12",
   },
   {
      "_id": "25",
      "$date": "2024-11-12T00:00:00.000Z",
      "times": [
         "08:00",
         "10:00",
         "14:00"
      ],
      "anim_id": "12",
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
      "anim_id": "13",
   },
   {
      "_id": "27",
      "$date": "2024-11-13T00:00:00.000Z",
      "times": [
         "10:00",
         "12:00",
         "14:00"
      ],
      "anim_id": "13",
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
      "anim_id": "14",
   },
   {
      "_id": "29",
      "$date": "2024-11-14T00:00:00.000Z",
      "times": [
         "10:00",
         "12:00",
         "14:00"
      ],
      "anim_id": "14",
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
      "anim_id": "15",
   },
   {
      "_id": "31",
      "$date": "2024-11-15T00:00:00.000Z",
      "times": [
         "08:00",
         "10:00",
         "14:00"
      ],
      "anim_id": "15",
   }
];

module.exports = {
   customersAccounts,
   ticketAnimationCategories,
   ticketAgeCategories,
   availabledates,
   animators,
}
