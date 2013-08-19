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
            this.get('col'),
            this.get('choice_val')
          ]
        };
      }
    }

  });

  var PillChoiceView = Backbone.View.extend({
    // Represent an individual checkbox with a view.

    tmpl: Handlebars.compile(pills_tmpl),

    events: {
      'click li': 'set_choice',
    },

    initialize: function(options) {
      // Initialize with a choice model in the options hash.
      _.bindAll(this, 'render', 'set_choice')
      this.choice_model = this.options.choice_model;
      this.label = this.options.label;
    },

    render: function() {
      var t = this;

      var choices = _.map(this.choice_model.get('choices'), function(choice) {
        // Handle null specially for IE8.
        var choice_val = choice ? choice.val : '';

        // Flag the selected choice.
        if (choice_val === t.choice_model.get('choice_val')) {
          return _.extend({}, choice, {selected: true});
        }
        return _.extend({}, choice, {selected: false});
      });

      var render_content = this.tmpl({
        label: this.label,
        id: this.el.id + 'pills',
        choices: choices
      })
      this.$el.html(render_content);
      return this
    },

    set_choice: function(e) {
      this.choice_model.set('choice_val', $(e.currentTarget).data('choice'));
      this.render();
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

