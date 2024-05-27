// ==============Check whether a string has only alphabetic characters=========================
let regex = /^[a-zA-Z]+$/;

export const checkValidString=(aString)=>{
    return regex.test(aString)
}
console.log(checkValidString('sdsdds998d'));


//=================Check for a valid email address=============================================
 export function checkValidEmail(email) {
  var re = /\S+@\S+\.\S+/;
  return re.test(email);
}


