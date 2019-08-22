Vue.component( 'post-a-post', {
  template: `
    <form class="text-form" action="index.html" method="post">
        <h1 class="text-form__title">post-a-post</h1>
            <div class="preq_error" v-if="show">
              <p class="preq">all fields required</p>
            </div>
          <div class="text-form__add-group">
            <div class="text-form__input-group">
              <label class="text-form__label">Enter your post text here:</label>
              <textarea class="text-form__input text-input__field" type="text" maxlength="400" placeholder="only 400 chars long" @keyup.13="addPost" v-model="postText"></textarea>
            </div>
            <div class="text-form__input-group">
              <label class="text-form__label">Date & Time of the post:</label>
              <input class="text-form__input date-input__field" type="datetime-local" min="2000-01-01T00:01" max="3000-12-31T23:59" @keyup.13="addPost" v-model="postDate">
            </div>
            <div class="text-form__input-group">
              <a class="text-form__add-button" @click="addPost">add my text to stack</a>
            </div>
          </div>
        </form>
      `,
  data: function () {
    return {
      show: false,
      postText : null,
      postDate : null,
      postTime : null,
      isChecked : null
    }
  },
  methods: {
    addPost: function (event) {
      if ( !this.postText || !this.postDate ) {
        this.show = true;
      } else {
        this.show = false;

        let userPost = {
          postText : this.postText,
          postDate : this.postDate.substring(0, 10),
          postTime : this.postDate.substring(11),
          isChecked : false
        }
        this.$emit('post-added', userPost)
        this.postText = null;
        this.postDate = null;
        this.postTime = null;
        this.isChecked = null;
      };
    }
  }
});

let vm = new Vue({
  el: '#app',
  data: function () {
    return {
      postClouds: postClouds = {}
    }
  },
  methods:{
    addPostToCloud: function(userPost){
      if ( this.postClouds.hasOwnProperty(userPost.postDate) ) {
        this.postClouds[userPost.postDate].push(userPost);
      } else {
          this.postClouds[userPost.postDate] = [];
          this.postClouds[userPost.postDate].push(userPost);
        };
        console.log(postClouds);
      },
    }
  });







/*
<p v-if="!this.postClouds.length">There are no posts yet.</p>
*/
