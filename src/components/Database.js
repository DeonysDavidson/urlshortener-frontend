import React, { useEffect } from "react";
import { Table } from "reactstrap";
import { useRecoilState, useRecoilValue } from "recoil";
import { userUrlData } from "../recoilStates/userUrlData";
import { BACKEND_URL } from "../constant";
import { currentUser } from "../recoilStates/currentUser";

const Database = () => {
  const loggedUser = useRecoilValue(currentUser);
  const [data, setData] = useRecoilState(userUrlData);

  useEffect(() => {
    const getDetails = async () => {
      try {
        const details = await fetch(`${BACKEND_URL}home/${loggedUser}`, {
          method: "GET",
          mode: "cors"
        });
        const dataRaw = await details.json();
        if (!data.error) {
          setData(dataRaw);
        }
      } catch (err) {
        console.log(err);
      }
    };
    getDetails();
  }, []);

  return (
    <Table hover responsive className="balsa tableBorder  ">
      <thead className="thead-dark tableBorder">
        <tr className="tableBorder">
          <th className="tableBorder">#</th>
          <th className="tableBorder">Alias</th>
          <th className="tableBorder">Long URL</th>
          <th className="tableBorder">Short URL</th>
          <th className="tableBorder">Hits</th>
        </tr>
      </thead>
      <tbody>
        {data.length > 0
          ? data.map((ele, index) => {
              return (
                <>
                  <tr key={index}>
                    <th scope="row" className="tableBorder">
                      {index + 1}
                    </th>
                    <td className="tableBorder">{ele.alias.substr(0, 14)}</td>
                    <td className="tableBorder">
                      {ele.longUrl.substr(0, 70) + "..."}
                    </td>
                    <td className="tableBorder">
                      <a href={ele.shortUrl} target="_blank">
                        {ele.shortUrl}
                      </a>
                    </td>
                    <td className="tableBorder">{ele.hits}</td>
                  </tr>
                </>
              );
            })
          : ""}
      </tbody>
    </Table>
  );
};

export default Database;
