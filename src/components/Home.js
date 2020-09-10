import React, { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { useHistory } from "react-router-dom";
import { BACKEND_URL } from "../constant";
import { currentUser } from "../recoilStates/currentUser";
import { userUrlData } from "../recoilStates/userUrlData";

const Home = () => {
  const loggedUser = useRecoilValue(currentUser);
  const [userUrl, setUserUrl] = useRecoilState(userUrlData);
  const [dayCount, setDayCount] = useState(0);
  const [monthCount, setMonthCount] = useState(0);
  const history = useHistory();

  useEffect(() => {
    const getDetails = async () => {
      try {
        const details = await fetch(`${BACKEND_URL}home/${loggedUser}`, {
          method: "GET",
          mode: "cors"
        });
        const data = await details.json();
        // console.log(data);
        if (!data.error) {
          localStorage.setItem("urlData", JSON.stringify(data));
          setUserUrl(data);
          const thisMonth = new Date().getMonth();
          const thisDay = new Date().getDate();
          let monthCount = 0;
          let dayCount = 0;
          userUrl.forEach((ele) => {
            if (thisMonth === new Date(ele.date).getMonth()) {
              monthCount += 1;
            }
            if (thisDay === new Date(ele.date).getDate()) {
              dayCount += 1;
            }
          });
          setDayCount(dayCount);
          setMonthCount(monthCount);
        }
      } catch (err) {
        console.log(err);
      }
    };
    getDetails();
  }, [userUrl.length]);

  return (
    <>
      <h3 className="stat balsa">Statistics:</h3>
      <div className="cards">
        <div className="cardSimple">
          <div className="count">
            <h1>{userUrl.length ? userUrl.length : 0}</h1>
          </div>
          <div className="text">
            <p>Total Url's Created</p>
          </div>
        </div>
        <div className="cardSimple">
          <div className="count">
            <h1>{dayCount}</h1>
          </div>
          <div className="text ">
            <p>Url's Created Today</p>
          </div>
        </div>
        <div className="cardSimple">
          <div className="count">
            <h1>{monthCount}</h1>
          </div>
          <div className="text ">
            <p>Url's Created this Month</p>
          </div>
        </div>
      </div>
      <div className="longDiv">
        <button
          type="button"
          className="long btn btn-secondary btn-lg btn-block long balsa"
          onClick={() => history.push("/createUrl")}
        >
          Create Short URL
        </button>
      </div>
    </>
  );
};

export default Home;
