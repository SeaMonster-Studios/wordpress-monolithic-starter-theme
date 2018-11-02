'use strict';

/**
 * --------------------------------------------------------------------------
 * Bootstrap (v4.0.0-alpha.6): util.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * --------------------------------------------------------------------------
 */

var Util = function ($) {

  /**
   * ------------------------------------------------------------------------
   * Private TransitionEnd Helpers
   * ------------------------------------------------------------------------
   */

  var transition = false;

  var MAX_UID = 1000000;

  var TransitionEndEvent = {
    WebkitTransition: 'webkitTransitionEnd',
    MozTransition: 'transitionend',
    OTransition: 'oTransitionEnd otransitionend',
    transition: 'transitionend'
  };

  // shoutout AngusCroll (https://goo.gl/pxwQGp)
  function toType(obj) {
    return {}.toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase();
  }

  function isElement(obj) {
    return (obj[0] || obj).nodeType;
  }

  function getSpecialTransitionEndEvent() {
    return {
      bindType: transition.end,
      delegateType: transition.end,
      handle: function handle(event) {
        if ($(event.target).is(this)) {
          return event.handleObj.handler.apply(this, arguments); // eslint-disable-line prefer-rest-params
        }
        return undefined;
      }
    };
  }

  function transitionEndTest() {
    if (window.QUnit) {
      return false;
    }

    var el = document.createElement('bootstrap');

    for (var name in TransitionEndEvent) {
      if (el.style[name] !== undefined) {
        return {
          end: TransitionEndEvent[name]
        };
      }
    }

    return false;
  }

  function transitionEndEmulator(duration) {
    var _this = this;

    var called = false;

    $(this).one(Util.TRANSITION_END, function () {
      called = true;
    });

    setTimeout(function () {
      if (!called) {
        Util.triggerTransitionEnd(_this);
      }
    }, duration);

    return this;
  }

  function setTransitionEndSupport() {
    transition = transitionEndTest();

    $.fn.emulateTransitionEnd = transitionEndEmulator;

    if (Util.supportsTransitionEnd()) {
      $.event.special[Util.TRANSITION_END] = getSpecialTransitionEndEvent();
    }
  }

  /**
   * --------------------------------------------------------------------------
   * Public Util Api
   * --------------------------------------------------------------------------
   */

  var Util = {

    TRANSITION_END: 'bsTransitionEnd',

    getUID: function getUID(prefix) {
      do {
        // eslint-disable-next-line no-bitwise
        prefix += ~~(Math.random() * MAX_UID); // "~~" acts like a faster Math.floor() here
      } while (document.getElementById(prefix));
      return prefix;
    },
    getSelectorFromElement: function getSelectorFromElement(element) {
      var selector = element.getAttribute('data-target');

      if (!selector) {
        selector = element.getAttribute('href') || '';
        selector = /^#[a-z]/i.test(selector) ? selector : null;
      }

      return selector;
    },
    reflow: function reflow(element) {
      return element.offsetHeight;
    },
    triggerTransitionEnd: function triggerTransitionEnd(element) {
      $(element).trigger(transition.end);
    },
    supportsTransitionEnd: function supportsTransitionEnd() {
      return Boolean(transition);
    },
    typeCheckConfig: function typeCheckConfig(componentName, config, configTypes) {
      for (var property in configTypes) {
        if (configTypes.hasOwnProperty(property)) {
          var expectedTypes = configTypes[property];
          var value = config[property];
          var valueType = value && isElement(value) ? 'element' : toType(value);

          if (!new RegExp(expectedTypes).test(valueType)) {
            throw new Error(componentName.toUpperCase() + ': ' + ('Option "' + property + '" provided type "' + valueType + '" ') + ('but expected type "' + expectedTypes + '".'));
          }
        }
      }
    }
  };

  setTransitionEndSupport();

  return Util;
}(jQuery);
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * --------------------------------------------------------------------------
 * Bootstrap (v4.0.0-alpha.6): stage.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * --------------------------------------------------------------------------
 */

