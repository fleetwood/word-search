# word-search
A word search app that polls a library of 300K words, allowing for dynamic conditions.

#### Limit length
`nnnn` Word consists of four letter or less. **TPRA** *Matches*: **PART**, **RAP** *Not*: PARTY

#### Variable search
`nnn?nnn` Matches any character. **?AY** *Matches*: **P**AY, AY**E**, *Not*: SOY.

#### Required pattern search
`nn"s"nn` Word must contain the letter _S_ anywhere in the string. *Matches*: **S**IT, PA**S**T, *Not*: PIT, PAT

`nn"say"nn` Word must contain the pattern _SAY_ anywhere in the string. *Matches*: SOOTH**SAY**ER, *Not*: SOOTHES

#### Required pattern by index
`nn(s)nnn` Word must contain the letter _S_ in the third position. *Matches*: PA**S**TURE, PA**S**TY, *Not*: PARSE, START

`nn(say)nn` Word must contain the pattern _SAY_ in the third position. *Matches*: ES**SAY**AY, RE**SAY**, *Not*: SAYER


## Deploy
[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy?template=https://github.com/fleetwood/word-search)
