

$(document).ready(function(){
    let dropdown = []
	dropdown.push({name:"首页",content:"index.html"})
    dropdown.push({
        name:"计算器",
        content:[
            {
                href:"akhr.html",
                name:"公开招募计算器",
            },{
                href:"aklevel.html",
                name:"升级消耗计算器"
            },{
                href:"akevolve.html",
                name:"精英材料计算器"
            }]
    })
    dropdown.push({
        name:"资讯",
        content:[
        {
            href:"akhrchars.html",
            name:"干员资料"
        },{
            href:"akenemy.html",
            name:"敌人资料"
        },{
            href:"akriic.html",
            name:"基建技能"
        }]
    })
    dropdown.push({name:"精英所需材料查询",content:"akhrelite.html"})
    dropdown.push({name:"指南",content:"akguide.html"})
    dropdown.push({name:"主线故事",content:"akstory.html"})
    dropdown.push({
        name:"其他",
        content:[
        {
            href:"aklinker.html",
            name:"bilibili Linker"
        }]
    })
    // console.log(window.location.href.split("/")[window.location.href.split("/").length-1])
    let currentHtml= window.location.href.split("/")[window.location.href.split("/").length-1];
    let navDropdown = []
    dropdown.forEach(drop => {

        let isCurrent = undefined
        let isGroup = undefined
        
        // console.log(typeof drop.content)
        if(typeof drop.content == "string"){
            if(currentHtml.includes(drop.content)) {
                isGroup = true;
            }
            navDropdown.push(`
            <li class="nav-item ${isGroup?"active":""}">
                <a class="nav-link " href="${drop.content}">${drop.name}</a>
            </li> 
            `)
        }else{
            drop.content.forEach(dropelement => {
                if(currentHtml.includes(dropelement.href)) {
                    isCurrent=dropelement.name;
                    isGroup = true;
                }
                
            })
            isCurrent = isCurrent?isCurrent:"展开"
            navDropdown.push(`
            <li class="nav-item dropdown ${isCurrent!="menu"&&isGroup?"active":""}">
            <a class="nav-link dropdown-toggle" style="display:inline-flex;padding-left:25px;"href="#" id="regionDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true" >
                    <div class="ak-subtitle ak-disable">${drop.name}</div>
            `)
            
            
            // console.log(isCurrent)
            navDropdown.push(`
                    <div class="ak-disable ">${isCurrent}</div>
                    </a>
                    <div class="dropdown-menu" aria-labelledby="navbarDropdown">
            `)
            // console.log(navDropdown)
            drop.content.forEach(dropelement => {
                navDropdown.push(`
                <a class="dropdown-item" href="${dropelement.href}" >${dropelement.name}</a>
                `)
            });
            navDropdown.push(`</div>`)
        }
    })
    let html = `
    <img src="./img/factions/logo_rhodes.png" width="40" height="40" style="transform:scale(1.2,1.2)translate(-8px,1px)"class="d-inline-block align-top" alt="">
        <a class="navbar-brand" href="#" translate-id="topbar-1">明日方舟工具箱</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav"
                aria-controls="navbarNav" aria-expanded="false" aria-label="展开">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse justify-content-between" id="navbarNav">
            <ul class="navbar-nav">
                    ${navDropdown.join("")}
                    
                    
                </ul>
            <ul class="navbar-nav ml-auto">

                <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" style="display:inline-flex;padding-left:25px;"href="#" id="regionDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true" >
                                <div class="ak-subtitle ak-disable" translate-id="language-1">服务器</div>
                                <div class="ak-disable" id="display-reg">CN</div>
                        </a>
                        
                        <div class="dropdown-menu" aria-labelledby="navbarDropdown" style="display: none;">
                            <a class="dropdown-item reg unselectable" onclick="regDropdown($(this))" value="cn">中国</a>
                        </div>
                    </li>
                <li class="nav-item dropdown" style="display: none;">
                    <a class="nav-link dropdown-toggle" style="display:inline-flex;padding-left:25px"href="#" id="languageDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                            <div class="ak-subtitle ak-disable" translate-id="language-2">Language</div>
                            <div class="ak-disable" id="display-lang">English</div>
                    </a>
                    <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                        <a class="dropdown-item lang unselectable" onclick="langDropdown($(this))" value="cn">Chinese</a>
                        <a class="dropdown-item lang unselectable" onclick="langDropdown($(this))" value="en">English</a>
                        <a class="dropdown-item lang unselectable" onclick="langDropdown($(this))" value="jp">Japanese</a>
                    </div>
                </li>
            </ul>
        </div>
    `
    $('#aknav').html(html)
})
