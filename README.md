# TransferView

## Description

A tool that aims to alleviate the nuisance of scrolling through ASSIST.org agreements. At a glance, a student can see every class at a California Community College that satisfies their transfer or lower division requirements.

## API Routes

All of the following JSON data comes from ASSIST.org.

The routes below are all GET requests to the TransferView API.

Everything wrapped in braces {} is meant to be substituted for an acceptable parameter. How to get those parameters is denoted below.

"74" is currently the only working option for the "academicYear" parameter.

### School Information

1. https://classglance.onrender.com/schools/community-colleges [^1]

2. https://classglance.onrender.com/schools/four-years [^2]

3. https://classglance.onrender.com/schools/major-data/{receivingId}/{sendingId}/{academicYear} [^3]

4. https://classglance.onrender.com/schools/{academicYear}/{sendingId}/{receivingId}/{key}/lower-divs [^4]

Sends the list of California Community Colleges available in the ASSIST.org API. The "id" property can be used for "sendingId" parameters. [^1]

Sends the list of UC / CSU institutions available in the ASSIST.org API. The "id" property can be used for "receivingId" parameters. [^2]

Sends a list of all available majors with transferable coursework from a UC / CSU. The "key" property can be used for "key" parameters. [^3]

Creates a list of all lower division classes available for a certain major in the ASSIST.org API. [^4]

### Articulation Information

> https://classglance.onrender.com/articulations/{academicYear}/{sendingId}/{receivingId}/{key}/raw

Test route. Allows one to see raw JSON data from an ASSIST.org agreement.

> https://classglance.onrender.com/articulations/{academicYear}/{sendingId}/{receivingId}/{key}

Creates a list of courses from the given California Community College that transfer to the given UC / CSU institution. Series of courses will be a feature relatively soon.

