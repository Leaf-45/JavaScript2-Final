app.component('GameReview',{


    props:
        {
            review:
                {
                    type: Object,
                    required: true
                }
        },


        template:
            `
              <div class="container border">
                  <h6>Written by {{review.userName}}</h6>
                  <p>{{review.review}}</p>
              </div>
            `
})