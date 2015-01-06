window.onload = function() {

  if (document.body.classList.contains('option')) {
    // option js

    // read setting and display
    updateSettingView ();

    var savebtn = document.getElementById('save');

    savebtn.addEventListener('click', function() {
      saveOption();
    });

  }

  if (document.body.classList.contains('popup')) {

    // read data from storage
    chrome.storage.local.get(['switch', 'match', 'replace'], function(result) {
      var showarea = document.getElementById('qrarea'),
            status = document.getElementById('status'),
            generURL;

      // popub js
      chrome.tabs.getSelected(null, function(tab) {
        generURL = tab.url;

        if(Object.getOwnPropertyNames(result).length !== 0 && result.switch == '1') {
          // tab.url filter
          for (var i = 0; i < result.match.length; i++) {
            generURL = generURL.replace(result.match[i], result.replace);
          };
          console.log(result.switch);
        }
        var qrcode = new QRCode(showarea, {
            text: "http://liyaodong.sinaapp.com",
            width: 100,
            height: 100,
            colorDark : "#000000",
            colorLight : "#ffffff",
            correctLevel : QRCode.CorrectLevel.H
        });
        qrcode.makeCode(generURL);

        status.innerHTML = '';

        document.getElementById('nowurl').value = generURL;
      });

    });

    // click generbtn gener new qrcode
    var generbtn = document.getElementById('generqr'),
        showarea = document.getElementById('qrarea'),
        urlinput = document.getElementById('nowurl');

    urlinput.addEventListener("keypress", function() {
        if (event.keyCode == 13) generbtn.click();
    });


    generbtn.addEventListener('click', function() {
      this.innerHTML = 'Generating...';
      showarea.innerHTML = ''; // clean dom

      var generURL = urlinput.value;

      var qrcode = new QRCode(showarea, {
          text: "http://liyaodong.sinaapp.com",
          width: 100,
          height: 100,
          colorDark : "#000000",
          colorLight : "#ffffff",
          correctLevel : QRCode.CorrectLevel.H
      });


      qrcode.makeCode(generURL);

      this.innerHTML = 'Done';
    });

  }

  // save all option
  function saveOption () {
    var matchInput = document.getElementsByName('matchswitch'),
        matchRuleText = document.getElementById('match').value.trim(),
        matchReplace = document.getElementById('replace').value,
        matchSwitch = 1,
        matchRule,
        setting;

    for (var i = 0; i < matchInput.length; i++) {
      if(matchInput[i].checked) {
        matchSwitch = matchInput[i].value;
      }
    };


    matchRule = matchRuleText.split( "\n" );


    setting = {
      'switch': matchSwitch,
      'match': matchRule,
      'replace': matchReplace
    }

    chrome.storage.local.set(setting, saveDone);

  }

  function saveDone () {
    var savebtn = document.getElementById('save');
    savebtn.disabled = true;
    savebtn.innerHTML = 'Saved';
  }

  function updateSettingView () {
    // update switdch
    chrome.storage.local.get(['switch', 'match', 'replace'], function(result) {
      if(Object.getOwnPropertyNames(result).length !== 0) {
        updateView (result);
      }
    });
  }

  function updateView (setting) {
    if(setting) {
      // if has setting then update setting view.
      var matchSwitch = document.getElementsByName('matchswitch');

      for (var i = 0; i < matchSwitch.length; i++) {
        if(matchSwitch[i].value == setting.switch) {
          matchSwitch[i].setAttribute('checked', 'checket');
        } else {
          matchSwitch[i].removeAttribute('checked');
        }
      };

      var replaceDom = document.getElementById('replace');

      replaceDom.value = setting.replace;

      var matchDom = document.getElementById('match'),
          matchStr = '';

      setting.match.forEach(function(element) {
        matchStr = matchStr + element + '\n';
      });

      matchDom.innerHTML = matchStr;
    } // if setting end
  }


};
