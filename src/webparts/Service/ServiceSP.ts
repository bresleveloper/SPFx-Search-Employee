import { WebPartContext } from "@microsoft/sp-webpart-base";
import { SPHttpClientResponse, SPHttpClient } from '@microsoft/sp-http';  
import { BirthdayStste } from '../birthday/components/BirthdayStste'
export class ServiceSP {

    public getAllList (context: WebPartContext, callback) {
let abs =  context.pageContext.web.absoluteUrl ;
let rel =  context.pageContext.web.serverRelativeUrl;
let dom = abs.replace(rel, "");

        let q:string = 
         dom +
         `/_api/search/query?querytext='*'&rowlimit=2000&sourceid='b09a7990-05ea-4af9-81ef-edfab16c4e31'&SelectProperties='Title,WorkEmail,PreferredName,FirstName, WorkPhone, Department ,
      SPS-JobTitle,PictureURL, RefinableString110, RefinableString111, RefinableString112, RefinableString113, RefinableString114,RefinableString115, RefinableString116'`
         console.log("links", abs, rel, dom, q)

            context.spHttpClient
                     .get( q, SPHttpClient.configurations.v1)
                        .then((response: SPHttpClientResponse) => {
                          response.json().then((data) => {              
                            console.log('search results', q, data);
                            let results = data.PrimaryQueryResult.RelevantResults.Table.Rows;
                            let arr = []
                            console.log('rows', results);                 
                            results.forEach(function (row) {
                              let item = {}
                              row.Cells.forEach(function (cell) { item[cell.Key] = cell.Value })
                              arr.push(item)
                            });            
                            console.log('normalized', arr);
                            callback(arr)
                          });
                        });
                        
                    
           
    }
}







// export class ServiceSP {
//     public getAllList (context: WebPartContext) {
//         let q:string =  context.pageContext.web.absoluteUrl + `_api/search/query?querytext='*'&rowlimit=2000&sourceid='b09a7990-05ea-4af9-81ef-edfab16c4e31'&clienttype='ContentSearchRegular'`
//          return new Promise (async (res, rej)=>{


//             context.spHttpClient.get(
//                 q, SPHttpClient.configurations.v1)
//                     .then((response: SPHttpClientResponse) => {
//                         console.log('search response', response);
//                         response.json().then((data:any) => {
//                         console.log('search results', data);
//                       });
//                     });


//          });

//     }
// }