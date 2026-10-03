// Curated pull-quotes for the homepage lyric card: the strongest full passages
// (usually a complete 4-bar section) from across the catalog, 1-2 per song. Every
// entry is a verbatim, contiguous excerpt of the song's lyrics in catalogDb.json /
// lyricsDb.json. One is chosen at random per page load; songs that don't resolve to
// a release in the catalog (see resolveSong) are skipped automatically.

export interface LyricQuote {
  song: string;
  lines: string[];
  themeColor?: string;
}

export const lyricQuotes: LyricQuote[] = [
  {
    song: "Live With That",
    lines: [
      "Feel like every single day's another letter",
      "That I'm writing but I'm never gonna send",
      "And I don't know if I'm getting any better",
      "'Cause I'll break before I ever, bend",
    ],
    themeColor: "#9DB0E3",
  },
  {
    song: "Live With That",
    lines: [
      "Living in the in-between",
      "Of how it really is and how I thought it'd be",
      "I don't know how to want it back",
      "Guess I gotta live with that",
    ],
    themeColor: "#9DB0E3",
  },
  {
    song: "Nowhere Fast",
    lines: [
      "There's a room in my head I don't open",
      "Same chair, same light through the blinds",
      "I keep paying the rent on a house I don't live in",
      "And calling it peace of mind",
    ],
    themeColor: "#9DB0E3",
  },
  {
    song: "Nowhere Fast",
    lines: [
      "But I bought the ticket and stood in the queue",
      "I know in the end it's the reason I grew",
      "Treat all my scars like they're badges of honor",
      "Cause they coincide with a time I was stronger",
    ],
    themeColor: "#9DB0E3",
  },
  {
    song: "Safe Place",
    lines: [
      "Locked in my head, that's the only safe place",
      "When I'm reaching out my fingers always end up on a blade",
      "Built this cage myself, always in the same state",
      "Only one that got the key I might just take it to the grave",
    ],
    themeColor: "#9DB0E3",
  },
  {
    song: "Safe Place",
    lines: [
      "Every open hand ends up empty when it's over",
      "Every safe haven up in smoke when it's colder",
      "Built these walls up way too high for anyone to climb",
      "And I play the judge and jury, serve the sentence in my mind",
    ],
    themeColor: "#9DB0E3",
  },
  {
    song: "What Can I Say?",
    lines: [
      "Sub-zero heart so it makes me shiver",
      "Floating in the dark in this frozen river",
      "And if you wonder why, well you might consider",
      "The weight of every truth that I can't deliver",
    ],
    themeColor: "#9DB0E3",
  },
  {
    song: "What Can I Say?",
    lines: [
      "I'm turning off the noise that's keeping me in chains",
      "I'm washing out the dirt tryna clean away the stains",
      "I'm learning how to breathe in the heaviest of air",
      "While picking up and carrying the crosses that I bear",
    ],
    themeColor: "#9DB0E3",
  },
  {
    song: "Forever",
    lines: [
      "I use the arrogance I built to cover the cracks",
      "I break the mirrors in the room so I can't look back",
      "It isn't dominance, it's just a fear of still",
      "If I don't manufacture chaos, the silence will",
    ],
    themeColor: "#9DB0E3",
  },
  {
    song: "Forever",
    lines: [
      "I'd hate to wake up later on with any regret",
      "For all the things I never did or things that I left unsaid",
      "Yeah, I don't wanna think I should've known it all better",
      "'Cause once the time has passed me by, it's faded forever",
    ],
    themeColor: "#9DB0E3",
  },
  {
    song: "Comfortable",
    lines: [
      "I never needed anyone to fix my problems",
      "I just wanted somebody that I could talk with",
      "But people seem to throw me to the side so often",
      "And they don't even realize they're making my coffin",
    ],
    themeColor: "#9DB0E3",
  },
  {
    song: "Comfortable",
    lines: [
      "I used to close my eyes and imagine",
      "I was anybody else but me",
      "But then I realized that I'm wasting the time",
      "That I should focus on the things I can reach",
    ],
    themeColor: "#9DB0E3",
  },
  {
    song: "Only Human",
    lines: [
      "It takes too long to feel some calm",
      "When things go wrong in the life I made",
      "Got sweaty palms and all these thoughts",
      "Sound like alarms at the start of the day",
    ],
  },
  {
    song: "Only Human",
    lines: [
      "Man it's hard to read between the lines",
      "But here's one rule that you need in life",
      "If it doesn't bring you peace of mind",
      "Then it's something you should leave behind",
    ],
  },
  {
    song: "Different",
    lines: [
      "You memorized my triggers, and swear you can't recall",
      "You make me feel like nothing, then catch me when I fall",
      "You speak in half confessions, leave the rest for me to find",
      "You're fluent in deflection, and any tongue but mine",
    ],
  },
  {
    song: "Different",
    lines: [
      "What if you woke up kind, in all the ways you're not?",
      "Would I still recognize the stranger in my thoughts",
      "If every little thing I find is stitched into your name",
      "Can I hold you and still pray you'll somehow stay the same?",
    ],
  },
  {
    song: "Alone",
    lines: [
      "My mind is like a riot in this quiet room I'm fightin'",
      "Tryna sit inside the silence, but the crying starts at night",
      "I keep on buying into guidance from a mind that's gone and lifeless",
      "Like I'm dying in the brightness of a life I can't define",
    ],
  },
  {
    song: "Alone",
    lines: [
      "Cause I'm the type to hold it and never let it show",
      "And everybody think I'm fine because I suffer on my own",
      "So no one really knows it's underneath the surface so",
      "I've been letting go of everything I thought I used to know",
    ],
  },
  {
    song: "Rose",
    lines: [
      "I'm like the color of your eyes cause inside, yeah I'm true blue",
      "Thinking how we'll never really talk like we used to",
      "Maybe one day I could find some peace, but it's too soon",
      "Honestly, I'm grateful that there was a time I knew you",
    ],
  },
  {
    song: "Rose",
    lines: [
      "Now I get your message and I hold and react",
      "Because I know it's probably best for you if I'm in the past",
      "There's still a million things I wish we could be talking about",
      "I'll never lose the little part of me that wants you around",
    ],
  },
  {
    song: "More Lonely",
    lines: [
      "When I grew up I got more lonely, no new friends I got me only",
      "Lost someone that I held so closely and lost myself on the day she told me",
    ],
  },
  {
    song: "More Lonely",
    lines: [
      "But it's far too late to be making things right for your guilty conscience",
      "Everything that we had is a skeleton buried deep in my closet",
      "And I cannot look back now cause I don't really have no option",
    ],
  },
  {
    song: "Guilty Conscience",
    lines: [
      "See the ones I love and I'm feeling all the weight now",
      "Every bridge I burned I wish I tried to put the flames out",
      "Can't rewind the clock or escape this name now",
      "Never could've seen this is how it would've played out",
    ],
  },
  {
    song: "Guilty Conscience",
    lines: [
      "Maybe all the mistakes that I made didn't make me",
      "Back in all the times when my life stayed rainy",
      "Had to find a way when the path seemed hazy",
      "Cause I can never wait for anyone to save me",
    ],
  },
  {
    song: "Holding On",
    lines: [
      "I've got routines built to keep myself steady",
      "A version of calm that's locked and it's ready",
      "But underneath all of the noise and the motion",
      "Something is moving like waves in an ocean",
    ],
  },
  {
    song: "Holding On",
    lines: [
      "If I always did what felt like safe I'd never leave my room",
      "Where I'd stare up into empty space and lay up in my gloom",
      "And it's hard to break a cycle when it feels like part of you",
      "But I'm doing what I can do hollowed out and ran through",
    ],
  },
  {
    song: "Nothing to Prove",
    lines: [
      "Doing my best even if I might lose",
      "Cause unless you're myself I got nothing to prove",
      "And this life goes fast when you're watching time move",
      "Thinking everything's changed, but I guess I did too",
    ],
  },
  {
    song: "Nothing to Prove",
    lines: [
      "Trusting in the process even when the future's unclear",
      "Took me time to learn to let it go and brave the frontier",
      "Keep on taking steps to find a purpose till it appears",
      "Stop trying to be perfect it's not worth it and that's sincere",
    ],
  },
  {
    song: "Thnks Fr Frgtting Me",
    lines: [
      "Do you ever think about me now that I'm gone?",
      "And will you ever hear me singing all the words in the song?",
      "Or do I live inside the part up in your brain where it's dark?",
      "Did you forget about the way you tried to break me apart?",
    ],
  },
  {
    song: "Thnks Fr Frgtting Me",
    lines: [
      "Finally seeing all the writing up on the wall",
      "How I built you up high, it turned to watching you fall",
      "Every red flag turned to colors that I tried to paint you",
      "Yeah, I tried to look away til the worst of it came true",
    ],
  },
  {
    song: "Meant to Be",
    lines: [
      "In the shadows of silence I keep tracing your face",
      "A ghost of the past that's with me holding your place",
      "I hear the echoes of laughter fading into the dark and",
      "I wonder if it mattered to you right from the start",
    ],
  },
  {
    song: "Meant to Be",
    lines: [
      "Meant to be",
      "That's what we said",
      "Now it's all just inside my head",
      "We let forever slip away",
      "And I'm still stuck in yesterday",
    ],
  },
  {
    song: "Look At What You've Done",
    lines: [
      "I hope that it hit when you notice I'm gone",
      "I hope that you miss me and I'm in your thoughts",
      "I hope that you're guilty for breakin' my heart",
      "Cause one day you'll get it was me from the start",
    ],
  },
  {
    song: "More to Life",
    lines: [
      "Everything that glitters isn't gold",
      "So things aren't always gonna go the way you really hope but",
      "There's a door that opens every time that one closes and",
      "If you're feeling broke it doesn't mean that you're broken",
    ],
  },
  {
    song: "More to Life",
    lines: [
      "I don't wanna think about the times I was sad",
      "Cause it doesn't make a difference when it's all in the past",
      "I thought that I was missing what I already had",
      "So I'm breaking free from everything that's holding me back",
    ],
  },
  {
    song: "Sorry",
    lines: [
      "I thought that you would catch me if I started to fall",
      "But you couldn't even answer all the times that I called",
      "I needed you the most when you put up a wall",
      "And I'm still tryna figure out where everything went wrong",
    ],
  },
  {
    song: "Sorry",
    lines: [
      "But I really mean I'm sorry for your loss",
      "Cause I hope you understand I would have given you all",
      "Of the things you could want for now and ever",
      "As long as we would stay together",
    ],
  },
  {
    song: "Coulda Been (feat. Emerson Vernon)",
    lines: [
      "People say it's better to have loved and then lost",
      "But now I'm wishing that I never even felt it at all",
      "And now I'm wishing you would call like the times we would talk",
      "But now the only time we do is when my brain will recall",
    ],
  },
  {
    song: "Coulda Been (feat. Emerson Vernon)",
    lines: [
      "You know I never really meant to push your buttons",
      "And that I always tried to be the one you trusted",
      "I hope you're doing well and your life's becoming",
      "The way you'd always tell me that you said you wanted",
    ],
  },
  {
    song: "Pretend (feat. CJ Vana)",
    lines: [
      "Tell me why the past always sticking in my mind",
      "When I tried to play my part I couldn't remember all my lines",
      "Everything was dark, head spinning like a cyclone",
      "Every day was hard I was standing on a tightrope",
    ],
  },
  {
    song: "Pretend (feat. CJ Vana)",
    lines: [
      "I was feeling low, I was sick of being anxious",
      "I was like a ghost, used to wonder where the days went",
      "Knew I had to go, can't be thinking in a frame when",
      "I ain't got no hope, cause it only ends in anguish",
    ],
  },
  {
    song: "Alive But I'm Dying",
    lines: [
      "If I say that I got no regrets in life I'm lying",
      "And if I say there's something in my eye then I been crying",
      "Cause I been feeling up and down",
      "My heads been spinning all around",
      "And if I say that I'm feeling alive, well I've been dying",
    ],
  },
  {
    song: "Alive But I'm Dying",
    lines: [
      "So the hardest part is waking up with every day",
      "Rolling out of bed and falling straight in my grave",
      "Calling out for help but no one's near me",
      "And I did it to myself, I see that clearly",
    ],
  },
  {
    song: "Moonlight Freestyle",
    lines: [
      "I'm laying in my bed and I be staring at the moonlight",
      "Wishing I could throw it all away and start a new life",
      "Learning how to live with my mistakes I know in due time",
      "I won't wake up every single day feeling blue crying",
    ],
  },
  {
    song: "Moonlight Freestyle",
    lines: [
      "Getting sick of always running from my pain and tryna numb it",
      "Yeah I know there's gon be times where I ain't really feeling nothing",
      "But I'll keep on living life until the day I'm feeling something",
    ],
  },
  {
    song: "Need Somebody",
    lines: [
      "Everyone that I let get closer",
      "Waits until my guard is lowered",
      "Shoot me once before I notice",
      "They shoot more times and start reloading",
    ],
  },
  {
    song: "Need Somebody",
    lines: [
      "The memories are bittersweet",
      "If you really want the truth, I still wish you didn't leave",
      "Now I'm waking up alone like the way I fall asleep",
      "And I see you coming home, but that's only in my dreams",
    ],
  },
  {
    song: "Promise",
    lines: [
      "I wish I could promise",
      "That everything will be just fine",
      "But I don't always get the option",
      "To find a little peace of mind",
    ],
  },
  {
    song: "Promise",
    lines: [
      "My condition is a part of me",
      "The way I think is like my arms and knees",
      "So can you tell if that's hard to see",
      "And can you love someone who's heart might bleed?",
    ],
  },
  {
    song: "Miserable in Secret",
    lines: [
      "Because I'm miserable in secret",
      "If I told you would you keep it",
      "Cause I don't think that I can deal with",
      "Anymore holding in these feelings",
    ],
  },
  {
    song: "Reflection",
    lines: [
      "Looking in the mirror, I can't tell you what I see, yeah",
      "Never been the same as the kid I used to be, yeah",
      "I wish that I could jump up inside a time machine",
    ],
  },
  {
    song: "Rainbow Road",
    lines: [
      "People come and go with the passing seasons",
      "When someone says they love me now; don't know if I believe them",
      "And it's all a product of your nature",
      "So I'll say goodbye and never call you later",
    ],
  },
  {
    song: "What Do I Know?",
    lines: [
      "I've been wide awake, with my eyes closed",
      "Tryna find the way, with a blindfold",
      "Think I'll be okay, but, well, what do I know?",
      "Living for the day, I'm just watching where my life go",
    ],
  },
];
