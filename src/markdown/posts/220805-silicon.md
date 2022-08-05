---
title: "Silicon"
date: "2022-05-14"
---

I rewatched Game of Thrones last week. It's still just as great and just as
terrible an ending as its ever been (in case you were curious if it changed).
But rewatching and rereading always results in new insights, and several things
struck me while watching this time around.

First, what a miracle we live in the modern world, without lords and ladies and
kings. At the end all of the lords laugh at Sam's suggestion that they try
democracy. How incredibly presumptuous of them to think that _they_ can resist
the temptation to corruption with power.

I've written before on the nature of power, and how democracy and inclusive
institutions are the only stable system of government. If that suggestion comes
as a surprise to you, I suggestion you [Why Nations Fail][wnf] a read.

But a more result of rewatching was I began to meditate on my own job and my
place in the world.

In Game of Thrones there isn't really a war for resources. Everyone just wants
power. _Except there is._ The resource is land, and in an agricultural society,
land is resources: food. It's remarkable how much agriculture is disrupted by
the wars for agricultural resources in GoT.

I started thinking about the present day, and, like I mentioned, how great it is
that we don't have to deal with that feudal bullshit. Because its true, and
awesome, but we _do_ have wars, and wars of resources. But what is the most
important resource of the present?

Well, obviously, semiconductors.

# My Job

A year ago I knew nothing about semiconductors. I still know nothing about
semiconductors, but I know a hell of a lot more than the average person now.

I work as a contractor for a company that does ellipsometry, providing tools to
the big semiconductor houses (TSMC, Intel, Samsung, Hynix, etc., etc.). I have
never done anything more interesting in my life.

To sum up what we do: imagine a [silicon wafer][wafer]. Onto this is printed an
integrated circuit. The process of photolithography is basically of four steps
(this is highly simplified but about as good as I can explain (and understand)):

1. Coat the wafer in "photoresist", a chemical can be baked and then etched.
2. Etch your pattern into the photoresist with a laser. Then use a "developer"
   to remove the parts of the photoresist coating that you "etched."
3. Lay on your material for the structures.
4. Remove the photoresist

When I say this is highly simplified, I really mean this could be comletely
wrong, I'm not really sure, and will be looking into it more again to understand
better. (This job has required more repeated learning of concepts than anything
I've hitherto tried to master.) For a better introduction to photolithography,
see the amazing channel of [Sam Zeloof, Garage Fab Extraordinaire][zeloof]

Regardless, this process produces, essentially, nanotechnology. That is,
structures on the order of nanometers. You can't look at this stuff with a
microscope, and a laser would be too coarse and probably destroy the chip, so
you have to use special techniques to figure out if what you put on the chip is
what you want on the chip. So we have [Rigorous Coupled Wave Analysis][rcwa],
and ellipsometry.

There is no way in hell I'm getting into the math and physics of this, but the
principle is pretty simple:

1. Shine a light at an angle at the wafer.
2. Position a camera at the opposite end of the reflection (remember, light will
   reflect at an equal Angle of Reflection to the Angle of Incidence).
3. Capture that light, and do some fancy math (RCWA) to figure out what the
   dimensions of the structure on the board are.

![Ellipsometry](./images/ellipsometer.jpg)

This stuff is insanely math intensive, insanely performance dependant, and
insanely important. Linear Algebra, Calculus, and Machine Learning are all
pretty essential parts of this job. It feels like working towards a masters
degree and getting paid a lot of money to do it.

But the thing that feels truly incredible: the level of precision required in
these fabs is beyond anything the world has ever had to use. This is the
most advanced manufacturing in the history of the world. Hands down. And I'm a
part of the tool chain (in an incredibly small way, sure) that helps reach that
level of precision.

I feel like a seventeen year old kid that lied on his military application and
ended up at Midway. I've never formally studied mathematics or computer science,
and I'm the dumbest guy in every Teams room, but I'm actually helping and
producing.

One of our products recently had a release. I contributed some code on it that
lead to a performance improvement of about 14% in one particular operation. I'm
far from the only one who contributed to this, but that release (which had more
than just my speed improvement) lead to apps people at TSMC being able to go
home earlier than they used to. Christ that feels good to know. I actually did
something that mattered, even if in a small way.

# Helping Build the Arsenal of Democracy

The Great Wars of the future will not be fought over oil. This is increasingly
obvious as the world transitions away from fossil fuels. They will be fought
with, and over, semiconductors.

We all know what war I'm talking about. Taiwan is a jewel. TSMC and Intel are
the twin kings of Semiconductors, and TSMC dwarfs Intel's market cap. (Samsung
and Nvidia actually lead Intel and TSMC respectively, but they are more
specialized fabs, for memory and graphics respectively). If China were to invade
Taiwan, I can think of four results:

1. China blockades Taiwan and a huge portion of the world's semiconductors are
   sidelined
2. China scuttles TSMC and a huge portion of the world's semiconductors are
   sidelined.
3. Taiwan scuttles TSMC and a huge portion of the world's semiconductors are
   sidelined.
4. America scuttles TSMC and a huge portion of the world's semiconductors are
   sidelined.

Imagine the 2020-22 chip shortage on steroids. Christ. It would be an economic
bloodbath.

Things are going to get interesting in the next 10 years. And I have a front row
seat. 🫠

[wnf]: https://www.amazon.com/Why-Nations-Fail-Origins-Prosperity/dp/0307719227/ref=sr_1_1?crid=XQ5R3B73L02W&keywords=why+nations+fail&qid=1659731931&sprefix=why+nations+fail%2Caps%2C132&sr=8-1
[wafer]: https://en.wikipedia.org/wiki/Wafer_(electronics)
[zeloof]: https://www.youtube.com/c/SamZeloof
[rcwa]: https://en.wikipedia.org/wiki/Rigorous_coupled-wave_analysis
