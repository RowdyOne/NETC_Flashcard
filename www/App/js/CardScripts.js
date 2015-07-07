/*
 * Primary Data Handler and script routines used by the
 * NETC FlashCard App
 * Created: 1 Jun 2015
 * Naval Education Training Command
 * Original Author: Rowdy Lienhart
 */
 
  
  // Global Constants 
  var gc_ConfigFileName = 'App/FlashCards.cfg';
 // var gc_DB_CardDeckFilename = 'Deck/1.6 Flash Cards - tabs - subset.txt';
  var gc_DB_CardDeckFilename = 'Deck/1.6 Flash Cards.txt';
  // not used - var gc_DB_CardsShownFileName = 'Deck/Database/CardsShown.txt';
  var gc_DB_DeckStatusFileName = 'Deck/Database/DeckStatus.txt';
  var gc_ConfigRemark = '#';
  var gc_DB_ImagePathPrefix = 'Deck/Images/'; // corrects for image path entries in the database
  
  var gc_Q_DeckDisplay_idx_ReadyNotShown = 0;
  var gc_Q_DeckDisplay_idx_ReadyEasy = 1;
  var gc_Q_DeckDisplay_idx_ReadyHard = 2;
  var gc_Q_DeckDisplay_idx_Previous = 3;
//  var gc_Q_DeckDisplay_idx_ShownEasy = 3;
//  var gc_Q_DeckDisplay_idx_ShownHard = 4;
  
  var gc_CardDeck_Idx_Col_CardNum = 0;
  var gc_CardDeck_Idx_Col_Picture = 1;
  var gc_CardDeck_Idx_Col_Question = 2;
  var gc_CardDeck_Idx_Col_Answer = 3;
  var gc_CardDeck_Idx_Col_Facts = 4;
  var gc_CardDeck_Idx_Col_Type = 5;
  
  var gc_Card_TotalElements = 6;
  var gc_Card_MinElement = 2;
  
      
  // Global Variables
  var g_bool_ValidAPI_Support = false;
  var g_Device_Type;  // a string value used in generating the custom html on a new web page
  
      // From the config File...
  var g_AppName;
  var g_DeckTitle;
  var g_CourseName;
  var g_AppVersion;
  var g_TextDelimiter;
  var g_CourseCreateDate;
  
    // card deck support
  var g_CardDeckArray = [];
  var g_CardShowQueue = [];
  var g_CardTypeDisplay = [];  // this will show on the screen as "not shown", "easy", or "hard"
  var g_CurrentShowSide = -1;
  var g_CurrentShowIdx = -1;
  var g_CurrentShowQ = -1;
  var g_CardShowQueueSize = [];
  var g_CardCount = 0;
  var g_Prev_Idx = -1; // a negative number means no card exists
  var g_Prev_Q = -1;  // just initializing the queue
  var g_isShowingPrevious = false;

  var g_StatisticsDisplayed = false;
  var g_StatisticsHideButtons1 = '';
  var g_StatisticsHideButtons2 = '';
  
  var g_HowUseDisplayed = false;
  var g_homepagedata = '';
  
  // see if this is an apple or android device
  var isAndroid = (/android/gi).test(navigator.appVersion),
      isApple = (/iphone|ipad/gi).test(navigator.appVersion);
      
  var prevX, prevY; // captured when the screen is touched    
  var g_TouchDist=0;
  

// ****************************************************************************
// ****************************************************************************
// ****************************************************************************
// ****************************************************************************
// ****************************************************************************
  
  function InitHomePage()
    {
     var t;
     var retval = checkFileAPI();
	       if (retval)
	         { /* datablock.innerHTML = 'it worked';  */ 
	         g_bool_ValidAPI_Support = true; 
	         }
	      //  else
	      //   { /* datablock.innerHTML = 'no working!'; */}       
        
      // go read the config file and parse into the correct global variables
     if (g_bool_ValidAPI_Support)
      {	 ReadConfigFile() 
      }
      else
      { g_appName = "This device is not supported"; } 
       // set the values on the home page
     t = document.getElementById('AppName');
     t.innerHTML = g_AppName;
     t = document.getElementById('DeckName');
     t.innerHTML = g_DeckTitle;
     t = document.getElementById('CourseName');
     t.innerHTML = g_CourseName;
     
     
     document.addEventListener('touchmove', function(e) { e.preventDefault(); }, false);
    }
  
  
// **************************************************************************** 
   function checkFileAPI()
    {
	       if (window.File && window.FileReader && window.FileList)
	         {
	           reader = new FileReader();
	           //alert ('have good file reader');
	           return true;
	         }
	         else
	         {
	           alert ('The File APIs are not fully supported by this browser.  Fallback required?');
	           return false;
	         }
    } // checkFileAPI
    
    
// ****************************************************************************  
  function InitFlashCardPage()
   { 
     var t;
     ReadConfigFile();
     t = document.getElementById('AppDeckName');
     t.innerHTML = g_DeckTitle + " <br> " +  g_CourseName;
     // create the card array and the queue array
     g_CardDeckArray = Create2DArray(gc_Card_TotalElements);
     g_CardShowQueue = Create2DArray(4); // there are 5 queues for displaying cards
     
     // initialize the queues
     Q_initAllQueuesEmpty();
     g_CardTypeDisplay[gc_Q_DeckDisplay_idx_ReadyNotShown] = "New Card";
     g_CardTypeDisplay[gc_Q_DeckDisplay_idx_ReadyEasy] = "Easy Card";
     g_CardTypeDisplay[gc_Q_DeckDisplay_idx_ReadyHard] = "Previously Tough Card";
     
     
     ReadCardDeck();  // get all of the cards
     ReadDeckStatus(); // and when all of the cards were displayed
     
     ShowNewCard();   
     
     // these work to remove page scroll
     //     document.addEventListener('touchmove', function(e) { e.preventDefault(); }, false);
     //  this next line goes in the config.xml line and also disables the scroll
     //    <preference name="DisallowOverscroll" value="true" /> 
 
     document.addEventListener('touchmove', function(e) { e.preventDefault(); }, false);  // stops the page from scrolling
         
     document.addEventListener('touchstart', function(e) { event_HandleTouchStart(e); }, false);  // works!!!!!
     
     document.addEventListener('touchend', function(e) { event_HandleTouchEnd(e); }, false);  // works!!!!!!
     
     //document.addEventListener('touchleave', function(e) { alert("twiped leave"); }, false);  // does not work ----
   }
  

// ****************************************************************************  
  function Create2DArray(inRows)  // define how many data elements in the 2d array
   {
     var newarray = []
     for (var i =0; i<inRows ; i++)
       { newarray[i] = []; }  // i don't care how many cards there are - just the data elements for each card
     return newarray;  
   }
  

// ****************************************************************************   
  function ReadConfigFile()
    {
      var filecontents;
      //var lines;
      var oneline;
      
      // initialize the variables first
       g_AppName = '';
       g_DeckTitle = '';
       g_CourseName = '';
       g_AppVersion = '';
       g_TextDelimiter = '';
       g_CourseCreateDate = '';
       
       // Open the text file and read each line
       filecontents = ReadTextFile(gc_ConfigFileName);
      // alert ("Config = " + filecontents);
       var lines = filecontents.split('\n');

       for (var i = 0 ; i<lines.length; i+=1)
       { 
          ParseConfigLine(lines[i]); 
       }
    }