var Stage = function ($) {

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var NAME = 'stage';
  var DATA_KEY = 'bs.stage';
  var VERSION = 'v4.0.0-alpha.6';
  var DATA_API = '[data-toggle="stage"]';
  var EVENT_KEY = '.' + DATA_KEY;
  var DATA_API_KEY = '.data-api';
  var JQUERY_NO_CONFLICT = $.fn[NAME];
  var TRANSITION_DURATION = 150;

  var Default = {
    easing: 'cubic-bezier(.2,.7,.5,1)',
    duration: 300,
    delay: 0,
    distance: 250,
    hiddenElements: '#sidebar'
  };

  var Event = {
    TOUCHMOVE: 'touchmove' + EVENT_KEY,
    KEYDOWN: 'keydown' + EVENT_KEY,
    OPEN: 'open' + EVENT_KEY,
    OPENED: 'opened' + EVENT_KEY,
    CLOSE: 'close' + EVENT_KEY,
    CLOSED: 'closed' + EVENT_KEY,
    CLICK: 'click' + EVENT_KEY,
    CLICK_DATA_API: 'click' + EVENT_KEY + DATA_API_KEY
  };

  var ClassName = {
    STAGE_OPEN: 'stage-open',
    HIDDEN: 'hidden'

    /**
     * ------------------------------------------------------------------------
     * Class Definition
     * ------------------------------------------------------------------------
     */

  };
  var Stage = function () {
    function Stage(element, config) {
      _classCallCheck(this, Stage);

      if (!Util.supportsTransitionEnd()) return;

      this._element = element;
      this._config = config;
    }

    // getters

    _createClass(Stage, [{
      key: '_isOpen',


      // private

      value: function _isOpen() {
        return $(this._element).hasClass(ClassName.STAGE_OPEN);
      }
    }, {
      key: '_complete',
      value: function _complete() {
        $(document.body).css('overflow', 'auto');

        if ('ontouchstart' in document.documentElement) {
          $(document).off(Event.TOUCHMOVE);
        }

        $(this._config.hiddenElements).addClass(ClassName.HIDDEN);

        $(this._element).removeClass(ClassName.STAGE_OPEN).css({
          '-webkit-transition': '',
          '-ms-transition': '',
          'transition': ''
        }).css({
          '-webkit-transform': '',
          '-ms-transform': '',
          'transform': ''
        }).trigger(Event.CLOSED);
      }

      // public

    }, {
      key: 'toggle',
      value: function toggle() {
        if (this._isOpen()) {
          this.close();
        } else {
          this.open();
        }
      }
    }, {
      key: 'open',
      value: function open() {
        var _this = this;

        $(document.body).css('overflow', 'hidden');

        if ('ontouchstart' in document.documentElement) {
          $(document).on(Event.TOUCHMOVE, function (e) {
            e.preventDefault();
          });
        }

        $(this._config.hiddenElements).removeClass(ClassName.HIDDEN);

        $(window).one(Event.KEYDOWN, $.proxy(function (e) {
          e.which == 27 && this.close();
        }, this));

        $(this._element).on(Event.CLICK, $.proxy(this.close, this)).trigger(Event.OPEN).addClass(ClassName.STAGE_OPEN);

        if (!Util.supportsTransitionEnd()) {
          $(this._element).css({
            'left': this._config.distance + 'px',
            'position': 'relative'
          }).trigger(Event.OPENED);
          return;
        }

        $(this._element).css({
          '-webkit-transition': '-webkit-transform ' + this._config.duration + 'ms ' + this._config.easing,
          '-ms-transition': '-ms-transform ' + this._config.duration + 'ms ' + this._config.easing,
          'transition': 'transform ' + this._config.duration + 'ms ' + this._config.easing
        });

        this._element.offsetWidth; // force reflow

        $(this._element).css({
          '-webkit-transform': 'translateX(' + this._config.distance + 'px)',
          '-ms-transform': 'translateX(' + this._config.distance + 'px)',
          'transform': 'translateX(' + this._config.distance + 'px)'
        }).one(Util.TRANSITION_END, function () {
          $(_this._element).trigger(Event.OPENED);
        }).emulateTransitionEnd(this._config.duration);
      }
    }, {
      key: 'close',
      value: function close() {
        $(window).off(Event.KEYDOWN);

        if (!Util.supportsTransitionEnd()) {
          $(this._element).trigger(Event.CLOSE).css({ 'left': '', 'position': '' }).off(Event.CLICK);

          return this._complete();
        }

        $(this._element).trigger(Event.CLOSE).off(Event.CLICK).css({
          '-webkit-transform': 'none',
          '-ms-transform': 'none',
          'transform': 'none'
        }).one(Util.TRANSITION_END, $.proxy(this._complete, this)).emulateTransitionEnd(this._config.duration);
      }

      // static

    }], [{
      key: '_jQueryInterface',
      value: function _jQueryInterface(config) {
        return this.each(function () {
          var $this = $(this);
          var data = $this.data(DATA_KEY);
          var _config = $.extend({}, Default, $this.data(), (typeof config === 'undefined' ? 'undefined' : _typeof(config)) === 'object' && config);

          if (!data) $this.data(DATA_KEY, data = new Stage(this, _config));
          if (typeof config === 'string') data[config]();
        });
      }
    }, {
      key: 'VERSION',
      get: function get() {
        return VERSION;
      }
    }, {
      key: 'Default',
      get: function get() {
        return Default;
      }
    }]);

    return Stage;
  }();

  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */

  $.fn[NAME] = Stage._jQueryInterface;
  $.fn[NAME].Constructor = Stage;
  $.fn[NAME].noConflict = function () {
    $.fn[NAME] = JQUERY_NO_CONFLICT;
    return Stage._jQueryInterface;
  };

  /**
   * ------------------------------------------------------------------------
   * Data Api implementation
   * ------------------------------------------------------------------------
   */

  $(document).on(Event.CLICK_DATA_API, DATA_API, function () {
    var config = $(this).data();
    var $target = $(this.getAttribute('data-target'));

    if (!$target.data(DATA_KEY)) {
      $target.stage(config);
    }

    $target.stage('toggle');
  });

  return Stage;
}(jQuery);
'use strict';

