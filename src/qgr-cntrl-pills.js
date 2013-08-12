// qgr-cntrl-pills

define(function (require) {
  var $ = require('jquery');
  var _ = require('underscore');
  var Backbone = require('backbone');
  var Handlebars = require('handlebars');
  var pills_tmpl = require('text!tmpl/pills.html');


  var PillChoice = Backbone.Model.extend({
    // Has attrs:
    //  - choices (array of choices)
    //  - choice_val (selected choice)

    get_subtree: function() {
      if (this.get('choice_val')) {
        return {
          eq: [
            this.col,
            this.get('choice_val')
          ]
        };
      } else {
        // Return an empty clause when no choice is selected.
        return {}
      }
    }

  });

  var PillChoiceView = Backbone.View.extend({
    // Represent an individual checkbox with a view.

    tmpl: Handlebars.compile(pills_tmpl),

    events: {
      'click li': 'set_choice',
      'click': 'clicked',
    },

    initialize: function(options) {
      // Initialize with a choice model in the options hash.
      _.bindAll(this, 'render', 'set_choice')
      this.choice_model = this.options.choice_model;
    },

    render: function() {
      var render_content = this.tmpl({
        choices: this.choice_model.get('choices')
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

