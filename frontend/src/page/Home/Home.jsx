import React, { createElement, useEffect, useRef, useState } from "react";
import s from "./HomeStyle.module.css";
import ViewItemTaxi from "../../components/TaxiCon/ViewItemTaxi/ViewItemTaxi";
import OtherTaxisItem from "../../components/TaxiCon/OtherTaxisItem/OtherTaxisItem";
import ViewClientItem from "../../components/ClientsCon/ViewClientItem/ViewClientItem";
import ViewProfileItem from "../../components/ProfileCon/ViewProfileItem/ViewProfileItem";
import arrowBackIcon from "../../img/arrow_back.svg";
import logOutIcon from "../../img/logout.svg";
import profilePicImg from "../../img/profile_pic.svg";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { DISPATCHER } from '../SignIn/SignIn'

export default function Home() {
  const { login } = useParams();

  const baseURL = "http://localhost:8800";
  const containerProfileRef = useRef();
  const containerDashboardRef = useRef();
  const arrowWrRef = useRef();
  const selectDisRef = useRef();
  const selectStrRef = useRef();
  const [districts, setDistricts] = useState();
  const [streets, setStreets] = useState();
  const [numbers, setNumbers] = useState();
  const [orders, setOrders] = useState();
  const [clients, setClients] = useState();
  const [coordinates, setCoordinates] = useState();
  const [dispatchers, setDispatchers] = useState();

  const [dispatcher, setDispatcher] = useState();
  const [flagTaxis, setFlagTaxis] = useState(true);
  const [selDistrict, setSelDistrict] = useState();
  const [selClient, setSelClient] = useState();
  const strsWDiss = [
    {
      streets: [
        {
          id_street: 0,
          name: "такої вулиці не існує",
        },
        {
          id_street: 0,
          name: "такої вулиці не існує",
        },
      ],
    },
    {
      streets: [
        {
          id_street: 1,
          name: "вул. Героїв Сумщини",
        },
        {
          id_street: 2,
          name: "просп. Тараса Шевченка",
        },
      ],
    },
    {
      streets: [
        {
          id_street: 3,
          name: "просп. Михайла Лушпи",
        },
        {
          id_street: 4,
          name: "вул. Героїв Крут",
        },
      ],
    },
    {
      streets: [
        {
          id_street: 5,
          name: "просп. Свободи",
        },
        {
          id_street: 6,
          name: "вул. Сергія Табали",
        },
      ],
    },
    {
      streets: [
        {
          id_street: 7,
          name: "вул. Петропавлівська",
        },
        {
          id_street: 8,
          name: "вул. Степана Бандери",
        },
      ],
    },
  ];
  const [selStreets, setSelStreets] = useState(strsWDiss);
  const [selNesStreet, setSelNesStreet] = useState();
  const [bgCorState, setBgCorState] = useState(0);
  const [taxiDriverId, setTaxiDriverId] = useState(1);
  const taxisObj = [
    {
      data: "no data",
    },

    {
      id_taxdriver: 1,
      name: "Абдула",
      phone: "+380993256522",
      id_district: 1,
      id_last_street: 2,
      last_street: "просп. Тараса Шевченка",
      last_number: 2,
      delayTime: "0",
      last_latitude: 50.9219742,
      last_longitude: 34.8032296,
    },
    {
      id_taxdriver: 2,
      name: "Мурат",
      phone: "+380993256522",
      id_district: 1,
      id_last_street: 1,
      last_street: "вул. Героїв Сумщини",
      last_number: 3,
      delayTime: "0",
      last_latitude: 50.9115647,
      last_longitude: 34.8025041,
    },
    {
      id_taxdriver: 3,
      name: "Марк",
      phone: "+380986321920",
      id_district: 1,
      id_last_street: 1,
      last_street: "вул. Героїв Сумщини",
      last_number: 8,
      delayTime: "10",
      last_latitude: 50.9072076,
      last_longitude: 34.7992039,
    },

    {
      id_taxdriver: 4,
      name: "Вінцент",
      phone: "+380231883494",
      id_district: 2,
      id_last_street: 3,
      last_street: "просп. Михайла Лушпи",
      last_number: 4,
      delayTime: "0",
      last_latitude: 50.9048381,
      last_longitude: 34.8171006,
    },
    {
      id_taxdriver: 5,
      name: "Венсан",
      phone: "+380187249876",
      id_district: 2,
      id_last_street: 4,
      last_street: "вул. Героїв Крут",
      last_number: 2,
      delayTime: "5",
      last_latitude: 50.9069049,
      last_longitude: 34.8428491,
    },
    {
      id_taxdriver: 6,
      name: "Ібрагім",
      phone: "+380509185360",
      id_district: 2,
      id_last_street: 4,
      last_street: "вул. Героїв Крут",
      last_number: 9,
      delayTime: "11",
      last_latitude: 50.9190261,
      last_longitude: 34.8290749,
    },
  ];

  const currentClientObj = {
    id_client: 1,
    name: "Олександ",
    phone: "+380978241920",
    id_street: 2,
    street: "просп. Тараса Шевченка",
    number: 4,
    latitude: 50.9211641,
    longitude: 34.8049407,
  };

  const [funInitial, setFunInitial] = useState(() => (
    <div className={s.wr_all_taxis}>
      <div className={s.wr_view_part_of_content_body}>
        <ViewItemTaxi title={"Ім'я:"} desc={"ім'я"} />
        <ViewItemTaxi title={"Номер:"} atext={"номер"} />
        <ViewItemTaxi title={"Адреса таксиста:"} desc={"адреса таксиста"} />
        <ViewItemTaxi title={"Час затримки:"} desc={"Прибуде через X хвилин"} />
      </div>
      <div className={s.wr_btn_search}>
        {selectDisRef.current && selectDisRef.current.value != 0 ? (
          <div className={s.btn_search} onClick={onClickBtnApplyTaxi}>
            Призначити
          </div>
        ) : (
          ""
        )}
      </div>
      <div className={s.title_for_taxists_container}>Інші таксисти:</div>
      <div className={s.container_for_other_taxists}>
        
      </div>
    </div>
  ));

  useEffect(() => {
    const fetchAllDistricts = async () => {
      try {
        const res = await axios.get(baseURL + "/districts");
        setDistricts(res.data);
      } catch (e) {
        console.log("err from axios = " + e);
      }
    };
    fetchAllDistricts();

    const fetchAllstreets = async () => {
      try {
        const res = await axios.get(baseURL + "/streets");
        setStreets(res.data);
      } catch (e) {
        console.log("err from axios = " + e);
      }
    };
    fetchAllstreets();

    const fAllForObj = async () => {
      try {
        const res = await axios.get(baseURL + "/streets");
        setStreets(res.data);
      } catch (e) {
        console.log("err from axios = " + e);
      }
    };
    fAllForObj();

    const fetchAllNumbers = async () => {
      try {
        const res = await axios.get(baseURL + "/numbers");
        setNumbers(res.data);
      } catch (e) {
        console.log("err from axios = " + e);
      }
    };
    fetchAllNumbers();

    const fetchAllCoordinates = async () => {
      try {
        const res = await axios.get(baseURL + "/coordinates");
        setCoordinates(res.data);
      } catch (e) {
        console.log("err from axios = " + e);
      }
    };
    fetchAllCoordinates();

    const fetchAllSCTStreets = async () => {
      try {
        const res = await axios.get(
          baseURL + "/streets/" + selectDisRef.current.value
        );
        setSelStreets(res.data);
      } catch (e) {
        console.log("err from axios = " + e);
      }
    };
    fetchAllSCTStreets();

    const fetchAllOrders = async () => {
      try {
        const res = await axios.get(baseURL + "/orders");
        setOrders(res.data);
      } catch (e) {
        console.log("err from axios = " + e);
      }
    };
    fetchAllOrders();

    const fetchAllClients = async () => {
      try {
        const res = await axios.get(baseURL + "/clients");
        setClients(res.data);
      } catch (e) {
        console.log("err from axios = " + e);
      }
    };
    fetchAllClients();

    const fetchAllDispatchers = async () => {
      try {
        const res = await axios.get(baseURL + "/dispatchers");
        setDispatchers(res.data);
      } catch (e) {
        console.log("err from axios = " + e);
      }
    };
    fetchAllDispatchers();
    
    const fetchDispatcher = async () => {
      try {
        const res = await axios.get(baseURL + "/dp/" + login);
        setDispatcher(res.data);
      } catch (e) {
        console.log("err from axios = " + e);
      }
    };
    fetchDispatcher();
  }, []);

  const onChangeDistrict = () => {
    // console.log(strsWDiss[selectDisRef.current.value].streets[0].name)
    selectStrRef.current.innerHTML = "";
    strsWDiss[selectDisRef.current.value].streets.forEach((el, i) => {
      const node = document.createElement("option");
      node.value = el.id_street;
      node.textContent = el.name;
      selectStrRef.current.appendChild(node);
    });

  };

  const onClickBtnSearch = () => {
    console.log(
      "district = " +
        selectDisRef.current.value +
        " street = " +
        selectStrRef.current.value
    );
    // console.log(streets[numbers[23].id_street].name)
    // setFunInitial(() => (
    //   <div>
    //     {taxisObj &&
    //       taxisObj.map((el, i) =>
    //         i == selectDisRef.current.value ?  (
    //           <div className={s.wr_view_part_of_content_body} >
    //             <ViewItemTaxi title={"Ім'я:"} desc={el[0].name} />
    //             <ViewItemTaxi title={"Номер:"} atext={el[0].phone} />
    //             <ViewItemTaxi
    //               title={"Адреса таксиста:"}
    //               desc={el[0].last_street + " " + el[0].last_number}
    //             />
    //             <ViewItemTaxi
    //               title={"Час затримки:"}
    //               desc={"Прибуде через "+el[0].delayTime + " хвилин"}
    //             />
    //           </div>
    //         ) : ("")
    //       )}
    //   </div>
    // ));
    //coordinates[numbers[orders.address_start].id_point].latitude
    // console.log(currentClientObj.)
    // setFunTaxisItem(() => (
    //   <div className={s.container_for_other_taxists}>
    //   {taxisObj &&
    //     taxisObj.map((el, i) =>
    //       el.id_district == selectDisRef.current.value && el.id_last_street == selectStrRef.current.value ? (

    //         <OtherTaxisItem
    //         name={el.name}
    //         atext={el.phone}
    //         address={el.last_street + " " + el.last_number}
    //         delayTime={
    //           // el.delayTime
    //           calculatePoitsFun(el.last_latitude,el.last_longitude, currentClientObj.latitude, currentClientObj.longitude)
    //         }
    //         />

    //       ) : ("") )
    //     }
    //     </div>
    // ))
    //  calcMainTDiver(selectDisRef.current.value)
    //  console.log(taxiDriverId)
    setFunInitial(() => (
      <div className="">
        {taxisObj &&
          taxisObj.map((el, i) =>
            i == selectDisRef.current.value ? (
              <div className={s.wr_all_taxis}>
                <div className={s.wr_view_part_of_content_body}>
                  <ViewItemTaxi title={"Ім'я:"} desc={"ім'я"} />
                  <ViewItemTaxi title={"Номер:"} atext={"номер"} />
                  <ViewItemTaxi
                    title={"Адреса таксиста:"}
                    desc={"адреса таксиста"}
                  />
                  <ViewItemTaxi
                    title={"Час затримки:"}
                    desc={"Прибуде через X хвилин"}
                  />
                </div>
                <div className={s.wr_btn_search}>
                  {selectDisRef.current && selectDisRef.current.value != 0 ? (
                    <div className={s.btn_search} onClick={onClickBtnApplyTaxi}>
                      Призначити
                    </div>
                  ) : (
                    ""
                  )}
                </div>
                <div className={s.title_for_taxists_container}>
                  Інші таксисти:
                </div>
                <div className={s.container_for_other_taxists}>
                  {taxisObj &&
                    taxisObj.map((el, i) =>
                      el.id_district == selectDisRef.current.value &&
                      el.id_last_street == selectStrRef.current.value ? (
                        <OtherTaxisItem
                          name={el.name}
                          atext={el.phone}
                          address={el.last_street + " " + el.last_number}
                          delayTime={
                            // el.delayTime
                            calculatePoitsFun(
                              el.last_latitude,
                              el.last_longitude,
                              currentClientObj.latitude,
                              currentClientObj.longitude
                            )
                          }
                        />
                      ) : (
                        ""
                      )
                    )}
                </div>
              </div>
            ) : (
              ""
            )
          )}
      </div>
    ));
  };

  const OnClickEditPrf = () => {
    alert('Запит надано до адміністратора')
     
  }

  const calculatePoitsFun = (x1, y1, x2, y2) => {
    const distance = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
    return Math.floor(distance * 1000);
  };

  const calcMainTDiver = (id_district) => {
    console.log(
      calculatePoitsFun(
        currentClientObj.latitude,
        currentClientObj.longitude,
        taxisObj[taxiDriverId].last_latitude,
        taxisObj[taxiDriverId].last_longitude
      )
    );
    // taxisObj.forEach((el, i) => (
    //  el.id_district == id_district ? (
    //   calculatePoitsFun(currentClientObj.latitude, currentClientObj.longitude, taxisObj[taxiDriverId].last_latitude, taxisObj[taxiDriverId].last_longitude)
    //   >
    //   calculatePoitsFun(currentClientObj.latitude, currentClientObj.longitude, el.last_latitude, el.last_longitude) ? (
    //     setTaxiDriverId(el.id_taxdriver)
    //   ) : ("")
    //   ) : ""

    // ))
  };

  const onClickBtnApplyTaxi = () => {};

  // const onClickClientItem = (id_client) => {

  // }

  const onMEDistrict = () => {
    // fetchAllSCTStreets();
    // selectStrRef.current.value="0"
    // const fetchAllSCTStreets = async () => {
    //   try {
    //     const res = await axios.get(
    //       baseURL + "/streets/" + selectDisRef.current.value
    //     );
    //     setSelStreets(res.data);
    //   } catch (e) {
    //     console.log("err from axios = " + e);
    //   }
    // };
    // fetchAllSCTStreets();
    // if(selStreets){
    //   selStreets.map((el, i) => {
    //     const node = document.createElement("option");
    //     node.value = el.id_street;
    //     node.textContent = "non rule = " + el.id_street;
    //     selectStrRef.current.appendChild(node);
    //   });
    // }
  };
  return (
    <section className={s.dashbord_container} ref={containerDashboardRef}>
      <section className={s.taxi_container}>
        <div className={s.taxi_container__content}>
          <div className={s.taxi_container__content__head_title}>Таксі</div>
          <div className={s.taxi_container__content__body}>
            <div className={s.wr_search_container}>
              <select
                name="districts"
                id="sel_districts"
                className={s.select_style}
                onMouseEnter={onMEDistrict}
                ref={selectDisRef}
                onChange={onChangeDistrict}
              >
                <option value="0">Не обрано</option>
                {districts &&
                  districts.map((el) => (
                    <option value={el.id_district}>{el.name}</option>
                  ))}
              </select>
              <select
                name="streets"
                id="sel_streets"
                className={s.select_style}
                ref={selectStrRef}
              >
                {streets &&
                  streets.map((el, i) => (
                    <option value={el.id_street}>{el.name}</option>
                  ))}
              </select>
            </div>
            <div className={s.wr_btn_search}>
              <div className={s.btn_search} onClick={onClickBtnSearch}>
                Пошук
              </div>
            </div>
            {funInitial}
          </div>
        </div>
      </section>
      <section className={s.clients_container}>
        {orders &&
          streets &&
          numbers &&
          clients &&
          orders.map((el, i) => (
            <ViewClientItem
              name={clients[el.id_client - 1].name}
              atext={clients[el.id_client - 1].phone}
              address={
                streets[numbers[el.address_start].id_street].name +
                " " +
                numbers[el.address_start].number
              }
              time={el.time}
              onClick={() => {
                setSelClient(el.id_client);
                // console.log("id client = " +el.id_client)
              }}
            />
            // <div>{clients[el.id_client - 1].name + " "+clients[el.id_client - 1].phone+ "  " + el.address_start}</div>
          ))}
      </section>
      <div
        className={s.wr_arrow_back_icon}
        ref={arrowWrRef}
        onClick={() => {
          if (containerProfileRef.current.style.display === "block") {
            containerProfileRef.current.style.display = "none";
            containerDashboardRef.current.style.gridTemplateColumns = "45% 55%";
            arrowWrRef.current.style.transform = "rotate(0deg)";
          } else if (containerProfileRef.current.style.display === "none") {
            containerProfileRef.current.style.display = "block";
            containerDashboardRef.current.style.gridTemplateColumns =
              "40% 45% 15%";
            arrowWrRef.current.style.transform = "rotate(180deg)";
          }
        }}
      >
        <img className={s.arrow_back_icon} src={arrowBackIcon} />
      </div>
      <section
        className={s.profile_container}
        style={{ display: "block" }}
        ref={containerProfileRef}
      >
        <div className={s.wrapper_profile_icon}>
          <img className={s.img_profile_pick_icon} src={profilePicImg} />
        </div>
       
            <div className={s.profile_container__content}>
          
            
        <div className={s.wr_itms_prf}>
          <ViewProfileItem
            title={"Ім'я:"}
            value={"Дарина"}
          />
          <ViewProfileItem
            title={"Відділ:"}
            value={"Диспечерська-1, Суми"}
          />
          <ViewProfileItem
            title={"Пошта:"}
            value={"gumdar@gmail.com"}
          />
          <ViewProfileItem title={"Пароль:"} value={"*********"} />
    
        </div>
      
           
              <div className={s.wrp__edit_button_for_profile}>
                <div className={s.edit_button_for_profile} onClick={OnClickEditPrf}>Редагувати</div>
              </div>
            </div>
        

        <div className={s.wrp_exit_icon}>
          <Link to="/">
            <img src={logOutIcon} alt="" />
          </Link>
        </div>
      </section>
    </section>
  );
}
