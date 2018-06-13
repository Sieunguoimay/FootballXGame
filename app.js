


function getQueryVariable(variable){
	
	var query = window.location.search.substring(1);
	var vars = query.split("&");
	//console.log("query: "+vars);
	for (var i=0;i<vars.length;i++) {
		var pair = vars[i].split("=");
		if(pair[0] == variable){return pair[1];}
	}
	return(false);
}




var userLang = navigator.language || navigator.userLanguage; 








//some things needed to be repaired...

//alert ("The language is: " + userLang);


var debugMode = false;
var arrLang = 
{
	'en-US':{
//var text = (userLang ==='vi-VN')?{
	game_question:"WHICH TEAM IS THIS?",
	point_txt:"POINTS",
	score_txt:'SCORE',
	time_txt:'TIME',
	click_to_open:'CLICK TO OPEN',
	show_answer_txt:'SHOW ANSWER',
	choose_answer_here_txt:'CHOOSE ANSWER HERE',
	show_club:{txt:'Show Club',name:'Name'},
	stage_txt:'Stage',
	welcome_txt:'Welcome',
	start_txt:'START',
	see_squad_txt:'See Squad',
	end_game_txt:"End Game",
	see_answer_txt:"See Answer",
	continue_txt:"Continue",
	next_txt:"Next",
	rank_txt:'RANK',
	score_txt:'SCORE',
	leaderboard_txt:'LEADERBOARD',
	wrong_answer:"NO NO NO!",
	time_up_txt:"TIME'S UP",
	correct_answer:"CORRECT!",
	play_again_txt:"PLAY AGAIN",
	how_to_play_txt:"HOW TO PLAY",
	share_txt:"SHARE",
	language_txt:"LANGUAGE",
	play_now_txt:"PLAY NOW"
},
	'vi-VN':{
	game_question:"ĐOÁN TÊN TUYỂN QUỐC GIA",
	point_txt:"Điểm",
	score_txt:'Tổng',
	time_txt:'TG',
	click_to_open:'Lật xem CLB',
	show_answer_txt:'Xem Đáp Án',
	choose_answer_here_txt:'Chọn Kết Quả',
	show_club:{txt:'Xem tên CLB',name:''},
	stage_txt:'Vòng',
	welcome_txt:'Xin Chào',
	start_txt:'BẮT ĐẦU',
	see_squad_txt:'Xem Thêm',
	end_game_txt:"Kết Thúc",
	see_answer_txt:"Xem Kết Quả",
	continue_txt:"Chơi Tiếp",
	next_txt:"Tiếp",
	rank_txt:'Thứ Hạng',
	score_txt:'Tổng Điểm',
	leaderboard_txt:'BẢNG XẾP HẠNG',
	wrong_answer:"NO NO NO!",
	time_up_txt:"Hết Giờ!",
	correct_answer:"CHUẨN RỒI",
	play_again_txt:"CHƠI LẠI",
	how_to_play_txt:"HƯỚNG DẪN",
	share_txt:"CHIA SẺ",
	language_txt:"Ngôn Ngữ",
	play_now_txt:"CHƠI"
}};
var userLang = 'en-US';
var text = arrLang[userLang];//default
function setLanguage(){
	//console.log("Language: "+userLang);
	if(userLang)
		text = arrLang[userLang];
}



//user name to display
var USER_NAME = "Anonymous";
//keep the ID for later use
var USER_ID = Math.floor(Math.random()*10);

var user = {name:USER_NAME,id:USER_ID,score:0,time:0,count:0};

//please give me the user_name and user_id from your website
	//otherwise it will be default.

function getUserInfo(){

	var token = getQueryVariable('access_token');
	var user_id = getQueryVariable('user_id');
	userLang = getQueryVariable('lang');
	//console.log(userLang);
	setLanguage();
	//var base_url = "http://code.ttab.me:51167";
	var base_url = "https://api.ttab.me";

	//console.log(token);
	if(!token)
		window.location = 'https://footballx.live/sign_in';
	// "/v2/xuser/2375/refesh"
	var settings = {
	  "async": true,
	  "crossDomain": true,
	  "url": `${base_url}/v2/xuser/${user_id}/refesh`,
	  "method": "GET",
	  "headers": {
	    "Authorization": `Bearer ${token}`,
	    "Cache-Control": "no-cache",
	    "Postman-Token": "2510b186-a5c7-46cc-a551-a8008c30b598"
	  }
	}

	$.ajax(settings).done(function (response) {
	  user.id = response.user.id;
	  user.name = response.user.nickname;

	  if(response.user.username){
	  	user.name = response.user.username;
	  }
	});

}


function openLinkToSquad(team_id){
	var base_url = 'https://footballx.live/t/';
	window.open(base_url+team_id);
}


//work with the leaderboard here.










var loaded_score_data = [];


//var myFBref = new Firebase("https://footballxgame.firebaseio.com/");
var myFBref = new Firebase("https://nationalteam-6115099.firebaseio.com/");

function loadLeaderboard(){
	//give me the leaderboard data
	//structure of JSON file: [{name:string,score:integer,time:integer}]

	var ref = myFBref.ref();
	ref.on('value',gotData,errData);
	function gotData(data){
		loaded_score_data = [];
		if(data.val()){
			Object.assign(loaded_score_data,data.val());
			promptScenes["Leaderboard"].loadScore();
		}
		getUserInfo();
	}
	function errData(err){
		console.log("Error!");
		console.log(err);
	}
}
//clear data on firebase:))))))
//myFBref.set({});

function sendScore(){
	//var userScoreToSend = {name:USER_NAME,id:USER_ID,score:score._score,time:score._playtime};
	//send this score to somewhere please.
	myFBref.set(loaded_score_data);
	//ignore this line
	//console.log("Sent Player Score");
	//console.log(loaded_score_data);
}
















//data is here...... :V :V :V
var gamedata;
function loadGameAssetsFromServer(){
	loadJSON('gamedata.json',function(data){
		getUserInfo();
		gamedata = JSON.parse(data);
		//console.log(gamedata);
		main();
	});
}
loadGameAssetsFromServer();








//////////////////////////////////////////THAT'S IT/////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////



//adjust these variables asap please
var TEXT_COLOR = '#fdd17d';
var TEXT_COLOR2 = '#8d5f36';
var CLEAR_COLOR = '#000';
var FONT_SIZE_FOR_TIP_BAR = 35;


var cvsBg = document.getElementById("canvasBg");
var ctxBg = cvsBg.getContext("2d");

var cvs = document.getElementById("canvas");
var ctx = cvs.getContext("2d");

var WIDTH = 1587;
var HEIGHT = 1379;
var CANVAS_WIDTH = 0;
var CANVAS_HEIGHT = 0;

var currentState;
var states = {Splash:0,Level:1, Hint:2,Game: 3,NextLevel:4, Score:5,Prompt:6,Progress:7};
var firstTime = true;
var images = {};

var totalResources = 18;
var numResourcesLoaded = 0;

var frame = 0;
function pointInRect(px, py, rx, ry, rw, rh){

	return (px>rx-rw/2&&px<rx+rw/2&&py>ry-rh/2&&py<ry+rh/2);}
var mX, mY;
var timeAddingAmount = 10;
var NUMBER_OF_POS = 11;
var ZERO_NINE = 0.7;
var SCORE_TO_VIEW_CLUB_LOGO = 10;
var SCORE_TO_VIEW_CLUB_NAME = 5;
var SCORE_TO_VIEW_ANSWER = 25;
var CLUB_LOGO_SIZE = 170;
var scoreOfThisMatch = 0;
var level = 1;
var MaxLevel = 20;

//number of cards available for choosing on answer bar in each level
var CARD_NUM = 7;

