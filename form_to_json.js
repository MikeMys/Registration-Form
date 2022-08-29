'use strict';
 
jQuery(function($) {
    
    $.fn.formToJson = function(resultContainer){
        //defining form that we are getting data from
        const form = this;
        //define submitted data
        let submittedData = [];
        //defining the format of our form and what attributes we will be adding
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

        //creating empty object to hold data
        let jsonOutputData = Object.create(formData);

        //this is where we are calling all of our functions to change data to JSON and send it
        $(form).submit(function(event){
            event.preventDefault();

            //translating to a structure that is easily transferable over a network
            sortData($(form).serialize());
            //populating the form
            jsonData();
            //sending data to url
            outputData();
            resetData();

        });

        function sortData(data) {
            //cant do things to nothing
            if(data != undefined){
                //in case of a random space
                const regxSpace = /(?:20)/gi;
                //for @ sign in email
                const regxEmail = /(?:40)/gi;
                //any randon line breaks
                const regxLineBreak = /(?:%0D%0A)/gi;

                let sortedData = data.replace(regxSpace, '').replace(regxEmail, '@').replace(regxLineBreak, '\n').split('&');
                //making sorted data correct format and then pushing it to submitted data for next use
                $(sortedData).each(function(index, element) {
                    submittedData.push(element.split('='));
                });
            }
        };
        
        function jsonData() {
            //again, cannot be empty
            if(submittedData != undefined || submittedData != null) {
                // console.log(submittedData[0]);
                //filling output data with the respective data from the form
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
            //turning the form we made into a json
            let stringifyJsonData = JSON.stringify(jsonOutputData);
            //making sure the container is not empty
            if(resultContainer !== undefined || resultContainer !== null) {
                $(jsonOutputData).promise().done(function() {
                    //gets contents of stringifyJsonData for resultContainer
                    $(resultContainer).html(stringifyJsonData);
                    //need to send to http now
                    // let Http = new XMLHttpRequest(); //was thinking of using this but didnt
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
