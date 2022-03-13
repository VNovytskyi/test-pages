$(document).ready(function(){
  $("#load-card").delay(700).fadeOut(600, () => {
    $("#load-card").addClass("d-none")
    $("#main-card").fadeIn()
  })

  //For debug
  /*$("#load-card").addClass("d-none")
  $("#main-card").addClass("d-block")*/

  function setSSIDerror(description) {
    $("#ssid-label").addClass("border-danger")
    $("#ssid-input").addClass("border-danger")
    $("#ssid-error-block").addClass("d-block")
    $("#ssid-error-description").text(description)
  }
  
  function clearSSIDerror() {
    $("#ssid-label").removeClass("border-danger")
    $("#ssid-input").removeClass("border-danger")
    $("#ssid-error-block").removeClass("d-block")
  }
  
  function checkSSIDname(str) {
    if (str.length < 1|| str.length > 32) {
      return "The name length must be in the range: 1-32"
    }
  
    if (/^[!#;].|[+\[\]/"\t\s].*$/.test(str)) {
      return "Detected forbidden symbol in name"
    }
  
    return ""
  }
  
  function setPasswordError(description) {
    $("#pass-label").addClass("border-danger")
    $("#pass-input").addClass("border-danger")
    $("#pass-error-block").addClass("d-block")
    $("#pass-error-description").text(description)
  }
  
  function clearPasswordError() {
    $("#pass-label").removeClass("border-danger")
    $("#pass-input").removeClass("border-danger")
    $("#pass-error-block").removeClass("d-block")   
  }
  
  function checkPassword(str) {
    if (str.length < 1) {
      return {
        type: "error",
        title: "Password field can`t be empty!"
      }
    }
  
    return {type: "", title: ""}
  }
  
  function setUserNameError(description) {
    $("#superuser-name-label").addClass("border-danger")
    $("#superuser-name-input").addClass("border-danger")
    $("#superuser-error-block").addClass("d-block")
    $("#superuser-error-description").text(description)
  }
  
  function clearUserNameError() {
    $("#superuser-name-label").removeClass("border-danger")
    $("#superuser-name-input").removeClass("border-danger")
    $("#superuser-error-block").removeClass("d-block")
  }
  
  function checkSuperuserName(str) {
    if (str.length < 1 || str.length > 32) {
      return "Wrong super user name length. Available: 1-32"
    }
  
    if (/^[!#;].|[+\[\]/"\t\s].*$/.test(str)) {
      return "Detected forbidden symbol in super user name"
    }
  
    return ""
  }
  
  function setSuperUserPasswordError(description) {
    $("#su-pass-label").addClass("border-danger")
    $("#su-pass-input").addClass("border-danger")
    $("#su-pass-error-block").addClass("d-block")
    $("#su-pass-error-msg").text(description)
  }
  
  function clearSuperUserPasswordError() {
    $("#su-pass-label").removeClass("border-danger")
    $("#su-pass-input").removeClass("border-danger")
    $("#su-pass-error-block").removeClass("d-block")
  }
  
  function checkSuperUserPassword(str) {
    if (str.length < 1 || str.length > 32) {
      return "Wrong super user password length. Available: 1-32"
    }
  
    return ""
  }
  
  // Apply form fields
  $("#apply-button").on("click", () => {
    const superUserName = $("#superuser-name-input").val()
    const superUserPass = $("#su-pass-input").val()
  
    const ssid = $("#ssid-input").val()
    const pass = $("#pass-input").val()
  
    const wifiMode = $("input[name='wifi-mode-radiogroup']:checked")[0].value
  
    let error = ''
    let failed = false
  
    if (wifiMode != "ap") {
      error = checkSSIDname(ssid)
      if (error.length) {
        setSSIDerror(error)
        failed = true
      }
  
      error = checkPassword(pass);
      if (error.title.length) {
        setPasswordError(error.title)
        failed = true
      }
    }
  
    error = checkSuperuserName(superUserName)
    if (error.length) { 
      setUserNameError(error)
      failed = true
    }
  
    error = checkSuperUserPassword(superUserPass)
    if (error.length) {
      setSuperUserPasswordError(error)
      failed = true
    }
  
    if (failed) {
      return
    }
  
    console.log("[Superuser]")
    console.log("NAME: " + superUserName)
    console.log("PASS: " + superUserPass)
   
    console.log("[Wifi]")
    console.log("Mode: " + wifiMode)
    console.log("SSID: " + ssid)
    console.log("PASS:" + pass)

    $("#apply-button").addClass("d-none")
    $("#load-button").removeClass("d-none")

    $("#superuser-name-input").prop("disabled", true);
    $("#su-pass-input").prop("disabled", true);
    $('input[name=wifi-mode-radiogroup]').attr("disabled",true);
    $("#ssid-input").prop("disabled", true);
    $("#pass-input").prop("disabled", true);
  })
  
  // Check SSID on 'input' event
  $("#ssid-input").on("input", () => {
    const ssid = $("#ssid-input").val()
    const error = checkSSIDname(ssid)
    if (error.length) {
      setSSIDerror(error)
    } else {
      clearSSIDerror()
    }
  })
  
  // Check Password on 'input' event
  $("#pass-input").on("input", () => {
    const pass = $("#pass-input").val()
    const error = checkPassword(pass)
    if (error.title.length) {
      setPasswordError(error.title)
    } else {
      clearPasswordError()
    }
  })
  
  // Check superuser name on 'input' event
  $("#superuser-name-input").on("input", () => {
    const name = $("#superuser-name-input").val()
    let error = checkSuperuserName(name)
    if (error.length) { 
      setUserNameError(error)
    } else {
      clearUserNameError()
    }
  })
  
  // Check superuser password on 'input' event
  $("#su-pass-input").on("input", () => {
    const name = $("#su-pass-input").val()
    let error = checkSuperUserPassword(name)
    if (error.length) { 
      setSuperUserPasswordError(error)
    } else {
      clearSuperUserPasswordError()
    }
  })
  
  $('input[type=radio][name=wifi-mode-radiogroup]').change(function() {
    if(this.value == "ap") {
      //$("#wifi-input").fadeOut()
      $("#wifi-input").slideUp()
    } else {
     // $("#wifi-input").fadeIn()
      $("#wifi-input").slideDown()
    }
    clearSSIDerror()
    clearPasswordError()
  })  
})
