$(document).ready(function(){

//Hide Menu on Scroll
var prevScrollpos = window.pageYOffset;
window.onscroll = function() {
var currentScrollPos = window.pageYOffset;
  if (prevScrollpos > currentScrollPos) {
    document.getElementById("navbar").style.top = "0";
  } else {
    document.getElementById("navbar").style.top = "-50px";
    document.getElementById("navbar").style.height = "50px";
  }
  prevScrollpos = currentScrollPos;
}

//smooth scroll
$('a.linkSize').click(function(){
  $('html, body').animate({
      scrollTop: $( $(this).attr('href') ).offset().top
  }, 500);
  return false;
});

//Tooltips
$('body').scrollspy({target: ".navbar"})
//toggle tooltips
$('[data-toggle="tooltip"]').tooltip(); 
$('#downloader').tooltip({title: "<p class='downloadTooltip'> Download my Resume <p>", html: true, placement: "top", animation: true}); 
$('#github').tooltip({title: "<p class='downloadTooltip'> View all my project's code <p>", html: true, placement: "top", animation: true}); 
$('#email').tooltip({title: "<p class='downloadTooltip'> alanpramuk9@gmail.com <p>", html: true, placement: "top", animation: true}); 
$('#linkedin').tooltip({title: "<p class='downloadTooltip'> Go to my LinkedIn <p>", html: true, placement: "top", animation: true}); 
// $('#HTML5').tooltip({title: "<p class='downloadTooltip'> HTML5 <p>", html: true, placement: "bottom", animation: true}); 
$('#react').tooltip({title: "React", trigger: "hover focus", html: true, placement: "right", animation: true}); 
$('#git').tooltip({title: "Git", trigger: "hover focus", html: true, placement: "right", animation: true}); 
$('#mongodb').tooltip({title: "MongoDB", trigger: "hover focus", html: true, placement: "right", animation: true}); 
$('#sass').tooltip({title: "SASS", trigger: "hover focus", html: true, placement: "right", animation: true}); 
$('#java').tooltip({title: "Java", trigger: "hover focus", html: true, placement: "top", animation: true}); 
$('#python').tooltip({title: "Python", trigger: "hover focus", html: true, placement: "top", animation: true}); 
$('#mysql').tooltip({title: "MySQL", trigger: "hover focus", html: true, placement: "top", animation: true}); 
$('#bootstrap').tooltip({title: "Bootstrap", trigger: "hover focus", html: true, placement: "left", animation: true}); 
$('#node').tooltip({title: "Node.js", trigger: "hover focus", html: true, placement: "left", animation: true});
$('#jquery').tooltip({title: "jQuery", trigger: "hover focus", html: true, placement: "left", animation: true});
$('#php').tooltip({title: "PHP", trigger: "hover focus", html: true, placement: "left", animation: true}); 

//Scroll Reveal
window.sr = ScrollReveal({ reset: false });
sr.reveal('.skillsAnime', { 
  viewFactor: 0.5
});
ScrollReveal().reveal('.firstCard', { origin: 'left', viewFactor: '.5', reset: false });
ScrollReveal().reveal('.secondCard', { origin: 'right', viewFactor: '.5', reset: false  });
ScrollReveal().reveal('.flip', {
  rotate: {
      x: 20,
      z: 20
  }, easing: 'cubic-bezier(0.5, 0, 0, 1)', reset: true
  
});
ScrollReveal().reveal('.smooth', { easing: 'ease-in' });

});


//Form Submission
$('form').submit(function(event) {

     $('.form-group').removeClass('has-error'); // remove the error class
    $('.alert.alert-warning').remove(); // remove the error text
    // Fetch form to apply custom Bootstrap validation
    
    // get the form data
    var formData = {
        'name' 				: $('input[name=name]').val(),
        'email' 			: $('input[name=email]').val(),
        'subject' 	        : $('select[name=subject]').val(),
        'comment' 	        : $('textarea[name=comment]').val()
    };
    console.log(formData);
    // process the form
    $.ajax({
        type 		: 'POST', // HTTP request type
        url 		: 'processmaster.php', // the url where to POST
        data 		: formData, // data object to send
        dataType 	: 'json', // type of data to expect back from the server
        encode 		: true
    })
    // using the done promise callback
        .done(function(data) {
            // handle errors and validation messages
            if ( ! data.success) {

                // handle errors for name ---------------
                if (data.errors.name) {
                    // $('#name-group').addClass('has-error'); // add the error class to show red input
                    $('#name-group').append('<div class="alert alert-warning">' + data.errors.name + '</div>'); // add the actual error message under our input
                }

                // handle errors for email ---------------
                if (data.errors.email) {
                    // $('#email-group').addClass('has-error'); // add the error class to show red input
                    $('#email-group').append('<div class="alert alert-warning">' + data.errors.email + '</div>'); // add the actual error message under our input
                }
                // handle errors for subject ---------------
                if (data.errors.subject) {
                    // $('#subject-group').addClass('has-error'); // add the error class to show red input
                    $('#subject-group').append('<div class="alert alert-warning">' + data.errors.subject + '</div>'); // add the actual error message under our input
                }

                // handle errors for superhero alias ---------------
                if (data.errors.comment) {
                    // $('#comment-group').addClass('has-error'); // add the error class to show red input
                    $('#comment-group').append('<div class="alert alert-warning">' + data.errors.comment + '</div>'); // add the actual error message under our input
                }

            } else {

                // ALL GOOD! just show the success message!
                $('form').prepend('<div class="alert alert-success">' + data.message + '</div>');

            }
        })

        // using the fail promise callback
        .fail(function(data) {

            // show any errors
            console.log(data);
        });

    // stop the form from submitting the normal way and refreshing the page
    event.preventDefault();
});