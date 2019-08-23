//let postClouds = {};

Vue.component( 'post-a-post', {
  template: `
    <div class="text-form__add-group">
      <div class="preq_error" v-if="show">
        <p class="preq">all fields required</p>
      </div>
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

Vue.component( 'show-and-sort',{
  template:`
    <div>
    <div class="text-form__show-group">
       <div class="user-post__date-block" v-for="(postCloud, date) in postClouds">
          <p class="block-date">Post from {{ date }}</p>
          <div class="user-post__block" v-for="post in postCloud" :class="{'selected': post.isChecked }">
            <div class="user-post__checkbox">
              <input type="checkbox" @change="makeItChecked" :id="'at'+ post.postDate + post.postTime" >
            </div>
            <div class="user-post__text">
              <p ><em>{{ post.postTime }}</em><br>{{ post.postText }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  props: [ 'postClouds'],
  methods:{
    makeItChecked: function (event) {
      console.log(event.target.id)
      let date = event.target.id.substring(2,12);
      let time = event.target.id.substring(12);
      console.log(date, time);
      console.log(postClouds[date]);
      let post = postClouds[date].findIndex(item => item.postTime === time);
      console.log(post);
      postClouds[date][post].isChecked = !postClouds[date][post].isChecked;
      console.log(postClouds[date][post].isChecked);
    }
  }
});

let vm = new Vue({
  el: '#app',
  template:`
  <form class="text-form" action="index.html" method="post">
    <h1 class="text-form__title">post-a-post</h1>
    <post-a-post @post-added="addPostToCloud"></post-a-post>
    <show-and-sort :postClouds="postClouds"></show-and-sort>
  </form>
  `,
  data:{
    postClouds: postClouds = {}
  },
  methods:{
    addPostToCloud: function (userPost){
      console.log(userPost);
      console.log(this.postClouds);
      if ( this.postClouds.hasOwnProperty(userPost.postDate) ) {
        let newPostAdd = [...this.postClouds[userPost.postDate], userPost];
        Vue.set(this.postClouds, userPost.postDate, newPostAdd);
        //this.postClouds[userPost.postDate].push(userPost);
      } else {
        Vue.set(this.postClouds, userPost.postDate, []);
          //this.postClouds[userPost.postDate] = [];
          let newPostAdd = [...this.postClouds[userPost.postDate], userPost];
          Vue.set(this.postClouds, userPost.postDate, newPostAdd);
          //this.postClouds[userPost.postDate].push(userPost);
        };
      }
    }
  });
