// qgr-cntrl-pills

define(function (require) {
  var $ = require('jquery');
  var _ = require('underscore');
  var Backbone = require('backbone');
  var Handlebars = require('handlebars');
  var pills_tmpl = require('text!tmpl/pills.html');


  var PillChoice = Backbone.Model.extend({
    // Has attr choice_val

    initialize: function() {
      this.col = options.col;
    }

    get_subtree: function() {
      return {
        eq: [
          this.col,
          c.get('choice_val');
        ]
      };
    }

  });

  var PillChoiceView = Backbone.View.extend({
    // Represent an individual checkbox with a view.

    tagName: 'label',

    class: 'checkbox',

    tmpl: Handlebars.compile(pills_tmpl),

    events: {
      'click li': 'set_choice',
      'click': 'clicked',
    },

    initialize: function(options) {
      // Initialize with a choice model in the options hash.
      _.bindAll(this, 'render', 'set_choice')
      this.choices = this.options.choices;
    },

    render: function() {
      var render_content = this.tmpl({
        choice: this.choices
      })
      this.$el.html(render_content);
      return this
    },

    set_choice: function(e) {
      console.log(e);
    },

    clicked: function(e) {
      e.stopImmediatePropagation();
    }

  });


  // Return exports.
  return {
    PillChoice: PillChoice,
    PillChoiceView: PillChoiceView,
  };

});

