import React, { useState, useEffect } from "react";
import HotelCard from "../HotelCard/HotelCard";

// eslint-disable-next-line
import styles from "./HotelList.module.css";

import { useTranslation } from "react-i18next";
import fetchData from "../../functions/fetchData";

const HotelsList = (props) => {
  const { t } = useTranslation();
	const [filtered, setFiltered] = useState([]);

  let GETcity = props.city;
  let GETguests = props.guests;
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchDataFunc = async () => {
      const fetchedData = await fetchData();
      setData(fetchedData);
    };

    fetchDataFunc();
  }, []);

  useEffect(() => {
    if(GETcity){
      setFiltered(data.filter((hotel) => {
        if (hotel.location.city.toLocaleLowerCase() !== GETcity.toLocaleLowerCase()) {
          return false;
        }
      }));
    }else{
      setFiltered(data);
    }
  }, [data]);

  //TODO: naprawić !!!

  return (
    filtered.map((city) => (
      <p key={city.id}>{city.name}</p>
    ))
  );

  // console.log("\ndata");
  // console.log(data);
  // console.log("\n");

  // useEffect(() => {
  //   if (GETcity && GETguests) {
  //     setFiltered(data.filter((hotel) => {
  //       if (city && hotel.location.city.toLocaleLowerCase() !== city.toLocaleLowerCase()) {
  //         return false;
  //       }
  //     }));
  //   }else{
  //     setFiltered(data);
  //   }
  // }, [data]);

  // console.log("\nfiltered");
  // console.log(filtered);
  // console.log("\n");


  // useEffect(() => {
  //   if(filtered.length > 0){
  //     return (
  //       <table>
  //         <thead>
  //           <tr>
  //             <th>{t("table.number")}</th>
  //             <th>{t("table.id")}</th>
  //             <th>{t("table.name")}</th>
  //             <th>{t("table.address")}</th>
  //             <th>{t("table.stars")}</th>
  //             <th>{t("table.reviewsScore")}</th>
  //             <th>{t("table.promoted")}</th>
  //             <th>{t("table.metadata.distanceFromCenter")}</th>
  //             <th>{t("table.metadata.wifi")}</th>
  //             <th>{t("table.metadata.parking")}</th>
  //             <th>{t("table.metadata.pets")}</th>
  //             <th>{t("table.metadata.roomService")}</th>
  //             <th>Link</th>
  //           </tr>
  //         </thead>
  //         <tbody>
  //           {filtered.map((hotels, index) => (
  //             <HotelCard
  //               key={hotels.id}
  //               id={hotels.id}
  //               number={index + 1}
  //               name={hotels.name}
  //               location={hotels.location}
  //               stars={hotels.stars}
  //               distanceFromCenter={hotels.metadata.distanceFromCenter}
  //               wifi={hotels.metadata.wifi}
  //               parking={hotels.metadata.parking}
  //               pets={hotels.metadata.pets}
  //               service={hotels.metadata.roomService}
  //               reviewsScore={hotels.reviewsScore}
  //               promoted={hotels.promoted}
  //             />
  //           ))}
  //         </tbody>
  //       </table>
  //     );
  //   } else {
  //     props.isError(true);
  //   }
  // }, [filtered]);

};

export default HotelsList;