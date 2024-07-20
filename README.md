# ClassGlance

## Description

The backend for [TransferVision](https://github.com/michaelrgarcia/transfer-view).

## API Routes (GET)

Everything wrapped in braces {} is a parameter. "74" is currently the only working option for the "academicYear" parameter.

*All of the following JSON data comes from ASSIST.org.*

<details>
   
   <summary>School Information</summary>
   
   1. https://classglance.onrender.com/schools/community-colleges

      Sends the list of California Community Colleges available in the ASSIST.org API. The "id" property can be used for "sendingId" parameters. 

   2. https://classglance.onrender.com/schools/four-years

      Sends the list of UC / CSU institutions available in the ASSIST.org API. The "id" property can be used for "receivingId" parameters.

   3. https://classglance.onrender.com/schools/major-data/{receivingId}/{sendingId}/{academicYear}

      Sends a list of all available majors with transferable coursework from a UC / CSU. The "key" property can be used for "key" parameters. 
   
</details>

<details>
   
   <summary>Class Information</summary>
   
   1. https://classglance.onrender.com/schools/{academicYear}/{sendingId}/{receivingId}/{key}/lower-divs

      Creates a list of all lower division classes available for the given major in the ASSIST.org API.

</details>

