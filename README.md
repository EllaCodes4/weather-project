
# Weather App

A fully functional weather app, displaying accurate weather & forecast information for thousands of cities around the world. This project was built as a SheCodes student.


## Features

- Five-day forecast from Weather API 
- Accurate weather data including high and low temperatures and forecast, humidity, wind, etc. 
- Temperature displayed in both Celsius and Fahrenheit 
- Current location button that uses Geolocation API
- Background & color palette changes depending on the weather conditions (sunny, cloudy, rainy, etc.)



## Lessons Learned


- I learned a lot building this project, two really important things. The first was how to intergrate APIs into my project. The second was about myself as a problem solver and the importance of collaboration. 
- One important lesson was how to make API requests using Axios. This was the first project I built using an API. I was intially challenged with conceptualizing what an API was and what its relationship was to Axios and my project. I marinated on the concept, researching, looking at visual aids, really trying to conceptualize. Once I understood the power I had to access the data I needed and render it on my project, that was it, I was off to coding! I used the documentation from the Weather API to request the weather data I needed for my app and then displayed that data using documentQuerySelectors, IDs, and innerHTML.
- The second lesson I learned was about myself as a problem solver and the importance of networking with other developers. While the API was required for my project, creating a function that changes the background video to mirror the current weather conditions was not. That was something I challenged myself with. As I was designing my app, I looked on my iPhone's Weather App and noticed that the background was a video that changed based off the weather. Inspired and curious, I thought, "What would it take to replicate that behavior?" I knew I'd need a function that used an If/Else statement. My original logic was something to the effect of, "If the weather is sunny, display the sunny weather video in the background. Else, if the weather is cloudy, show the cloudy weather video in the background. Else..." and so on and so forth. But that didn't work. I tried multiple approaches and failed. I researched using MDN, Stackflow, and my SheCodes Slack channel. Little by litte, I got more pieces to my puzzle. I was relentless in my pursuit to figure it out; it was like an itch that wouldn't stop itching until I solved the problem. I started inspecting other developers code and in doing so, found a developer who did what I was wanting to do. As I inspected her code, I realized she and I were doing the same thing, using the same coding logic, some of the puzzle pieces I had that I never figured out (e.g. setAttribute), came together. The difference between our functions was the value she used to change the background video. I was using the weather description value, but she used the weather icon value which encompassed far more weather descriptions and divided them all into main weather categories or "buckets". Having these "buckets" made it a lot easier to program. I could now have the function change the background to sunny whenever the sunny weather icon was received from the API. Else the background would change to rainy if the rainy weather icon was received. After weeks of trial and error, and using a lot of resources and perservance, I had figured it out with the help of fellow developers!
- I realized, "Hey! You didn't know how to do that, you weren't taught how to display a conditional background, but you trusted your gut and used logic. You researched and persevered." I learned that I could actually do this, face challenges and yet continue to find solutions. I also learned that inspecting other developers code is so helpful and why open source code is so valuable. 

- Other reflections: When I was challenged, I had to step back, check my coding logic, use the console log to identify where the problem was, and use my resources (i.e., MDN Web Docs, Stackflow, my SheCodes Slack channel, over developers, documentation, etc.) to figure out the solution. 
 
## Optimizations

Refactors, performance improvements

