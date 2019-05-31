    $.holdReady(true);
    var db = {};
    var d0 = $.getJSON("json/excel/building_data.json",function(data){
            db["manufactformulas"] = data.manufactFormulas;
        });
    var d1 = $.getJSON("json/excel/building_data.json",function(data){
            db["workshopformulas"] = data.workshopFormulas;
        });
    var d2 = $.getJSON("json/excel/character_table.json",function(data){
            db["chars"] = data;
        });
    var d3 = $.getJSON("json/excel/item_table.json",function(data){
            db["items"] = data.items;
        });
    var d4 = $.getJSON("json/tl-akhr.json",function(data){
            db["chars2"] = data;
        });
    var d5 = $.getJSON("json/tl-type.json",function(data){
            db["classes"] = data;
        });
    var d6 = $.getJSON("json/tl-tags.json",function(data){
            db["tags"] = data;
        });
    var d7 = $.getJSON("json/akmaterial.json",function(data){
            db["itemstl"] = data;
        });
    var d8 = $.getJSON("json/excel/gamedata_const.json",function(data){
            db["dataconst"] = data;
        });
    var d9 = $.getJSON("json/excel/building_data.json",function(data){
            db["building_buff"] = data.buffs;
        });
    var d10 = $.getJSON("json/excel/building_data.json",function(data){
            db["building_chars"] = data.chars;
        });
    var d11 = $.getJSON("json/riic.json",function(data){
            db["riic"] = data;
        });
    $.when(d0,d1,d2,d3,d4,d5,d6,d7,d8,d9,d10,d11).then(function(){
        $.holdReady(false);
    });

    var lang;
    var reg;
    var reqmats = [];
    var selectedOP;
    let bufflist = []
    let bufflist2 = []
    
    let charaBuff = {}
    let charaFilter= []
    $(document).ready(function(){
        // console.log(db.building_buff)
        // console.log(db.riic)
        Object.keys(db.building_buff).forEach(element => {
            // let currdb = [element]
            let splitted = element.split("_")
            if(!bufflist.find(search=> search == splitted[0])){
                bufflist.push(splitted[0])
            }
        });
        console.log(bufflist)
        // array.forEach(element => {
        //     <button type="button" onclick="clickBtnTag(this)" class="btn btn-sm btn-secondary ak-btn btn-tag my-1 tags-qualifications button-tag" data-toggle="tooltip" data-placement="top" title="Newbie" cn-text="新手">新手</button>
        // });
        // 0: "control"
        // 1: "power"
        // 2: "manu"
        // 3: "trade"
        // 4: "workshop"
        // 5: "train"
        // 6: "dorm"
        // 7: "hire"
        // 8: "meet"
        // bufflist.forEach(element => {
        //     console.log(Object.keys(db.building_buff).filter(search=>search.includes(element)))
        // });

        bufflist2 = Object.keys(db.building_buff).filter(search=>search.includes("meet"))


        
        Object.keys(db.building_chars).forEach(element => {
            let currChara = db.building_chars[element]
            charaBuff[element]= []
            // console.log(element)
            currChara.buffChar.forEach(element2 => {
                // console.log(element2)
                if(element2.buffData){
                    element2.buffData.forEach(element3 => {
                        if(element3.buffId){
                            console.log(element3.buffId)
                            charaBuff[element].push({"buffId":element3.buffId,"cond":element3.cond})
                        }
                    });
                    // console.log(buffId)
                }
            });
            // console.log(currChara.buffs)
        });
        
        // console.log(charaFilter)

        
        // console.log(chara)
        // chara.forEach(element => {
        //     console.log(element)
        // });
        // console.log(chara)
        
        // .forEach(element => {
        //     let splitted = element.split("_")
        //     console.log(splitted)
        // });
        
        $('#to-tag').click(function() {      // When arrow is clicked
            $('body,html').animate({
                scrollTop : 0                       // Scroll to top of body
            }, 500);
        });

        $('.dropdown-trigger').dropdown();
        $('[data-toggle="tooltip"]').tooltip();


        if(typeof localStorage.gameRegion === "undefined" || localStorage.gameRegion == ""|| localStorage.webLang == ""){
            console.log("game region undefined");
            localStorage.setItem("gameRegion", 'cn');
            localStorage.setItem("webLang", 'cn');
            reg = "cn";
            lang = "cn";
        } else {
            console.log(localStorage.webLang);
            reg = localStorage.gameRegion;
            lang = localStorage.webLang;
        }

        if(typeof localStorage.selectedOP === "undefined" || localStorage.selectedOP == ""){
            localStorage.setItem("selectedOP","");
        } else {
            selectedOP = localStorage.selectedOP;
            var opname = db.chars[selectedOP].name;
            selectOperator(opname);
        }
        $('.reg[value='+reg+']').addClass('selected');
        $('.lang[value='+lang+']').addClass('selected');
        changeUILanguage();
    });

    function regDropdown(el){
        localStorage.gameRegion = el.attr("value");
        $(".dropdown-item.reg").removeClass("selected");
        el.addClass("selected");   
        changeUILanguage();
    }
                
    function langDropdown(el){
        localStorage.webLang = el.attr("value");
        console.log(localStorage.webLang)
        $(".dropdown-item.lang").removeClass("selected");
        el.addClass("selected");
        changeUILanguage();
    }

    function FilterType(type){
        charaFilter=[]
        Object.keys(charaBuff).forEach(element => {
            // charaFilter.push()
            let currChara=charaBuff[element]
            if(currChara.find(search=> search.buffId.includes(type)))
            charaFilter.push({"name":element,"buff": currChara})
        });
        // console.log(charaFilter)
        let currHtml = []
        $("#tbody-list").html("")
        charaFilter.forEach(element => {
            let chara = db.chars[element.name]
            let charaRiic = db.building_chars[element.name]
            let charaRiicTL = db.riic[element.name]
            let extraInfo =""
            // console.log(element.name)
            
            currHtml.push(`<div class="row" style="padding:5px;margin:5px;background:#292929">
                            <div class="col-4 col-sm-2" style="text-align:center;padding:3px;margin:auto">
                                <div style="padding-top:3px"><img src="img/avatars/${element.name}_1.png" style="height:120px"></div>
                                <br>
                                <div style="margin:auto">${chara.name}</div>
                            </div>
                            <div class="col-8 col-sm-10" style="margin:auto;padding:2px"> ` )
            // console.log(charaRiic)
            // console.log(charaRiicTL)
            // if (charaRiicTL){
                for(i=0;i<charaRiic.buffChar.length;i++){
                    // console.log(element.buff[i])
                    // console.log(building_chars[element].buffChar[i] )
                    let currBuff2 = db.building_buff[element.buff[i].buffId]
                    console.log(currBuff2)
                    extraInfo = ``
                    
                    if(element.buff[i].buffId.includes("control")){
                        extraInfo = `<div class="btn btn-sm ak-disable ak-btn ak-riic-control" style="height:25px;margin:auto;padding:1px;padding-right:3px"><img src="img/ui/infrastructure/control.png" style="height:20px;padding-bottom:3px"> 控制中枢 </div>`
                    }else if(element.buff[i].buffId.includes("power")){
                        extraInfo = `<div class="btn btn-sm ak-disable ak-btn ak-riic-power" style="height:25px;margin:auto;padding:1px;padding-right:3px"><img src="img/ui/infrastructure/power.png" style="height:20px;padding-bottom:3px"> 发电站 </div>`
                    }else if(element.buff[i].buffId.includes("manu")){
                        extraInfo = `<div class="btn btn-sm ak-disable ak-btn ak-riic-manu" style="height:25px;margin:auto;padding:1px;padding-right:3px"><img src="img/ui/infrastructure/manu.png" style="height:20px;padding-bottom:3px"> 制造站 </div>`
                    }else if(element.buff[i].buffId.includes("trade")){
                        extraInfo = `<div class="btn btn-sm ak-disable ak-btn ak-riic-trade" style="height:25px;margin:auto;padding:1px;padding-right:3px"><img src="img/ui/infrastructure/trade.png" style="height:20px;padding-bottom:3px"> 贸易站 </div>`
                    }else if(element.buff[i].buffId.includes("workshop")){
                        extraInfo = `<div class="btn btn-sm ak-disable ak-btn ak-riic-workshop" style="height:25px;margin:auto;padding:1px;padding-right:3px"><img src="img/ui/infrastructure/workshop.png" style="height:20px;padding-bottom:3px"> 加工站 </div>`
                    }else if(element.buff[i].buffId.includes("train")){
                        extraInfo = `<div class="btn btn-sm ak-disable ak-btn ak-riic-train" style="height:25px;margin:auto;padding:1px;padding-right:3px"><img src="img/ui/infrastructure/train.png" style="height:20px;padding-bottom:3px"> 训练室 </div>`
                    }else if(element.buff[i].buffId.includes("dorm")){
                        extraInfo = `<div class="btn btn-sm ak-disable ak-btn ak-riic-dorm" style="height:25px;margin:auto;padding:1px;padding-right:3px"><img src="img/ui/infrastructure/dorm.png" style="height:20px;padding-bottom:3px"> 宿舍 </div>`
                    }else if(element.buff[i].buffId.includes("hire")){
                        extraInfo = `<div class="btn btn-sm ak-disable ak-btn ak-riic-hire" style="height:25px;margin:auto;padding:1px;padding-right:3px"><img src="img/ui/infrastructure/hire.png" style="height:20px;padding-bottom:3px"> 办公室 </div>`
                    }else if(element.buff[i].buffId.includes("meet")){
                        extraInfo = `<div class="btn btn-sm ak-disable ak-btn ak-riic-meet" style="height:25px;margin:auto;padding:1px;padding-right:3px"><img src="img/ui/infrastructure/meet.png" style="height:20px;padding-bottom:3px"> 会议室 </div>`
    
                        if(element.buff[i].buffId.includes("meet_spd&team")){
                            let currbuff = db.building_buff[element.buff[i].buffId].description
                            // (element.buff[i].buffId.match(/\[.+?\]/g)|| []).map(function(str) { return str.slice(1,-1).slice(1,-1)});
                            
                            
                            // console.log(currbuff.indexOf("<@cc.kw>"))
                            
                            // console.log(currbuff.indexOf("<@cc.kw>"))
                            if(currbuff.indexOf("<@cc.kw>")>0){
                                let clue = ''
                                let muhRegex = /<@cc\.kw>(.*?)<\/>/g
                                currbuff = muhRegex.exec(currbuff)[1]
                                switch (currbuff) {
                                    case "莱茵生命": clue = 1;break;
                                    case "企鹅物流": clue = 2;break;
                                    case "黑钢国际": clue = 3;break;
                                    case "乌萨斯学生自治团": clue = 4;break;
                                    case "格拉斯哥帮": clue = 5;break;
                                    case "喀兰贸易": clue = 6;break;
                                    case "罗德岛制药": clue = 7;break;
                                }
                                extraInfo = `<div class="btn btn-sm ak-disable ak-btn ak-riic-meet" style="height:25px;margin:auto;padding:1px;padding-right:3px"><img src="img/ui/infrastructure/meet.png" style="height:20px;padding-bottom:3px">Meeting </div>
                                             <div class="btn btn-sm ak-disable ak-btn ak-riic-meet-clue" style="height:25px;margin:auto">${clue}</div>`
                            }
                        }
                    }
                    let req =``
                    // console.log(`Lv.${element.buff[i].cond.level}/ Elite ${element.buff[i].cond.phase}`)
                    if(element.buff[i].cond.level>1){
                        req = `Lv.${element.buff[i].cond.level}`
                    }
                    if(element.buff[i].cond.phase>0){
                        req = req + ` 精英 ${element.buff[i].cond.phase}`
                    }
                    if(req!=""){
                        req = `<div class="btn btn-sm ak-disable ak-btn" style="height:25px;margin:auto;padding:1px;background:#0078BC;">需要: ${req}</div>`
                    }
                    // console.log(req)     
                    currHtml.push(`<div class="ak-disable ak-c-black" style="padding:10px;margin:auto"><div style="padding:5px;background:#222">${extraInfo}  ${charaRiicTL?charaRiicTL[i].name: currBuff2.buffName} ${req}</div><div style="padding-left:20px">${charaRiicTL?charaRiicTL[i].desc:currBuff2.description}</div></div>` )
                }
            // }
            currHtml.push(`</div></div> `)
        });
        // console.log(currHtml)
        $("#tbody-list").html(currHtml.join(""))
    }
    function clickBtnClear(){
        console.log(lang);
        $("#tbody-list").html("")
    }
    
    // function 

    function query(db,key,val,single=true,returnKey=false){
        if(single){
            var result = {};
        } else {
            var result = [];
        }
        var found = false;
        $.each(db,function(key2,v){
            if(eval('v.'+key).toLowerCase() == val.toLowerCase()){
                found = true;
                if(single){
                    if(returnKey){
                        result[key2] = v;
                    } else {
                        result = v;
                    }
                    return false;
                } else {
                    if(returnKey){
                        var obj = {};
                        obj[key2] = v; 
                        result.push(obj);
                    } else {
                        result.push(v);
                    }
                }
            }
        });
        if(found){
            return result;
        } else {
            return false;
        }
    }

    function changeUILanguage(){
        reg = localStorage.gameRegion;
        lang = localStorage.webLang;

        $('#display-reg').text(reg.toUpperCase())
        
        switch (lang) {
            case "en":$('#display-lang').text("English");break;
            case "cn":$('#display-lang').text("Chinese");break;
            case "jp":$('#display-lang').text("Japanese");break;
        }
        
        localStorage.setItem("gameRegion", reg);
        localStorage.setItem("webLang", lang);
        getJSONdata("ui",function(data){
            if(data.length != 0){
                $.each(data, function(i,text){
                    $("[translate-id="+text.id).html(eval('text.ui_'+lang));
                });
            }
        });
    }

    function getJSONdata(type, callback){
        var x = 0;
        var req = $.getJSON("json/tl-"+type+".json");
        req.done(function(response){
            callback(response);
        });
        req.fail(function(response){
            console.log("type: "+type+" fail: ");
            console.log(response);
        });
    }