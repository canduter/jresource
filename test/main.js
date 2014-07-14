describe('a suite of tests', function(){


  it('should JResource exists', function(){
    expect(jresource).to.be.a('function');
  });

  it('should be able to create jresource', function() {

    var resource = new jresource;
    var object = resource.get('id');
    expect(jresource).to.be.a('function');

  });

})