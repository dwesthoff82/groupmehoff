var HTTPS   = require('https')
var cool    = require('cool-ascii-faces')
var YouTube = require('youtube-node')
var Giphy   = require('giphy-wrapper')(process.env.GF_ID);
var botID   = process.env.BOT_ID

YT = new YouTube()
YT.setKey(process.env.YT_ID) 


/*
*
* Bot responses to /commands
*
*/
function respond() {
  var request = JSON.parse(this.req.chunks[0])

  if (request.text) {
    var text        = request.text
    var reg_yt      = /^\/yt ([^&]+)/
    var reg_gif     = /^\/gif ([^&]+)/
    var reg_rap     = /^\/rap/
    var searchQuery = ''

    /*
    *
    * Youtube Search
    * /yt <search query>
    *
    */
    if (reg_yt.test(text)) {
      searchQuery = text.match(reg_yt)[1]
      this.res.writeHead(200)
      searchYoutube(searchQuery)
      this.res.end()
    }


    /*
    *
    * Giphy Search
    * /gif <search query>
    *
    */
    if (reg_gif.test(text)) {
    
    
    	if(request.sender_id == '7824617'){
    	
    		postMessage("...")
    	
    	
    	}else{
    
    
		  searchQuery = text.match(reg_gif)[1]
		  this.res.writeHead(200)
		  searchGiphy(searchQuery)
		  this.res.end()
      }
    }


    /*
    *
    * Wadebot's got ill ass rhymes
    * /rap
    *
    */
    if (reg_rap.test(text)) {
      this.res.writeHead(200)
      postRap()
      this.res.end()
    }


    /*
    *
    * Respond to phrases or words
    * All phrases require wadebot as the trigger
    *
    */
    var phrases = {
      'thank you'     : "You're welcome, " + request.name + "."
      , 'thanks'      : "Whatevs, " + request.name + "."
      , 'allen wade'  : "Unnnnggg makes my dick hard"
      , 'dan kraft'   : "PORK CHOP SANDWICHES"
      , 'fusco' : "FSB"
      
    }
    
   /* if(request.sender_id = '7824617'){
    	var value = Math.floor((Math.random() * 10) + 1);
    	
    	
    	if(value == 5){
    	
    		postMessage("Grove Harder")
    	
    	}
    
    
    
    }*/
    
    
    var sendPhrase = false
	console.log("name "+ request.name+ " ID "+request.sender_id) 
    if (text.toLowerCase().indexOf('hoffbot') !== -1 || text.toLowerCase().indexOf('hoff bot') !== -1  ) {

      // Do one of the pre-baked phrases apply?
      for (key in phrases) {
        if (text.toLowerCase().indexOf(key) !== -1) {
          sendPhrase = phrases[key]
        }
      }
      if (sendPhrase) {
        postMessage(sendPhrase)
      } else {
        postMessage('@' + request.name + ' what?!')
      }
    } else {
      //console.log("Don't care")
      this.res.writeHead(200)
      this.res.end()
    }

  } else {
   // console.log("Don't care")
    this.res.writeHead(200)
    this.res.end()
  }
}

/*
*
* Youtube Search
* @param string
* @returns url
*
*/
function searchYoutube(search) {
  YT.search(search, 1, function(error, result) {
    if (error) {
      console.log(error);
    }
    else {
      var items = result.items
      var video = items[0].id.videoId
      var queryString = 'https://www.youtube.com/watch?v=' + video
      postMessage(queryString)
    }
  })
}

/*
*
* Giphy Search
* @param string
* @returns url
*
*/
function searchGiphy(search) {

  var giphySearch = search.split(' ').join('+')

  Giphy.search(giphySearch, 1, 0, function (error, result) {

    if (error) {
      console.log('holy shit giphy sucks', error)
    } else {
      if (!!result.data.length) {
        var image = result.data[0].images.original.url
        postMessage(image)
      } else {
        postMessage("Can't find shit")
      }
    }
  });
}

