const inputSlider=document.querySelector('[data-lengthSlider]');
const lengthDisplay=document.querySelector('[data-lengthNumber]');
const indicator=document.querySelector('[data-indicator]');
const symbol='!@#$%^&*()~`:"{}+_-<>,.;?/][=-';
const generateBtn=document.querySelector(".generateButton");
const allCheckBox=document.querySelectorAll("input[type=checkbox]");
const uppercaseCheck=document.querySelector('#uppercase');
const lowercaseCheck=document.querySelector('#lowercase');
const numbersCheck=document.querySelector('#numbers');
const symbolsCheck=document.querySelector('#symbols');
const passwordDisplay=document.querySelector('[data-passwordDisplay]');
const copyMsg=document.querySelector('[data-copyMsg]');
const copyBtn=document.querySelector('[data-copy]');

let password="";
let passwordLength=10;
let checkCount=0;
handleSlider();
// set default color to whitish grey
setIndicator("#ccc");

//set password length
function handleSlider(){
    inputSlider.value=passwordLength;
    lengthDisplay.innerText=passwordLength;
    const min=inputSlider.min;
    const max=inputSlider.max;
    inputSlider.style.backgroundSize=((passwordLength-min)*100/(max-min))+"%100%";
}

function setIndicator(color){
    indicator.style.backgroundColor=color;
    indicator.style.boxShadow=`0px 0px 12px 1px ${color}`;
    //shadow
}

function getRndInteger(min,max){
    return Math.floor(Math.random()*(max-min))+min;
}

function generateRandomNumber(){
    return getRndInteger(0,9);
}

function generateLowerCase(){
    return String.fromCharCode(getRndInteger(97,123));
}

function generateUpperCase(){
    return String.fromCharCode(getRndInteger(65,91));
}

function generateSymbol(){
    const randnum=getRndInteger(0,symbol.length);
    return symbol.charAt(randnum);
}

// strength function checking
function strengthChe(){
    let hasUpper=false;
    let hasLower=false;
    let hasNum=false;
    let hasSym=false;
    if(uppercaseCheck.checked)hasUpper=true;
    if(lowercaseCheck.checked)hasLower=true;
    if(numbersCheck.checked)hasNum=true;
    if(symbolsCheck.checked)hasSym=true;

    if(hasUpper && hasLower && (hasNum || hasSym )&& passwordLength>=8){
        setIndicator('#0f0');
    }
    else if((hasUpper || hasLower) && (hasNum || hasSym )&& passwordLength>=6){
        setIndicator('#ff0');
    }
    else{
        setIndicator('#f00');
    }
}

function shufflePassword(array){
    //fisher yates method
    for(let i=array.length-1;i>0;i--){
        const j=Math.floor(Math.random()*(i+1));
        const temp=array[i];
        array[i]=array[j];
        array[j]=temp;
    }
    let str="";
    array.forEach((el)=>(str+=el));
    return str;
}

//copy the password
async function copyContent(){
    try {
        await navigator.clipboard.writeText(passwordDisplay.value);
        copyMsg.innerText="copied";
    } catch (e) {
        copyMsg.innerText="failed";
    }

    //making copied span visible
    copyMsg.classList.add("active");
    setTimeout(()=>{
        copyMsg.classList.remove("active");
    },2000)
    
}

function handleCheckBoxChange(){
    checkCount=0;
    allCheckBox.forEach((checkbox)=>{
        if(checkbox.checked){
            checkCount++;
        }
    })
    if(passwordLength<checkCount){
        passwordLength=checkCount;
        handleSlider();
    }
}   

allCheckBox.forEach((checkbox)=>{
    checkbox.addEventListener('change',handleCheckBoxChange);
})

//slider value change
inputSlider.addEventListener('input',(e)=>{
    passwordLength=e.target.value;//e.target reperesent value on slider
    handleSlider();
})

//copying the value
copyBtn.addEventListener('click',()=>{
    if(passwordDisplay.value){
        copyContent();
    }
})

generateBtn.addEventListener('click',()=>{
    //none of the checkbox is checked
    if(checkCount==0){
        return;
    }
    if(passwordLength<checkCount){
        passwordLength=checkCount;
        handleSlider();
    }

    //starting new password
    password="";

    //adding characters as checked they are

    let funcarr=[];
    if(uppercaseCheck.checked){
        funcarr.push(generateUpperCase);
    }

    if(lowercaseCheck.checked){
        funcarr.push(generateLowerCase);
    }

    if(numbersCheck.checked){
        funcarr.push(generateRandomNumber);
    }

    if(symbolsCheck.checked){
        funcarr.push(generateSymbol);
    }
    console.log("com");
    //compulsory addition
    for(let i=0;i<funcarr.length;i++){
        console.log(i);
        password += funcarr[i]();
    }

    //remaining words
    for(let i=0;i<passwordLength-funcarr.length;i++){
        let randInd=getRndInteger(0,funcarr.length);
        console.log(randInd);
        password += funcarr[randInd]();
    }

    //shuffle the password letters
    password=shufflePassword(Array.from(password));
    //password display
    passwordDisplay.value=password;
    //showing strength
    strengthChe();
})