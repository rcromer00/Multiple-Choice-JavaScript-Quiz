//Questions
var allQuestions = [{question:"Which of the following function of Array object adds and/or removes elements from an array?", answer:["toSource()","sort()", "splice()"],correctAnswer:["splice()",3],selected:""},
                    {question:"Which of the following function of String object creates an HTML anchor that is used as a hypertext target?",answer:["anchor()","link()", "blink()"],correctAnswer:["anchor()",1],selected:""},
					{question:"Which built-in method returns the calling string value converted to lower case?",answer:["toLowerCase()","toLower()", "changeCase(case)"],correctAnswer:["toLowerCase()",1],selected:""},
					{question:"Which of the following type of variable is visible everywhere in your JavaScript code?",answer:["Global variable","Local variable", "Both of the above"],correctAnswer:["global variable",1],selected:""},
					{question:"Which of the following is true about typeof operator in JavaScript?",answer:["Its value is a string indicating the data type of the operand.","The typeof is a unary operator that is placed before its single operand, which can be of any type.", "Both of the above"],correctAnswer:["Both of the above",3],selected:""},
					{question:"Which of the following code creates an object?",answer:["var book = Object();","var book = new Object();", "var book = new OBJECT();"],correctAnswer:["var book = new Object();",2],selected:""}];

					
//Checklist
//Make timer start on 'Click Me to Begin' btn with time deductions for wrong answers
//Make so that when the game is over users can store their login 


//Gather elements referencing to DOM
var timeEl = document.getElementById("timer");
var startquizEl = document.getElementById("start-quiz");
var instructionsEl = document.getElementById("instructions");
var questionsEl = document.getElementById("questions");
var sumbitBtnEl = document.getElementById("sumbit");
var initialsEl = document.getElementById("initials");
var feedbackEl = document.getElementById("feedback");

$(document).ready(function(){	
$("#nextbtn").hide();
$("#btnvalid").hide();
$("#savebtn").hide();
$("#loginbtn").hide();
$("#username").hide();
$("#score").hide();
$("label").hide();
var i = 0;
var b;
var total = []
var finalResult = 0;   
var result = 0;
var selected;


// Timer
document.getElementById("startbtn").addEventListener("click", function (){
	var timeleft = 180;

	var timer = setInterval(function function1() {
		document.getElementById("timer").innerHTML = timeleft + "&nbsp" + "seconds remaining";
		timeleft -= 1;
		if(timeleft <= 0) {
			clearInterval (downloadTimer);
			document.getElementById("timer").innerHTML = "Time is up!"
			
		}
	}, 1000);
	console.log(timer);
})


//Begin changeRadio Options - Loops through allQuestions array and dispays answers in radios     
function changeQuestion(){
    var j = 0;
	$("#titleQuestion").html(allQuestions[i].question.toString());
    $("#titleQuestion").hide().fadeIn('slow');
    //changes question title
	$("#radios").empty().hide();
	for( answers in allQuestions[i].answer){ //loops through array and dynamically adds answer values to radio buttons
		var radioBtn = $('<input type="radio" class="radios" name="btnAnswers" value="'+ allQuestions[i].answer[j] + '" /><label for ="secondbtn">' 
		                 + allQuestions[i].answer[j] + '</label>');
        radioBtn.appendTo('#radios');
     j++
	}
    $('#radios').fadeIn("slow");
	if(allQuestions[i].selected != "")
	{
		$('input[value = "'+ allQuestions[i].selected + '"]').prop('checked',true);
		
	};
	return true;
};


//End changeRadio Options
    //Begin backRadio Options - Loops through allQuestions array and dispays answers in radios     
function backQuestion(){
    var j = 0;
	$("#titleQuestion").html(allQuestions[i-1].question.toString());
    $("#titleQuestion").hide().fadeIn('slow');
    //changes question title
	$("#radios").empty();
    $("#radios").hide();
	for( answers in allQuestions[i-1].answer){ //loops through array and dynamically adds answer values to radio buttons
		var radioBtn = $('<input type="radio" class="radios" id="'+ allQuestions[i-1].answer[j] + '" name="btnAnswers" value="'+ allQuestions[i-1].answer[j] + '" /><label for ="secondbtn">' 
		                 + allQuestions[i-1].answer[j] + '</label>');
        radioBtn.appendTo('#radios');
     j++
	}
	i--;
    $('#radios').fadeIn("slow");
	if(i == 0){
		$("#back").hide();
	}
	 return true;
	};


//End backQuestion Options
$(document).on('change', 'input', function(){
    var checked = $("input[name = btnAnswers]:checked").val();
    allQuestions[i].selected = checked;
    selected = allQuestions[i].selected;
	if(i <= allQuestions.length-1){
    if(this.value == allQuestions[i].correctAnswer[0]){
	   b = allQuestions[i].correctAnswer[1];
	   total[i] = b;
	}else{
		total[i] = 0;
	}
	result = total.reduce(function(a,b){
		return a+b;
	})
	//console.log(total)
	console.log(result);
	}
});


//Start Quiz - starts timer and removes instructions intro
$("#startbtn").click(function(){
	result = 0;
	$("#nextbtn").show();
    $("#startbtn").hide();
	$("#instructions").hide();
	$("#savebtn").hide();
	for(var h = 0; h <= allQuestions.length-1; h++){
        allQuestions[h].selected = "";
	}
	changeQuestion();
	timerId = setInterval(clockTick, 1000);
	timerEl.textContent = time;
});

// Click for next question
$("#nextbtn").click(function(){
	if(i >= 0){
	}
    if($("input[name = btnAnswers]:checked").length > 0){
		i++;
	if(i <= allQuestions.length-1){
		changeQuestion();
	}
	else {
		$("#radios").empty();
		$("#titleQuestion").html("You scored "+ result + " points!!");
		i=0;
		j=0;
		total=[];
		result=0;
		$("#nextbtn").hide();
		$("#savebtn").show();
		$("#startbtn").show();
	}
}
	else {
    	$("#btnvalid").fadeIn(800).fadeOut(1100);
	}
});


//store login credentials locally
$("#loginbtn").click(function(){
	if(document.getElementById("username").value != "" && document.getElementById("score").value != ""){
		localStorage.setItem('name', document.getElementById("username").value );
		var name = localStorage.getItem("name");
		var score = localStorage.getItem("score");
	}else{
		alert("Please fill out both fields");
  }
});

$("#savebtn").click(function() {
	$("#loginbtn").show();
	$("#username").show();
	$("label").show();
})
   
//jquery close bracket	
});