//KEEP 20 teams for 20
var teams = {
	_teams:[],
	breadth:0,
	level:1,
	breadthLimit:10,
	difficultLevelSource:{},
	getDifficultLevel:function(level){
		if(level<4){//difficult level 1
			return this.difficultLevelSource.l1;
		}else if(level<7){
			return this.difficultLevelSource.l2;
		}else{
			return this.difficultLevelSource.l3;
		}
		return false;
	},
	load:function(JSONteams){
		//select 20 teams to play for one load time
		this._teams = [];
		var allTeams = [];

		Object.assign(allTeams,JSONteams);
		MaxLevel = Math.min(allTeams.length,10);


		let findTeamIndex = function(name){
			for(var i = 0; i<allTeams.length; i++)
				if(allTeams[i].name===name)
					return i;
		}
		this.difficultLevelSource = {
               l1:["England","France","Germany","Brazil","Argentina","Spain","Belgium","Portugal"],

               l2:["Poland","Uruguay","Mexico","Australia","Iceland","Denmark","Colombia","Serbia","Sweden","Croatia","Russia","South Korea","Japan"],

               l3:["Nigeria","Switzerland","Costa Rica","Panama","Tunisia","Saudi Arabia","Egypt","Senegal","Morocco","Iran","Peru"]
           };
        var difficultLevels = {l1:[],l2:[],l3:[]};


        Object.assign(difficultLevels.l1,this.difficultLevelSource.l1);
        Object.assign(difficultLevels.l2,this.difficultLevelSource.l2);
        Object.assign(difficultLevels.l3,this.difficultLevelSource.l3);
    /*
        
        }
		var difficultLevels = {
				l1:["England","France","Germany","Brazil","Argentina","Spain","Belgium","Russia","Saudi Arabia","South Korea","Japan","Portugal"],

				l2:["Egypt","Senegal","Morocco","Uruguay","Iran","Mexico","Australia","Iceland","Peru","Denmark"],

				l3:["Croatia","Nigeria","Switzerland","Costa Rica","Poland","Panama","Tunisia","Colombia","Serbia","Sweden"]
			};
	*/
		for(var i = 0; i<MaxLevel; i++){

			//generate unique number for one team

			//choose the teams by generate the index.
			var uniqueIndex;// = Math.floor(Math.random()*allTeams.length);
			if(i<4){//difficult level 1
				var indexInDL = Math.floor(Math.random()*difficultLevels.l1.length);
				uniqueIndex = findTeamIndex(difficultLevels.l1[indexInDL]);
				difficultLevels.l1.splice(indexInDL,1);
			}else if(i<7){
				var indexInDL = Math.floor(Math.random()*difficultLevels.l2.length);
				uniqueIndex = findTeamIndex(difficultLevels.l2[indexInDL]);
				difficultLevels.l2.splice(indexInDL,1);			
			}else{
				var indexInDL = Math.floor(Math.random()*difficultLevels.l3.length);
				uniqueIndex = findTeamIndex(difficultLevels.l3[indexInDL]);
				difficultLevels.l3.splice(indexInDL,1);
			}

			//console.log(i);
			//console.log(allTeams[uniqueIndex].name);






			var formation={gk:[],df:[],mf:[],sk:[]};

			for(var j = 0; j<allTeams[uniqueIndex].formation.gk.length; j++)
				formation.gk.push(allTeams[uniqueIndex].formation.gk[j]);
			for(var j = 0; j<allTeams[uniqueIndex].formation.df.length; j++)
				formation.df.push(allTeams[uniqueIndex].formation.df[j]);
			for(var j = 0; j<allTeams[uniqueIndex].formation.mf.length; j++)
				formation.mf.push(allTeams[uniqueIndex].formation.mf[j]);
			for(var j = 0; j<allTeams[uniqueIndex].formation.sk.length; j++)
				formation.sk.push(allTeams[uniqueIndex].formation.sk[j]);
			//Object.assign(formation,);

			var ps = [];
			//1 goalkeeper
			var gkIndex = Math.floor(Math.random()*formation.gk.length);
			ps.push(formation.gk[gkIndex]);

			//4 defenders
			for(var j = 0; j<4; j++){
				var dfIndex = Math.floor(Math.random()*formation.df.length);
				ps.push(formation.df[dfIndex]);
				formation.df.splice(dfIndex,1);
			}
			//4 midfielders
			for(var j = 0; j<4; j++){
				var mfIndex = Math.floor(Math.random()*formation.mf.length);
				ps.push(formation.mf[mfIndex]);
				formation.mf.splice(mfIndex,1);
			}

			//2 stickers
			for(var j = 0; j<2; j++){
				var skIndex = Math.floor(Math.random()*formation.sk.length);
				ps.push(formation.sk[skIndex]);
				formation.sk.splice(skIndex,1);
			}

			this._teams.push({
				name:allTeams[uniqueIndex].name,
				positions:ps,
				id:allTeams[uniqueIndex].id
			});

			allTeams.splice(uniqueIndex,1);
		}		
	},
	update:function(){
		this.breadth = this.breadthLimit*Math.cos(3*frame*3.141592/180.0);		
	},
	draw:function(position,x,y){
		//drawImage(this._teams[this.level-1].positions[position].club,x,y,100,200);
		//if(position>NUMBER_OF_POS)
			//console.log("One team has 11 players only, dude.");
		//drawText(this._teams[this.level-1].positions[position],x,y,'rgba(0,0,0)',50+this.breadth);
		//drawImage(this._teams[this.level-1].positions[position],x,y,);
		var img = this._teams[level].positions[position];
		var h = CLUB_LOGO_SIZE;
		//console.log(img + " " + position);
		ctx.shadowColor = '#fff';
		ctx.shadowBlur = 50;
		if(images[img]){
			var w = h*(images[img].width/images[img].height);
			drawImage(img,x,y-h/4,w+this.breadth,h+this.breadth);
		}
		ctx.shadowBlur = 0;
	}
};


function Clicktoflip(index,text,size=FONT_SIZE_FOR_TIP_BAR){
	this.size = size;
	this.text = text;
	this._id = index;
	this.posX = 0;
	this.posY = 0;
	this.pivotX = 0;
	this.pivotY = 0;
	this.image = 'TipBar';
	this.b = 0;
	this.a = 0;
	this.showup = true;
	this.setPos = function(x,y,b,a){
		this.pivotX = x;
		this.pivotY = y;
		this.b = b;
		this.a = a;
	}
	this.update = function(){
		if(this.showup){
			this.posX = this.pivotX;
			this.posY = this.pivotY - this.a*images[this.image].height/2;
		}
	}
	this.draw = function(){
		if(this.showup){
			ctx.globalAlpha = this.a;
			drawImage(this.image,this.posX, this.posY,images[this.image].width*this.a +this.b*0.2,images[this.image].height*this.a+this.b*0.2);

			drawText(this.text,this.posX+8, this.posY,TEXT_COLOR2,this.size*this.a);

			ctx.globalAlpha = 1;
		}
	}
}


var hiddenpositions={
	positions:[],
	ps:[
		[815,826],[678,686],[50+WIDTH-678,686],
		[416,587],[50+WIDTH-416,587],[676,467],
		[50+WIDTH-676,467],[470,373],
		[50+WIDTH-470,373],[675,266],
		[50+WIDTH-675,266],
		],
	breadth:0,
	breadthLimit:10,
	numberOpened:0,
	hintPos:[],
	clicktoflips:[],
	hintNum:2,
	hintCount:20,
	tipCount:20,
	init:function(){
		this.breadth = 0;
		this.numberOpened = 0;
		this.positions = [];
		this.tipCount = 20;
		this.hintCount=20;
		this.hintPos = [];
		this.hintNum = (level<5?2:1);
		this.breadthLimit=10;
		this.lastOpenIndices = [];
		this.seeClubNameButton=new Button2('ShowAnswerButton',1440,360);
		this.seeClubNameButton.theta = 0.75;
		for(var i = 0; i<this.hintNum; i++){
			var randPos;
			var valid = false;
			while(!valid){
				randPos = Math.floor((Math.random()*NUMBER_OF_POS));
				valid = true;
				for(var j = 0; j<i; j++)
					if(randPos===this.hintPos[j])
						valid = false;
			}

			this.hintPos[i] = randPos;
		}


		for(var i = 0; i<this.ps.length; i++){
			var h = false;
			for(var j = 0; j<this.hintPos.length; j++)
				if(i === this.hintPos[j]){
					if(level===0){
						this.clicktoflips.push(new Clicktoflip(i,text.click_to_open));
					}
					h = true;
				}


			this.positions.push({
				x:this.ps[i][0],
				y:this.ps[i][1],
				width:108,
				height:108,
				_mouseover:false,
				opened:false,
				isHint:h,
				showClubName:false
			});}
		if(level===0)
			this.clicktoflips.push(new Clicktoflip(-1,text.choose_answer_here_txt,FONT_SIZE_FOR_TIP_BAR*0.7));

	},
	update:function(){
		this.breadth = this.breadthLimit*Math.cos(3*frame*3.141592/180.0);


		for(var i = 0; i<this.clicktoflips.length; i++){

			if(this.clicktoflips[i]._id===-1){
				this.clicktoflips[i].setPos(WIDTH/2,1082-this.breadth,this.breadth,(80-this.tipCount)/50);
			}else
				this.clicktoflips[i].setPos(this.positions[this.clicktoflips[i]._id].x,this.positions[this.clicktoflips[i]._id].y-this.breadth - 50,this.breadth,(50-this.tipCount)/50);

			this.clicktoflips[i].update();
		}

		this.seeClubNameButton.update();

		if(this.seeClubNameButton.isTriggered()){
			if(scoreOfThisMatch>0){
				if(this.lastOpenIndices.length>0){
					scoreOfThisMatch-=SCORE_TO_VIEW_CLUB_NAME;
					varprizedScores.put(this.seeClubNameButton.x,this.seeClubNameButton.y-100,-SCORE_TO_VIEW_CLUB_NAME);
					this.positions[this.lastOpenIndices[this.lastOpenIndices.length-1]].showClubName = true;
					this.lastOpenIndices.pop();
					sounds["Button"].play();
				}
			}else{
				score.color = '#e00';
			}
		}else{
				score.color = TEXT_COLOR;			
		}
		if(scoreOfThisMatch<=0||this.lastOpenIndices.length<=0)
			this.seeClubNameButton.disable();
		else
			this.seeClubNameButton.enable();
		if(this.hintCount>0)
			this.hintCount--;
		if(level>0){
			for(var i = 0; i<this.hintPos.length;i++){
				if(this.hintCount>0){
					break;
				}
				else{
					this.autoopen(this.hintPos[i]);
					this.hintPos.splice(i,1);
					this.hintCount = 45	;
					break;
				}
			}
		}
	},
	draw:function(){
		ctx.shadowColor = '#fff';


		for(var i = this.positions.length-1; i>=0;i--){
			if(!this.positions[i].opened){


				var imageName = 'HiddenPosition';
				var image_bright = "HiddenPosition_bright";
				var breadthOffset = this.breadth;
				if(this.positions[i].isHint){
					imageName = 'HiddenPosition_bright';
					image_bright = 'HiddenPosition_bright';
				}
				else if(currentState === states.Hint){
					breadthOffset = 0;
				}

				if(this.positions[i]._mouseover){

					ctx.shadowBlur = 100;
					drawImage(image_bright,this.positions[i].x,this.positions[i].y,
					this.positions[i].width+this.breadthLimit*1.5,this.positions[i].height+this.breadthLimit*1.5,false,true);
					ctx.shadowBlur = 0;

				}else{
					if(this.positions[i].isHint)
						ctx.shadowBlur = 100;
					drawImage(imageName,this.positions[i].x,this.positions[i].y,
					this.positions[i].width+breadthOffset,this.positions[i].height+breadthOffset
					,false,true);
					ctx.shadowBlur = 0;
				}
			}else{
				teams.draw(i,this.positions[i].x,this.positions[i].y);
				if(this.positions[i].showClubName){
					ctx.shadowColor ='#000';
					ctx.shadowBlur=10;
					drawText(teams._teams[level].positions[i],this.positions[i].x,this.positions[i].y+80,'#fff',35);
					ctx.shadowBlur=0;
				}
			}
		}
		for(var i = 0; i<this.clicktoflips.length; i++)
			this.clicktoflips[i].draw();			

		if(this.tipCount>0&&currentState===states.Hint){
			this.tipCount--;
		}
	},
	mouseover:function(x,y){
		for(var i = 0; i<this.positions.length;i++){
			this.positions[i]._mouseover=(pointInRect(x,y,this.positions[i].x,this.positions[i].y,
				this.positions[i].width+this.breadth,this.positions[i].height+this.breadth));
		}

	},
	autoopen:function(index=-1){
		if(index<0){
			do{
				index = Math.floor((Math.random()*NUMBER_OF_POS));
			}while(this.positions[index].opened)
		}
		this.positions[index].opened=true;
		this.numberOpened++;
		if(currentState===states.Game){
			scoreOfThisMatch-=(this.numberOpened===this.positions.length&&level>5)?(SCORE_TO_VIEW_CLUB_LOGO/2):SCORE_TO_VIEW_CLUB_LOGO;
			varprizedScores.put(this.positions[index].x,this.positions[index].y);
		}
		sounds['CoinFlip'].play();
		this.lastOpenIndices.push(index);
	},
	open:function(x,y){

		if((currentState===states.Game||level<1)&&scoreOfThisMatch>=SCORE_TO_VIEW_CLUB_LOGO)
		for(var i = 0; i<this.positions.length;i++){
			if(!this.positions[i].opened)
			if(pointInRect(x,y,this.positions[i].x,this.positions[i].y,
				this.positions[i].width+this.breadth,this.positions[i].height+this.breadth)){
					sounds['CoinFlip'].play();
					if(currentState === states.Hint){//open the hints
						if(this.positions[i].isHint){
							this.positions[i].opened=true;
							this.numberOpened++;
							this.lastOpenIndices.push(i);


							for(var j  = 0; j<this.clicktoflips.length;j++)
								if(this.clicktoflips[j]._id === i){
									this.clicktoflips.splice(j,1);
									//console.log(this.clicktoflips.length);
								}
						}
					}
					else{//open the normal positions
						//score is minused after each flipping
						this.autoopen(i);
						return true;//this is the trigger for the timer
					}
				}
		}
		return false;

	},
	hint:function(){
		if(this.numberOpened===this.hintNum&&this.hintCount===0){
			this.clicktoflips.splice(0,1);
			currentState = states.Game;
			displayLevel.show(text.start_txt,35);
			clock.start();
		}
	}
};

