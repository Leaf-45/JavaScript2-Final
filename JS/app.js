const app = Vue.createApp({
    data: function()
    {
        return {
            //Where the game for the gameDescription component is stored
            selectedGame: {},

            //List of all games
            games: [],

            //Game search
            searchText: "",

            //Payment form information
            address: "",
            city: "",
            state: "",
            zipCode: "",
            country: "",
            payment: "Debit Card",

            formValidation: false,
            checkBoxChecked: false,

            //Payment display
            shoppingList: true,
            shippingInformation: false,
            paymentInformation: false,


            //User
            user: new user(),

            //Login and signup information
            username: "",
            signUpEmail: "",
            signUpPassword: "",

            loginEmail: "",
            loginPassword: "",


            //List of games in the cart
            cart: [],

            //info for purchased
            cartPurchased: [],
            addressInformation: [],


            //initial loading
            loading: true,

            //When to display forms on Login.html
            signUpDisplay: false,
            loginDisplay: false
        }
    },

    methods:
        {
            searchItem: function (text)
            {
                this.searchText = text.toLowerCase()
            },

            gameDescription: function (item)
            {
                this.selectedGame = item
            },

            addToCart: function (item)
            {
                this.cart.push(item)
            },

            removeGame: function (item)
            {
                this.cart.splice(this.cart.indexOf(item), 1)
            },

            getFromLocalStorage: function (key, defaultValue)
            {
                if(localStorage.getItem(key))
                {
                    return JSON.parse(localStorage.getItem(key))
                }
                return defaultValue
            },

            signIn: function ()
            {
                firebase.auth().signInWithEmailAndPassword(this.loginEmail, this.loginPassword).then(() =>
                {
                    window.location = 'index.html';
                })
            },

            signUp: function ()
            {
                firebase.auth().createUserWithEmailAndPassword(this.signUpEmail, this.signUpPassword).then((result) =>{

                    return result.user.updateProfile({
                        displayName: this.username
                    })
                }).then(() => {window.location = 'index.html';})

            },

            logOut: function ()
            {
                firebase.auth().signOut()
            },

            uploadReview: function (newReview, id)
            {
                let userReview = new review()

                userReview.id = this.user.uid
                userReview.gameID = id
                userReview.userName = this.user.displayName
                userReview.review = newReview
                userReview.date = Date.now()

                db.collection('Reviews').add(userReview)
            },

            validateForm: function ()
            {
                if(!this.addressIsValid || !this.cityIsValid || !this.stateIsValid || !this.zipCodeIsValid ||
                    !this.countryIsValid)
                {
                   this.formValidation = true
                }
                else
                {
                    this.paymentInformation = true
                    this.shippingInformation = false
                    this.formValidation = false
                    this.addressInformation = []
                    this.addressInformation.push(this.address)
                    this.addressInformation.push(this.city)
                    this.addressInformation.push(this.state)
                    this.addressInformation.push(this.zipCode)
                    this.addressInformation.push(this.country)

                }
            },

            checkCheckBoxes: function ()
            {

                this.addressInformation.push(this.payment)
                this.paymentInformation = false
                this.cartPurchased = this.cart
                this.cart = []

            }
        },

    computed: {
        filterList: function(){
            return this.games.filter(game => {
                let searched = game.title.toLowerCase();
                return searched.includes(this.searchText);
            })
        },

        addressIsValid: function ()
        {
            return this.address.length > 0
        },

        cityIsValid: function ()
        {
            return this.city.length > 0
        },

        stateIsValid: function ()
        {
            return this.state.length > 0
        },

        zipCodeIsValid: function ()
        {
            return this.zipCode.length >= 5 && !isNaN(this.zipCode)
        },

        countryIsValid: function ()
        {
            return this.country.length > 0
        }
    },

    created:function ()
    {
        firebase.auth().onAuthStateChanged(authUser =>
        {
            if (authUser)
            {
                this.user = new user(authUser)
            }
            else
            {
                this.user = null
            }
        })
    },

    mounted: function () {
        db.collection('Games').orderBy('ReleaseDate', 'desc').onSnapshot(snapShot => {

            snapShot.forEach(doc =>
            {
                let i = doc.data()

                this.games.push(new game(doc.id, i.Title, i.Description, i.Franchise, i.ReleaseDate.toDate().toDateString(),
                    i.Genre, i.Cost, i.Platforms, i.IMG))

            })
            this.loading = false
        })


        this.selectedGame = this.getFromLocalStorage('selectedGame', '')

        this.cart = this.getFromLocalStorage('cart', '') ?? []

        this.searchText = this.getFromLocalStorage('searchText', '')

        this.cartPurchased = this.getFromLocalStorage('cartPurchased', '')

        this.addressInformation = this.getFromLocalStorage('addressInformation', '') ?? []
    },

    watch: {
        selectedGame:
            {
                deep: true,

                handler: function (item)
                {
                    localStorage.setItem('selectedGame', JSON.stringify(item))
                }
            },

        cart:
            {
                deep: true,

                handler: function (item)
                {
                    localStorage.setItem('cart', JSON.stringify(item))
                }
            },
        searchText:
            {
                deep: true,

                handler: function (item)
                {
                    localStorage.setItem('searchText', JSON.stringify(item))
                }
            },
        cartPurchased:
            {
                deep: true,

                handler: function (item)
                {
                    localStorage.setItem('cartPurchased', JSON.stringify(item))
                }
            },
        addressInformation:
            {
                deep: true,

                handler: function (item)
                {
                    localStorage.setItem('addressInformation', JSON.stringify(item))
                }
            }
    }
});