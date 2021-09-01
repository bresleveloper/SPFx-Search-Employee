import * as React from 'react';
import styles from './Birthday.module.scss';
import { IBirthdayProps } from './IBirthdayProps';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { BirthdayStste } from './BirthdayStste';
import { ServiceSP } from '../../Service/ServiceSP'

export default class Birthday extends React.Component<IBirthdayProps, BirthdayStste, {}> {
  public spOp: ServiceSP;
  constructor(props: IBirthdayProps) {
    super(props)
    this.spOp = new ServiceSP();
    this.state = { List: null, listToUse: null }

    //make sure minHeight is correnct, only num, add "px"
  }


  spiltf(currentValues) {
    let p = [{ img: "https://cdn.pixabay.com/photo/2016/03/09/15/10/man-1246508__340.jpg", name: "ארז ישראלי", SPSUnit: "מנהל ראשי", email: "aa@aa.com", date: "28/05" },
    { img: "https://cdn.pixabay.com/photo/2016/03/09/15/10/man-1246508__340.jpg", name: "יעקב", SPSUnit: "מנהל ראשי", email: "aa@aa.com", date: "28/05" },
    { img: "https://cdn.pixabay.com/photo/2016/03/09/15/10/man-1246508__340.jpg", name: "משה", SPSUnit: "מנהל ראשי", email: "aa@aa.com", date: "28/05" },
    { img: "https://cdn.pixabay.com/photo/2016/03/09/15/10/man-1246508__340.jpg", name: "נתן", SPSUnit: "מנהל ראשי", email: "aa@aa.com", date: "28/05" },
    { img: "https://cdn.pixabay.com/photo/2016/03/09/15/10/man-1246508__340.jpg", name: "רן", SPSUnit: "מנהל ראשי", email: "aa@aa.com", date: "28/05" },
    { img: "https://cdn.pixabay.com/photo/2016/03/09/15/10/man-1246508__340.jpg", name: "רחל", SPSUnit: "מנהל ראשי", email: "aa@aa.com", date: "28/05" },
    { img: "https://cdn.pixabay.com/photo/2016/03/09/15/10/man-1246508__340.jpg", name: "ירדן", SPSUnit: "מנהל ראשי", email: "aa@aa.com", date: "28/05" },
    { img: "https://cdn.pixabay.com/photo/2016/03/09/15/10/man-1246508__340.jpg", name: "דניאל", SPSUnit: "מנהל ראשי", email: "aa@aa.com", date: "28/05" },
    { img: "https://cdn.pixabay.com/photo/2016/03/09/15/10/man-1246508__340.jpg", name: "יפה", SPSUnit: "מנהל ראשי", email: "aa@aa.com", date: "28/05" },
    { img: "https://cdn.pixabay.com/photo/2016/03/09/15/10/man-1246508__340.jpg", name: "נעימה", SPSUnit: "מנהל ראשי", email: "aa@aa.com", date: "28/05" },
    { img: "https://cdn.pixabay.com/photo/2016/03/31/15/27/arm-1293300__340.png", name: "זיוה ארקדיה", SPSUnit: "מפתחת בכירה", email: "dd@dd.com", date: "12/04" }]

    function chunk(arr, chunkSize) {
      if (arr) {
        if (chunkSize <= 0) throw "Invalid chunk size";
        var R = [];
        for (var i = 0, len = arr.length; i < len; i += chunkSize)
          R.push(arr.slice(i, i + chunkSize));
        return R;
      }
    }

    function style(people) {
      if (people) {
        let h = `msteams:https://teams.microsoft.com/l/chat/0/0?users=${people.WorkEmail} && ${people.WorkEmail} != 'NULL' ? ${people.WorkEmail} : "" &&message="מזל טוב ליום הולדתך""`
        let imgP = people.PictureURL === null || people.PictureURL === undefined ? "https://cdn.pixabay.com/photo/2016/03/09/15/10/man-1246508__340.jpg" : people.PictureURL;
        return (
          <div className={styles.main}>
            <div className={styles.top}>
              <img className={styles.profile} src={imgP}></img>
              {/* <img className={styles.profile} src={people.img}></img> */}
              <div className={styles.Details}>
                <h5 className={styles.Name}>{people.PreferredName}</h5>
                <p className={styles.role}>{people.Department}</p>
                <a href={h}>
                  <img className={styles.MessageIcon} src={require('../../../icons/Email_icon.png')} alt="Email_icon" />
                </a>
              </div>
            </div>
            <div className={styles.Left}>
              <img className={styles.CakeIcon} src={require('../../../icons/Birthday_icon.png')} alt="Birthday_icon" />
              <span className={styles.date}>{people.bDay}</span>
            </div>
          </div>
        )
      }
      return undefined
    }
    // let ar = chunk(num.reverse(),2);
    // let ar = chunk(p, 4);
    let ar = chunk(currentValues, 4);
    if (ar) {
      if (ar.length > 0) {
        return ar.reverse().map((a, i) => {
          return (
            <div>
              {style(a[0])}
              {style(a[1])}
              {style(a[2])}
              {style(a[3])}
            </div>
          )
        })
      }
    }
    // console.log(ar);

  }
  componentDidMount() {
    this.spOp.getAllList(this.props.context, (arr) => {
      console.log(arr);
      this.setState({ List: arr })
    });
    console.log(this.props.after);
    console.log(this.props.before)
  }

