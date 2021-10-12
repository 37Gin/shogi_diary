function shogiBoard() {

  const canvas = document.getElementById('myCanvas');
  canvas.width = 700;
  canvas.height = 650;
  const ctx = canvas.getContext('2d');
  ctx.strokeStyle = "black";
  var inMotion = 0;
  const kansuuji = ["一","二","三","四","五","六","七","八","九","十"];
  var selectEnemy = 0;
  var message = "動かしたい駒をクリックしてください";
  var beforeMessage = "";

  var board = [];
  for (var i = 0; i <= 9; i ++) {
    board[i] = [];
    for (var j = 0; j <= 10; j ++) {
      board[i][j] = {type: 0, status: 0, is_enemy: 0};
    }
  }

  var outBoard = [];
  for (var is_enemy = 1; is_enemy <= 3; is_enemy ++) {
    // 1:先手 2:後手 3:盤外
    outBoard[is_enemy] = [];
    for (var j = 1; j <= 8; j ++) {
      outBoard[is_enemy][j] = {type: j, number: 0};
    }
  }

  var outBoardBox = [];
  for (var is_enemy = 1; is_enemy <= 3; is_enemy ++) {
    outBoardBox[is_enemy] = [];
    for (var i = 1; i <= 2; i ++) {
      outBoardBox[is_enemy][i] = [];
      for (var j = 1; j <= 10; j ++) {
        outBoardBox[is_enemy][i][j] = {type: 0};
      }
    }
  }

  function drawBoard() {
    // 升目を描く
    for (var suji = 1; suji <= 10; suji ++) {
      for (var dan = 1; dan <= 10; dan ++) {
        ctx.strokeStyle = "#000000";
        ctx.beginPath();
        ctx.moveTo(suji * 50 + 50, 50);
        ctx.lineTo(suji * 50 + 50, 500);
        ctx.moveTo(100, dan * 50);
        ctx.lineTo(550, dan * 50);
        ctx.stroke();
        ctx.closePath();
      }
    }

    // 筋、段を描く
    for (var i = 1; i <= 9; i ++) {
      ctx.beginPath();
      ctx.font = "28px ui-serif";
      ctx.fillText(i, (565 - i * 50), 45);
      ctx.fillText(kansuuji[i-1], 555, (i * 50) + 40);
      ctx.closePath();
    }

    // 持駒、盤外
    const stringSente = ["▲", "先", "手"];
    const stringGote = ["△","後","手"];
    for (i = 0; i <= 2; i ++) {
      ctx.beginPath();
      ctx.font = "32px ui-serif";
      ctx.fillText(stringSente[i], 600, 75 + (35 * i));
      ctx.closePath();
      ctx.beginPath();
      ctx.scale(-1, -1);
      ctx.fillText(stringGote[i], -90, - 475 + (35 * i));
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.closePath();
    }

    // 駒箱
    ctx.beginPath();
    ctx.moveTo(0, 530);
    ctx.lineTo(700, 530);
    ctx.moveTo(340, 530);
    ctx.lineTo(340, 650);
    ctx.stroke();
    ctx.closePath();

    //リセットボタン
    ctx.beginPath();
    ctx.font = "16px ui-serif";
    ctx.fillText("初期配置", 365, 570);
    ctx.fillText("全て駒箱へ", 480, 570);
    ctx.fillText("全て持駒へ", 590, 570);
    ctx.closePath();
    for (var x = 1; x <= 3; x ++) {
      startX = 350 + (x-1)*115;
      startY = 540;
      ctx.beginPath();
      ctx.moveTo(startX, startY);
      ctx.lineTo(startX + 110, startY);
      ctx.lineTo(startX + 110, startY + 50);
      ctx.lineTo(startX, startY + 50);
      ctx.lineTo(startX, startY);
      ctx.stroke();
      ctx.closePath();
    }

    //システムメッセージ
    ctx.beginPath();
    ctx.moveTo(340, 600);
    ctx.lineTo(700, 600);
    ctx.stroke();
    ctx.closePath();
  }

  function pieceType(type) {
    if (type == 1) { moji = "玉" }
    else if (type == 2) { moji = "飛" }
    else if (type == 3) { moji = "角" }
    else if (type == 4) { moji = "金" }
    else if (type == 5) { moji = "銀" }
    else if (type == 6) { moji = "桂" }
    else if (type == 7) { moji = "香" }
    else if (type == 8) { moji = "歩" }
    else if (type == 12) { moji = "竜" }
    else if (type == 13) { moji = "馬" }
    else if (type == 15) { moji = "全" }
    else if (type == 16) { moji = "圭" }
    else if (type == 17) { moji = "杏" }
    else if (type == 18) { moji = "と" }
    else { moji = "" }
  }

  // 盤上に駒を表示
  function showPieceInBoard() {
    ctx.font = "40px ui-serif";
    for (var suji = 1; suji <= 9; suji ++) {
      for (var dan = 1; dan <= 9; dan ++) {
        x = 550 - 50 * suji;
        y = 50 * dan;
        type = board[suji][dan].type;
        is_enemy = board[suji][dan].is_enemy;
        ctx.beginPath();
        ctx.clearRect(x + 1, y + 1, 48, 48);
        ctx.closePath();
        if (type != 0) {
          pieceType(type);
          if (is_enemy == 1) {
            ctx.beginPath();
            ctx.rect(x, y, 50, 50);
            ctx.fillText(moji, x+5, y+42);
            ctx.closePath();
          } else if (is_enemy == 2) {
            ctx.beginPath();
            ctx.scale(-1, -1);
            ctx.rect(-x, -y, -50, -50);
            ctx.fillText(moji, -(x + 45), -(y + 10));
            ctx.setTransform(1, 0, 0, 1, 0, 0);
            ctx.closePath();
          }
        }
      }
    }
  }

  // 盤外に駒を表示
  function showPieceOutBoard() {   
    ctx.font = "32px ui-serif";
    var boxX = 1;
    var boxY = 1;
    var ySente = 165;
    var xSente = 600;
    var yGote = -395;
    var xGote = -90;
    ctx.beginPath();
    ctx.clearRect(xSente, ySente, 70, 350);
    ctx.clearRect(-xGote, -yGote, -70, -350);
    ctx.clearRect(10, 540, 320, 105);
    ctx.closePath();

    for (var is_enemy = 1; is_enemy <= 2; is_enemy ++) {
      for (var x = 1; x <= 2; x ++) {
        for (var y = 1; y <= 10; y ++) {
          outBoardBox[is_enemy][x][y] = {type: 0};
        }
      }
    }

    for (var j = 1; j <= 8; j ++) {
      ctx.font = "32px ui-serif";
      pieceType(j);
      var numSente = outBoard[1][j].number;

      // 先手の持駒の表示
      if ( numSente != 0 && numSente <= 10) {
        if (ySente + (boxY + 1) * 35 >= 550) {
          boxX = 2;
          boxY = 1;
        }
        ctx.beginPath();           
        ctx.fillText(moji, xSente+(boxX-1)*35, ySente + boxY*35);
        ctx.closePath();
        outBoardBox[1][boxX][boxY].type = j;
        boxY += 1;
        if (numSente >= 2) {
          ctx.beginPath();
          ctx.fillText(kansuuji[numSente-1], xSente+(boxX-1)*35, ySente + boxY*35);
          ctx.closePath();
          outBoardBox[1][boxX][boxY].type = j;
          boxY +=1;
        }
      } else if(numSente > 10) {
        if (ySente + (boxY + 2) * 35 >= 550) {
          boxX = 2;
          boxY = 1;
        }
        ctx.beginPath();
        ctx.fillText(moji, xSente+(boxX-1)*35, ySente + boxY*35);
        ctx.fillText(kansuuji[9], xSente+(boxX-1)*35, ySente + (boxY+1)*35);
        ctx.fillText(kansuuji[numSente-10], xSente+(boxX-1)*35, ySente + (boxY+2)*35);
        ctx.closePath();
        outBoardBox[1][boxX][boxY].type = j;
        outBoardBox[1][boxX][boxY+1].type = j;
        outBoardBox[1][boxX][boxY+2].type = j;
        boxY +=2;
      }
    }

    boxX = 1;
    boxY = 1;

    for (var j = 1; j <= 8; j ++) {
      ctx.font = "32px ui-serif";
      pieceType(j);
      var numGote = outBoard[2][j].number;
      // 後手の持ち駒の表示
      if ( numGote != 0 && numGote <= 10) {
        if (yGote + (boxY + 1) * 35 >= (-10)) {
          boxX = 2;
          boxY = 1;
        }
        ctx.beginPath();
        ctx.scale(-1, -1);
        ctx.fillText(moji, xGote+(boxX-1)*35, yGote + boxY * 35);
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.closePath();
        outBoardBox[2][boxX][boxY].type = j;
        boxY += 1;
        if (numGote >= 2) {
          ctx.beginPath();
          ctx.scale(-1, -1);
          ctx.fillText(kansuuji[numGote-1], xGote+(boxX-1)*35, yGote + boxY* 35);
          ctx.setTransform(1, 0, 0, 1, 0, 0);
          ctx.closePath();
          outBoardBox[2][boxX][boxY].type = j;
          boxY += 1;
        }  
      } else if (numGote > 10) {
        if (yGote + (boxY + 2) * 35 >= (-10)) {
          boxX = 2;
          boxY = 1;
        }
        if (numGote > 10) {
          ctx.beginPath();
          ctx.scale(-1, -1);
          ctx.fillText(moji, xGote+(boxX-1)*35, yGote+ boxY* 35);
          ctx.fillText(kansuuji[9], xGote+(boxX-1)*35, yGote+ (boxY+1)* 35);
          ctx.fillText(kansuuji[numGote-10], xGote+(boxX-1)*35, yGote+ (boxY+2) * 35);
          ctx.setTransform(1, 0, 0, 1, 0, 0);
          ctx.closePath();
          outBoardBox[2][boxX][boxY].type = j;
          outBoardBox[2][boxX][boxY+1].type = j;
          outBoardBox[2][boxX][boxY+2].type = j;
          boxY += 2;
        }
      }
    }

    for (var i = 1; i <= 8; i ++) {
      pieceType(i);
      number = outBoard[3][i].number
      x = 10 + 40 * (i-1)
      y = 570
      ctx.beginPath();
      if (number >= 11) {
        ctx.fillText(moji, x, y);
        ctx.fillText(kansuuji[9], x, y + 35);
        ctx.fillText(kansuuji[number-10], x, y + 70);
      } else if (number >= 2) {
        ctx.fillText(moji, x, y);
        ctx.fillText(kansuuji[number-1], x, y + 35);
      } else if (number == 1) {
        ctx.fillText(moji, x, y);
      }
      ctx.closePath();
    }
  }

  function paintSquare(suji, dan, color) {
    suji = 550 - 50 * suji;
    dan = 50 * dan;
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(suji, dan);
    ctx.lineTo(suji + 50, dan);
    ctx.lineTo(suji + 50, dan + 50);
    ctx.lineTo(suji, dan + 50);
    ctx.lineTo(suji, dan);
    ctx.stroke();
    ctx.closePath();
  }

  function selectPiece(suji, dan, boxX, boxY, selectOutBoardType) {
    if ( 1 <= suji && suji <= 9 && 1 <= dan && dan <= 9 && board[suji][dan].status == 1) {
      startSuji = suji;
      startDan = dan;
      pieceType(board[suji][dan].type);
      message = moji + "を選択しました";
      paintSquare(suji, dan, "#FF0000");
      inMotion = 1;
    } else if ( 1 <= boxX && boxX <= 2 && 1 <= boxY && boxY <= 10) {
      if (selectEnemy == 1) {
        selectType = outBoardBox[1][boxX][boxY].type;
        pieceType(selectType);
        message = "先手の持駒「" + moji + "」を選択しました";
      } else if (selectEnemy == 2) {
        selectType = outBoardBox[2][boxX][boxY].type;
        pieceType(selectType);
        message = "後手の持駒「" + moji + "」を選択しました";
      }
      inMotion = 2;
    } else if (selectOutBoardType >= 1 && selectOutBoardType <= 8) {
      pieceType(selectOutBoardType);
      selectType = selectOutBoardType;
      inMotion = 3;
      message = "駒箱の" + moji + "を選択しました";
    }
  }

  function movePiece(selectSuji, selectDan) {
    endSuji = selectSuji;
    endDan = selectDan;
    pieceType(board[startSuji][startDan].type);
    if (board[endSuji][endDan].status == 0) {
      board[endSuji][endDan].type = board[startSuji][startDan].type;
      board[endSuji][endDan].status = 1;
      board[endSuji][endDan].is_enemy = board[startSuji][startDan].is_enemy;
      board[startSuji][startDan].type = 0;
      board[startSuji][startDan].status = 0;
      board[startSuji][startDan].is_enemy = 0;
      message = moji + "を" + endSuji + kansuuji[endDan - 1] + "へ移動しました。";
    // 移動先に相手の駒があるときの処理
    } else if (
      board[endSuji][endDan].status == 1 && 
      board[endSuji][endDan].is_enemy != board[startSuji][startDan].is_enemy
    ) {
      if (board[endSuji][endDan].type > 10) {
          board[endSuji][endDan].type -= 10;
      }
      if (board[endSuji][endDan].is_enemy == 1) {
          outBoard[2][board[endSuji][endDan].type].number += 1;
      } else if (board[endSuji][endDan].is_enemy == 2) {
          outBoard[1][board[endSuji][endDan].type].number += 1;
      }
      pieceType(board[endSuji][endDan].type);
      board[endSuji][endDan].type = board[startSuji][startDan].type;
      board[endSuji][endDan].status = 1;
      board[endSuji][endDan].is_enemy = board[startSuji][startDan].is_enemy;
      board[startSuji][startDan].type = 0;
      board[startSuji][startDan].status = 0;
      board[startSuji][startDan].is_enemy = 0;
      message = moji + "を取りました";
    }
  }

  function removePiece() {
    pieceType(board[startSuji][startDan].type);
    outBoard[3][board[startSuji][startDan].type].number += 1;
    board[startSuji][startDan].type = 0;
    board[startSuji][startDan].status = 0;
    board[startSuji][startDan].is_enemy = 0;
    message = moji + "を駒箱へ移動しました";
  }

  function hitPiece(suji, dan) {
    pieceType(selectType);
    if ( 9 >= suji && suji >= 1 && 9 >= dan && dan >= 1 && board[suji][dan].status == 0) {
      board[suji][dan] = {type: selectType, status: 1, is_enemy: selectEnemy};
      outBoard[selectEnemy][selectType].number -= 1;
      message = moji + "を" + suji + kansuuji[dan-1] + "へ打ちました";
      showPieceInBoard();
      showPieceOutBoard();
    }
  }

  function joinPiece(suji, dan) {
    pieceType(selectType);
    if ( 9 >= suji && suji >= 1 && 9 >= dan && dan >= 1 && board[suji][dan].status == 0) {
      board[suji][dan] = {type: selectType, status: 1, is_enemy: 1};
      outBoard[3][selectType].number -= 1;
      message = moji + "を盤上に戻しました";
      showPieceInBoard();
      showPieceOutBoard();
    }
  }

  function resetPiece() {
    for (var i = 1; i <= 9; i ++) {
      for (var j = 1; j <= 10; j ++) {
        board[i][j] = {type: 0, status: 0, is_enemy: 0};
      }
    }
  }

  function resetOutBoardPiece() {
    for (var is_enemy = 1; is_enemy <= 3; is_enemy ++) {
      for (var j = 1; j <= 8; j ++) {
        outBoard[is_enemy][j] = {type: j, number: 0};
      }
    }
  }

  function setPiece() {
    resetPiece();
    resetOutBoardPiece();
    board[9][9] = {type: 7, status: 1, is_enemy: 1};
    board[8][9] = {type: 6, status: 1, is_enemy: 1};
    board[7][9] = {type: 5, status: 1, is_enemy: 1};
    board[6][9] = {type: 4, status: 1, is_enemy: 1};
    board[5][9] = {type: 1, status: 1, is_enemy: 1};
    board[4][9] = {type: 4, status: 1, is_enemy: 1};
    board[3][9] = {type: 5, status: 1, is_enemy: 1};
    board[2][9] = {type: 6, status: 1, is_enemy: 1};
    board[1][9] = {type: 7, status: 1, is_enemy: 1};
    board[8][8] = {type: 3, status: 1, is_enemy: 1};
    board[2][8] = {type: 2, status: 1, is_enemy: 1};
    board[9][1] = {type: 7, status: 1, is_enemy: 2};
    board[8][1] = {type: 6, status: 1, is_enemy: 2};
    board[7][1] = {type: 5, status: 1, is_enemy: 2};
    board[6][1] = {type: 4, status: 1, is_enemy: 2};
    board[5][1] = {type: 1, status: 1, is_enemy: 2};
    board[4][1] = {type: 4, status: 1, is_enemy: 2};
    board[3][1] = {type: 5, status: 1, is_enemy: 2};
    board[2][1] = {type: 6, status: 1, is_enemy: 2};
    board[1][1] = {type: 7, status: 1, is_enemy: 2};
    board[2][2] = {type: 3, status: 1, is_enemy: 2};
    board[8][2] = {type: 2, status: 1, is_enemy: 2};
    for (var suji = 1; suji <= 9; suji ++) {
      board[suji][7] = {type: 8, status: 1, is_enemy: 1};
      board[suji][3] = {type: 8, status: 1, is_enemy: 2};
    }
  }

  function setMochigoma() {
    resetPiece();
    resetOutBoardPiece();
    for (var i = 1; i <= 2; i ++) {
      for (var j = 1; j <= 8; j ++) {
        if ( j == 8) {
          outBoard[i][j] = {type: j, number: 9};
        } else if ( j >= 4) {
          outBoard[i][j] = {type: j, number: 2};
        } else if ( j >= 1) {
          outBoard[i][j] = {type: j, number: 1};
        }
      }
    }
  }

  function removeAllPieces() {
    resetPiece();
    resetOutBoardPiece();
    for (var i = 1; i <= 8; i ++) {
      if ( i == 8) {
        outBoard[3][i] = {type: i, number: 18};
      } else if ( i >= 4) {
        outBoard[3][i] = {type: i, number: 4};
      } else if ( i >= 1) {
        outBoard[3][i] = {type: i, number: 2};
      }
    }
  }

  function showMessage() {
    ctx.beginPath();
    ctx.clearRect(345, 605, 350, 45);
    ctx.font = "16px ui-serif";
    ctx.fillText("・" + message, 350, 620);
    ctx.fillText("・" + beforeMessage, 350, 645);
    ctx.closePath();
    beforeMessage = message;
  }

  // 駒を選択する
  function selectBoard(e) {
    message = "動かしたい駒をクリックしてください";
    var rect = e.target.getBoundingClientRect();
    x = e.clientX - rect.left;
    y = e.clientY - rect.top;
    var selectSuji = 0;
    var selectDan = 0;
    var selectBoxX = 0;
    var selectBoxY = 0;
    var selectOutBoardType = 0;

    for (var suji = 1; suji <= 9; suji ++) {
      for (var dan = 1; dan <= 9; dan ++) {
        if ( x > 550 - 50 * suji && x < 550 - 50 * (suji - 1) && y > 50 * dan && y < 50 * (dan + 1)) {
          selectSuji = suji;
          selectDan = dan;
        }
      }
    }

    for (var boxX = 1; boxX <= 2; boxX ++) {
      for (var boxY = 1; boxY <= 10; boxY ++) {
        if ((600 + 35 * (boxX - 1) < x && x < 600 + (35 * boxX)) && (165 + 35 * (boxY - 1) < y && y < 165 + (35 * boxY)) ) {
          selectBoxX = boxX;
          selectBoxY = boxY;
          selectEnemy = 1;
        } else if ((90 - 35 * (boxX - 1) > x && x > 90 - (35 * boxX)) && (395 - 35 * (boxY - 1) > y && y > 395 - (35 * boxY))) {
          selectBoxX = boxX;
          selectBoxY = boxY;
          selectEnemy = 2;
        }
      }
    }

    for (var i = 1; i <= 8; i ++) {
      if ((10+40*(i-1) < x && x < 10 + 40*i) && (540 < y && y < 580)) {
        number = outBoard[3][i].number
        if (number >= 1) {
          selectOutBoardType = outBoard[3][i].type;
        }
      }
    }

    if ( 0 < x && x < 340 && 530 < y && y < 700) {
      selectSuji = 10;
      selectDan = 10;
    }

    if (540 < y && y < 590) {
      if ( 350 < x && x < 455 ) {
        setPiece();
        message = "初期配置に戻しました";
      } else if ( 460 < x && x < 575 ) {
        removeAllPieces();
        message = "すべての駒を駒箱へ移動しました";
      } else if ( 580 < x && x < 695 ) {
        setMochigoma();
        message = "すべての駒を持駒へ移動しました";
      }
    }

    canvas.oncontextmenu = function() {
      selectType = board[selectSuji][selectDan].type;
      selectIsEnemy = board[selectSuji][selectDan].is_enemy;
      if (selectType == 1 || selectType == 4) {
          if (selectIsEnemy == 1) {
          board[selectSuji][selectDan].is_enemy = 2;
        } else if (selectIsEnemy == 2) {
          board[selectSuji][selectDan].is_enemy = 1;
        }
      } else if (selectType >= 2 && selectType <= 8) {
        board[selectSuji][selectDan].type += 10;
      } else if ( selectType >= 12 && selectType <= 18 ) {
        board[selectSuji][selectDan].type -= 10;
        if (selectIsEnemy == 1) {
        board[selectSuji][selectDan].is_enemy = 2;
        } else if (selectIsEnemy == 2) {
          board[selectSuji][selectDan].is_enemy = 1;
        }
      }
    showPieceInBoard();
    return false;
    }

    if (inMotion == 0) {
      selectPiece(selectSuji, selectDan, selectBoxX, selectBoxY, selectOutBoardType);
    } else if (inMotion == 1 && 1 <= selectSuji && selectSuji <= 9 && 1 <= selectDan && selectDan <= 9 ) {
      movePiece(selectSuji, selectDan);
      paintSquare(startSuji, startDan, "#000000");  
      inMotion = 0;
    } else if (inMotion == 1 && selectSuji == 10 && selectDan == 10 ) {
      removePiece();
      paintSquare(startSuji, startDan, "#000000");
      inMotion = 0;
    } else if (inMotion == 2 && 1 <= selectSuji && selectSuji <= 9 && 1 <= selectDan && selectDan <= 9 ) {
      hitPiece(selectSuji, selectDan);
      inMotion = 0;
    } else if (inMotion == 3) {
      joinPiece(selectSuji, selectDan);
      inMotion = 0;
    }

    showPieceInBoard();
    showPieceOutBoard();
    showMessage();
  }

  drawBoard();
  setPiece();
  showPieceInBoard();
  showPieceOutBoard();
  canvas.addEventListener('click', selectBoard, false);
  showMessage();

  document.getElementById('download-link').addEventListener('click', (e) => {
  // data:URLを自身のリンク先として設定すると、このあとダウンロードされる
  canvas.height = 525;
  drawBoard();
  showPieceInBoard();
  showPieceOutBoard();
    const a = e.target;
    a.href = canvas.toDataURL(); // Canvasからdata:URLを取得
    a.download = new Date().getTime() + '.png'; // ダウンロードファイル名はタイムスタンプに設定
  canvas.height = 650;
  drawBoard();
  showPieceInBoard();
  showPieceOutBoard();
  });
}

window.addEventListener('DOMContentLoaded', (event) => {
  shogiBoard();
});
