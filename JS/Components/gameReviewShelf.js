app.component('GameReviewShelf',
    {

        data: function(){
            return {
                displayForm: false,
                review: "",
                displayReviews: false,
                currentReviews: [],
                hasReviews: false
            }
        },

        emits: ['upload-review'],

        props:
            {
                game:
                    {
                        type: Object,
                        required: true
                    },
                user:
                    {
                        type: Boolean,
                        required: true
                    }

            },


        methods:
            {
                grabReviews: function ()
                {
                    db.collection('Reviews').where('gameID', '==', this.game.id ?? '')
                        .orderBy('date', 'desc')
                        .limit(5)
                        .get()
                        .then(snapShot => {
                            this.currentReviews = []
                            snapShot.forEach(doc =>
                            {

                                let i = doc.data()
                                let userReview = new review()
                                userReview.id = i.id
                                userReview.review = i.review
                                userReview.date = i.date
                                userReview.gameID = i.gameID
                                userReview.userName = i.userName
                                this.currentReviews.push(userReview)
                            })
                        })
                    console.log(this.currentReviews)

                    this.displayReviews = true
                },

                uploadReview: function ()
                {
                    this.$emit('upload-review', this.review, this.game.id)
                    this.displayForm = false
                    this.grabReviews()
                },
            },


        template:
            `
                 
                    
                    

                    <div class="d-flex justify-content-center mt-4">
                      <button class="btn btn-primary" @click="grabReviews" :disabled="displayReviews"
                              onclick="window.scrollTo(0, document.body.scrollHeight)">Check out the reviews</button>
                      <button class="btn btn-secondary" v-if="displayReviews" @click="displayReviews = false">Cancel</button>
                    </div>

                    <div v-if="displayReviews">
                    <h3 class="text-center mt-3" v-if="this.currentReviews.length">Reviews for {{game.title}}</h3>
                    <h3 class="text-center mt-3" v-else>There are no reviews for {{game.title}}</h3>
                    
                    <game-review v-for="review in currentReviews" :review="review"></game-review>
                    
                    <div class="d-flex justify-content-center">
                      <button v-if="user" class="btn btn-primary mt-3" @click="displayForm = true;" 
                              onclick="window.scrollTo(0, document.body.scrollHeight);">Add a review</button>
                      <button v-if="displayForm" class="btn btn-secondary mt-3" @click="displayForm = false">Cancel</button>
                    </div>
                    
                    <div class="form-group container" v-if="displayForm">
                      <label for="review">Enter your review for {{game.title}}</label>
                      <textarea class="form-control" id="review" v-model="review"></textarea>
                      <div class="d-flex justify-content-center">
                        <button class="btn btn-success mt-2"  
                               @click="uploadReview">
                          Add a review
                        </button>
                      </div>
                    </div>
                    </div>
                    
                  
            `
    })