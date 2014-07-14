/**
 * Module to access server resources
 * @author Jaime Ramírez <jaime.ram@gmail.com>
 */
(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
      // AMD. Register as an anonymous module.
      define(['jquery'], factory);
  } else {
      // Browser globals
      root.jresource = factory(root.$);
  }
}(this, function ($) {

  /**
   * Default Error handler
   * @type {Object}
   */
  var Error = {
    show: function(text) { console.log(text) }
  };

  function Resource() {}

  /**
   * Gets one data row from server
   * @param  {string} url
   * @param  {string|object} data
   * @param  {function} done callback
   */
  Resource.prototype.get = function(url, data, done) {
      var self = this;
      $.get(url, data)
      .done(function(response) {
          if(response.success) {
              self.setData(response.data);
              done(self);
          }
          else {
              Error.show('Failed request');
              done(false);
          }
      })
      .fail(function() {
          Error.show();
          done(false);
      });
  };

  /**
   * Post data to the server
   * @param  {string} url
   * @param  {string|object} data
   * @param  {function} done callback
   */
  Resource.prototype.post = function(url, data, done) {
      var self = this;
      $.post(url, data)
      .done(function(response) {
          if(response.success) {
              done(response.data);
          }
          else {
              Error.show(response.data.message);
              done(false);
          }
      })
      .fail(function() {
          Error.show();
          done(false);
      });
  };


  Resource.prototype.query = function(url, data, done) {
      var self = this;
      $.get(url, data)
      .done(function(response) {
          if(response.success) {
              var list = self.setListData(response.data);
              done(list);
          }
          else {
              Error.show(response.data.message);
              done(false);
          }
      })
      .fail(function() {
          Error.show();
          done(false);
      });
  };


  Resource.prototype.url = function() {
      throw 'not implemented';
  };

  Resource.prototype.setData = function(data) {
      throw 'not implemented';
  };

  Resource.prototype.setListData = function(data) {
      throw 'not implemented';
  };

  Resource.prototype.setErrorHandler = function(errorHandler) {
    Error = errorHandler;
  }

  /**
   * Copies properties from the received data to this object
   * @param  {json} data Received data
   */
  Resource.prototype.copyProperties = function(data) {
      for (var prop in data) {
          if (data.hasOwnProperty(prop)) {
              this[prop] = data[prop];
          }
      }
  };

  return Resource;
}));