// **************************************************************************** 
  function ParseConfigLine(inLine)
    {
      var newline;
      var lineparts;
      // take the line and parse it into two parts
      // a variable name equals a value
      // 
      if (inLine.charAt(0) != '#')
      { 
        newline = inLine.trim();
        if (newline.length > 0)
        { 
          // alert ('one line is ' + newline); 
           lineparts = newline.split('=');
           if (lineparts.length == 2)  // must have a variable and a value assigned
           { AssignConfigVars(lineparts[0], lineparts[1]); }
        }
      }
    }
    

// ****************************************************************************     
  function AssignConfigVars (inVar, inVarVal)
   { 
     // alert ('variable assignment is ' + inVar + "=" + inVarVal);
      inVarTrim = inVar.trim();
      inVarValTrim = inVarVal.trim();
      
      // now compare the values and assign accordingly
      if (inVarTrim == "App_Version")
        {  g_AppVersion = inVarValTrim; }
      if (inVarTrim == "App_Name")
        {  g_AppName = inVarValTrim; }
      if (inVarTrim == "Deck_Title")
        {  g_DeckTitle = inVarValTrim; }
      if (inVarTrim == "Create_Date")
        {  g_CourseCreateDate = inVarValTrim; }
      if (inVarTrim == "Deck_Version")
        {  }
      if (inVarTrim == "Course_Name")
        {  g_CourseName = inVarValTrim; }
      if (inVarTrim == "TextField_Delimiter")
        {  g_TextDelimiter = inVarValTrim; }
   }
    

// ****************************************************************************      
  function ReadTextFile(file)
   {
    var retval = ''
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, false);
    rawFile.onreadystatechange = function ()
    {
        if(rawFile.readyState === 4)
        {
            if(rawFile.status === 200 || rawFile.status == 0)
            {
                var allText = rawFile.responseText;
                retval = allText;
               // alert(retval);
            }
        }
    }
    rawFile.send(null);
    return retval;
  }
  

// ****************************************************************************       
  function ReadCardDeck()
  {
    var filecontents;
    filecontents = ReadTextFile(gc_DB_CardDeckFilename);
          // alert ("Config = " + filecontents);
    if (filecontents.length > 0)
     {      
       var lines = filecontents.split('\n');

       for (var i = 0 ; i<lines.length; i+=1)
       { 
          ParseDeckLine(lines[i]); 
       }
     } 
    g_CurrentShowSide = 1; // start at the beginning   
   // ShowNewCard();   
  }
  

// ****************************************************************************
  function ParseDeckLine(inLine)
    {
      var newline;
      var lineparts;
      var i;
      // take the line and parse it into two parts
      // a variable name equals a value
      // 
      if (inLine.charAt(0) != '#')
      { 
        newline = inLine.trim();
        if (newline.length > 10)  // some arbitrary length that guarantees some data is in the line
        { 
          // alert ('one line is ' + newline); 
           lineparts = newline.split('\t'); //g_TextDelimiter);
           if (lineparts.length == gc_Card_TotalElements)  // must have a variable and a value assigned
           { 
              /// AssignConfigVars(lineparts[0], lineparts[1]); 
              // alert (' found a valid card in the deck! ' + lineparts[2] );
              
              // okay, now we have a valid card - store it in the array!
              for (i = 0; i<gc_Card_TotalElements; i++)
                {
                  //if (g_CardCount < 2) {alert('found' + lineparts[i]);}
                  g_CardDeckArray[i][g_CardCount] = lineparts[i].trim();
                  
                } 
                g_CardCount++; 
                
           }
        }
      }
    }
    
    
// ****************************************************************************      
  function ReadDeckStatus()
  {
  /*
   var filecontents;
    filecontents = ReadTextFile(gc_DB_DeckStatusFileName);
    
    if (filecontents.length > 0)
      {
         alert("data found" + filecontents);
         
      }
     else  
      {
        Q_initEmptyStatus ();  // todo - remove shortcut and use if the status file is empty
        // write the new status queue information out to the file
        WriteDeckStatus();
      }
      */
      Q_initEmptyStatus (); // shortcut this for now - need to research file writing
  }
  
    
    
// ****************************************************************************      
/*
    document.addEventListener("deviceready", onDeviceReady, false);

    // device APIs are available
    //
    function onDeviceReady() {
    alert('device is ready');
        window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, gotFS, fail);
    }

    function gotFS(fileSystem) {
        fileSystem.root.getFile(gc_DB_DeckStatusFileName, {create: true, exclusive: false}, gotFileEntry, fail);
    }

    function gotFileEntry(fileEntry) {
        fileEntry.createWriter(gotFileWriter, fail);
    }

    function gotFileWriter(writer) {
    alert("got writer");
        writer.onwriteend = function(evt) {
            console.log("contents of file now 'some sample text'");
            writer.truncate(11);
            writer.onwriteend = function(evt) {
                console.log("contents of file now 'some sample'");
                writer.seek(4);
                writer.write(" different text");
                writer.onwriteend = function(evt){
                    console.log("contents of file now 'some different text'");
                }
            };
        };
        writer.write("some sample text");
    }

    function fail(error) {
        console.log(error.code);
    }


*/















  function WriteDeckStatus()
  {
  
  /*
    alert('writing deck');
    var outval = 'willthiswork?????';
    var rawFile = new XMLHttpRequest();

    rawFile.open("GET", gc_DB_DeckStatusFileName, false);
    rawFile.onreadystatechange = function ()
    {
     }
     
    rawFile.send(outval);
    return outval;
    */
  }
  
    
  
// ****************************************************************************  
  function ParseStatusLine(inLine)
    {
      var newline;
      var lineparts;
      // take the line and parse it into two parts
      // a variable name equals a value
      // 
      if (inLine.charAt(0) != '#')
      { 
        newline = inLine.trim();
        if (newline.length > 0)
        { 
          // alert ('one line is ' + newline); 
           lineparts = newline.split('\t');
           if (lineparts.length == 80)  //this isn't used yet anyhow
           { AssignConfigVars(lineparts[0], lineparts[1]); }
        }
      }
    }
    



// ****************************************************************************
  function StoreEasyCard()
   {
     // gCardPrevious = -1
     
    // alert("storing Q=" + g_CurrentShowQ + " & idx=" + g_CurrentShowIdx + " val=" + g_CardShowQueue[g_CurrentShowQ][g_CurrentShowIdx]);
     
 //    showqueuestuff();
     
     g_CardShowQueue[gc_Q_DeckDisplay_idx_ReadyEasy][g_CardShowQueueSize[gc_Q_DeckDisplay_idx_ReadyEasy]] = g_CardShowQueue[g_CurrentShowQ][g_CurrentShowIdx];  // this card
     g_CardShowQueue[g_CurrentShowQ][g_CurrentShowIdx] = -1;  // empty this cell out
     g_CardShowQueueSize[gc_Q_DeckDisplay_idx_ReadyEasy]++;
     g_CardShowQueueSize[g_CurrentShowQ]--; // removed one element from the current queue
     
 //    showqueuestuff();
     
     Q_CompressAll();
//      Q_Balance();  
     
 //    showqueuestuff();
     
     ShowNewCard();
   }
   

