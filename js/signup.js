var contact = document.getElementById('contact');
var address = document.getElementById('address');
var email = document.getElementById('email')
var firstSection = document.getElementsByClassName('sectionFirst');
var saveBtn = document.getElementById('saveBtn');
var condition 
var arr = Array.from(firstSection);
function validateFirstSection(btn) {

        if (window.location.href.indexOf('profile') > -1){
            condition = !isFieldsEmpty(arr) && isContactOk() && isEmailOK() && isAddressOk();
        }
        else {
            condition = !isFieldsEmpty(arr) && isContactOk() && isAddressOk() ;
        }

        if (condition) {
            enableBtn(btn);
        } else {
            disableBtn(btn);
        }
        
}

function isEmailOK() {
    if (email.value.includes('@') && (email.value.includes('.com') || email.value.includes('.mail'))) {
        removeErrorMsg();
        return true
    } else {
        displayErrorMsg('Email is not Valid');
        return false;
    }
}

function isFieldsEmpty(array) {
    return (array.some(arrayElement => arrayElement.value ==  ''))
}

function isAddressOk() {
    if (address.value.length > 30){
        removeErrorMsg();
        return true;
    }
    else{
        displayErrorMsg('Delivery address needs to be atleast 30 characters long');
        return false;
    }
}

function  isContactOk() {
    if(contact.value.length > 9 && contact.value.length < 11 ){
        removeErrorMsg();
        return true;
    }
    else {
        displayErrorMsg('Contact Number needs to be 10 characters long')
        return false;
    }
}

function disableBtn(ele) {
    ele.disabled = true;
    ele.style.background = '#cccccc';
    ele.style.color = '#666666';
}

function enableBtn(ele) {
    ele.disabled = false;
    ele.style.background = '#673AB7';
    ele.style.color = 'white';
}

function displayErrorMsg(msg) {
    document.getElementById('message').innerText = msg;
}

function removeErrorMsg() {
    document.getElementById('message').innerText = '';
}


// all the code above this will be used in both the pages ( profile.html and signup.html)




if (window.location.href.indexOf('signup') > -1) {

    $(document).ready(function () {
        var current_fs, next_fs, previous_fs; //fieldsets
        var opacity;
        var current = 1;
        var steps = $("fieldset").length;

        setProgressBar(current);

        $(".next").click(function () {

            current_fs = $(this).parent();
            next_fs = $(this).parent().next();

            //Add Class Active
            $("#progressbar li").eq($("fieldset").index(next_fs)).addClass("active");

            //show the next fieldset
            next_fs.show();
            //hide the current fieldset with style
            current_fs.animate({
                opacity: 0
            }, {
                step: function (now) {
                    // for making fielset appear animation
                    opacity = 1 - now;

                    current_fs.css({
                        'display': 'none',
                        'position': 'relative'
                    });
                    next_fs.css({
                        'opacity': opacity
                    });
                },
                duration: 500
            });
            setProgressBar(++current);
        });

        $(".previous").click(function () {

            current_fs = $(this).parent();
            previous_fs = $(this).parent().prev();

            //Remove class active
            $("#progressbar li").eq($("fieldset").index(current_fs)).removeClass("active");

            //show the previous fieldset
            previous_fs.show();

            //hide the current fieldset with style
            current_fs.animate({
                opacity: 0
            }, {
                step: function (now) {
                    // for making fielset appear animation
                    opacity = 1 - now;

                    current_fs.css({
                        'display': 'none',
                        'position': 'relative'
                    });
                    previous_fs.css({
                        'opacity': opacity
                    });
                },
                duration: 500
            });
            setProgressBar(--current);
        });

        function setProgressBar(curStep) {
            var percent = parseFloat(100 / steps) * curStep;
            percent = percent.toFixed();
            $(".progress-bar")
                .css("width", percent + "%")
        }

        $(".submit").click(function () {
            return false;
        })

    });



    var signupGenres = document.getElementsByClassName('signupGenre');
    var submitBtn = document.getElementsByClassName('submit')[0];
    var selectedGenre = document.getElementsByClassName('selected')

    disableBtn(submitBtn);

    for (i = 0; i < signupGenres.length; i++) {
        signupGenres[i].addEventListener('click', (e) => {
            var clickedGenre = e.target;
            clickedGenre.classList.toggle('selected')
            if (selectedGenre.length > 0) {
                enableBtn(submitBtn)
            } else {
                disableBtn(submitBtn)
            }
        })


    }

    // form validation starts now
    var firstSectionBtn = document.getElementById('sectionFirstBtn');

    disableBtn(firstSectionBtn);

    for (i = 0; i < firstSection.length; i++) {
        firstSection[i].addEventListener('input', () => {
            validateFirstSection(firstSectionBtn);
        })
    }

    var secondSectionBtn = document.getElementById('sectionSecondBtn');
    var secondSection = document.getElementsByClassName('sectionSecond');
    var password = document.getElementById('password');
    var confirmPass = document.getElementById('confirmPassword');
    var username = document.getElementById('username')


    disableBtn(secondSectionBtn);

    for (i = 0; i < secondSection.length; i++) {
        secondSection[i].addEventListener('input', () => {
            validateSecondSection();
        })
    }


    function validateSecondSection() {
        for (i = 0; i < secondSection.length; i++) {
            condition = secondSection[i].value != '' && username.value.length >= 6 && password.value.length > 7 && confirmPass.value.length > 7;
            if (condition) {
                if (isPassowrdsEqual() && isEmailOK()) {
                    enableBtn(secondSectionBtn);
                } else {
                    disableBtn(secondSectionBtn);
                }
            } else {
                disableBtn(secondSectionBtn);
            }

        }

    }

    function isPassowrdsEqual() {
        if (password.value == confirmPass.value) {
            removeErrorMsg();
            return true;
        } else {
            displayErrorMsg('Password Does Not Match')
            return false;
        }
    }


    var timer = document.getElementById('timer');
    submitBtn.addEventListener('click', () => {
        var timeleft = 0;
        var downloadTimer = setInterval(function () {
            if (timeleft > 4) {
                clearInterval(downloadTimer);
                window.location.replace("http://127.0.0.1:5500/index.html");
            }
            var remain = 5 - timeleft;
            timer.innerText = 'Logging You in ' + remain + 's';
            timeleft += 1;
        }, 1000);
    })

}

// validation for profile form is here 
if (window.location.href.indexOf("profile") > -1) {
    disableBtn(saveBtn);
    validateFirstSection(saveBtn);
    for (i = 0; i < firstSection.length; i++) {
        firstSection[i].addEventListener('input', () => {
            validateFirstSection(saveBtn);
        })
    }
    saveBtn.onclick = () => {
        // make awaiting api call here;
        window.location.reload();
    }
}