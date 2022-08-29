'use strict';
 
jQuery(function($) {
    
    $.fn.formToJson = function(resultContainer){
        //defining form
        const form = this;
        //define submitted data
        let submittedData = [];

        let formData = {
            employee_name: String,
            employee_number: String,
            phone_number: Number,
            address: String,
            city: String,
            state: String,
            zip_code: Number,
            current_employee: Boolean
        };

        let jsonOutputData = Object.create(formData);

        $(form).submit(function(event){
            event.preventDefault();

            sortData($(form).serialize());
            jsonData();
            outputData();
            resetData();

        });

        function sortData(data) {

            if(data != undefined){
                
                const regxSpace = /(?:20)/gi;
                const regxEmail = /(?:40)/gi;
                const regxLineBreak = /(?:%0D%0A)/gi;

                let sortedData = data.replace(regxSpace, '').replace(regxEmail, '@').replace(regxLineBreak, '\n').split('&');

                $(sortedData).each(function(index, element) {
                    submittedData.push(element.split('='));
                });
            }
        };
        
        function jsonData() {

            if(submittedData != undefined || submittedData != null) {
                // console.log(submittedData[0]);
                $(submittedData).promise().done(function() {
                    jsonOutputData.employee_name = submittedData[0][1];
                    jsonOutputData.employee_number = submittedData[1][1];
                    jsonOutputData.phone_number = submittedData[2][1];
                    jsonOutputData.address = submittedData[3][1];
                    jsonOutputData.city = submittedData[4][1];
                    jsonOutputData.state = submittedData[5][1];
                    jsonOutputData.zip_code = submittedData[6][1];
                    jsonOutputData.current_employee = submittedData[7][1];
                });
            }
        };

        function outputData() {

            let stringifyJsonData = JSON.stringify(jsonOutputData);

            if(resultContainer !== undefined || resultContainer !== null) {
                $(jsonOutputData).promise().done(function() {
                    $(resultContainer).html(stringifyJsonData);
                    //need to send to http now
                    let Http = new XMLHttpRequest();
                    let link = 'https://jsonplaceholder.typicode.com/posts';
                    
                    //showing data in readable format
                    let otherPram={
                        headers:{
                            "content-type":"application/json; charset=UTF-8"
                        },
                        body: stringifyJsonData,
                        method:"POST"
                        };

                    //how I am sending the data (otherPram) to the url (link)
                    fetch(link, otherPram)
                    .then(data=>{return data.json()})
                    .then(res=>{console.log(res)})
                    .catch(error=>console.log(error))

                    //simply telling user that it has been sent
                    alert("Your request has been sent");
                    //reloading the page for future requests
                    location.reload();
                    // console.log(stringifyJsonData);
                });
            }
            else{
                console.log('resultContainer undefined');
                return stringifyJsonData;
            }
        }

        function resetData() {
            //emptying the data for next submission
            submittedData = [];
            jsonOutputData = {};
        }

    }

}(jQuery));