var clock = {
	min:0,
	sec:30,
	count:30,
	trigger:false,
	lastTime:0,
	currentTime:0,
	deltaTime:0,
	beep:false,

	countFirst:30,
	firstTime:false,
	init:function(count = 30){
		this.countFirst = 30;
		this.count = count;
		this.sec = Math.floor(this.count/1);
		this.min = Math.floor(this.sec/60);
		this.sec %= 60;
		this.min %= 60; 
		this.trigger = false;
		this.beep = false;
	},
	countdown:function(){
		this.currentTime = new Date();
		this.deltaTime += (this.currentTime - this.lastTime);
		this.lastTime = this.currentTime;

		if(this.deltaTime>1000){
			if(this.count<=10){//play sound here
				this.beep = true;;
			}
			this.count--;
			this.deltaTime = 0;
			score._playtime++;
		}

		if(this.count === 0)
			this.trigger = false;
		this.sec = Math.floor(this.count/1);
		this.min = Math.floor(this.sec/60);
		this.sec %= 60;
		this.min %= 60; 
	},
	start:function(){
		this.trigger = true;
		this.lastTime = new Date();
		this.firstTime = (this.count===30);
	},
	update(){
		if(this.trigger){
			this.countdown();
			if(this.firstTime){
				if(this.countFirst>0){
					this.beep = true;
					this.countFirst--;
				}
				else{
					this.firstTime = false;
					this.beep = false;
				}
			}
		}
	},
	draw(){
		var x = 1059, y = 998, w = 75;
		var rythm = 0;
		ctx.fillStyle = '#fff';
		var color = {r:253,g:209,b:125};
		if(this.beep){
			rythm = Math.cos(this.deltaTime*0.5*3.141592/180.0);
			color.r = 255;
			color.g = 94*rythm;
			color.b = 14*rythm;
		}
		var delta = this.firstTime?rythm*2:rythm*8;

		//ctx.fillRect(x-delta/2,y-w/2-delta/2,w*5+delta,w+delta);
		var bx = x-delta/2,by=y-w/2-delta/2,bw=w*5+delta,bh=w+delta;
		var a = 7;
		drawRectWithHole(bx,by,bw,bh,bx+a,by+a,bw-2*a,bh-2*a,'#fff',1);

		drawImage('ClockIcon',x,y,100+delta,100+delta);
		drawText(text.time_txt+': '+((this.min<10?"0":"")+this.min)+":"+((this.sec<10?"0":"")+this.sec),x+200,y+12,'rgb('+color.r+','+color.g+','+color.b+')',40+delta*0.5);
	}
};

var score = {
	_score:0,
	_playtime:0,
	addingCount:20,
	amountToAdd:0,
	count:0,
	delta:0,
	x:197, y:998, w:75,
	chasingScore:0,
	color:TEXT_COLOR,
	drawScoreOfThisMatch:function(){
		if(Math.abs(scoreOfThisMatch-this.chasingScore)>0.005)
			this.chasingScore+=(scoreOfThisMatch-this.chasingScore)*0.2;
		var a = Math.floor(this.chasingScore);
		ctx.shadowColor = '#000';
		ctx.shadowBlur = 50;
		drawText(text.point_txt,1444,210,TEXT_COLOR,40);
		drawText(a+(a===99?1:0),1444,168,this.color,120);
		ctx.shadowBlur = 0;
	},
	init:function(){
		this.addingCount = 30;
	},
	add:function(amount){
		this.amountToAdd = amount;
		this.addingCount = 30;
	},
	added:function(){
		return (this.amountToAdd===0);
	},
	update:function(){
		var sign = 1;
		if(this.amountToAdd<0) sign = -1;

		if(this.amountToAdd != 0){
			this.amountToAdd-=sign;
			this._score+=sign;
			this.count++;
		}
		if(this.count===10){
			this.count = 0;
			varprizedScores.put(this.x, this.y,this.amountToAdd>=0?'+10':'-10');
		}
		var rythm = 0;
		if(this.amountToAdd !=0){
			rythm = Math.cos(frame*45*3.141592/180.0);
		}
		this.delta = rythm*10;

	},draw:function(){
		ctx.fillStyle = '#fff';
		var bx = this.x-this.delta/2,by=this.y-this.w/2-this.delta/2,
			bw = this.w*5+this.delta,bh=this.w+this.delta;
		var a = 7;
		drawRectWithHole(bx,by,bw,bh,bx+a,by+a,bw-2*a,bh-2*a,'#fff',1);

		drawImage('ScoreIcon',this.x-this.delta/2,this.y-this.delta/2,100+this.delta,100+this.delta);
		drawText(text.score_txt+': '+this._score,this.x+200,this.y+12,TEXT_COLOR,40+this.delta*0.5);
	}
};



function VaporizedScore(x, y, amount = '-10'){
	this.x = x;
	this.y = y;
	this.amount = amount;
	this.maxVel = 10;
	this.velY = this.maxVel;
	this.alpha = 1;
	this.update = function(){
		if(this.velY>0){
			this.velY -= 0.5;
			this.y-=this.velY;
		}else this.velY = 0;
		this.alpha = this.velY/this.maxVel;
	}
	this.draw = function(){
		drawText(this.amount,this.x,this.y,'rgba(255,255,255,'+this.alpha+')',100-this.alpha*20);
	}
}





var varprizedScores = {
	container:[],
	put:function(x,y,a='-10'){
		this.container.push(new VaporizedScore(x,y,a));
	},
	update:function(){
		for(var i = 0; i<this.container.length; i++){
			this.container[i].update();
			if(this.container[i].velY===0){
				this.container.splice(i,1);
			}
		}
	},
	draw:function(){
		for(var i = 0; i<this.container.length; i++)
			this.container[i].draw();
	}
};






function Button(image,x,y,flip=false,breadthEnabled=false){
	this.states = {NORMAL:0,HOVER:1,CLICK:2};
	this.x = x, this.y = y;
	this.scale = 1;
	this.scaleTarget = 1;
	this.image = image;
	this.state = this.states.NORMAL;
	this.trigger = false;
	this.w = 100,
	this.h = 100,
	this.flip = flip;
	this.breadthEnabled = breadthEnabled;
	this.breadth = 0;
	this.breadthLimit = 10;
	this.disabled = false;
}
Button.prototype.disable = function(){
	this.disabled = true;
}
Button.prototype.enable = function(){
	this.disabled = false;
}

Button.prototype.isTriggered = function(){
	if(!this.disabled)
	if(this.trigger){
		this.trigger = false;
		if(currentState!=states.Game)
			sounds["Button"].play();
		return true;
	}
}
Button.prototype.press = function(x,y){
	if(!this.disabled){

		if(this.state === this.states.HOVER)
			this.state = this.states.CLICK;
		else if(pointInRect(x,y,this.x, this.y, this.w*this.scale,this.h*this.scale))
			this.state = this.states.CLICK;
	}
}
Button.prototype.release = function(){
	if(!this.disabled){
	if(this.state === this.states.CLICK)
		this.trigger = true;
		this.state = this.states.NORMAL;
	}
}
Button.prototype.hover = function(x,y){
	if(!this.disabled){
		if(pointInRect(x,y,this.x, this.y, this.w*this.scale,this.h*this.scale)){
			if(this.state === this.states.NORMAL){
				this.state = this.states.HOVER;
				return true;
			}
		}else
			this.state = this.states.NORMAL;
	}
	return false;
}
Button.prototype.update = function(){
	if(!this.disabled){
	if(this.breadthEnabled)
			this.breadth = this.breadthLimit*Math.cos(3*frame*3.141592/180.0);

	if(this.state === this.states.HOVER)
		this.scaleTarget = 1.1;
	else if(this.state === this.states.CLICK)
		this.scaleTarget = 0.95;
	else this.scaleTarget = 1;
	if(Math.abs(this.scaleTarget-this.scale)>0.00005){
		this.scale+=(this.scaleTarget-this.scale)*0.1;
	}
	}
}

Button.prototype.draw = function(){
	if(this.disabled)
		ctx.globalAlpha = 0.5;
	else
		ctx.globalAlpha = 1;
	this.w = images[this.image].width;
	this.h = images[this.image].height;
		ctx.shadowColor = '#000';
		ctx.shadowBlur = 50;
	drawImage(this.image,this.x, this.y,this.w*this.scale+this.breadth,
		this.h*this.scale+this.breadth,this.flip);
		ctx.shadowBlur = 0;
	ctx.globalAlpha = 1;
}










function Button2(image, x,y, flip,txt = ""){
	Button.call(this,image, x,y,flip);
	this.MaxBlur = 100;
	this.targetBlur = 0;
	this.txt = txt;
	this.theta=1;
}
Button2.prototype = Object.create(Button.prototype);
Button2.prototype.constructor = Button2;
Button2.prototype.hover = function(x,y){
	if(!this.disabled){
		if(Button.prototype.hover.call(this,x,y)){
			this.targetBlur = this.MaxBlur;
			return true;
		}
		else
			this.targetBlur = 0;
	}
	return false;
}