  check = (date) => {
    if (date) {
      let currentdA = new Date();
      let currentdB = new Date();
      let oldUserD = new Date(date);
      let Day = oldUserD.getDate();
      let Month = oldUserD.getMonth() + 1;
      let currentY = currentdA.getFullYear();
      let UserD = new Date(`${currentY}/${Month}/${Day}`);
      let before = currentdB.setDate(currentdB.getDate() - Number(this.props.before))
      let after = currentdA.setDate(currentdA.getDate() + Number(this.props.after))
      let condition = new Date(before) < UserD && UserD < new Date(after);
      return condition
    }
    return false
  }
  date = () => {
    function fix(date) {
      let currentd = new Date(date);
      let Day = currentd.getDate();
      let Month = currentd.getMonth() + 1;
      let d = Day < 10 ? "0" + Day : Day;
      let m = Month < 10 ? "0" + Month : Month;
      return d + '/' + m
    }
    let list = this.state.List;
    let currentValues = list.filter(i => this.check(i.RefinableString116))
    console.log(currentValues);
    for (let index = 0; index < currentValues.length; index++) {
      const element = currentValues[index];
      element.bDay = fix(element.RefinableString116)
    }
    // this.setState({listToUse: currentValues})
    return this.spiltf(currentValues)

  }
  public render(): React.ReactElement<IBirthdayProps> {


    // public render() {
    var settings = {
      dots: true,
      infinite: false,
      speed: 1000,
      slidesToShow: 1,
      slidesToScroll: 1,
      initialSlide: 0,
      pauseOnHover: true,
      autoplay: true,
      autoplaySpeed: 4000,
      arrows: false,
      rtl: true,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            infinite: true,
            dots: true
          }
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            // initialSlide: 2
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
      ]
    };

    return (
      <div className={styles.birthday}>
        <div className={styles.container}>
          <div className={styles.row}>
            <div className={styles.column}>
              <div className={styles.headline}>
                <img className={styles.Ballons} src={require('../../../icons/Ballons.png')} alt="Ballons" />
                <p className={styles.title}>מזל טוב לחוגגים</p>
              </div>
              {this.state.List && this.date()}
              <Slider className={styles.SliderComp} {...settings}>
              </Slider>
            </div>
          </div>
        </div>
      </div>
    );
  }
}



// function search (query: string, callback): void {
//   console.log('search query', query);
//   //this.ajaxCounter++;

//   this.props.spHttpClient.get(
//     this.props.absoluteUrl +
//     `/_api/search/query?` + query, SPHttpClient.configurations.v1)
//     .then((response: SPHttpClientResponse) => {
//       response.json().then((data) => {

//         console.log('search results', query, data);

//         // let results = data.PrimaryQueryResult.RelevantResults.Table.Rows;
//         // let arr = []

//         // console.log('rows', results);

//         // results.forEach(function (row) {
//         //   let item = {}
//         //   row.Cells.forEach(function (cell) { item[cell.Key] = cell.Value })
//         //   arr.push(item)
//         // });

//         // console.log('normalized', arr);
//         // callback(arr)
//       });
//     });
// }

// function getBirthdays () {
//   console.log('hi getBirthdays111111111111111');
//     let end = "'&sourceid='b09a7990-05ea-4af9-81ef-edfab16c4e31'" +
//     "&rowlimit=2000"

//   this.search(end, (arr) => {
//     console.log('arr in search callback', arr);
//   });
// }
// getBirthdays()


