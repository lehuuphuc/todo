Vue.component('my-app', {
  data: function () {
    return {
      categories: [],
      todos: [],
      currentCategory: '59c3d44e1e300ba4bc196c0d',
      categoryTitle: '',
      todoTitle: '',
      todoDescription: ''
    }
  },
  computed: {
    disableCategory: function () {
      return !(_.size(this.categoryTitle) > 0);
    },
    disableTodo: function () {
      return !(this.currentCategory && _.size(this.todoTitle) > 0 && _.size(this.todoDescription) > 0);
    }
  },
  methods: {
    addCategory: function () {
      let _this = this;
      axios.post('/api/category/add', {title: this.categoryTitle})
      .then(function (response) {
        _this.categoryTitle = '';
        if (response && response.data && response.data.id) {
          _this.categories.push(response.data);
          if (_.size(_this.categories) == 1) {
            _this.currentCategory = response.data.id;
          }
        }
      });
    },
    addTodo: function () {
      let _this = this;
      axios.post('/api/todo/add', {
        title: this.todoTitle,
        description: this.todoDescription,
        category: this.currentCategory
      })
      .then(function (response) {
        _this.todoTitle = '';
        _this.todoDescription = '';
        if (response && response.data && response.data.id) {
          _this.todos.push(response.data);
        }
      });
    },
    getCategoryList: function () {
      return axios.get('/api/category/list', {
        _t: Date.now()
      });
    },
    getTodoList: function (category) {
      let _this = this;
      if (category) {
        axios.get('/api/todo/list', {
          params: {
            category: category,
            _t: Date.now()
          }
        })
        .then(function (response) {
          if (response && _.isArray(response.data) && _.size(response.data) > 0) {
            _this.todos = response.data;
          } else {
            _this.todos = [];
          }
        })
        .catch(function () {
          _this.todos = [];
        });
      } else {
        this.todos = [];
      }
    },
    categoryClick: function (category) {
      this.currentCategory = category;
      this.getTodoList(category);
    }
  },
  mounted: function () {
    let _this = this;
    this.getCategoryList()
    .then(function (response) {
      if (response && _.isArray(response.data) && _.size(response.data) > 0) {
        _this.categories = response.data;
        _this.currentCategory = response.data[0].id;
      } else {
        _this.categories = [];
        _this.currentCategory = null;
      }
      _this.getTodoList(_this.currentCategory);
    });
  },
  template: '#app-template'
});
Vue.filter('toDate', function (value) {
  return moment.unix(Math.floor(value / 1000)).format('D/M/YYYY k:mm:ss');
});
var app = new Vue({
  el: '#app',
  template: '<my-app></my-app>'
});