// ****************************************************************************
  function StoreHardCard()
   {
     // gCardPrevious = -1
     
     g_CardShowQueue[gc_Q_DeckDisplay_idx_ReadyHard][g_CardShowQueueSize[gc_Q_DeckDisplay_idx_ReadyHard]] = g_CardShowQueue[g_CurrentShowQ][g_CurrentShowIdx];  // this card
     g_CardShowQueue[g_CurrentShowQ][g_CurrentShowIdx] = -1;  // empty this cell out
     g_CardShowQueueSize[gc_Q_DeckDisplay_idx_ReadyHard]++;
     g_CardShowQueueSize[g_CurrentShowQ]--; // removed one element from the current queue
     
     Q_CompressAll();
 //     Q_Balance();  
     ShowNewCard();
   }


// **************************************************************************** 
  function ShowNewCard()
   {
//     var g_CurrentShowQ = 0;  // one of(0 1 2)
     var tmp;
     var isRecent = true;
     var loopcnt = 0;
     var i;
     
   if (!g_StatisticsDisplayed)
   {  
     if (g_isShowingPrevious)
     {
       ShowPrevCard_next();
     }
     else
     {
      isRecent = true;
      loopcnt=0;
      while (isRecent && (loopcnt < 5))  // only try a few times before giving up
      { 
         loopcnt++;
         isRecent = false;
         GetCardNumber();
         // check to see if this was displayed recently
         
//       showqueuestuff();
         for (i=g_CardShowQueueSize[gc_Q_DeckDisplay_idx_Previous] - 10 ; i < g_CardShowQueueSize[gc_Q_DeckDisplay_idx_Previous] ; i++)
         {
           if (i >= 0)
           {
             if (g_CardShowQueue[gc_Q_DeckDisplay_idx_Previous][i] == g_CardShowQueue[g_CurrentShowQ][g_CurrentShowIdx])
              {
                isRecent = true;
              }
          }
         }
         }
      }  
  //   alert("newcard1 Q=" + g_CurrentShowQ + " & idx=" + g_CurrentShowIdx + " val=" + g_CardShowQueue[g_CurrentShowQ][g_CurrentShowIdx]);
     
     
     g_CurrentShowSide = 1;   
     //  whatif the slide is blank? - add error correction on the side value
     tmp = g_CardDeckArray[g_CurrentShowSide][g_CardShowQueue[g_CurrentShowQ][g_CurrentShowIdx]];
     if (tmp.length < 5)
       { FlipCard(false, 0); }
     ShowCardSide(g_CurrentShowSide,g_CurrentShowIdx, g_CurrentShowQ);
     
     // and finally, store this card into the Previous Queue
     if (!g_isShowingPrevious)
       { StorePreviousCard (); }
        
  //   alert("newcard2 Q=" + g_CurrentShowQ + " & idx=" + g_CurrentShowIdx + " val=" + g_CardShowQueue[g_CurrentShowQ][g_CurrentShowIdx]);
    } // if the statistics are not displayed 
   }    
   


function GetCardNumber()
 {
   var tmp
   // there are 3 possible queue configurations - pull from one of the queues first
       if (g_CardShowQueueSize[gc_Q_DeckDisplay_idx_ReadyNotShown] > 0)  // if cards exist in the not shown queue
       {
         tmp = Math.random();
         if (tmp < 0.5)
           { g_CurrentShowQ = gc_Q_DeckDisplay_idx_ReadyNotShown; }
          else
           {
             if (tmp > 0.9)
               { g_CurrentShowQ = gc_Q_DeckDisplay_idx_ReadyEasy; }
              else // the tmp value is between 0.5 and 0.9
               { g_CurrentShowQ = gc_Q_DeckDisplay_idx_ReadyHard; }
           }
       }
      else
       {
         if (g_CardShowQueueSize[gc_Q_DeckDisplay_idx_ReadyHard] > 0)  // all cards are easy or hard - do hard cards exist?
           {
             if (Math.random() < 0.8)
               { g_CurrentShowQ = gc_Q_DeckDisplay_idx_ReadyHard; }
               else
               { g_CurrentShowQ = gc_Q_DeckDisplay_idx_ReadyEasy; }
           }
          else  // Nope.  only easy cards are left
           {
             g_CurrentShowQ = gc_Q_DeckDisplay_idx_ReadyEasy;
           }
       } 
     // a random choice was made, see if items exist in that queue before selecting a card
     // yeah, there are 3 if's here.  i don't know which one was chosen, so let's go through all them in priority
     if ( g_CardShowQueueSize[g_CurrentShowQ] <= 0)  
           { g_CurrentShowQ = gc_Q_DeckDisplay_idx_ReadyNotShown; }
     if ( g_CardShowQueueSize[g_CurrentShowQ] <= 0)
           { g_CurrentShowQ = gc_Q_DeckDisplay_idx_ReadyHard; }
     if ( g_CardShowQueueSize[g_CurrentShowQ] <= 0)
           { g_CurrentShowQ = gc_Q_DeckDisplay_idx_ReadyEasy; }

     var cardNum= Math.floor(Math.random()*g_CardShowQueueSize[g_CurrentShowQ]);

     g_CurrentShowQ = g_CurrentShowQ;
     g_CurrentShowIdx = cardNum;
          
 }



// ****************************************************************************
  function StorePreviousCard()
   {

    // alert("storing Q=" + g_CurrentShowQ + " & idx=" + g_CurrentShowIdx + " val=" + g_CardShowQueue[g_CurrentShowQ][g_CurrentShowIdx]);
     
 //    showqueuestuff();
     
     
     g_CardShowQueue[gc_Q_DeckDisplay_idx_Previous][g_CardShowQueueSize[gc_Q_DeckDisplay_idx_Previous]] = g_CardShowQueue[g_CurrentShowQ][g_CurrentShowIdx];  // this card
     g_CardShowQueueSize[gc_Q_DeckDisplay_idx_Previous]++;
     
     if (g_CardShowQueueSize[gc_Q_DeckDisplay_idx_Previous] >= g_CardCount-2)
       {
         g_CardShowQueue[gc_Q_DeckDisplay_idx_Previous][0] = -1;
         // showqueuestuff();
       }
     
  //   showqueuestuff();
     
     
     Q_CompressAll();
   }
   





// **************************************************************************** 
  function ShowPrevCard() // go back one in the previous stack
   {  
     var isfound=false;
     var i,k;
     
     if (g_CardShowQueueSize[gc_Q_DeckDisplay_idx_Previous] > 0)
       { 
         if (g_isShowingPrevious)
          {
            if (g_Prev_Idx > 0)
              {g_Prev_Idx--;}
          }
         else
          { 
            g_isShowingPrevious = true;
            g_Prev_Idx = g_CardShowQueueSize[gc_Q_DeckDisplay_idx_Previous] - 2;  // get the most recent addition
            if (g_Prev_Idx < 0)
              { g_isShowingPrevious = false;  }
          }
          
         // go out and look for the card in the queues - set the queue number and index - then show it 
         isfound = false;
         for (i = 0; (i < 3) && !isfound ; i++)
         {
           for (k = 0; k < (g_CardShowQueueSize[i]) && !isfound ; k++)
             {
               if (g_CardShowQueue[i][k] == g_CardShowQueue[g_Prev_Idx])
                 {
                   alert("Found Card " + g_CardShowQueue[i][k] + " ,, " + g_CardShowQueue[g_Prev_Idx] +
                      " // g_Prev_Idx = " + g_Prev_Idx + " ")
                   g_CurrentShowQ = i;
                   g_CurrentShowIdx = k;
                   isfound = true;
                 }
             }
         } 
         if (isfound && g_isShowingPrevious ) 
         {
           g_CurrentShowSide = 1;  
           ShowCardSide(g_CurrentShowSide,g_CurrentShowIdx, g_CurrentShowQ);
         }
         else
         {
           ShowNewCard();
         }
       }
     }
       
 
