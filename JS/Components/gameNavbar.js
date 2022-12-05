app.component('GameNavbar',
    {
        data: function() {
            return {
                searchText: '',
            }
        },

        props:
            {
                user:
                    {
                        type: Object,
                        required: true
                    }
            },

        methods:
            {
                searchItem: function ()
                {
                    this.$emit('search-game', this.searchText)
                },

                resetSearchItem: function ()
                {
                    this.searchText = ''
                    this.$emit('search-game', this.searchText)
                }
            },

        emits: ['search-game', 'log-out'],

        template:
            `
            <nav class="navbar navbar-expand-sm pt-0 bg-light">
        <div class="container-fluid">

            <h2>
                <a href="index.html" style="text-decoration: none; color: black">Everyday Games</a>
            </h2>

            <ul class="navbar-nav">
                <li class="">
                    <input class="form-control" v-model="searchText" size="45" type="search" placeholder="Search for games" aria-label="Search">
                </li>
                <li class="nav-item">
                  <form action="gamesList.html">
                    <input type="submit" class="btn btn-success" @click="searchItem" value="Search">
                  </form>
                </li>
            </ul>

            <ul class="navbar-nav mt-3">
            <li class="nav-item">
              <a href="index.html"><i class="fa-solid fa-house fa-2xl"></i></a>
                </li>
                <li>
                    <a class="nav-link" href="index.html">Home</a>
                </li>
                <li class="nav-item">
                  <a href="login.html"><i class="fa-solid fa-user fa-2xl"></i></a>
                </li>
                <li v-if="user == null">
                    <a class="nav-link" href="login.html">Sign in</a>
                </li>
                <li v-else>
                  <a class="nav-link" @click="this.$emit('log-out')" href="#">Logout</a>
                </li>
                <li class="nav-item">
                  <a href="gamesList.html"><i class="fa-solid fa-gears fa-2xl"></i></a>
                </li>
                <li>
                    <a class="nav-link" @click="resetSearchItem" href="gamesList.html">Games</a>
                </li>
                <li class="nav-item">
                  <a href="cart.html"><i class="fa-solid fa-cart-shopping fa-2xl"></i></a>
                </li>
                <li>
                    <a class="nav-link" href="cart.html">Cart</a>
                </li>

            </ul>

        </div>
    </nav>
            `
    })