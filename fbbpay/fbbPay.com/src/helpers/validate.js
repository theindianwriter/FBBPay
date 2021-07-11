//few helper functions which help us to validate as well as get the time in the required format
export const validateEmail = (emailId) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(emailId);
  };
  
  export function validateMobile(phoneNo) {
    const re = /^\+?([0-9]{2})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/;
    return re.test(phoneNo);
  };
  export function validatePassword(password) {
    const re = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$/;
    return re.test(password);
  };

  export function validateKey(key){
    const re = /^[a-zA-Z0-9]*$/;
    return  re.test(key);
  }
  

  //it returns the form in which we save the dates in the deadline database i.e date hours : nim: secs form
  export function getTime(date) {
    var aaaa = date.getFullYear();
    var gg = date.getDate();
    var mm = date.getMonth() + 1;
  
    if (gg < 10) gg = "0" + gg;
  
    if (mm < 10) mm = "0" + mm;
  
    var day = aaaa + "-" + mm + "-" + gg;
  
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var seconds = date.getSeconds();
  
    if (hours < 10) hours = "0" + hours;
  
    if (minutes < 10) minutes = "0" + minutes;
  
    if (seconds < 10) seconds = "0" + seconds;
  
    return day + " " + hours + ":" + minutes + ":" + seconds;
  }