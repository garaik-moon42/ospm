function checkEnter(formName, e) {
    var keyCode;
    if (window.event) {
        keyCode = window.event.keyCode;
    } else {
        keyCode = e.which;
    }
    if (keyCode == 13) {
        document.forms[formName].submit();
    }
}
