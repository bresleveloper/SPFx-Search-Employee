import { WebPartContext } from "@microsoft/sp-webpart-base";
import { SPHttpClientResponse, SPHttpClient } from '@microsoft/sp-http';
export class ServiceSP {
  public getAllUsersProfiles(context: WebPartContext, callback) {
    let oldArray = [];
    let newArray = [];
    let cont:number = 1;
    function getUsers (start:number) {
      let q: string =  context.pageContext.web.absoluteUrl +
      `/_api/search/query?querytext='*'&rowlimit=500&startrow=${start}&sourceid='b09a7990-05ea-4af9-81ef-edfab16c4e31'&SelectProperties='Title,WorkEmail,PictureURL, SPS-HideFromAddressLists, RefinableString116, JobTitle'`
      context.spHttpClient
      .get(q, SPHttpClient.configurations.v1)
      .then((response: SPHttpClientResponse) => {
        response.json().then((data) => {
          let results = data.PrimaryQueryResult.RelevantResults.Table.Rows;
          let arr = []
          results.forEach(function (row) {
            let item = {}
            row.Cells.forEach(function (cell) { item[cell.Key] = cell.Value })
            arr.push(item)
          });
          if (arr.length > 0) {
            newArray = [ ...oldArray, ...arr ]
            oldArray = newArray
          }
          cont++ ;
            // console.log(cont, 'cont');
          if (cont === 5){
            let activ = oldArray.filter(i=> i['SPS-HideFromAddressLists'] === "0")            
             callback(activ);
          }
        });
      });
     }
     getUsers(0);
     getUsers(500);
     getUsers(1000);
     getUsers(1500);
  }
}