// **************************************************************************** 
  function ShowPrevCard_next() // in the previous stack, go forward one
   {  
     var isfound=false;
     var i,k;
     
     if (g_CardShowQueueSize[gc_Q_DeckDisplay_idx_Previous] > 0)
       { 
         if (g_isShowingPrevious)
          {
              g_Prev_Idx++;
              if (g_Prev_Idx >= g_CardShowQueueSize[gc_Q_DeckDisplay_idx_Previous])
              { g_isShowingPrevious = false; }
          }

         if ( g_isShowingPrevious )
         {
           // go out and look for the card in the queues - set the queue number and index - then show it 
           isfound = false;
           for (i = 0; (i < 3) && !isfound ; i++)
           {
             for (k = 0; k < (g_CardShowQueueSize[i]) && !isfound ; k++)
               {
                 if (g_CardShowQueue[i][k] == g_CardShowQueue[g_Prev_Idx])
                   {
                     g_CurrentShowQ = i;
                     g_CurrentShowIdx = k;
                     isfound = true;
                   }
               }
           } 
           if (isfound) 
           {
             g_CurrentShowSide = 1;  
             ShowCardSide(g_CurrentShowSide,g_CurrentShowIdx, g_CurrentShowQ);
           }
         }
        else
         {
           ShowNewCard();
         }
     }
    }
       
   
  
  
  
  
  
  
  
  
  
      

// **************************************************************************** 
  function FlipCard(inIsShow, inCount)  // need to suppress showing a card if multiple entries are blank
   {
   if (!g_StatisticsDisplayed)
   { 
     var tmp;
     g_CurrentShowSide++;
  //   alert("flippin " + g_CurrentShowSide + " " + gc_Card_TotalElements);
     if (g_CurrentShowSide >= (gc_Card_TotalElements-1))  // cannot show more sides than are supplied
       { g_CurrentShowSide = 1; }
       tmp = g_CardDeckArray[g_CurrentShowSide][g_CardShowQueue[g_CurrentShowQ][g_CurrentShowIdx]];
     if ((tmp.length < 6) && (inCount < 7))
       { FlipCard(false, inCount+1) }
     
  //   alert("flippin " + g_CurrentShowSide + " " + gc_Card_TotalElements);  
     if (inIsShow)  
       { ShowCardSide(g_CurrentShowSide, g_CurrentShowIdx, g_CurrentShowQ); }
     }  
   }    



// **************************************************************************** 
  function FlipCardBack(inIsShow, inCount)
   {
   if (!g_StatisticsDisplayed)
   {  
     var tmp;
     g_CurrentShowSide--;
     if (g_CurrentShowSide < 1)  // cannot show negative card sides either
       { g_CurrentShowSide = gc_Card_TotalElements - 2; }
     tmp = g_CardDeckArray[g_CurrentShowSide][g_CardShowQueue[g_CurrentShowQ][g_CurrentShowIdx]];
     if ((tmp.length < 6) && (inCount < 7))
       { FlipCardBack(false, inCount+1) }  
     if (inIsShow)  
       { ShowCardSide(g_CurrentShowSide,g_CurrentShowIdx, g_CurrentShowQ);  }
   }
   }    
      

// ****************************************************************************  
  function ShowCardSide(inSide, inCardIdx, inQueue)
   {
     var t; 
     var buildhtml = "";
            
 //  alert ("showcardside(" + inSide + "," + inCardIdx + "," + inQueue + ")");
     var showCardIdx = g_CardShowQueue[inQueue][inCardIdx];

     
       buildhtml = buildhtml + '<table cols=3 border=0 width="100%">';
     
     
      buildhtml = buildhtml + '  <tr>  '; 
        
      buildhtml = buildhtml + '    <td align=left width="30%">';
      if ( false && (g_CardShowQueueSize[gc_Q_DeckDisplay_idx_Previous] > 0) &&  
          ( (g_Prev_Idx > 0) || (!g_isShowingPrevious && (g_Prev_Idx <= 1)) ) )
        {
//          buildhtml = buildhtml + '      <a href="javascript:ShowPrevCard();"> ';
          buildhtml = buildhtml + '      <img src="App/Buttons/Button_Previous.png" class="Buttons" '; 
          buildhtml = buildhtml + '             ontouchstart="ButtonDown_Previous(this);" ontouchend="ButtonUp_Previous(this);" > ';
 //         buildhtml = buildhtml + '             onmousedown="ButtonDown_Previous(this);"  onmouseup="ButtonUp_Previous(this);" >  ';     
 //         buildhtml = buildhtml + '       </a> ';
        }
       else
        {
          buildhtml = buildhtml + '            &nbsp; ';
        }
      buildhtml = buildhtml + '    </td>';
        
      buildhtml = buildhtml + '    <td align=center>';
//      buildhtml = buildhtml + g_CardTypeDisplay[inQueue]   // removed to put in the flip card button
//      buildhtml = buildhtml + '      <a href="javascript:SwypeDown ();"> ';
      buildhtml = buildhtml + '      <img src="App/Buttons/Button_Flip.png" class="Buttons" '; 
      buildhtml = buildhtml + '             ontouchstart="ButtonDown_FlipCard(this);" ontouchend="ButtonUp_FlipCard(this);" > ';
//      buildhtml = buildhtml + '             onmousedown="ButtonDown_FlipCard(this);" onmouseup="ButtonUp_FlipCard(this);" >  ';
//      buildhtml = buildhtml + '       </a> ';
      buildhtml = buildhtml + '    </td>';
      
      buildhtml = buildhtml + '    <td align=right  width="30%">';
//      buildhtml = buildhtml + '      <a href="javascript:SwypeLeft ();"> ';      
      buildhtml = buildhtml + '        <img src="App/Buttons/Button_Skip_Next.png" class="Buttons" '; 
      buildhtml = buildhtml + '             ontouchstart="ButtonDown_Skip_Next(this);"  ontouchend="ButtonUp_Skip_Next(this);" > ';
//      buildhtml = buildhtml + '              onmousedown="ButtonDown_Skip_Next(this);"  onmouseup="ButtonUp_Skip_Next(this);" >  ';
//      buildhtml = buildhtml + '       </a> ';
      buildhtml = buildhtml + '    </td>';
      
      buildhtml = buildhtml + '  </tr>  ';  
      buildhtml = buildhtml + '  </table>  ';  
      
      
      
       // debugging
       
  //    buildhtml = buildhtml + "card " + showCardIdx + "<br>"; // for debugging the sides
  //    buildhtml = buildhtml + "Queue " + inQueue + " index=" + inCardIdx + "<br>"; // for debugging the sides
  //    buildhtml = buildhtml + "card side " + g_CurrentShowSide + "<br>"; // for debugging the sides
  //    
  //    buildhtml = buildhtml + "prev Q == " + g_Prev_Idx + " / " + g_CardShowQueueSize[gc_Q_DeckDisplay_idx_Previous] + "<br>"; // for debugging the sides

       buildhtml = buildhtml + "<br>";
       
       
       
       
       
       
       

 //  alert ("showcardside(" + inSide + "," + inCardIdx + "," + inQueue + "," + showCardIdx + ")");
     t = document.getElementById('showcard');
  //   buildhtml = buildhtml + '<a href="javascript:FlipCard();">';
  
     buildhtml = buildhtml + ' <a href="javascript:FlipCard(true, 0);" style="height:100%;width:100%;display: block;vertical-align: center;"> ';
     if (inSide == 1)   // if this is an image
     {
       buildhtml = buildhtml + "<img src='" + gc_DB_ImagePathPrefix;
       buildhtml = buildhtml + g_CardDeckArray[inSide][showCardIdx];  
       buildhtml = buildhtml + "' style=' max-height: 95%; max-width: 95%;' >"
     }
     else // otherwise, just show the data
     { buildhtml = buildhtml + g_CardDeckArray[inSide][showCardIdx]; }
     //buildhtml = buildhtml + "<br> and what else";
     buildhtml = buildhtml + '</a>';
     
 //    alert("showcardhtml="+buildhtml);
     t.innerHTML = buildhtml;
   
   }  
   
   
   
