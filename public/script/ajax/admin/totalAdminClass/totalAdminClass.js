$( document ).ready(function() {
  

    // SUBMIT FORM
      $("#userForm").submit(function(event) {
      // Prevent the form from submitting via the browser.
      event.preventDefault();
      ajaxPost();
    });
      
      
      function ajaxPost(){
        
        // PREPARE FORM DATA
        var formData = {
          class_name : $("#class_name").val(),
        }
        
        // DO POST
        $.ajax({
        type : "POST",
        contentType : "application/json",
        url : window.location + "/post",
        data : JSON.stringify(formData),
        dataType : 'json',
        success : function(result, status, xhr) {  
          $("#postResultDiv").html("<p>"+result.redirect+"</p>"); 
        },
  
        error : function(e) {
          $("#postResultDiv").html("<p>" + "Post Already Exist On MongoDB Database! <br>" +"</p>"); 
        }
      })
          
        // Reset FormData after Posting
        resetData();
  
      }
  
      function resetData(){
          $("#class_name").val("");
        }
  
    //------------------------------------------------------------------------------------------------//

  
    
  
  })