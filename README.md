# TransferView

## Description

A tool that aims to alleviate the nuisance of scrolling through ASSIST.org agreements. At a glance, a student can see every class at a California Community College that satisfies their transfer or lower division requirements.

## API Routes (GET)

**All of the following JSON data comes from ASSIST.org.**

Everything wrapped in braces {} is a parameter. How to get those parameters is denoted below. "74" is currently the only working option for the "academicYear" parameter.

<details>
   
   <summary>School Information</summary>
   
   1. https://classglance.onrender.com/schools/community-colleges

      Sends the list of California Community Colleges available in the ASSIST.org API. The "id" property can be used for "sendingId" parameters. 

   2. https://classglance.onrender.com/schools/four-years

      Sends the list of UC / CSU institutions available in the ASSIST.org API. The "id" property can be used for "receivingId" parameters.

   3. https://classglance.onrender.com/schools/major-data/{receivingId}/{sendingId}/{academicYear}

      Sends a list of all available majors with transferable coursework from a UC / CSU. The "key" property can be used for "key" parameters. 

   4. https://classglance.onrender.com/schools/{academicYear}/{sendingId}/{receivingId}/{key}/lower-divs

      Creates a list of all lower division classes available for a certain major in the ASSIST.org API.
   
</details>

<details>
   
   <summary>Articulation Information</summary>
   
   1. https://classglance.onrender.com/articulations/{academicYear}/{sendingId}/{receivingId}/{key}/raw

      Test route. Allows one to see raw JSON data from an ASSIST.org agreement.

   2. https://classglance.onrender.com/articulations/{academicYear}/{sendingId}/{receivingId}/{key}

      Creates a list of courses from the given California Community College that transfer to the given UC / CSU institution. Series of courses will be a feature relatively soon.
   
</details>

