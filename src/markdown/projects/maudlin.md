---
title: "Maudlin"
url: "https://srv.stdwtr.io"
featureImage: "./maudlin.png"
short: "maudlin"
category: "backend"
tags: ["scrapy", "beautifulsoup4", "selenium", "flask", "sqlalchemy", "nltk", "materialize css", "postgres"]
---

This was literally just something I wanted to do. I had written a lot of
scrapers, but never a crawler, and I'd never tried scrapy. So I wanted to build
a crawler with scrapy, use it to generate sentiment analysis of news articles,
and see what news agencies were the most happy or sad or neutral.

I wrote about 30 scrapers, some with selenium, some with just scrapy's request
system, and added each one to a crontab to run at varied intervals. I used
sqlalchemy to store the articles and agencies, and then built a flask site to
display the information, with materialize css as a basic css framework to make
it look semi-spiffy. Then I added in a word cloud for each news agency for the
day, and the result is always running. The front page shows what spider is
running at any given time, so sometimes you might see it say "CNN" or
"ALJAZEERA" is running.

The initial deployment was on a raspberry pi 4, but it became just too much for
the little guy and I moved up to a desktop running Arch I had lying around. It's
up to fifty-five thousand articles now, and one the things I found interesting
was how many old articles have been added. It only queries the front page of any
news agency, but sometimes they feature articles from their archives.

One of the most interesting things to do in this project was figure out how to
represent the sentiment as a color. I wanted neg/pos sentiments to be displayed
as a gradient between red and green. Turns out, you can literally just represent
any two points in hex color space as points on a graph and to find the point in
the gradient you just take the distance. The code's [here][0], if you want to
see it.

[0]: https://github.com/malan88/maudlin/blob/51ee8c60aa8e4ab5328d981cbd45ec670451d32b/newscrawler/utils.py#L11-L18
