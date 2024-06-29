# TransferView

## Description

The backend for TransferView.

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

   4. https://classglance.onrender.com/schools/{academicYear}/{sendingId}/{receivingId}/{key}/lower-divs

      Creates a list of all lower division classes available for the given major in the ASSIST.org API.
   
</details>

<details>
   
   <summary>Articulation Information</summary>
   
   1. https://classglance.onrender.com/articulations/{academicYear}/{sendingId}/{receivingId}/{key}

      Returns a list including the California Community College course(s) that transfer to the given UC / CSU institution and the UC / CSU equivalent(s). 

</details>

