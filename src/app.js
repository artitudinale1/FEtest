const css = require('./app.scss');
const $ = require("jquery");

const PlayerStats = (function () {
  let init, callAjax, selectPlayer, displayStats, body = document.getElementById('app');

        init = function (event) {
           callAjax(event);
        };

        callAjax = function (event) {
          $.ajax({
            type: "GET",
            url: './data/player-stats.json',
            dataType: "json",
            crossDomain: true,
            success: function(ajaxData){
                    var data = ajaxData;
                    selectPlayer(data);
                    displayStats(data, '4916')
               },
            error: function(xhr, textStatus, errorThrown){
                      alert('request failed');
                    }
           });
        }
        // Function to convert data returned via ajax to HTML
        selectPlayer = function (data) {
          let header = document.createElement("header");
          let select = document.createElement("select");
          let option = document.createElement("option");

          body.appendChild(header);
          select.appendChild(option);
          select.appendChild(option);

          option.innerHTML = "Select a player...";
          option.value = "4916";
          for (let key in data.players){
            option = document.createElement("option");
            option.value = data.players[key].player.id;
            option.innerHTML = data.players[key].player.name.first + ' ' + data.players[key].player.name.last;
            select.appendChild(option);
          }
          header.appendChild(select);
           select.onchange = function (){ displayStats(data, select.value)}
        };

        displayStats = function (data, value) {
          //clean all playerData section
          if (document.getElementById('playerData')) {
            let element = document.getElementById('playerData');
            element.parentNode.removeChild(element);
          }
          //create new playerData
          let playerData = document.createElement("article");
          body.appendChild(playerData);
          playerData.setAttribute('id', 'playerData');

            for (let key in data.players){
              if(data.players[key].player.id == value ){
                //images section
                  let figure = document.createElement("figure");
                  playerData.appendChild(figure);
                  let staticPath = "/images/";
                  let img = document.createElement('img');
                  figure.appendChild(img);
                  img.setAttribute('src', staticPath + 'p' + data.players[key].player.id + '.png');

                  let icon = document.createElement('i');
                  figure.appendChild(icon)

                  icon.style.backgroundImage = "url('images/badges_sprite.png')";

                  let yValue = 0;
                  let xValue = 0;

                  switch (value){
                    case '2064':
                          yValue = -800;
                          xValue = -598;
                          icon.style.backgroundPosition = xValue +'px ' + yValue + 'px';
                          break;

                    case '4148':
                          yValue = -698;
                          xValue = -2001;
                          icon.style.backgroundPosition = xValue +'px ' + yValue + 'px';
                          break;

                    case '4916':
                          yValue = -1000;
                          xValue = -504;
                          icon.style.backgroundPosition = xValue +'px ' + yValue + 'px';
                          break;

                    case '4246':
                          yValue = -97;
                          xValue = 101;
                          icon.style.backgroundPosition = xValue +'px ' + yValue + 'px';
                          break;
                    case '8983':
                          yValue = 0;
                          xValue = 0;
                          icon.style.backgroundPosition = xValue +'px ' + yValue + 'px';
                          break;
                  }

                  // data section
                  let statsSection = document.createElement("section");
                  playerData.appendChild(statsSection);

                  let playerName = document.createElement("h1");
                  statsSection.appendChild(playerName);

                  let playerRule = document.createElement("p");
                  statsSection.appendChild(playerRule);

                  let list = document.createElement("ul");
                  statsSection.appendChild(list);
                  list.setAttribute('id', 'list');

                  data.players[key].stats.map((o, j)=> {
                    playerName.innerHTML= data.players[key].player.name.first + ' ' + data.players[key].player.name.last;
                    playerRule.innerHTML= data.players[key].player.info.positionInfo;

                    let stats = document.createElement("li");
                    stats.innerHTML = o.name.replace('_', ' ') + '  <span>' + o.value + '</span>';
                    stats.setAttribute("class", "stats");
                    document.getElementById("list").appendChild(stats);
                  });
                };
              };
            };
        return {
            init: init
        };
    })();

    PlayerStats.init();