Button2.prototype.draw = function(){
	if(this.disabled)
		ctx.globalAlpha = 0.5;
	else
		ctx.globalAlpha = 1;
	ctx.shadowColor = '#87c3f3';
	ctx.shadowBlur = this.MaxBlur*(this.scale-1)*5;

	this.w = images[this.image].width*this.theta;
	this.h = images[this.image].height*this.theta;

	drawImage(this.image,this.x, this.y-10,this.w,
		this.h,this.flip);
	drawText(this.txt,this.x+10, this.y+this.h/2+20,'#000',50);
	ctx.shadowBlur = 0;
	ctx.globalAlpha = 1;
}







function Card(name){
	Button.call(this,name,785,142);
	this.name = name;
	this.w = WIDTH/7-10;
	this.h = 275;
	this.targetX = 0;
	this.targetY = 0;
	this.isAnswer = false;
	this.idInCardPool = 0;
	this.MaxBlur = 50;
	this.targetBlur = 0;
	this.velX = 0;
	this.deltaY = 0;
}
Card.prototype = Object.create(Button.prototype);
Card.prototype.constructor = Card;


//Card method can override
Card.prototype.update=function(){
	Button.prototype.update.call(this);
	this.velX = (this.targetX-this.x)*0.125;
	this.x+=this.velX;
	this.y+=(this.targetY+this.deltaY-this.y)*0.45;
	if(this.state === this.states.HOVER)
		this.deltaY = -50;
	else
		this.deltaY = 0;
}
Card.prototype.moveTo = function(x,y){
	this.targetX = x;
	this.targetY = y;
}
Card.prototype.draw = function(originX,originY){


	ctx.globalAlpha = 0.5;
	ctx.fillStyle = '#aaaaaa';
	ctx.fillRect(originX+this.x - (this.w/2)*this.scale,originY+this.y-(this.h/2)*this.scale,
				 this.w*this.scale,this.h*this.scale);
	ctx.globalAlpha = 1;

	drawImage(this.name,originX+this.x,originY+this.y-30,
				 (190)*this.scale,(190)*this.scale);
	var size = this.name.length<11?50:40;
	drawText(this.name,this.x+originX, originY+this.y+110*this.scale,'#012153',size*this.scale);
}


var answerBar = {
	x:10,y:1084,w:1565,h:282,
	logo:[],
	leftmostCard:0,
	buttons:[],
	cards:[],//30
	cardPool:[],
	displayPos:[],
	standoutPos:[{x:785-500,y:HEIGHT+275},{x:785+500,y:HEIGHT+275}],
	wheelDelta:0,
	countwheelUp:0,
	countwheelDown:0,
	init:function(){
		//reset all the arrays
		if(this.cards.length>0)
			delete this.cards;
		if(this.cardPool.length>0)
			delete this.cardPool;
		if(this.displayPos.length>0)
			delete this.displayPos;
		if(this.buttons.length>0)
			delete this.buttons;
		if(this.logo.length>0)
			delete this.logo;

		this.cards = [];
		this.cardPool = [];
		this.displayPos = [];
		this.buttons = [];
		this.logo = [];

		var a = 785,b=142;
		var offset = WIDTH/7-2;
		this.displayPos.push({x:a-offset*3,	y:b});
		this.displayPos.push({x:a-offset*2,	y:b});
		this.displayPos.push({x:a-offset,	y:b});
		this.displayPos.push({x:a,	y:b});
		this.displayPos.push({x:a+offset,	y:b});
		this.displayPos.push({x:a+offset*2,	y:b});
		this.displayPos.push({x:a+offset*3,	y:b});

		//this.buttons.push(new Button('TriangleButton',this.x+74,this.y+142));
		//this.buttons.push(new Button('TriangleButton',this.x+1490,this.y+142,true));

		//load the json data for the team name
		for(var i = 0; i<gamedata.clubs.length; i++){
			if(gamedata.clubs[i].type===1)
				this.cardPool.push(new Card(gamedata.clubs[i].name));
		}
		//console.log(this.cardPool);
		this.selectSeven();

		//choose 10 remaining team from the pool
	},
	selectSeven:function(){

		if(this.cards.length>0)
			delete this.cards;
		this.cards = [];

		//select 9 abitrary cards remaining in cardpool
		var answerIndex = 0;
		//console.log(this.cardPool);
		for(var i = 0; i<this.cardPool.length; i++){
			//update id of each card
			this.cardPool[i].idInCardPool = i;
			if(this.cardPool[i].name === teams._teams[level].name){//
				this.cardPool[i].isAnswer = true;
				answerIndex = i;
			}
		}

		var whereToInsertTheAnswer = Math.floor(Math.random()*(CARD_NUM-1));
		var difficult = teams.getDifficultLevel(level);
		//console.log(difficult);	
		for(var i = 0; i<CARD_NUM-1; i++){

			var uniqueIndex = 0;
			var found = false;
			while(!found){
				found = true;

				var a = Math.floor(Math.random()*difficult.length);
				for(var j = 0; j<this.cardPool.length;j++)
					if(this.cardPool[j].name===difficult[a]){
						uniqueIndex = j;
						break;
					}

				//uniqueIndex = Math.floor(Math.random()*this.cardPool.length);
				//console.log(uniqueIndex+" " +answerIndex);
				if(answerIndex === uniqueIndex){
					found = false;
					continue;
				}
				for(var j = 0; j<this.cards.length; j++)
					if(this.cards[j].idInCardPool === uniqueIndex)
						found = false;
			}

			this.cards.push(this.cardPool[uniqueIndex]);

			if(i === whereToInsertTheAnswer)
				this.cards.push(this.cardPool[answerIndex]);
		}
		//console.log("cardPool "+this.cardPool.length+" "+gamedata.clubs.length);
		this.rearange();
	},
	rearange:function(){
		for(var i = 0; i<this.cards.length;i++){
			if(i>=this.leftmostCard&&i<this.leftmostCard+this.displayPos.length){
				this.cards[i].moveTo(this.displayPos[i-this.leftmostCard].x,this.displayPos[i-this.leftmostCard].y);
			}else if(i<this.leftmostCard){
				this.cards[i].moveTo(this.standoutPos[0].x,this.standoutPos[0].y);				
			}else{
				this.cards[i].moveTo(this.standoutPos[1].x,this.cards[i].y + this.standoutPos[1].y);
			}
		}
	}
	,
	onpress:function(x,y){
		//for(var i = 0; i<this.buttons.length;i++)
		//	this.buttons[i].press(x,y);
		if(currentState === states.Game)
		for(var i = 0; i<this.cards.length;i++){
			if(i>=this.leftmostCard&&i<this.leftmostCard+this.displayPos.length)
				this.cards[i].press(x-this.x,y-this.y);
		}
	},
	onmousemove:function(x,y){
		//for(var i = 0; i<this.buttons.length;i++)
		//	this.buttons[i].hover(x,y);
		for(var i = 0; i<this.cards.length;i++){
			if(i>=this.leftmostCard&&i<this.leftmostCard+this.displayPos.length)
				this.cards[i].hover(x-this.x,y-this.y);
		}
	},
	onrelease:function(){
		//for(var i = 0; i<this.buttons.length;i++)
		//	this.buttons[i].release();
		for(var i = 0; i<this.cards.length;i++){
			if(i>=this.leftmostCard&&i<this.leftmostCard+this.displayPos.length)
				this.cards[i].release();
		}
	},
	onwheel:function(delta){
		this.wheelDelta = delta;
	},
	update:function(){
		//for(var i = 0; i<this.buttons.length;i++)
		//	this.buttons[i].update();

		var maxCardHorizontalSpeed = 0;
		for(var i = 0; i<this.cards.length;i++){
			this.cards[i].update();
			var s = Math.abs(this.cards[i].velX);
			if(s>maxCardHorizontalSpeed)
				maxCardHorizontalSpeed = s;
			if(this.cards[i].isTriggered()){
				//answer is selected
				var selectedCard = this.cards[i].name;
				var answer = teams._teams[level].name;
				if(answer === selectedCard){
					//on correct answer

					//remove the cards
					//this.cardPool.splice(this.cards[i].idInCardPool,1);
					//this.cards.splice(i,1);


					nextLevel(reasons.Correct);
				}else{
					//wrong answer
					//find the card of answer of this team
					//remove the cards

					//since in the debug mode, many answer in the answer cards is identical
					//but they must be unique in the real game running
					/*	for(var j = 0; j<this.cards.length;j++)
							if(answer === this.cards[j].name){
								this.cardPool.splice(this.cards[j].idInCardPool,1);
								this.cards.splice(j,1);						
							}
					*/
					nextLevel(reasons.Wrong);
				}
				//end the level
				this.rearange();
			}
		}
		/*
		if(maxCardHorizontalSpeed<15){
			if(this.wheelDelta===1){
				if(this.leftmostCard>0){
					this.leftmostCard-=this.wheelDelta;
					this.rearange();
					this.wheelDelta = 0;
				}
			}	
			if(this.wheelDelta===-1){
				if(this.leftmostCard+this.displayPos.length<this.cards.length){
					this.leftmostCard-=this.wheelDelta;
					this.rearange();
					this.wheelDelta = 0;
				}
			}
			//if(this.leftmostCard===0)
			//	this.buttons[0].disable();
			//if(this.leftmostCard+this.displayPos.length===this.cards.length)
			//		this.buttons[1].disable();

			if(this.buttons[0].isTriggered()){//move to the left
				if(this.leftmostCard>0){
					this.leftmostCard--;
					this.rearange();
					this.buttons[1].enable();
				}
			}
			if(this.buttons[1].isTriggered()){//move to the right
				if(this.leftmostCard+this.displayPos.length<this.cards.length){
					this.leftmostCard++;
					this.rearange();
					this.buttons[0].enable();
				}
			}
		}*/
	},
	draw:function(){
		//ctx.fillStyle = '#ff0000';
		//ctx.fillRect(this.x,this.y,this.w,this.h);
		for(var i = 0; i<this.cards.length;i++)
			this.cards[i].draw(this.x,this.y);
	//	this.buttons[0].draw();
	//	this.buttons[1].draw();
	//	clicktoflip.draw();
	}
};
var displayLevel = {
	scale:0,
	vel:0.2,
	count:50,
	prevState:states.Level,
	txt:"",
	alpha:1,
	show:function(txt,count = 50){
		this.maxCount = count;
		this.alpha = 1,
		this.scale = 0;
		this.count = count;
		this.txt = txt;
		this.prevState = currentState;
		currentState = states.Level;
		sounds["MainMusic"].stop();
	},
	update:function(){
		if(this.count === 0){
			currentState = this.prevState;
		}else{
			if(this.scale < 2){
				this.scale += this.vel;
			}else{
				if(this.count<this.maxCount*0.2)
				this.alpha*=0.85;
			}
			this.count--;
		}
	},

	//WORLDCUP BRAIN, WORLDCUP knowledge
	//(TEST) YOUR's WORLDCUP IQ, 

	draw:function(){
		if(this.txt ==='Choose Your Answer Here'){
			drawCoverWithHole(100,100,100,100);
		}else{
			//var color = 'rgba(255,152,69,'+alpha+')';
			drawCover(this.alpha*ZERO_NINE*0.6);
			ctx.shadowColor = '#000';
			ctx.shadowBlur = 100;

			//draw what ever here
			ctx.globalAlpha = this.alpha;
			//ctx.fillStyle = '#112';
			//ctx.fillRect(200,200,WIDTH-400,HEIGHT-400);
			if(this.txt === text.stage_txt){
				drawText(this.txt,WIDTH/2,HEIGHT/2-100*this.scale,TEXT_COLOR,100*this.scale);
				drawText(level+1,WIDTH/2,HEIGHT/2+100*this.scale,TEXT_COLOR,200*this.scale);
			}else{
				drawText(this.txt,WIDTH/2,HEIGHT/2,TEXT_COLOR,100*this.scale);
			}
			ctx.globalAlpha = 1;
			ctx.shadowBlur = 0;
		}
	}
};

