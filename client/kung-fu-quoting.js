test = "";

Template.hello.helpers({
  settings: function() {
    return {
      position: "bottom",
      limit: 10,
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
  },
  sounurl: function() {
  }
});

Template.hello.events({
  'click button': function() {
    console.log("clicked");
    
  },
  'keyup #legend': function(event) {
    search = document.getElementById('legend').value;
    before = document.getElementById('before').value
    if (before === "" || before === NaN) {
      before = 0;
    } else {
      before = parseInt(before);
    }
    // search = "I figured it out. Skadoosh."
    search = subtitles.find({"subtitle": search}).fetch()[0];

    start = search.start;
    start = start.split(":")
    start = 1000 * ((60 * 60 * parseInt(start[0])) + (60 * parseInt(start[1])) + parseInt(start[2]));

    end = search.end;
    end = end.split(":")
    end = 1000 * ((60 * 60 * parseInt(end[0])) + (60 * parseInt(end[1])) + parseInt(end[2])) + 500;

    mySound = new Audio("http://127.0.0.1:5000/getquote?start=" + start + "&end=" + (end + (1000*before)));
    mySound.play();

  }
});

Template.kung.helpers({
  name: function() {
    return this.subtitle;
  }
})