
(function ($) {
  // Define the togglebutton plugin.
  $.fn.togglebutton = function (opts) {
    // Apply the users options if exists.
    var settings = $.extend({}, $.fn.togglebutton.defaults, opts);
    // For each select element.
    this.each(function () {
      var self = $(this);
      var multiple = this.multiple;

      if (settings.select2) {
        var self_select2 = $(self).next('.select2-container');
        var is_disabled = self_select2.hasClass('select2-container--disabled');
      }

      // Retrieve all options.
      var options = self.children('option');
      // Create an array of buttons with the value of select options.
      var buttons = options.map(function (index, opt) {
        var button = $("<button type='button' class='btn btn-raised btn-sm btn-default'></button>")
          .prop('value', opt.value)
          .prop('disabled', is_disabled)
          .text(opt.text);

        // Add an `active` class if the option has been selected.
        if (opt.selected)
          button.addClass(settings.button.active_class);

        // Return the button.
        return button[0];
      });

      // For each button, implement the click button removing and adding
      // `active` class to simulate the toggle effect. And also change the
      // select selected option.
      buttons.each(function (index, btn) {
        $(btn).click(function () {
          // Retrieve all buttons siblings of the clicked one with an
          // `active` class !
          var activeBtn = $(btn).siblings(".active");
          var total = [];

          // Remove all selected property on options.
          self.children("option:selected").prop("selected", false);

          // Check if the clicked button has the class `active`.
          // Add or remove it according to the check.
          if (!$(btn).hasClass(settings.button.active_class)) {
            $(btn).addClass(settings.button.active_class);
            // options.val(btn.value).prop("selected", true);
            options.removeAttr('selected');
            options.filter(function () {
              return this.value == btn.value;
            }).attr('selected', true);
            total.push(btn.value);
          }

          // If the select allow multiple values, remove all active
          // class to the other buttons (to keep only the last clicked
          // button).
          if (!multiple) {
            activeBtn.removeClass(settings.button.active_class);
          }

          // Push all active buttons value in an array.
          activeBtn.each(function (index, btn) {
            total.push(btn.value);
          });

          // Change selected options of the select.
          self.val(total).change();
        });
      });

      // Group all the buttons in a `div` element.
      var btnGroup = $("<div class='btn-group'>").append(buttons);
      // Include the buttons group after the select element.
      self.after(btnGroup);
      // Hide the display element.
      self.hide();

      if (settings.select2) {
        self_select2.hide();
      }

    });

  };

  // Set the defaults options of the plugin.
  $.fn.togglebutton.defaults = {
    button: {
      'active_class': 'active'
    },
    select2: false
  };

}(jQuery));