// ****************************************************************************
// ****************************************************************************
//  SWIPE STUFF
// ****************************************************************************
// ****************************************************************************

function event_HandleTouchStart(evt)
  {
    //alert("twiped start");
    prevX = evt.changedTouches[0].pageX;
    prevY = evt.changedTouches[0].pageY;
//    var t = document.getElementById('testdebug');
//     t.innerHTML = "twipe start = (" + evt.changedTouches[0].pageX.toString() + ", " + evt.changedTouches[0].pageY.toString() +")";
    
  }   
   
function event_HandleTouchEnd(evt)
  { 
    var thisX, thisY;
    var slope=0, dist=0;
    var minDistance = 80;  // how far the finger MUST travel before it is a swipe instead of a touch
    var isSwipe='';
    var isVertical = false;
    
    thisX = evt.changedTouches[0].pageX;
    thisY = evt.changedTouches[0].pageY;
   // alert ("square 5 is " + Square(5));    
    dist = Math.sqrt( Square(prevX - thisX) + Square(prevY - thisY) );
    g_TouchDist = dist;  // put it out there for the button up routines to catch
    if (prevX == thisX)
      {
        isVertical = true;
      }
      else
      {
        slope = ( (thisY - prevY) / (thisX - prevX) );
        //alert ("slope = " + slope.toString());
      }
    // now we have all the information needed to determine what type of swype this is
    if (dist > minDistance)  // analyze the slope only if the path is long enough for a swype
      {
         isSwipe='Swype';
         if (isVertical || ( (slope > 3) || (slope < -3) ) ) // is this along the y axis
         {
           if (thisY < prevY)   // swype from bottom to top
             {
               SwypeUp ();
             }
           if (thisY > prevY)  // swype from top to bottom
             {
               SwypeDown ();
             }
         }
         
         if ( (slope > -0.4) && (slope < 0.4) )  // or is this along the x axis
         {
           if (thisX < prevX)   // swype from right to left
             {
               SwypeLeft ();
             }
           if (thisX > prevX)  // swype from left to right
             {
               SwypeRight ();
             }
         }
      }

    
    //  alert("twiped end");
    
  //for debugging  
  
  //  var t = document.getElementById('testdebug');
 //    t.innerHTML = "twipe end (" + isSwipe + " == " + dist + " == " + slope + ") = (" + prevX.toString() + ", " + prevY.toString() +")" + "-(" + thisX.toString() + ", " + thisY.toString() +")";
  
 
  }   
   
function Square(inval) { return inval*inval; }      
   
   
function SwypeUp ()
  {
    g_StatisticsDisplayed = false;
   // alert("Swype UP ^^^ ");
    FlipCardBack (true, 0);
  }
  
function SwypeDown ()
  {
    g_StatisticsDisplayed = false;
    //alert("Swype DOWN");
    FlipCard (true, 0);
  }
  
function SwypeLeft ()  // next
  {
    //alert("Swype Left  <--");
    // remove one of the elements from the recent shown queues and place into the ready queue
    // first, check the hard queue - if empty then remove from the easy queue
//    if (Math.random() > 0.7)  // don't do this all the time
//    {
//     if (  g_CardShowQueueSize[gc_Q_DeckDisplay_idx_ShownHard] > 0)
//       { 
//         Q_readyToShow_Hard();
//       }
//      else
//       {
//         if (  g_CardShowQueueSize[gc_Q_DeckDisplay_idx_ShownEasy] > 0)
//           {         
//              Q_readyToShow_Easy();
//           }
//       }
//     }
    
    //  later development - may need to validate that the indexes did not change due to compression
//     Q_Balance();  

     
    ShowNewCard ();
  }
  
function SwypeRight ()
  {
    //alert("Swype RIGHT  -->");
    
    //  ShowPrevCard ();
  }  
// ****************************************************************************
// ****************************************************************************
// ****************************************************************************
     
   
// ****************************************************************************
//****** START-- for debugging only!!!   ********//
// ****************************************************************************

function showwindowsize()
         {
           var pw;
           var ph;
           var devicetype = "unknown";
           pw = document.body.clientWidth; 
           ph = document.body.clientHeight;
           if (isAndroid) {devicetype="Android";}
           
           if (isApple) {devicetype="Apple (iPhone or iPad)";}
      
           alert ("Device=" + devicetype + "  // width=" + pw + "  --  height=" + ph)
         }
function showqueuestuff()
         {
           var showstuff = 'Contents ===== \n';
           var i, k;
           for (k=3; k<4; k++)
           {
             showstuff = showstuff + "\n  Queue " + k + " (" + g_CardShowQueueSize[k] + ")\n";
             for (i=0; i<g_CardShowQueueSize[k]; i++)
              {
                showstuff = showstuff + g_CardShowQueue[k][i] + '\n';
              }
            } 
            alert (showstuff);
         }         
// ****************************************************************************
//****** END-- for debugging only!!!   ********//
// ****************************************************************************         


