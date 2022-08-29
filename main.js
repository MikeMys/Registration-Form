'use strict'

jQuery.noConflict();
jQuery(document).ready(function($) {
    $('#contact').formToJson('.result-json-output');
});



// $('form.ajax').on("submit", function() {
        // action and method are taken from index.html form where they are declared
        // const xhr = new XMLHttpRequest();
//         var that = $(this),
//             // url = xhr,
//             url = that.attr('action'),
//             type = that.attr('method'),
//             data = {};
//         that.find('[name]').each(function(index, value) {
//             var that = $(this),
//                 name = that.attr('name'),
//                 value = that.val();

//             data[name] = value;
//         });

//         $.ajax({
//             url: url,
//             type: type,
//             data: data,
//             success: function(response) {
//                 // url.open("POST", "contact.php");
//                 // url.setRequestHeader("Content-type","application/x-www-form-urlencoded");
//                 // url.send(data);
//                 console.log(response);
//             }

//         });

//         return false;
//     });