//scene with a button
function PromptScene(image,button = new Button2("OKButton",WIDTH/2+150,1220,false,text.continue_txt)){//1416,1220
	this.image = image;
	this.OKButtons = [];
	this.OKButtons.push(button);
	this.OKButtons.push(new Button2('ShowAnswerButton',WIDTH/2,1220,false,text.see_answer_txt));
	this.OKButtons.push(new Button2('EndGameButton',WIDTH/2-150,1220,false,text.end_game_txt));
	this.showup = false;

	this.offsetW = -500;
	this.offsetH = -140;

	this.count = 50;
	this._id = image;

	this.showAnswer = new Clicktoflip(0,text.show_answer_txt+' -'+SCORE_TO_VIEW_ANSWER,FONT_SIZE_FOR_TIP_BAR*0.8);
	//this.showAnswer.image = 'ShowAnswerBar';
	this.showAnswer.showup = true;

	this.seeSquadButton = new Button2('EmptyButton',WIDTH/2,HEIGHT/2+150);


	this.paid = false
	this.textDisplay = "NO NO NO!";
}
PromptScene.prototype.show = function(){
	this.showup = true;
	this.prevState = currentState;
	currentState = states.Prompt;

	this.showAnswer.showup = (score._score>=SCORE_TO_VIEW_ANSWER);

	this.paid = false
	this.offsetW = -500;
	this.offsetH = -140;
	this.count = 50;

 
	if(this._id === 'CorrectAnswer'||(this._id === 'WrongAnswer'&&!this.showAnswer.showup)){
		this.OKButtons[0].x = WIDTH/2+150;
		this.OKButtons[2].x = WIDTH/2-150;
	}else if(this._id === 'WrongAnswer'&&this.showAnswer.showup){
		this.OKButtons[0].x = WIDTH/2+250;
		this.OKButtons[2].x = WIDTH/2-250;		
	}
}
PromptScene.prototype.onpress = function(x,y){
	if(this.showup){
		for(var i = 0; i<this.OKButtons.length; i++)
			this.OKButtons[i].press(x,y);
		if(this.paid)
			this.seeSquadButton.press(x,y);
	}
}
PromptScene.prototype.onmousemove = function(x,y){
	if(this.showup){
		for(var i = 0; i<this.OKButtons.length; i++){
			if(i==1){
				if(this.showAnswer.showup)
				this.OKButtons[1].hover(x,y);
			}else
				this.OKButtons[i].hover(x,y);
		}

		if(this.paid)
			this.seeSquadButton.hover(x,y);
		
	}
}
PromptScene.prototype.onrelease = function(){
	if(this.showup){
		for(var i = 0; i<this.OKButtons.length; i++)
			this.OKButtons[i].release();
		if(this.paid)
			this.seeSquadButton.release();
	}
}
PromptScene.prototype.update = function(){
	if(this.showup){
		if(level===MaxLevel-1||this.OKButtons[2].isTriggered()){
			this.count--;
			if(this.count<=0&&score.added()){
				promptScenes["GameOver"].show(this._id);
				promptScenes["Leaderboard"].endGame = true;
				this.showup = false;
			}
		}else{

			this.breadth = Math.cos(3*frame*3.141592/180.0);
			if(this.count>0)
				this.count--;
			if(this.showAnswer.showup)
				this.showAnswer.setPos(this.OKButtons[1].x,this.OKButtons[1].y-100-25*this.breadth+100*this.count/50,100*(50-this.count)/50+50*this.breadth,1);

			for(var i = 0; i<this.OKButtons.length; i++)
				this.OKButtons[i].update();
			this.seeSquadButton.update();

			if(this.OKButtons[0].isTriggered()){
				this.showup = false;
				currentState = this.prevState;
				return true;
			}
			if(this.showAnswer.showup)
			if(this.OKButtons[1].isTriggered()){
				this.showAnswer.showup = false;
				this.paid = true;
				score.add(-SCORE_TO_VIEW_ANSWER);

				//align the 2 buttons to the center again
				this.OKButtons[0].x = WIDTH/2+150;
				this.OKButtons[2].x = WIDTH/2-150;

			}
			if(this.paid){
				if(this.seeSquadButton.isTriggered()){
					openLinkToSquad(teams._teams[level].id);
				}
			}
		}
	}
	return false
}

PromptScene.prototype.draw = function(){
	if(this.showup){
		var	x = 120, y = 930;
		var	w = 500, h = 140;

		if(this._id === 'CorrectAnswer'||this.paid){
			if(Math.abs(this.offsetW)<0.005&&Math.abs(this.offsetH)<0.005){
				score.update();
			}else{
				if(this.offsetW <0) 
					this.offsetW+=(-this.offsetW)*0.2;
				if(this.offsetH<0)
					this.offsetH+=(-this.offsetH)*0.2;
			}
			drawCoverWithHole(x-this.offsetW/2,y-this.offsetH/2,w+this.offsetW,h+this.offsetH,ZERO_NINE);
			if(!this.paid){
				drawImage(this.image,WIDTH/2, HEIGHT/3);
				drawText(text.correct_answer,WIDTH/2, HEIGHT/3+230,TEXT_COLOR,80);
			}else{
				ctx.shadowColor = TEXT_COLOR;
				ctx.shadowBlur = 100;
				drawImage(teams._teams[level].name,WIDTH/2, HEIGHT/3);
				drawText(teams._teams[level].name,WIDTH/2, HEIGHT/3+270,TEXT_COLOR);			
				ctx.shadowBlur = 0;
				this.seeSquadButton.draw();
				drawText(text.see_squad_txt,this.seeSquadButton.x,this.seeSquadButton.y,'#222',50);
			}
			if(score.added()&&level!=MaxLevel-1){
				this.OKButtons[0].draw();
				this.OKButtons[2].draw();
			}



		}else if(this._id === 'WrongAnswer'){
			drawCover(ZERO_NINE);
			drawImage(this.image,WIDTH/2, HEIGHT/3);
			drawText(this.textDisplay,WIDTH/2, HEIGHT/3+230,TEXT_COLOR);
			if(score.added()&&level!=MaxLevel-1){
				this.OKButtons[0].draw();
				this.OKButtons[2].draw();

				if(this.showAnswer.showup){
					this.OKButtons[1].draw();
				}

				this.showAnswer.update();
				this.showAnswer.draw(-SCORE_TO_VIEW_ANSWER+' POINTS');
			}
		}
		drawText(level+1+'/'+MaxLevel,200,1250,'#000',50);

	}
}





function GameOver(image){
	PromptScene.call(this,image, new Button2("OKButton",WIDTH/2,1220,false,text.next_txt));

}
GameOver.prototype = Object.create(PromptScene.prototype);
GameOver.prototype.constructor = GameOver;

GameOver.prototype.show = function(id){
	this._id = id;
	this.showup = true;
	this.prevState = states.Splash;
	currentState = states.Score;

	loadLeaderboard();

	this.showAnswer.showup = (score._score>=SCORE_TO_VIEW_ANSWER&&this._id === 'WrongAnswer');

	this.paid = false


	if(this._id === 'WrongAnswer'&&this.showAnswer.showup){
		this.OKButtons[0].x = WIDTH/2+150;
		this.OKButtons[1].x = WIDTH/2-150;
	}
}
GameOver.prototype.update = function(){
	if(this.showup){

		this.breadth = Math.cos(3*frame*3.141592/180.0);
		if(this.count>0)
			this.count--;
		if(this.showAnswer.showup)
			this.showAnswer.setPos(this.OKButtons[1].x,this.OKButtons[1].y-100-25*this.breadth+100*this.count/50,100*(50-this.count)/50+50*this.breadth,1);


		for(var i = 0; i<this.OKButtons.length; i++)
			this.OKButtons[i].update();
		//this.replayButton.update();
		//this.shareButton.update();

		if(this.OKButtons[0].isTriggered()){
			this.showup = false;
			//currentState = this.prevState;
			promptScenes["Leaderboard"].loadScore();
			sendScore();
			promptScenes["Leaderboard"].show();
			return true;
		}
		if(this.showAnswer.showup)
		if(this.OKButtons[1].isTriggered()){
			this.showAnswer.showup = false;
			this.paid = true;
			score.add(-SCORE_TO_VIEW_ANSWER);
			this.OKButtons[0].x = WIDTH/2;
		}
	}
	return false
}
GameOver.prototype.draw = function(){

	if(this.paid){
		var	x = 120, y = 930;
		var	w = 500, h = 140;
		if(Math.abs(this.offsetW)<0.005&&Math.abs(this.offsetH)<0.005){
			score.update();
		}else{
			if(this.offsetW <0) 
				this.offsetW+=(-this.offsetW)*0.2;
			if(this.offsetH<0)
				this.offsetH+=(-this.offsetH)*0.2;
		}
		drawCoverWithHole(x-this.offsetW/2,y-this.offsetH/2,w+this.offsetW,h+this.offsetH,ZERO_NINE);

		this.OKButtons[0].draw();
		if(this.showAnswer.showup)
			this.OKButtons[1].draw();

		drawImage(teams._teams[level].name,WIDTH/2, HEIGHT/3);
		drawText(teams._teams[level].name,WIDTH/2, HEIGHT/3+270,TEXT_COLOR);			

		this.seeSquadButton.draw();
		drawText('See Squad',this.seeSquadButton.x,this.seeSquadButton.y,'#222',50);
	}else{
		drawCover(ZERO_NINE);
		var x = WIDTH/2;
		var y = HEIGHT/2-100;
		ctx.shadowColor = '#fff';
		ctx.shadowBlur = 500;
		drawImage('GameOver',x,y);
		ctx.shadowBlur = 0;

		var w = images['GameOver'].width;
		var h = images['GameOver'].height;
		x -= w/2;
		y -= h/2;

		drawText(text.play_again_txt,x+689,HEIGHT/3+30,'#db3449',100);
		drawText(text.score_txt,x+689,y+540,TEXT_COLOR,70);
		drawText(score._score,x+689,y+620,TEXT_COLOR,80)
		this.OKButtons[0].draw();
		if(level===MaxLevel-1){
			if(this.showAnswer.showup)
				this.OKButtons[1].draw();
			this.showAnswer.update();
			this.showAnswer.draw(-SCORE_TO_VIEW_ANSWER+' POINTS');
		}else{
			this.OKButtons[0].x = WIDTH/2;
		}
	}
	drawText(level+1+'/'+MaxLevel,200,1250,'#000',50);
}



