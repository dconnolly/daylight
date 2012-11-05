require.config({
  shim: {
  },

  paths: {
      hm: 'vendor/hm',
      esprima: 'vendor/esprima',
      jquery: 'vendor/jquery.min',
      d3: '../../components/d3/d3.v2.min'
  }
});
 
require(['app'], function(app) {
  // use app here
  console.log(app);
});