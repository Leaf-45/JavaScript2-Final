app.component('GameDescription',
    {
        data: function()
        {
            return {
                addedGame: false
            }
        },
        props:
            {
                game:
                    {
                        type: Object
                    }
            },

        methods:
            {
                addToCart: function ()
                {
                    this.addedGame = true
                    this.$emit('add-to-cart', Object.assign({}, this.game))
                },

                removeFromCart: function (item)
                {
                    this.addedGame = false
                    this.$emit('remove-item', item)
                }
            },

        emits: ['add-to-cart', 'remove-item'],


        template:
            `
              <h3 class="text-center mt-2">{{game.title}} Description</h3>
              <div class="d-flex container">
                <img :src="game.img" alt="">
                <div class="d-flex flex-column">
                  <p class="m-2">{{game.description}}</p>
                  
                  <h3 class="m-2 text-muted">{{game.title}} Details</h3>
                  <ul class="list-group m-2">
                    <li class="list-group-item">Cost: {{game.cost}}</li>
                    <li class="list-group-item">Franchise: {{game.franchise}}</li>
                    <li class="list-group-item">Release Date: {{game.releaseDate}}</li>
                    <li class="list-group-item">Genre: {{game.genre}}</li>
                    <li class="list-group-item">Available on<div v-for="platform in game.platform">{{platform}}</div></li>
                  </ul>
                </div>
              </div>
              <br>

              <div class="d-flex justify-content-center">
                  <button class="btn btn-success" :disabled="addedGame" @click="addToCart"><i class="fa-solid fa-cart-plus"></i> &nbsp Add to Cart</button>
                  <button v-if="addedGame" class="btn btn-secondary" @click="removeFromCart"><i class="fa-solid fa-trash"></i> &nbsp Remove game</button>
              </div>
              <p v-if="addedGame" class="text-center">You added {{game.title}} to your cart.</p>
            `
    })