function Leaderboard(){
	PromptScene.call(this,"Leaderboard Background",
		new Button('HomeButton',1416,1220,false,true));
	this.OKButtons.pop();
	this.OKButtons[1] = new Button('ShareButton',1416,1000,false,true);

	this._id = 'Leaderboard';
	this.firstTime = true;
	if(!this.loaded)
		this.loadScore();
	this.endGame = false;

}	


Leaderboard.prototype = Object.create(PromptScene.prototype);
Leaderboard.prototype.constructor = Leaderboard;


Leaderboard.prototype.loadScore = function(){
	this.loaded = true;
	if(user.score<score._score){
		user.score = score._score;
		user.time = score._playtime;
	}
	//console.log(user.score+" "+user.time+" "+ user.id);
	loaded_score_data.sort(function(a,b){
		return ((b.score-b.time/2000) - (a.score-a.time/2000));
	});
	//console.log(loaded_score_data);
	var existed = false
	for(var i = 0; i<loaded_score_data.length; i++)
		if(loaded_score_data[i].id === user.id){
			existed = true;
			if(level===MaxLevel-1||this.endGame){//he has played
				var date = (new Date()).toString();


				if(loaded_score_data[i].records){
					loaded_score_data[i].records.push({s:score._score,t:score._playtime,m:date});
				}
				else{
					loaded_score_data[i].records = [];
					loaded_score_data[i].records.push({s:score._score,t:score._playtime,m:date});
				}
				loaded_score_data[i].count++;

			}
			if(loaded_score_data[i].score < user.score){
				loaded_score_data[i].score = user.score;
				loaded_score_data[i].time = user.time;
			}else if(loaded_score_data[i].score === user.score){
				if(loaded_score_data[i].time > user.time){
					loaded_score_data[i].score = user.score;
					loaded_score_data[i].time = user.time;
				}
			}else{
				user.score = loaded_score_data[i].score;
				user.time = loaded_score_data[i].time;
			}
				this.rank = i+1;




			break;
		}

	if(!existed){
		if(user.score>0){
			loaded_score_data.push(user);
			loaded_score_data.sort(function(a,b){
				return ((b.score-b.time/2000) - (a.score-a.time/2000));
			});
			function findrank(element) {
				return (element.score <= score._score&&element.time >= score._playtime);
			}
			//console.log(score_data);
			this.rank = Math.max(loaded_score_data.findIndex(findrank)+1,1);
		}else{
			this.rank=loaded_score_data.length+1;
		}
	}




	this.bars = [];

	for(var i = 0; i<Math.min(loaded_score_data.length,10); i++)
		this.bars.push({
			name:loaded_score_data[i].name,
			score:loaded_score_data[i].score,
			time:loaded_score_data[i].time,
			_id:i,
			x:404,y:440,w:781,h:108,
			s:40,
			draw:function(){
				if(this._id<3){
					var x1 = 531;
					var x2 = 980;
					var x3 = 1151;
					var y1 = 373;
					var offsetY = 125;
					var m = Math.floor(this.time/60);
					var s = this.time%60;

					var t = (m<10?"0":"")+m+":"+(s<10?"0":"")+s;


					drawText(this.name,x1,y1+offsetY*this._id,this._id<3?'#fff':'#2d0a0a',this.s,'left');
					drawText(t,x2,y1+offsetY*this._id,this._id<3?'#fff':'#2d0a0a',this.s,'right');
					drawText(this.score,x3,y1+offsetY*this._id,this._id<3?'#fff':'#2d0a0a',this.s,'right');
				}else{
					var index = this._id-3;
					var x1 = 531;
					var x2 = 980;
					var x3 = 1151;
					var y1 = 740;
					var offsetY = 90;
					var m = Math.floor(this.time/60);
					var s = this.time%60;
					var t = (m<10?"0":"")+m+":"+(s<10?"0":"")+s;

					drawText(this.name,x1,y1+offsetY*index,'#2d0a0a',this.s,'left');
					drawText(t,x2,y1+offsetY*index,'#2d0a0a',this.s,'right');
					drawText(this.score,x3,y1+offsetY*index,'#2d0a0a',this.s,'right');
				}
			}
			,onmousemove(x,y){
				if(pointInRect(x,y,this.x+this.w/2,this.y+this.h/2+125*this._id,this.w,this.h)){
					this.s = 50;
				}else this.s = 40;
			}
		});
}
Leaderboard.prototype.show = function(){
	this.showup = true;
	this.prevState = currentState;
	currentState = states.Prompt;
	sounds['Leaderboard'].play();
}
Leaderboard.prototype.onmousemove = function(x,y){
	PromptScene.prototype.onmousemove.call(this,x,y);
	//for(var i =0; i<this.bars.length;i++)
	//	this.bars[i].onmousemove(x,y);
}
Leaderboard.prototype.update = function(){
	if(this.showup){
		for(var i = 0; i<this.OKButtons.length; i++)
			this.OKButtons[i].update();

		if(this.OKButtons[0].isTriggered()){
			this.showup = false;
			currentState = this.prevState;

			//whenever go to the splash scene, everything resets
			if(this.prevState === states.Score)
				splash.init();

			return true;
		}
		if(this.OKButtons[1].isTriggered()){
			share();
		}

	}
	return false;
}

Leaderboard.prototype.draw = function(){
	if(this.showup){
		if(this._id === 'Leaderboard'){

			drawImage(this.image,WIDTH/2,HEIGHT/2);	
			drawText(text.leaderboard_txt,815,110,'#e2e1c0',70);
			for(var i = 0; i<this.OKButtons.length; i++)
				this.OKButtons[i].draw();

			for(var i =0; i<this.bars.length;i++)
				this.bars[i].draw();


			ctx.shadowColor = '#fff';
			ctx.shadowBlur = 50;

			drawText(text.rank_txt+': '+this.rank,40,1200,"#2d0a0a",50,'left');
			drawText(text.score_txt+': '+user.score,40,1260,"#2d0a0a",50,'left');
			//drawText(this.rank,180,1220+20,'#2d0a0a',150);
			ctx.shadowBlur = 0;
		}
	}
}













function TipScene(){
	PromptScene.call(this,'TipBackground',new Button('HomeButton',1416,1220,false,true));
	//this.OKButtons[0].image = 'HomeButton';
}

TipScene.prototype = Object.create(PromptScene.prototype);
TipScene.prototype.constructor = TipScene;

TipScene.prototype.show = function(){
	this.showup = true;
	this.prevState = currentState;
	currentState = states.Prompt;
}

TipScene.prototype.update = function(){
	if(this.showup){
		this.OKButtons[0].update();
		if(this.OKButtons[0].isTriggered()){
			this.showup = false;
			currentState = this.prevState;
		}
	}
}

TipScene.prototype.draw = function(){
	if(this.showup){
		drawImage(this.image,WIDTH/2,HEIGHT/2);
		drawText(text.how_to_play_txt,815,110,'#e2e1c0',70);
		this.OKButtons[0].draw();
	}
}










function ButtonName(x,y,name,h=60){
	this.x = x;
	this.y = y-h/2;
	this.h = h;
	this.w = 0;
	this.name = name;
	this.hovered = false;
	this.count = 0;
	this.maxlength = Math.max(name.length*40,250);
	this.show = function(){
		if(this.w <this.maxlength)
			this.w+=(this.maxlength-this.w)*0.2;
	}
	this.hide = function(){
		if(this.w >0)
			this.w+=(-this.w)*0.2;
	}
	this.draw = function(){
		//this.w = this.count*5*this.name.length;
		ctx.fillStyle = TEXT_COLOR;
		ctx.fillRect(this.x,this.y,this.w,this.h);
		var l =  this.name.length;	
		var index = Math.abs(this.w-this.maxlength)<20?l:Math.floor(this.w/40);
		drawText(this.name.substring(l-index,l),this.x+50,this.y+45,'#c1141b',50,'left');
	}
}