function ShowStats()
 {
   var statshtml = '';
   var t;     
   var totEasy = g_CardShowQueueSize[gc_Q_DeckDisplay_idx_ReadyEasy];
   var totHard = g_CardShowQueueSize[gc_Q_DeckDisplay_idx_ReadyHard];

   if (g_StatisticsDisplayed)
   { CloseStats(); }
   else
   {
     // shortcut - show debugging stuff
     //SwypeLeft();
  //   showqueuestuff();
     //ShowPrevCard ();
/*     
           var showstuff = 'Card Status \n\n';
           showstuff = showstuff + "New: \t" + g_CardShowQueueSize[gc_Q_DeckDisplay_idx_ReadyNotShown] + "\n";
           showstuff = showstuff + "Easy: \t" + totEasy + "\n";
           showstuff = showstuff + "Tough: \t" + totHard + "\n";

            alert (showstuff);
            //jAlert (showstuff, "Flashcard Status");
*/      
      statshtml = statshtml + '      <a href="javascript:CloseStats();"> ';
      statshtml = statshtml + '  <table cols=2 align=center>  ';    
      statshtml = statshtml + '  <tr>  '; 
      statshtml = statshtml + '  <td colspan=2>  ';
      statshtml = statshtml + "Card Status:";     
      statshtml = statshtml + '  </td>  ';    
      statshtml = statshtml + '  </tr>  '; 
      statshtml = statshtml + ' <tr><td>&nbsp;</td></tr>';   // blank row
      statshtml = statshtml + ' <tr><td>&nbsp;</td></tr>';   // blank row
      
      statshtml = statshtml + '  <tr>  '; 
      statshtml = statshtml + '    <td>  ';
      statshtml = statshtml + '       New: ' 
      statshtml = statshtml + '    </td>  ';
      statshtml = statshtml + '    <td>  ';
      statshtml = statshtml +         g_CardShowQueueSize[gc_Q_DeckDisplay_idx_ReadyNotShown];
      statshtml = statshtml + '    </td>  ';
      statshtml = statshtml + '  </tr>  '; 
      
      statshtml = statshtml + '  <tr>  '; 
      statshtml = statshtml + '    <td>  ';
      statshtml = statshtml + '      Easy: ' 
      statshtml = statshtml + '    </td>  ';
      statshtml = statshtml + '    <td>  ';
      statshtml = statshtml +        totEasy + ''; 
      statshtml = statshtml + '    </td>  ';
      statshtml = statshtml + '  </tr>  '; 
      
      statshtml = statshtml + '  <tr>  '; 
      statshtml = statshtml + '    <td>  ';
      statshtml = statshtml + '       Tough: ' 
      statshtml = statshtml + '    </td>  ';
      statshtml = statshtml + '    <td>  ';
      statshtml = statshtml +         totHard ; 
      statshtml = statshtml + '    </td>  ';
      statshtml = statshtml + '  </tr>  '; 
      
      statshtml = statshtml + ' <tr><td>&nbsp;</td></tr>';   // blank row
      statshtml = statshtml + '       <tr height=30>';
      statshtml = statshtml + '    <td colspan=2 align=center>';
      statshtml = statshtml + '      <img src="App/Buttons/Button_Continue.png" class="Buttons" '; 
      statshtml = statshtml + '             ontouchstart="ButtonDown_Continue(this);" onmousedown="ButtonDown_Continue(this);" ';
      statshtml = statshtml + '             ontouchend="ButtonUp_Continue(this);" onmouseup="ButtonUp_Continue(this);" >  ';
                  
      statshtml = statshtml + '    </td>';
      statshtml = statshtml + '  </tr>  ';
      
      statshtml = statshtml + '  </a>  ';
      statshtml = statshtml + '  </table>  ';
      
           
     if (!g_HowUseDisplayed && !g_StatisticsDisplayed)
     {
        t = document.getElementById('easyhardbuttons1');      
        g_StatisticsHideButtons1 = t.innerHTML;
       // alert(g_StatisticsHideButtons);
        t.innerHTML = '&nbsp;';
      
        t = document.getElementById('easyhardbuttons2');      
        g_StatisticsHideButtons2 = t.innerHTML;
       // alert(g_StatisticsHideButtons);
        t.innerHTML = '&nbsp;';
      } 
      t = document.getElementById('showcard');      
      t.innerHTML = statshtml;
      g_StatisticsDisplayed = true;
    }
   }
   
   
function CloseStats()
   {
     var t
     t = document.getElementById('easyhardbuttons1');      
     t.innerHTML = g_StatisticsHideButtons1;
     
     t = document.getElementById('easyhardbuttons2');      
     t.innerHTML = g_StatisticsHideButtons2;
     
     g_HowUseDisplayed = false;
     g_StatisticsDisplayed = false;
     ShowCardSide(g_CurrentShowSide,g_CurrentShowIdx, g_CurrentShowQ);
   }