// function spiltf() {
//   let p = [{ img: "https://cdn.pixabay.com/photo/2016/03/09/15/10/man-1246508__340.jpg", name: "ארז ישראלי", SPSUnit: "מנהל ראשי", email: "aa@aa.com", date: "28/05" },
//   { img: "https://cdn.pixabay.com/photo/2016/03/09/15/10/man-1246508__340.jpg", name: "יעקב", SPSUnit: "מנהל ראשי", email: "aa@aa.com", date: "28/05" },
//   { img: "https://cdn.pixabay.com/photo/2016/03/09/15/10/man-1246508__340.jpg", name: "משה", SPSUnit: "מנהל ראשי", email: "aa@aa.com", date: "28/05" },
//   { img: "https://cdn.pixabay.com/photo/2016/03/09/15/10/man-1246508__340.jpg", name: "נתן", SPSUnit: "מנהל ראשי", email: "aa@aa.com", date: "28/05" },
//   { img: "https://cdn.pixabay.com/photo/2016/03/09/15/10/man-1246508__340.jpg", name: "רן", SPSUnit: "מנהל ראשי", email: "aa@aa.com", date: "28/05" },
//   { img: "https://cdn.pixabay.com/photo/2016/03/09/15/10/man-1246508__340.jpg", name: "רחל", SPSUnit: "מנהל ראשי", email: "aa@aa.com", date: "28/05" },
//   { img: "https://cdn.pixabay.com/photo/2016/03/09/15/10/man-1246508__340.jpg", name: "ירדן", SPSUnit: "מנהל ראשי", email: "aa@aa.com", date: "28/05" },
//   { img: "https://cdn.pixabay.com/photo/2016/03/09/15/10/man-1246508__340.jpg", name: "דניאל", SPSUnit: "מנהל ראשי", email: "aa@aa.com", date: "28/05" },
//   { img: "https://cdn.pixabay.com/photo/2016/03/09/15/10/man-1246508__340.jpg", name: "יפה", SPSUnit: "מנהל ראשי", email: "aa@aa.com", date: "28/05" },
//   { img: "https://cdn.pixabay.com/photo/2016/03/09/15/10/man-1246508__340.jpg", name: "נעימה", SPSUnit: "מנהל ראשי", email: "aa@aa.com", date: "28/05" },
//   { img: "https://cdn.pixabay.com/photo/2016/03/31/15/27/arm-1293300__340.png", name: "זיוה ארקדיה", SPSUnit: "מפתחת בכירה", email: "dd@dd.com", date: "12/04" }]

//   function chunk(arr, chunkSize) {
//     if (chunkSize <= 0) throw "Invalid chunk size";
//     var R = [];
//     for (var i = 0, len = arr.length; i < len; i += chunkSize)
//       R.push(arr.slice(i, i + chunkSize));
//     return R;
//   }

//   function style(people) {
//     if (people) {
//      let h = `msteams:https://teams.microsoft.com/l/chat/0/0?users=${people.WorkEmail} && ${people.WorkEmail} != 'NULL' ? ${people.WorkEmail} : "" &&message="מזל טוב ליום הולדתך""`
//       return (
//           <div className={styles.main}>
//             <div className={styles.top}>
//               <img className={styles.profile} src={people.img}></img>
//               <div className={styles.Details}>
//                 <h5 className={styles.Name}>{people.name}</h5>
//                 <p  className={styles.role}>{people.SPSUnit}</p>
//                 {/* <a href=">${this.getPropSpan(filtered, "Email")}</a> */}
//             <img className={styles.MessageIcon} src={require('../../../icons/Email_icon.png')} alt="Email_icon" />
//               </div>
//             </div>
//             <div className={styles.Left}>
//               <img className={styles.CakeIcon} src={require('../../../icons/Birthday_icon.png')} alt="Birthday_icon" />
//               <span className={styles.date}>{people.date}</span>
//             </div>
//           </div>
//       )
//     }
//     return undefined
//   }
//   // let ar = chunk(num.reverse(),2);
//   // let ar = chunk(p, 4);
//   let ar = chunk(this.state.list, 4);

//   // console.log(ar);
//   return ar.reverse().map((a, i) => {
//     return (
//       <div>
//         {style(a[0])}
//         {style(a[1])}
//         {style(a[2])}
//         {style(a[3])}
//       </div>
//     )
//   })
// }