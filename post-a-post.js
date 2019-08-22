let postAPost = {
  template: `
    <form class="text-form" action="index.html" method="post">
      <h1 class="text-form__title">post-a-post</h1>
        <div class="preq_error" v-if="show">
          <p class="preq">{{ message }}</p>
        </div>
      <div class="text-form__add-group">
        <div class="text-form__input-group">
          <label class="text-form__label" for="text">Enter your post text here:</label>
          <textarea class="text-form__input text-input__field" type="text" maxlength="400" placeholder="only 400 chars long" @keyup.13="addPost" v-model="postText"></textarea>
        </div>
        <div class="text-form__input-group">
          <label class="text-form__label" for="date">Date & Time of the post:</label>
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
      message: 'all fields required',
      show: false,
      postText : null,
      postDate : null,
      postTime : null,
      status : null,
      postsCloud: postsCloud
    }
  },
  methods: {
    addPost: function (event) {
      if ( !postText && !postDate ) {
        this.show = true;
      } else {
        this.show = false;
        let newUserPost = {
          postText : this.postText,
          postDate : this.postDate.substring(0, 10),
          postTime : this.postDate.substring(11),
          status : false
        }
        this.$emit('postAdded', dateContainer, postBlock),
        this.postText : null,
        this.postDate : null,
        this.postTime : null
        this.status : null
      };
    },
    isDone: function (event) {
      this.status = true;
    }
  }
};

let postBlock = {
  template: `
    <div class="user-post__date-block">
      <p class="block-date">Post from {{ postDate }}</p>
      <div class="user-post__block">
        <div class="user-post__checkbox">
          <input type="checkbox" @change="isDone">
        </div>
        <div class="user-post__text">
          <p><em>{{ postTime }}</em><br>{{ postText }}</p>
        </div>
      </div>
    </div>
  `,
  data: function () {
    return {

    }
  },
  methods:{

  }
};

let postsCloud = new Object();

if (!$(`.${this.uniqId.substring(0, 8)}`).length) newUserPost.createDateContainer();
newUserPost.createPost();

$('.text-input__field,.date-input__field').val('');
$('.text-form__show-text-group')[0].addEventListener('change', this.sortPosts);
} else {
if ( !postText && !postDate ) this.show = true;

};
},
sortPosts: function (event) {
const postId = event.target.id;
$('.' + postId).toggleClass('selected');
};
}
});