function ShowHowUsed()
 {
   var statshtml = '';
   var t;     

   if (g_HowUseDisplayed)
   { CloseHowUsed(); }
   else
   {
     // shortcut - show debugging stuff
     //SwypeLeft();
  //   showqueuestuff();
     //ShowPrevCard ();
/*     
           var showstuff = 'Card Status \n\n';
           showstuff = showstuff + "New: \t" + g_CardShowQueueSize[gc_Q_DeckDisplay_idx_ReadyNotShown] + "\n";
           showstuff = showstuff + "Easy: \t" + totEasy + "\n";
           showstuff = showstuff + "Tough: \t" + totHard + "\n";

            alert (showstuff);
            //jAlert (showstuff, "Flashcard Status");
*/      
      statshtml = statshtml + '      <a href="javascript:CloseHowUsed();"> ';
      statshtml = statshtml + '  <table cols=2 align=center class=usehelptext border=0 width=95%>  ';    
      statshtml = statshtml + '  <tr>  '; 
      statshtml = statshtml + '  <td colspan=2 align=left class="usehelptextBOLD">  ';
      statshtml = statshtml + "FlashCard Use:";     
      statshtml = statshtml + '  </td>  ';    
      statshtml = statshtml + '  </tr>  '; 
      
      
      statshtml = statshtml + ' <tr> '; 
      statshtml = statshtml + '   <td width=10%>&nbsp;</td>'; 
      statshtml = statshtml + '   <td align=left>'; 
      statshtml = statshtml + '    The "NETC FlashCards" App is used as a Naval training aid. '; 
      statshtml = statshtml + '    Two methods can be used to navigate the card deck. ';
      statshtml = statshtml + '    You can use the on-screen buttons or use touch-swipe gestures.';  
      statshtml = statshtml + ' </td> '; 
      statshtml = statshtml + ' </tr> '; 
      
      
      statshtml = statshtml + ' <tr> '; 
      statshtml = statshtml + '   <td colspan=2 align=left class="usehelptextBOLD">'; 
      
      statshtml = statshtml + '     Next Card Options: <br> '; 
      statshtml = statshtml + '  <table cols=3 align=center class=usehelptext border=0 width=95% align=left>  ';  
      statshtml = statshtml + ' <tr> '; 
      
      
      statshtml = statshtml + '   <td width=10%>&nbsp;</td>'; 
      statshtml = statshtml + '   <td align=left class="usehelptextBOLD">';   
      statshtml = statshtml + '     Next Card:'; 
      statshtml = statshtml + ' </td> ';      
      statshtml = statshtml + '   <td align=left>'; 
      statshtml = statshtml + '    The current card does not change status and a new card is displayed at random.'; 
      statshtml = statshtml + ' </td> ';   
      statshtml = statshtml + ' </tr> '; 
      
      
      statshtml = statshtml + ' <tr> '; 
      statshtml = statshtml + '   <td>&nbsp;</td>'; 
      statshtml = statshtml + '   <td align=left class="usehelptextBOLD">'; 
      statshtml = statshtml + '    Easy:'; 
      statshtml = statshtml + ' </td> ';     
      statshtml = statshtml + '   <td align=left>'; 
      statshtml = statshtml + '    The current card is marked "easy" and will re-appear less frequently.'; 
      statshtml = statshtml + ' </td> ';       
      statshtml = statshtml + ' </tr> '; 
      
      
      statshtml = statshtml + ' <tr> '; 
      statshtml = statshtml + '   <td>&nbsp;</td>'; 
      statshtml = statshtml + '   <td align=left class="usehelptextBOLD">'; 
      statshtml = statshtml + '    Tough:'; 
      statshtml = statshtml + ' </td> ';      
      statshtml = statshtml + '   <td align=left>'; 
      statshtml = statshtml + '    The current card will re-appear more frequently until is is marked as "easy".'; 
      statshtml = statshtml + ' </td> ';    
      statshtml = statshtml + ' </tr> '; 
        
      statshtml = statshtml + ' </table> '; 
      statshtml = statshtml + ' </td> '; 
      statshtml = statshtml + ' </tr> '; 
      
      
      
      
      statshtml = statshtml + ' <tr> '; 
      statshtml = statshtml + '   <td colspan=2 align=left class="usehelptextBOLD">'; 
      
      statshtml = statshtml + '     Swipe Motions: <br> '; 
      statshtml = statshtml + '  <table cols=3 align=center class=usehelptext border=0 width=95% align=left>  ';  

      statshtml = statshtml + ' <tr> ';       
      statshtml = statshtml + '   <td width=10%>&nbsp;</td>'; 
      statshtml = statshtml + '   <td align=left width=10%>';   
      statshtml = statshtml + '      <img src="App/Images/help_SkipNext.png" class="helpimages" >'; 
      statshtml = statshtml + ' </td> ';     
      statshtml = statshtml + '   <td align=left>'; 
      statshtml = statshtml + '    Skip to the Next Card'; 
      statshtml = statshtml + ' </td> ';   
      statshtml = statshtml + ' </tr> '; 
      
      statshtml = statshtml + ' <tr> '; 
      statshtml = statshtml + '   <td>&nbsp;</td>'; 
      statshtml = statshtml + '   <td align=left>'; 
      statshtml = statshtml + '      <img src="App/Images/help_SkipPrevious.png" class="helpimages" >'; 
      statshtml = statshtml + ' </td> ';     
      statshtml = statshtml + '   <td align=left>'; 
      statshtml = statshtml + '    Show Previous Card'; 
      statshtml = statshtml + ' </td> ';       
      statshtml = statshtml + ' </tr> '; 
      
      statshtml = statshtml + ' <tr> '; 
      statshtml = statshtml + '   <td>&nbsp;</td>'; 
      statshtml = statshtml + '   <td align=left>'; 
      statshtml = statshtml + '      <img src="App/Images/help_FlipDown.png" class="helpimages" >'; 
      statshtml = statshtml + ' </td> ';     
      statshtml = statshtml + '   <td align=left>'; 
      statshtml = statshtml + '    Flip card over (next side)'; 
      statshtml = statshtml + ' </td> ';       
      statshtml = statshtml + ' </tr> '; 
      
      statshtml = statshtml + ' <tr> '; 
      statshtml = statshtml + '   <td>&nbsp;</td>'; 
      statshtml = statshtml + '   <td align=left>'; 
      statshtml = statshtml + '      <img src="App/Images/help_FlipUp.png" class="helpimages" >'; 
      statshtml = statshtml + ' </td> ';      
      statshtml = statshtml + '   <td align=left>'; 
      statshtml = statshtml + '    Flip card backwards (previous side)'; 
      statshtml = statshtml + ' </td> ';    
      statshtml = statshtml + ' </tr> '; 
        
      statshtml = statshtml + ' </table> '; 
      statshtml = statshtml + ' </td> '; 
      statshtml = statshtml + ' </tr> '; 
      
      

      
      statshtml = statshtml + ' <tr><td colspan=2 align=left>';
      statshtml = statshtml + '  <B>Note:</b>  Some cards have more than two sides.  ';
      statshtml = statshtml + '  This way, a card can have an image, a question, an answer, and trivia. ';
      statshtml = statshtml + ' </td></tr>';   
//      statshtml = statshtml + ' <tr><td>&nbsp;</td></tr>';   // blank row
      

      
//      statshtml = statshtml + ' <tr><td>&nbsp;</td></tr>';   // blank row
      statshtml = statshtml + '       <tr height=30>';
      statshtml = statshtml + '    <td colspan=2 align=center>';
      statshtml = statshtml + '      <img src="App/Buttons/Button_Continue.png" class="Buttons" '; 
      statshtml = statshtml + '             ontouchstart="ButtonDown_ContinueHome(this);" onmousedown="ButtonDown_ContinueHome(this);" ';
      statshtml = statshtml + '             ontouchend="ButtonUp_ContinueHome(this);" onmouseup="ButtonUp_ContinueHome(this);" >  ';
                  
      statshtml = statshtml + '    </td>';
      statshtml = statshtml + '  </tr>  ';
      
      statshtml = statshtml + '  </a>  ';
      statshtml = statshtml + '  </table>  ';
      
      t = document.getElementById('showcard');      
      g_homepagedata = t.innerHTML;
     // alert(g_homepagedata);
     
     
     
     if (!g_HowUseDisplayed && !g_StatisticsDisplayed)
     {
        t = document.getElementById('easyhardbuttons1');      
        g_StatisticsHideButtons1 = t.innerHTML;
       // alert(g_StatisticsHideButtons);
        t.innerHTML = '&nbsp;';
      
        t = document.getElementById('easyhardbuttons2');      
        g_StatisticsHideButtons2 = t.innerHTML;
     // alert(g_StatisticsHideButtons);
        t.innerHTML = '&nbsp;';
      }
       
      t = document.getElementById('showcard');      
      t.innerHTML = statshtml;
      
      
      t.innerHTML = statshtml;
      g_HowUseDisplayed = true;
    }
   }
   
   function CloseHowUsed()
   {
   
   CloseStats();  // the same block of code restores the stats and use pages
   
   /*
     // originally, this section of code was used in 'index.html' but was moved to "showcards.html"
     // This function is called by a different button than statistics
     
     var t
     
     t = document.getElementById('easyhardbuttons1');      
     t.innerHTML = g_StatisticsHideButtons1;
     
     t = document.getElementById('easyhardbuttons2');      
     t.innerHTML = g_StatisticsHideButtons2;
     
     g_HowUseDisplayed = false;
     g_StatisticsDisplayed = false;
     ShowCardSide(g_CurrentShowSide,g_CurrentShowIdx, g_CurrentShowQ);
     */
     
   }



// ****************************************************************************
// ****************************************************************************
// QUEUE MANAGEMENT
// ****************************************************************************
// ****************************************************************************


//function Q_readyToShow_Easy()
//  {
//             g_CardShowQueue[gc_Q_DeckDisplay_idx_ReadyEasy][g_CardShowQueueSize[gc_Q_DeckDisplay_idx_ReadyEasy]] = g_CardShowQueue[gc_Q_DeckDisplay_idx_ShownEasy][0];  // fifo
//             g_CardShowQueue[gc_Q_DeckDisplay_idx_ShownEasy][0] = -1;  // empty this cell out
//             g_CardShowQueueSize[gc_Q_DeckDisplay_idx_ReadyEasy]++;
//             g_CardShowQueueSize[gc_Q_DeckDisplay_idx_ShownEasy]--;
//             
//    Q_CompressAll(); // remove unused from all of the queues 
//  }
  

