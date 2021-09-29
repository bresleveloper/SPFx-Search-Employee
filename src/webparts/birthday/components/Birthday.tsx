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
  }


  spiltf(currentValues) {
    
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
        let imgP = people.PictureURL === null || people.PictureURL === undefined ? require('./iconPerson.jpg') : `https://shagrir365.sharepoint.com/_layouts/15/userphoto.aspx?size=S&url=${people.PictureURL}`;
        return (
          <div className={styles.main}>
            <div className={styles.top}>
              <img className={styles.profile} src={`${imgP}`}></img>
              <div className={styles.Details}>
                <h5 className={styles.Name}>{people.Title}</h5>
                <p className={styles.role}>{people.JobTitle}</p>
                {/* https://outlook.office.com/mail/deeplink/compose?to${people.WorkEmail}  &subject=מזל%20טוב%20ליום%20הולדתך` */}
                <a href={`mailto:${people.WorkEmail}?subject=מזל טוב ליום הולדתך`}>
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
    let ar = chunk(currentValues, 4);
    // console.log(ar, "ar");
    
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
    this.spOp.getAllUsersProfiles(this.props.context, (arr) => {
      // console.log(arr);
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
    currentValues.sort(function (a, b) {
      let x = a.Title.toLowerCase();
      let y = b.Title.toLowerCase();
      if (x < y) { return -1; }
      if (x > y) { return 1; }
      return 0;
    });
    return this.spiltf(currentValues)

  } 
  public render(): React.ReactElement<IBirthdayProps> {
    var settings = {
      dots: this.props.Dots,
      speed: this.props.Speed,
      slidesToShow: this.props.SlidesToShow,
      slidesToScroll: 1,
      initialSlide: 0,
      pauseOnHover: this.props.PauseOnHover,
      autoplay: this.props.Autoplay,
      autoplaySpeed: this.props.AutoplaySpeed,
      arrows: false,
      rtl: true
    };

    return (
      <div className={styles.birthday}>
        <div className={styles.container}>
          <div className={styles.row}>
            <div className={styles.column} style={{ minHeight: this.props.minHeight }}>
              <div className={styles.headline}>
                <img className={styles.Ballons} src={require('../../../icons/Ballons.png')} alt="Ballons" />
                <p className={styles.title}>מזל טוב לחוגגים</p>
              </div>
              {this.state.List &&
              <Slider className={styles.SliderComp} {...settings}>
               {this.date()}
              </Slider>}
            </div>
          </div>
        </div>
      </div>
    );
  }
}