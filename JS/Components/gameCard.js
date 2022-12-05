app.component('GameCard',
    {

        props:
            {
                game:
                    {
                        type: Object,
                        required: true
                    }
            },

        methods:
            {
                learnMore: function ()
                {
                    this.$emit('learn-more', Object.assign({}, this.game))
                }
            },

        emits: ['learn-more'],

        template:
            `
              
        <div class="card mt-3" style="width: 18rem;">
          <div class="card-body">
             
            <h5 class="card-title">{{game.title}}</h5>
            <h6 class="card-subtitle mb-2 text-muted">{{'$' + game.cost}}</h6>
            <p class="card-text cutoff-text">{{game.description}}</p>
            <img :src="game.img" alt="" width="250" height="200">
            <form action="gameDescription.html">  
              <input type="submit" class="btn btn-primary mt-3" @click="learnMore" value="Learn More">
            </form>
          </div>
        </div>
        
            `
    })