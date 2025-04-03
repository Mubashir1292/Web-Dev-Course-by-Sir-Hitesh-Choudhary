document.addEventListener("DOMContentLoaded",()=>{
    let form=document.getElementsByTagName("form");
    let cityNameInputBox=document.getElementById("cityName");
    let submit=document.getElementById("submit");
    let results=document.getElementById("results");
    let error=document.getElementById("error");
    // creating the function for just adding the submit functionality
    submit.addEventListener("click",(e)=>{
        if(cityNameInputBox.value.trim().length===0) return;
        
    })
    
})