/*
 * Replace all SVG images with inline SVG
 */
jQuery(window).on('load', function () {
		jQuery('.svg').each(function () {
				var $img = jQuery(this);
				var imgID = $img.attr('id');
				var imgClass = $img.attr('class');
				var imgURL = $img.attr('src');

				jQuery.get(imgURL, function (data) {
						// Get the SVG tag, ignore the rest
						var $svg = jQuery(data).find('svg');

						// Add replaced image's ID to the new SVG
						if (typeof imgID !== 'undefined') {
								$svg = $svg.attr('id', imgID);
						}
						// Add replaced image's classes to the new SVG
						if (typeof imgClass !== 'undefined') {
								$svg = $svg.attr('class', imgClass + ' replaced-svg');
						}

						// Remove any invalid XML tags as per http://validator.w3.org
						$svg = $svg.removeAttr('xmlns:a');

						// Check if the viewport is set, if the viewport is not set the SVG wont't scale.
						if (!$svg.attr('viewBox') && $svg.attr('height') && $svg.attr('width')) {
								$svg.attr('viewBox', '0 0 ' + $svg.attr('height') + ' ' + $svg.attr('width'));
						}

						// Replace image with new SVG
						$img.replaceWith($svg);
				}, 'xml');
		});
});
'use strict';

(function ($) {
  $(document).on('click', 'a[href^="#"]', function (event) {
    event.preventDefault();

    $('html, body').animate({
      scrollTop: $($.attr(this, 'href')).offset().top
    }, 500);
  });
})(jQuery);
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// Dependencies: jQuery
var $ = jQuery;