//function Q_readyToShow_Hard()
//  {
//         g_CardShowQueue[gc_Q_DeckDisplay_idx_ReadyHard][g_CardShowQueueSize[gc_Q_DeckDisplay_idx_ReadyHard]] = g_CardShowQueue[gc_Q_DeckDisplay_idx_ShownHard][0];  // fifo
//         g_CardShowQueue[gc_Q_DeckDisplay_idx_ShownHard][0] = -1;  // empty this cell out
//         g_CardShowQueueSize[gc_Q_DeckDisplay_idx_ReadyHard]++;
//         g_CardShowQueueSize[gc_Q_DeckDisplay_idx_ShownHard]--;
//         Q_CompressAll(); // remove unused from all of the queues 
//  }  
  
  
/* *** */  
  function Q_initEmptyStatus()  // this is called to initialize a deck which has no status file
   {
     var i;
     // todo - write a new file which contains an initialized status
     // 
     
     // copy all card numbers into the "not shown" queue
   
     for (i=0; i<g_CardCount; i++)
       {
         g_CardShowQueue[gc_Q_DeckDisplay_idx_ReadyNotShown][i] = i;  // store the index only
         g_CardShowQueueSize[gc_Q_DeckDisplay_idx_ReadyNotShown] ++; // increment the size
       }
   }

/* *** */  
  function Q_initAllQueuesEmpty()
   {
     var i;
     for (i=0; i<4; i++)
       { g_CardShowQueueSize[i] = 0;}
     
   }

/* *** */  
  function Q_CompressAll()  // remove the empty elements marked with a negative number
   {
     var i,k, n;
     var tmpval;  // may not need this one
     
     for (i=0; i<4; i++)  // run through all 5 queues
      {
        for (k=0; k<g_CardShowQueueSize[i]; k++)
         { 
           if (g_CardShowQueue[i][k] < 0)  // if this is an empty element, compress it
             {
               for (n=k; n<g_CardShowQueueSize[i] + 3; n++)  // go through the remaining slots - then plus 2 in case one was missed
                {
                  if ( (n+1) < g_CardCount)  // cannot exceed the length of the queue
                    {
                      g_CardShowQueue[i][n] = g_CardShowQueue[i][n+1];  // move the next element into the previous slot
                    }
                }
             }
         }
      }
   }

/* *** */  
//  function Q_Balance()  // ensure the easy and hard queues do not have too many elements standing idle
//   {
//      var c_maxReadyEasySize = Math.floor(g_CardShowQueueSize[gc_Q_DeckDisplay_idx_ReadyEasy] / 4);
//      var c_maxReadyHardSize = Math.floor(g_CardShowQueueSize[gc_Q_DeckDisplay_idx_ReadyHard] / 4);
//      
//      if (g_CardShowQueueSize[gc_Q_DeckDisplay_idx_ShownEasy] > c_maxReadyEasySize)
//        { Q_readyToShow_Easy(); }
//      if (g_CardShowQueueSize[gc_Q_DeckDisplay_idx_ShownHard] > c_maxReadyHardSize)
//        { Q_readyToShow_Hard(); }
//      
//   }
   
   
   
   
   
// ****************************************************************************
// ****************************************************************************
//  buttons down --- buttons up
// ****************************************************************************
// ****************************************************************************

function ButtonDown_Begin (inThis)
 {
   // var t = document.getElementById('easyhardbuttons1');
   inThis.src = "App/Buttons/Button_Begin_down.png";
 }
 
 
function ButtonUp_Begin (inThis)
 {
   // var t = document.getElementById('easyhardbuttons1');
   inThis.src = "App/Buttons/Button_Begin.png";

 }
 
 
 // ****************************************************************************

   
function ButtonDown_Continue (inThis)
 {
   // var t = document.getElementById('easyhardbuttons1');
   inThis.src = "App/Buttons/Button_Continue_down.png";
 }
 
 
function ButtonUp_Continue (inThis)
 {
   // var t = document.getElementById('easyhardbuttons1');
   inThis.src = "App/Buttons/Button_Continue.png";
 }
 
  
 // ****************************************************************************

   
function ButtonDown_Home (inThis)
 {
   // var t = document.getElementById('easyhardbuttons1');
   inThis.src = "App/Buttons/Button_Home_down.png";
 }
 
 
function ButtonUp_Home (inThis)
 {
   // var t = document.getElementById('easyhardbuttons1');
   inThis.src = "App/Buttons/Button_Home.png";
 }
  
 // ****************************************************************************

   
function ButtonDown_Easy (inThis)
 {
   // var t = document.getElementById('easyhardbuttons1');
   inThis.src = "App/Buttons/Button_GotIt_down.png";
 }
 
 
function ButtonUp_Easy (inThis)
 {
   // var t = document.getElementById('easyhardbuttons1');
   inThis.src = "App/Buttons/Button_GotIt.png";
   StoreEasyCard();
 }
  
 // ****************************************************************************

   
function ButtonDown_Hard (inThis)
 {
   // var t = document.getElementById('easyhardbuttons1');
   inThis.src = "App/Buttons/Button_Hard_down.png";
 }
 
 
function ButtonUp_Hard (inThis)
 {
   // var t = document.getElementById('easyhardbuttons1');
   inThis.src = "App/Buttons/Button_Hard.png";
   StoreHardCard();
 }
  
 // ****************************************************************************

   
function ButtonDown_Statistics (inThis)
 {
   // var t = document.getElementById('easyhardbuttons1');
   inThis.src = "App/Buttons/Button_Statistics_down.png";
 }
 
 
function ButtonUp_Statistics (inThis)
 {
   // var t = document.getElementById('easyhardbuttons1');
   inThis.src = "App/Buttons/Button_Statistics.png";
   ShowStats();
 }
 
   
   
   // ****************************************************************************

   
function ButtonDown_Previous (inThis)
 {
   // var t = document.getElementById('easyhardbuttons1');
   inThis.src = "App/Buttons/Button_Previous_down.png";
 }
 
 
function ButtonUp_Previous (inThis)
 {
   // var t = document.getElementById('easyhardbuttons1');
   inThis.src = "App/Buttons/Button_Previous.png";
   ShowPrevCard();
 }
 
    // ****************************************************************************

   
function ButtonDown_Skip_Next (inThis)
 {
   // var t = document.getElementById('easyhardbuttons1');
   inThis.src = "App/Buttons/Button_Skip_Next_down.png";
 }
 
 
function ButtonUp_Skip_Next (inThis)
 {
   // var t = document.getElementById('easyhardbuttons1');
   inThis.src = "App/Buttons/Button_Skip_Next.png";
   //alert("Last Travel = " + g_TouchDist);
      SwypeLeft ();
 }
 
    // ****************************************************************************

   
function ButtonDown_FlipCard (inThis)
 {
   // var t = document.getElementById('easyhardbuttons1');
   inThis.src = "App/Buttons/Button_Flip_down.png";
 }
 
 
function ButtonUp_FlipCard (inThis)
 {
   // var t = document.getElementById('easyhardbuttons1');
   inThis.src = "App/Buttons/Button_Flip.png";
   SwypeDown ();
 }
  
    // ****************************************************************************

   
function ButtonDown_ShowUse (inThis)
 {
   // var t = document.getElementById('easyhardbuttons1');
   inThis.src = "App/Buttons/Button_ShowUse_down.png";
 }
 
 
function ButtonUp_ShowUse (inThis)
 {
   // var t = document.getElementById('easyhardbuttons1');
   inThis.src = "App/Buttons/Button_ShowUse.png";
   ShowHowUsed();
 }
 
     
 // ****************************************************************************

   
function ButtonDown_ContinueHome (inThis)
 {
   // var t = document.getElementById('easyhardbuttons1');
   inThis.src = "App/Buttons/Button_Continue_down.png";
 }
 
 
function ButtonUp_ContinueHome (inThis)
 {
   // var t = document.getElementById('easyhardbuttons1');
   inThis.src = "App/Buttons/Button_Continue.png";
 }
 