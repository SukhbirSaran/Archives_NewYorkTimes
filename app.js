$(function(){
var year='';
var nameAddr='';
var wrongYear="Enter a year between 1851 and 2018";
var correctyear="Correct year entered!";
var wrongMessageclass="wrong-messageclass";
var correctMessageclass="right-messageclass";
var newTB="_blank";
var apiKey="c9c19e305b5e494e8ae8f1e2284eb00e";
var count=parseInt(0);
var Tableclass="table-class";
//var url=`http://api.nytimes.com/svc/archive/v1/${year}/${month}.json?api-key=${apiKey}`;
$("#year").keyup(function(){
year= $("#year").val();
valiDateYear(year);
console.log(typeof year);
});// Completes the form validation for year input
$("#MonthSelect").change(function(){
var optionSelected= $("#MonthSelect").val();
console.log(optionSelected);
$("#MonthSelect").css("box-shadow","0 0 10px green" );
setTimeout(function(){
$("#MonthSelect").css("box-shadow","none")
},1500);
});
// Submit info
$("#btn-submit").click(function(){
//var finalURL= setURL(url);
//document.getElementById("storyTable").reset();
count=parseInt(0);
$(".table-class").remove();
var YEAR= $("#year").val();
var MONTH=$("#MonthSelect").val();
var MONTHINT= MonthNum(MONTH);
var searchWord= $("#tag").val();
console.log(searchWord);
document.getElementById("myForm").reset();
$("#table-below").text("Your search results are under:");

//console.log(YEAR);
//console.log(MONTH);
getData(`http://api.nytimes.com/svc/archive/v1/${YEAR}/${MONTHINT}.json?api-key=${apiKey}`,searchWord);

});
// Add functions here
// Month integer
function MonthNum(month){
if(month==="January"){
    return 1;
}else if(month==="February"){
    return 2;
}else if(month==="March"){
    return 3;
}else if(month==="April"){
    return 4;
}else if(month==="May"){
    return 5;
}else if(month==="June"){
    return 6;
 } else if(month==="July"){
    return 7;
 }else if(month==="August"){
    return 8;
 }else if(month==="September"){
    return 9;
 }else if(month==="October"){
    return 10;
 }else if(month==="November"){
    return 11;
 }else if(month==="December"){
    return 12;
 }
};// Returns the inetger equivalent of months

// Validate year
function valiDateYear(year){
var yearInt= parseInt(year);
indicateCorrectYearEntry(year);
};//valiDateYear() ends here
function indicateCorrectYearEntry(year){
if(year.length===4 ){
if(parseInt(year)<2019){
if(parseInt(year)>1851){$("#year").css("box-shadow","0 0 15px green");
logYearMessage(correctyear,correctMessageclass);
setTimeout(function(){
$("#year").next("p").remove();
$("#year").css("box-shadow","none");
},2000);
}
}
} else {
$("#year").css("box-shadow","0 0 15px red");  
logYearMessage(wrongYear,wrongMessageclass);
}
}; //indicateCorrectYearEntry function ends here

function logYearMessage(message,mclass){
$("#year").next("p").remove();
$("#year").after("<p class="+mclass+">"+message+"</p>");
}; // logYearMessage ends here
function getData(url,word){
//$("table").css("display","initial");
var regWord=new RegExp(word,'i');
//console.log(word);
$.getJSON(url, function(data){
//console.log(data);
// Filtered the docs out of data
$.each(data, function(key,val){


// Filtered the first story
$.each(val.docs,function(k,v){
    //if(k>0){return false;}
    if(regWord.test(v.headline.main))
    {console.log(v.headline.main);
    count=count+1;
    insertNews(v,newTB,count);}
    //console.log(v.web_url);
    //console.log(v.headline.main)
    //insertLink(v.web_url,newTB);
});
//end of each
})

// end of done

//$(".insert").after("<p>Your Address is"+nameAddr +"</p>");

});
}
function insertLink(url1, newTB){
$(".insert").after("<a href="+url1+" target="+newTB+">The Story is here</a>");
};
function insertNews(vline,newTB,i){
//$(".insert").after("<a href="+vline.web_url+" target="+newTB+">"//+vline.headline.main+"</a>");
//$(".insert").after("<hr>")
var tableContent="<tr class="+Tableclass+"><td>"+i+"</td><td><a href="+vline.web_url+" target="+newTB+">"+vline.headline.main+"</a></td></tr>";
$("table").append(tableContent);
}
})//$(function(){})
