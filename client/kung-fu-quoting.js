function playQuote() {
  search = document.getElementById('legend').value;
  before = document.getElementById('beforespin').value;
  after = document.getElementById('afterspin').value;

  document.getElementById('legend').value = "";
  document.getElementById('beforespin').value = "0";
  document.getElementById('afterspin').value = "0";

  before = (before === "" || before === NaN) ? 0 : parseInt(before) * 1000;

  after = (after === "" || after === NaN) ? 0 : parseInt(after) * 1000;

  search = subtitles.find({"subtitle": search}).fetch()[0];

  start = search['start'];
  start = start.split(":");
  start = 1000 * ((60 * 60 * parseInt(start[0])) + (60 * parseInt(start[1])) + parseInt(start[2]));


  end = search.end;
  end = end.split(":")
  end = 1000 * ((60 * 60 * parseInt(end[0])) + (60 * parseInt(end[1])) + parseInt(end[2])) + 500;

  mySound = new Audio("http://68.56.19.11:5000/getquote?start=" + (start - before) + "&end=" + (end + after) );
  mySound.play();
}

Template.hello.helpers({
  settings: function() {
    return {
      position: "bottom",
      limit: 6,
      rules: [
        {
          token: '',
          collection: subtitles,
          field: 'subtitle',
          matchAll: true,
          template: Template.kung
        }
      ]
    };
  }
});

Template.hello.events({
  'click .options': function() {
    playQuote();
  },
  'keyup #legend': function(event) {
    if (event.which === 13) {
      playQuote();
    };
  },

});

Template.kung.helpers({
  name: function() {
    return this.subtitle;
  }
})