function postRap () {
  var raps = [
    "I'm hot cuz I'm fly. You ain't cuz you not."
    , "I don't like 'em figgity fat, I like 'em stiggity stacked / You wiggity wiggity wack if you ain't got biggity back."
    , "And my dick runs deep, so deep / So deep put her ass to sleep."
    , "Fuck Pusha T and anybody that love him/His head up his ass, I'mma have to head-butt him"
    , "Rule nombre uno"
    , "It's kinda hard to imagine, like Kanye West coming back from his fatal accident to beatmaking and rapping."
    , "You might got more cash than me, but you ain't got the skills to eat a nigga's ass like me."
    , "That girl know how to blow something like she played the flute."
    , "I'ma go hard like a motherfucking boner."
    , "Yeah, I got some last words: Fuck all y'all / Stop writing raps and go play volleyball."
    , "You're a child of destiny / You're the child of my destiny / You're my child with the child from Destiny's Child"
    , "An elephant never forgets, so my dick remembers everything."
    , "Love is evil. Spell it backwards, I'll show ya."
    , "Pop that pussy like a zit."
    , "Pretty little bitch, dripping like some water though / I be on that straw and coming for that low, low."
    , "Eat that wonton soup I got the cash like chang, chang, chang / Bitches suck my dick because I come like 36 ways."
    , "Oh, you from Wu-Tang? / Then why's your face ghost?"
    , "Ball so hard. That shit cray, ain't it, Jay? / What she order, fish filet?"
    , "Swagger tighter than a yeast infection / Fly, go hard, like geese erection."
    , "I see fear / You some fucking queers / Grow a fucking beard / I'm s'posed to be here."
    , "Got diarrhea flow, now I shit on niggas / Even when I'm constipated I still shit on niggas."
    , "My paragraph alone is worth five mics / A twelve-song LP, that's 36 mics."
    , "I shit green like vegetarian assholes"
    , "Rock star: I'm flier than an ostrich."
    , "Never let me slip 'cause if I slip, then I'm slippin'."
    , "She knows my dick / She call that nigga Richard / Prior to me coming / I had to stick my thumb in / Her ass one time / Smell my finger, make you vomit."
    , "First Family will gradually lift that ass up like gravity / And turn your body frame into a cavity"
    , "I like them black, white, Puerto Rican, or Haitian / Like Japanese, Chinese or even Asian."
    , "Almost drowned in her pussy, so I swam to her butt"
    , ".38 revolve like the sun round the Earth."
    , "Unforgettable, unsubmittable / I go by N now, just one syllable"
    , "Red bottoms let the tongue hang / Got a off-white porchse. #Cum stain"
    , "32 grams raw, chop it in half, get 16. / Double it times 3, we got 48, which mean a whole lot of cream. / Divide the profit by four, subtract it by eight, we back to sixteen..."
    , "I'm your worst nightmare squared / That's double for niggas who ain't mathematically aware."
    , "Now you get to watch her leave out the window / Guess that's why they call it window pain."
    , "Louboutin shoes, she got too much pride / Her feet are killing her. I call it shoe-icide."
    , "You done broke my heart into a million pieces / I should have seen it coming, wish I had telekinesis."
    , "When I was a geisha, he was a samurai / Somehow I understood him when he spoke Thai."
    , "Ain't got time for chit chat; I'm tryin' to get this money / So get up out my face, you doo-doo head dummy."
    , "She got a big booty, so I call her Big Booty."
    , "I let you feel like the shit, but boy, you can't out-fart me."
    , "Swag, swag, swag, swag, bruh / Brang-dang-dang your girlfriend"
    , "Somebody oughta tell her / Her ass got a voice, and she sing a capella"
    , "Water, fire, air and dirt/Fuckin' magnets, how do they work? / And I don't want to talk to a scientist / Y'all motherfuckers lying and gettin' me pissed."
  ]
  var which = Math.floor(Math.random() * (raps.length - (raps.length - 1) + raps.length - 1))
  postMessage(raps[which])
}

function postMessage(message) {
  var botResponse, options, body, botReq

  botResponse = message

  options = {
    hostname: 'api.groupme.com',
    path: '/v3/bots/post',
    method: 'POST'
  }

  body = {
    "bot_id" : botID,
    "text" : botResponse
  }

  console.log('sending ' + botResponse + ' to ' + botID)

  botReq = HTTPS.request(options, function(res) {
      if(res.statusCode == 202) {
        //neat
      } else {
        console.log('rejecting bad status code ' + res.statusCode)
      }
  })

  botReq.on('error', function(err) {
    console.log('error posting message ' + JSON.stringify(err))
  })
  botReq.on('timeout', function(err) {
    console.log('timeout posting message ' + JSON.stringify(err))
  })
  botReq.end(JSON.stringify(body))
}


exports.respond = respond