var splash = {
	playButton:new Button('Play Button',WIDTH/2-481,HEIGHT/2+410,false,true),
	languageButton:new Button('Language Button',WIDTH/2-694,HEIGHT/2+42),
	leaderboardButton:new Button('Leaderboard Button',WIDTH/2-694,HEIGHT/2+123),
	shareButton:new Button('Share Button',WIDTH/2-694,HEIGHT/2+205),
	tipButton:new Button('Tip Button',WIDTH/2-694,HEIGHT/2+286),

	displayButton0:new ButtonName(WIDTH/2-694,HEIGHT/2+42,text.language_txt),
	displayButton1:new ButtonName(WIDTH/2-694,HEIGHT/2+123,text.leaderboard_txt),
	displayButton2:new ButtonName(WIDTH/2-694,HEIGHT/2+205,text.share_txt),
	displayButton3:new ButtonName(WIDTH/2-694,HEIGHT/2+286,text.how_to_play_txt),
	onpress:function(x,y){
		this.playButton.press(x,y);
		this.languageButton.press(x,y);
		this.leaderboardButton.press(x,y);
		this.shareButton.press(x,y);
		this.tipButton.press(x,y);
	},
	onmousemove:function(x,y){
		this.playButton.hover(x,y);

		this.languageButton.hover(x,y);
		this.leaderboardButton.hover(x,y);

		this.shareButton.hover(x,y);
		this.tipButton.hover(x,y);
	},
	onrelease:function(){
		this.playButton.release();
		this.languageButton.release();
		this.leaderboardButton.release();
		this.shareButton.release();
		this.tipButton.release();
	},
	init:function(){
		currentState = states.Splash;
		firstTime = true;
		this.displayButton0.name = text.language_txt;
		this.displayButton1.name = text.leaderboard_txt;
		this.displayButton2.name = text.share_txt;
		this.displayButton3.name = text.how_to_play_txt;
		init(0);


	},
	update:function(){

		this.playButton.update();
		this.languageButton.update();
		this.leaderboardButton.update();
		this.shareButton.update();
		this.tipButton.update();
		if(this.languageButton.state === this.languageButton.states.HOVER){
			this.displayButton0.show();
		}else{
			this.displayButton0.hide();
		}
		if(this.leaderboardButton.state === this.leaderboardButton.states.HOVER){
			this.displayButton1.show();
		}else{
			this.displayButton1.hide();
		}
		if(this.shareButton.state === this.shareButton.states.HOVER){
			this.displayButton2.show();
		}else{
			this.displayButton2.hide();
		}
		if(this.tipButton.state === this.tipButton.states.HOVER){
			this.displayButton3.show();
		}else{
			this.displayButton3.hide();
		}

		if(this.playButton.isTriggered()){
			currentState = states.Hint;
			displayLevel.show(text.stage_txt);
		}
		if(this.languageButton.isTriggered()){
		}
		if(this.leaderboardButton.isTriggered()){
			promptScenes["Leaderboard"].show();
		}
		if(this.shareButton.isTriggered())
	        share();
		if(this.tipButton.isTriggered())
			promptScenes["TipScene"].show();
	}
	,draw:function(){
		//drawImage("BackgroundMenu",WIDTH/2,HEIGHT/2);

		//this.displayButton0.draw();
		this.displayButton1.draw();
		this.displayButton2.draw();
		this.displayButton3.draw();

		this.playButton.draw();
		drawText(text.play_now_txt,WIDTH/2-481,HEIGHT/2+430,'#c1141b',80*this.playButton.scale+this.playButton.breadth);
		//this.languageButton.draw();
		this.leaderboardButton.draw();
		this.shareButton.draw();
		this.tipButton.draw();

	}
};










var promptScenes = {};

function onpress(evt){
	mX = evt.offsetX*WIDTH/CANVAS_WIDTH;
	mY = evt.offsetY*HEIGHT/CANVAS_HEIHGT;
	if(currentState === states.Game||currentState === states.Hint){
		answerBar.onpress(mX,mY);
	}
	switch(currentState){
		case states.Prompt:
			promptScenes["CorrectAnswer"].onpress(mX,mY);
			promptScenes["WrongAnswer"].onpress(mX,mY);
			promptScenes["Leaderboard"].onpress(mX,mY);
			promptScenes["TipScene"].onpress(mX,mY);
			break;
		case states.Splash:
			splash.onpress(mX,mY);
			break;
		case states.Hint:
			hiddenpositions.open(mX, mY);
			break;
		case states.Game:
			hiddenpositions.seeClubNameButton.press(mX,mY);
			if(hiddenpositions.open(mX, mY)){
				clock.init(Math.max(15,clock.count));
				clock.start();
			}
			break;
		case states.Score:
			promptScenes["GameOver"].onpress(mX,mY);
			break;

	}
}
function onrelease(evt){
	if(currentState === states.Splash){
		splash.onrelease();
	}
	if(currentState === states.Hint||currentState === states.Game){
		answerBar.onrelease();
	}
	if(currentState === states.Prompt){
		promptScenes["CorrectAnswer"].onrelease();
		promptScenes["WrongAnswer"].onrelease();
		promptScenes["Leaderboard"].onrelease();
		promptScenes["TipScene"].onrelease();
	}
	if(currentState === states.Score){
		promptScenes["GameOver"].onrelease();
	}
	if(currentState === states.Game){
		hiddenpositions.seeClubNameButton.release();
	}
}
function onmousemove(evt){
	mX = evt.offsetX*WIDTH/CANVAS_WIDTH;
	mY = evt.offsetY*HEIGHT/CANVAS_HEIHGT;

	if(currentState === states.Prompt){
		promptScenes["CorrectAnswer"].onmousemove(mX,mY);
		promptScenes["WrongAnswer"].onmousemove(mX,mY);
		promptScenes["Leaderboard"].onmousemove(mX,mY);
		promptScenes["TipScene"].onmousemove(mX,mY);
	}
	if(currentState == states.Splash){
		splash.onmousemove(mX,mY);
	}
	if(currentState===states.Game||currentState===states.Hint){
		hiddenpositions.mouseover(mX, mY);
		answerBar.onmousemove(mX,mY);
	}
	if(currentState === states.Score){
		promptScenes["GameOver"].onmousemove(mX,mY);
	}
	if(currentState === states.Game){
		hiddenpositions.seeClubNameButton.hover(mX,mY);
	}
}
function onwheel(e){

	// cross-browser wheel delta
	var e = window.event || e; // old IE support
	var delta = Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail)));
	answerBar.onwheel(delta);
}


var sounds = {};
function sound(src) {
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    document.body.appendChild(this.sound);

    this.play = function(){
	   this.sound.play();
	   //console.log("play sound");
    }
    this.stop = function(){
       this.sound.pause();
	   //console.log("stop sound");
    }    
    
}



function loadSound(name){
	sounds[name] = new sound('assets/sounds/'+name+'.mp3');
	sounds[name].muted = 'true';
}

function loadImage(name,src = ""){

	images[name] = new Image();

	images[name].onload = function(){
		numResourcesLoaded += 1;
		if(numResourcesLoaded===totalResources){
			////////loaded successfully///////
			run();//run the fucking game//////
			////////come on babe /////////////
		}
	}
	if(src==="")
		images[name].src = 'assets/'+name+'.png';//'WhichTeamIsThis/'+
	else
		images[name].src = src;	
}
function loadAsset(){

/*	var tempdata = [];
	for(var i = 0; i<gamedata.teams.length;i++){
		tempdata.push(gamedata.teams[i]);
	}*/
	//console.log(tempdata.length+" length "+gamedata.levels.length);

	loadSound('MainMusic');
	loadSound('CoinFlip');
	loadSound('CorrectAnswer'); 
	loadSound('WrongAnswer'); 
	loadSound('TimeUp'); 
	loadSound('Leaderboard'); 
	loadSound('Button'); 

	totalResources = 24 + gamedata.clubs.length;
	//load assets from server
	loadImage('Background');
	loadImage('BackgroundMenu');
	loadImage('CorrectAnswer');
	loadImage('WrongAnswer');
	loadImage('ScoreIcon');
	loadImage('LogoWC');
	loadImage('OfficialMascot');
	loadImage('ClockIcon');
	loadImage('OKButton');
	loadImage('HiddenPosition_bright');
	loadImage('HiddenPosition');
	loadImage('Play Button');
	loadImage('Language Button');
	loadImage('Leaderboard Button');
	loadImage('Leaderboard Background');
	loadImage('Share Button');
	loadImage('Tip Button');
	loadImage('ShareButton');
	loadImage('HomeButton');//20
	loadImage('EmptyButton');
	loadImage('EndGameButton');//20
	loadImage('GameOver');
	loadImage('TipBar');
	loadImage('ShowAnswerButton');
	//loadImage('ShowAnswerBar');
	loadImage('TipBackground');

	//load the club logo assets
	for(var i = 0; i<gamedata.clubs.length; i++)
		loadImage(gamedata.clubs[i].name,gamedata.clubs[i].club_logo);

}
var progressBarDone = false
function main(){

	//to solve the problem of canvas resizing//////////////////////////
	let resizeCanvas = function(){
		CANVAS_WIDTH = window.innerWidth-25;
		CANVAS_HEIHGT = window.innerHeight-25;

		let ratio = 1587/1379;
		if(CANVAS_HEIHGT<CANVAS_WIDTH/ratio){
			CANVAS_WIDTH = CANVAS_HEIHGT*ratio;
		}else{
			CANVAS_HEIHGT = CANVAS_WIDTH/ratio;
		}

		cvs.width = WIDTH;
		cvs.height = HEIGHT;
		cvsBg.width = WIDTH;
		cvsBg.height = HEIGHT;

		ctx.font = '30px game_font';
		ctx.mozImageSmoothingEnabled = false;
		ctx.msImageSmoothingEnabled = false;
		ctx.imageSmoothingEnabled = false;

		ctxBg.mozImageSmoothingEnabled = false;
		ctxBg.msImageSmoothingEnabled = false;
		ctxBg.imageSmoothingEnabled = false;

		cvs.style.width = ''+CANVAS_WIDTH+'px';
		cvs.style.height = ''+CANVAS_HEIHGT+'px';
		cvsBg.style.width = ''+CANVAS_WIDTH+'px';
		cvsBg.style.height = ''+CANVAS_HEIHGT+'px';
	}
	resizeCanvas();
	window.addEventListener('resize',function(){resizeCanvas();});
	/////////////////////////////////////////////
	var evt = "touchstart";

/*	if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(navigator.userAgent)) {
	    // Take the user to a different screen here.
	    console.log("HEY PHONE");
	}else{
*/

//	if(CANVAS_WIDTH>700){
		evt = "mousedown";
		document.addEventListener('mousemove',onmousemove);
		document.addEventListener('mouseup',onrelease);
		//console.log("PC");
	//}
	document.addEventListener(evt,onpress);
	//document.addEventListener(evt,onrelease);
	//document.addEventListener('mousewheel',onwheel, false);



	//progress bar babe
	var al = 0;
	var	start = 4.72;
	var	diff = 0;
	var progressSim = function(){
		if(al<=1.01){
			ctx.clearRect(0,0,WIDTH,HEIGHT);
			ctx.drawImage(progressBg,WIDTH/2-progressBg.width/2,HEIGHT/2-progressBg.height/2);


			var w = WIDTH*2/3;
			var x = WIDTH/2-w/2,y = HEIGHT/2+50;

			ctx.shadowColor = '#333';
			ctx.shadowBlur = 100;			
			drawText(Math.floor(al*100)+'%',WIDTH/2,HEIGHT/2,'#fff',100);

			//drawText(Math.floor(CANVAS_WIDTH)+"-"+Math.floor(CANVAS_HEIHGT),WIDTH/2,HEIGHT/2+400,'#000',100);

			ctx.fillStyle = '#222';
			ctx.fillRect(x-10,y-10,w+30,100+20);
			ctx.shadowBlur = 0;			
			ctx.fillStyle = TEXT_COLOR;
			ctx.fillRect(x,y,al*w,100);
			if(user.name!='Anonymous')
				drawText(text.welcome_txt+' '+ user.name,WIDTH/2,y+60,'#222',50);
		}

			if(al>=1.5){
				clearTimeout(sim);
				progressBarDone = true;
			}
			al+=0.002;
	}
	var sim;
	var progressBg = new Image();
	progressBg.onload = function(){
		sim = setInterval(progressSim,5);
	}
	progressBg.src = 'assets/BackgroundMenu_blur.png';

	//load images
	//end load images
	loadAsset();
}










