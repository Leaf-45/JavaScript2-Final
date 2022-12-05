app.component('GameCardShelf',
    {

        props:
            {
                loading:
                    {
                        type: Boolean
                    },
                games:
                    {
                        type: Array,
                        required: true
                    },
                limit:
                    {
                        type: Number
                    },
            },

        methods:
            {
                learnMore: function (item)
                {
                    this.$emit('learn-more', item)
                }
            },

        template:
            `
              <div class="d-flex flex-wrap justify-content-around mt-4">
                  <game-card v-for="game in games.slice(0, limit)" :game="game" v-if="games.length" 
                             @learn-more="learnMore">
                  </game-card>
                  <div v-if="loading">Loading...</div>
                  <p v-if="!loading && !games.length" class="lead">There are no games</p>
              </div>
              
            `

    })