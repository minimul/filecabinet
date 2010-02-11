/*  FileCabinet was written by Christian Pelczarski
 *  and is freely distributable under the terms of an MIT-style license.
 *  Inspiration and btn-choose-file.png image from http://www.shauninman.com/archive/2007/09/10/styling_file_inputs_with_css_and_the_dom
/*--------------------------------------------------------------------------*/

var FileCabinet = Class.create({
  initialize: function(addLink,options){
    this.addLink = $(addLink);
    this.addLink.observe( 'click',this.add.bindAsEventListener(this));
    this.container = new Element('div',{ 'class': 'fileCabinetContainer' });
    this.addLink.insert({ after: this.container });
    this.options = Object.extend( {
                      newElClassName: 'row',
                      tableWidth: 100
                      }, options || {} );
  },
  moveUnder: function(event,file){
    // To debug this section it is best to make the opacity = 20 for file=input
    var fileCabinet = this;
    var o = fileCabinet.cumulativeOffset();
    var pointer = event.pointer();
    var x = pointer.x - o.left;
    var y = pointer.y - o.top;
    var dim = file.getDimensions();
    var fdim = fileCabinet.getDimensions();
    // Because, the position type is relative we have to do all this magic
    var relativeY =  y - (dim.height / 2);
    var relativeX =  x - (dim.width - 30);
    // IE likes to roam all over; therefore, only allow the input=file element to move
    // within the confines of the fileCabinet
    var rt		= o.left + fdim.width;
    var btm		= o.top + fdim.height;
    if(pointer.x > o.left && pointer.x < rt && pointer.y > o.top && pointer.y < btm){
      file.setStyle( { top: relativeY + 'px', left: relativeX + 'px' });
    }
	},
  add: function(event){
    var html = [
                '<table width="#{tW}%"><tr><td align="left">',
                '<span class="fileCabinet">',
                '<input type="file" class="uploadFields" name="userfile[]" />',
                '</span>',
                '</td><td> No file attached</td>',
                '<td><a href="#">remove</a></td>',
                '</tr>',
                '</table>'
            ];
    var newEl = new Element('div',{ 'class':this.options.newElClassName });
    newEl.insert(html.join('').interpolate({ tW: this.options.tableWidth }));
    var input = newEl.select('input').first();
    var fileCabinet = input.up();
    var aLinks = newEl.select('a');
    // Add behavior to remove link
    aLinks.first().observe('click',this.remove.bindAsEventListener(this,input));
    // moveUnder does a lot of the magic
    var mu = this.moveUnder.bindAsEventListener(fileCabinet,input);
    fileCabinet.observe('mousemove',mu);
    // After select a file this will strip out everything but the filename
    input.observe('change',this.friendlyFilename);
    this.container.insert(newEl);
    // See if the add another link needs to be added
    this.addAnother();
    input.fire('inputField:added');// fire a event in case you want to respond
    event.stop();
  },
  addAnother: function(){
    if(!$('addAnotherRow')){
      var addAnotherRow = new Element('div', { 'id': 'addAnotherRow' }).update('<a href="">add another</a>');
      addAnotherRow.down().observe('click',this.add.bindAsEventListener(this));
      this.container.insert({ after: addAnotherRow });
      this.addAnotherRow = addAnotherRow;
    }
  },
  friendlyFilename: function(){
    var value = this.value.split(/\\/).last();
    this.up('td').next().update(value);
  },
  remove: function(event,input){
    input.fire('inputField:removed');// fire a event in case you want to respond : must be before .remove()
    event.element().up('div.' + this.options.newElClassName).remove();
    // Check an see if there are no more rows inside of fileCabinetContainer
    // then delete the add another link
    if(!this.container.childElements().size()){
      this.addAnotherRow.remove();
    }
    event.stop();
  }
});