function init(l){
	level = l;
	//console.log(teams._teams);
	frame = 0;
	hiddenpositions.init();
	clock.init(30);
	score.init();


	if(firstTime){
		teams.load(gamedata.teams);
//		console.log(teams._teams);
		score._score = 0;
		score._playtime = 0;
		getUserInfo();
		loadLeaderboard();//OK babe


		currentState = states.Splash;
		firstTime = false;
	
		answerBar.init();
		promptScenes["GameOver"] = new GameOver("GameOver");
		promptScenes["WrongAnswer"] = new PromptScene("WrongAnswer");
		promptScenes["CorrectAnswer"] = new PromptScene("CorrectAnswer");
		promptScenes["Leaderboard"] = new Leaderboard();
		promptScenes["TipScene"] = new TipScene();
		sounds['MainMusic'].play();


		splash.displayButton0.name = text.language_txt;
		splash.displayButton1.name = text.leaderboard_txt;
		splash.displayButton2.name = text.share_txt;
		splash.displayButton3.name = text.how_to_play_txt;

	}else{
		currentState = states.Hint;
		displayLevel.show('Stage');
		answerBar.selectSeven();
	}
	scoreOfThisMatch = 100;
}

var drawTrigger = false;
var stateDetecter = -1;
function drawBg(state){
	if(stateDetecter!=state){
		drawTrigger = true;		
		stateDetecter = state;
	}else
		drawTrigger = false;

	if(drawTrigger){		
		if(state===states.Splash){
			ctxBg.clearRect(0,0,WIDTH,HEIGHT);
			drawImage2('BackgroundMenu',WIDTH/2,HEIGHT/2);
		}
		if(state === states.Game||state === states.Hint||state === states.Score||state === states.Level||
			state === states.Prompt){
			drawImage2('Background',WIDTH/2,HEIGHT/2);
		}
	}
}
function run(){
	init(0);
	var fps = 30;
	var currentTime = 0, lastTime = 0;




	var loop = function(){
		if(progressBarDone){
			currentTime = new Date().getTime();
			if(1000/fps>currentTime-lastTime)
				sleep(1000/fps-(currentTime-lastTime))
			lastTime = currentTime;


			update();
			ctx.clearRect(0,0,WIDTH,HEIGHT);
			drawBg(currentState);
			render();

		}
		window.requestAnimationFrame(loop,cvs);
	}	
	window.requestAnimationFrame(loop,cvs);	
}
var reasons = {Timeout:0,Wrong:1,Correct:2};
function nextLevel(reason){
	if(reason === reasons.Wrong){
		scoreOfThisMatch = 0;
		promptScenes["WrongAnswer"].textDisplay = text.wrong_answer;
		promptScenes["WrongAnswer"].show(reason);
		sounds['WrongAnswer'].play();
	}else if(reason === reasons.Timeout){
		scoreOfThisMatch = 0;
		promptScenes["WrongAnswer"].textDisplay = text.time_up_txt;
		promptScenes["WrongAnswer"].show(reason);
		sounds['TimeUp'].play();
	}else if(reason === reasons.Correct){
		promptScenes["CorrectAnswer"].show();
		sounds['CorrectAnswer'].play();
	}
	score.add(scoreOfThisMatch);
}
function update(){
	frame>100*3*3.141592?frame=0:frame++;
	if(currentState === states.Prompt){
		promptScenes["Leaderboard"].update();
		promptScenes["TipScene"].update();

		if(promptScenes["CorrectAnswer"].update()
			||promptScenes["WrongAnswer"].update()){
			if(level<MaxLevel-1){
				init(level+1);
			}
		}
	}
	if(currentState === states.Score){
		if(promptScenes["GameOver"].update()){
			//now restate the game to the initial state
		}
	}


	if(currentState === states.Level){
		displayLevel.update();
	}
	if(currentState === states.Splash){
		splash.update();
	}
	if(currentState === states.Hint){
		hiddenpositions.hint();
	}
	if(currentState === states.Game){
		clock.update();
		if(clock.count === 0){
			if(hiddenpositions.numberOpened<NUMBER_OF_POS&&scoreOfThisMatch>0){
				hiddenpositions.autoopen();
				clock.init(Math.max(15,clock.count));
				clock.start();
			}else{
				nextLevel(reasons.Timeout);
			}
		}
	}
	if(currentState === states.Game||currentState === states.Hint){
		hiddenpositions.update();
		teams.update();
	}
	answerBar.update();
	varprizedScores.update();
}
function render(){
	if(currentState === states.Splash){
		splash.draw();
	}

	if(currentState != states.Splash)
	{
		//drawImage('Background',WIDTH/2,HEIGHT/2);
		drawText(text.game_question,WIDTH/2+25,110,TEXT_COLOR,70);
		clock.draw();
		score.draw();
		if(currentState != states.Prompt&&currentState!=states.Score)	
			answerBar.draw();
		hiddenpositions.draw();
	}
	if(currentState === states.Prompt){
		promptScenes["CorrectAnswer"].draw();
		promptScenes["WrongAnswer"].draw();		
		promptScenes["Leaderboard"].draw();		
		promptScenes["TipScene"].draw();		
		//drawText(score.amountToAdd,1444,168,TEXT_COLOR,120);
	}
	if(currentState === states.Score){
		promptScenes["GameOver"].draw();		
	}
	if(currentState ===states.Game||currentState === states.Hint||currentState===states.Level){
		if(currentState===states.Level){
			if(displayLevel.txt!='Level')
				score.drawScoreOfThisMatch();
		}else
				score.drawScoreOfThisMatch();
	}
	if(currentState === states.Game){
		hiddenpositions.seeClubNameButton.draw();
		drawText(text.show_club.txt,hiddenpositions.seeClubNameButton.x,hiddenpositions.seeClubNameButton.y+100,TEXT_COLOR,40);
		drawText(text.show_club.name,hiddenpositions.seeClubNameButton.x,hiddenpositions.seeClubNameButton.y+140,TEXT_COLOR,40);
	}
	if(currentState === states.Level){
		displayLevel.draw();
	}
	//if(currentState === states.Score){
	//	promptScenes["GameOver"].draw();
	//}
	varprizedScores.draw();

}





















function loadJSON(name,callback) {   

	var xobj = new XMLHttpRequest();
	    xobj.overrideMimeType("application/json");
	xobj.open('GET', name, true); // Replace 'my_data' with the path to your file
	xobj.onreadystatechange = function () {
	      if (xobj.readyState == 4 && xobj.status == "200") {
	        // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
	        callback(xobj.responseText);
	      }
	};
	xobj.send(null);  
}
function drawImage(name,x,y,w,h,flip = false){
	if(w==null) w = images[name].width;
	if(h==null) h = images[name].height;

	if(flip){
		ctx.save();
		ctx.scale(-1,1);
		ctx.drawImage(images[name],-(x+w/2),y-h/2,w,h);
		ctx.restore();
	}else
		ctx.drawImage(images[name],x-w/2,y-h/2,w,h);
}

function drawImage2(name,x,y,w,h){
	if(w==null) w = images[name].width;
	if(h==null) h = images[name].height;
	ctxBg.drawImage(images[name],x-w/2,y-h/2,w,h);
}

function drawText(text,x,y,color='#fff',size='100',align = 'center'){
	ctx.fillStyle=color;
	ctx.font = 'bold '+size+'px game_font';
	ctx.textAlign = align;
	ctx.fillText(text,x,y);}

function drawCover(alpha){
	ctx.globalAlpha = alpha;
	ctx.fillStyle = '#000';//'rgb(21,30,61)';
	ctx.fillRect(0,0,WIDTH, HEIGHT);
	ctx.globalAlpha = 1;
}
function drawRectWithHole(x1,y1,w1,h1,x2,y2,w2,h2,color,alpha){
	ctx.beginPath();

	//polygon1--- usually the outside polygon, must be clockwise
	ctx.moveTo(x1, y1);
	ctx.lineTo(x1+w1, y1);
	ctx.lineTo(x1+w1, y1+h1);
	ctx.lineTo(x1, y1+h1);
	ctx.lineTo(x1, y1);
	ctx.closePath();

	//polygon2 --- usually hole,must be counter-clockwise 
	ctx.moveTo(x2, y2);
	ctx.lineTo(x2,y2+h2);
	ctx.lineTo(x2+w2, y2+h2);
	ctx.lineTo(x2+w2, y2);
	ctx.lineTo(x2, y2);
	ctx.closePath();


	//  add as many holes as you want

	ctx.globalAlpha = alpha;
	ctx.fillStyle = color;
	ctx.strokeStyle = "rgba(0.5,0.5,0.5,0.5)";
	ctx.lineWidth = 1;
	ctx.fill();
	ctx.stroke();
	ctx.globalAlpha = 1;

}
function drawCoverWithHole(x,y,w,h,alpha=0.7){
	drawRectWithHole(0,0,WIDTH,HEIGHT,x,y,w,h,'#000',alpha);
}
function share(){

	function popitup(url,windowName) {
       newwindow=window.open(url,windowName,'height=500,width=560');
       if(newwindow){
       	if (window.focus) {newwindow.focus()}
   		}
       return false;
     }
     popitup("https://www.facebook.com/sharer/sharer.php?u=https://footballx.live/game&amp;src=sdkpreparse",
		'_blank',"SHARE");
}

function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}

(function(d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) return;
  js = d.createElement(s); js.id = id;
  js.src = 'https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v3.0';
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