var Nav = function () {
	function Nav(_ref) {
		var _this = this;

		var source_id = _ref.source_id,
		    target_id = _ref.target_id,
		    target_wrapper_id = _ref.target_wrapper_id,
		    toggle_class = _ref.toggle_class,
		    _ref$desktop_style = _ref.desktop_style,
		    desktop_style = _ref$desktop_style === undefined ? 'dropdown' : _ref$desktop_style,
		    _ref$breakpoint = _ref.breakpoint,
		    breakpoint = _ref$breakpoint === undefined ? 992 : _ref$breakpoint,
		    default_thumbnail = _ref.default_thumbnail;

		_classCallCheck(this, Nav);

		this.menu_id = '#' + source_id;
		this.desktop_menu_wrapper = $('#' + target_wrapper_id);
		this.stage_toggles = $('.' + toggle_class);
		this.desktop_menu_id = target_id;
		this.breakpoint = breakpoint;
		this.desktop_style = desktop_style;
		this.unstaged = false;
		this.default_thumbnail = default_thumbnail;

		this.handleUnstage();
		$(window).on('resize', function () {
			return _this.handleUnstage();
		});
	}

	_createClass(Nav, [{
		key: 'handleUnstage',
		value: function handleUnstage() {
			if (!this.unstaged && window.matchMedia('(min-width: ' + this.breakpoint + 'px)').matches) {
				/* the viewport is at least breakpoint pixels wide */
				this.unstaged = true;
				this.stage_toggles.attr('style', 'display: none !important;');

				if (!this.desktop_menu) {
					this.desktop_menu = $(this.menu_id).clone().appendTo(this.desktop_menu_wrapper).attr('id', this.desktop_menu_id).addClass(this.desktop_menu_id + '-' + this.desktop_style);

					switch (this.desktop_style) {
						case 'thumbnails':
							if (!this.default_thumbnail) console.error('A default_thumbnail URL is required for a menu with desktop_style of thumbnails.');
							this.convertCollapseToThumbnails(this.desktop_menu_wrapper);
							break;
						case 'dropdown':
							this.convertCollapseToDropdown(this.desktop_menu_wrapper);
							break;
						default:
							break;
					}
				} else {
					this.desktop_menu.show();
				}
			} else if (this.unstaged && !window.matchMedia('(min-width: ' + this.breakpoint + 'px)').matches) {
				/* the viewport is less than breakpoint pixels wide*/
				this.unstaged = false;
				this.stage_toggles.show();
				this.desktop_menu.hide();
			}
		}
	}, {
		key: 'convertCollapseToThumbnails',
		value: function convertCollapseToThumbnails(wrapper) {
			var collapse_toggles = $(wrapper).find('[data-toggle="collapse"]');
			$(wrapper).find('.collapse-wrapper').addClass('thumbnail-dropdown-wrapper').removeClass('collapse-wrapper');
			$(wrapper).find('#' + this.desktop_menu_id).removeClass('nav-bordered nav-stacked flex-column').addClass('flex-row');
			collapse_toggles.closest('li').find('> a').attr('data-toggle', '');
			collapse_toggles.remove();
			$(wrapper).find('.collapse').addClass('thumbnail-dropdown-menu').removeClass('collapse');

			var toggles = $(wrapper).find('.thumbnail-dropdown-wrapper');
			var menu_thumbnail_items = $(wrapper).find('.thumbnail-dropdown-menu').find('a');

			var _iteratorNormalCompletion = true;
			var _didIteratorError = false;
			var _iteratorError = undefined;

			try {
				for (var _iterator = menu_thumbnail_items[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
					var menu_thumbnail_item = _step.value;

					var thumbnail_url = $(menu_thumbnail_item).attr('data-thumbnail') ? $(menu_thumbnail_item).attr('data-thumbnail') : this.default_thumbnail;
					var text = $(menu_thumbnail_item).text();
					var html = '\n\t\t\t\t<div class="thumbnail-dropdown-item-image">\n\t\t\t\t\t<img src="' + thumbnail_url + '" alt="' + text + '">\n\t\t\t\t</div>\n\t\t\t\t<div class="thumbnail-dropdown-item-text">\n\t\t\t\t\t' + text + '\n\t\t\t\t</div>\n\t\t\t';
					$(menu_thumbnail_item).addClass('thumbnail-dropdown-item').html(html);
				}
			} catch (err) {
				_didIteratorError = true;
				_iteratorError = err;
			} finally {
				try {
					if (!_iteratorNormalCompletion && _iterator.return) {
						_iterator.return();
					}
				} finally {
					if (_didIteratorError) {
						throw _iteratorError;
					}
				}
			}
		}
	}, {
		key: 'convertCollapseToDropdown',
		value: function convertCollapseToDropdown(wrapper) {
			var collapse_toggles = $(wrapper).find('[data-toggle="collapse"]');
			$(wrapper).find('.collapse-wrapper').addClass('dropdown').removeClass('collapse-wrapper');
			$(wrapper).find('.collapse').addClass('dropdown-menu').removeClass('collapse');
			$(wrapper).find('.dropdown-menu').find('> .menu-item').addClass('dropdown-item');
			$('#menu-header-desktop').find('a').on('click', function () {
				document.location = $(this).attr('href');
			});
			$(wrapper).find('#' + this.desktop_menu_id).removeClass('nav-bordered nav-stacked flex-column').addClass('flex-row');
			collapse_toggles.closest('li').find('> a').attr('data-toggle', 'dropdown').addClass('dropdown-toggle');
			collapse_toggles.remove();

			var $menus = $(wrapper).find('.dropdown-menu');
			if ($menus.length > 0) {
				$menus.dropdown();

				for (var i = 0; i <= $menus.length; i++) {
					var menu = $menus[i];
					if (menu) {
						var $menu = $(menu);

						// Add parent item before menu
						var $parent_link = $menu.closest('li').find('> a').clone().addClass('parent-link').removeClass('dropdown-toggle').removeAttr('data-toggle');

						if ($parent_link.length > 0) {
							$menu.prepend('<li>\n\t\t\t\t\t\t\t<a href="' + $parent_link.attr('href') + '"\n\t\t\t\t\t\t\t\tclass="' + $parent_link.attr('class') + '">\n\t\t\t\t\t\t\t\t' + $parent_link.text() + '\n\t\t\t\t\t\t\t</a>\n\t\t\t\t\t\t</li>');
						}

						// center dropdown menu
						// const parent_width = $menu.closest('li').innerWidth()
						// const menu_width = $menu.outerWidth()
						// const menu_padding = 20
						// const pull = `${(-menu_width / 2) + (parent_width / 2) - menu_padding}px`
						// $menu.css({
						// 	width: menu_width + menu_padding * 2,
						// 	left: pull
						// })

						// disable tertiary dropdowns
						var $dropdown = $menu.find('.dropdown');
						$dropdown.find('.dropdown-menu').remove();
						$dropdown.find('.dropdown-toggle').removeClass('dropdown-toggle').removeAttr('data-toggle');
						$dropdown.removeClass('dropdown').removeClass('menu-item-has-children');
					}
				}
			}
		}
	}, {
		key: 'hideOpenSiblingMenus',
		value: function hideOpenSiblingMenus() {
			var collapsibles = $(this.menu_id).find('[data-target^="#collapseID-"]');
			var _iteratorNormalCompletion2 = true;
			var _didIteratorError2 = false;
			var _iteratorError2 = undefined;

			try {
				for (var _iterator2 = collapsibles[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
					var collapsible = _step2.value;

					$(collapsible).on('click', function () {
						$(this).closest('ul').find('[id^="collapseID-"]').collapse('hide');
					});
				}
			} catch (err) {
				_didIteratorError2 = true;
				_iteratorError2 = err;
			} finally {
				try {
					if (!_iteratorNormalCompletion2 && _iterator2.return) {
						_iterator2.return();
					}
				} finally {
					if (_didIteratorError2) {
						throw _iteratorError2;
					}
				}
			}
		}
	}]);

	return Nav;
}();
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// Dependencies: jQuery, Waypoints, sticky.scss

var Sticky = function () {
	function Sticky(_ref) {
		var _this = this;

		var id = _ref.id,
		    _ref$offset = _ref.offset,
		    offset = _ref$offset === undefined ? 0 : _ref$offset,
		    stage = _ref.stage,
		    _ref$type = _ref.type,
		    type = _ref$type === undefined ? 'fixed' : _ref$type,
		    _ref$container = _ref.container,
		    container = _ref$container === undefined ? false : _ref$container,
		    _ref$parent = _ref.parent,
		    parent = _ref$parent === undefined ? false : _ref$parent;

		_classCallCheck(this, Sticky);

		this.selector = id;
		this.$el = $('#' + id);
		this.el = document.getElementById(this.selector);
		this.height = function () {
			return _this.$el.outerHeight();
		};
		this.parent = parent;
		this.offset = function () {
			return _this.parent ? _this.parent.height() : 0;
		};
		this.stage = $(stage);
		this.type = type;
		this.container = container;
		this.container_added = false;
		this.waypoint_selector = this.selector + '-waypoint';
		this.create_ghost();

		// Browsers have a bug where they can't display a fixed child inside of a parent that is being transformed... which is what this becomes when the stage opens up. As such, we can use 'sticky' instead of fixed, but this doesn't work in any microsoft browsers. Ref: https://stackoverflow.com/questions/2637058/positions-fixed-doesnt-work-when-using-webkit-transform
		if (this.type === 'sticky' && !this.isMSI()) {
			this.position = 'sticky';
			this.$el.addClass('sticky-sticky');
		} else {
			this.position = 'fixed';
			this.$el.addClass('sticky-fixed');
		}

		if (this.stage) this.handle_mobile_stage();

		this.set_waypoints(function (direction) {
			return _this.handle_waypoints(direction);
		});
		$(window).resize(function () {
			_this.height();

			_this.set_waypoints(function (direction) {
				return _this.handle_waypoints(direction);
			}, true);
		});
	}

	_createClass(Sticky, [{
		key: 'fixit',
		value: function fixit() {
			if (this.position === 'fixed') {
				this.ghost.css({
					height: this.height() - 1 // the difference of height of waypoints
				});
			}

			if (this.container && !this.container_added) {
				this.container_added = true;
				this.addContainer();
			}

			this.$el.addClass('sticky').css({
				top: this.offset()
			});

			if (this.parent) this.parent.$el.addClass('sticky-child-active');

			this.$el.trigger('sticky-set');
		}
	}, {
		key: 'unfixit',
		value: function unfixit() {
			this.ghost.css({
				height: 1
			});

			if (this.container && this.container_added) {
				this.container_added = false;
				this.removeContainer();
			}

			this.$el.css({
				top: 0
			}).removeClass('sticky');

			if (this.parent) this.parent.$el.removeClass('sticky-child-active');

			this.$el.trigger('sticky-unset');
		}
	}, {
		key: 'addContainer',
		value: function addContainer() {
			this.$el.html('\n\t\t<div class="container">\n\t\t\t' + this.$el.html() + '\n\t\t</div>\n\t');
		}
	}, {
		key: 'removeContainer',
		value: function removeContainer() {
			this.$el.html(this.$el.find('.container').html());
		}
	}, {
		key: 'create_ghost',
		value: function create_ghost() {
			$('<div id="' + this.selector + '-ghost"  style="height: 1px; width: 100%;"></div>').insertBefore(this.$el);
			this.ghost = $('#' + this.selector + '-ghost');
		}
	}, {
		key: 'handle_waypoints',
		value: function handle_waypoints(direction) {
			direction === 'down' ? this.fixit() : this.unfixit();
		}
	}, {
		key: 'set_waypoints',
		value: function set_waypoints(callback) {
			var reset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

			if (reset && this.waypoint) {
				this.waypoint[0].destroy();
			} else {
				$('<div class="' + this.waypoint_selector + '"  style="width: 100%; height: 1px;"></div>').insertBefore(this.$el);
			}
			if (!this.$waypoint) this.$waypoint = $('.' + this.waypoint_selector);

			if (!this.$el.css('margin-top')) console.error('Wo! Looks like you\'re missing something. We couldn\'t find the margin property with on the el.');

			// if (this.$waypoint.length > 1) {
			if (this.$waypoint.length > 0) {
				this.waypoint = this.$waypoint.waypoint({
					handler: callback,
					offset: this.offset()
				});
			}
		}
	}, {
		key: 'handle_mobile_stage',
		value: function handle_mobile_stage() {
			this.stage.css({
				position: 'fixed',
				overflowY: 'scroll'
			});
		}
	}, {
		key: 'isMSI',
		value: function isMSI() {
			if (/MSIE 10/i.test(navigator.userAgent)) {
				// This is internet explorer 10
				return true;
			}

			if (/MSIE 9/i.test(navigator.userAgent) || /rv:11.0/i.test(navigator.userAgent)) {
				// This is internet explorer 9 or 11
				return true;
			}

			if (/Edge\/\d./i.test(navigator.userAgent)) {
				// This is Microsoft Edge
				return true;
			}

			return false;
		}
	}]);

	return Sticky;
}();
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// Dependencies: Requires use of Bootstrap collapse

var CollapseX = function () {
	function CollapseX() {
		_classCallCheck(this, CollapseX);
	}

	_createClass(CollapseX, null, [{
		key: 'collapseSiblings',
		value: function collapseSiblings() {
			var buttons = $('[data-toggle="collapse"]');

			if (buttons.length > 0) {
				var _loop = function _loop(i) {
					var button = buttons[i];
					if (button) {
						$(button).on('click', function () {
							var collapse = $(button).parent().parent().find('.collapse');
							collapse.collapse('hide');
						});
					}
				};

				for (var i = 0; i <= buttons.length; i += 1) {
					_loop(i);
				}
			}
		}
	}]);

	return CollapseX;
}();
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Modal = function () {
	function Modal(modal_name) {
		var _this = this;

		_classCallCheck(this, Modal);

		this.modal_name = modal_name;
		this.$modal = $('.' + modal_name);
		this.$toggle = $('.' + this.modal_name + '-toggle');
		this.$active_location = $('.' + this.modal_name + '-location');

		this.$modal.addClass('detached');
		this.$toggle.on('click', function (e) {
			return _this.handleClick(e);
		});
	}

	_createClass(Modal, [{
		key: 'handleClick',
		value: function handleClick(e) {
			var _this2 = this;

			e.preventDefault();

			if (this.$modal.hasClass('detached')) {
				this.$active_location.append(this.$modal);
				this.$modal.removeClass('detached');
			}

			if (this.$modal.hasClass('active')) {
				this.$modal.css('display', 'none');
				$('body').css('overflow', 'initial');
			} else {
				this.$modal.css('display', 'flex');
				$('body').css('overflow', 'hidden');
			}

			setTimeout(function () {
				return _this2.$modal.toggleClass('active');
			}, 0);
		}
	}]);

	return Modal;
}();
'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// el should be what wraps all <p>'s... then DropCaps get's the first letter of the first <p>

var DropCaps = function DropCaps(el) {
	_classCallCheck(this, DropCaps);

	this.$el = $(el);

	if (this.$el.length > 0) {
		var $p = this.$el.find('p').first();
		if ($p.length > 0) {
			var pFirstLetterRemoved = $p.text().substr(1, undefined);
			var firstLetter = '<span class="first-letter">' + $p.text().slice(0, 1) + '</span>';
			$p.html('' + firstLetter + pFirstLetterRemoved);
		}
	}
};
'use strict';

(function ($) {
	var StickySecondaryNav;

	function make_page_full_height() {
		var $main = $('#main');
		var windowHeight = $(window).height();
		var $stage = $('#app-stage');
		var stageHeight = $stage.css('min-height', 0).outerHeight(); // need to get original height
		$stage.css('min-height', '100vh');
		var minHeight = windowHeight - (stageHeight - $main.outerHeight());

		$main.css({
			minHeight: minHeight
		});
	}

	$(document).ready(function () {
		var $body = $('body');

		// START Sticky and Desktop Converted Navs
		var HeaderNav = new Nav({
			source_id: 'menu-main-menu',
			target_wrapper_id: 'menu-main-desktop-wrapper',
			target_id: 'menu-main-desktop',
			toggle_class: 'stage-toggle',
			breakpoint: 992
		});

		var SearchModal = new Modal('search-modal');

		var StickyHeader = new Sticky({
			id: 'site-header',
			stage: '.stage-shelf',
			type: 'sticky'
		});

		if ($('#nav-secondary').length > 0) {
			StickySecondaryNav = new Sticky({
				id: 'nav-secondary',
				parent: StickyHeader,
				type: 'fixed'
			});
		}

		make_page_full_height();

		// START Enable dropcaps for <p> inside of drop-caps
		if ($('.drop-caps')) {
			new DropCaps('.drop-caps');
		}
		// END Enable dropcaps for <p> inside of drop-caps


		// START collapse secondary nav when an item is clicked
		if (!window.matchMedia('(min-width: 1400px)').matches) {
			var $secondaryCollapseNav = $('.nav-secondary-items.collapse');

			$secondaryCollapseNav.find('.filter-option').on('click', function () {
				return $secondaryCollapseNav.collapse('hide');
			});
			$secondaryCollapseNav.find('a').on('click', function () {
				return $secondaryCollapseNav.collapse('hide');
			});
		}
		// END collapse secondary nav when an item is clicked

		// START make embedded iframe videos responsive
		var $all_videos = $('iframe[src*="//player.vimeo.com"], iframe[src*="//www.youtube.com"]');
		$all_videos.wrap('<div class="video-container"></div>');
		// END make embedded iframe videos responsive

		CollapseX.collapseSiblings();
	}); // END document ready

	$(window).resize(function () {
		make_page_full_height();
	});

	$(window).on('load', function () {

		// cross browser select styles
		setTimeout(function () {
			$('select').select2();
		}, 0);
	});
})(jQuery);
//# sourceMappingURL=app.js.map
