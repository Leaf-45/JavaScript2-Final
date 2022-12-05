app.component('GameCartItem', {
    props:
        {
            game:
                {
                    type: Object,
                    required: true
                },
            removable:
                {
                    type: Boolean
                }
        },

    template:
        `
          
          <tr>
            <td>{{game.title}}</td>
            <td>{{'$' + game.cost}}</td>
            <td v-if="removable"><i class="fa-solid fa-trash fa-xl" @click="$emit('remove-item', game)"></i></td>
          </tr>
          
        `
})