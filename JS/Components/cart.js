app.component('GameCart', {
    props:
        {
            games:
                {
                    type: Object,
                    required: true
                },

            removable:
                {
                    type: Boolean
                },
        },

    methods:
        {
            removeGame: function (item)
            {
                this.$emit('remove-item', item)
            }
        },

    computed:
        {
            totalCost: function ()
            {
                let cost = 0
                this.games.forEach(game => cost += (game.cost + 0.01))
                return cost
            }
        },

    template:
        `
          <table class="table container table-bordered">
          <thead>
          <tr>
            <th scope="col" class="m-2">Title</th>
            <th scope="col" class="m-2">Cost</th>
            <th scope="col" class="m-2" v-if="removable">Remove</th>
          </tr>
          </thead>
          <tbody>
            <game-cart-item v-for="game in games" :removable="removable" :game="game" @remove-item="removeGame"></game-cart-item>
            <tr class="mt-5">
              <th>Total Cost:</th>
              <th>{{'$' + totalCost.toFixed(2)}}</th>
              <th v-if="removable"></th>
            </tr>
          </tbody>
          </table>
          
          <div v-if="removable">
          <form action="payment.html" class="d-flex justify-content-center">
            <input type="submit" class="btn btn-success" value="Purchase">
          </form>
          </div>
        `
})